import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import audioFile from "./theentertainer.mp3";

const images = [
  "https://imgur.com/CuzG1Bc.png",
  "https://imgur.com/PDydO4E.png",
  "https://imgur.com/5z4f5SA.png",
  "https://imgur.com/ujgTwCL.png",
  "https://imgur.com/DiY3Gth.png",
  "https://imgur.com/GBGx6LW.png",
  "https://imgur.com/mEQiEnd.png",
  "https://imgur.com/RLnsjQd.png",
  "https://imgur.com/pwli5Jp.png"
];

const transitionDuration = 500;

export default function App() {
  const [currentImage, setCurrentImage] = useState(0);
  const [transitionClass, setTransitionClass] = useState("");
  const audioRef = useRef(null);
  const [audioPlaying, setAudioPlaying] = useState(false);

  const handlePrevious = () => {
    setTransitionClass("slide-right");
    setTimeout(() => {
      setCurrentImage((prevImage) =>
        prevImage === 0 ? images.length - 1 : prevImage - 1
      );
      setTransitionClass("");
    }, transitionDuration);
  };

  const handleNext = () => {
    setTransitionClass("slide-left");
    setTimeout(() => {
      setCurrentImage((prevImage) =>
        prevImage === images.length - 1 ? 0 : prevImage + 1
      );
      setTransitionClass("");
    }, transitionDuration);
  };

  const handleAudioToggle = () => {
    setAudioPlaying((prevAudioPlaying) => !prevAudioPlaying);
  };
  
  useEffect(() => {
    const audio = audioRef.current;
    if (audioPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [audioPlaying]);
  

  return (
    <div>
      <h1>Project 1: Carousel</h1>
      <div className="container">
        <button className="previous-button slides" onClick={handlePrevious}>
          <span className="arrow">⇦</span>
        </button>
        <div className="container2 your-class slides">
          <img
            className={`carousel-image ${transitionClass}`}
            src={images[currentImage]}
            alt="carousel"
          />
        </div>
        <button className="next-button slides" onClick={handleNext}>
          <span className="arrow">⇨</span>
        </button>
      </div>
      <div className="audio-container">
        <audio
          ref={audioRef}
          id="background-audio"
          src={audioFile}
          loop
        />
        <button className="audio-button center" onClick={handleAudioToggle}>
          {audioPlaying ? "Pause Audio" : "Start Audio"}
        </button>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));