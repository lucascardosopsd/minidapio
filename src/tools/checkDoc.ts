export const checkDoc = (document: string) => {
  const doc = document.replace(/\D/g, "");

  if (doc.length === 11) {
    return "CPF";
  } else if (doc.length === 14) {
    return "CNPJ";
  } else {
    return "Documento inválido";
  }
};
