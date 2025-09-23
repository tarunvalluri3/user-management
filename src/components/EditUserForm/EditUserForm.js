import React, { Component } from "react";
import "./EditUserForm.css";

// Class component for editing an existing user with form validation and state management

class EditUserForm extends Component {
  constructor(props) {
    super(props);
    const { user } = props;
    this.state = {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      department: user.department || "",
    };
  }

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, department } = this.state;
    
    // Basic validation
    if (!firstName || !lastName || !email || !department) {
      alert("All fields are required!");
      return;
    }

    // Simple email format validation 
    const updatedUser = {
      ...this.props.user,
      firstName,
      lastName,
      email,
      department,
    };

    this.props.onEdit(updatedUser);
  };

  render() {
    const { firstName, lastName, email, department } = this.state;

    return (
      <form className="edit-user-form" onSubmit={this.handleSubmit}>
        <h3>Edit User</h3>

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={firstName}
          onChange={this.handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={lastName}
          onChange={this.handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={this.handleChange}
          required
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={department}
          onChange={this.handleChange}
          required
        />

        <div className="form-buttons">
          <button type="submit" className="submit-btn">Save Changes</button>
          <button type="button" className="cancel-btn" onClick={this.props.onClose}>Cancel</button>
        </div>
      </form>
    );
  }
}

export default EditUserForm;
