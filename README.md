# MiniDapio

MiniDapio é uma plataforma de delivery de comida que conecta restaurantes e clientes, permitindo pedidos online com uma experiência moderna e intuitiva.

## 🚀 Tecnologias

- [Next.js 14](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Clerk](https://clerk.com/)
- [Uploadthing](https://uploadthing.com/)
- [Stripe](https://stripe.com/)

## 📋 Pré-requisitos

- Node.js 18.x ou superior
- Yarn 1.22.x ou superior
- PostgreSQL 14.x ou superior
- Conta no Clerk
- Conta no Uploadthing
- Conta no Stripe

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/minidapio.git
cd minidapio
```

2. Instale as dependências:
```bash
yarn install
```

3. Copie o arquivo de ambiente:
```bash
cp .env.example .env
```

4. Configure as variáveis de ambiente no arquivo `.env`

5. Execute as migrações do banco de dados:
```bash
yarn prisma migrate dev
```

6. Inicie o servidor de desenvolvimento:
```bash
yarn dev
```

## 🏗️ Estrutura do Projeto

```
src/
├── app/              # Rotas e páginas da aplicação
├── components/       # Componentes React
│   ├── ui/          # Componentes de UI reutilizáveis
│   └── ...          # Componentes específicos
├── lib/             # Bibliotecas e configurações
├── hooks/           # Hooks personalizados
├── utils/           # Funções utilitárias
├── types/           # Definições de tipos TypeScript
├── constants/       # Constantes da aplicação
└── styles/          # Estilos globais
```

## 🧪 Testes

```bash
# Executar testes unitários
yarn test

# Executar testes com cobertura
yarn test:coverage

# Executar testes e2e
yarn test:e2e
```

## 📦 Build

```bash
# Criar build de produção
yarn build

# Iniciar servidor de produção
yarn start
```

## 🔍 Linting e Formatação

```bash
# Verificar linting
yarn lint

# Corrigir problemas de linting
yarn lint:fix

# Formatar código
yarn format
```

## 📝 Convenções de Código

- [Conventional Commits](https://www.conventionalcommits.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- Seu Nome - [@seu-usuario](https://github.com/seu-usuario)

## 🙏 Agradecimentos

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
- [Clerk](https://clerk.com/)
- [Uploadthing](https://uploadthing.com/)
- [Stripe](https://stripe.com/)
