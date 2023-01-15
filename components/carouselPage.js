import { useEffect } from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ArrowLeftIcon,ArrowRightIcon } from '@heroicons/react/24/outline'


export default function CarouselPage() {
  const [carousel, setCarousel] = useState([
    { name: "image1", href: "image", current: true },
    { name: "image2", href: "image", current: false },
    { name: "image3", href: "image", current: false },
  ]);
  const [name, setName] = useState("image1");

  function currentCarousel(itemName) {
    let copiedCarousel = [...carousel];
    for (let i = 0; i < copiedCarousel.length; i++) {
      let copiedValue = { ...copiedCarousel[i] };
      if (copiedValue.name === itemName) {
        copiedValue.current = true;
      } else {
        copiedValue.current = false;
      }
      copiedCarousel[i] = copiedValue;
    }
    setCarousel(copiedCarousel);
  }

  function previousCarousel() {
    let copiedCarousel = [...carousel];
    var changeIndex;
    var newArray = copiedCarousel.filter(function (value, index) {
      if (value.current === true) {
        changeIndex = index;
        value.current = false;
      }
      return value;
    });
    var setArray = newArray.filter(function (value, index) {
      if (changeIndex === 0 && index === newArray.length - 1) {
        value.current = true;
      }
      if (changeIndex !== 0 && changeIndex - 1 === index) {
        value.current = true;
      }
      return value;
    });

    setCarousel(setArray);
  }

  function nextCarousel() {
    let copiedCarousel = [...carousel];
    var changeIndex;
    var newArray = copiedCarousel.filter(function (value, index) {
      if (value.current === true) {
        changeIndex = index;
        value.current = false;
      }
      return value;
    });
    var setArray = newArray.filter(function (value, index) {
      if (changeIndex === newArray.length - 1 && index === 0) {
        value.current = true;
      }
      if (changeIndex !== newArray.length - 1 && changeIndex + 1 === index) {
        value.current = true;
      }
      return value;
    });

    setCarousel(setArray);
  }

  useEffect(() => {
    currentCarousel(name);
  }, [name]);

  return (
    <>
      <div
        id="carouselDarkVariant"
        className="carousel slide carousel-fade carousel-dark relative"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
          {carousel.map((item, index) => (
            <button
              key={index}
              data-bs-target="#carouselDarkVariant"
              data-bs-slide-to={index.toString()}
              className={item.current ? "active bg-white" : ""}
              aria-current={item.current ? "true" : "false"}
              aria-label="Slide 1"
              onClick={() => setName(item.name)}
            ></button>
          ))}
        </div>
        <div className="carousel-indicators absolute right-0 top-1/3 left-0 flex justify-center p-0 mb-4">
        <p className="text-white text-6xl w-full">
                NEW BRONZE CARDS
              </p>
             
        </div>

        <div className="carousel-inner relative w-full overflow-hidden">
        
          {carousel.map((item, index) => (
            <div
              className={
                item.current
                  ? "active"
                  : "" + "carousel-item relative float-left w-full"
              }
              key={index}
            >
              <img
                src={
                  "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2823&q=80"
                }
                className="block w-full"
                alt={item.name}
              />
              
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline "
          type="button"
          data-bs-target="#carouselDarkVariant"
          data-bs-slide="prev"
          onClick={() => previousCarousel()}
        >
          <ArrowLeftIcon className="w-8 h-8"></ArrowLeftIcon>
        </button>
        <button
          className="carousel-control-next absolute top-0 bottom-0 right-32 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline "
          type="button"
          data-bs-target="#carouselDarkVariant"
          data-bs-slide="next"
          onClick={() => nextCarousel()}
        >
          <ArrowRightIcon className="w-8 h-8"></ArrowRightIcon>
        </button>
      </div>
    </>
  );
}
