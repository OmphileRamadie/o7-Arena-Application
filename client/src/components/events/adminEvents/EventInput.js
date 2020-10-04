import React from "react";

export default function EventInput({
  eventName,
  eventDescription,
  eventDate,
  addEvent,
  editEvent,
  handleChange,
  edit,
  arena2,
}) {
  return (
    <div className="">
      <h1>Publish Event</h1>
      <div className="eventInput">
        <img src={arena2} alt="Image of Arena" className="arena2" />
        <form>
          <input
            type="text"
            name="eventName"
            placeholder="Event Name"
            value={eventName}
            onChange={handleChange}
          />

          <textarea
            type="text"
            name="eventDescription"
            value={eventDescription}
            onChange={handleChange}
            placeholder="Event Description"
          />

          <input
            type="text"
            name="eventDate"
            placeholder="Event Date"
            value={eventDate}
            onChange={handleChange}
          />

          {edit ? (
            <button className="editEvent" onClick={editEvent}>
              Edit Event
            </button>
          ) : (
            <button className="addEvent" onClick={addEvent}>
              Add Event
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
