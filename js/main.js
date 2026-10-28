(function () {
  "use strict";

  // Quem prefere menos movimento não vê a animação do fluxo.
  var reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduzir) {
    document.querySelectorAll(".pulso").forEach(function (el) {
      el.remove();
    });
  }

  // Estudos de caso: mostra só os que não são rascunho.
  var casos = (window.CASOS || []).filter(function (c) {
    return c && !c.rascunho;
  });
  if (!casos.length) return;

  var secao = document.getElementById("casos");
  var lista = document.getElementById("lista-casos");
  var menu = document.getElementById("menu-casos");
  if (!secao || !lista) return;

  function criar(tag, classe, texto) {
    var el = document.createElement(tag);
    if (classe) el.className = classe;
    if (texto) el.textContent = texto;
    return el;
  }

  // Janela que mostra a página completa do cliente.
  var visualizador = document.getElementById("visualizador");
  var visualizadorImagem = document.getElementById("visualizador-imagem");
  var visualizadorTitulo = document.getElementById("visualizador-titulo");

  if (visualizador && visualizador.showModal) {
    document.getElementById("visualizador-fechar").addEventListener("click", function () {
      visualizador.close();
    });
    // Clicar fora da janela também fecha.
    visualizador.addEventListener("click", function (evento) {
      if (evento.target === visualizador) visualizador.close();
    });
  }

  function abrirPaginaCompleta(c) {
    var alt = "Página completa de " + c.titulo;
    if (!visualizador || !visualizador.showModal) {
      window.open(c.imagemCompleta, "_blank", "noopener");
      return;
    }
    visualizadorImagem.src = c.imagemCompleta;
    visualizadorImagem.alt = alt;
    visualizadorTitulo.textContent = alt;
    visualizador.showModal();
    visualizador.querySelector(".visualizador__corpo").scrollTop = 0;
  }

  function endereco(link) {
    try {
      return new URL(link).hostname.replace(/^www\./, "");
    } catch (erro) {
      return "";
    }
  }

  function criarPrevia(c) {
    var clicavel = Boolean(c.imagemCompleta);
    var previa = criar(clicavel ? "button" : "div", "caso__previa");
    if (clicavel) {
      previa.type = "button";
      previa.setAttribute("aria-label", "Ver a página completa de " + c.titulo);
      previa.addEventListener("click", function () {
        abrirPaginaCompleta(c);
      });
    }

    var barra = criar("span", "caso__barra");
    barra.setAttribute("aria-hidden", "true");
    for (var i = 0; i < 3; i++) barra.appendChild(criar("i"));
    var site = endereco(c.link);
    if (site) barra.appendChild(criar("span", "", site));
    previa.appendChild(barra);

    var imagem = document.createElement("img");
    imagem.src = c.imagem;
    imagem.alt = c.altImagem || "Página inicial de " + c.titulo;
    imagem.loading = "lazy";
    imagem.decoding = "async";
    // Se o arquivo ainda não existir, o recorte some em vez de mostrar um ícone quebrado.
    imagem.addEventListener("error", function () {
      previa.remove();
    });
    previa.appendChild(imagem);

    if (clicavel) previa.appendChild(criar("span", "caso__dica", "Ver a página completa"));
    return previa;
  }

  casos.forEach(function (c) {
    var artigo = criar("article", "caso");
    artigo.appendChild(criar("h3", "", c.titulo));

    var meta = [c.segmento, c.servicos].filter(Boolean).join(". ");
    if (meta) artigo.appendChild(criar("p", "caso__meta", meta));

    if (c.imagem) artigo.appendChild(criarPrevia(c));

    var dl = criar("dl");
    [
      ["Desafio", c.desafio],
      ["O que eu fiz", c.solucao],
      ["Resultado", c.resultado]
    ].forEach(function (par) {
      if (!par[1]) return;
      var bloco = criar("div");
      bloco.appendChild(criar("dt", "", par[0]));
      bloco.appendChild(criar("dd", "", par[1]));
      dl.appendChild(bloco);
    });
    artigo.appendChild(dl);

    if (c.link) {
      var a = criar("a", "caso__link", c.textoLink || "Ver o projeto");
      a.href = c.link;
      a.rel = "noopener";
      artigo.appendChild(a);
    }

    lista.appendChild(artigo);
  });

  secao.hidden = false;
  if (menu) menu.hidden = false;
})();
