import type {
  InformationPageSlug,
  InformationPageCopy,
} from "./information-copy";

const contactEmail = "contact@stratlore.com";

export const ptBrRuDeInfoCopy: Record<
  "pt-br" | "ru" | "de",
  Record<InformationPageSlug, InformationPageCopy>
> = {
  "pt-br": {
    about: {
      description:
        "Saiba como o Exile2 Guides é operado, pesquisado e publicado de forma independente como um recurso não oficial de guias de Path of Exile 2.",
      title: "Sobre o Exile2 Guides",
      sections: [
        {
          title: "Nossa Missão",
          paragraphs: [
            "O Exile2 Guides é operado de forma independente por um único desenvolvedor como um recurso não oficial de guias de Path of Exile 2. O objetivo é organizar respostas úteis e atentas às atualizações, sem apresentar resumos de pesquisas como experiência pessoal de jogo.",
            "O site é somente leitura e gratuito para acessar. Os artigos são publicados após pesquisa estruturada e verificações automatizadas de qualidade, com incertezas e limites de verificação exibidos na página quando relevantes.",
          ],
        },
        {
          title: "O Que Cobrimos",
          connectionLinks: [
            {
              description:
                "Builds de leveling, configurações de endgame, prioridades de equipamento, caminhos na árvore de passivas e configurações de ligação de gemas para todas as classes.",
              href: "/en/builds/",
              label: "Builds",
            },
            {
              description:
                "Mecânicas de chefes, divisão por fases, tabelas de loot, requisitos de resistência e guias passo a passo.",
              href: "/en/bosses/",
              label: "Bosses",
            },
            {
              description:
                "Bancos de dados de itens únicos, mecânicas de moedas, referências de criação e explicações de níveis de afixos.",
              href: "/en/items/",
              label: "Itens",
            },
            {
              description:
                "Análises de gemas de habilidades ativas, combinações de gemas de suporte, mecânicas de escala e dados de progressão de nível.",
              href: "/en/skills/",
              label: "Habilidades",
            },
            {
              description:
                "Análises aprofundadas de mecânicas, tutoriais para iniciantes, respostas de perguntas frequentes e guias gerais de progressão.",
              href: "/en/guides/",
              label: "Guias",
            },
          ],
        },
        {
          title: "Padrões Editoriais",
          paragraphs: [
            "Os artigos são pesquisados usando notas oficiais de atualização, bancos de dados atuais, guias consolidados da comunidade, vídeos de gameplay e discussões de jogadores. As afirmações são vinculadas às suas fontes sempre que possível e escritas com o contexto de atualização relevante.",
            "A QA automatizada verifica a estrutura do conteúdo, metadados obrigatórios, links internos, estado de publicação, indexabilidade e a saída de build antes de um artigo ser lançado.",
            "Quando uma conclusão não foi testada pessoalmente no jogo, ela é apresentada como verificada por fonte e não como testada em primeira mão. A incerteza sensível à versão permanece visível em vez de ser ocultada por uma linguagem confiante.",
          ],
        },
        {
          title: "Independência",
          paragraphs: [
            "O Exile2 Guides é um recurso independente feito por fãs. Não é afiliado, endossado ou patrocinado pela Grinding Gear Games ou qualquer outra empresa.",
            "A publicação é mantida por um único operador, e o processo de pesquisa não apresenta testes de gameplay em primeira mão como concluídos quando não foram realizados.",
          ],
        },
        {
          title: "Correções e Feedback",
          paragraphs: [
            "As mecânicas do jogo mudam com frequência, e nenhum guia é perfeito. Se você encontrar um erro factual, uma mecânica desatualizada ou uma fonte ausente, entre em contato por meio de nossa página de Contato ou envie-nos um e-mail diretamente.",
            "Correções e denúncias de direitos autorais são analisadas conforme o tempo permite. Erros factuais de alto impacto têm prioridade, mas o tempo de resposta não é garantido.",
          ],
        },
      ],
    },
    contact: {
      description:
        "Entre em contato com o operador independente do Exile2 Guides sobre correções de conteúdo, denúncias de direitos autorais ou feedback geral.",
      title: "Fale Conosco",
      sections: [
        {
          title: "Entre em Contato",
          paragraphs: [
            `O único canal de contato público é o e-mail: ${contactEmail}. Analisamos correções e denúncias de direitos autorais conforme o tempo permite. Erros factuais de alto impacto têm prioridade, mas o tempo de resposta não é garantido.`,
            "Este é um site estático somente leitura, sem formulário de contato no servidor. Use o link de e-mail direto abaixo; não há botão de envio de mensagem que possa descartar sua solicitação silenciosamente.",
          ],
          connectionLinks: [
            {
              description:
                "Abra seu cliente de e-mail para enviar uma correção, denúncia de direitos autorais ou outra observação.",
              href: `mailto:${contactEmail}`,
              label: contactEmail,
            },
          ],
        },
        {
          title: "Cenários de Contato",
          issueCards: [
            {
              description:
                "Inclua a URL da página, a afirmação específica que está incorreta, a versão do jogo ou patch que você testou e uma fonte confiável ou passos claros de reprodução.",
              title: "Correção de conteúdo",
            },
            {
              description:
                "Forneça a URL do ativo ou da página, uma descrição do material protegido, comprovação de propriedade ou autorização e a ação específica que você está solicitando.",
              title: "Direitos autorais ou atribuição",
            },
            {
              description:
                "Informe qual área precisa de atenção — builds, bosses, itens, habilidades ou experiência geral do site — junto com sua sugestão detalhada.",
              title: "Feedback geral",
            },
          ],
        },
        {
          title: "O Que Incluir",
          bullets: [
            "A URL exata da página onde o problema aparece, junto com uma captura de tela ou texto citado, se possível.",
            "Uma fonte confiável para a correção — notas oficiais de patch, uma entrada atual de banco de dados ou um teste/relatório claro da comunidade.",
            "Detalhes claros de reprodução para qualquer discrepância de mecânica, incluindo a versão do jogo e a configuração relevante, se conhecida.",
            "Apenas as informações pessoais mínimas necessárias para responder à sua consulta.",
          ],
        },
        {
          title: "Política de Análise",
          paragraphs: [
            "Analisamos correções e denúncias de direitos autorais conforme o tempo permite. Erros factuais de alto impacto têm prioridade, mas o tempo de resposta não é garantido.",
          ],
        },
      ],
    },
    "cookie-policy": {
      description:
        "Divulgação completa de cookies e armazenamento do navegador para o Exile2 Guides — o que são cookies, o que usamos, cookies de terceiros e como gerenciar suas preferências.",
      title: "Política de Cookies",
      sections: [
        {
          title: "O Que São Cookies",
          paragraphs: [
            "Cookies são pequenos arquivos de texto que os sites armazenam no seu computador, telefone ou outro dispositivo conectado à internet quando você os visita. Eles são amplamente usados para fazer os sites funcionarem corretamente, melhorar o desempenho, lembrar preferências do usuário e fornecer informações aos operadores do site.",
            "Os sites também podem usar tecnologias semelhantes, como LocalStorage, SessionStorage ou IndexedDB (coletivamente 'armazenamento do navegador'). Nesta página, referências a 'cookies' abrangem todas essas tecnologias, salvo indicação em contrário.",
          ],
        },
        {
          title: "Como Usamos os Cookies",
          paragraphs: [
            "O Exile2 Guides não define intencionalmente nenhum cookie nem grava no armazenamento do navegador. Não usamos cookies de sessão, cookies persistentes, pixels de rastreamento, scripts de fingerprinting ou qualquer outro mecanismo que armazene dados no seu dispositivo.",
            "Nosso site não emprega serviços de análise, redes de publicidade, widgets de redes sociais, conteúdo de terceiros incorporado ou qualquer outro recurso que exija coleta de dados baseada em cookies.",
            "Seu navegador ainda pode criar entradas padrão de cache HTTP para nossos recursos estáticos (HTML, CSS, JavaScript, imagens). Essas entradas são controladas inteiramente pelo seu navegador, não contêm dados pessoais e são gerenciadas de acordo com os protocolos padrão de cache da web.",
          ],
        },
        {
          title: "Categorias de Cookies",
          table: {
            headers: [
              "Categoria de cookie",
              "Finalidade",
              "Duração",
              "Status neste site",
            ],
            rows: [
              [
                "Estritamente necessários",
                "Funcionalidade do site, segurança, balanceamento de carga",
                "Sessão",
                "Não utilizado",
              ],
              [
                "Preferências",
                "Idioma, tema, configurações de exibição",
                "Até 1 ano",
                "Não utilizado",
              ],
              [
                "Análise",
                "Estatísticas de uso, desempenho de página",
                "Até 2 anos",
                "Não utilizado",
              ],
              [
                "Publicidade",
                "Direcionamento de anúncios, rastreamento de campanha",
                "Até 2 anos",
                "Não utilizado",
              ],
              [
                "Redes sociais",
                "Compartilhamento social, conteúdo incorporado",
                "Varia",
                "Não utilizado",
              ],
            ],
          },
        },
        {
          title: "Cookies de Terceiros",
          paragraphs: [
            "O Exile2 Guides não incorpora nenhum serviço de terceiros que definiria cookies no seu dispositivo. Não usamos Google Analytics, Facebook Pixel, widgets do Twitter, incorporações do YouTube, comentários do Disqus ou qualquer outra integração de terceiros que envolva coleta de dados externa.",
            "Nosso site contém links para sites externos, incluindo wikis da comunidade, notas oficiais de patch, ferramentas de fãs e plataformas de streaming. Esses sites externos têm suas próprias políticas de cookies, independentes das nossas.",
          ],
        },
        {
          title: "Mudanças Futuras no Uso de Cookies",
          paragraphs: [
            "Se uma versão futura deste site introduzir recursos que exijam cookies ou armazenamento do navegador — como persistência de preferência de idioma, alternância de modo escuro, análise de uso ou publicidade — esta página será atualizada antes que esses recursos sejam ativados.",
            "Cada novo cookie ou mecanismo de armazenamento será documentado aqui com seu nome, provedor, finalidade, duração máxima e os controles de privacidade disponíveis para você. Quando exigido por lei, implementaremos mecanismos de consentimento antes de definir cookies não essenciais.",
          ],
        },
        {
          title: "Gerenciando Cookies no Seu Navegador",
          paragraphs: [
            "Você tem o direito de controlar como os sites usam cookies no seu dispositivo. A maioria dos navegadores modernos oferece os seguintes controles:",
          ],
          bullets: [
            "Visualizar e excluir cookies existentes — veja todos os cookies armazenados por cada site e remova-os individualmente ou em massa.",
            "Bloquear todos os cookies — impede que qualquer site armazene cookies. Isso pode fazer com que alguns sites deixem de funcionar corretamente.",
            "Bloquear cookies de terceiros — permite apenas cookies do site que você está visitando diretamente.",
            "Modo privado ou anônimo — exclui automaticamente todos os cookies ao fechar a sessão de navegação.",
          ],
        },
        {
          title: "Instruções Específicas por Navegador",
          bullets: [
            "Google Chrome — Configurações > Privacidade e segurança > Cookies e outros dados de site",
            "Mozilla Firefox — Configurações > Privacidade e Segurança > Cookies e dados de site",
            "Apple Safari — Preferências > Privacidade > Cookies e dados de sites",
            "Microsoft Edge — Configurações > Cookies e permissões de site > Gerenciar e excluir cookies",
            "Opera — Configurações > Avançado > Privacidade e segurança > Configurações de site > Cookies",
          ],
        },
        {
          title: "Fale Conosco",
          paragraphs: [
            `Se você tiver dúvidas sobre nossas práticas de cookies, entre em contato conosco em ${contactEmail}.`,
          ],
        },
      ],
    },
    disclaimer: {
      description:
        "Avisos legais importantes cobrindo o status não oficial, a precisão do conteúdo, assessoria financeira, links externos e a responsabilidade do usuário no Exile2 Guides.",
      title: "Aviso de Isenção de Responsabilidade",
      sections: [
        {
          title: "Recurso Não Oficial Feito por Fãs",
          paragraphs: [
            "O Exile2 Guides é um site independente e não oficial feito por fãs. Não é afiliado, endossado, patrocinado ou de outra forma conectado à Grinding Gear Games Limited ('GGG'), a desenvolvedora e publicadora de Path of Exile 2.",
            "Path of Exile, Path of Exile 2, Grinding Gear Games e todas as logos, personagens, nomes, arte e outros materiais relacionados são marcas comerciais ou marcas registradas da Grinding Gear Games Limited. Todos os direitos são reservados aos seus respectivos proprietários. O uso desses materiais neste site é apenas para fins informativos e da comunidade de fãs e não implica qualquer afiliação ou endosso pela GGG.",
            "Não temos acesso a dados não públicos do jogo, builds internos de desenvolvimento, informações confidenciais de servidor ou qualquer outro material proprietário pertencente à Grinding Gear Games.",
          ],
        },
        {
          title: "Precisão e Atualidade do Conteúdo",
          paragraphs: [
            "Nos esforçamos para garantir que todo o conteúdo dos guias seja preciso, bem fundamentado e esteja atualizado no momento da publicação. No entanto, Path of Exile 2 é um jogo de serviço contínuo que recebe atualizações frequentes, mudanças de equilíbrio, hotfixes e grandes patches que podem alterar mecânicas do jogo, propriedades de itens, comportamentos de habilidades e sistemas de progressão.",
            "Como resultado, informações precisas no momento da escrita podem ficar desatualizadas ou incorretas após uma atualização do jogo. Não podemos garantir que cada artigo será atualizado imediatamente após cada patch.",
            "Os leitores devem sempre cruzar as informações dos guias com as notas oficiais de patch mais recentes, dicas dentro do jogo e testes da comunidade antes de tomar decisões importantes de gameplay. O Exile2 Guides não se responsabiliza por quaisquer consequências no jogo resultantes da dependência de informações que se tornaram desatualizadas.",
          ],
        },
        {
          title: "Não é Assessoria Financeira ou Profissional",
          paragraphs: [
            "Todo o conteúdo é fornecido apenas para fins informativos, educacionais e de entretenimento gerais. Nada neste site constitui assessoria financeira, assessoria de investimento, assessoria de negociação ou qualquer outra forma de assessoria profissional.",
            "Path of Exile 2 é um videogame. O conteúdo dos guias nunca deve ser interpretado como uma recomendação para comprar, vender, negociar ou trocar qualquer item, moeda, conta ou serviço do jogo por dinheiro real. Não facilitamos, incentivamos ou endossamos o comércio por dinheiro real (RMT) de nenhuma forma.",
            "Quaisquer decisões que você tomar com base nas informações encontradas neste site são por sua conta e risco. Não nos responsabilizamos por quaisquer perdas — no jogo ou fora dele — que possam resultar do seguimento de nossos guias, recomendações de build ou sugestões de estratégia.",
          ],
        },
        {
          title: "Links Externos e Conteúdo de Terceiros",
          paragraphs: [
            "O Exile2 Guides pode conter links para sites externos para contexto adicional, material de referência ou ferramentas da comunidade. Esses links são fornecidos por conveniência e não implicam endosso ao conteúdo vinculado.",
            "Não controlamos o conteúdo, a precisão, as práticas de privacidade, as medidas de segurança ou a disponibilidade de qualquer site externo. A inclusão de um link não significa que avalizamos as informações apresentadas nesse site.",
            "Sites externos podem alterar seu conteúdo, estrutura ou disponibilidade a qualquer momento, sem aviso. Se você encontrar um link quebrado ou referência externa desatualizada, informe-nos por meio de nossa página de Contato.",
          ],
        },
        {
          title: "Responsabilidade do Usuário",
          paragraphs: [
            "O uso de qualquer informação, guia, build, estratégia ou outro conteúdo no Exile2 Guides é inteiramente por sua conta e risco. Não fazemos garantias ou representações, expressas ou implícitas, quanto à integridade, precisão, confiabilidade, adequação ou disponibilidade de qualquer conteúdo neste site.",
            "Os jogadores são os únicos responsáveis por suas próprias decisões no jogo, incluindo builds de personagem, alocação na árvore de habilidades passivas, compras de itens, gastos de moeda, atividade de negociação e estratégia de gameplay.",
            "O Exile2 Guides não será responsável por quaisquer danos diretos, indiretos, incidentais, consequenciais ou especiais decorrentes do uso, ou da impossibilidade de uso, de qualquer conteúdo neste site. Isso inclui, mas não se limita a, perda de progresso no jogo, itens, moeda, status de conta ou quaisquer outras perdas virtuais ou do mundo real.",
          ],
        },
        {
          title: "Uso Justo e Propriedade Intelectual",
          paragraphs: [
            "O conteúdo relacionado ao jogo neste site, incluindo referências a mecânicas do jogo, nomes de itens, descrições de habilidades e estratégias de chefes, é usado sob os princípios de uso justo e com o propósito de fornecer guias e comentários de jogos criados pela comunidade.",
            "Respeitamos os direitos de propriedade intelectual da Grinding Gear Games e de todos os outros detentores de direitos. Se você acredita que qualquer conteúdo deste site viola seus direitos de propriedade intelectual, entre em contato conosco imediatamente em " +
              contactEmail +
              " com os detalhes da sua reivindicação.",
            "Todo o conteúdo editorial original, elementos de design e infraestrutura do site criados pela equipe do Exile2 Guides não podem ser reproduzidos, distribuídos ou usados para fins comerciais sem consentimento prévio por escrito.",
          ],
        },
      ],
    },
    "privacy-policy": {
      description:
        "Política de privacidade completa do Exile2 Guides — práticas de dados, uso de cookies, serviços de terceiros, seus direitos sob GDPR e CCPA e como protegemos suas informações.",
      title: "Política de Privacidade",
      sections: [
        {
          title: "Visão Geral",
          paragraphs: [
            "Esta Política de Privacidade descreve como o Exile2 Guides ('nós', 'nosso') trata dados pessoais e a privacidade dos visitantes do nosso site. Estamos comprometidos em proteger sua privacidade e ser transparentes sobre nossas práticas de dados.",
            "Esta política se aplica a todos os usuários, independentemente da localização geográfica. Ao usar este site, você reconhece que leu e compreendeu esta Política de Privacidade. Última atualização: julho de 2026.",
          ],
        },
        {
          title: "Informações que Coletamos",
          paragraphs: [
            "O Exile2 Guides é um site de conteúdo estático somente leitura. Não coletamos, armazenamos, processamos ou transmitimos dados pessoais. Especificamente:",
          ],
          bullets: [
            "Não exigimos registro de usuário, contas ou autenticação de nenhum tipo.",
            "Não coletamos nomes, endereços de e-mail, endereços IP ou qualquer outra informação pessoal identificável.",
            "Não operamos sistemas de registro no servidor que gravem informações de visitantes.",
            "Não usamos pixels de rastreamento, web beacons ou técnicas de fingerprinting do navegador.",
            "Não processamos uploads de usuários, comentários, posts em fóruns ou qualquer outro conteúdo gerado pelo usuário.",
            "Não operamos sistemas de pagamento, serviços de assinatura ou funcionalidade de comércio eletrônico.",
            "Não definimos cookies nem gravamos no armazenamento do navegador (veja nossa Política de Cookies para detalhes).",
          ],
        },
        {
          title: "Nossas Práticas de Dados em Resumo",
          table: {
            headers: ["Prática de dados", "Status atual"],
            rows: [
              ["Contas e autenticação de usuário", "Indisponível"],
              ["Coleta de dados pessoais", "Nenhuma coletada"],
              ["Registro de acesso no servidor", "Não ativado"],
              ["Análise e rastreamento", "Não ativado"],
              ["Publicidade e marketing", "Não ativado"],
              ["Cookies e LocalStorage", "Não usado intencionalmente"],
              [
                "Envios de formulário de contato",
                "Não ativado (somente e-mail)",
              ],
              ["Conteúdo gerado pelo usuário", "Não aceito"],
              ["Compartilhamento de dados com terceiros", "Nenhum"],
              ["Rastreamento entre sites", "Nenhum"],
            ],
          },
        },
        {
          title: "Cookies e Armazenamento do Navegador",
          paragraphs: [
            "O Exile2 Guides não define intencionalmente cookies nem grava em qualquer forma de armazenamento do navegador. Não usamos cookies de análise, cookies de publicidade, cookies de preferência ou qualquer outra categoria de cookie.",
            "Seu navegador pode criar entradas padrão de cache HTTP para nossos recursos estáticos. Essas entradas são controladas pelo seu navegador, não contêm dados pessoais e são gerenciadas de acordo com os protocolos padrão de cache da web. Para informações completas, consulte nossa Política de Cookies.",
          ],
        },
        {
          title: "Serviços de Terceiros",
          paragraphs: [
            "Não integramos nenhum serviço de terceiros que colete dados de usuários. Não usamos Google Analytics, Cloudflare Analytics com coleta de dados, Facebook Pixel, rastreamento do Twitter, Hotjar, Mixpanel ou qualquer outro serviço de coleta de dados.",
            "Nosso site é hospedado na Cloudflare Pages, que serve arquivos estáticos. A infraestrutura da Cloudflare pode processar solicitações no nível de rede para segurança e desempenho, mas não configuramos nenhum recurso de coleta de dados do nosso lado.",
            "Nosso site contém links para sites externos que operam sob suas próprias políticas de privacidade. Incentivamos você a revisar suas políticas antes de fornecer qualquer informação pessoal.",
          ],
        },
        {
          title: "Seus Direitos de Proteção de Dados",
          paragraphs: [
            "Dependendo da sua jurisdição, você pode ter os seguintes direitos de proteção de dados:",
          ],
          bullets: [
            "Direito de acesso (Artigo 15 do GDPR) — solicitar cópias de seus dados pessoais. Como não coletamos dados pessoais, não há dados para fornecer.",
            "Direito de retificação (Artigo 16 do GDPR) — solicitar a correção de dados pessoais imprecisos. Não aplicável, pois não mantemos dados pessoais.",
            "Direito de eliminação (Artigo 17 do GDPR) — solicitar a exclusão de seus dados pessoais. Não aplicável, pois não mantemos dados pessoais.",
            "Direito de limitação de tratamento (Artigo 18 do GDPR) — solicitar limites sobre como usamos seus dados. Não aplicável, pois não mantemos dados pessoais.",
            "Direito à portabilidade de dados (Artigo 20 do GDPR) — solicitar a transferência de seus dados. Não aplicável, pois não mantemos dados pessoais.",
            "CCPA — residentes da Califórnia têm o direito de saber, excluir, optar por não venda e não discriminação. Como não coletamos ou vendemos informações pessoais, esses direitos são satisfeitos intrinsecamente.",
          ],
        },
        {
          title: "Privacidade de Crianças",
          paragraphs: [
            "O Exile2 Guides não coleta intencionalmente dados pessoais de crianças menores de 13 anos (ou a idade aplicável de consentimento digital em sua jurisdição). Como não coletamos dados pessoais de nenhum usuário, isso é inerente ao caso.",
            "Se você for pai ou responsável e acreditar que uma criança forneceu dados pessoais por meio de um mecanismo imprevisto, entre em contato conosco e tomaremos as medidas apropriadas para resolver a situação.",
          ],
        },
        {
          title: "Transferências Internacionais de Dados",
          paragraphs: [
            "Como o Exile2 Guides não coleta, armazena ou processa dados pessoais, não há transferências internacionais de dados a divulgar. Nosso conteúdo estático é servido por uma rede global de entrega de conteúdo, mas nenhum dado pessoal é incluído ou derivado dessas entregas.",
          ],
        },
        {
          title: "Alterações a Esta Política de Privacidade",
          paragraphs: [
            "Podemos atualizar esta Política de Privacidade periodicamente para refletir mudanças em nossas práticas, tecnologia, requisitos legais ou outros fatores. Quaisquer mudanças materiais serão anunciadas por meio de um aviso prominente no site.",
            "A data 'Última atualização' no topo desta página reflete a revisão mais recente. O uso contínuo do site após as alterações constitui aceitação da política atualizada.",
            "Se introduzirmos práticas que envolvam coleta de dados pessoais, esta política será reescrita de forma abrangente antes que essas práticas comecem, e os usuários afetados serão notificados.",
          ],
        },
        {
          title: "Fale Conosco",
          paragraphs: [
            "Se você tiver dúvidas, preocupações ou solicitações relacionadas a esta Política de Privacidade ou às nossas práticas de dados, entre em contato conosco em:",
            `Email: ${contactEmail}`,
            "Responderemos a todas as consultas relacionadas à privacidade dentro de 30 dias, em conformidade com as regulamentações aplicáveis de proteção de dados.",
          ],
        },
      ],
    },
    "terms-of-use": {
      description:
        "Termos e condições completos que regem o uso do Exile2 Guides — aceitação, conduta do usuário, propriedade intelectual, isenções de responsabilidade, limitações de responsabilidade e resolução de disputas.",
      title: "Termos de Uso",
      sections: [
        {
          title: "Aceitação dos Termos",
          paragraphs: [
            "Estes Termos de Uso ('Termos') regem seu acesso e uso do site Exile2 Guides ('Site'), incluindo todo o conteúdo, recursos e funcionalidades disponíveis no site ou por meio dele.",
            "Ao acessar, navegar ou usar o Exile2 Guides, você reconhece que leu, entendeu e concorda em estar vinculado a estes Termos em sua totalidade. Se você não concordar com todos estes Termos, não deve acessar ou usar este site.",
            "Estes Termos constituem um acordo juridicamente vinculativo entre você ('Usuário') e os operadores do Exile2 Guides. Seu uso contínuo do site após quaisquer modificações constitui aceitação dessas alterações.",
          ],
        },
        {
          title: "Descrição do Serviço",
          paragraphs: [
            "O Exile2 Guides é um site de conteúdo estático, gratuito e somente leitura que fornece guias de jogos criados pela comunidade, recomendações de build, estratégias de chefes, bancos de dados de itens, referências de habilidades e outro conteúdo informativo relacionado a Path of Exile 2.",
            "O site não oferece contas de usuário, recursos interativos, envio de conteúdo gerado pelo usuário, comércio eletrônico, processamento de pagamentos ou qualquer serviço além da exibição de conteúdo estático.",
            "Reservamo-nos o direito de modificar, suspender ou descontinuar qualquer parte do site a qualquer momento, com ou sem aviso prévio.",
          ],
        },
        {
          title: "Elegibilidade",
          paragraphs: [
            "O Exile2 Guides destina-se ao público em geral. Não há requisito de idade mínima para acessar nosso conteúdo estático. No entanto, se você for menor de idade em sua jurisdição, deve revisar estes Termos com um pai ou responsável.",
            "Ao usar este site, você declara e garante que tem capacidade jurídica para celebrar estes Termos e que seu uso não viola quaisquer leis ou regulamentos aplicáveis em sua jurisdição.",
          ],
        },
        {
          title: "Uso Permitido",
          paragraphs: [
            "Você pode acessar, navegar e usar o conteúdo apenas para fins pessoais, não comerciais e informativos.",
            "Você pode compartilhar links para nosso conteúdo em redes sociais, fóruns ou outras plataformas, desde que seja dada a devida atribuição e os links direcionem os usuários ao conteúdo original em nosso site.",
            "Você pode imprimir ou salvar páginas individuais para referência offline pessoal, desde que nenhum conteúdo seja modificado, republicado ou redistribuído.",
          ],
        },
        {
          title: "Conduta Proibida",
          paragraphs: [
            "Você concorda em não se envolver em nenhuma das seguintes atividades proibidas:",
          ],
          bullets: [
            "Usar sistemas automatizados (bots, scrapers, crawlers) para acessar, coletar ou monitorar conteúdo sem permissão prévia por escrito.",
            "Tentar obter acesso não autorizado a qualquer parte do site, seus servidores ou quaisquer sistemas conectados.",
            "Lançar ataques de negação de serviço, testes de estresse ou tentar de outra forma interromper a operação do site.",
            "Transmitir vírus, malware ou qualquer outro código malicioso através do site ou para o site.",
            "Personificar qualquer pessoa ou entidade, ou representar falsamente sua afiliação com qualquer pessoa ou entidade.",
            "Usar o site para qualquer finalidade ilegal ou em violação de qualquer lei local, nacional ou internacional.",
            "Contornar ou tentar contornar quaisquer medidas de segurança ou controles de acesso no site.",
          ],
        },
        {
          title: "Direitos de Propriedade Intelectual",
          paragraphs: [
            "Todo o conteúdo original no Exile2 Guides — incluindo texto editorial, estrutura de guias, compilações de dados, elementos de design e código do site — é protegido pelas leis aplicáveis de direitos autorais, marcas registradas e propriedade intelectual.",
            "Você não pode reproduzir, distribuir, modificar, criar obras derivadas, exibir publicamente ou explorar comercialmente qualquer conteúdo original sem consentimento prévio por escrito.",
            "Path of Exile, Path of Exile 2 e todos os ativos de jogo relacionados são marcas comerciais da Grinding Gear Games Limited. Esses materiais são usados sob os princípios de uso justo para fins de guias e comentários da comunidade. Não reivindicamos a propriedade de qualquer propriedade intelectual da Grinding Gear Games.",
            `Se você acredita que qualquer conteúdo viola seus direitos de propriedade intelectual, entre em contato conosco em ${contactEmail} com uma descrição detalhada da suposta violação.`,
          ],
        },
        {
          title: "Isenção de Garantias",
          paragraphs: [
            "O EXILE2 GUIDES É FORNECIDO NA BASE 'NO ESTADO EM QUE SE ENCONTRA' E 'CONFORME DISPONÍVEL', SEM GARANTIAS DE QUALQUER TIPO, SEJAM EXPRESSAS OU IMPLÍCITAS, INCLUINDO, MAS NÃO SE LIMITANDO A, GARANTIAS IMPLÍCITAS DE COMERCIABILIDADE, ADEQUAÇÃO A UMA FINALIDADE ESPECÍFICA E NÃO VIOLAÇÃO.",
            "Não garantimos que o site será ininterrupto, livre de erros ou completamente seguro. Não garantimos que o conteúdo seja preciso, completo, confiável, atual ou livre de erros.",
            "Você reconhece que as mecânicas do jogo mudam com frequência com as atualizações. O conteúdo pode ficar desatualizado a qualquer momento, sem aviso. Não garantimos que qualquer guia, recomendação de build ou estratégia produzirá resultados específicos.",
            "Qualquer material baixado ou obtido através do site é acessado por sua conta e risco. Você é o único responsável por quaisquer danos ao seu sistema computacional ou perda de dados resultantes do acesso a qualquer material.",
          ],
        },
        {
          title: "Limitação de Responsabilidade",
          paragraphs: [
            "NA MÁXIMA EXTENSÃO PERMITIDA PELA LEI APLICÁVEL, EM NENHUMA CIRCUNSTÂNCIA O EXILE2 GUIDES, SEUS OPERADORES, COLABORADORES OU AFILIADOS SERÃO RESPONSÁVEIS POR QUAISQUER DANOS DIRETOS, INDIRETOS, INCIDENTAIS, ESPECIAIS, CONSEQUENCIAIS OU PUNITIVOS DECORRENTES DO OU RELACIONADOS AO SEU USO DO, OU INCAPACIDADE DE USAR, O SITE.",
            "Esta limitação aplica-se a todas as formas de danos, incluindo, mas não se limitando a: perda de progresso no jogo, itens, moeda ou status de conta; perda de dados; perda de receita ou lucros antecipados; e quaisquer danos indiretos, especiais, incidentais, consequenciais ou punitivos, seja com base em quebra de contrato, ato ilícito, responsabilidade estrita ou qualquer outra teoria jurídica.",
            "Essas limitações aplicam-se independentemente de o Exile2 Guides ter sido avisado sobre a possibilidade de tais danos. Se você estiver insatisfeito com qualquer conteúdo ou com estes Termos, seu único recurso é descontinuar o uso do site.",
          ],
        },
        {
          title: "Indenização",
          paragraphs: [
            "Você concorda em indenizar, defender e isentar o Exile2 Guides, seus operadores, colaboradores e afiliados de e contra quaisquer e todas as reivindicações, responsabilidades, danos, perdas, custos e despesas (incluindo taxas legais razoáveis) decorrentes de ou de qualquer forma relacionados com: (a) seu acesso ou uso do site; (b) sua violação destes Termos; (c) sua violação de qualquer direito de terceiro, incluindo qualquer direito de propriedade intelectual, privacidade ou direito proprietário; ou (d) qualquer reivindicação de que seu conteúdo ou ações causaram dano a um terceiro.",
          ],
        },
        {
          title: "Modificações nos Termos",
          paragraphs: [
            "Reservamo-nos o direito de modificar estes Termos a qualquer momento, a nosso exclusivo critério. Quando fizermos alterações, atualizaremos a data 'Última atualização' no topo desta página. Mudanças materiais podem ser comunicadas por meio de um aviso proeminente no site.",
            "Se você discordar de qualquer modificação, deve descontinuar o uso do site. Seu uso contínuo após quaisquer alterações constitui aceitação dos Termos revisados.",
          ],
        },
        {
          title: "Lei Aplicável e Resolução de Disputas",
          paragraphs: [
            "Estes Termos serão regidos e interpretados de acordo com as leis da jurisdição em que os operadores do site estão sediados, sem considerar suas disposições sobre conflito de leis.",
            "Qualquer disputa decorrente de ou relacionada a estes Termos será primeiramente objeto de tentativa de resolução por meio de negociação de boa-fé. Se a negociação falhar, as disputas serão submetidas aos tribunais competentes da jurisdição aplicável.",
            "Você concorda que quaisquer procedimentos de resolução de disputas serão conduzidos apenas de forma individual, e não em uma ação coletiva, consolidada ou representativa.",
          ],
        },
        {
          title: "Disposições Gerais",
          paragraphs: [
            "Se qualquer disposição destes Termos for considerada inexequível ou inválida, essa disposição será limitada ou eliminada na medida mínima necessária para que estes Termos permaneçam plenamente em vigor e efeito.",
            "Nossa falha em fazer cumprir qualquer direito ou disposição destes Termos não será considerada uma renúncia a esses direitos. A renúncia de qualquer direito ou disposição só será eficaz se feita por escrito e assinada por um representante devidamente autorizado.",
            "Estes Termos, juntamente com nossa Política de Privacidade, Política de Cookies e Aviso de Isenção de Responsabilidade, constituem o acordo integral entre você e o Exile2 Guides quanto ao seu uso do site.",
          ],
        },
        {
          title: "Informações de Contato",
          paragraphs: [
            `Para dúvidas sobre estes Termos de Uso, entre em contato conosco em ${contactEmail}.`,
          ],
        },
      ],
    },
  },
  ru: {
    about: {
      description:
        "Узнайте, как Exile2 Guides независимо управляется, исследуется и публикуется как неофициальный справочный ресурс по Path of Exile 2.",
      title: "О проекте Exile2 Guides",
      sections: [
        {
          title: "Наша миссия",
          paragraphs: [
            "Exile2 Guides независимо управляется одним разработчиком как неофициальный справочный ресурс по Path of Exile 2. Цель — систематизировать полезные, учитывающие изменения версий ответы, не выдавая сводки исследований за личный игровой опыт.",
            "Сайт доступен только для чтения и бесплатен. Статьи публикуются после структурированного исследования и автоматических проверок качества, при этом сомнения и границы проверки отображаются на странице, когда это важно.",
          ],
        },
        {
          title: "Что мы освещаем",
          connectionLinks: [
            {
              description:
                "Билды для прокачки, настройки эндгейма, приоритеты снаряжения, ветки дерева пассивных умений и связки камней для всех классов.",
              href: "/en/builds/",
              label: "Билды",
            },
            {
              description:
                "Механики боссов, разбивка по фазам, таблицы добычи, требования к сопротивлениям и пошаговые стратегические руководства.",
              href: "/en/bosses/",
              label: "Боссы",
            },
            {
              description:
                "Базы данных уникальных предметов, механики валют, справочники по крафту и пояснения уровней аффиксов.",
              href: "/en/items/",
              label: "Предметы",
            },
            {
              description:
                "Разбор активных камней умений, сочетания вспомогательных камней, механики масштабирования и данные прокачки уровней.",
              href: "/en/skills/",
              label: "Умения",
            },
            {
              description:
                "Глубокий разбор механик, обучение для новичков, ответы на частые вопросы и общие руководства по прогрессу.",
              href: "/en/guides/",
              label: "Гайды",
            },
          ],
        },
        {
          title: "Редакционные стандарты",
          paragraphs: [
            "Статьи исследуются с использованием официальных примечаний к обновлениям, актуальных баз данных, проверенных гайдов сообщества, игровых видео и обсуждений игроков. Утверждения по возможности снабжаются ссылками на источники и пишутся с учётом соответствующей версии.",
            "Автоматическое QA проверяет структуру контента, обязательные метаданные, внутренние ссылки, статус публикации, индексируемость и результат сборки перед выпуском статьи.",
            "Когда вывод не был лично проверен в игре, он представляется как проверенный по источникам, а не проверенный на практике. Зависящая от версии неопределённость остаётся видимой, а не скрывается за уверенными формулировками.",
          ],
        },
        {
          title: "Независимость",
          paragraphs: [
            "Exile2 Guides — независимый ресурс, созданный фанатами. Он не связан, не одобрен и не спонсируется Grinding Gear Games или любой другой компанией.",
            "Публикацию ведёт один оператор, и в процессе исследования не заявляется о завершении практического игрового тестирования, которое фактически не проводилось.",
          ],
        },
        {
          title: "Исправления и обратная связь",
          paragraphs: [
            "Игровые механики меняются часто, и ни один гайд не идеален. Если вы обнаружите фактическую ошибку, устаревшую механику или отсутствующий источник, пожалуйста, свяжитесь с нами через страницу «Контакты» или напишите нам напрямую по электронной почте.",
            "Исправления и жалобы на нарушение авторских прав рассматриваются по мере возможности. Ошибкам фактического характера высокой важности отдаётся приоритет, но сроки ответа не гарантируются.",
          ],
        },
      ],
    },
    contact: {
      description:
        "Свяжитесь с независимым оператором Exile2 Guides по поводу исправлений содержимого, жалоб на нарушение авторских прав или общей обратной связи.",
      title: "Связаться с нами",
      sections: [
        {
          title: "Свяжитесь с нами",
          paragraphs: [
            `Единственный публичный канал связи — электронная почта: ${contactEmail}. Мы рассматриваем исправления и жалобы на нарушение авторских прав по мере возможности. Ошибкам фактического характера высокой важности отдаётся приоритет, но сроки ответа не гарантируются.`,
            "Это статический сайт только для чтения без серверной контактной формы. Используйте прямую ссылку на электронную почту ниже; здесь нет кнопки отправки сообщения, которая могла бы незаметно удалить ваш запрос.",
          ],
          connectionLinks: [
            {
              description:
                "Откройте почтовый клиент, чтобы отправить исправление, жалобу на нарушение авторских прав или другое сообщение.",
              href: `mailto:${contactEmail}`,
              label: contactEmail,
            },
          ],
        },
        {
          title: "Сценарии обращения",
          issueCards: [
            {
              description:
                "Укажите URL страницы, конкретное неверное утверждение, версию игры или патч, в котором вы тестировали, а также надёжный источник или чёткие шаги воспроизведения.",
              title: "Исправление содержимого",
            },
            {
              description:
                "Предоставьте URL ресурса или страницы, описание защищённого материала, подтверждение прав собственности или разрешения, а также конкретное запрашиваемое действие.",
              title: "Авторские права или атрибуция",
            },
            {
              description:
                "Сообщите, какая область требует внимания — билды, боссы, предметы, умения или общий опыт сайта — вместе с вашим подробным предложением.",
              title: "Общая обратная связь",
            },
          ],
        },
        {
          title: "Что указать",
          bullets: [
            "Точный URL страницы, где обнаружена проблема, а также, по возможности, скриншот или цитата.",
            "Надёжный источник для исправления — официальные примечания к патчу, актуальная запись в базе данных или чёткий тест/отчёт сообщества.",
            "Чёткие сведения для воспроизведения любого расхождения в механике, включая версию игры и соответствующую конфигурацию, если известны.",
            "Только минимально необходимую личную информацию, нужную для ответа на ваш запрос.",
          ],
        },
        {
          title: "Политика рассмотрения",
          paragraphs: [
            "Мы рассматриваем исправления и жалобы на нарушение авторских прав по мере возможности. Ошибкам фактического характера высокой важности отдаётся приоритет, но сроки ответа не гарантируются.",
          ],
        },
      ],
    },
    "cookie-policy": {
      description:
        "Полное раскрытие сведений о файлах cookie и хранилище браузера для Exile2 Guides — что такое cookie, что мы используем, сторонние cookie и как управлять своими предпочтениями.",
      title: "Политика использования файлов cookie",
      sections: [
        {
          title: "Что такое файлы cookie",
          paragraphs: [
            "Файлы cookie — это небольшие текстовые файлы, которые веб-сайты сохраняют на вашем компьютере, телефоне или другом подключённом к интернету устройстве при их посещении. Они широко используются, чтобы сайты работали корректно, повышали производительность, запоминали пользовательские предпочтения и предоставляли информацию операторам сайтов.",
            "Веб-сайты также могут использовать аналогичные технологии, такие как LocalStorage, SessionStorage или IndexedDB (в совокупности — «хранилище браузера»). На этой странице упоминания «cookie» охватывают все такие технологии, если не указано иное.",
          ],
        },
        {
          title: "Как мы используем файлы cookie",
          paragraphs: [
            "Exile2 Guides намеренно не устанавливает никаких файлов cookie и не записывает в хранилище браузера. Мы не используем сеансовые cookie, постоянные cookie, пиксели отслеживания, скрипты фингерпринтинга или любые другие механизмы, сохраняющие данные на вашем устройстве.",
            "Наш сайт не использует сервисы аналитики, рекламные сети, виджеты социальных сетей, встроенный контент третьих лиц или любые другие функции, требующие сбора данных на основе cookie.",
            "Ваш браузер по-прежнему может создавать стандартные записи кэша HTTP для наших статических ресурсов (HTML, CSS, JavaScript, изображения). Они полностью контролируются вашим браузером, не содержат личных данных и управляются в соответствии со стандартными протоколами кэширования веб.",
          ],
        },
        {
          title: "Категории файлов cookie",
          table: {
            headers: [
              "Категория cookie",
              "Назначение",
              "Срок действия",
              "Статус на сайте",
            ],
            rows: [
              [
                "Строго необходимые",
                "Функциональность сайта, безопасность, балансировка нагрузки",
                "Сессия",
                "Не используются",
              ],
              [
                "Предпочтения",
                "Язык, тема, настройки отображения",
                "До 1 года",
                "Не используются",
              ],
              [
                "Аналитика",
                "Статистика использования, производительность страниц",
                "До 2 лет",
                "Не используются",
              ],
              [
                "Реклама",
                "Таргетинг рекламы, отслеживание кампаний",
                "До 2 лет",
                "Не используются",
              ],
              [
                "Социальные сети",
                "Социальный шаринг, встроенный контент",
                "Различается",
                "Не используются",
              ],
            ],
          },
        },
        {
          title: "Сторонние файлы cookie",
          paragraphs: [
            "Exile2 Guides не встраивает никаких сторонних сервисов, которые устанавливали бы cookie на вашем устройстве. Мы не используем Google Analytics, Facebook Pixel, виджеты Twitter, встраивания YouTube, комментарии Disqus или любую другую интеграцию третьих лиц, связанную со сбором внешних данных.",
            "Наш сайт содержит ссылки на внешние сайты, включая вики сообщества, официальные примечания к патчам, фанатские инструменты и стриминговые платформы. Эти внешние сайты имеют собственные политики использования cookie, независимые от нашей.",
          ],
        },
        {
          title: "Будущие изменения в использовании cookie",
          paragraphs: [
            "Если будущая версия этого сайта добавит функции, требующие файлов cookie или хранилища браузера — например, сохранение языковых предпочтений, переключение тёмного режима, аналитику использования или рекламу, — эта страница будет обновлена до активации таких функций.",
            "Каждый новый файл cookie или механизм хранения будет задокументирован здесь с указанием имени, поставщика, назначения, максимального срока действия и доступных вам элементов управления конфиденциальностью. Там, где это требуется по закону, мы внедрим механизмы согласия перед установкой несущественных cookie.",
          ],
        },
        {
          title: "Управление файлами cookie в браузере",
          paragraphs: [
            "Вы имеете право контролировать, как веб-сайты используют файлы cookie на вашем устройстве. Большинство современных браузеров предоставляют следующие элементы управления:",
          ],
          bullets: [
            "Просматривать и удалять существующие cookie — см. все cookie, сохранённые каждым сайтом, и удалять их по отдельности или массово.",
            "Блокировать все cookie — запрещает любому сайту сохранять cookie. Это может привести к некорректной работе некоторых сайтов.",
            "Блокировать сторонние cookie — разрешает cookie только от сайта, который вы посещаете напрямую.",
            "Приватный или incognito-режим — автоматически удаляет все cookie при закрытии сеанса просмотра.",
          ],
        },
        {
          title: "Инструкции для конкретных браузеров",
          bullets: [
            "Google Chrome — Настройки > Конфиденциальность и безопасность > Файлы cookie и другие данные сайтов",
            "Mozilla Firefox — Настройки > Приватность и защита > Файлы cookie и данные сайтов",
            "Apple Safari — Настройки > Конфиденциальность > Файлы cookie и данные веб-сайтов",
            "Microsoft Edge — Настройки > Файлы cookie и разрешения сайтов > Управление и удаление файлов cookie",
            "Opera — Настройки > Дополнительно > Конфиденциальность и безопасность > Настройки сайтов > Файлы cookie",
          ],
        },
        {
          title: "Свяжитесь с нами",
          paragraphs: [
            `Если у вас есть вопросы о нашей практике использования cookie, пожалуйста, свяжитесь с нами по адресу ${contactEmail}.`,
          ],
        },
      ],
    },
    disclaimer: {
      description:
        "Важные юридические отказы от ответственности, охватывающие неофициальный статус, точность содержимого, финансовые советы, внешние ссылки и ответственность пользователя Exile2 Guides.",
      title: "Отказ от ответственности",
      sections: [
        {
          title: "Неофициальный ресурс, созданный фанатами",
          paragraphs: [
            "Exile2 Guides — независимый неофициальный сайт, созданный фанатами. Он не связан, не одобрен, не спонсируется и никак иначе не связан с Grinding Gear Games Limited («GGG») — разработчиком и издателем Path of Exile 2.",
            "Path of Exile, Path of Exile 2, Grinding Gear Games и все связанные логотипы, персонажи, названия, художественные материалы и прочие материалы являются товарными знаками или зарегистрированными товарными знаками Grinding Gear Games Limited. Все права принадлежат их соответствующим владельцам. Использование этих материалов на сайте осуществляется исключительно в информационных целях и для сообщества фанатов и не подразумевает какой-либо связи или одобрения со стороны GGG.",
            "У нас нет доступа к непубличным игровым данным, внутренним сборкам разработки, конфиденциальной серверной информации или любым другим собственным материалам, принадлежащим Grinding Gear Games.",
          ],
        },
        {
          title: "Точность и актуальность содержимого",
          paragraphs: [
            "Мы стремимся обеспечить, чтобы всё содержимое гайдов было точным, подкреплённым источниками и актуальным на момент публикации. Однако Path of Exile 2 — это игра с постоянным обслуживанием, которая часто получает обновления, изменения баланса, хотфиксы и крупные патчи, способные изменить игровые механики, свойства предметов, поведение умений и системы прогресса.",
            "В результате информация, точная на момент написания, может устареть или стать неверной после обновления игры. Мы не можем гарантировать, что каждая статья будет обновлена сразу после каждого патча.",
            "Перед принятием важных игровых решений читатели всегда должны сверять информацию гайдов с последними официальными примечаниями к патчам, подсказками в игре и тестами сообщества. Exile2 Guides не несёт ответственности за любые внутриигровые последствия, возникающие из-за опоры на устаревшую информацию.",
          ],
        },
        {
          title: "Не является финансовой или профессиональной консультацией",
          paragraphs: [
            "Всё содержимое предоставляется исключительно для общих информационных, образовательных и развлекательных целей. Ничто на этом сайте не является финансовой консультацией, инвестиционной консультацией, торговой рекомендацией или любой иной формой профессиональной консультации.",
            "Path of Exile 2 — это видеоигра. Содержимое гайдов никогда не следует интерпретировать как рекомендацию покупать, продавать, обменивать или торговать любым внутриигровым предметом, валютой, аккаунтом или услугой за реальные деньги. Мы не способствуем, не поощряем и не одобряем торговлю за реальные деньги (RMT) ни в какой форме.",
            "Любые решения, которые вы принимаете на основе информации, найденной на этом сайте, вы принимаете на свой страх и риск. Мы не несём ответственности за любые убытки — в игре или вне её, — которые могут возникнуть в результате следования нашим гайдам, рекомендациям по билдам или стратегическим советам.",
          ],
        },
        {
          title: "Внешние ссылки и контент третьих лиц",
          paragraphs: [
            "Exile2 Guides может содержать ссылки на внешние сайты для дополнительного контекста, справочных материалов или инструментов сообщества. Эти ссылки предоставляются для удобства и не подразумевают одобрения связанного содержимого.",
            "Мы не контролируем содержимое, точность, методы обеспечения конфиденциальности, меры безопасности или доступность любого внешнего сайта. Включение ссылки не означает, что мы ручаемся за информацию, представленную на этом сайте.",
            "Внешние сайты могут в любое время без предупреждения изменить своё содержимое, структуру или доступность. Если вы обнаружите неработающую ссылку или устаревшую внешнюю ссылку, пожалуйста, сообщите об этом через нашу страницу «Контакты».",
          ],
        },
        {
          title: "Ответственность пользователя",
          paragraphs: [
            "Использование любой информации, гайдов, билдов, стратегий или иного содержимого на Exile2 Guides осуществляется полностью на ваш страх и риск. Мы не даём никаких гарантий или заверений, прямых или подразумеваемых, относительно полноты, точности, надёжности, пригодности или доступности любого содержимого на этом сайте.",
            "Игроки несут единоличную ответственность за свои собственные внутриигровые решения, включая билды персонажей, распределение пассивного дерева умений, покупку предметов, расходование валюты, торговую активность и игровую стратегию.",
            "Exile2 Guides не несёт ответственности за любые прямые, косвенные, случайные, последующие или особые убытки, возникающие из использования или невозможности использования любого содержимого на этом сайте. Это включает, но не ограничивается потерей внутриигрового прогресса, предметов, валюты, статуса аккаунта или любых других виртуальных или реальных убытков.",
          ],
        },
        {
          title:
            "Добросовестное использование и интеллектуальная собственность",
          paragraphs: [
            "Связанное с игрой содержимое на этом сайте, включая ссылки на игровые механики, названия предметов, описания умений и стратегии боссов, используется на принципах добросовестного использования и в целях предоставления созданных сообществом игровых гайдов и комментариев.",
            "Мы уважаем права интеллектуальной собственности Grinding Gear Games и всех прочих правообладателей. Если вы считаете, что любое содержимое этого сайта нарушает ваши права интеллектуальной собственности, пожалуйста, немедленно свяжитесь с нами по адресу " +
              contactEmail +
              " с подробностями вашей претензии.",
            "Весь оригинальный редакционный контент, элементы дизайна и инфраструктура сайта, созданные командой Exile2 Guides, не могут быть воспроизведены, распространены или использованы в коммерческих целях без предварительного письменного согласия.",
          ],
        },
      ],
    },
    "privacy-policy": {
      description:
        "Полная политика конфиденциальности Exile2 Guides — практика работы с данными, использование cookie, сторонние сервисы, ваши права в соответствии с GDPR и CCPA и то, как мы защищаем вашу информацию.",
      title: "Политика конфиденциальности",
      sections: [
        {
          title: "Обзор",
          paragraphs: [
            "Настоящая Политика конфиденциальности описывает, как Exile2 Guides («мы», «наш») обрабатывает персональные данные и конфиденциальность посетителей нашего сайта. Мы стремимся защищать вашу конфиденциальность и быть прозрачными в отношении нашей практики работы с данными.",
            "Эта политика применяется ко всем пользователям независимо от географического местоположения. Используя этот сайт, вы подтверждаете, что прочитали и поняли настоящую Политику конфиденциальности. Последнее обновление: июль 2026 г.",
          ],
        },
        {
          title: "Какие данные мы собираем",
          paragraphs: [
            "Exile2 Guides — это статический контент-сайт только для чтения. Мы не собираем, не храним, не обрабатываем и не передаём персональные данные. А именно:",
          ],
          bullets: [
            "Мы не требуем регистрации пользователей, учётных записей или аутентификации какого-либо вида.",
            "Мы не собираем имена, адреса электронной почты, IP-адреса или любую другую персональную информацию.",
            "Мы не ведём серверное журналирование, записывающее информацию о посетителях.",
            "Мы не используем пиксели отслеживания, веб-маяки или методы создания отпечатков браузера.",
            "Мы не обрабатываем загрузки пользователей, комментарии, сообщения на форумах или любой другой контент, созданный пользователями.",
            "Мы не используем платёжные системы, сервисы подписок или функциональность электронной коммерции.",
            "Мы не устанавливаем файлы cookie и не записываем в хранилище браузера (подробности см. в нашей Политике использования файлов cookie).",
          ],
        },
        {
          title: "Наша практика работы с данными вкратце",
          table: {
            headers: ["Практика работы с данными", "Текущий статус"],
            rows: [
              ["Учётные записи и аутентификация", "Недоступно"],
              ["Сбор персональных данных", "Не собирается"],
              ["Серверное журналирование доступа", "Не включено"],
              ["Аналитика и отслеживание", "Не включено"],
              ["Реклама и маркетинг", "Не включено"],
              ["Файлы cookie и LocalStorage", "Не используются намеренно"],
              ["Отправка контактных форм", "Не включено (только почта)"],
              ["Контент, созданный пользователями", "Не принимается"],
              ["Передача данных третьим лицам", "Отсутствует"],
              ["Межсайтовое отслеживание", "Отсутствует"],
            ],
          },
        },
        {
          title: "Файлы cookie и хранилище браузера",
          paragraphs: [
            "Exile2 Guides намеренно не устанавливает файлы cookie и не записывает в какую-либо форму хранилища браузера. Мы не используем аналитические cookie, рекламные cookie, cookie предпочтений или любую другую категорию cookie.",
            "Ваш браузер может создавать стандартные записи кэша HTTP для наших статических ресурсов. Они контролируются вашим браузером, не содержат личных данных и управляются в соответствии со стандартными протоколами кэширования веб. Подробности см. в нашей Политике использования файлов cookie.",
          ],
        },
        {
          title: "Сторонние сервисы",
          paragraphs: [
            "Мы не интегрируем никаких сторонних сервисов, собирающих данные пользователей. Мы не используем Google Analytics, Cloudflare Analytics со сбором данных, Facebook Pixel, отслеживание Twitter, Hotjar, Mixpanel или любой другой сервис сбора данных.",
            "Наш сайт размещён на Cloudflare Pages, который обслуживает статические файлы. Инфраструктура Cloudflare может обрабатывать запросы на сетевом уровне для обеспечения безопасности и производительности, но мы не настраиваем никаких функций сбора данных на своей стороне.",
            "Наш сайт содержит ссылки на внешние сайты, работающие в соответствии со своими собственными политиками конфиденциальности. Мы рекомендуем вам ознакомиться с их политиками, прежде чем предоставлять какую-либо личную информацию.",
          ],
        },
        {
          title: "Ваши права на защиту данных",
          paragraphs: [
            "В зависимости от вашей юрисдикции вы можете иметь следующие права на защиту данных:",
          ],
          bullets: [
            "Право на доступ (статья 15 GDPR) — запросить копии ваших персональных данных. Поскольку мы не собираем персональные данные, предоставлять нечего.",
            "Право на исправление (статья 16 GDPR) — запросить исправление неточных персональных данных. Не применимо, поскольку мы не храним персональные данные.",
            "Право на удаление (статья 17 GDPR) — запросить удаление ваших персональных данных. Не применимо, поскольку мы не храним персональные данные.",
            "Право на ограничение обработки (статья 18 GDPR) — запросить ограничения на использование ваших данных. Не применимо, поскольку мы не храним персональные данные.",
            "Право на переносимость данных (статья 20 GDPR) — запросить передачу ваших данных. Не применимо, поскольку мы не храним персональные данные.",
            "CCPA — жители Калифорнии имеют право знать, удалять, отказываться от продажи и на недискриминацию. Поскольку мы не собираем и не продаём персональную информацию, эти права выполняются по своей сути.",
          ],
        },
        {
          title: "Конфиденциальность детей",
          paragraphs: [
            "Exile2 Guides не собирает преднамеренно персональные данные детей младше 13 лет (или применимого возраста цифрового согласия в вашей юрисдикции). Поскольку мы не собираем персональные данные ни у каких пользователей, это выполняется по своей сути.",
            "Если вы являетесь родителем или опекуном и считаете, что ребёнок предоставил персональные данные через непредвиденный механизм, пожалуйста, свяжитесь с нами, и мы примем соответствующие меры для урегулирования ситуации.",
          ],
        },
        {
          title: "Международная передача данных",
          paragraphs: [
            "Поскольку Exile2 Guides не собирает, не хранит и не обрабатывает персональные данные, раскрывать международную передачу данных не требуется. Наш статический контент распространяется через глобальную сеть доставки контента, но в этих доставках не содержится и из них не извлекается никаких персональных данных.",
          ],
        },
        {
          title: "Изменения в этой Политике конфиденциальности",
          paragraphs: [
            "Мы можем время от времени обновлять эту Политику конфиденциальности, чтобы отразить изменения в нашей практике, технологиях, законодательных требованиях или других факторах. Любые существенные изменения будут объявлены через заметное уведомление на сайте.",
            "Дата «Последнее обновление» в верхней части этой страницы отражает самую последнюю редакцию. Продолжение использования сайта после изменений означает принятие обновлённой политики.",
            "Если мы внедрим практику, предполагающую сбор персональных данных, эта политика будет полностью переписана до начала такой практики, а затронутые пользователи будут уведомлены.",
          ],
        },
        {
          title: "Свяжитесь с нами",
          paragraphs: [
            "Если у вас есть вопросы, опасения или запросы, касающиеся этой Политики конфиденциальности или нашей практики работы с данными, пожалуйста, свяжитесь с нами:",
            `Эл. почта: ${contactEmail}`,
            "Мы ответим на все запросы, связанные с конфиденциальностью, в течение 30 дней в соответствии с применимым законодательством о защите данных.",
          ],
        },
      ],
    },
    "terms-of-use": {
      description:
        "Полные условия использования, регулирующие ваше использование Exile2 Guides — принятие, поведение пользователя, интеллектуальная собственность, отказы от ответственности, ограничения ответственности и разрешение споров.",
      title: "Условия использования",
      sections: [
        {
          title: "Принятие условий",
          paragraphs: [
            "Настоящие Условия использования («Условия») регулируют ваш доступ к веб-сайту Exile2 Guides («Сайт») и его использование, включая всё содержимое, функции и возможности, доступные на сайте или через него.",
            "Получая доступ к Exile2 Guides, просматривая его или используя, вы подтверждаете, что прочитали, поняли и согласны быть связанными этими Условиями в полном объёме. Если вы не согласны со всеми этими Условиями, вы не должны получать доступ к этому сайту или использовать его.",
            "Настоящие Условия представляют собой юридически обязывающее соглашение между вами («Пользователь») и операторами Exile2 Guides. Ваше дальнейшее использование сайта после любых изменений означает принятие таких изменений.",
          ],
        },
        {
          title: "Описание сервиса",
          paragraphs: [
            "Exile2 Guides — это бесплатный статический контент-сайт только для чтения, предоставляющий созданные сообществом игровые гайды, рекомендации по билдам, стратегии боссов, базы данных предметов, справочники умений и иную информационную информацию, связанную с Path of Exile 2.",
            "Сайт не предлагает учётных записей пользователей, интерактивных функций, отправки контента, созданного пользователями, электронной коммерции, обработки платежей или любых услуг, кроме отображения статического контента.",
            "Мы оставляем за собой право изменять, приостанавливать или прекращать работу любой части сайта в любое время с уведомлением или без него.",
          ],
        },
        {
          title: "Право на участие",
          paragraphs: [
            "Exile2 Guides предназначен для широкой аудитории. Минимальный возраст для доступа к нашему статическому контенту не установлен. Однако если вы не достигли совершеннолетия в вашей юрисдикции, вы должны изучить эти Условия вместе с родителем или опекуном.",
            "Используя этот сайт, вы заявляете и гарантируете, что обладаете правоспособностью для заключения этих Условий и что ваше использование не нарушает применимых законов или нормативных актов в вашей юрисдикции.",
          ],
        },
        {
          title: "Разрешённое использование",
          paragraphs: [
            "Вы можете получать доступ, просматривать и использовать содержимое только для личных, некоммерческих, информационных целей.",
            "Вы можете делиться ссылками на наше содержимое в социальных сетях, на форумах или других платформах при условии надлежащего указания авторства и направления ссылок на оригинальный контент на нашем сайте.",
            "Вы можете распечатывать или сохранять отдельные страницы для личного использования офлайн при условии, что содержимое не изменяется, не переиздаётся и не распространяется повторно.",
          ],
        },
        {
          title: "Запрещённое поведение",
          paragraphs: [
            "Вы соглашаетесь не участвовать в любой из следующих запрещённых видов деятельности:",
          ],
          bullets: [
            "Использование автоматизированных систем (ботов, скрейперов, краулеров) для доступа, сбора или мониторинга содержимого без предварительного письменного разрешения.",
            "Попытки получить несанкционированный доступ к любой части сайта, его серверам или любым подключённым системам.",
            "Запуск атак типа «отказ в обслуживании», нагрузочное тестирование или иные попытки нарушить работу сайта.",
            "Передача вирусов, вредоносного ПО или любого другого вредоносного кода через сайт или на сайт.",
            "Выдача себя за какое-либо лицо или организацию либо ложное заявление о своей принадлежности к какому-либо лицу или организации.",
            "Использование сайта для любых незаконных целей или в нарушение любого местного, национального или международного закона.",
            "Обход или попытка обойти любые меры безопасности или элементы контроля доступа на сайте.",
          ],
        },
        {
          title: "Права интеллектуальной собственности",
          paragraphs: [
            "Весь оригинальный контент на Exile2 Guides — включая редакционный текст, структуру гайдов, подборки данных, элементы дизайна и код сайта, — защищён применимым законодательством об авторском праве, товарных знаках и интеллектуальной собственности.",
            "Вы не можете воспроизводить, распространять, изменять, создавать производные произведения, публично отображать или использовать в коммерческих целях любой оригинальный контент без предварительного письменного согласия.",
            "Path of Exile, Path of Exile 2 и все связанные игровые активы являются товарными знаками Grinding Gear Games Limited. Эти материалы используются на принципах добросовестного использования в целях создания гайдов и комментариев сообщества. Мы не заявляем прав собственности на какую-либо интеллектуальную собственность Grinding Gear Games.",
            `Если вы считаете, что любой контент нарушает ваши права интеллектуальной собственности, пожалуйста, свяжитесь с нами по адресу ${contactEmail} с подробным описанием предполагаемого нарушения.`,
          ],
        },
        {
          title: "Отказ от гарантий",
          paragraphs: [
            "EXILE2 GUIDES ПРЕДОСТАВЛЯЕТСЯ НА УСЛОВИЯХ «КАК ЕСТЬ» И «КАК ДОСТУПНО» БЕЗ КАКИХ-ЛИБО ГАРАНТИЙ, ЯВНЫХ ИЛИ ПОДРАЗУМЕВАЕМЫХ, ВКЛЮЧАЯ, НО НЕ ОГРАНИЧИВАЯСЬ, ПОДРАЗУМЕВАЕМЫЕ ГАРАНТИИ ТОВАРНОГО СОСТОЯНИЯ, ПРИГОДНОСТИ ДЛЯ ОПРЕДЕЛЁННОЙ ЦЕЛИ И НЕНАРУШЕНИЯ ПРАВ.",
            "Мы не гарантируем, что сайт будет работать без перерывов, без ошибок или полностью безопасен. Мы не гарантируем, что содержимое точно, полно, надёжно, актуально или не содержит ошибок.",
            "Вы признаёте, что игровые механики часто меняются с обновлениями. Содержимое может в любой момент устареть без уведомления. Мы не гарантируем, что какой-либо гайд, рекомендация по билду или стратегия дадут конкретные результаты.",
            "Любой материал, загруженный или полученный через сайт, доступен по вашему собственному усмотрению и на ваш страх и риск. Вы несёте единоличную ответственность за любой ущерб вашей компьютерной системе или потерю данных, возникающие в результате доступа к любому материалу.",
          ],
        },
        {
          title: "Ограничение ответственности",
          paragraphs: [
            "В МАКСИМАЛЬНОЙ СТЕПЕНИ, ДОПУСТИМОЙ ПРИМЕНИМЫМ ЗАКОНОДАТЕЛЬСТВОМ, НИ ПРИ КАКИХ ОБСТОЯТЕЛЬСТВАХ EXILE2 GUIDES, ЕГО ОПЕРАТОРЫ, УЧАСТНИКИ ИЛИ АФФИЛИРОВАННЫЕ ЛИЦА НЕ НЕСУТ ОТВЕТСТВЕННОСТИ ЗА ЛЮБЫЕ ПРЯМЫЕ, КОСВЕННЫЕ, СЛУЧАЙНЫЕ, ОСОБЫЕ, ПОСЛЕДУЮЩИЕ ИЛИ ШТРАФНЫЕ УБЫТКИ, ВОЗНИКАЮЩИЕ ИЗ ИЛИ СВЯЗАННЫЕ С ВАШИМ ИСПОЛЬЗОВАНИЕМ ИЛИ НЕВОЗМОЖНОСТЬЮ ИСПОЛЬЗОВАНИЯ САЙТА.",
            "Это ограничение применяется ко всем видам убытков, включая, но не ограничиваясь: потерей внутриигрового прогресса, предметов, валюты или статуса аккаунта; потерей данных; потерей выручки или ожидаемой прибыли; а также любыми косвенными, особыми, случайными, последующими или штрафными убытками независимо от того, основаны ли они на нарушении договора, деликте, строгой ответственности или любой иной правовой теории.",
            "Эти ограничения применяются независимо от того, был ли Exile2 Guides уведомлен о возможности таких убытков. Если вы недовольны каким-либо содержимым или этими Условиями, вашим единственным средством защиты является прекращение использования сайта.",
          ],
        },
        {
          title: "Возмещение убытков",
          paragraphs: [
            "Вы соглашаетесь возмещать, защищать и ограждать Exile2 Guides, его операторов, участников и аффилированных лиц от любых и всех претензий, обязательств, убытков, потерь, издержек и расходов (включая разумные юридические сборы), возникающих из или каким-либо образом связанных с: (а) вашим доступом к сайту или использованием его; (б) вашим нарушением этих Условий; (в) вашим нарушением прав третьих лиц, включая любые права интеллектуальной собственности, конфиденциальности или собственности; или (г) любой претензией о том, что ваш контент или действия причинили ущерб третьему лицу.",
          ],
        },
        {
          title: "Изменения условий",
          paragraphs: [
            "Мы оставляем за собой право изменять эти Условия в любое время по нашему собственному усмотрению. Когда мы вносим изменения, мы обновляем дату «Последнее обновление» в верхней части этой страницы. Существенные изменения могут быть сообщены через заметное уведомление на сайте.",
            "Если вы не согласны с любым изменением, вы должны прекратить использование сайта. Ваше дальнейшее использование после любых изменений означает принятие пересмотренных Условий.",
          ],
        },
        {
          title: "Применимое право и разрешение споров",
          paragraphs: [
            "Настоящие Условия регулируются и толкуются в соответствии с законами юрисдикции, в которой находятся операторы сайта, без учёта положений о коллизии законов.",
            "Любой спор, возникающий из или связанный с этими Условиями, прежде всего подлежит разрешению путём переговоров доброй воли. Если переговоры не увенчаются успехом, споры передаются в компетентные суды применимой юрисдикции.",
            "Вы соглашаетесь, что любые процедуры разрешения споров будут проводиться только на индивидуальной основе, а не в рамках коллективного, объединённого или представительского иска.",
          ],
        },
        {
          title: "Общие положения",
          paragraphs: [
            "Если какое-либо положение этих Условий будет признано не имеющим исковой силы или недействительным, это положение подлежит ограничению или исключению в минимальной необходимой степени, с тем чтобы остальные Условия оставались в полной силе и действии.",
            "Наш отказ от принудительного применения любого права или положения этих Условий не считается отказом от таких прав. Отказ от любого права или положения действителен только если он сделан в письменной форме и подписан надлежаще уполномоченным представителем.",
            "Настоящие Условия вместе с нашей Политикой конфиденциальности, Политикой использования файлов cookie и Отказом от ответственности составляют полное соглашение между вами и Exile2 Guides в отношении использования вами сайта.",
          ],
        },
        {
          title: "Контактная информация",
          paragraphs: [
            `По вопросам, касающимся этих Условий использования, пожалуйста, свяжитесь с нами по адресу ${contactEmail}.`,
          ],
        },
      ],
    },
  },
  de: {
    about: {
      description:
        "Erfahren Sie, wie Exile2 Guides unabhängig betrieben, recherchiert und als inoffizielle Path of Exile 2-Guide-Ressource veröffentlicht wird.",
      title: "Über Exile2 Guides",
      sections: [
        {
          title: "Unsere Mission",
          paragraphs: [
            "Exile2 Guides wird von einem einzelnen Entwickler unabhängig als inoffizielle Path of Exile 2-Guide-Ressource betrieben. Das Ziel ist es, nützliche, versionsbewusste Antworten zu ordnen, ohne Forschungszusammenfassungen als persönliche Spielerfahrung darzustellen.",
            "Die Seite ist schreibgeschützt und kostenlos zugänglich. Artikel werden nach strukturierter Recherche und automatisierten Qualitätsprüfungen veröffentlicht; Unsicherheiten und Verifizierungsgrenzen werden auf der Seite angezeigt, wenn sie relevant sind.",
          ],
        },
        {
          title: "Was wir abdecken",
          connectionLinks: [
            {
              description:
                "Leveling-Builds, Endgame-Setups, Ausrüstungsprioritäten, Passive-Baum-Pfade und Gem-Link-Konfigurationen für jede Klasse.",
              href: "/en/builds/",
              label: "Builds",
            },
            {
              description:
                "Boss-Mechaniken, Phasenaufschlüsselungen, Beute-Tabellen, Resistenzanforderungen und Schritt-für-Schritt-Strategieführer.",
              href: "/en/bosses/",
              label: "Bosse",
            },
            {
              description:
                "Datenbanken einzigartiger Gegenstände, Währungsmechaniken, Crafting-Referenzen und Affix-Stufenerklärungen.",
              href: "/en/items/",
              label: "Gegenstände",
            },
            {
              description:
                "Aufschlüsselungen aktiver Skill-Gems, Kombinationen mit Support-Gems, Skalierungsmechaniken und Level-Fortschrittsdaten.",
              href: "/en/skills/",
              label: "Fähigkeiten",
            },
            {
              description:
                "Tiefgehende Mechanik-Analysen, Anleitungen für Einsteiger, FAQ-Antworten und allgemeine Fortschrittsführer.",
              href: "/en/guides/",
              label: "Guides",
            },
          ],
        },
        {
          title: "Redaktionelle Standards",
          paragraphs: [
            "Artikel werden anhand offizieller Patch-Notes, aktueller Datenbanken, etablierter Community-Guides, Gameplay-Videos und Spielerdiskussionen recherchiert. Behauptungen werden nach Möglichkeit mit ihren Quellen verknüpft und mit dem entsprechenden Patch-Kontext verfasst.",
            "Automatisierte QA prüft die Inhaltsstruktur, erforderliche Metadaten, interne Links, den Veröffentlichungsstatus, die Indexierbarkeit und das Build-Ergebnis, bevor ein Artikel veröffentlicht wird.",
            "Wenn ein Schluss nicht persönlich im Spiel getestet wurde, wird er als quellenverifiziert und nicht als praktisch getestet dargestellt. Versionsabhängige Unsicherheit bleibt sichtbar, anstatt hinter selbstbewusster Formulierung versteckt zu werden.",
          ],
        },
        {
          title: "Unabhängigkeit",
          paragraphs: [
            "Exile2 Guides ist eine unabhängige, von Fans erstellte Ressource. Sie ist weder mit Grinding Gear Games noch mit einem anderen Unternehmen verbunden, von ihm genehmigt oder gesponsert.",
            "Die Veröffentlichung wird von einem einzelnen Betreiber verwaltet, und der Rechercheprozess gibt erstmaliges praktisches Gameplay-Testing nicht als abgeschlossen aus, wenn es nicht durchgeführt wurde.",
          ],
        },
        {
          title: "Korrekturen und Feedback",
          paragraphs: [
            "Spielmechaniken ändern sich häufig, und kein Guide ist perfekt. Wenn Sie einen Sachfehler, veraltete Mechanik oder fehlende Quelle finden, erreichen Sie uns bitte über unsere Kontaktseite oder schreiben Sie uns direkt eine E-Mail.",
            "Korrekturen und Urheberrechtsmeldungen werden nach Möglichkeit geprüft. Sachfehler mit hoher Auswirkung haben Vorrang, eine Reaktionszeit ist jedoch nicht garantiert.",
          ],
        },
      ],
    },
    contact: {
      description:
        "Kontaktieren Sie den unabhängigen Betreiber von Exile2 Guides zu Inhaltskorrekturen, Urheberrechtsmeldungen oder allgemeinem Feedback.",
      title: "Kontakt",
      sections: [
        {
          title: "Nehmen Sie Kontakt auf",
          paragraphs: [
            `Der einzige öffentliche Kontaktweg ist E-Mail: ${contactEmail}. Wir prüfen Korrekturen und Urheberrechtsmeldungen nach Möglichkeit. Sachfehler mit hoher Auswirkung haben Vorrang, eine Reaktionszeit ist jedoch nicht garantiert.`,
            "Dies ist eine schreibgeschützte statische Website ohne servergestütztes Kontaktformular. Bitte verwenden Sie den direkten E-Mail-Link unten; es gibt keinen Nachrichten-Sende-Button, der Ihre Anfrage stillschweigend verwerfen könnte.",
          ],
          connectionLinks: [
            {
              description:
                "Öffnen Sie Ihr E-Mail-Programm, um eine Korrektur, Urheberrechtsmeldung oder andere Mitteilung zu senden.",
              href: `mailto:${contactEmail}`,
              label: contactEmail,
            },
          ],
        },
        {
          title: "Kontaktszenarien",
          issueCards: [
            {
              description:
                "Geben Sie die Seiten-URL, die konkrete falsche Aussage, die Spielversion oder den Patch, in dem Sie getestet haben, sowie eine verlässliche Quelle oder klare Reproduktionsschritte an.",
              title: "Inhaltskorrektur",
            },
            {
              description:
                "Geben Sie die URL des Assets oder der Seite, eine Beschreibung des urheberrechtlich geschützten Materials, einen Eigentums- oder Genehmigungsnachweis sowie die konkrete angeforderte Maßnahme an.",
              title: "Urheberrechte oder Namensnennung",
            },
            {
              description:
                "Teilen Sie uns mit, welcher Bereich Aufmerksamkeit benötigt — Builds, Bosse, Gegenstände, Fähigkeiten oder allgemeines Site-Erlebnis — zusammen mit Ihrem detaillierten Vorschlag.",
              title: "Allgemeines Feedback",
            },
          ],
        },
        {
          title: "Was Sie angeben sollten",
          bullets: [
            "Die genaue Seiten-URL, auf der das Problem auftritt, möglichst mit einem Screenshot oder zitiertem Text.",
            "Eine verlässliche Quelle für die Korrektur — offizielle Patch-Notes, ein aktueller Datenbankeintrag oder ein klarer Community-Test/Bericht.",
            "Klare Reproduktionsdetails für jede Mechanik-Abweichung, einschließlich der Spielversion und der relevanten Konfiguration, falls bekannt.",
            "Nur die minimalen persönlichen Informationen, die wir benötigen, um auf Ihre Anfrage zu antworten.",
          ],
        },
        {
          title: "Prüfungsrichtlinie",
          paragraphs: [
            "Wir prüfen Korrekturen und Urheberrechtsmeldungen nach Möglichkeit. Sachfehler mit hoher Auswirkung haben Vorrang, eine Reaktionszeit ist jedoch nicht garantiert.",
          ],
        },
      ],
    },
    "cookie-policy": {
      description:
        "Vollständige Offenlegung zu Cookies und Browser-Speicher für Exile2 Guides — was Cookies sind, was wir verwenden, Cookies von Drittanbietern und wie Sie Ihre Einstellungen verwalten.",
      title: "Cookie-Richtlinie",
      sections: [
        {
          title: "Was sind Cookies",
          paragraphs: [
            "Cookies sind kleine Textdateien, die Websites auf Ihrem Computer, Telefon oder einem anderen mit dem Internet verbundenen Gerät speichern, wenn Sie sie besuchen. Sie werden häufig verwendet, damit Websites korrekt funktionieren, die Leistung verbessern, Benutzereinstellungen speichern und Betreibern von Websites Informationen liefern.",
            'Websites können auch ähnliche Technologien wie LocalStorage, SessionStorage oder IndexedDB (zusammenfassend „Browser-Speicher") verwenden. Auf dieser Seite umfassen Verweise auf „Cookies" alle derartigen Technologien, sofern nicht anders angegeben.',
          ],
        },
        {
          title: "Wie wir Cookies verwenden",
          paragraphs: [
            "Exile2 Guides setzt absichtlich keine Cookies und schreibt nicht in den Browser-Speicher. Wir verwenden keine Sitzungs-Cookies, persistenten Cookies, Tracking-Pixel, Fingerprinting-Skripte oder einen anderen Mechanismus, der Daten auf Ihrem Gerät speichert.",
            "Unsere Website verwendet keine Analyse-Dienste, Werbenetzwerke, Social-Media-Widgets, eingebettete Inhalte von Drittanbietern oder eine andere Funktion, die eine cookiebasierte Datenerfassung erfordern würde.",
            "Ihr Browser kann weiterhin standardmäßige HTTP-Cache-Einträge für unsere statischen Assets (HTML, CSS, JavaScript, Bilder) erstellen. Diese werden ausschließlich von Ihrem Browser gesteuert, enthalten keine personenbezogenen Daten und werden gemäß den Standard-Web-Caching-Protokollen verwaltet.",
          ],
        },
        {
          title: "Cookie-Kategorien",
          table: {
            headers: [
              "Cookie-Kategorie",
              "Zweck",
              "Dauer",
              "Status auf dieser Seite",
            ],
            rows: [
              [
                "Strikt notwendig",
                "Website-Funktion, Sicherheit, Lastverteilung",
                "Sitzung",
                "Nicht verwendet",
              ],
              [
                "Einstellungen",
                "Sprache, Design, Anzeigeoptionen",
                "Bis zu 1 Jahr",
                "Nicht verwendet",
              ],
              [
                "Analyse",
                "Nutzungsstatistiken, Seitenleistung",
                "Bis zu 2 Jahre",
                "Nicht verwendet",
              ],
              [
                "Werbung",
                "Werbe-Targeting, Kampagnen-Tracking",
                "Bis zu 2 Jahre",
                "Nicht verwendet",
              ],
              [
                "Social Media",
                "Soziales Teilen, eingebettete Inhalte",
                "Variiert",
                "Nicht verwendet",
              ],
            ],
          },
        },
        {
          title: "Cookies von Drittanbietern",
          paragraphs: [
            "Exile2 Guides bettet keinen Drittanbieter-Dienst ein, der Cookies auf Ihrem Gerät setzen würde. Wir verwenden kein Google Analytics, kein Facebook-Pixel, keine Twitter-Widgets, keine YouTube-Einbettungen, keine Disqus-Kommentare oder eine andere Drittanbieter-Integration, die externe Datenerfassung beinhaltet.",
            "Unsere Website enthält Links zu externen Websites, darunter Community-Wikis, offizielle Patch-Notes, Fan-Tools und Streaming-Plattformen. Diese externen Seiten haben eigene Cookie-Richtlinien, die von unseren unabhängig sind.",
          ],
        },
        {
          title: "Künftige Änderungen der Cookie-Nutzung",
          paragraphs: [
            "Führt eine künftige Version dieser Website Funktionen ein, die Cookies oder Browser-Speicher erfordern — etwa die Speicherung von Sprachpräferenzen, Umschalten des Dunkelmodus, Nutzungsanalyse oder Werbung —, wird diese Seite vor der Aktivierung dieser Funktionen aktualisiert.",
            "Jedes neue Cookie oder Speichermechanismus wird hier mit Name, Anbieter, Zweck, maximaler Dauer und den Ihnen verfügbaren Datenschutz-Kontrollen dokumentiert. Soweit gesetzlich erforderlich, implementieren wir Einwilligungsmechanismen, bevor nicht essenzielle Cookies gesetzt werden.",
          ],
        },
        {
          title: "Verwaltung von Cookies in Ihrem Browser",
          paragraphs: [
            "Sie haben das Recht, zu kontrollieren, wie Websites Cookies auf Ihrem Gerät verwenden. Die meisten modernen Browser bieten folgende Kontrollen:",
          ],
          bullets: [
            "Vorhandene Cookies anzeigen und löschen — sehen Sie alle von jeder Website gespeicherten Cookies ein und entfernen Sie diese einzeln oder massenhaft.",
            "Alle Cookies blockieren — verhindert, dass eine Website Cookies speichert. Dies kann dazu führen, dass einige Websites nicht ordnungsgemäß funktionieren.",
            "Cookies von Drittanbietern blockieren — erlaubt nur Cookies der Website, die Sie direkt besuchen.",
            "Privater oder Inkognito-Modus — löscht automatisch alle Cookies, wenn Sie die Browsersitzung schließen.",
          ],
        },
        {
          title: "Browser-spezifische Anleitungen",
          bullets: [
            "Google Chrome — Einstellungen > Datenschutz und Sicherheit > Cookies und andere Websitedaten",
            "Mozilla Firefox — Einstellungen > Datenschutz & Sicherheit > Cookies und Websitedaten",
            "Apple Safari — Einstellungen > Datenschutz > Cookies und Websitedaten",
            "Microsoft Edge — Einstellungen > Cookies und Website-Berechtigungen > Cookies verwalten und löschen",
            "Opera — Einstellungen > Erweitert > Datenschutz & Sicherheit > Website-Einstellungen > Cookies",
          ],
        },
        {
          title: "Kontakt",
          paragraphs: [
            `Wenn Sie Fragen zu unserer Cookie-Praxis haben, erreichen Sie uns bitte unter ${contactEmail}.`,
          ],
        },
      ],
    },
    disclaimer: {
      description:
        "Wichtige rechtliche Haftungsausschlüsse für Exile2 Guides zu inoffiziellem Status, Inhaltsgenauigkeit, Finanzberatung, externen Links und Benutzerverantwortung.",
      title: "Haftungsausschluss",
      sections: [
        {
          title: "Inoffizielle, von Fans erstellte Ressource",
          paragraphs: [
            'Exile2 Guides ist eine unabhängige, inoffizielle Website von Fans. Sie ist weder mit der Grinding Gear Games Limited („GGG"), der Entwicklerin und Verlegerin von Path of Exile 2, verbunden, von ihr genehmigt, gesponsert noch auf andere Weise mit ihr verknüpft.',
            "Path of Exile, Path of Exile 2, Grinding Gear Games und alle zugehörigen Logos, Charaktere, Namen, Kunstwerke und sonstigen Materialien sind Marken oder eingetragene Marken der Grinding Gear Games Limited. Alle Rechte bleiben ihren jeweiligen Inhabern vorbehalten. Die Verwendung dieser Materialien auf dieser Website dient ausschließlich informativen und Community-Zwecken und impliziert keinerlei Verbindung zu oder Billigung durch GGG.",
            "Wir haben keinen Zugriff auf nicht öffentliche Spieldaten, interne Entwicklungs-Builds, vertrauliche Serverinformationen oder andere Eigentumsmaterialien der Grinding Gear Games.",
          ],
        },
        {
          title: "Inhaltsgenauigkeit und Aktualität",
          paragraphs: [
            "Wir bemühen uns sicherzustellen, dass alle Guide-Inhalte zum Zeitpunkt der Veröffentlichung korrekt, gut belegt und aktuell sind. Path of Exile 2 ist jedoch ein Live-Service-Spiel, das häufig Updates, Balance-Änderungen, Hotfixes und große Patches erhält, die Spielmechaniken, Gegenstandseigenschaften, Skill-Verhalten und Fortschrittssysteme verändern können.",
            "Daher kann eine Information, die zum Zeitpunkt der Abfassung korrekt war, nach einem Spiel-Update veraltet oder falsch werden. Wir können nicht garantieren, dass jeder Artikel unmittelbar nach jedem Patch aktualisiert wird.",
            "Leser sollten Guide-Informationen vor wichtigen Spielentscheidungen stets mit den neuesten offiziellen Patch-Notes, Ingame-Tooltips und Community-Tests abgleichen. Exile2 Guides übernimmt keine Haftung für etwaige ingame Folgen, die aus der Verlassenschaft auf veraltete Informationen resultieren.",
          ],
        },
        {
          title: "Keine Finanz- oder Fachberatung",
          paragraphs: [
            "Alle Inhalte werden ausschließlich zu allgemeinen informativen, Bildungs- und Unterhaltungszwecken bereitgestellt. Nichts auf dieser Website stellt Finanzberatung, Anlageberatung, Handelsberatung oder eine andere Form von Fachberatung dar.",
            "Path of Exile 2 ist ein Videospiel. Guide-Inhalte dürfen niemals als Empfehlung interpretiert werden, Gegenstände, Währung, Accounts oder Dienste im Spiel gegen echtes Geld zu kaufen, zu verkaufen, zu handeln oder zu tauschen. Wir ermöglichen, fördern oder befürworten Real-Money-Trading (RMT) in keiner Form.",
            "Alle Entscheidungen, die Sie auf Grundlage der auf dieser Website gefundenen Informationen treffen, erfolgen auf eigenes Risiko. Wir übernehmen keine Haftung für Verluste — ingame oder anderweitig —, die aus der Befolgung unserer Guides, Build-Empfehlungen oder Strategievorschläge entstehen können.",
          ],
        },
        {
          title: "Externe Links und Inhalte von Drittanbietern",
          paragraphs: [
            "Exile2 Guides kann Links zu externen Websites für zusätzlichen Kontext, Referenzmaterial oder Community-Tools enthalten. Diese Links werden aus Bequemlichkeit bereitgestellt und implizieren keine Billigung des verlinkten Inhalts.",
            "Wir kontrollieren den Inhalt, die Richtigkeit, die Datenschutzpraktiken, die Sicherheitsmaßnahmen oder die Verfügbarkeit einer externen Website nicht. Die Aufnahme eines Links bedeutet nicht, dass wir für die auf dieser Seite dargestellten Informationen einstehen.",
            "Externe Websites können ihren Inhalt, ihre Struktur oder Verfügbarkeit jederzeit ohne Vorankündigung ändern. Wenn Sie einen toten Link oder veralteten externen Verweis finden, melden Sie dies bitte über unsere Kontaktseite.",
          ],
        },
        {
          title: "Benutzerverantwortung",
          paragraphs: [
            "Die Nutzung von Informationen, Guides, Builds, Strategien oder anderen Inhalten auf Exile2 Guides erfolgt vollständig auf eigenes Risiko. Wir geben keinerlei ausdrückliche oder stillschweigende Gewährleistungen hinsichtlich Vollständigkeit, Richtigkeit, Zuverlässigkeit, Eignung oder Verfügbarkeit irgendeines Inhalts auf dieser Website.",
            "Spieler sind allein für ihre eigenen ingame Entscheidungen verantwortlich, einschließlich Charakter-Builds, Zuweisung des passiven Skill-Baums, Gegenstandskäufen, Währungsausgaben, Handelsaktivität und Spielstrategie.",
            "Exile2 Guides haftet nicht für direkte, indirekte, zufällige, Folge- oder Sonder­schäden, die aus der Nutzung oder der Unmöglichkeit der Nutzung irgendeines Inhalts auf dieser Website entstehen. Dies umfasst unter anderem Verlust von ingame Fortschritt, Gegenständen, Währung, Account-Status oder andere virtuelle oder reale Verluste.",
          ],
        },
        {
          title: "Fair Use und geistiges Eigentum",
          paragraphs: [
            "Spielbezogene Inhalte auf dieser Website, einschließlich Verweisen auf Spielmechaniken, Gegenstandsnamen, Skill-Beschreibungen und Boss-Strategien, werden gemäß den Grundsätzen des Fair Use und zur Bereitstellung von von der Community erstellten Spiel-Guides und Kommentaren verwendet.",
            "Wir respektieren die Rechte des geistigen Eigentums von Grinding Gear Games und allen anderen Rechteinhabern. Wenn Sie der Ansicht sind, dass ein Inhalt auf dieser Website Ihre Rechte am geistigen Eigentum verletzt, kontaktieren Sie uns bitte umgehend unter " +
              contactEmail +
              " mit den Einzelheiten Ihres Anspruchs.",
            "Alle ursprünglichen redaktionellen Inhalte, Designelemente und die Site-Infrastruktur, die vom Exile2-Guides-Team erstellt wurden, dürfen ohne vorherige schriftliche Einwilligung nicht reproduziert, verbreitet oder kommerziell genutzt werden.",
          ],
        },
      ],
    },
    "privacy-policy": {
      description:
        "Vollständige Datenschutzerklärung für Exile2 Guides — Datenpraktiken, Cookie-Verwendung, Dienste von Drittanbietern, Ihre Rechte nach DSGVO und CCPA und wie wir Ihre Informationen schützen.",
      title: "Datenschutzerklärung",
      sections: [
        {
          title: "Überblick",
          paragraphs: [
            'Diese Datenschutzerklärung beschreibt, wie Exile2 Guides („wir", „uns", „unser") personenbezogene Daten und Privatsphäre der Besucher unserer Website behandelt. Wir verpflichten uns, Ihre Privatsphäre zu schützen und bei unseren Datenpraktiken transparent zu sein.',
            "Diese Richtlinie gilt für alle Benutzer unabhängig von ihrem geografischen Standort. Durch die Nutzung dieser Website erkennen Sie an, dass Sie diese Datenschutzerklärung gelesen und verstanden haben. Zuletzt aktualisiert: Juli 2026.",
          ],
        },
        {
          title: "Welche Informationen wir erheben",
          paragraphs: [
            "Exile2 Guides ist eine schreibgeschützte statische Content-Website. Wir erheben, speichern, verarbeiten oder übertragen keine personenbezogenen Daten. Konkret:",
          ],
          bullets: [
            "Wir verlangen keine Benutzerregistrierung, Konten oder Authentifizierung irgendeiner Art.",
            "Wir erheben keine Namen, E-Mail-Adressen, IP-Adressen oder andere personenbezogene Identifizierungsdaten.",
            "Wir betreiben keine servergestützten Protokollierungssysteme, die Besucherinformationen aufzeichnen.",
            "Wir verwenden keine Tracking-Pixel, Web-Beacons oder Browser-Fingerprinting-Techniken.",
            "Wir verarbeiten keine Benutzer-Uploads, Kommentare, Forenbeiträge oder andere vom Benutzer generierte Inhalte.",
            "Wir betreiben keine Zahlungssysteme, Abonnementdienste oder E-Commerce-Funktionen.",
            "Wir setzen keine Cookies und schreiben nicht in den Browser-Speicher (Einzelheiten siehe unsere Cookie-Richtlinie).",
          ],
        },
        {
          title: "Unsere Datenpraktiken im Überblick",
          table: {
            headers: ["Datenpraxis", "Aktueller Status"],
            rows: [
              ["Benutzerkonten und Authentifizierung", "Nicht verfügbar"],
              ["Erhebung personenbezogener Daten", "Keine erhoben"],
              ["Servergestützte Zugriffsprotokollierung", "Nicht aktiviert"],
              ["Analyse und Tracking", "Nicht aktiviert"],
              ["Werbung und Marketing", "Nicht aktiviert"],
              ["Cookies und LocalStorage", "Nicht absichtlich verwendet"],
              [
                "Kontaktformular-Übermittlungen",
                "Nicht aktiviert (nur E-Mail)",
              ],
              ["Vom Benutzer generierte Inhalte", "Nicht akzeptiert"],
              ["Weitergabe von Daten an Dritte", "Keine"],
              ["Website-übergreifendes Tracking", "Keine"],
            ],
          },
        },
        {
          title: "Cookies und Browser-Speicher",
          paragraphs: [
            "Exile2 Guides setzt absichtlich keine Cookies und schreibt in keine Form von Browser-Speicher. Wir verwenden keine Analyse-Cookies, Werbe-Cookies, Präferenz-Cookies oder eine andere Cookie-Kategorie.",
            "Ihr Browser kann standardmäßige HTTP-Cache-Einträge für unsere statischen Assets erstellen. Diese werden von Ihrem Browser gesteuert, enthalten keine personenbezogenen Daten und werden gemäß den Standard-Web-Caching-Protokollen verwaltet. Umfassende Informationen finden Sie in unserer Cookie-Richtlinie.",
          ],
        },
        {
          title: "Dienste von Drittanbietern",
          paragraphs: [
            "Wir integrieren keinen Drittanbieter-Dienst, der Benutzerdaten erhebt. Wir verwenden kein Google Analytics, kein Cloudflare-Analytics mit Datenerfassung, kein Facebook-Pixel, kein Twitter-Tracking, kein Hotjar, kein Mixpanel oder einen anderen datenerhebenden Dienst.",
            "Unsere Website wird auf Cloudflare Pages gehostet, das statische Dateien ausliefert. Die Infrastruktur von Cloudflare kann Anfragen auf Netzwerkebene aus Sicherheits- und Leistungsgründen verarbeiten, aber wir konfigurieren keinerlei Datenerfassungsfunktionen auf unserer Seite.",
            "Unsere Website enthält Links zu externen Websites, die nach eigenen Datenschutzrichtlinien operieren. Wir empfehlen Ihnen, deren Richtlinien zu prüfen, bevor Sie personenbezogene Informationen bereitstellen.",
          ],
        },
        {
          title: "Ihre Datenschutzrechte",
          paragraphs: [
            "Je nach Ihrer Gerichtsbarkeit können Sie über folgende Datenschutzrechte verfügen:",
          ],
          bullets: [
            "Recht auf Auskunft (Art. 15 DSGVO) — Kopien Ihrer personenbezogenen Daten anfordern. Da wir keine personenbezogenen Daten erheben, gibt es keine bereitzustellenden Daten.",
            "Recht auf Berichtigung (Art. 16 DSGVO) — Berichtigung unrichtiger personenbezogener Daten verlangen. Nicht anwendbar, da wir keine personenbezogenen Daten speichern.",
            "Recht auf Löschung (Art. 17 DSGVO) — Löschung Ihrer personenbezogenen Daten verlangen. Nicht anwendbar, da wir keine personenbezogenen Daten speichern.",
            "Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO) — Einschränkung der Verwendung Ihrer Daten verlangen. Nicht anwendbar, da wir keine personenbezogenen Daten speichern.",
            "Recht auf Datenübertragbarkeit (Art. 20 DSGVO) — Übertragung Ihrer Daten verlangen. Nicht anwendbar, da wir keine personenbezogenen Daten speichern.",
            "CCPA — Kalifornische Einwohner haben das Recht auf Auskunft, Löschung, Widerspruch gegen den Verkauf und Nicht-Diskriminierung. Da wir keine personenbezogenen Informationen erheben oder verkaufen, sind diese Rechte inhärent erfüllt.",
          ],
        },
        {
          title: "Datenschutz für Kinder",
          paragraphs: [
            "Exile2 Guides erhebt nicht wissentlich personenbezogene Daten von Kindern unter 13 Jahren (oder dem anwendbaren Alter für die digitale Einwilligung in Ihrer Gerichtsbarkeit). Da wir von keinem Benutzer personenbezogene Daten erheben, ist dies von vornherein der Fall.",
            "Wenn Sie ein Elternteil oder Erziehungsberechtigter sind und glauben, dass ein Kind über einen unvorhergesehenen Mechanismus personenbezogene Daten bereitgestellt hat, kontaktieren Sie uns bitte, und wir werden angemessene Schritte unternehmen, um die Situation zu klären.",
          ],
        },
        {
          title: "Internationale Datenübermittlungen",
          paragraphs: [
            "Da Exile2 Guides keine personenbezogenen Daten erhebt, speichert oder verarbeitet, gibt es keine offenzulegenden internationalen Datenübermittlungen. Unsere statischen Inhalte werden über ein globales Content-Delivery-Netzwerk ausgeliefert, jedoch enthalten diese Auslieferungen keine personenbezogenen Daten und werden daraus nicht abgeleitet.",
          ],
        },
        {
          title: "Änderungen dieser Datenschutzerklärung",
          paragraphs: [
            "Wir können diese Datenschutzerklärung von Zeit zu Zeit aktualisieren, um Änderungen unserer Praktiken, der Technologie, gesetzlicher Anforderungen oder anderer Faktoren zu berücksichtigen. Wesentliche Änderungen werden über einen auffälligen Hinweis auf der Website bekannt gegeben.",
            'Das Datum „Zuletzt aktualisiert" am Anfang dieser Seite gibt die jüngste Überarbeitung wieder. Die fortgesetzte Nutzung der Website nach Änderungen gilt als Annahme der aktualisierten Richtlinie.',
            "Führen wir Praktiken ein, die die Erhebung personenbezogener Daten beinhalten, wird diese Richtlinie vor Beginn solcher Praktiken umfassend neu verfasst und betroffene Benutzer werden benachrichtigt.",
          ],
        },
        {
          title: "Kontakt",
          paragraphs: [
            "Wenn Sie Fragen, Bedenken oder Anfragen zu dieser Datenschutzerklärung oder unseren Datenpraktiken haben, erreichen Sie uns unter:",
            `E-Mail: ${contactEmail}`,
            "Wir werden alle datenschutzbezogenen Anfragen innerhalb von 30 Tagen gemäß den geltenden Datenschutzvorschriften beantworten.",
          ],
        },
      ],
    },
    "terms-of-use": {
      description:
        "Vollständige Nutzungsbedingungen für Ihre Nutzung von Exile2 Guides — Annahme, Nutzerverhalten, geistiges Eigentum, Haftungsausschlüsse, Haftungsbeschränkungen und Streitbeilegung.",
      title: "Nutzungsbedingungen",
      sections: [
        {
          title: "Annahme der Bedingungen",
          paragraphs: [
            'Diese Nutzungsbedingungen („Bedingungen") regeln Ihren Zugang zur Website Exile2 Guides („Website") und deren Nutzung, einschließlich aller Inhalte, Funktionen und Möglichkeiten, die auf der Website oder über sie verfügbar sind.',
            "Durch den Zugriff auf, das Durchsuchen oder die Nutzung von Exile2 Guides erkennen Sie an, dass Sie diese Bedingungen in ihrer Gesamtheit gelesen, verstanden und akzeptiert haben. Wenn Sie nicht allen diesen Bedingungen zustimmen, dürfen Sie auf diese Website nicht zugreifen oder sie nicht nutzen.",
            'Diese Bedingungen stellen eine rechtlich bindende Vereinbarung zwischen Ihnen („Benutzer") und den Betreibern von Exile2 Guides dar. Ihre fortgesetzte Nutzung der Website nach Änderungen gilt als Annahme dieser Änderungen.',
          ],
        },
        {
          title: "Beschreibung des Dienstes",
          paragraphs: [
            "Exile2 Guides ist eine kostenlose, schreibgeschützte statische Content-Website, die von der Community erstellte Spiel-Guides, Build-Empfehlungen, Boss-Strategien, Gegenstandsdatenbanken, Skill-Referenzen und andere Informationsinhalte zu Path of Exile 2 bereitstellt.",
            "Die Website bietet keine Benutzerkonten, interaktive Funktionen, Übermittlung von nutzergenerierten Inhalten, E-Commerce, Zahlungsabwicklung oder einen anderen Dienst als die Anzeige statischer Inhalte.",
            "Wir behalten uns das Recht vor, Teile der Website jederzeit mit oder ohne Vorankündigung zu ändern, auszusetzen oder einzustellen.",
          ],
        },
        {
          title: "Berechtigung",
          paragraphs: [
            "Exile2 Guides richtet sich an die allgemeine Öffentlichkeit. Für den Zugriff auf unsere statischen Inhalte gibt es kein Mindestalter. Wenn Sie jedoch in Ihrer Gerichtsbarkeit die Volljährigkeit noch nicht erreicht haben, sollten Sie diese Bedingungen mit einem Elternteil oder Erziehungsberechtigten durchgehen.",
            "Durch die Nutzung dieser Website erklären und gewährleisten Sie, dass Sie die rechtliche Befähigung haben, diese Bedingungen einzugehen, und dass Ihre Nutzung keine anwendbaren Gesetze oder Vorschriften Ihrer Gerichtsbarkeit verletzt.",
          ],
        },
        {
          title: "Erlaubte Nutzung",
          paragraphs: [
            "Sie dürfen auf die Inhalte zugreifen, sie durchsuchen und nur für persönliche, nicht kommerzielle, informative Zwecke nutzen.",
            "Sie dürfen Links zu unseren Inhalten in sozialen Medien, Foren oder anderen Plattformen teilen, sofern eine ordnungsgemäße Quellenangabe erfolgt und die Links die Benutzer auf den Originalinhalt auf unserer Website verweisen.",
            "Sie dürfen einzelne Seiten für den persönlichen Offline-Gebrauch ausdrucken oder speichern, sofern keine Inhalte geändert, neu veröffentlicht oder weiterverbreitet werden.",
          ],
        },
        {
          title: "Verbotenes Verhalten",
          paragraphs: [
            "Sie erklären sich damit einverstanden, sich an keiner der folgenden verbotenen Aktivitäten zu beteiligen:",
          ],
          bullets: [
            "Verwendung automatisierter Systeme (Bots, Scraper, Crawler), um ohne vorherige schriftliche Erlaubnis auf Inhalte zuzugreifen, sie zu sammeln oder zu überwachen.",
            "Versuch, unbefugten Zugriff auf einen Teil der Website, ihre Server oder verbundene Systeme zu erlangen.",
            "Start von Denial-of-Service-Angriffen, Belastungstests oder anderen Versuchen, den Betrieb der Website zu stören.",
            "Übermittlung von Viren, Malware oder anderem bösartigen Code über die Website oder an sie.",
            "Vorgabe, eine Person oder Entität zu sein, oder falsche Darstellung Ihrer Zugehörigkeit zu einer Person oder Entität.",
            "Nutzung der Website für rechtswidrige Zwecke oder unter Verletzung eines lokalen, nationalen oder internationalen Gesetzes.",
            "Umgehung oder Versuch der Umgehung von Sicherheitsmaßnahmen oder Zugriffskontrollen auf der Website.",
          ],
        },
        {
          title: "Rechte des geistigen Eigentums",
          paragraphs: [
            "Alle ursprünglichen Inhalte auf Exile2 Guides — einschließlich redaktionellem Text, Guide-Struktur, Datenkompilationen, Designelementen und Website-Code — sind durch anwendbares Urheberrecht, Markenrecht und Recht des geistigen Eigentums geschützt.",
            "Sie dürfen keine ursprünglichen Inhalte ohne vorherige schriftliche Einwilligung reproduzieren, verbreiten, ändern, daraus abgeleitete Werke erstellen, öffentlich zeigen oder kommerziell verwerten.",
            "Path of Exile, Path of Exile 2 und alle zugehörigen Spiel-Assets sind Marken der Grinding Gear Games Limited. Diese Materialien werden gemäß den Grundsätzen des Fair Use für Community-Guides und Kommentare verwendet. Wir erheben keinen Anspruch auf Eigentum an geistigem Eigentum von Grinding Gear Games.",
            `Wenn Sie der Ansicht sind, dass ein Inhalt Ihre Rechte am geistigen Eigentum verletzt, kontaktieren Sie uns bitte unter ${contactEmail} mit einer detaillierten Beschreibung der behaupteten Verletzung.`,
          ],
        },
        {
          title: "Haftungsausschluss der Gewährleistung",
          paragraphs: [
            'EXILE2 GUIDES WIRD IM ZUSTAND „WIE BESEHEN" UND „WIE VERFÜGBAR" OHNE JEGLICHE GEWÄHRLEISTUNG, AUSDRÜCKLICH ODER STILLSCHWEIGEND, EINSCHLIESSLICH, ABER NICHT BESCHRÄNKT AUF STILLSCHWEIGENDE GEWÄHRLEISTUNGEN DER MARKTGÄNGIGKEIT, DER EIGNUNG FÜR EINEN BESTIMMTEN ZWECK UND DER NICHTVERLETZUNG VON RECHTEN DRITTER, BEREITGESTELLT.',
            "Wir gewährleisten nicht, dass die Website unterbrechungsfrei, fehlerfrei oder vollständig sicher ist. Wir gewährleisten nicht, dass die Inhalte korrekt, vollständig, zuverlässig, aktuell oder fehlerfrei sind.",
            "Sie erkennen an, dass sich Spielmechaniken mit Updates häufig ändern. Inhalte können jederzeit ohne Vorankündigung veralten. Wir gewährleisten nicht, dass ein Guide, eine Build-Empfehlung oder eine Strategie bestimmte Ergebnisse erzielt.",
            "Jedes über die Website heruntergeladene oder abgerufene Material wird auf eigene Gefahr und Verantwortung abgerufen. Sie sind allein verantwortlich für Schäden an Ihrem Computersystem oder Datenverluste, die aus dem Zugriff auf Material resultieren.",
          ],
        },
        {
          title: "Haftungsbeschränkung",
          paragraphs: [
            "SOWEIT NACH GELTENDEM RECHT ZULÄSSIG, HAFTET EXILE2 GUIDES, SEINE BETREIBER, MITWIRKENDE ODER VERBUNDENE UNTERNEHMEN IN KEINEM FALL FÜR DIREKTE, INDIREKTE, ZUFÄLLIGE, BESONDERE, FOLGE- ODER STRAFSCHÄDEN, DIE AUS ODER IM ZUSAMMENHANG MIT IHRER NUTZUNG ODER DER UNMÖGLICHKEIT DER NUTZUNG DER WEBSITE ENTSTEHEN.",
            "Diese Beschränkung gilt für alle Schadensarten, einschließlich, aber nicht beschränkt auf: Verlust von ingame Fortschritt, Gegenständen, Währung oder Account-Status; Datenverlust; Verlust von Einnahmen oder erwarteten Gewinnen; und alle indirekten, besonderen, zufälligen, Folge- oder Strafschäden, gleichgültig ob sie auf Vertragsverletzung, unerlaubter Handlung, strenger Haftung oder einer anderen Rechtstheorie beruhen.",
            "Diese Beschränkungen gelten unabhängig davon, ob Exile2 Guides auf die Möglichkeit solcher Schäden hingewiesen wurde. Wenn Sie mit einem Inhalt oder diesen Bedingungen unzufrieden sind, ist Ihr alleiniges Rechtsmittel die Einstellung der Nutzung der Website.",
          ],
        },
        {
          title: "Freistellung",
          paragraphs: [
            "Sie erklären sich damit einverstanden, Exile2 Guides, seine Betreiber, Mitwirkenden und verbundenen Unternehmen von und gegen alle Ansprüche, Verbindlichkeiten, Schäden, Verluste, Kosten und Ausgaben (einschließlich angemessener Rechtsgebühren) freizustellen, die aus oder in irgendeiner Weise im Zusammenhang stehen mit: (a) Ihrem Zugang zur oder Nutzung der Website; (b) Ihrer Verletzung dieser Bedingungen; (c) Ihrer Verletzung von Rechten Dritter, einschließlich geistigem Eigentum, Privatsphäre oder Eigentumsrechten; oder (d) einer Behauptung, dass Ihre Inhalte oder Handlungen Dritten Schaden zugefügt haben.",
          ],
        },
        {
          title: "Änderungen der Bedingungen",
          paragraphs: [
            'Wir behalten uns das Recht vor, diese Bedingungen jederzeit nach unserem alleinigen Ermessen zu ändern. Wenn wir Änderungen vornehmen, aktualisieren wir das Datum „Zuletzt aktualisiert" am Anfang dieser Seite. Wesentliche Änderungen können über einen auffälligen Hinweis auf der Website mitgeteilt werden.',
            "Wenn Sie mit einer Änderung nicht einverstanden sind, müssen Sie die Nutzung der Website einstellen. Ihre fortgesetzte Nutzung nach Änderungen gilt als Annahme der überarbeiteten Bedingungen.",
          ],
        },
        {
          title: "Anwendbares Recht und Streitbeilegung",
          paragraphs: [
            "Diese Bedingungen unterliegen den Gesetzen der Gerichtsbarkeit, in der die Betreiber der Website ansässig sind, ohne Berücksichtigung ihrer Kollisionsnormen, und sind in Übereinstimmung damit auszulegen.",
            "Jeder aus diesen Bedingungen entstehende oder mit ihnen zusammenhängende Streit wird zunächst durch Verhandlungen in gutem Glauben beigelegt. Scheitern die Verhandlungen, werden Streitigkeiten den zuständigen Gerichten der anwendbaren Gerichtsbarkeit unterbreitet.",
            "Sie erklären sich damit einverstanden, dass Streitbeilegungsverfahren ausschließlich individuell und nicht als Sammel-, konsolidierte oder repräsentative Klage durchgeführt werden.",
          ],
        },
        {
          title: "Allgemeine Bestimmungen",
          paragraphs: [
            "Sollte eine Bestimmung dieser Bedingungen für nicht durchsetzbar oder ungültig erklärt werden, wird diese Bestimmung im minimal erforderlichen Umfang beschränkt oder entfernt, sodass die übrigen Bedingungen voll wirksam bleiben.",
            "Unser Unterlassen der Durchsetzung eines Rechts oder einer Bestimmung dieser Bedingungen gilt nicht als Verzicht auf diese Rechte. Der Verzicht auf ein Recht oder eine Bestimmung ist nur wirksam, wenn er schriftlich erfolgt und von einem ordnungsgemäß befugten Vertreter unterzeichnet ist.",
            "Diese Bedingungen zusammen mit unserer Datenschutzerklärung, Cookie-Richtlinie und diesem Haftungsausschluss stellen die gesamte Vereinbarung zwischen Ihnen und Exile2 Guides bezüglich Ihrer Nutzung der Website dar.",
          ],
        },
        {
          title: "Kontaktinformationen",
          paragraphs: [
            `Bei Fragen zu diesen Nutzungsbedingungen erreichen Sie uns bitte unter ${contactEmail}.`,
          ],
        },
      ],
    },
  },
};
