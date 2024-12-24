import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const pageSize = 10

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
