import React from "react";
import EventItem from "./EventItem";

export default function EventContainer({ events, addMyEvent, comingSoon }) {
  if (events.length > 0) {
    return (
      <div className="subEventsContainer">
        <img src={comingSoon} alt="Coming Soon" className="comingSoon" />
        <div className="subEvents">
          {events.map((event) => {
            return (
              <div key={event._id}>
                <EventItem
                  eventName={event.eventName}
                  eventDescription={event.eventDescription}
                  eventDate={event.eventDate}
                  addMyEvent={() => addMyEvent(event._id)}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return <h3 className="noGeneralEvents">No Upcoming Events</h3>;
  }
}
