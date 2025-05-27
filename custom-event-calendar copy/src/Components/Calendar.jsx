import React, { useState, useEffect } from "react";
import EventModal from "./EventModal";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import CenteredLayout from "./CenteredLayout";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function Calendar() {
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem("events");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const blanks = Array(firstDay).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const weeks = [];
  let week = [...blanks];
  days.forEach((day) => {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  });
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const handleDayClick = (day) => {
    if (!day) return;
    setSelectedDate(new Date(year, month, day));
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const handleEventClick = (event, e) => {
    e.stopPropagation();
    setSelectedDate(new Date(event.date));
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const occursOnDate = (event, date) => {
    const eventDate = new Date(event.date);
    if (eventDate.toDateString() === date.toDateString()) return true;
    if (!event.recurrence || event.recurrence === "none") return false;

    switch (event.recurrence) {
      case "daily":
        return date >= eventDate;
      case "weekly":
        return date >= eventDate && date.getDay() === eventDate.getDay();
      case "monthly":
        return date >= eventDate && date.getDate() === eventDate.getDate();
      default:
        return false;
    }
  };

  const getEventsForDay = (day) => {
    if (!day) return [];
    const dayDate = new Date(year, month, day);
    return events.filter((ev) => occursOnDate(ev, dayDate));
  };

  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const eventId = parseInt(result.draggableId, 10);
    const destDay = parseInt(result.destination.droppableId, 10);

    if (!destDay) return;

    const newDate = new Date(year, month, destDay).toISOString().split("T")[0];

    setEvents((prev) =>
      prev.map((ev) => (ev.id === eventId ? { ...ev, date: newDate } : ev))
    );
  };

  const saveEvent = (event) => {
    if (editingEvent) {
      setEvents((prev) => prev.map((ev) => (ev.id === event.id ? event : ev)));
    } else {
      // Assign unique id if missing
      const newEvent = { ...event, id: event.id ?? Date.now() };
      setEvents((prev) => [...prev, newEvent]);
    }
    setEditingEvent(null);
  };

  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((ev) => ev.id !== id));
    setEditingEvent(null);
  };

  return (
    <CenteredLayout>
      <div className="p-4 bg-white rounded shadow" style={{ maxWidth: 900 }}>
        <h1 className="text-center mb-4 fw-bold text-primary">Custom Event Calendar</h1>

        <div className="d-flex justify-content-center align-items-center mb-3">
          <button className="btn btn-primary me-3" onClick={prevMonth}>
            &lt;
          </button>
          <h2 className="mb-0">
            {currentDate.toLocaleString("default", { month: "long" })} {year}
          </h2>
          <button className="btn btn-primary ms-3" onClick={nextMonth}>
            &gt;
          </button>
        </div>

        <div className="row text-center fw-bold border-bottom border-secondary pb-2">
          {daysOfWeek.map((day, idx) => (
            <div
              key={day}
              className={`col border-end border-secondary ${
                idx === 0 || idx === 6 ? "text-danger" : ""
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          {weeks.map((week, i) => (
            <div className="row text-center" key={i}>
              {week.map((day, j) => {
                const isWeekend = j === 0 || j === 6;
                return (
                  <div
                    key={j}
                    className={`col border p-2 position-relative calendar-day
                      ${day && isToday(day) ? "bg-warning bg-opacity-50 border-warning" : ""}
                      ${isWeekend ? "bg-light" : ""}
                    `}
                    style={{ minHeight: "100px", cursor: day ? "pointer" : "default" }}
                    onClick={() => handleDayClick(day)}
                  >
                    <div className="text-end fw-bold">{day || ""}</div>

                    <Droppable droppableId={day ? day.toString() : `empty-${j}`} type="EVENT">
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          style={{ maxHeight: 70, overflowY: "auto" }}
                        >
                          {getEventsForDay(day).map((ev, idx) => {
                            const draggableId = ev.id != null ? ev.id.toString() : `temp-id-${idx}`;
                            const key = ev.id != null ? ev.id : `temp-key-${idx}`;

                            return (
                              <Draggable key={key} draggableId={draggableId} index={idx}>
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    title={`${ev.title}${ev.time ? " at " + ev.time : ""}`}
                                    className="text-truncate mb-1"
                                    style={{
                                      backgroundColor: ev.color || "#1976d2",
                                      color: "#fff",
                                      cursor: "grab",
                                      padding: "0.25em 0.5em",
                                      borderRadius: "0.25rem",
                                      ...provided.draggableProps.style,
                                    }}
                                    onClick={(e) => handleEventClick(ev, e)}
                                  >
                                    {ev.title}
                                  </div>
                                )}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                );
              })}
            </div>
          ))}
        </DragDropContext>

        <EventModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingEvent(null);
          }}
          onSave={saveEvent}
          onDelete={deleteEvent}
          date={selectedDate}
          event={editingEvent}
        />
      </div>
    </CenteredLayout>
  );
}

export default Calendar;
