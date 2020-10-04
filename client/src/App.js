import React, { Component } from "react";
import Home from "./components/main/Home";
import UpdateRole from "./components/auth/UpdateRole";
import Admin from "./components/dashboards/Admin";
import Subscriber from "./components/dashboards/Subscriber";
import "./App.css";

// mongo "mongodb+srv://firstcluster.kgqyb.mongodb.net/<dbname>" --username <username>

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      userId: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      chosenRole: "none",
      user: false,
    };
  }

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleRoleChange = (evt) => {
    this.setState({ chosenRole: evt.target.value });
  };

  signUp = (e) => {
    e.preventDefault();
    const { name, email, password } = this.state;

    if (name === "" || email === "" || password === "") {
      alert("Please fill in all the fields");
    } else {
      fetch("/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          alert(response.message);
        })
        .catch((error) => console.log("Error:", error));
    }
  };
  // mongo "mongodb+srv://firstcluster.kgqyb.mongodb.net/firstCluster" --username Omphile
  // ---------------------------------

  signIn = (e) => {
    e.preventDefault();
    const { email, password } = this.state; // Destructuring state
    if (email === "" || password === "") {
      alert("Please fill in all the fields");
    } else {
      fetch("/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            this.setState({
              user: true,
              userId: response.user._id,
              name: response.user.name,
              email: response.user.email,
              password: response.user.password,
              role: response.user.role,
            });
          } else {
            alert(response.message);
          }
        })
        .catch((error) => console.log("Error:", error));
    }
  };

  googleSignIn = (e) => {
    e.preventDefault();
    window.open("http://localhost:7000/google-login", "_self");
  };

  // -----------------------------------------

  updateRole = (e) => {
    e.preventDefault();
    const { userId, name, email, password, chosenRole } = this.state;

    if (
      name === "" ||
      email === "" ||
      password === "" ||
      chosenRole === "none"
    ) {
      alert("Please fill in all the fields");
    } else {
      fetch(`/update-profile/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          role: chosenRole,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          this.setState({
            user: true,
            userId: response.user._id,
            name: response.user.name,
            email: response.user.email,
            password: response.user.password,
            role: response.user.role,
          });
        })
        .catch((error) => console.log("Error:", error));
    }
  };

  signOut = (e) => {
    e.preventDefault();
    fetch("/sign-out")
      .then((res) => res.json())
      .then((response) => {
        this.setState({ user: false, name: "", email: "", password: "" });
      })
      .catch((error) => console.log("Error:", error));
  };

  testing = (e) => {
    e.preventDefault();
    fetch("/user")
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log("Error:", error));
  };

  componentDidMount() {
    fetch("/user")
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            user: true,
            userId: response.user._id,
            name: response.user.name,
            email: response.user.email,
            password: response.user.password,
            role: response.user.role,
          });
        } else {
          console.log(response);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { name, email, password, role, chosenRole, user } = this.state;
    if (user && role === "none") {
      return (
        <div className="App">
          <UpdateRole
            name={name}
            chosenRole={chosenRole}
            handleChange={this.handleChange}
            handleRoleChange={this.handleRoleChange}
            updateUser={this.updateRole}
          />
        </div>
      );
    } else if ((user && role === "Admin") || (user && role === "Subscriber")) {
      return (
        <div className="App">
          {role === "Admin" ? (
            <Admin signOut={this.signOut} name={name} />
          ) : (
            <Subscriber signOut={this.signOut} name={name} />
          )}
        </div>
      );
    } else {
      return (
        <div className="App">
          <Home
            name={name}
            email={email}
            role={role}
            password={password}
            handleChange={this.handleChange}
            googleSignIn={this.googleSignIn}
            signIn={this.signIn}
            signUp={this.signUp}
          />
        </div>
      );
    }
  }
}
