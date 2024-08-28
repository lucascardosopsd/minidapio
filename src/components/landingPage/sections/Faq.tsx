// @ts-nocheck
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Headset } from "lucide-react";
import Link from "next/link";

const Faq = () => {
  const questions = [
    {
      question: "Existe contrato de fidelidade?",
      answer:
        "Não. Sua assinatura pode ser cancelada a qualquer momento, sem aviso prévio e sem qualquer multa.",
    },
    {
      question: "Quais são os métodos de pagamento?",
      answer: "Cartão via crédito através do método de assinatura recorrente.",
    },
    {
      question: "Posso regredir de plano?",
      answer:
        "Sim, porém haverá a necessidade de desativar restaurantes, categorias ou itens excedentes ao plano menor.",
    },
    {
      question: "O que acontece quando o período de testes acaba?",
      answer:
        "O cardápio é suspenso até que haja a o pagamento de algum plano.",
    },
    {
      question: "E se eu cancelar meu plano mas o pagamento estar em dia?",
      answer:
        "Seu cardápio continuará ativo até que o pagamento encerre o périodo.",
    },
  ];

  return (
    <section className="container min-h-svh tablet:h-svh flex flex-col items-center justify-center gap-10">
      <p className="text-4xl text-primary font-semibold">
        Responda sua pergunta
      </p>

      <div className="flex flex-col">
        {questions.map((question, index) => (
          <Accordion
            type="single"
            collapsible
            key={index}
            className="w-full max-w-[500px]"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>{question.question}</AccordionTrigger>
              <AccordionContent>{question.answer}</AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>

      <div className="flex flex-col items-center gap-2">
        <p>Sua dúvida não está aqui? Clique no botão abaixo</p>

        <Link
          href="https://api.whatsapp.com/send?phone=5517996484654"
          className="w-full flex justify-center"
          target="_blank"
        >
          <Button className="gap-2">
            <span className="hidden tablet:block">Suporte</span> <Headset />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Faq;
