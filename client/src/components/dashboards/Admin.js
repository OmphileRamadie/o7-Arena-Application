import React, { Component } from "react";
import EventInput from "../events/adminEvents/EventInput";
import EventContainer from "../events/adminEvents/EventContainer";
import UsersContainer from "../users/usersContainer";
import arena2 from "../images/arena2.jpg";

export default class Admin extends Component {
  constructor() {
    super();
    this.state = {
      eventId: "",
      eventName: "",
      eventDescription: "",
      eventDate: "",
      events: [],
      edit: false,
      users: [],
      displayEvents: true,
    };
  }

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleEdit = (id) => {
    const { events } = this.state;
    const filteredEvents = events.filter((event) => event._id !== id);
    const selectedEvent = events.find((event) => event._id === id);

    this.setState({
      events: filteredEvents,
      eventName: selectedEvent.eventName,
      eventDescription: selectedEvent.eventDescription,
      eventDate: selectedEvent.eventDate,
      eventId: selectedEvent._id,
      edit: true,
    });
  };

  addEvent = (e) => {
    e.preventDefault();

    const { eventName, eventDescription, eventDate } = this.state;

    if (eventName === "" || eventDescription === "" || eventDate === "") {
      alert("Please fill in all the fields");
    } else {
      fetch("/add-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventName: eventName,
          eventDescription: eventDescription,
          eventDate: eventDate,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.status === 201) {
            alert(response.message);
            this.setState({
              events: response.events,
            });
          } else {
            alert(response.message);
          }
        })
        .catch((error) => console.log("Error:", error));
    }

    this.setState({
      eventName: "",
      eventDescription: "",
      eventDate: "",
    });
  };

  editEvent = (e) => {
    e.preventDefault();
    const { eventName, eventDescription, eventDate, eventId } = this.state;

    if (eventName === "" || eventDescription === "" || eventDate === "") {
      alert("Please fill in all the fields");
    } else {
      fetch(`/edit-event/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventName: eventName,
          eventDescription: eventDescription,
          eventDate: eventDate,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.status === 200) {
            alert(response.message);
            this.setState({
              events: response.events,
            });
          } else {
            alert(response.message);
          }
        })
        .catch((error) => console.log("Error:", error));
    }

    this.setState({
      eventName: "",
      eventDescription: "",
      eventDate: "",
      edit: false,
    });
  };

  deleteEvent = (id) => {
    fetch(`/delete-event/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          alert(response.message);

          this.setState({
            events: response.events,
          });
        } else {
          alert(response.message);
        }
      })
      .catch((error) => console.log("Error:", error));
  };

  getAllSubscribers = () => {
    fetch("/all-subscribers")
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          this.setState({ users: response.users, displayEvents: false });
        } else {
          alert(response.error);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  getAllAdmins = () => {
    fetch("/all-admins")
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          this.setState({ users: response.users, displayEvents: false });
        } else {
          alert(response.error);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  removeUser = (id) => {
    const { users } = this.state;
    let filteredUsers = [];
    fetch(`/remove-user/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          alert("User Removed Succesfully");
          filteredUsers = users.filter((user) => user._id !== id);
          this.setState({
            users: filteredUsers,
            displayEvents: false,
          });
        } else {
          alert(response.error);
        }
      })
      .catch((error) => console.log("Error:", error));
  };

  viewEvents = () => {
    this.setState({
      displayEvents: true,
    });
  };

  componentDidMount() {
    fetch("/all-events")
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log(response);
          this.setState({
            events: response.events,
          });
        } else {
          console.log(response);
          alert(response.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    const {
      eventName,
      eventDescription,
      eventDate,
      events,
      edit,
      users,
      displayEvents,
    } = this.state;
    let date = new Date();
    if (displayEvents) {
      return (
        <div>
          <div className="header ">
            <div className="logo">
              <h3 className="logo-icon">o7 Arena</h3>
              <p className="logo-text">Home Of Historic Events</p>
            </div>

            <ul className="adminHeader">
              <li onClick={this.viewEvents}>Publish Event</li>
              <li onClick={this.getAllAdmins}>View All Admin Users</li>
              <li onClick={this.getAllSubscribers}>
                View All Subscriber Users
              </li>
              <li onClick={this.props.signOut}>Sign Out</li>
            </ul>
          </div>
          <div className="nameDate">
            <h4>
              {" "}
              "Welcome, {this.props.name}. You are signed in as an admin"
            </h4>
            <h5>{date.toDateString()}</h5>
          </div>

          <EventInput
            eventName={eventName}
            eventDescription={eventDescription}
            eventDate={eventDate}
            addEvent={this.addEvent}
            editEvent={this.editEvent}
            handleChange={this.handleChange}
            edit={edit}
            arena2={arena2}
          />
          <h1 className="upcomingEvents"> Published Events</h1>
          <EventContainer
            events={events}
            handleEdit={this.handleEdit}
            deleteEvent={this.deleteEvent}
          />
        </div>
      );
    } else {
      return (
        <div>
          <div className="header ">
            <div className="logo">
              <h3 className="logo-icon">o7 Arena</h3>
              <p className="logo-text">Home Of Historic Events</p>
            </div>

            <ul className="adminHeader">
              <li onClick={this.viewEvents}>Publish Event</li>
              <li onClick={this.getAllAdmins}>View All Admin Users</li>
              <li onClick={this.getAllSubscribers}>
                View All Subscriber Users
              </li>
              <li>Sign Out</li>
            </ul>
          </div>
          <div className="nameDate">
            <h4>
              {" "}
              "Welcome, {this.props.name}. You are signed in as an admin"
            </h4>
            <h5>{date.toDateString()}</h5>
          </div>
          <h1 className=""> Users</h1>
          <UsersContainer users={users} removeUser={this.removeUser} />
        </div>
      );
    }
  }
}
