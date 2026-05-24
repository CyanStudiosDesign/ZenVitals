"use client"

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react"

type AccordionContextValue = {
  openItem: string | null
  setOpenItem: Dispatch<SetStateAction<string | null>>
}

export const AccordionContext = createContext<AccordionContextValue | null>(
  null
)

type AccordionProps = {
  children: ReactNode
  defaultValue?: string
  className?: string
}

export default function Accordion({
  children,
  defaultValue,
  className = "",
}: AccordionProps) {
  const [openItem, setOpenItem] = useState<string | null>(defaultValue ?? null)

  return (
    <div className={className}>
      <AccordionContext.Provider value={{ openItem, setOpenItem }}>
        {children}
      </AccordionContext.Provider>
    </div>
  )
}
