import EventModel from "../models/event.model.js";
import { createEvents, EventUpdates } from "../service/event.service.js";

// EventModel.create({
// name: "Event 1",
// description: "Event 1 Description",
// organizer: "Organizer 1",
// guests: ["Guest 1", "Guest 2"],
// address: "Address 1",
// city: "City 1",
// pincode: 123456,
// date: "2021-10-10",
// time: "10:00 AM",
// media: ["Media 1", "Media 2"],
// ticketTypes: ["Ticket 1", "Ticket 2"],
// });

//! CREATE EVENT
export const createEvent = async (req, res, next) => {
  const { body } = req;
  try {
    const savedEvents = await createEvents({ body });

    res
      .status(201)
      .json({ message: "Event Created Successfully", savedEvents });
  } catch (error) {
    next(error);
  }
};

//! UPDATE EVENT

export const updateEvent = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  // console.log(req.params, "CC");

  try {
    const event = await EventUpdates({ id, body });
    res.json({ message: "Event updated successfully", event });
  } catch (error) {
    next(error);
  }
};

//! Delete EVENT

export const deleteEvent = async (req, res, next) => {
  const { id } = req.params;
  try {
    await EventModel.findByIdAndDelete(id);
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    next(error);
  }
};

//! Get EVENT BY SEARCH
export const getEventBySearch = async (req, res, next) => {
  // access search query
  const { searchText } = req.query;
  const { date } = req.query;

  try {
    const events = await EventModel.find({
      name: { $regex: new RegExp(searchText, "i") },
      ...(date && { date }),
    }).sort({ createdAt: -1 });

    res.json({ data: events });
  } catch (error) {
    next(error);
  }
};

//! Get EVENT BY Id
export const getEventById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const event = await EventModel.findById(id);
    res.json({ data: event });
  } catch (error) {
    next(error);
  }
};
