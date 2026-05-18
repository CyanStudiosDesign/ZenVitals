import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "components/ui/Accordian"

type Question = {
  question: string
  answer: string
}

const questions: Question[] = [
  {
    question: "How this work?",
    answer:
      "Yet bed any for assistance indulgence unpleasing. Not thoughts all exercise blessing. Indulgence way everything joy alteration boisterous the attachment.",
  },
  {
    question: "Are there any additional fees?",
    answer:
      "Yet bed any for assistance indulgence unpleasing. Not thoughts all exercise blessing. Indulgence way everything joy alteration boisterous the attachment.",
  },
  {
    question: "How can I get the app?",
    answer:
      "Yet bed any for assistance indulgence unpleasing. Not thoughts all exercise blessing. Indulgence way everything joy alteration boisterous the attachment.",
  },
  {
    question: "What features do you offer and other not?",
    answer:
      "Yet bed any for assistance indulgence unpleasing. Not thoughts all exercise blessing. Indulgence way everything joy alteration boisterous the attachment.",
  },
]

export default function FAQsection() {
  return (
    <main className="w-full">
      <section className="mx-auto flex w-full flex-col md:flex-row max-w-7xl gap-10 bg-white px-8 py-16 md:px-20 md:py-24">
        <div className="flex w-full flex-col justify-center gap-6">
          <h2 className="text-4xl font-extrabold italic uppercase tracking-tighter">
            FAQs
          </h2>
          <p className="text-gray-500 leading-relaxed">
            Yet bed any for assistance indulgence unpleasing. Not thoughts all
            exercise blessing. Indulgence way everything joy alteration
            boisterous the attachment.
          </p>
          {/*
          <a
            className="inline-flex w-fit items-center gap-2 text-sm font-medium text-indigo-700 transition-all duration-200 hover:gap-3"
            href="#faqs"
          >
            More FAQs <span aria-hidden="true">-&gt;</span>
          </a>{" "} */}
        </div>

        <Accordion className="w-full" defaultValue={questions[0]?.question}>
          <div id="faqs">
            {questions.map((item) => (
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
