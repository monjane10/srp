/* =====================================================================
   PERSONALIZAÇÃO
   ---------------------------------------------------------------------
   Este é o único ficheiro que precisas de editar.
   - Onde aparecer {nome}, o site coloca automaticamente o nome dela.
   - Onde aparecer {remetente}, o site coloca o teu nome.
   - Mantém as aspas "..." e as vírgulas no fim de cada linha.
   ===================================================================== */

window.SITE_CONFIG = {
  // Nome dela. Se ficar vazio, o site usa "meu amor".
  nome: "",

  // O teu nome, usado na assinatura da carta e no rodapé.
  remetente: "",

  // Título que aparece no separador do navegador.
  tituloPagina: "Um pequeno universo para {nome}",

  /* ---------- 1. Ecrã inicial ---------- */
  intro: {
    aviso: "Fiz uma coisa para ti…",
    titulo: "{nome}, este pequeno universo é teu.",
    subtitulo: "Abre devagar. Cada parte guarda algo que talvez eu nunca te tenha dito assim.",
    botao: "Abrir o meu presente",
    foto: "assets/images/babe.jpeg",
    // Que parte da foto fica sempre visível (horizontal vertical).
    foco: "50% 25%",
  },

  /* ---------- 2. Abertura ---------- */
  abertura: {
    dedicatoria: "Para {nome}",
    titulo: "Um pequeno universo criado especialmente para ti.",
    texto:
      "Não é um site qualquer. É um sítio onde guardei o que sinto por ti, " +
      "com calma e com cuidado, para que possas voltar aqui sempre que " +
      "precisares de te lembrar do quanto és importante.",
  },

  /* ---------- 3. Galeria ----------
     src: caminho do ficheiro (tem de existir em assets/images/)
     alt: descrição curta da foto (para acessibilidade)
     legenda: frase que aparece por baixo
     foco: parte da foto que deve ficar visível quando é recortada  */
  galeria: {
    titulo: "A minha galeria favorita tem o teu nome",
    subtitulo: "Toca numa fotografia para a ver em grande.",
    fotos: [
      {
        src: "assets/images/baby.jpeg",
        alt: "{nome} com o cabelo natural e um casaco de ganga, a mandar um beijinho",
        legenda: "Cada versão tua acaba sempre por ser a minha favorita.",
        foco: "55% 40%",
      },
      {
        src: "assets/images/babe1.jpeg",
        alt: "{nome} com tranças e casaco branco, a fazer uma careta divertida",
        legenda: "Até a fazer caretas consegues ser o que de mais bonito vejo.",
        foco: "50% 45%",
      },
      {
        src: "assets/images/babe2.jpeg",
        alt: "Selfie de {nome} com tranças e camisa azul",
        legenda: "Charme natural, sem esforço nenhum.",
        foco: "65% 45%",
      },
      {
        src: "assets/images/baby2.jpeg",
        alt: "{nome} com tranças e casaco branco, a acenar para a câmara",
        legenda: "Um aceno teu e eu já estou a sorrir.",
        foco: "50% 42%",
      },
      {
        src: "assets/images/babe.jpeg",
        alt: "{nome} a sorrir, de pé, encostada a uma parede de azulejos cor de laranja",
        legenda: "Esse sorriso tem o poder de mudar o meu dia inteiro.",
        foco: "45% 30%",
      },
    ],
  },

  /* ---------- 4. Carta de amor ---------- */
  carta: {
    titulo: "Há coisas que quero que saibas…",
    saudacao: "{nome},",
    paragrafos: [
      "Queria encontrar uma forma diferente de te dizer o que sinto. As palavras do dia-a-dia às vezes parecem pequenas demais para isso, por isso decidi construir-te este cantinho.",
      "Quero que saibas que tens um lugar muito especial na minha vida. Não é só pelo que fazes por mim — é pela pessoa que és. A tua forma de estar, de rir, de cuidar de quem gostas.",
      "Admiro-te mais do que talvez consiga mostrar. Admiro a tua força, a tua sensibilidade e essa maneira muito tua de tornar tudo mais leve, até quando o dia não ajuda.",
      "Contigo percebi que a felicidade está muitas vezes nas coisas simples: uma conversa sem pressa, uma mensagem tua quando menos espero, um sorriso teu que me apanha desprevenido.",
      "Não te vou prometer uma vida perfeita, porque isso não existe. Mas prometo estar presente, ouvir-te, respeitar-te e continuar a escolher-te todos os dias, com a mesma vontade.",
      "Quero continuar a construir contigo uma história bonita — feita de paciência, de carinho e de muitos momentos que ainda nem imaginamos.",
      "Obrigado por existires. E obrigado por me deixares fazer parte da tua vida.",
    ],
    despedida: "Com todo o meu carinho,",
    // Se "remetente" estiver vazio, aparece este texto como assinatura.
    assinaturaAlternativa: "quem mais te admira",
  },

  /* ---------- 5. "Sabes o que mais gosto em ti?" ---------- */
  gosto: {
    titulo: "Sabes o que mais gosto em ti?",
    subtitulo: "Tenho uma lista. Carrega no botão e vai descobrindo, uma de cada vez.",
    botaoInicio: "Diz-me",
    botaoSeguinte: "Mais uma",
    botaoRecomecar: "Ler outra vez",
    mensagens: [
      "Gosto da forma como consegues tornar os meus dias diferentes, mesmo sem dares conta.",
      "Admiro a pessoa que és, mesmo nas pequenas coisas em que mais ninguém repara.",
      "Há detalhes teus que talvez nem percebas, mas que tornam a tua presença especial.",
      "Gosto do teu sorriso quando ele chega aos olhos. É impossível não sorrir de volta.",
      "Gosto de como és tu própria, sem precisares de provar nada a ninguém.",
      "Gosto da paz que sinto quando estou contigo. É rara, e é tua.",
      "Gosto das caretas que fazes nas fotografias. Confesso que guardo todas.",
      "Gosto que fiques linda de tranças, de cabelo natural, de qualquer maneira.",
      "Admiro a tua força. Mesmo cansada, continuas a ser gentil com quem está à tua volta.",
      "Gosto que, ao teu lado, até o silêncio seja confortável.",
      "Gosto, acima de tudo, de seres exactamente quem és.",
    ],
    final: "E isto é só o começo da lista.",
  },

  /* ---------- 6. Surpresa final ---------- */
  surpresa: {
    titulo: "E ainda tenho uma surpresa para ti…",
    subtitulo: "Guardei o mais importante para o fim.",
    botao: "Descobrir a surpresa",
    // Cada linha aparece como um parágrafo separado.
    mensagem: [
      "Se pudesse escolher outra vez, escolhia-te outra vez.",
      "E outra. E todas as vezes.",
      "Amo-te, {nome}.",
    ],
    notaFinal: "Este cantinho é teu. Volta sempre que precisares de te lembrar do quanto és amada.",
  },

  /* ---------- 7. Música (opcional) ----------
     1. Coloca o ficheiro em assets/audio/ (por exemplo musica.mp3)
     2. Escreve o caminho abaixo: ficheiro: "assets/audio/musica.mp3"
     Se ficar vazio, o botão de música não aparece.  */
  musica: {
    ficheiro: "assets/audio/14-ayra-starr-heaven-baby-ft-zayn_-NaijaGuddys.com_.mp3",
    // Nome da música, mostrado no botão (opcional).
    titulo: "Heaven Baby",
    // true = a música começa quando ela carrega em "Abrir o meu presente".
    tocarAoAbrir: true,
  },

  /* ---------- Rodapé ---------- */
  rodape: "Feito com amor por {remetente}, só para ti.",
  rodapeSemRemetente: "Feito com amor, só para ti.",
};
