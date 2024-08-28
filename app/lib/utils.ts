import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseOffset(url: string) {
  const offset = new URL(url).searchParams.get("offset");
  return offset ? parseInt(offset, 10) : 0;
}

export function formatName(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}
