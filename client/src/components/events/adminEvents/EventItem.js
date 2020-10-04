import React from "react";

export default function EventItem({
  eventName,
  eventDescription,
  eventDate,
  handleEdit,
  deleteEvent,
}) {
  return (
    <div className="eventItem">
      <p className="eventName">{eventName}</p>

      <p className="eventDescription">{eventDescription}</p>

      <p className="eventDate">{eventDate}</p>
      <button className="edit" onClick={handleEdit}>
        <i class="fa fa-pencil" aria-hidden="true"></i>
      </button>
      <button className="delete" onClick={deleteEvent}>
        <i class="fa fa-trash" aria-hidden="true"></i>
      </button>
    </div>
  );
}
