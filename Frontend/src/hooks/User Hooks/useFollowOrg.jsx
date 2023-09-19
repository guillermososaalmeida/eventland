import { useEffect, useState } from "react";
import useOrganizations from "./useOrganizations";
import { favOrganization } from "../../services/user.service";

export const useFollowOrg = (id) => {
  const organizations = useOrganizations();
  console.log("organizations", organizations);
  const [isLoadingFollow, setIsLoadingFollow] = useState(true);
  const [isFollowing, setIsFollowing] = useState(
    organizations?.some(({ _id }) => {
      id === _id;
      console.log("ids", _id, id);
    }),
  );
  console.log("followers", organizations);

  console.log("primero:", isFollowing);
  useEffect(() => {
    setIsLoadingFollow(false);
    setIsFollowing(organizations?.some(({ _id }) => id === _id));
  }, [organizations, id]);
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
