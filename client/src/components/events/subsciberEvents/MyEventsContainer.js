import React from "react";
import MyEventItem from "./MyEventsItem";

export default function MyEventsContainer({
  myEvents,
  deleteMyEvent,
  calender,
}) {
  if (myEvents.length > 0) {
    return (
      <div className="subMyEventsContainer">
        <img src={calender} alt="Calender" className="calender" />
        <div className="subMyEvents">
          {myEvents.map((event) => {
            return (
              <div key={event._id}>
                <MyEventItem
                  eventName={event.eventName}
                  eventDescription={event.eventDescription}
                  eventDate={event.eventDate}
                  deleteMyEvent={() => {
                    deleteMyEvent(event._id);
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return <h3 className="noPersonalEvents">No Events</h3>;
  }
}
