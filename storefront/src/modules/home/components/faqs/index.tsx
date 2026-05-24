import { questions } from "@lib/data/faq"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "components/ui/accordion"

interface Props {
  limit?: number
  allowMore?: boolean
}

export default function FAQsection({ limit, allowMore = false }: Props) {
  return (
    <main className="w-full">
      <section className="mx-auto flex w-full items-start flex-col md:flex-row max-w-7xl gap-10 bg-white px-8 py-16 md:px-20 md:py-24">
        <div className="flex py-8 w-full flex-col justify-center gap-6">
          <h2 className="text-4xl font-extrabold italic uppercase tracking-tighter">
            FAQs
          </h2>
          <p className="text-gray-500 leading-relaxed">
            Find quick answers to common questions about our products, ordering
            process, and delivery times. If you can't find what you're looking
            for here, our customer support team is always ready to help.
          </p>
          {allowMore && (
            <LocalizedClientLink
              className="inline-flex w-fit items-center gap-2 text-sm font-medium text-indigo-700 transition-all duration-200 hover:gap-3"
              href="/faqs"
            >
              More FAQs <span aria-hidden="true">-&gt;</span>
            </LocalizedClientLink>
          )}
        </div>

        <Accordion className="w-full" defaultValue={questions[0]?.question}>
          <div id="faqs">
            {questions.slice(0, limit).map((item) => (
              <AccordionItem
                className="border-b border-gray-300 py-4 first:border-t-0"
                key={item.question}
                value={item.question}
              >
                <AccordionTrigger className="flex w-full items-center justify-between gap-4 text-left">
                  <span className="text-xl font-medium text-gray-900">
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pt-3 pr-8 leading-relaxed text-gray-500">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </div>
        </Accordion>
      </section>
    </main>
  )
}
