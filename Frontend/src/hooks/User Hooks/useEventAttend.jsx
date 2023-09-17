import { useEffect, useState } from "react";
import useNextEvents from "./useNextEvents";
import { toggleEvent } from "../../services/user.service";

// Este hook crea su propio estado isEventAttended para así forzar el re-render
const useEventAttend = (id) => {
  const events = useNextEvents();
  const [isLoading, setIsLoading] = useState(false);
  const [isEventAttended, setIsEventAttended] = useState(
    events.some(({ _id }) => id === _id),
  );

  useEffect(() => {
    setIsEventAttended(events.some(({ _id }) => id === _id));
  }, [events, id]);

  const handleToggleAttend = () => {
    setIsLoading(true);
    toggleEvent(id).then(() => {
      setIsLoading(false);
      setIsEventAttended(() => !isEventAttended);
    });
  };
  return { isEventAttended, handleToggleAttend, isLoading };
};

export default useEventAttend;
