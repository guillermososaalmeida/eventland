import { Heading, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";

export const Countdown = ({ date }) => {
  const bg = useColorModeValue("#ebeceecc", "#1a202ccc");
  const [time, setTime] = useState("");
  let countDownDate = new Date(date).getTime();
  let x = setInterval(() => {
    let now = new Date().getTime();

    let distance = countDownDate - now;

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    setTime(days + "d " + hours + "h " + minutes + "m " + seconds + "s ");

    if (distance < 0) {
      clearInterval(x);
      setTime("Evento finalizado");
    }
  }, 1000);
  return (
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
      {time}
    </Heading>
  );
};
