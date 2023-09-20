import { Heading } from "@chakra-ui/react";

import "./Welcome.css";

export const Welcome = () => {
  return (
    <>
      <div className="fullContainer">
        <Heading w="15em" className="textoCabecera">
          Todos los eventos al alcance de tu mano en Eventland
        </Heading>

        <div className="grid">
          <img
            className="image1"
            src="https://res.cloudinary.com/dhr13yihn/image/upload/v1695223761/proyectoEventland/assets/OIG_ovz6jg.jpg"
          />
          <img
            className="image2"
            src="https://res.cloudinary.com/dhr13yihn/image/upload/v1695223741/proyectoEventland/assets/OIG_vtzvto.jpg"
          />
          <img
            className="image3"
            src="https://res.cloudinary.com/dhr13yihn/image/upload/v1695223064/proyectoEventland/assets/OIG_vv006f.jpg"
          />
          <img
            className="image4"
            src="https://res.cloudinary.com/dhr13yihn/image/upload/v1695223056/proyectoEventland/assets/OIG_exlai3.jpg"
          />
          <img
            className="image5"
            src="https://res.cloudinary.com/dhr13yihn/image/upload/v1695223045/proyectoEventland/assets/OIG_jjtect.jpg"
          />
          <img
            className="image6"
            src="https://res.cloudinary.com/dhr13yihn/image/upload/v1695226016/proyectoEventland/assets/OIG_lfkcw1.jpg"
          />
        </div>
      </div>
    </>
  );
};
