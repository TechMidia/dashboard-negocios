# dashboard-negocios

This is a [Next.js](https://nextjs.org) project bootstrapped with [v0](https://v0.app).

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo. Every merge to `main` will automatically deploy.

[Continue working on v0 →](https://v0.app/chat/projects/prj_1V86cqbUFvways3igVpkIn3LbyiI)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.

<a href="https://v0.app/chat/api/kiro/clone/TechMidia/dashboard-negocios" alt="Open in Kiro"><img src="https://pdgvvgmkdvyeydso.public.blob.vercel-storage.com/open%20in%20kiro.svg?sanitize=true" /></a>

## Deploy com Docker (EasyPanel)

Este projeto agora inclui um `Dockerfile` multi-stage pronto para produção no EasyPanel.

### Build local

```bash
docker build -t dashboard-negocios .
```

### Run local

```bash
docker run --rm -p 3000:3000 -e PORT=3000 dashboard-negocios
```

A aplicação sobe em `http://localhost:3000`.

### Configuração no EasyPanel

- **Source**: repositório Git
- **Build type**: Dockerfile
- **Porta do serviço**: `3000`
- **Variáveis opcionais**:
  - `NODE_ENV=production`
  - `NEXT_TELEMETRY_DISABLED=1`

O container já inicia com usuário não-root e usa build standalone do Next.js para reduzir tamanho de imagem e tempo de boot.
