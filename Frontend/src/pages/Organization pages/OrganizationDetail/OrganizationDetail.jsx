import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { getOrgById } from "../../../services/org.service";
import { OrgNextEvents } from "../../../components/OrgNextEvents/OrgNextEvents";
import { useFollowOrg } from "../../../hooks/User Hooks/useFollowOrg";
import { AvatarFollowers } from "../../../components";

export const OrganizationDetail = () => {
  const { id } = useParams();
  const [organization, setOrganization] = useState({});
  const bg = useColorModeValue("#ebeceecc", "#1a202ccc");
  const { isFollowing, handleFollow, isLoadingFollow } = useFollowOrg(id);
  useEffect(() => {
    (async () => {
      setOrganization(await getOrgById(id));
    })();
  }, [id, isFollowing]);

  return (
    <>
      <Stack align="center">
        <Box maxWidth="900px" position="relative" display="inline-block">
          <Heading
            position="absolute"
            bg={bg}
            rounded="10"
            p="4"
            top="0"
            left="0"
            m="2"
          >
            {organization.name}
          </Heading>
          <Heading
            size="sm"
            position="absolute"
            bg={bg}
            rounded="10"
            p="4"
            top="20"
            left="0"
            m="2"
          >
            {organization.events?.length
              ? organization.events?.length > 1
                ? "Con " + organization.events?.length + " eventos organizados"
                : "Con un evento organizado"
              : "¡Estate atento para cuando organize su primer evento!"}
          </Heading>
          <Heading
            position="absolute"
            bg={bg}
            rounded="10"
            p="4"
            bottom="12"
            right="0"
            m="2"
          >
            {organization.usersFav?.length
              ? organization.usersFav.length > 1
                ? "La siguen : " + organization.usersFav?.length + " usuarios"
                : "La sigue 1 usuario"
              : "¡Sé el primero en seguirla!"}
          </Heading>
          <Heading
            bg={bg}
            size="lg"
            rounded="7"
            position="absolute"
            p="10px"
            fontSize="17"
            bottom="0"
            right="0"
            m="2"
          >
            {"Contáctanos en: " + organization.email}
          </Heading>

          <Button
            position="absolute"
            bottom="12"
            bg={bg}
            m="2"
            onClick={handleFollow}
            isLoading={isLoadingFollow}
          >
            {isFollowing ? "Dejar de seguir" : "Seguir"}
          </Button>

          <Image
            minWidth="600px"
            src={organization.image}
            alt={organization.name}
            onError={(e) => {
              e.target.src =
                "https://res.cloudinary.com/dhr13yihn/image/upload/v1693994819/proyectoEventland/eventAssets/Illustration_of_a_group_of_people_all_feeling_different_emotions_dzvspy.jpg";
            }}
            maxWidth="100%"
          />
        </Box>
        <Flex maxWidth="900px" p="2" align="center" gap="6em">
          {organization.description}
          <AvatarFollowers
            organization={organization}
            isFollowing={isFollowing}
          />
        </Flex>
        <Divider />
      </Stack>
      <OrgNextEvents />
    </>
  );
};
