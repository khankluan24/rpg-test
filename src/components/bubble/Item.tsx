import { useRoot } from "@/contexts/Root";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface BubbleItemProps {
  position: number;
  parentRef: React.RefObject<HTMLDivElement>;
  bubbles: number;
}
const BubbleItem = ({ position, parentRef, bubbles }: BubbleItemProps) => {
  const [visible, setVisible] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const { setGameState, currentNum, setCurrentNum, isRestart } = useRoot();

  useEffect(() => {
    if (parentRef.current) {
      const parentRect = parentRef.current.getBoundingClientRect();

      const maxX = parentRect.width - 32; // padding x
      const maxY = parentRect.height - 32; // padding Y
      const x = Math.floor(Math.random() * maxX);
      const y = Math.floor(Math.random() * maxY);
      setPos({ x, y });
      setVisible(true);
    }
    return () => {
      setClicked(false);
    };
  }, [parentRef, bubbles, isRestart]);

  useEffect(() => {
    if (currentNum === bubbles && !visible) {
      setTimeout(() => {
        setGameState("win");
      }, 1500);
    }
  }, [currentNum, visible, bubbles]);

  if (!visible || !parentRef.current) return null;

  const handleClick = () => {
    if (position - currentNum === 1) {
      setCurrentNum(currentNum + 1);
      setClicked(true);
      setTimeout(() => {
        setVisible(false);
      }, 1000);
    } else {
      setGameState("lose");
    }
  };

  return (
    <div
      className={cn(
        "border-black bg-white border absolute rounded-full flex items-center justify-center size-10 font-bold transition-colors duration-1000 hover:cursor-pointer",
        clicked && " bg-red-600"
      )}
      style={{
        top: `${pos.y}px`,
        left: `${pos.x}px`,
      }}
      onClick={handleClick}
    >
      {position}
    </div>
  );
};
export default BubbleItem;
