interface StatusI18nProps {
  [key: string]: string;
}

export const statusI18n: StatusI18nProps = {
  PENDING: "Pendente",
  RECEIVED: "Recebido",
  CONFIRMED: "Confirmado",
  OVERDUE: "Vencido",
  REFUNDED: "Reembolsado",
  RECEIVED_IN_CASH: "Recebido em Dinheiro",
  REFUND_REQUESTED: "Reembolso Solicitado",
  REFUND_IN_PROGRESS: "Reembolso em Andamento",
  CHARGEBACK_REQUESTED: "Chargeback Solicitado",
  CHARGEBACK_DISPUTE: "Disputa de Chargeback",
  AWAITING_CHARGEBACK_REVERSAL: "Aguardando Reversão de Chargeback",
  DUNNING_REQUESTED: "Cobrança Solicitada",
  DUNNING_RECEIVED: "Cobrança Recebida",
  AWAITING_RISK_ANALYSIS: "Aguardando Análise de Risco",
};
