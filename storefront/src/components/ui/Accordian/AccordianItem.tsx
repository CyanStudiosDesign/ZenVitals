"use client"

import {
  createContext,
  ReactNode,
  useContext,
  useId,
  type HTMLAttributes,
} from "react"
import { AccordionContext } from "./Accordian"

type AccordionItemContextValue = {
  value: string
  isOpen: boolean
  triggerId: string
  contentId: string
  toggleItem: () => void
}

export const AccordionItemContext =
  createContext<AccordionItemContextValue | null>(null)

export function useAccordionItem() {
  const context = useContext(AccordionItemContext)

  if (!context) {
    throw new Error(
      "AccordionTrigger and AccordionContent must be used inside AccordionItem."
    )
  }

  return context
}

type AccordionItemProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  value: string
}

export default function AccordionItem({
  children,
  value,
  className = "",
  ...props
}: AccordionItemProps) {
  const accordion = useContext(AccordionContext)
  const id = useId()

  if (!accordion) {
    throw new Error("AccordionItem must be used inside Accordion.")
  }

  const { openItem, setOpenItem } = accordion
  const isOpen = openItem === value

  function toggleItem() {
    setOpenItem((currentItem) => (currentItem === value ? null : value))
  }

  return (
    <AccordionItemContext.Provider
      value={{
        value,
        isOpen,
        triggerId: `${id}-trigger`,
        contentId: `${id}-content`,
        toggleItem,
      }}
    >
      <div className={className} {...props}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  )
}
