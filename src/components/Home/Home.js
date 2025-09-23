import { Component } from "react";
import UserCard from "../UserCard/UserCard";
import AddUserForm from "../AddUserForm/AddUserForm";
import EditUserForm from "../EditUserForm/EditUserForm";
import "./Home.css";

// using class based component for better state management and lifecycle methods
class Home extends Component {
  state = {
    users: [],
    isLoading: false,
    error: null,
    showAddForm: false,
    editingUser: null,
    searchQuery: "",
    currentPage: 1,
    usersPerPage: 5,
    sortField: "firstName",
    sortOrder: "asc",
  };

  componentDidMount() {
    this.fetchUsers();
  }

  // API GET request to fetch users when the webpage loads and update state
  fetchUsers = async () => {
    this.setState({ isLoading: true, error: null });
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      // Normalize users to include firstName and lastName
      const normalizedUsers = data.map((user) => ({
        ...user,
        firstName: user.name.split(" ")[0] || "",
        lastName: user.name.split(" ")[1] || "",
        department: user.company ? user.company.name : "",
      }));
      this.setState({ users: normalizedUsers, isLoading: false });
    } catch (error) {
      this.setState({ error: error.message, isLoading: false });
    }
  };

  // API DELETE request to delete a user and update state
  handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Failed to delete user");
      this.setState((prevState) => ({
        users: prevState.users.filter((user) => user.id !== id),
      }));
      alert("User deleted successfully !");
    } catch (error) {
      alert("Error deleting user: " + error.message);
    }
  };

  // API POST request to add a new user and update state
  handleAddUser = async (newUser) => {
    const { users } = this.state;
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: newUser.firstName + " " + newUser.lastName,
            email: newUser.email,
            company: { name: newUser.department },
          }),
        }
      );
      if (!response.ok) throw new Error("Failed to add user");
      const addedUser = await response.json();

      alert("User added successfully !");

      // Add new user to state with proper firstName, lastName, and department
      this.setState({
        users: [
          ...users,
          {
            id: addedUser.id,
            name: newUser.firstName + " " + newUser.lastName,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            department: newUser.department,
          },
        ],
        showAddForm: false,
      });
    } catch (error) {
      alert("Error adding user: " + error.message);
    }
  };

  handleEditClick = (user) => this.setState({ editingUser: user });

  // API PUT request to edit a user and update state
  handleEditUser = async (updatedUser) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${updatedUser.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedUser),
        }
      );
      await response.json();
      this.setState((prev) => ({
        users: prev.users.map((user) =>
          user.id === updatedUser.id
            ? {
                ...updatedUser,
                name: updatedUser.firstName + " " + updatedUser.lastName,
              }
            : user
        ),
        editingUser: null,
      }));
      alert("User updated successfully !");
    } catch (error) {
      alert("Error updating user: " + error.message);
    }
  };

  // Handle search, pagination, and sorting
  handleSearchChange = (e) =>
    this.setState({ searchQuery: e.target.value, currentPage: 1 });

  handlePageChange = (pageNumber) => this.setState({ currentPage: pageNumber });

  handleSortChange = (field) => this.setState({ sortField: field });
  handleSortOrderChange = (order) => this.setState({ sortOrder: order });

  render() {
    const {
      users,
      isLoading,
      error,
      showAddForm,
      editingUser,
      searchQuery,
      currentPage,
      usersPerPage,
      sortField,
      sortOrder,
    } = this.state;

    if (isLoading) return <p>Loading users...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

    // Filter users
    const filteredUsers = users.filter((user) => {
      const fullName =
        user.name || `${user.firstName || ""} ${user.lastName || ""}`;
      return fullName.toLowerCase().includes(searchQuery.toLowerCase());
    });

    // Sort users
    const sortedUsers = filteredUsers.sort((a, b) => {
      let aVal = "",
        bVal = "";
      if (sortField === "firstName") {
        aVal = a.firstName || "";
        bVal = b.firstName || "";
      } else if (sortField === "lastName") {
        aVal = a.lastName || "";
        bVal = b.lastName || "";
      } else if (sortField === "department") {
        aVal = a.department || "";
        bVal = b.department || "";
      }
      return sortOrder === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    });

    // Pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

    return (
      <div className="home-container">
        <h1>Welcome To User Management Dashboard !</h1>
        {/* <h4>Users List</h4> */}
        <h3>
          Total Users Count:{" "}
          <span className="total-users"> {users.length} </span>
        </h3>

        {/* Search Input For Filtering*/}
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={this.handleSearchChange}
          style={{ marginBottom: "10px", padding: "5px", width: "200px" }}
        />

        {/* Sorting Options */}
        <div style={{ marginBottom: "10px" }}>
          <label>Sort by: </label>
          <select
            value={sortField}
            onChange={(e) => this.handleSortChange(e.target.value)}
          >
            <option value="firstName">First Name</option>
            <option value="lastName">Last Name</option>
            <option value="department">Department</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => this.handleSortOrderChange(e.target.value)}
            style={{ marginLeft: "5px" }}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        {/* Button to show Add User form */}
        <p>
          To Add a new User{" "}
          <button onClick={() => this.setState({ showAddForm: true })}>
            Click Here
          </button>
        </p>

        {/* Conditional rendering of AddUserForm and EditUserForm */}
        {showAddForm && (
          <AddUserForm
            onAddUser={this.handleAddUser}
            onCancel={() => this.setState({ showAddForm: false })}
          />
        )}

        {editingUser && (
          <EditUserForm
            user={editingUser}
            onEdit={this.handleEditUser}
            onClose={() => this.setState({ editingUser: null })}
          />
        )}

        {/* Sending as props to UserCard component to display user details */}

        <div className="users-list">
          {currentUsers.map((user) => (
            <UserCard
              key={user.id}
              user={{
                id: user.id,
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                email: user.email || "",
                department: user.department || "",
              }}
              onDelete={this.handleDelete}
              onEdit={this.handleEditClick}
            />
          ))}
        </div>

        {/* Pagination */}
        <div style={{ marginTop: "15px" }}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => this.handlePageChange(page)}
              style={{
                margin: "2px",
                padding: "5px 10px",
                backgroundColor: page === currentPage ? "black" : "white",
                color: page === currentPage ? "white" : "black",
                border: "1px solid #ccc",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default Home;
