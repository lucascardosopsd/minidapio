interface PaymentMethodsProps {
  label: string;
  title: string;
}

export const paymentMethods: PaymentMethodsProps[] = [
  {
    label: "credit",
    title: "Crédito",
  },
  {
    label: "debit",
    title: "Débito",
  },
  {
    label: "cash",
    title: "Dinheiro",
  },
  {
    label: "pix",
    title: "PIX",
  },
  {
    label: "bankCheck",
    title: "Cheque",
  },
];
