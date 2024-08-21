import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import BubbleList from "./components/bubble/List";
import { Button } from "./components/ui/button";
import { useRoot } from "./contexts/Root";
import { cn, formatTime } from "./lib/utils";

interface HandleGameState {
  title: string;
  color: string;
}

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [points, setPoints] = useState(0);
  const [time, setTime] = useState(0);

  const {
    gameState,
    isFirstPlay,
    setIsFirstPlay,
    setCurrentNum,
    setGameState,
    setIsRestart,
  } = useRoot();

  const handleGameState = useMemo((): HandleGameState => {
    switch (gameState) {
      case "win":
        return {
          title: "all cleared",
          color: "text-green-700",
        };
      case "lose":
        return {
          title: "game over",
          color: "text-destructive",
        };

      default:
        return {
          title: "let's play",
          color: "text-black",
        };
    }
  }, [gameState]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (gameState === "playing") {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 100);
      setIsRestart(false);
    }
    return () => clearInterval(intervalId);
  }, [points, gameState]);

  const handleTriggerGame = () => {
    if (isFirstPlay) {
      setIsFirstPlay(false);
    }

    setGameState("playing");
    setCurrentNum(0);
    const inputVal = inputRef.current?.value;
    setPoints(Number(inputVal));
    setTime(0);
    setIsRestart(true);
  };

  return (
    <div className="flex flex-col gap-3">
      <h1
        className={cn("uppercase w-fit font-semibold ", handleGameState.color)}
      >
        {handleGameState.title}
      </h1>
      <div className="flex justify-between items-center w-1/3">
        <label htmlFor="">Points:</label>
        <input
          type="number"
          className=" border-black border basis-1/2"
          ref={inputRef}
          defaultValue={3}
        />
      </div>
      <div className="flex justify-between items-center w-1/3">
        <span>Time:</span>
        <span className="basis-1/2 text-left">{formatTime(time)}</span>
      </div>
      <Button onClick={handleTriggerGame} className=" w-fit">
        {isFirstPlay ? "Play" : "Restart"}
      </Button>
      <BubbleList bubbles={points} />
    </div>
  );
}

export default App;
