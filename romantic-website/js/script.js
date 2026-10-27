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

  /* ---------- Galeria + fotografia ampliada ---------- */

  const photos = ((config.galeria && config.galeria.fotos) || []).filter((p) => p && p.src);
  const lightbox = $("#lightbox");
  const lightboxImg = $("#lightbox-img");
  let currentPhoto = 0;
  let lastTrigger = null;

  function renderGallery() {
    const gallery = $("#gallery");
    const zoomIcon =
      '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5M11 8.5v5M8.5 11h5"/></svg>';

    photos.forEach((photo, index) => {
      const figure = document.createElement("figure");
      figure.className = "photo";
      figure.dataset.reveal = "";
      figure.style.setProperty("--delay", `${(index % 2) * 0.12}s`);

      const button = document.createElement("button");
      button.type = "button";
      button.className = "photo__frame media";
      button.setAttribute("aria-label", `Ampliar fotografia ${index + 1} de ${photos.length}`);
      button.addEventListener("click", () => openLightbox(index, button));

      const img = document.createElement("img");
      img.alt = personalise(photo.alt);
      img.loading = "lazy";
      img.decoding = "async";
      img.style.objectPosition = photo.foco || "50% 40%";

      const zoom = document.createElement("span");
      zoom.className = "photo__zoom";
      zoom.setAttribute("aria-hidden", "true");
      zoom.innerHTML = zoomIcon;

      button.append(img, zoom);
      figure.appendChild(button);

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
      loadInto(button, img, photo.src);
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

  /* ---------- "Sabes o que mais gosto em ti?" ---------- */

  function setupLikes() {
    const likes = config.gosto || {};
    const messages = likes.mensagens || [];
    const messageEl = $("#likes-message");
    const countEl = $("#likes-count");
    const button = $("#likes-button");
    const dotsEl = $("#likes-dots");
    let index = -1;

    const dots = messages.map(() => {
      const dot = document.createElement("span");
      dot.className = "likes__dot";
      dotsEl.appendChild(dot);
      return dot;
    });

    button.textContent = likes.botaoInicio || "Diz-me";

    function swapText(text, isPlaceholder) {
      const update = () => {
        messageEl.textContent = text;
        messageEl.classList.toggle("is-placeholder", isPlaceholder);
        messageEl.classList.remove("is-leaving");
        messageEl.classList.add("is-entering");
        // Força o navegador a aplicar o estado inicial antes de animar
        void messageEl.offsetWidth;
        messageEl.classList.remove("is-entering");
      };

      if (prefersReducedMotion()) return update();
      messageEl.classList.add("is-leaving");
      window.setTimeout(update, 320);
    }

    function updateDots() {
      dots.forEach((dot, i) => {
        dot.classList.toggle("is-read", i <= index);
        dot.classList.toggle("is-current", i === index);
      });
    }

    button.addEventListener("click", () => {
      index += 1;

      if (index < messages.length) {
        swapText(personalise(messages[index]), false);
        countEl.textContent = `${String(index + 1).padStart(2, "0")} / ${String(messages.length).padStart(2, "0")}`;
        button.textContent = likes.botaoSeguinte || "Mais uma";
      } else if (index === messages.length) {
        swapText(personalise(likes.final || "…"), false);
        countEl.textContent = "";
        button.textContent = likes.botaoRecomecar || "Ler outra vez";
      } else {
        index = -1;
        swapText("…", true);
        countEl.textContent = "";
        button.textContent = likes.botaoInicio || "Diz-me";
      }

      updateDots();
    });
  }

  /* ---------- Surpresa ---------- */

  function setupSurprise() {
    const surprise = config.surpresa || {};
    const messageEl = $("#surprise-message");
    const revealEl = $("#surprise-reveal");
    const actions = $(".surprise__actions");

    (surprise.mensagem || []).forEach((line, i) => {
      const p = document.createElement("p");
      p.textContent = personalise(line);
      p.style.setProperty("--delay", `${0.5 + i * 0.7}s`);
      messageEl.appendChild(p);
    });

    const lineCount = (surprise.mensagem || []).length;
    $(".surprise__note").style.setProperty("--delay", `${0.6 + lineCount * 0.7}s`);
    $(".surprise__top").style.setProperty("--delay", `${1 + lineCount * 0.7}s`);

    $("#surprise-button").addEventListener("click", () => {
      actions.classList.add("is-hidden");

      window.setTimeout(() => {
        actions.hidden = true;
        revealEl.hidden = false;
        void revealEl.offsetWidth;
        revealEl.classList.add("is-shown");
        revealEl.focus({ preventScroll: true });
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
  renderGallery();
  setupLightbox();
  renderLetter();
  setupLikes();
  setupSurprise();
  setupProgress();
  setupChapters();
  document.querySelectorAll("[data-reveal]:not(.photo)").forEach(reveal);
})();
