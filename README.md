# Portfólio de Daniel Fernandes

Site pessoal com meus serviços (web design, SEO, automação com n8n e IA, vídeo), projetos de código e estudos de caso. É um site estático em HTML, CSS e JavaScript puro, sem dependências nem etapa de build.

**Site no ar:** https://daniel-nfernandes.github.io/

## O que tem no site

- **Topo** com um exemplo animado de automação (formulário, n8n, planilha, e-mail e WhatsApp).
- **Serviços**, **projetos de código** (links para este GitHub) e **estudos de caso**.
- **Sobre mim** e **contato** (WhatsApp, e-mail, LinkedIn e GitHub).
- Responsivo, com modo claro e escuro automático, foco visível no teclado e animação desligada para quem prefere menos movimento.

## Estrutura

```
portfolio-daniel/
├── index.html        página única
├── css/style.css     estilos (cores e fontes no topo do arquivo)
├── js/cases.js       dados dos estudos de caso (edite aqui)
├── js/main.js        mostra os casos publicados
├── ferramentas/      script que captura os sites dos casos
└── assets/
    └── foto-perfil.jpg
```

## Como editar

- **Textos e links:** direto no `index.html`.
- **Cores e fontes:** variáveis no início do `css/style.css` (`:root`).
- **Foto:** troque `assets/foto-perfil.jpg` mantendo o mesmo nome.
- **Estudos de caso:** os casos da Viagem Plus e da PicSells já estão em `js/cases.js`. Para acrescentar outro, copie o modelo do fim do arquivo, preencha com um projeto real e troque `rascunho: true` por `rascunho: false`. Quando tiver números reais (visitas, cotações, vendas), acrescente ao campo `resultado`.
- **Telefone:** se não quiser deixar o WhatsApp público, apague os dois links `wa.me` e a linha de WhatsApp na seção de contato.

## Capturas de tela dos estudos de caso

As imagens dos casos (recorte do topo e página completa) são geradas automaticamente:

```bash
py -3.11 -m pip install playwright pillow
py -3.11 -m playwright install chromium
py -3.11 ferramentas/capturar_sites.py
```

Elas ficam em `assets/casos/`. Para atualizar uma só, use `--so viagemplus`. Se uma imagem não existir, o recorte simplesmente não aparece.

## Testar no computador

Abra o `index.html` no navegador, ou rode um servidor local:

```bash
python -m http.server 8000
# acesse http://localhost:8000
```

## Publicar no GitHub Pages

O endereço mais limpo vem de um repositório chamado exatamente `Daniel-NFernandes.github.io`.

1. Em https://github.com/new crie o repositório `Daniel-NFernandes.github.io`, público e sem README.
2. Envie os arquivos:

```bash
git init -b main
git add .
git commit -m "Publica o site de portfólio"
git remote add origin https://github.com/Daniel-NFernandes/Daniel-NFernandes.github.io.git
git push -u origin main
```

3. No repositório, abra **Settings > Pages**, escolha **Deploy from a branch**, selecione `main` e a pasta `/ (root)`, e salve.
4. Em alguns minutos o site fica em `https://daniel-nfernandes.github.io/`.

## Depois de publicar

- Coloque o link do site no seu perfil do LinkedIn e do GitHub.
- Fixe este repositório no topo do seu perfil do GitHub.
- Se tiver domínio próprio, configure em **Settings > Pages > Custom domain**.

## Tecnologias

HTML, CSS e JavaScript. Fontes: Bricolage Grotesque e Source Serif 4 (Google Fonts).
