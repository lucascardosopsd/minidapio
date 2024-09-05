import { Check } from "lucide-react";

const Step5Complete = () => {
  return (
    <div className="flex items-center justify-center flex-col py-10">
      <div className="w-16 h-16 rounded-full flex items-center justify-center border border-border">
        <Check size={32} />
      </div>

      <p className="text-2xl font-semibold text-primary">Tudo certo!</p>
      <p className="text-center">
        Adptação ao plano inferior concluída. Clique em "concluir" para acessar
        o painel.
      </p>
    </div>
  );
};

export default Step5Complete;
