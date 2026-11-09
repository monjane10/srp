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
  nome: "Leonor",

  // O teu nome, usado na assinatura da carta e no rodapé.
  remetente: "Lourenço",

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

  /* ---------- 2a. A frase de hoje ----------
     Aparece na abertura e muda sozinha todos os dias à meia-noite
     (segundo a data do telemóvel dela). Podes acrescentar quantas quiseres;
     quando chegar ao fim da lista, recomeça.  */
  fraseDoDia: {
    titulo: "A frase de hoje",
    rodape: "Amanhã há outra. Volta para a ler.",
    frases: [
      "Hoje, antes de mais nada: és muito mais forte do que pensas.",
      "Se o dia estiver pesado, lembra-te de que há alguém do teu lado. Sempre.",
      "O teu sorriso é das minhas coisas favoritas no mundo.",
      "Tu não precisas de ser perfeita para seres tudo para mim.",
      "Bebe água, come bem e não te esqueças de que és amada.",
      "Hoje vou pensar em ti mais vezes do que consigo contar.",
      "Tens o dom de deixar tudo mais leve. Até a mim.",
      "Orgulho-me de ti. Talvez não to diga tantas vezes quantas devia.",
      "Se hoje correr mal, amanhã recomeçamos. Juntos.",
      "Gosto de ti nos dias bons e nos dias difíceis. Principalmente nesses.",
      "És a primeira pessoa com quem quero partilhar as coisas boas.",
      "Hoje mereces descansar um bocadinho. Sem culpa.",
      "A tua presença faz-me querer ser melhor.",
      "Não há filtro que melhore o que já é bonito ao natural.",
      "Contigo, até os dias comuns ficam bonitos.",
      "Que hoje alguém te trate com o carinho que tu dás aos outros.",
      "Se precisares de colo, já sabes onde está.",
      "Tu és casa, {nome}.",
      "Às vezes basta lembrar-me de ti para o dia mudar de cor.",
      "Acredito em ti, mesmo quando tu própria duvidas.",
      "Hoje é um bom dia para te lembrares de que és especial.",
      "Gosto da pessoa que és e da pessoa em que te estás a tornar.",
      "Obrigado por seres exactamente como és.",
      "Não te esqueças de sorrir. O mundo fica mais bonito quando sorris.",
      "Se fosse possível escolher-te outra vez, escolhia. Hoje também.",
      "Tens um coração bonito. Cuida dele, que eu ajudo.",
      "Há pessoas que são luz. Tu és uma delas.",
      "Mesmo longe, estou contigo.",
      "Estou feliz por a minha história ter o teu nome.",
      "Hoje e amanhã, continuo a escolher-te.",
      "Fecha os olhos por um segundo: estou a abraçar-te.",
    ],
  },

  /* ---------- 2a+. Um mês de nós ----------
     inicio: o dia em que começámos; marco: o momento da contagem.
     O "+02:00" é a hora de Maputo, por isso a contagem é igual
     em qualquer telemóvel, esteja ele onde estiver.
     Antes do marco aparece a contagem decrescente; depois, o tempo juntos.  */
  mes: {
    inicio: "2026-10-10T00:00:00+02:00",
    marco: "2026-11-10T00:00:00+02:00",
    rotulo: "10 · XI",
    antes: {
      titulo: "Falta pouco para o nosso primeiro mês",
      subtitulo: "Estou a contar os segundos até ao nosso dia.",
    },
    hoje: {
      titulo: "Hoje faz um mês, {nome}.",
      subtitulo: "Um mês desde o dia em que tudo ficou mais bonito.",
    },
    depois: {
      titulo: "E o tempo continua a contar",
      subtitulo: "Desde 10 de outubro, contigo.",
    },
    rotuloAntes: "Faltam",
    rotuloDepois: "Juntos há",
    paragrafos: [
      "Há um mês, a minha vida ganhou uma cor nova. Ainda hoje não sei explicar como é que alguém consegue mudar tanto em tão pouco tempo. Só sei que foste tu.",
      "Fazes-me feliz de uma maneira simples e verdadeira. Não é só nos grandes momentos: é a tua mensagem de bom dia, o teu riso do outro lado, a forma como dizes o meu nome. Contigo, a felicidade deixou de ser uma coisa que eu procurava e passou a ser um sítio onde moro.",
      "E conversar contigo é das melhores partes do meu dia. Perco a noção das horas, os assuntos nunca acabam e, quando acabam, até o silêncio sabe bem. Contigo posso ser eu, sem medo e sem pressa. Há conversas que nos distraem; as tuas acalmam-me.",
      "Quero que saibas o quão especial és para mim. És a primeira pessoa em quem penso quando acontece alguma coisa boa, e a última antes de adormecer. Não és só alguém de quem gosto: és alguém que eu escolho, com o coração inteiro, todos os dias.",
      "Um mês parece pouco no calendário, mas coube tanto nele. Risos, saudades, descobertas, e esta certeza tranquila de que estou exactamente onde quero estar.",
      "Obrigado por este primeiro mês, {nome}. Que seja só o primeiro de muitos, e que eu continue a fazer-te sorrir como tu me fazes sorrir a mim.",
    ],
    despedida: "Feliz um mês, meu amor.",
  },

  /* ---------- 2b. Um dia na minha cabeça ----------
     Enquanto ela desce a página, o céu passa do amanhecer à noite.
     hora: define a cor do céu e a posição do sol/lua (formato "HH:MM").
     As horas devem seguir em frente; depois da meia-noite usa "00:30", "02:14"…  */
  dia: {
    rotulo: "Um dia na minha cabeça",
    titulo: "Preciso de ser honesto contigo…",
    dica: "Continua a descer",
    horaInicial: "05:40",
    momentoInicial: "Antes do amanhecer",
    cenas: [
      { hora: "06:20", momento: "Amanhecer", texto: "Penso muito em ti. Mais do que alguma vez admito em voz alta." },
      { hora: "07:05", momento: "Manhã", texto: "As minhas manhãs começam com o teu nome na cabeça." },
      { hora: "13:10", momento: "Durante o dia", texto: "Mesmo quando tento manter-me ocupado, tudo acaba por voltar a ti." },
      { hora: "17:50", momento: "Fim de tarde", texto: "Fico a imaginar o que estás a fazer, como te estás a sentir… e se também pensas em mim." },
      { hora: "23:40", momento: "Noite", texto: "E as minhas noites terminam com pensamentos sobre ti que não me deixam dormir." },
      { hora: "02:14", momento: "Madrugada", texto: "Porque a minha mente nunca se afasta de ti. De alguma forma, és sempre tu." },
    ],
  },

  /* ---------- 3. Galeria ----------
     src: caminho do ficheiro (tem de existir em assets/images/)
     alt: descrição curta da foto (para acessibilidade)
     legenda: frase que aparece por baixo
     nota: mensagem escondida atrás da foto (aparece quando ela toca para a virar)
     foco: parte da foto que deve ficar visível quando é recortada  */
  galeria: {
    titulo: "A minha galeria favorita tem o teu nome",
    subtitulo: "Toca numa fotografia para a virar: há uma nota escondida atrás de cada uma.",
    fotos: [
      {
        src: "assets/images/baby.jpeg",
        alt: "{nome} com o cabelo natural e um casaco de ganga, a mandar um beijinho",
        legenda: "Cada versão tua acaba sempre por ser a minha favorita.",
        nota: "Esse beijinho fica comigo. Está decidido.",
        foco: "55% 40%",
      },
      {
        src: "assets/images/babe1.jpeg",
        alt: "{nome} com tranças e casaco branco, a fazer uma careta divertida",
        legenda: "Até a fazer caretas consegues ser o que de mais bonito vejo.",
        nota: "Ninguém fica tão bonita a fazer caretas. Só tu.",
        foco: "50% 45%",
      },
      {
        src: "assets/images/babe2.jpeg",
        alt: "Selfie de {nome} com tranças e camisa azul",
        legenda: "Charme natural, sem esforço nenhum.",
        nota: "Olho para esta foto e sorrio sem dar conta.",
        foco: "65% 45%",
      },
      {
        src: "assets/images/baby2.jpeg",
        alt: "{nome} com tranças e casaco branco, a acenar para a câmara",
        legenda: "Um aceno teu e eu já estou a sorrir.",
        nota: "Olá para ti também, {nome}.",
        foco: "50% 42%",
      },
      {
        src: "assets/images/babe.jpeg",
        alt: "{nome} a sorrir, de pé, encostada a uma parede de azulejos cor de laranja",
        legenda: "Esse sorriso tem o poder de mudar o meu dia inteiro.",
        nota: "Se me perguntassem quem és, mostrava esta: alguém que ilumina o sítio onde está.",
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
    // O que está escrito no envelope e a dica por baixo dele.
    envelope: "Para {nome}",
    dicaEnvelope: "Toca no envelope para abrir",
    // Se "remetente" estiver vazio, aparece este texto como assinatura.
    assinaturaAlternativa: "quem mais te admira",
  },

  /* ---------- 5. "Sabes o que mais gosto em ti?" ---------- */
  gosto: {
    titulo: "Sabes o que mais gosto em ti?",
    subtitulo: "Tenho uma lista. Carrega no botão e vai descobrindo, uma de cada vez.",
    // Capa do baralho de cartões (o número de mensagens aparece em grande).
    capa: "coisas que gosto em ti",
    dicaCapa: "Desliza para o lado",
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
    // Nome desenhado com estrelas quando ela descobre a surpresa.
    constelacao: "{nome}",
    legendaConstelacao: "Constelação {nome}",
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
    // Depois da surpresa, cada toque no céu lança uma estrela cadente.
    desejo: "Toca no céu e pede um desejo.",
    desejoFeito: "Pedido guardado. O céu é todo teu, pede outro.",
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
