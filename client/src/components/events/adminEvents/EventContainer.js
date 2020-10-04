import React from "react";
import EventItem from "./EventItem";

export default function EventContainer({ events, handleEdit, deleteEvent }) {
  if (events.length > 0) {
    return (
      <div className="adminEvents">
        <div className="eventsContainer">
          {events.map((event) => {
            return (
              <div key={event._id}>
                <EventItem
                  eventName={event.eventName}
                  eventDescription={event.eventDescription}
                  eventDate={event.eventDate}
                  handleEdit={() => handleEdit(event._id)}
                  deleteEvent={() => deleteEvent(event._id)}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return <h3 className="noPublishedEvents">No Published Events</h3>;
  }
}
