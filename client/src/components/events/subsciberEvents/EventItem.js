import React from "react";

export default function EventItem({
  eventName,
  eventDescription,
  eventDate,
  addMyEvent,
}) {
  return (
    <div className="eventItem">
      <p className="eventName">{eventName}</p>

      <p>{eventDescription}</p>

      <p>{eventDate}</p>
      <button className="addToMyEvents" onClick={addMyEvent}>
        {" "}
        Add To My Events
      </button>
    </div>
  );
}
