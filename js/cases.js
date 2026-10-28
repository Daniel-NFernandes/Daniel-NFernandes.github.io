/*
  ESTUDOS DE CASO
  ----------------
  Cada item da lista abaixo vira um estudo de caso no site.
  A seção só aparece quando existe pelo menos um caso publicado.

  Como publicar um novo caso:
    1. Copie o último item (o modelo com rascunho: true) e cole depois dele, separado por vírgula.
    2. Preencha com informações reais do projeto.
    3. Troque  rascunho: true  por  rascunho: false.

  Dicas:
    - Use números reais quando tiver (visitas, cotações, pedidos, horas economizadas).
    - Peça autorização ao cliente antes de citar o nome dele.
    - Campos vazios não aparecem na página.
    - "link" e "textoLink" são opcionais (site no ar, vídeo, etc.).

  Imagens do caso (opcionais), guardadas em assets/casos/ e geradas por ferramentas/capturar_sites.py:
    imagem:         recorte do topo da página, mostrado no caso (ex.: "assets/casos/viagemplus-topo.jpg")
    imagemCompleta: captura da página inteira, aberta numa janela rolável ao clicar no recorte
    altImagem:      descrição da imagem para leitores de tela
*/
window.CASOS = [
  {
    rascunho: false,
    titulo: "Viagem Plus",
    segmento: "Agência de viagens",
    servicos: "Web design em WordPress e Elementor, desenvolvimento personalizado, blog e CRM",
    desafio: "Dar à agência uma vitrine online para apresentar destinos, pacotes, cruzeiros e serviços como chip internacional e seguro viagem, levando o visitante direto a uma cotação pelo WhatsApp.",
    solucao: "Site em WordPress com Elementor, com destinos nacionais e internacionais, pacotes, cruzeiros, serviços e depoimentos de clientes. Cada oferta tem botão de WhatsApp com a mensagem já preenchida, e os stories do Instagram da agência aparecem no site automaticamente. O Blog Plus, dentro do próprio site, reúne guias de destino, dicas e experiências de viajantes, com login, envio de relatos pelo próprio viajante e área de moderação. Há também um CRM em subdomínio próprio. Blog e CRM foram desenvolvidos com apoio do Claude Code.",
    resultado: "Site, blog e CRM no ar, com o atendimento concentrado no WhatsApp.",
    imagem: "assets/casos/viagemplus-topo.jpg",
    imagemCompleta: "assets/casos/viagemplus-completa.jpg",
    link: "https://viagemplus.com",
    textoLink: "Ver o site da Viagem Plus"
  },
  {
    rascunho: false,
    titulo: "PicSells",
    segmento: "Marca própria de sites, automação com IA e edição de vídeo",
    servicos: "Web design em WordPress e Elementor, copy, identidade digital",
    desafio: "Apresentar numa única página os três serviços da marca (sites, automação com IA e edição de vídeo) e dar ao visitante um caminho claro até o orçamento.",
    solucao: "Site em WordPress com Elementor organizado por serviço. A seção de automação mostra o fluxo de atendimento do primeiro contato ao agendamento, feito com n8n e IA. A página também explica as quatro etapas do trabalho, responde às perguntas frequentes e leva ao orçamento pelo WhatsApp, com política de privacidade e página de LGPD.",
    resultado: "Site no ar, com pedido de orçamento direto pelo WhatsApp em todas as chamadas.",
    imagem: "assets/casos/picsells-topo.jpg",
    imagemCompleta: "assets/casos/picsells-completa.jpg",
    link: "https://picsells.com.br",
    textoLink: "Ver o site da PicSells"
  },
  {
    rascunho: false,
    titulo: "Mão na Casa",
    segmento: "Guia de manutenção doméstica",
    servicos: "Web design em WordPress e Elementor, conteúdo pensado para buscas no Google",
    desafio: "Criar um site de conteúdo para quem chega do Google com um problema específico em casa, como torneira pingando ou disjuntor desarmando, e precisa entender a causa, ver o que é seguro fazer e saber quando chamar um profissional.",
    solucao: "Site em WordPress com Elementor organizado por área da casa (hidráulica, elétrica, eletrodomésticos e casa e reparos), com campo de busca por problema e cartões de problemas populares que mostram o tempo e o nível de dificuldade de cada guia. Uma seção explica o método em quatro etapas, outra deixa clara a política de links de afiliados, e há cadastro de e-mail para receber um guia novo. Construído com apoio do Claude.",
    resultado: "Site no ar desde agosto de 2026, com categorias, busca por problema e cadastro de e-mail.",
    imagem: "assets/casos/maonacasa-topo.jpg",
    imagemCompleta: "assets/casos/maonacasa-completa.jpg",
    link: "https://maonacasa.com.br/",
    textoLink: "Ver o site Mão na Casa"
  },
  {
    rascunho: true,
    titulo: "Nome do projeto",
    segmento: "Segmento do cliente (ex.: clínica, loja, escritório)",
    servicos: "Web design, SEO",
    desafio: "Qual problema o cliente tinha antes do projeto.",
    solucao: "O que você fez para resolver, com as ferramentas usadas.",
    resultado: "O que mudou depois, de preferência com números.",
    link: "",
    textoLink: "Ver o projeto"
  }
];
