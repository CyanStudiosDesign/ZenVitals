"use client"

import { ReactNode, type ButtonHTMLAttributes } from "react"
import { useAccordionItem } from "./AccordianItem"

type AccordionTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
}

export default function AccordionTrigger({
  children,
  className = "",
  ...props
}: AccordionTriggerProps) {
  const { contentId, isOpen, toggleItem, triggerId } = useAccordionItem()

  return (
    <button
      aria-controls={contentId}
      aria-expanded={isOpen}
      className={className}
      id={triggerId}
      onClick={toggleItem}
      type="button"
      {...props}
    >
      {children}
      <span
        aria-hidden="true"
        className={`text-xl font-light text-gray-600 transition-transform duration-300 ease-in-out ${
          isOpen ? "rotate-180" : "rotate-0"
        }`}
      >
        {isOpen ? "-" : "+"}
      </span>
    </button>
  )
}
