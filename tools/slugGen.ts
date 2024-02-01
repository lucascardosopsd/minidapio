export const slugGen = (string: string): string => {
  const cleanedString = string
    .toLowerCase() // Converte a string para minúsculas
    .replace(/[^\w\s-]/g, "") // Remove caracteres especiais
    .replace(/\s+/g, "-") // Substitui espaços por traços
    .replace(/--+/g, "-"); // Remove múltiplos traços consecutivos

  return cleanedString;
};
