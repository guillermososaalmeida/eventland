import { Navigate } from "react-router-dom";
import { autoLoginOrg } from "../services/org.service";

export const useOrgAutoLogin = async (allOrganization, organizationLogin) => {
  try {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const { password, email } = allOrganization?.data?.organization;
    const customFormData = {
      email,
      password,
    };

    const sendData = await autoLoginOrg(customFormData);

    if (sendData?.status == 200) {
      // eslint-disable-next-line no-unsafe-optional-chaining
      const { name, email, image, check } = sendData?.data?.organization;
      const organizationCustom = {
        token: sendData.data.token,
        organization: name,
        email,
        image,
        check,
        _id: sendData.data.organization._id,
      };

      const stringOrganization = JSON.stringify(organizationCustom);
      organizationLogin(stringOrganization);
      return <Navigate to="/home" />;
    } else {
      return <Navigate to="/loginorg" />;
    }
  } catch (error) {
    console.log(error);
  }
};
