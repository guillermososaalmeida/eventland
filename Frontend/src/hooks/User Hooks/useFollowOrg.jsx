import { useEffect, useState } from "react";
import useFollowers from "./useFollowers";
import { favOrganization } from "../../services/user.service";

export const useFollowOrg = (id) => {
  const followers = useFollowers();
  const [isLoadingFollow, setIsLoadingFollow] = useState(true);
  const [isFollowing, setIsFollowing] = useState();
  console.log("primero:", isFollowing);
  useEffect(() => {
    setIsLoadingFollow(false);
    setIsFollowing(followers.some((_id) => id === _id));
  }, [followers, id]);
  const handleFollow = () => {
    console.log("isFollowing", isFollowing);

    setIsLoadingFollow(true);
    favOrganization(id).then(() => {
      setIsLoadingFollow(false);
      setIsFollowing(() => !isFollowing);
    });
    console.log("last", isFollowing);
  };

  return { isFollowing, handleFollow, isLoadingFollow };
};
