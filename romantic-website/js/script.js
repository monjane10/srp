/* =====================================================================
   Um pequeno universo — interacções
   O conteúdo vem de js/config.js; aqui só há comportamento.
   ===================================================================== */

(() => {
  "use strict";

  const config = window.SITE_CONFIG || {};
  const root = document.documentElement;
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const prefersReducedMotion = () => motionQuery.matches;

  const $ = (selector) => document.querySelector(selector);

  /* ---------- Texto personalizado ---------- */

  const herName = (config.nome || "").trim() || "meu amor";
  const myName = (config.remetente || "").trim();

  function personalise(text) {
    const result = String(text || "")
      .replace(/\{nome\}/g, herName)
      .replace(/\{remetente\}/g, myName);
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  function getConfigValue(path) {
    return path.split(".").reduce((obj, key) => (obj == null ? undefined : obj[key]), config);
  }

  function fillTexts() {
    document.querySelectorAll("[data-fill]").forEach((el) => {
      const value = getConfigValue(el.dataset.fill);
      if (value) el.textContent = personalise(value);
      else el.hidden = true;
    });

    if (config.tituloPagina) document.title = personalise(config.tituloPagina);

    const letter = config.carta || {};
    $("#letter-signature").textContent = myName || personalise(letter.assinaturaAlternativa);

    $("#footer-text").textContent = myName
      ? personalise(config.rodape)
      : personalise(config.rodapeSemRemetente);
  }

  /* ---------- Imagens com estado de carregamento ---------- */

  function loadInto(frame, img, src) {
    const markLoaded = () => frame.classList.add("is-loaded");
    img.addEventListener("load", markLoaded, { once: true });
    img.addEventListener("error", () => {
      frame.classList.add("is-missing");
      frame.dataset.missing = `Fotografia não encontrada: ${src}`;
    }, { once: true });
    img.src = src;
    if (img.complete && img.naturalWidth) markLoaded();
  }

  /* ---------- Estrelas ---------- */

  function scatterStars(container, count) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const star = document.createElement("span");
      star.className = "star";
      const size = Math.random() < 0.85 ? 1 + Math.random() * 1.2 : 2 + Math.random();
      star.style.cssText =
        `left:${Math.random() * 100}%;top:${Math.random() * 100}%;` +
        `--size:${size.toFixed(2)}px;--alpha:${(0.25 + Math.random() * 0.6).toFixed(2)};` +
        `--duration:${(2.5 + Math.random() * 4).toFixed(2)}s;--delay:${(-Math.random() * 5).toFixed(2)}s`;
      fragment.appendChild(star);
    }
    container.appendChild(fragment);
  }

  /* ---------- Aparecer ao fazer scroll ---------- */

  const revealObserver = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 })
    : null;

  function reveal(el) {
    if (revealObserver) revealObserver.observe(el);
    else el.classList.add("is-visible");
  }

  /* ---------- Ecrã inicial ---------- */

  const intro = $("#intro");
  const lockedRegions = [$("main"), $(".chapters"), $(".site-footer"), $("#music-toggle")];

  function setupIntro() {
    const introConfig = config.intro || {};
    const photo = $("#intro-photo");
    const frame = photo.parentElement;

    if (introConfig.foto) {
      photo.style.objectPosition = introConfig.foco || "50% 30%";
      loadInto(frame, photo, introConfig.foto);
    } else {
      $(".intro__arch").hidden = true;
    }

    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    root.classList.add("is-locked");
    lockedRegions.forEach((el) => { el.inert = true; });

    $("#open-gift").addEventListener("click", openGift, { once: true });
  }

  function openGift() {
    intro.classList.add("is-opening");
    root.classList.add("is-open");
    root.classList.remove("is-locked");
    lockedRegions.forEach((el) => { el.inert = false; });

    if (config.musica && config.musica.tocarAoAbrir) music.play();

    const duration = prefersReducedMotion() ? 320 : 1450;
    window.setTimeout(() => {
      intro.hidden = true;
      $("#opening-title").focus({ preventScroll: true });
    }, duration);
  }

  /* ---------- A frase de hoje ---------- */

  function setupDaily() {
    const settings = config.fraseDoDia || {};
    const phrases = settings.frases || [];
    const box = $("#daily");

    if (!phrases.length) {
      box.hidden = true;
      return;
    }

    // Conta os dias desde uma data fixa (na hora local), por isso a frase
    // muda à meia-noite e é a mesma durante o dia inteiro.
    const today = new Date();
    const dayNumber = Math.floor(
      (Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(2026, 0, 1)) / 86400000
    );
    const index = ((dayNumber % phrases.length) + phrases.length) % phrases.length;

    $("#daily-text").textContent = personalise(phrases[index]);
    $("#daily-date").textContent = today.toLocaleDateString("pt-PT", { day: "numeric", month: "long" });
  }

  /* ---------- Um mês de nós — temporizador ---------- */

  function setupMonth() {
    const settings = config.mes || {};
    const section = $("#mes");
    const start = Date.parse(settings.inicio);
    const target = Date.parse(settings.marco);

    if (!settings.marco || Number.isNaN(target)) {
      section.hidden = true;
      return;
    }

    const body = $("#month-body");
    (settings.paragrafos || []).forEach((text) => {
      const p = document.createElement("p");
      p.textContent = personalise(text);
      p.dataset.reveal = "";
      body.appendChild(p);
    });

    const els = {
      title: $("#month-title"),
      lead: $("#month-lead"),
      label: $("#timer-label"),
      days: $("#timer-days"),
      daysName: $("#timer-days-name"),
      hours: $("#timer-hours"),
      minutes: $("#timer-minutes"),
      seconds: $("#timer-seconds"),
    };

    const pad = (n) => String(n).padStart(2, "0");
    const DAY = 86400000;
    let state = null;
    let celebrated = false;

    function setState(next) {
      if (next === state) return;
      const previous = state;
      state = next;
      const texts = settings[next] || {};
      els.title.textContent = personalise(texts.titulo || "");
      els.lead.textContent = personalise(texts.subtitulo || "");
      els.label.textContent = personalise(next === "antes" ? settings.rotuloAntes : settings.rotuloDepois);
      section.classList.toggle("is-today", next === "hoje");
      // Se a contagem chegar a zero com a página aberta, festeja logo.
      if (previous === "antes" && next === "hoje") celebrate();
    }

    function render() {
      const now = Date.now();
      let diff;
      if (now < target) {
        setState("antes");
        diff = target - now;
      } else {
        setState(now < target + DAY ? "hoje" : "depois");
        diff = now - (Number.isNaN(start) ? target : start);
      }

      const total = Math.floor(diff / 1000);
      const days = Math.floor(total / 86400);
      els.days.textContent = days;
      els.daysName.textContent = days === 1 ? "dia" : "dias";
      els.hours.textContent = pad(Math.floor((total % 86400) / 3600));
      els.minutes.textContent = pad(Math.floor((total % 3600) / 60));
      els.seconds.textContent = pad(total % 60);
    }

    function celebrate() {
      if (celebrated || prefersReducedMotion()) return;
      celebrated = true;
      const box = $("#month-hearts");
      for (let i = 0; i < 28; i++) {
        const heart = document.createElement("span");
        heart.className = "month__heart";
        heart.style.cssText =
          `left:${(5 + Math.random() * 90).toFixed(1)}%;` +
          `--size:${(12 + Math.random() * 18).toFixed(0)}px;` +
          `--drift:${(-60 + Math.random() * 120).toFixed(0)}px;` +
          `--duration:${(3.5 + Math.random() * 3).toFixed(2)}s;` +
          `--delay:${(Math.random() * 2.5).toFixed(2)}s`;
        heart.addEventListener("animationend", () => heart.remove());
        box.appendChild(heart);
      }
    }

    render();
    window.setInterval(render, 1000);

    // No dia, quando ela chega à secção, caem corações.
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting) && state === "hoje") {
          celebrate();
          observer.disconnect();
        }
      }, { threshold: 0.35 });
      observer.observe(section);
    }
  }

  /* ---------- Um dia na minha cabeça ---------- */

  // Cor do céu ao longo do dia: [minutos desde 00:00, topo, horizonte].
  // Depois da meia-noite os minutos continuam a contar (02:00 = 1560).
  const SKY = [
    [330, "#231c26", "#4a3442"],
    [380, "#5b3f55", "#f4b6c2"],
    [425, "#f9d3db", "#fff0f3"],
    [790, "#fffdfd", "#fff0f3"],
    [1070, "#f6c9cf", "#fbe0d6"],
    [1150, "#6e4560", "#c97b8c"],
    [1290, "#2a2130", "#3b2a3a"],
    [1420, "#221c23", "#2f2531"],
    [1580, "#17131a", "#241c26"],
  ];

  const hexToRgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  const mixRgb = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
  const rgb = (c) => `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
  const luminance = (c) => (0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]) / 255;
  const clamp01 = (v) => Math.min(1, Math.max(0, v));

  function skyAt(minutes) {
    const last = SKY.length - 1;
    if (minutes <= SKY[0][0]) return [hexToRgb(SKY[0][1]), hexToRgb(SKY[0][2])];
    if (minutes >= SKY[last][0]) return [hexToRgb(SKY[last][1]), hexToRgb(SKY[last][2])];
    const i = SKY.findIndex((stop) => stop[0] > minutes) - 1;
    const [from, to] = [SKY[i], SKY[i + 1]];
    const t = (minutes - from[0]) / (to[0] - from[0]);
    return [
      mixRgb(hexToRgb(from[1]), hexToRgb(to[1]), t),
      mixRgb(hexToRgb(from[2]), hexToRgb(to[2]), t),
    ];
  }

  // Posição num arco: sobe de um lado, passa pelo topo e desce do outro.
  function placeOnArc(el, minutes, rise, set) {
    const t = (minutes - rise) / (set - rise);
    const visible = t > 0 && t < 1;
    const height = visible ? Math.sin(Math.PI * t) : 0;
    el.style.setProperty("--x", `${8 + 84 * clamp01(t)}%`);
    el.style.setProperty("--y", `${54 - height * 28}%`);
    el.style.opacity = visible ? Math.min(1, height * 2.5).toFixed(2) : "0";
  }

  function setupDay() {
    const settings = config.dia || {};
    const section = $("#dia");
    const scenesConfig = settings.cenas || [];

    if (!scenesConfig.length) {
      section.hidden = true;
      document.querySelector('.chapters__link[href="#dia"]').hidden = true;
      return;
    }

    const sticky = section.querySelector(".day__sticky");
    const timeEl = $("#day-time");
    const momentEl = $("#day-moment");
    const sun = section.querySelector(".day__sun");
    const moon = section.querySelector(".day__moon");

    // Converte "HH:MM" em minutos, sempre a andar para a frente no tempo
    const toMinutes = (text, after) => {
      const [h, m] = String(text).split(":").map(Number);
      let minutes = h * 60 + m;
      while (minutes < after) minutes += 1440;
      return minutes;
    };

    const times = [toMinutes(settings.horaInicial || "05:40", 0)];
    const moments = [settings.momentoInicial || ""];
    const scenes = [section.querySelector(".day__scene")];
    const scenesEl = $("#day-scenes");

    scenesConfig.forEach((scene, i) => {
      times.push(toMinutes(scene.hora, times[times.length - 1]));
      moments.push(scene.momento || "");
      const p = document.createElement("p");
      p.className = "day__scene day__text";
      if (i === scenesConfig.length - 1) p.classList.add("day__text--last");
      p.textContent = personalise(scene.texto);
      scenesEl.appendChild(p);
      scenes.push(p);
    });

    const dots = scenes.map(() => {
      const dot = document.createElement("span");
      dot.className = "day__dot";
      $("#day-dots").appendChild(dot);
      return dot;
    });

    const count = scenes.length;
    section.style.setProperty("--count", count);

    const formatTime = (minutes) => {
      const m = Math.round(minutes) % 1440;
      return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
    };

    let current = -1;
    let ticking = false;

    function update() {
      ticking = false;
      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const progress = scrollable > 0 ? clamp01(-rect.top / scrollable) : 0;
      const position = progress * (count - 1);
      const index = Math.floor(position);
      const next = Math.min(index + 1, count - 1);
      const minutes = times[index] + (times[next] - times[index]) * (position - index);

      const [top, bottom] = skyAt(minutes);
      const light = luminance(mixRgb(top, bottom, 0.5));
      sticky.style.setProperty("--sky-top", rgb(top));
      sticky.style.setProperty("--sky-bottom", rgb(bottom));
      section.style.setProperty("--sky-bottom", rgb(bottom));
      sticky.style.setProperty("--stars", clamp01((0.42 - light) / 0.22).toFixed(2));
      sticky.classList.toggle("is-dark", light < 0.55);

      placeOnArc(sun, minutes, 350, 1160);
      placeOnArc(moon, minutes, 1150, 1680);
      timeEl.textContent = formatTime(minutes);

      const active = Math.round(position);
      if (active !== current) {
        current = active;
        momentEl.textContent = moments[active];
        scenes.forEach((scene, i) => {
          scene.classList.toggle("is-active", i === active);
          scene.classList.toggle("is-past", i < active);
        });
        dots.forEach((dot, i) => dot.classList.toggle("is-current", i === active));
      }
    }

    const requestUpdate = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    // Só faz contas enquanto a secção está perto do ecrã
    if ("IntersectionObserver" in window) {
      let listening = false;
      new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !listening) {
          window.addEventListener("scroll", requestUpdate, { passive: true });
          listening = true;
          requestUpdate();
        } else if (!entry.isIntersecting && listening) {
          window.removeEventListener("scroll", requestUpdate);
          listening = false;
          update();
        }
      }, { rootMargin: "50% 0px" }).observe(section);
    } else {
      window.addEventListener("scroll", requestUpdate, { passive: true });
    }

    window.addEventListener("resize", requestUpdate);
    update();
  }

  /* ---------- Galeria + fotografia ampliada ---------- */

  const photos = ((config.galeria && config.galeria.fotos) || []).filter((p) => p && p.src);
  const lightbox = $("#lightbox");
  const lightboxImg = $("#lightbox-img");
  let currentPhoto = 0;
  let lastTrigger = null;

  function renderGallery() {
    const gallery = $("#gallery");
    const zoomIcon =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5M11 8.5v5M8.5 11h5"/></svg>';

    photos.forEach((photo, index) => {
      const figure = document.createElement("figure");
      figure.className = "photo";
      figure.dataset.reveal = "";
      figure.style.setProperty("--delay", `${(index % 2) * 0.12}s`);

      const frame = document.createElement("div");
      frame.className = "photo__frame";

      // Frente: a fotografia
      const front = document.createElement("span");
      front.className = "photo__face photo__face--front media";
      const img = document.createElement("img");
      img.alt = personalise(photo.alt);
      img.loading = "lazy";
      img.decoding = "async";
      img.style.objectPosition = photo.foco || "50% 40%";
      front.appendChild(img);

      const zoom = document.createElement("button");
      zoom.type = "button";
      zoom.className = "photo__zoom";
      zoom.setAttribute("aria-label", `Ampliar fotografia ${index + 1} de ${photos.length}`);
      zoom.innerHTML = zoomIcon;
      zoom.addEventListener("click", () => openLightbox(index, zoom));

      if (photo.nota) {
        // Verso: a nota escondida. O cartão inteiro é o botão que vira.
        const flip = document.createElement("button");
        flip.type = "button";
        flip.className = "photo__flip";
        flip.setAttribute("aria-pressed", "false");
        flip.setAttribute("aria-label", `Virar a fotografia ${index + 1} e ler a nota`);

        const back = document.createElement("span");
        back.className = "photo__face photo__face--back";
        const note = document.createElement("span");
        note.className = "photo__note";
        note.textContent = personalise(photo.nota);
        const sign = document.createElement("span");
        sign.className = "photo__sign";
        sign.textContent = myName ? `— ${myName}` : "";
        const hint = document.createElement("span");
        hint.className = "photo__back-hint";
        hint.setAttribute("aria-hidden", "true");
        hint.textContent = "Toca para voltar";
        back.append(note, sign, hint);

        flip.append(front, back);
        flip.addEventListener("click", () => {
          const flipped = flip.getAttribute("aria-pressed") !== "true";
          flip.setAttribute("aria-pressed", String(flipped));
          frame.classList.toggle("is-flipped", flipped);
        });
        frame.append(flip, zoom);
      } else {
        // Sem nota: tocar na fotografia amplia-a
        const open = document.createElement("button");
        open.type = "button";
        open.className = "photo__flip";
        open.style.cursor = "zoom-in";
        open.setAttribute("aria-label", `Ampliar fotografia ${index + 1} de ${photos.length}`);
        open.appendChild(front);
        open.addEventListener("click", () => openLightbox(index, open));
        frame.append(open, zoom);
      }

      figure.appendChild(frame);

      if (photo.legenda) {
        const caption = document.createElement("figcaption");
        caption.className = "photo__caption";
        const number = document.createElement("span");
        number.className = "photo__index";
        number.textContent = String(index + 1).padStart(2, "0");
        const text = document.createElement("span");
        text.textContent = personalise(photo.legenda);
        caption.append(number, text);
        figure.appendChild(caption);
      }

      gallery.appendChild(figure);
      loadInto(front, img, photo.src);
      reveal(figure);
    });

    if (photos.length < 2) {
      $("#lightbox-prev").hidden = true;
      $("#lightbox-next").hidden = true;
    }
  }

  function showPhoto(index) {
    currentPhoto = (index + photos.length) % photos.length;
    const photo = photos[currentPhoto];

    const apply = () => {
      lightboxImg.src = photo.src;
      lightboxImg.alt = personalise(photo.alt);
      $("#lightbox-caption").textContent = photo.legenda ? personalise(photo.legenda) : "";
      $("#lightbox-count").textContent = `${currentPhoto + 1} / ${photos.length}`;
      lightboxImg.classList.remove("is-changing");
    };

    if (lightbox.open && !prefersReducedMotion()) {
      lightboxImg.classList.add("is-changing");
      window.setTimeout(apply, 200);
    } else {
      apply();
    }

    // Pré-carrega as vizinhas para a navegação ser imediata
    [currentPhoto - 1, currentPhoto + 1].forEach((i) => {
      new Image().src = photos[(i + photos.length) % photos.length].src;
    });
  }

  function openLightbox(index, trigger) {
    lastTrigger = trigger;
    showPhoto(index);
    lightbox.showModal();
    root.classList.add("is-locked");
  }

  function closeLightbox() {
    if (lightbox.open) lightbox.close();
  }

  function setupLightbox() {
    $("#lightbox-close").addEventListener("click", closeLightbox);
    $("#lightbox-prev").addEventListener("click", () => showPhoto(currentPhoto - 1));
    $("#lightbox-next").addEventListener("click", () => showPhoto(currentPhoto + 1));

    lightbox.addEventListener("close", () => {
      root.classList.remove("is-locked");
      if (lastTrigger) lastTrigger.focus({ preventScroll: true });
    });

    // Tocar fora da fotografia fecha
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLightbox();
    });

    lightbox.addEventListener("keydown", (event) => {
      if (photos.length < 2) return;
      if (event.key === "ArrowLeft") showPhoto(currentPhoto - 1);
      if (event.key === "ArrowRight") showPhoto(currentPhoto + 1);
    });

    // Deslizar o dedo para mudar de fotografia
    let touchStartX = 0;
    let touchStartY = 0;
    lightbox.addEventListener("touchstart", (event) => {
      touchStartX = event.changedTouches[0].clientX;
      touchStartY = event.changedTouches[0].clientY;
    }, { passive: true });
    lightbox.addEventListener("touchend", (event) => {
      if (photos.length < 2) return;
      const dx = event.changedTouches[0].clientX - touchStartX;
      const dy = event.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        showPhoto(currentPhoto + (dx < 0 ? 1 : -1));
      }
    }, { passive: true });
  }

  /* ---------- Carta ---------- */

  function renderLetter() {
    const body = $("#letter-body");
    ((config.carta && config.carta.paragrafos) || []).forEach((text) => {
      const p = document.createElement("p");
      p.textContent = personalise(text);
      body.appendChild(p);
      reveal(p);
    });
  }

  /* ---------- "Sabes o que mais gosto em ti?" — baralho de cartões ---------- */

  function setupLikes() {
    const likes = config.gosto || {};
    const messages = likes.mensagens || [];
    const deckEl = $("#deck");
    const live = $("#likes-live");
    const button = $("#likes-button");
    const dotsEl = $("#likes-dots");
    const pad = (n) => String(n).padStart(2, "0");
    let thrown = 0; // cartões que já saíram do baralho (a capa conta)
    let nextDirection = 1;

    function makeCard(modifier, parts) {
      const card = document.createElement("div");
      card.className = `deck__card${modifier ? ` deck__card--${modifier}` : ""}`;
      card.setAttribute("aria-hidden", "true");
      parts.forEach(([tag, className, text]) => {
        const el = document.createElement(tag);
        el.className = className;
        el.textContent = text;
        card.appendChild(el);
      });
      deckEl.appendChild(card);
      return card;
    }

    // Ordem: capa, uma carta por mensagem e, no fundo, a carta final
    const cover = makeCard("cover", [
      ["span", "deck__cover-num", String(messages.length)],
      ["span", "deck__cover-text", likes.capa || ""],
      ["span", "deck__cover-hint", likes.dicaCapa || ""],
    ]);
    cover.querySelector(".deck__cover-hint").insertAdjacentHTML(
      "beforeend",
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
    );

    const cards = [cover];
    messages.forEach((message, i) => {
      cards.push(makeCard("", [
        ["span", "deck__quote", "“"],
        ["p", "deck__text", personalise(message)],
        ["span", "deck__num", `${pad(i + 1)} / ${pad(messages.length)}`],
      ]));
    });
    cards.push(makeCard("final", [
      ["span", "deck__quote", "“"],
      ["p", "deck__text", personalise(likes.final || "…")],
    ]));

    // Inclinação ligeira e fixa de cada carta, para parecer um monte real
    const tilts = cards.map((_, i) => ((i * 37) % 7) - 3);

    const dots = messages.map(() => {
      const dot = document.createElement("span");
      dot.className = "likes__dot";
      dotsEl.appendChild(dot);
      return dot;
    });

    const isFinal = () => thrown >= cards.length - 1;

    function layout() {
      cards.forEach((card, i) => {
        const depth = i - thrown;
        card.style.zIndex = String(cards.length - i);
        if (depth < 0) return; // já saiu: mantém a posição de saída
        card.classList.toggle("is-top", depth === 0 && !isFinal());
        card.style.opacity = depth > 2 ? "0" : "1";
        card.style.transform = depth === 0
          ? "none"
          : `translateY(${depth * 12}px) scale(${1 - depth * 0.05}) rotate(${tilts[i]}deg)`;
      });

      const current = thrown - 1; // índice da mensagem visível
      dots.forEach((dot, i) => {
        dot.classList.toggle("is-read", isFinal() || i <= current);
        dot.classList.toggle("is-current", i === current);
      });

      button.textContent = thrown === 0
        ? likes.botaoInicio || "Diz-me"
        : isFinal() ? likes.botaoRecomecar || "Ler outra vez" : likes.botaoSeguinte || "Mais uma";
    }

    function throwTop(direction) {
      if (isFinal()) return;
      const card = cards[thrown];
      card.classList.remove("is-top");
      card.style.transform = `translate(${direction * 130}%, -24px) rotate(${direction * 24}deg)`;
      card.style.opacity = "0";
      thrown += 1;
      nextDirection = -direction;
      layout();
      live.textContent = cards[thrown].querySelector(".deck__text").textContent;
    }

    function reset() {
      thrown = 0;
      live.textContent = "";
      layout();
    }

    button.addEventListener("click", () => (isFinal() ? reset() : throwTop(nextDirection)));

    // Arrastar a carta de cima com o dedo ou o rato
    let drag = null;

    deckEl.addEventListener("pointerdown", (event) => {
      const card = cards[thrown];
      if (isFinal() || !card.contains(event.target)) return;
      drag = { card, id: event.pointerId, x: event.clientX, y: event.clientY, dx: 0, time: performance.now() };
      card.setPointerCapture(event.pointerId);
      card.classList.add("is-dragging");
    });

    deckEl.addEventListener("pointermove", (event) => {
      if (!drag || event.pointerId !== drag.id) return;
      drag.dx = event.clientX - drag.x;
      const dy = (event.clientY - drag.y) * 0.2;
      drag.card.style.transform = `translate(${drag.dx}px, ${dy}px) rotate(${drag.dx / 18}deg)`;
    });

    function endDrag(event, cancelled) {
      if (!drag || event.pointerId !== drag.id) return;
      const { card, dx, time } = drag;
      drag = null;
      card.classList.remove("is-dragging");
      const speed = Math.abs(dx) / Math.max(1, performance.now() - time);

      if (cancelled) layout();
      else if (Math.abs(dx) > deckEl.offsetWidth * 0.25 || (Math.abs(dx) > 30 && speed > 0.6)) throwTop(Math.sign(dx));
      else if (Math.abs(dx) < 6) throwTop(nextDirection); // um toque também passa à seguinte
      else layout();
    }

    deckEl.addEventListener("pointerup", (event) => endDrag(event, false));
    deckEl.addEventListener("pointercancel", (event) => endDrag(event, true));

    layout();
  }

  /* ---------- Envelope da carta ---------- */

  function setupEnvelope() {
    const letter = config.carta || {};
    const envelope = $("#envelope");
    const button = $("#envelope-button");
    const article = $("#letter");

    $("#envelope-to").textContent = personalise(letter.envelope || "Para {nome}");
    $("#envelope-seal").textContent = herName.charAt(0).toUpperCase();

    button.addEventListener("click", () => {
      const reduced = prefersReducedMotion();
      button.setAttribute("aria-expanded", "true");
      envelope.classList.add("is-open");

      // Aba abre, a carta espreita, o envelope sai e a carta desdobra-se
      window.setTimeout(() => envelope.classList.add("is-leaving"), reduced ? 0 : 1500);
      window.setTimeout(() => {
        envelope.hidden = true;
        article.hidden = false;
        if (!reduced) article.classList.add("is-unfolding");
        article.focus({ preventScroll: true });
      }, reduced ? 150 : 1950);
    }, { once: true });
  }

  /* ---------- Estrelas cadentes: um desejo por toque ---------- */

  function setupWishes() {
    const section = $("#surpresa");
    const layer = $("#wishes");
    const hint = $("#wish-hint");
    const text = $("#wish-text");
    const settings = config.surpresa || {};

    if (prefersReducedMotion() || !settings.desejo) {
      hint.hidden = true;
      return;
    }

    text.textContent = personalise(settings.desejo);
    section.classList.add("is-wishing");
    let wishes = 0;

    function addOnce(el) {
      layer.appendChild(el);
      el.addEventListener("animationend", () => el.remove(), { once: true });
    }

    section.addEventListener("pointerdown", (event) => {
      if (event.target.closest("a, button")) return;
      const rect = section.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      // Cai sempre para o lado com mais espaço
      const angle = x > rect.width / 2 ? 148 + Math.random() * 18 : 14 + Math.random() * 18;

      const spark = document.createElement("span");
      spark.className = "wish-spark";
      spark.style.cssText = `--x:${x}px;--y:${y}px`;
      addOnce(spark);

      const star = document.createElement("span");
      star.className = "shooting-star";
      star.style.cssText = `--x:${x}px;--y:${y}px;--angle:${angle}deg`;
      const trail = document.createElement("span");
      trail.className = "shooting-star__trail";
      trail.style.setProperty("--distance", `${220 + Math.random() * 120}px`);
      star.appendChild(trail);
      layer.appendChild(star);
      trail.addEventListener("animationend", () => star.remove(), { once: true });

      wishes += 1;
      if (wishes === 1 && settings.desejoFeito) text.textContent = personalise(settings.desejoFeito);
    });
  }

  /* ---------- Surpresa ---------- */

  function setupSurprise() {
    const surprise = config.surpresa || {};
    const messageEl = $("#surprise-message");
    const revealEl = $("#surprise-reveal");
    const actions = $(".surprise__actions");

    // Com constelação, a mensagem espera que as estrelas se formem
    const start = constellation.hasName ? 3.2 : 0.5;
    const caption = $("#constellation-caption");
    caption.textContent = personalise(surprise.legendaConstelacao || "");
    caption.style.setProperty("--delay", "2.6s");

    (surprise.mensagem || []).forEach((line, i) => {
      const p = document.createElement("p");
      p.textContent = personalise(line);
      p.style.setProperty("--delay", `${start + i * 0.7}s`);
      messageEl.appendChild(p);
    });

    const lineCount = (surprise.mensagem || []).length;
    $(".surprise__note").style.setProperty("--delay", `${start + 0.1 + lineCount * 0.7}s`);
    $(".surprise__wish").style.setProperty("--delay", `${start + 0.5 + lineCount * 0.7}s`);
    $(".surprise__top").style.setProperty("--delay", `${start + 0.9 + lineCount * 0.7}s`);

    $("#surprise-button").addEventListener("click", () => {
      actions.classList.add("is-hidden");

      window.setTimeout(() => {
        actions.hidden = true;
        revealEl.hidden = false;
        void revealEl.offsetWidth;
        revealEl.classList.add("is-shown");
        revealEl.focus({ preventScroll: true });
        constellation.start();
        setupWishes();
        if (!prefersReducedMotion()) petals.start();
      }, prefersReducedMotion() ? 0 : 380);
    }, { once: true });
  }

  /* Pétalas a cair — desenhadas em canvas, param sozinhas */
  const petals = (() => {
    const canvas = $("#petals");
    const ctx = canvas.getContext("2d");
    const colours = ["#f4b6c2", "#f9d3db", "#c94f70", "#fff0f3"];
    let items = [];
    let frame = 0;
    let width = 0;
    let height = 0;

    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function createPetal(i) {
      return {
        x: Math.random() * width,
        y: -20 - Math.random() * height * 0.6 - i * 6,
        size: 7 + Math.random() * 9,
        speed: 0.6 + Math.random() * 1.1,
        sway: 0.6 + Math.random() * 1.4,
        phase: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 0.04,
        colour: colours[i % colours.length],
        alpha: 0.55 + Math.random() * 0.4,
      };
    }

    function drawPetal(p) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.colour;
      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.quadraticCurveTo(p.size * 0.75, -p.size * 0.2, 0, p.size);
      ctx.quadraticCurveTo(-p.size * 0.75, -p.size * 0.2, 0, -p.size);
      ctx.fill();
      ctx.restore();
    }

    function tick() {
      ctx.clearRect(0, 0, width, height);
      let alive = 0;
      items.forEach((p) => {
        p.phase += 0.02;
        p.y += p.speed;
        p.x += Math.sin(p.phase) * p.sway * 0.5;
        p.rotation += p.spin;
        if (p.y < height + 30) {
          alive += 1;
          drawPetal(p);
        }
      });
      frame = alive ? requestAnimationFrame(tick) : 0;
    }

    return {
      start() {
        cancelAnimationFrame(frame);
        resize();
        const count = width < 600 ? 28 : 46;
        items = Array.from({ length: count }, (_, i) => createPetal(i));
        frame = requestAnimationFrame(tick);
      },
    };
  })();

  /* Constelação: o nome dela desenhado com estrelas ligadas por linhas.
     Cada letra é desenhada num canvas invisível; escolhem-se pontos
     espaçados dentro da letra e ligam-se pelo caminho mais curto. */
  const constellation = (() => {
    const canvas = $("#constellation-canvas");
    const ctx = canvas.getContext("2d");
    const name = personalise((config.surpresa || {}).constelacao || "").trim();
    const FORM = 2200; // ms até as estrelas chegarem ao lugar
    const LINK = 1800; // ms a desenhar as linhas
    let stars = [];
    let edges = [];
    let width = 0;
    let height = 0;
    let startTime = 0;
    let frame = 0;
    let started = false;
    let visible = true;

    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    // Aleatório com semente: o mesmo nome dá sempre a mesma constelação
    function seededRandom(text) {
      let seed = [...text].reduce((h, c) => Math.imul(h ^ c.charCodeAt(0), 2654435761), 1779033703) >>> 0;
      return () => {
        seed = (seed + 0x6d2b79f5) >>> 0;
        let t = seed;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }
    let random = Math.random;
    const distance2 = (a, b) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2;

    // Árvore mínima (Prim): liga todos os pontos com as linhas mais curtas,
    // pela ordem em que a árvore cresce — é essa a ordem do desenho.
    function shortestLinks(points) {
      const n = points.length;
      const inTree = new Array(n).fill(false);
      const best = new Array(n).fill(Infinity);
      const from = new Array(n).fill(-1);
      const links = [];
      best[0] = 0;
      for (let k = 0; k < n; k++) {
        let u = -1;
        for (let i = 0; i < n; i++) {
          if (!inTree[i] && (u === -1 || best[i] < best[u])) u = i;
        }
        inTree[u] = true;
        if (from[u] >= 0) links.push([from[u], u, best[u]]);
        for (let v = 0; v < n; v++) {
          if (inTree[v]) continue;
          const d = distance2(points[u], points[v]);
          if (d < best[v]) {
            best[v] = d;
            from[v] = u;
          }
        }
      }
      return links;
    }

    function layout() {
      random = seededRandom(name);
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      const off = document.createElement("canvas");
      off.width = Math.ceil(width);
      off.height = Math.ceil(height);
      const octx = off.getContext("2d", { willReadFrequently: true });
      // Fonte de traço uniforme: as letras ficam legíveis só com pontos e linhas
      const family = 'Manrope, system-ui, sans-serif';

      octx.font = `200 100px ${family}`;
      const size = Math.min(height * 0.8, ((width * 0.92) / (octx.measureText(name).width || 1)) * 100);
      octx.font = `200 ${size}px ${family}`;
      const spacing = Math.max(7, size * 0.12);
      const baseline = height / 2 + size * 0.28;
      let x = (width - octx.measureText(name).width) / 2;

      stars = [];
      edges = [];

      [...name].forEach((letter) => {
        const letterWidth = octx.measureText(letter).width;
        if (letter.trim()) {
          octx.clearRect(0, 0, off.width, off.height);
          octx.fillText(letter, x, baseline);
          const left = Math.max(0, Math.floor(x - size * 0.2));
          const right = Math.min(off.width, Math.ceil(x + letterWidth + size * 0.2));
          const data = octx.getImageData(0, 0, off.width, off.height).data;

          const candidates = [];
          for (let py = 0; py < off.height; py += 1) {
            for (let px = left; px < right; px += 1) {
              if (data[(py * off.width + px) * 4 + 3] > 90) candidates.push([px, py]);
            }
          }
          for (let i = candidates.length - 1; i > 0; i--) {
            const j = Math.floor(random() * (i + 1));
            [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
          }

          const picked = [];
          const minDistance2 = spacing * spacing;
          candidates.forEach((c) => {
            if (picked.every((p) => distance2(p, c) >= minDistance2)) picked.push(c);
          });

          const offset = stars.length;
          picked.forEach(([px, py]) => {
            const bright = random() < 0.18;
            stars.push({
              x: px,
              y: py,
              fromX: random() * width,
              fromY: random() * height,
              radius: bright ? 2.2 + random() * 0.8 : 1 + random(),
              bright,
              delay: random() * 600,
              phase: random() * Math.PI * 2,
            });
          });

          const maxLink2 = (spacing * 2.6) ** 2;
          const linked = new Set();
          shortestLinks(picked).forEach(([a, b, d]) => {
            if (d <= maxLink2) {
              edges.push([offset + a, offset + b]);
              linked.add(`${Math.min(a, b)}-${Math.max(a, b)}`);
            }
          });

          // Liga também vizinhos muito próximos, para fechar letras como o "o"
          const closeLink2 = (spacing * 1.45) ** 2;
          picked.forEach((p, a) => {
            picked.forEach((q, b) => {
              if (b <= a || linked.has(`${a}-${b}`) || distance2(p, q) > closeLink2) return;
              edges.push([offset + a, offset + b]);
              linked.add(`${a}-${b}`);
            });
          });

          // Duas pontas soltas perto uma da outra são um anel por fechar
          const degree = new Array(picked.length).fill(0);
          linked.forEach((key) => key.split("-").forEach((i) => { degree[i] += 1; }));
          const ends = picked.map((_, i) => i).filter((i) => degree[i] === 1);
          const gapLink2 = (spacing * 2.4) ** 2;
          ends.forEach((a, i) => {
            ends.slice(i + 1).forEach((b) => {
              const key = `${Math.min(a, b)}-${Math.max(a, b)}`;
              if (linked.has(key) || distance2(picked[a], picked[b]) > gapLink2) return;
              edges.push([offset + a, offset + b]);
              linked.add(key);
            });
          });
        }
        x += letterWidth;
      });
    }

    function draw(time, twinkle) {
      ctx.clearRect(0, 0, width, height);

      // Linhas
      const linkProgress = clamp01((time - FORM * 0.8) / LINK) * edges.length;
      ctx.strokeStyle = "rgba(244, 182, 194, 0.42)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i < Math.min(edges.length, Math.ceil(linkProgress)); i++) {
        const a = stars[edges[i][0]];
        const b = stars[edges[i][1]];
        const part = Math.min(1, linkProgress - i);
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(a.x + (b.x - a.x) * part, a.y + (b.y - a.y) * part);
      }
      ctx.stroke();

      // Estrelas
      stars.forEach((s) => {
        const t = easeOut(clamp01((time - s.delay) / (FORM - 600)));
        const x = s.fromX + (s.x - s.fromX) * t;
        const y = s.fromY + (s.y - s.fromY) * t;
        let alpha = 0.25 + 0.75 * t;
        if (twinkle) alpha *= 0.78 + 0.22 * Math.sin(time / 650 + s.phase);

        if (s.bright) {
          ctx.globalAlpha = alpha * 0.12;
          ctx.fillStyle = "#f4b6c2";
          ctx.beginPath();
          ctx.arc(x, y, s.radius * 2.6, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = alpha;
        ctx.fillStyle = "#fffdfd";
        ctx.beginPath();
        ctx.arc(x, y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    }

    function loop(now) {
      draw(now - startTime, true);
      frame = visible ? requestAnimationFrame(loop) : 0;
    }

    function resume() {
      if (started && visible && !frame && !prefersReducedMotion()) frame = requestAnimationFrame(loop);
    }

    function start() {
      if (!name) return;
      canvas.setAttribute("aria-label", `Estrelas ligadas a desenhar o nome ${name}`);
      const fontReady = document.fonts
        ? document.fonts.load("200 100px Manrope").catch(() => {})
        : Promise.resolve();

      fontReady.then(() => {
        layout();
        started = true;
        if (prefersReducedMotion()) {
          draw(FORM + LINK * 2, false);
          return;
        }
        startTime = performance.now();
        resume();
      });
    }

    if (!name) canvas.parentElement.hidden = true;

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        resume();
      }).observe(canvas);
    }

    let resizeTimer = 0;
    window.addEventListener("resize", () => {
      if (!started) return;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        layout();
        // Depois de redimensionar, mostra logo a constelação completa
        startTime = performance.now() - (FORM + LINK);
        draw(FORM + LINK * 2, false);
      }, 200);
    });

    return { start, hasName: Boolean(name) };
  })();

  /* ---------- Música ---------- */

  const music = (() => {
    const audio = $("#music");
    const button = $("#music-toggle");
    const stateEl = $("#music-state");
    const settings = config.musica || {};
    let fadeTimer = 0;

    function render() {
      const playing = !audio.paused;
      button.setAttribute("aria-pressed", String(playing));
      button.setAttribute("aria-label", playing ? "Pausar a música" : "Tocar a música");
      stateEl.textContent = playing ? "a tocar · pausar" : "em pausa · tocar";
    }

    function fadeIn() {
      clearInterval(fadeTimer);
      audio.volume = 0;
      fadeTimer = setInterval(() => {
        audio.volume = Math.min(0.75, audio.volume + 0.05);
        if (audio.volume >= 0.75) clearInterval(fadeTimer);
      }, 100);
    }

    function play() {
      if (!settings.ficheiro) return;
      fadeIn();
      const attempt = audio.play();
      if (attempt) attempt.catch(render);
    }

    if (settings.ficheiro) {
      audio.src = settings.ficheiro;
      if (settings.titulo) $("#music-label").textContent = settings.titulo;
      button.hidden = false;
      render();

      audio.addEventListener("play", render);
      audio.addEventListener("pause", render);
      audio.addEventListener("error", () => {
        button.hidden = true;
        audio.removeAttribute("src");
      });

      button.addEventListener("click", () => {
        if (audio.paused) play();
        else audio.pause();
      });
    }

    return { play };
  })();

  /* ---------- Progresso e capítulos ---------- */

  function setupProgress() {
    const bar = $(".progress__bar");
    let ticking = false;

    function update() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      bar.style.transform = `scaleX(${ratio})`;
      ticking = false;
    }

    window.addEventListener("scroll", () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  function setupChapters() {
    if (!("IntersectionObserver" in window)) return;
    const links = [...document.querySelectorAll(".chapters__link")];

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          link.classList.toggle("is-active", link.hash === `#${entry.target.id}`);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    links.forEach((link) => {
      const section = document.querySelector(link.hash);
      if (section) observer.observe(section);
    });
  }

  /* ---------- Arranque ---------- */

  fillTexts();
  document.querySelectorAll(".stars").forEach((el) => scatterStars(el, window.innerWidth < 600 ? 50 : 90));
  setupIntro();
  setupDaily();
  setupMonth();
  setupDay();
  renderGallery();
  setupLightbox();
  renderLetter();
  setupEnvelope();
  setupLikes();
  setupSurprise();
  setupProgress();
  setupChapters();
  document.querySelectorAll("[data-reveal]:not(.photo)").forEach(reveal);
})();
