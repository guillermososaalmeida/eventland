import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Center,
} from "@chakra-ui/react";
import { ChangePassword, FormProfile } from "../../../components";

export const Profile = () => {
  //? -------- Cambio de contraseña con token

  //?--------- Cambio de datos del usuario

  //?--------- Borrado del usuario

  return (
    <>
      <Tabs isFitted variant="enclosed" size="lg" w="80vw">
        <TabList mb="1em">
          <Tab flexDir="column">
            <img
              src="https://res.cloudinary.com/dq186ej4c/image/upload/v1686125399/pngwing.com_npd5sa.png"
              alt="go to ChangePassword"
              className="iconNav"
            />
            <p>Edit Profile</p>
          </Tab>
          <Tab flexDir="column">
            <img
              src="https://res.cloudinary.com/dq186ej4c/image/upload/v1686125391/Change_User_icon-icons.com_55946_lypx2c.png"
              alt="go to change data profile"
              className="iconNav iconChangeProfile"
            />
            <p>Change Password</p>
          </Tab>
        </TabList>
        <TabPanels mt="-5">
          <TabPanel>
            <Center>
              <FormProfile />
            </Center>
          </TabPanel>
          <TabPanel>
            <Center>
              <ChangePassword />
            </Center>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
