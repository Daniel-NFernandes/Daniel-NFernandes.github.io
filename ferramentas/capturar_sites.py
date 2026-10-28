"""Gera as capturas de tela dos sites usadas nos estudos de caso.

Para cada site cria, na pasta assets/casos/:
  <nome>-topo.jpg      recorte do topo da página (16:10), mostrado no estudo de caso
  <nome>-completa.jpg  página inteira, aberta ao clicar no recorte

Uso (na pasta do projeto):
  py -3.11 -m pip install playwright pillow
  py -3.11 -m playwright install chromium
  py -3.11 ferramentas/capturar_sites.py

Opções:
  --so viagemplus            captura só um site
  --site nome=https://...    acrescenta ou troca um site
"""

from __future__ import annotations

import argparse
import io
import sys
from pathlib import Path

from PIL import Image
from playwright.sync_api import Error as ErroPlaywright
from playwright.sync_api import sync_playwright

SITES = {
    "viagemplus": "https://viagemplus.com/",
    "picsells": "https://picsells.com.br/",
    "maonacasa": "https://maonacasa.com.br/",
}

PASTA_PADRAO = Path(__file__).resolve().parent.parent / "assets" / "casos"
LARGURA_JANELA = 1440
ALTURA_JANELA = 900          # 1440 x 900 = proporção 16:10
LARGURA_TOPO = 1400
LARGURA_COMPLETA = 1200
ALTURA_MAXIMA_COMPLETA = 14000


def rolar_ate_o_fim(pagina) -> None:
    """Rola a página devagar para carregar imagens e animações que só aparecem ao rolar."""
    altura = pagina.evaluate("document.documentElement.scrollHeight")
    posicao = 0
    while posicao < altura:
        pagina.evaluate(f"window.scrollTo(0, {posicao})")
        pagina.wait_for_timeout(250)
        posicao += 500
        altura = pagina.evaluate("document.documentElement.scrollHeight")
    pagina.wait_for_timeout(600)
    pagina.evaluate("window.scrollTo(0, 0)")
    pagina.wait_for_timeout(600)


def para_jpeg(png: bytes, largura: int, qualidade: int, altura_max: int | None = None) -> Image.Image:
    imagem = Image.open(io.BytesIO(png)).convert("RGB")
    if imagem.width > largura:
        imagem = imagem.resize((largura, round(imagem.height * largura / imagem.width)), Image.LANCZOS)
    if altura_max and imagem.height > altura_max:
        imagem = imagem.crop((0, 0, imagem.width, altura_max))
    imagem.info["qualidade"] = qualidade
    return imagem


def capturar(playwright, nome: str, url: str, saida: Path) -> None:
    navegador = playwright.chromium.launch()
    contexto = navegador.new_context(
        viewport={"width": LARGURA_JANELA, "height": ALTURA_JANELA},
        locale="pt-BR",
        color_scheme="light",
        reduced_motion="reduce",
    )
    pagina = contexto.new_page()
    try:
        try:
            pagina.goto(url, wait_until="networkidle", timeout=60000)
        except ErroPlaywright:
            pagina.goto(url, wait_until="load", timeout=60000)
        pagina.wait_for_timeout(1200)
        rolar_ate_o_fim(pagina)

        topo = para_jpeg(pagina.screenshot(full_page=False), LARGURA_TOPO, 82)
        completa = para_jpeg(pagina.screenshot(full_page=True), LARGURA_COMPLETA, 74, ALTURA_MAXIMA_COMPLETA)
    finally:
        contexto.close()
        navegador.close()

    saida.mkdir(parents=True, exist_ok=True)
    arquivo_topo = saida / f"{nome}-topo.jpg"
    arquivo_completa = saida / f"{nome}-completa.jpg"
    topo.save(arquivo_topo, "JPEG", quality=topo.info["qualidade"], optimize=True)
    completa.save(arquivo_completa, "JPEG", quality=completa.info["qualidade"], optimize=True)
    print(f"  {arquivo_topo.name}: {arquivo_topo.stat().st_size // 1024} KB")
    print(f"  {arquivo_completa.name}: {arquivo_completa.stat().st_size // 1024} KB ({completa.width}x{completa.height})")


def main() -> int:
    parser = argparse.ArgumentParser(description="Captura os sites dos estudos de caso.")
    parser.add_argument("--so", help="captura só o site com esse nome")
    parser.add_argument("--site", action="append", default=[], metavar="NOME=URL", help="acrescenta ou troca um site")
    parser.add_argument("--saida", type=Path, default=PASTA_PADRAO, help="pasta de destino das imagens")
    args = parser.parse_args()

    sites = dict(SITES)
    for item in args.site:
        nome, _, url = item.partition("=")
        if not nome or not url:
            parser.error("use --site NOME=URL")
        sites[nome] = url
    if args.so:
        if args.so not in sites:
            parser.error(f"site desconhecido: {args.so}. Opções: {', '.join(sites)}")
        sites = {args.so: sites[args.so]}

    falhas = 0
    with sync_playwright() as playwright:
        for nome, url in sites.items():
            print(f"Capturando {nome} ({url})...")
            try:
                capturar(playwright, nome, url, args.saida)
            except Exception as erro:  # noqa: BLE001 - um site com problema não deve impedir os outros
                falhas += 1
                print(f"  FALHOU: {erro}")
    print("Pronto." if not falhas else f"Terminou com {falhas} falha(s).")
    return 1 if falhas else 0


if __name__ == "__main__":
    sys.exit(main())
