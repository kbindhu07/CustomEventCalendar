import React, { useState, useEffect } from "react";

function EventModal({ isOpen, onClose, onSave, onDelete, date, event }) {
  const [title, setTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#1976d2"); // Default event color
  const [recurrence, setRecurrence] = useState("none");

  useEffect(() => {
    if (event) {
      setTitle(event.title || "");
      setEventDate(event.date || "");
      setDescription(event.description || "");
      setColor(event.color || "#1976d2");
      setRecurrence(event.recurrence || "none");
    } else if (date) {
      setTitle("");
      setEventDate(date.toISOString().slice(0, 16)); // Format for datetime-local input
      setDescription("");
      setColor("#1976d2");
      setRecurrence("none");
    }
  }, [event, date]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...event,
      title,
      date: eventDate,
      description,
      color,
      recurrence,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.3)" }}>
      <div className="modal-dialog">
        <form className="modal-content" onSubmit={handleSubmit}>
          <div className="modal-header">
            <h5 className="modal-title">{event ? "Edit Event" : "Add Event"}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Date & Time</label>
              <input
                className="form-control"
                type="datetime-local"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-3 d-flex align-items-center">
              <label className="form-label me-2 mb-0">Color</label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                style={{ width: 40, height: 40, border: "none", padding: 0 }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Recurrence</label>
              <select
                className="form-select"
                value={recurrence}
                onChange={(e) => setRecurrence(e.target.value)}
              >
                <option value="none">None</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>
          <div className="modal-footer">
            {event && (
              <button
                type="button"
                className="btn btn-danger me-auto"
                onClick={() => onDelete(event.id)}
              >
                Delete
              </button>
            )}
            <button type="submit" className="btn btn-primary">
              {event ? "Update" : "Add"}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventModal;
