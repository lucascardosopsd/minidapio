"use client";
import LoginIllustration from "@/components/illustration/Login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Login() {
  return (
    <main className="flex items-center justify-center h-svh gap-8">
      <div className="flex-1 items-center justify-center relative hidden tablet:flex">
        <LoginIllustration />
      </div>

      <div className="flex-1 flex justify-center">
        <Tabs defaultValue="login" className="w-full max-w-[500px]">
          <TabsList className="flex">
            <TabsTrigger value="login" className="flex-1">
              Entrar
            </TabsTrigger>
            <TabsTrigger value="register" className="flex-1">
              Registrar
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="flex flex-col gap-4">
            <div>
              <p>E-mail</p>
              <Input />
            </div>

            <div>
              <p>Senha</p>
              <Input />
            </div>

            <Button>Entrar</Button>

            <p className="text-center">ou</p>

            <Button>Continuar com Google</Button>
          </TabsContent>

          <TabsContent value="register" className="flex flex-col gap-4">
            <div>
              <p>Nome</p>
              <Input />
            </div>

            <div>
              <p>E-mail</p>
              <Input />
            </div>

            <div>
              <p>Senha</p>
              <Input />
            </div>

            <div>
              <p>Confirme a senha</p>
              <Input />
            </div>

            <Button>Cadastrar</Button>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
