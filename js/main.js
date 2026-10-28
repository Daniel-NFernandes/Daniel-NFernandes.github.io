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

  casos.forEach(function (c) {
    var artigo = criar("article", "caso");
    artigo.appendChild(criar("h3", "", c.titulo));

    var meta = [c.segmento, c.servicos].filter(Boolean).join(". ");
    if (meta) artigo.appendChild(criar("p", "caso__meta", meta));

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
