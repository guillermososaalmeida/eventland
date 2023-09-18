import { Avatar, AvatarGroup, Box, Text } from "@chakra-ui/react";

export const AvatarCustomGroup = ({ event, isFollowers, setIsFollowers }) => {
  return (
    <Box m="10">
      <Text pr="1em" letterSpacing="1px" m="5">
        Asistentes:
      </Text>
      <AvatarGroup size="md" max={3}>
        {/* hacer un estado del array event.usersAttend
        desacoplar todo */}
        {event?.usersAttend?.map((user) => (
          <Avatar name={user?.name} src={user?.image} key={user?._id} />
        ))}
      </AvatarGroup>
    </Box>
  );
};
