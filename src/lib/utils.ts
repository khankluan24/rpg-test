import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTime = (time: number) => {
  const seconds = Math.floor(time / 10);
  const mili = time % 10;
  return `${seconds}.${mili}s`;
};
