import { useEffect, useState } from "react";
import { nextEvents } from "../../services/user.service";
import "./FutureEvents.css";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";

export const FutureEvents = () => {
  const [events, setEvents] = useState([{}]);

  useEffect(() => {
    const getFutureEvents = async () => {
      const res = await nextEvents();
      if (res.status === 200) setEvents(res.data.data);
    };
    getFutureEvents();
  }, []);

  const next =
    "https://res.cloudinary.com/dhr13yihn/image/upload/v1694703917/arrow-left-3099_qst1pk.svg";
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const nextIndex = () => {
    activeIndex < events.data?.data.length - 1
      ? setActiveIndex(activeIndex + 1)
      : setActiveIndex(0);
  };

  const preIndex = () => {
    activeIndex == 0
      ? setActiveIndex(events.data?.data.length - 1)
      : setActiveIndex(activeIndex - 1);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => nextIndex(),
    onSwipedRight: () => preIndex(),
  });
  //!PREGUNTAR A LAURA CLASE INNER Y CLASE ACTIVEIMG
  //!PREGUNTAR A LAURA CLASE INNER Y CLASE ACTIVEIMG
  //!PREGUNTAR A LAURA CLASE INNER Y CLASE ACTIVEIMG
  //!PREGUNTAR A LAURA CLASE INNER Y CLASE ACTIVEIMG
  //!PREGUNTAR A LAURA CLASE INNER Y CLASE ACTIVEIMG
  //!PREGUNTAR A LAURA CLASE INNER Y CLASE ACTIVEIMG
  //!PREGUNTAR A LAURA CLASE INNER Y CLASE ACTIVEIMG
  //!PREGUNTAR A LAURA CLASE INNER Y CLASE ACTIVEIMG
  //!PREGUNTAR A LAURA CLASE INNER Y CLASE ACTIVEIMG
  //!PREGUNTAR A LAURA CLASE INNER Y CLASE ACTIVEIMG
  //!PREGUNTAR A LAURA CLASE INNER Y CLASE ACTIVEIMG
  //!PREGUNTAR A LAURA CLASE INNER Y CLASE ACTIVEIMG
  //!PREGUNTAR A LAURA CLASE INNER Y CLASE ACTIVEIMG
  //!PREGUNTAR A LAURA CLASE INNER Y CLASE ACTIVEIMG
  //!PREGUNTAR A LAURA CLASE INNER Y CLASE ACTIVEIMG
  //!PREGUNTAR A LAURA CLASE INNER Y CLASE ACTIVEIMG
  //!PREGUNTAR A LAURA CLASE INNER Y CLASE ACTIVEIMG
  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        nextIndex();
      }
    }, 2000);
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });
  return (
    <div
      {...handlers}
      className="generalContainer"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="inner"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {events.length &&
          events.map((event, index) => (
            <div
              key={index}
              className="imageOuterContainer"
              style={
                index === events.length - 1 ? { position: "relative" } : null
              }
            >
              <div className="imageInnerContainer">
                <img className="image" src={event.image} />
                <section className="sectionImage">
                  <h2 className="imageName">Nombre del evento</h2>
                  <button
                    className="imageNavigate"
                    onClick={() => navigate(`/eventdetail/${event._id}`)}
                  >
                    VER DETALLES
                  </button>
                </section>
              </div>
            </div>
          ))}
        <div className="buttonsScrollContainer">
          <button
            onClick={() => {
              preIndex;
            }}
          >
            <img
              className="imagePrevious"
              src={next}
              alt="button to the previous image"
            />
          </button>
          <button onClick={() => nextIndex()}>
            <img
              className="imageNext"
              src={next}
              alt="button to the next image"
            />
          </button>
        </div>
        <div className="setActiveIndexOuterDiv">
          <div className="setActiveIndexInnerDiv">
            <span className="spanActive"></span>
          </div>
        </div>
      </div>
    </div>
  );
};
