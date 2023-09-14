import { APIUser } from "./service.config";

//! Get by id

export const getEventById = async (id) => {
  return APIUser.get(`/events/${id}`)
    .then((res) => res.data.data)
    .catch((error) => error);
};

//! Get by name

export const getEventByName = async (name) => {
  return APIUser.get(`/events/getbyname/${name}`)
    .then((res) => res.data?.data)
    .catch((error) => error);
};

//! Get all events

export const getAllEvents = async () => {
  return APIUser.get("/events/get/all")
    .then((res) => res.data?.data)
    .catch((error) => error);
};
