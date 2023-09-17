import { useEffect, useState } from "react";
import useNextEvents from "./useNextEvents";
import { toggleLikedEvent } from "../../services/user.service";

export const useEventLiked = (id) => {
  const events = useNextEvents();
  const [isLoadingLiked, setIsLoadingLiked] = useState(false);
  const [isEventLiked, setIsEventLiked] = useState(
    events.some(({ _id }) => id === _id),
  );

  useEffect(() => {
    setIsEventLiked(events.some(({ _id }) => id === _id));
  }, [events, id]);

  const handleToggleLiked = () => {
    setIsLoadingLiked(true);
    toggleLikedEvent(id).then(() => {
      setIsLoadingLiked(false);
      setIsEventLiked(() => !isEventLiked);
    });
  };
  return { isEventLiked, handleToggleLiked, isLoadingLiked };
};
