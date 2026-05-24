"use client"

import { ReactNode, type HTMLAttributes } from "react"
import { useAccordionItem } from "./AccordianItem"

type AccordionContentProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
}

export default function AccordionContent({
  children,
  className = "",
  ...props
}: AccordionContentProps) {
  const { contentId, isOpen, triggerId } = useAccordionItem()

  return (
    <div
      aria-labelledby={triggerId}
      className={`grid transition-all duration-300 ease-in-out ${
        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr]  opacity-0"
      }`}
      hidden={false}
      id={contentId}
      role="region"
      {...props}
    >
      <div className="overflow-hidden">
        <div className={className}>{children}</div>
      </div>
    </div>
  )
}
