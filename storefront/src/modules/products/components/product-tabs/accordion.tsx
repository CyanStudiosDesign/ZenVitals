"use client"

import * as AccordionPrimitive from "@radix-ui/react-accordion"
import React from "react"

type AccordionItemProps = AccordionPrimitive.AccordionItemProps & {
  title: string
  subtitle?: string
  description?: string
  forceMountContent?: true
  headingSize?: "small" | "medium" | "large"
  customTrigger?: React.ReactNode
  children: React.ReactNode
}

type AccordionProps =
  | AccordionPrimitive.AccordionSingleProps
  | AccordionPrimitive.AccordionMultipleProps

const Accordion: React.FC<AccordionProps> & {
  Item: React.FC<AccordionItemProps>
} = ({ children, ...props }) => {
  return (
    <AccordionPrimitive.Root {...props}>{children}</AccordionPrimitive.Root>
  )
}
const Item: React.FC<AccordionItemProps> = ({
  title,
  subtitle,
  description,
  children,
  className,
  customTrigger,
  forceMountContent,
  headingSize, // 👈 extract it so it doesn't go into ...props
  ...props // now safe
}) => {
  return (
    <AccordionPrimitive.Item
      {...props}
      className={`border-t border-gray-200 last:border-b py-3 ${
        className || ""
      }`}
    >
      <AccordionPrimitive.Header className="px-2">
        <div className="flex flex-col">
          <AccordionPrimitive.Trigger className="group w-full">
            <div className="flex w-full items-center justify-between py-2">
              {/* Title */}
              <div className="flex items-center gap-4">
                <span className="text-base md:text-lg font-medium text-gray-800">
                  {title}
                </span>
              </div>

              {/* Trigger Icon */}
              {customTrigger || <MorphingTrigger />}
            </div>
          </AccordionPrimitive.Trigger>

          {/* Subtitle */}
          {subtitle && (
            <span className="text-sm text-gray-500 mt-1">{subtitle}</span>
          )}
        </div>
      </AccordionPrimitive.Header>

      <AccordionPrimitive.Content
        forceMount={forceMountContent}
        className="
          overflow-hidden text-sm text-gray-600
          data-[state=closed]:animate-accordion-up
          data-[state=open]:animate-accordion-down
        "
      >
        <div className="px-2 pb-3">
          {description && <p className="mb-2 text-gray-500">{description}</p>}
          <div>{children}</div>
        </div>
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  )
}

Accordion.Item = Item

const MorphingTrigger = () => {
  return (
    <div className="relative w-5 h-5">
      {/* Vertical line */}
      <span
        className="
        absolute left-1/2 top-1/4 w-0.5 h-1/2 bg-gray-500 
        -translate-x-1/2 transition-transform duration-300
        group-data-[state=open]:rotate-90
      "
      />

      {/* Horizontal line */}
      <span
        className="
        absolute top-1/2 left-1/4 h-0.5 w-1/2 bg-gray-500 
        -translate-y-1/2 transition-all duration-300
        group-data-[state=open]:opacity-0
      "
      />
    </div>
  )
}

export default Accordion
