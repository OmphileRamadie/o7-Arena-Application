import React, { Component } from "react";
import EventsContainer from "../events/subsciberEvents/EventContainer";
import MyEventsContainer from "../events/subsciberEvents/MyEventsContainer";
import rockstar from "../images/Rockstar.jpg";
import djBoring from "../images/djBoring.jpg";
import opera from "../images/opera.jpg";
import wendy from "../images/wendy.jpg";
import comingSoon from "../images/comingSoon.jpg";
import calender from "../images/calender.jpg";

export default class Subscriber extends Component {
  constructor() {
    super();
    this.state = {
      eventId: "",
      eventName: "",
      eventDescription: "",
      eventDate: "",
      events: [],
      myEvents: [],
      allEvents: true,
    };
  }

  addMyEvent = (id) => {
    const { events } = this.state;
    var selectedEvent = events.find((event) => event._id === id);

    this.setState(
      {
        eventId: selectedEvent._id,
      },
      function () {
        const { eventId } = this.state;
        fetch("/my-events/new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eventId: eventId,
          }),
        })
          .then((res) => res.json())
          .then((response) => {
            if (response.status === 200) {
              alert("Event added Succesfully");
              console.log(response);
            } else {
              alert(response.error);
            }
            console.log(response);
          })
          .catch((error) => console.log("Error:", error));
      }
    );
  };

  getMyEvents = () => {
    fetch("/my-events")
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          this.setState({
            myEvents: response.myEvents,
            allEvents: false,
          });
        } else {
          alert(response.error);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  getAllEvents = () => {
    fetch("/all-events")
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            events: response.events,
            allEvents: true,
          });
        } else {
          console.log(response);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  deleteMyEvent = (id) => {
    fetch(`/my-events/delete/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status === 200) {
          alert("Event Deleted Succesfully");
          console.log(response);
          this.setState({
            myEvents: response.myEvents,
          });
        } else {
          alert("An error occured while deleting the event");
        }
      })
      .catch((error) => console.log("Error:", error));
  };

  componentDidMount() {
    fetch("/all-events")
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            events: response.events,
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
    const { events, myEvents, allEvents } = this.state;
    let date = new Date();

    if (allEvents) {
      return (
        <div className="App">
          <div className="header">
            <div className="logo">
              <h3 className="logo-icon">o7 Arena</h3>
              <p className="logo-text">Home Of Historic Events</p>
            </div>
            <ul className="subscriberHeader">
              <li onClick={this.getAllEvents}>All Events</li>
              <li onClick={this.getMyEvents}>My Events</li>
              <li onClick={this.props.signOut}>Sign Out</li>
            </ul>
          </div>
          <div className="nameDate">
            <h4> "Welcome, {this.props.name}"</h4>
            <h5>{date.toDateString()}</h5>
          </div>

          <h1>All Upcoming Events</h1>
          <EventsContainer
            events={events}
            addMyEvent={this.addMyEvent}
            comingSoon={comingSoon}
          />

          <h1>Highlights</h1>
          <div className="highlights">
            <div className="">
              <p> "The Apples - LoverBoy Tour - Sep 2019 "</p>
              <img src={rockstar} alt="rockstar" className="rockstar" />
            </div>
            <div className="">
              <p> "Dj xxpress - LofiHouse Tour - Nov 2019 "</p>
              <img src={djBoring} alt="dj boring" className="djBoring" />
            </div>

            <div className="">
              <p> "The Two Brothers - In Concert Tour - Dec 2019 "</p>
              <img src={opera} alt="opera" className="opera" />
            </div>
            <div className="">
              <p> "Wendy - Over The Moon Tour - Dec 2019 "</p>
              <img src={wendy} alt="wendy" className="wendy" />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="App">
          <div className="header">
            <div className="logo">
              <h3 className="logo-icon">o7 Arena</h3>
              <p className="logo-text">Home Of Historic Events</p>
            </div>
            <ul className="subscriberHeader">
              <li onClick={this.getAllEvents}>All Events</li>
              <li onClick={this.getMyEvents}>My Events</li>
              <li onClick={this.props.signOut}>Sign Out</li>
            </ul>
          </div>
          <div className="nameDate">
            <h4> "Welcome, {this.props.name}"</h4>
            <h5>{date.toDateString()}</h5>
          </div>
          <h1>My Events</h1>

          <MyEventsContainer
            myEvents={myEvents}
            deleteMyEvent={this.deleteMyEvent}
            calender={calender}
          />
        </div>
      );
    }
  }
}
