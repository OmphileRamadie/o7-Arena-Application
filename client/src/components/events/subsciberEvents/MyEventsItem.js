import React from "react";

export default function MyEventsItem({
  eventName,
  eventDescription,
  eventDate,
  deleteMyEvent,
}) {
  return (
    <div className="myEventsItem">
      <p className="myEventsName">{eventName}</p>

      <p>{eventDescription}</p>

      <p>{eventDate}</p>
      <button className="deleteMyEvent" onClick={deleteMyEvent}>
        Delete
      </button>
    </div>
  );
}
