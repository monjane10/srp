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

    /* Quando ela volta ao site, o ecrã inicial cumprimenta-a de outra forma.
       sempreRegresso: true = mostra sempre esta versão (ela já abriu o presente).
       Nos textos podes usar {proximo} ("dois meses"), {dias} (dias que faltam)
       e {meses} ("dois meses", nos dias 10).  */
    regresso: {
      sempreRegresso: true,
      aviso: "Achas que já leste tudo?",
      titulo: "{nome}, mudei umas coisas enquanto não estavas a ver.",
      subtitulo: "Palavras novas, provas novas, uma carta nova. E faltam {dias} para fazermos {proximo}.",
      subtituloAmanha: "Amanhã fazemos {proximo}. Eu já estou acordado à espera da meia-noite.",
      subtituloHoje: "Hoje fazemos {meses}. Escrevi-te uma carta nova, está lá mais abaixo.",
      // Para os dias 10 em que ainda não escrevi carta nova.
      subtituloHojeSemCarta: "Hoje fazemos {meses}. E eu continuo a achar que tive uma sorte enorme.",
      botao: "Ver o que mudou",
    },
  },

  /* ---------- 2. Abertura ---------- */
  abertura: {
    dedicatoria: "Para {nome}",
    titulo: "Voltaste. Eu sabia que voltavas.",
    texto:
      "Este universo cresce contigo. Desde a última vez, reescrevi quase tudo: " +
      "há um diário, um tribunal, umas confissões e uma surpresa diferente. " +
      "Lê devagar, que eu escrevi devagar.",
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

    /* Frases especiais para cada dia 10, até fazermos um ano.
       Nesses dias substituem a frase normal. A primeira é a do 1.º mês
       (10 de novembro de 2026), a última a de 1 ano (10 de outubro de 2027).
       O dia muda à meia-noite de Maputo.  */
    inicioNamoro: "2026-10-10",
    mesversarios: [
      { titulo: "Hoje faz um mês", frase: "Um mês contigo e já não sei como eram os meus dias antes de ti." },
      { titulo: "Hoje fazem dois meses", frase: "Dois meses, e o teu nome continua a ser a minha parte preferida de cada dia." },
      { titulo: "Hoje fazem três meses", frase: "Três meses de conversas que eu não quero que acabem nunca." },
      { titulo: "Hoje fazem quatro meses", frase: "Quatro meses, e ainda fico sem jeito quando me sorris." },
      { titulo: "Hoje fazem cinco meses", frase: "Cinco meses a descobrir que contigo tudo fica mais leve." },
      { titulo: "Hoje faz meio ano", frase: "Meio ano, {nome}. E a vontade de te escolher só cresce." },
      { titulo: "Hoje fazem sete meses", frase: "Sete meses. Tu já és casa, e eu gosto tanto de estar em casa." },
      { titulo: "Hoje fazem oito meses", frase: "Oito meses de risos, de saudades e de ti a fazer-me feliz sem esforço nenhum." },
      { titulo: "Hoje fazem nove meses", frase: "Nove meses depois, continuas a ser a primeira pessoa a quem quero contar tudo." },
      { titulo: "Hoje fazem dez meses", frase: "Dez meses. Obrigado por cada conversa, cada abraço e cada dia ao teu lado." },
      { titulo: "Hoje fazem onze meses", frase: "Onze meses. Falta só um para um ano inteiro de nós, e eu mal posso esperar." },
      { titulo: "Hoje fazemos um ano", frase: "Um ano, {nome}. O melhor ano da minha vida tem o teu nome. Feliz primeiro ano, meu amor." },
    ],
  },

  /* ---------- 2a+. Um mês de nós (todos os meses) ----------
     inicio: o dia em que começámos ("+02:00" = hora de Maputo).
     Todos os meses, nesse dia, a secção festeja; nos outros dias conta
     o tempo que falta para o próximo.
     Nos textos: {meses} = os meses que fazemos hoje ("dois meses"),
     {proximo} = os que vamos fazer a seguir, {dias} = dias que faltam.  */
  mes: {
    inicio: "2026-10-10T00:00:00+02:00",
    espera: {
      titulo: "Quem é que está a contar os dias?",
      subtitulo: "Eu. Estou eu. Faltam {dias} para fazermos {proximo}.",
      contagem: "Faltam",
    },
    hoje: {
      titulo: "Hoje fazemos {meses}, {nome}.",
      subtitulo: "Podes dizer a toda a gente. Eu já disse.",
      contagem: "Juntos há",
    },
    // Linha pequena por baixo da contagem.
    juntos: "Juntos há {total}. Ainda não chega.",

    /* Uma carta para cada mês. Aparece a do mês mais recente;
       a do mês seguinte só aparece quando chegar o dia.  */
    cartas: [
      {
        mes: 1,
        rotulo: "A carta do nosso primeiro mês",
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
      {
        mes: 2,
        rotulo: "Relatório oficial dos nossos dois meses",
        paragrafos: [
          "Fiz as contas. Em dois meses: 61 dias, umas quantas mil mensagens, demasiados «vou dormir» que não eram verdade e zero dias em que não pensei em ti.",
          "Conclusão n.º 1: falar contigo continua a ser a melhor parte do meu dia. O estudo foi rigoroso e repetido todas as noites, às vezes até de madrugada.",
          "Conclusão n.º 2: és ainda mais bonita do que nas fotografias. E nas fotografias já era difícil competir.",
          "Conclusão n.º 3: estou mais feliz. Os sintomas incluem sorrir para o telemóvel em público, ficar parvo quando dizes o meu nome e contar os dias até ao dia 10.",
          "Efeitos secundários: nenhum. Só uma vontade enorme de te ver.",
          "Recomendação final: continuar. Por tempo indeterminado. Contigo, {nome}.",
        ],
        despedida: "Feliz dois meses, meu amor. Assinado: o investigador principal.",
      },
    ],
  },

  /* ---------- 2b. Um dia na minha cabeça ----------
     Enquanto ela desce a página, o céu passa do amanhecer à noite.
     hora: define a cor do céu e a posição do sol/lua (formato "HH:MM").
     As horas devem seguir em frente; depois da meia-noite usa "00:30", "02:14"…  */
  dia: {
    rotulo: "Um dia na minha cabeça",
    titulo: "Diário de um dia normal (spoiler: és tu o dia todo)",
    dica: "Desce e acompanha o meu dia",
    horaInicial: "04:20",
    momentoInicial: "Ainda está escuro",
    cenas: [
      { hora: "05:05", momento: "Amanhecer", texto: "Abro os olhos. Antes de me levantar, já fui ver se tinha mensagem tua." },
      { hora: "07:05", momento: "Manhã", texto: "Bom dia enviado. Fico a olhar para o ecrã à espera de resposta como quem espera o chapa." },
      { hora: "13:10", momento: "Durante o dia", texto: "Alguém me conta uma coisa engraçada. A primeira coisa que penso: tenho de contar isto à {nome}." },
      { hora: "17:50", momento: "Fim de tarde", texto: "O céu fica cor-de-laranja e eu penso que tu ias gostar de ver isto." },
      { hora: "23:40", momento: "Noite", texto: "Digo que vou dormir. Continuo a falar contigo mais uma hora. Não me arrependo de nada." },
      { hora: "02:14", momento: "Madrugada", texto: "E se acordar a meio da noite, já sabes em quem penso primeiro." },
    ],
  },

  /* ---------- 3. Galeria ----------
     src: caminho do ficheiro (tem de existir em assets/images/)
     alt: descrição curta da foto (para acessibilidade)
     legenda: frase que aparece por baixo
     nota: mensagem escondida atrás da foto (aparece quando ela toca para a virar)
     foco: parte da foto que deve ficar visível quando é recortada  */
  galeria: {
    titulo: "Provas de que és injustamente bonita",
    subtitulo: "Cinco provas, um veredicto. Toca em cada fotografia para leres o que o júri escreveu atrás.",
    fotos: [
      {
        src: "assets/images/baby.jpeg",
        alt: "{nome} com o cabelo natural e um casaco de ganga, a mandar um beijinho",
        legenda: "Prova n.º 1: és perigosa de cabelo natural.",
        nota: "Esse beijinho veio para mim. Não aceito devoluções.",
        foco: "55% 40%",
      },
      {
        src: "assets/images/babe1.jpeg",
        alt: "{nome} com tranças e casaco branco, a fazer uma careta divertida",
        legenda: "Prova n.º 2: até as caretas te ficam bem. Isto não é justo.",
        nota: "Guardo esta para os dias em que preciso de me rir.",
        foco: "50% 45%",
      },
      {
        src: "assets/images/babe2.jpeg",
        alt: "Selfie de {nome} com tranças e camisa azul",
        legenda: "Prova n.º 3: o azul também te escolheu.",
        nota: "Se eu fosse esta câmara, também não queria desligar.",
        foco: "65% 45%",
      },
      {
        src: "assets/images/baby2.jpeg",
        alt: "{nome} com tranças e casaco branco, a acenar para a câmara",
        legenda: "Prova n.º 4: um aceno teu e eu já estou do teu lado da rua.",
        nota: "Olá, {nome}. Sim, estou a sorrir outra vez.",
        foco: "50% 42%",
      },
      {
        src: "assets/images/babe.jpeg",
        alt: "{nome} a sorrir, de pé, encostada a uma parede de azulejos cor de laranja",
        legenda: "Prova n.º 5: o sorriso que decidiu o caso.",
        nota: "Veredicto final: a pessoa mais bonita da cidade. Sem direito a recurso.",
        foco: "45% 30%",
      },
    ],
  },

  /* ---------- 4. Carta de amor ---------- */
  carta: {
    titulo: "Coisas que ainda não te tinha dito",
    saudacao: "{nome},",
    paragrafos: [
      "Já te escrevi uma carta, eu sei. Mas guardei algumas coisas para uma segunda, porque são pequenas demais para dizer em voz alta e grandes demais para ficarem só comigo.",
      "Confesso que releio as nossas conversas antigas. Não todas. Só as que me fazem sorrir sozinho no meio de outras pessoas, que afinal são quase todas.",
      "Confesso que às vezes ensaio na cabeça o que te vou dizer. E que tu, na vida real, és sempre melhor do que no ensaio.",
      "Confesso que tenho medo de poucas coisas, mas uma delas é deixar de te fazer rir. Por isso ando sempre com uma piada de reserva.",
      "Confesso que, quando me perguntam como estou, a resposta depende muito de já termos falado nesse dia.",
      "E a última, que já nem é segredo: és a melhor coisa que me aconteceu este ano. E o ano ainda nem acabou.",
    ],
    despedida: "Com o coração numa mão e o telemóvel na outra,",
    // O que está escrito no envelope e a dica por baixo dele.
    envelope: "Para {nome} · carta n.º 2",
    dicaEnvelope: "Esta é nova. Toca para abrir.",
    // Se "remetente" estiver vazio, aparece este texto como assinatura.
    assinaturaAlternativa: "quem mais te admira",
  },

  /* ---------- 5. "Sabes o que mais gosto em ti?" ---------- */
  gosto: {
    titulo: "Sabes o que mais gosto em ti? (parte 2)",
    subtitulo: "A primeira lista acabou. Esta é nova, e também não é a última.",
    // Capa do baralho de cartões (o número de mensagens aparece em grande).
    capa: "coisas novas que gosto em ti",
    dicaCapa: "Desliza para o lado",
    botaoInicio: "Mostra-me",
    botaoSeguinte: "Mais uma",
    botaoRecomecar: "Ler outra vez",
    mensagens: [
      "Gosto que uma conversa contigo comece com «olá» e acabe três horas depois sem sabermos como.",
      "Gosto de ver o teu nome a aparecer no meu ecrã. É a minha notificação preferida.",
      "Gosto que tenhas mil versões, de tranças, de cabelo natural, séria ou a fazer caretas, e que eu goste de todas.",
      "Gosto que me dês vontade de te contar tudo, até as coisas aborrecidas do meu dia.",
      "Gosto do poder que tens de mudar o meu humor com uma única mensagem. É quase injusto.",
      "Gosto que, contigo, eu não precise de fingir que sou mais interessante do que sou.",
      "Gosto de imaginar as coisas que ainda vamos fazer juntos.",
      "Gosto de como dizes o meu nome. Soa melhor quando és tu.",
      "Gosto que sejas tu. É a resposta mais curta e a mais verdadeira.",
    ],
    final: "Continua no próximo mês.",
  },

  /* ---------- 6. Surpresa final ---------- */
  surpresa: {
    // Nome desenhado com estrelas quando ela descobre a surpresa.
    constelacao: "{nome}",
    legendaConstelacao: "Constelação {nome}",
    titulo: "A surpresa mudou. Queres ver?",
    subtitulo: "Da última vez disse-te que te escolhia outra vez. Continua a ser verdade, mas tenho uma coisa para acrescentar.",
    botao: "Mostrar a surpresa nova",
    // Cada linha aparece como um parágrafo separado.
    mensagem: [
      "Se o universo me desse um desejo, eu não o gastava.",
      "Já tenho o que queria.",
      "Por isso este céu fica para ti. Pede tu.",
      "Amo-te, {nome}.",
    ],
    notaFinal: "Este universo vai continuar a mudar. Volta no dia 10.",
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
