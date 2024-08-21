import { useRoot } from "@/contexts/Root";
import { useRef } from "react";
import BubbleItem from "./Item";

export interface BubbleListProps {
  bubbles: number;
}
const BubbleList = ({ bubbles }: BubbleListProps) => {
  const listRef = useRef<HTMLDivElement>(null);

  const { isFirstPlay } = useRoot();

  const renderBubbles = Array.from({ length: bubbles }, (_, i) => (
    <BubbleItem
      parentRef={listRef}
      bubbles={bubbles}
      key={i}
      position={i + 1}
    />
  ));
  return (
    <div
      ref={listRef}
      className="border-black border w-7/12 h-[70vh] p-4 relative"
    >
      {!isFirstPlay && renderBubbles}
    </div>
  );
};
export default BubbleList;
