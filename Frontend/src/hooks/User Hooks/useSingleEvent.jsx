import { getSingleNextEvent } from "../../services/user.service";

export const useSingleEvent = async () => {
  const singleEvent = await getSingleNextEvent();
  return singleEvent;
};
