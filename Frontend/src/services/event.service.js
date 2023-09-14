import { APIUser } from "./service.config";

//! Get by id

export const getEventById = async (id) => {
  return APIUser.get(`/events/${id}`)
    .then((res) => res.data.data)
    .catch((error) => error);
};
