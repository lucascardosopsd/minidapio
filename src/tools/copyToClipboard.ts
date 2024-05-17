"use client";

import { toast } from "sonner";

export const copyToClipboard = (
  text: string,
  elementId: string,
  message = "Copiado com sucesso"
) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);

    toast(message || "Copiado com Sucesso");
  } else {
    const textarea = document.createElement(elementId) as HTMLInputElement;

    if (textarea.value) {
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);

      toast("Copiado com Sucesso");
    }
  }
};
