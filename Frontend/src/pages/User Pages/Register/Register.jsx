import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { registerUser } from "../../../services/user.service";
import { useRegisterError } from "../../../hooks/useRegisterError";

export const Register = () => {
  const { setUserComplete, bridgeData } = useAuth();
  const {
    register,
    hanleSubmit,
    formState: { errors },
  } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [okRegister, setOkRegister] = useState(false);
  const [gender, setGender] = useState(null);

  const formSubmit = async (formData) => {
    const inputFile = document.getElementById("file-upload").files;
    if (inputFile.length !== 0) {
      const customFormData = {
        ...formData,
        role: "cliente",
        gender: gender,
        image: inputFile[0],
      };
      setSend(true);
      setRes(await registerUser(customFormData));
      setSend(false);
    } else {
      const customFormData = {
        ...formData,
        role: "cliente",
        gender: gender,
      };
      setSend(true);
      setRes(await registerUser(customFormData));
      setSend(false);
    }
  };
  useEffect(() => {
    useRegisterError(res, setOkRegister, setRes, setUserComplete);
    if (res?.status === 200) bridgeData("USERCOMPLETE");
  }, [res]);

  if (okRegister) {
    return <Navigate to="/check" />;
  }
  return (
    <></>

    // <div>
    //   <Link to="/login">Login</Link>
    //   <br />
    //   <Link to="/check">Check Code</Link>
    // </div>
  );
};
