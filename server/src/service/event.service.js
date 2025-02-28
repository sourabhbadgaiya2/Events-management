import EventModel from "../models/event.model.js";
import ErrorHandlers from "../helpers/ErrorHandler.js";

//! Events Creation

export const createEvents = async ({ body }) => {
  const existEvent = await EventModel.findOne({ name: body.name });

  if (existEvent) {
    throw new ErrorHandlers("Event Already Exists", 500);
  }

  const newEvents = new EventModel(body);
  const savedEvents = newEvents.save();

  return savedEvents;
};

//! Event Updates
export const EventUpdates = async ({ id, body }) => {
  const event = await EventModel.findByIdAndUpdate(id, body, {
    new: true,
  });

  if (!event) {
    throw new ErrorHandlers("Event Does Not Exists", 500);
  }

  return event;
};
