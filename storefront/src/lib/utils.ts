import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const truncateText = (text: string, limit: number) => {
  if (text.length <= limit) return text

  // Find the last space within the limit to avoid cutting words in half
  const lastSpace = text.lastIndexOf(" ", limit)

  // If there's a space, slice there; otherwise, slice at limit
  const truncated =
    lastSpace > 0 ? text.slice(0, lastSpace) : text.slice(0, limit)

  return `${truncated}...`
}
