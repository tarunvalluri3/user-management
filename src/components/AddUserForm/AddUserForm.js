import React, { Component } from "react";
import "./AddUserForm.css"; 

// Class component for adding a new user for better state management

class AddUserForm extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    department: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, username, department } = this.state;

    // Call parent handler and pass new user data
    this.props.onAddUser({ firstName, lastName, email, username, department });

    // To Reset form
    this.setState({ firstName: "", lastName: "", email: "", department: "" });
  };

  render() {
    const { firstName, lastName, email, department } = this.state;
    const { onCancel } = this.props;

    return (
      <form onSubmit={this.handleSubmit} className="add-user-form">
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
          <button type="submit">Add User</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    );
  }
}

export default AddUserForm;
