import React, { useState, useEffect } from "react";
import { Button, Text, Stack, Box } from "@chakra-ui/react";

// import Lottie from "react-lottie";
// import animationData from "./animation.json";
import styles from "./focusmode.module.css";
import { MdDatasetLinked } from "react-icons/md";

//imports for firebase
import "firebase/firestore";
import { db } from "../../../firebaseDB";


function FocusMode() {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [data, setData] = useState([]);

  // const [isStopped, setIsStopped] = useState(true);
  // const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning, startTime]);

  

  function handleStart() {
    setIsRunning(true);
    setStartTime(Date.now());
    // setIsStopped(false);
    // setIsPaused(false);
  }

    

  function handleStop() {
    setIsRunning(false);
    setEndTime(Date.now());
    setElapsedTime(0);
    db.collection("focusmode").add({
      startTime: startTime,
      endTime: endTime,
      elapsedTime: elapsedTime,
    })
      .then(() => {
        console.log("Data successfully written to Firestore!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
      setElapsedTime(0);
    // setIsStopped(true);
    // setIsPaused(true);
  }

  function formatTime(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  //for the animation
  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: animationData,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice",
  //   },
  // };

  return (
    <div className={styles.focuspage}>
      <Text as="b" fontSize="5xl">
        Focus Mode 🌟{" "}
      </Text>

      <Text fontSize="3xl">
        Time Spent: <Text as="span">{formatTime(elapsedTime)}</Text>
      </Text>

      {/* <Lottie
        options={defaultOptions}
        height={400}
        width={400}
        isStopped={isStopped}
        isPaused={isPaused}
      /> */}

      {!isRunning && (
        <Button colorScheme="teal" variant="outline" onClick={handleStart}>
          Start
        </Button>
      )}
      {isRunning && (
        <div className={styles.stop}>
          <Button colorScheme="red" variant="solid" onClick={handleStop}>
            Stop
          </Button>
          <br/>
        </div>

        
      )}
    </div>
  );
}

export default FocusMode;
