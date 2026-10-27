# Um pequeno universo criado especialmente para ti

Site estático (HTML, CSS e JavaScript puro). Não precisa de servidor, base de dados nem serviços pagos.

## Estrutura

```
romantic-website/
├── index.html          → estrutura da página
├── css/style.css       → visual
├── js/config.js        → TODO o texto personalizável (edita só este)
├── js/script.js        → interacções
├── assets/
│   ├── favicon.svg
│   ├── images/         → fotografias
│   │   ├── babe.jpeg
│   │   ├── babe1.jpeg
│   │   ├── babe2.jpeg
│   │   ├── baby.jpeg
│   │   └── baby2.jpeg
│   └── audio/          → música (opcional)
└── README.md
```

## 1. Fotografias

As fotos já estão em `assets/images/` com os nomes originais.

Para **adicionar** uma foto:
1. Copia o ficheiro para `assets/images/` (ex.: `foto-6.jpg`).
2. Em `js/config.js`, dentro de `galeria.fotos`, acrescenta:
   ```js
   {
     src: "assets/images/foto-6.jpg",
     alt: "Descrição curta da foto",
     legenda: "A tua frase",
     foco: "50% 40%",
   },
   ```
- O nome em `src` tem de ser **exactamente** igual ao do ficheiro (maiúsculas, `.jpg` vs `.jpeg`).
- `foco` indica que parte da foto fica visível quando é recortada: `"50% 20%"` mostra mais o topo, `"50% 70%"` mais a parte de baixo.
- A foto do ecrã inicial está em `intro.foto`.
- Se um caminho estiver errado, o site mostra "Fotografia não encontrada: …" no lugar da imagem.

Dica: fotos com mais de 2 MB tornam o site lento no telemóvel. Reduz para ~1600 px de altura (ex.: com squoosh.app, que funciona no próprio navegador).

## 2. Nome e mensagens

Abre `js/config.js`:

```js
nome: "Ana",          // nome dela
remetente: "Kenny",   // o teu nome (assinatura)
```

Todo o texto (ecrã inicial, legendas, carta, lista "o que mais gosto em ti", surpresa e rodapé) está nesse ficheiro, separado por secções. Onde estiver `{nome}`, o site coloca o nome dela automaticamente.

## 3. Música (opcional)

1. Coloca o ficheiro em `assets/audio/` (ex.: `musica.mp3`).
2. Em `js/config.js`:
   ```js
   musica: {
     ficheiro: "assets/audio/musica.mp3",
     titulo: "Nome da música",
     tocarAoAbrir: false,
   },
   ```
- Com `ficheiro: ""` o botão não aparece e o site funciona sem áudio.
- A música nunca começa sozinha. Com `tocarAoAbrir: true`, começa quando ela carrega em "Abrir o meu presente".
- Usa apenas música que tens direito a usar (ficheiro próprio ou com licença).

## 4. Ver localmente

Abre `index.html` com duplo clique. Funciona tudo, sem instalar nada.

Para testar no telemóvel, o mais simples é publicar no Vercel (passo seguinte) e abrir o link no telemóvel.

## 5. Publicar grátis

### Netlify (o mais fácil, sem conta Git)
1. Entra em https://app.netlify.com/drop
2. Arrasta a pasta `romantic-website` inteira para a página.
3. Recebes um link tipo `https://nome-aleatorio.netlify.app`. Em *Site configuration → Change site name* podes mudar o nome.

### Vercel
1. Cria conta em https://vercel.com
2. Instala a CLI: `npm i -g vercel`
3. Na pasta `romantic-website`: `vercel` → responde às perguntas (sem build, pasta de saída `.`).
4. `vercel --prod` para publicar a versão final.

Ou: põe a pasta num repositório GitHub e importa-o em vercel.com/new (Framework: *Other*, sem comando de build).

### Privacidade
- O site tem `noindex` para não aparecer no Google, mas **quem tiver o link consegue ver as fotos**. Partilha o link só com ela.
- As fotos ficam alojadas apenas onde publicares o site; não são enviadas para mais nenhum serviço.
- As únicas ligações externas são as fontes do Google Fonts. Sem Internet, o site usa fontes do sistema.

## Acessibilidade e desempenho
- Respeita "reduzir movimento" do sistema: as animações ficam mínimas e todo o conteúdo continua visível.
- Botões com pelo menos 48 px de altura, navegação por teclado (setas na galeria, Esc para fechar).
- Imagens da galeria carregam de forma preguiçosa (`loading="lazy"`), com um brilho suave enquanto carregam.
