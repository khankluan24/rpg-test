import { createContext, useContext, useMemo, useState } from "react";

type GameState = "win" | "playing" | "lose" | "pause";

interface RootContextState {
  gameState: GameState;
  setGameState: (gameState: GameState) => void;
  isFirstPlay: boolean;
  setIsFirstPlay: (isFirstPlay: boolean) => void;
  currentNum: number;
  setCurrentNum: (currentNum: number) => void;
  isRestart: boolean;
  setIsRestart: (isRestart: boolean) => void;
}

const RootContext = createContext<RootContextState>({} as RootContextState);

const RootProvider = ({ children }: { children: React.ReactNode }) => {
  const [gameState, setGameState] =
    useState<RootContextState["gameState"]>("pause");

  const [isFirstPlay, setIsFirstPlay] = useState(true);
  const [currentNum, setCurrentNum] = useState(0);
  const [isRestart, setIsRestart] = useState(false);

  const value = useMemo(
    () => ({
      gameState,
      setGameState,
      isFirstPlay,
      setIsFirstPlay,
      currentNum,
      setCurrentNum,
      isRestart,
      setIsRestart,
    }),
    [gameState, isFirstPlay, currentNum, isRestart]
  );
  return <RootContext.Provider value={value}>{children}</RootContext.Provider>;
};

export const useRoot = () => {
  const context = useContext(RootContext);
  if (!context) {
    throw new Error("useRoot must be used within an RootProvider");
  }
  return context;
};

export default RootProvider;
