/** 文件职责：维护第一批 15 篇攻略的巴西葡萄牙语审校译文，不包含稳定标识与事实源 URL。 */
export const locale = "pt-br";
export const translator = "codex-gpt5-local-review";

export const ui = {
  sectionTitles: {
    overview: "Visão geral",
    "pros-cons": "Vantagens e desvantagens",
    leveling: "Nivelamento e transição",
    mapping: "Rotação em mapas",
    bossing: "Rotação contra chefes",
    mechanics: "Mecânicas principais",
    supports: "Prioridade de gemas de suporte",
    "build-use-cases": "Usos em builds",
    properties: "Propriedades",
    alternatives: "Alternativas e melhorias",
    "common-mistakes": "Erros comuns",
    "quick-answer": "Resposta rápida",
    "progression-steps": "Rota de progressão",
    decisions: "Regras de decisão",
    strategy: "Estratégia segura",
    "build-considerations": "Preparação da build",
    faq: "Perguntas frequentes",
    sources: "Fontes e verificação",
  },
  sourceLabel: "Fontes atuais e verificação cruzada",
  sourceDescription:
    "Os fatos foram comparados com notas oficiais, bancos de dados atuais e as fontes da comunidade listadas.",
  verificationNote:
    "As mecânicas e o escopo do patch foram verificados com fontes oficiais, bancos de dados atuais e guias da comunidade; testes próprios no PC são registrados separadamente e não são apresentados como realizados.",
};

export const articles = {
  "big-monkee-spirit-walker": {
    meta: {
      title: "Big Monkee Spirit Walker: de Tame Beast ao endgame",
      shortTitle: "Big Monkee Spirit Walker",
      summary:
        "Spirit Walker focada em companheiro: dome Mighty Silverfist e combine Pounce, Maul e Pain Offering em uma build barata da campanha ao endgame.",
      description:
        "Guia Big Monkee Spirit Walker para PoE2 0.5 com nivelamento de Twister, transição para Tame Beast, escalamento do companheiro, defesas e rotações.",
      imageAlt: "Mighty Silverfist usado pela build Big Monkee Spirit Walker",
      seoTitle: "Guia Big Monkee Spirit Walker (PoE2 0.5)",
      seoDescription:
        "Big Monkee Spirit Walker no PoE2 0.5: dome Mighty Silverfist e siga a progressão, o equipamento e as rotações para mapas e chefes.",
    },
    overview: [
      "A build deixa o dano principal com uma fera única domada, enquanto a Huntress participa com Pounce e Maul. Mighty Silverfist tem ótima base de crítico e é o alvo mais claro durante a campanha.",
      "Tame Beast não está disponível no começo. Nivele com Twister ou outra habilidade confiável de Huntress, guarde ouro para realocar passivas e mude quando habilidades e passivas do companheiro estiverem prontas.",
    ],
    keyPoints: [
      "Dome Mighty Silverfist no Ato 3.",
      "Mantenha Pain Offering em raros resistentes e chefes.",
      "Use Pounce e Maul para contribuir com dano e sustentar o roubo de vida.",
    ],
    pros: [
      "Dano forte com orçamento baixo.",
      "Boa para SSF depois de obter a fera.",
      "O companheiro reduz a pressão nos mapas.",
    ],
    cons: [
      "Encontrar os melhores modificadores da fera leva tempo.",
      "A transição de passivas custa ouro.",
      "A IA do companheiro pode falhar em áreas estreitas.",
    ],
    leveling: [
      [
        "Atos 1 e 2",
        "Nivele com Twister e Whirling Slash, priorizando vida, resistências e dano adicionado a ataques.",
      ],
      [
        "Transição no Ato 3",
        "Após o segundo marco de Ascendancy, dome Mighty Silverfist e realoque pontos para companheiro e dano compartilhado.",
      ],
      [
        "Primeiros mapas",
        "Estabilize vida, regeneração de mana e armadura antes de investir em anointments ou equipamento caro para o companheiro.",
      ],
    ],
    mapping: [
      "Entre nos grupos com Pounce, use Maul para manter sua contribuição e deixe a fera finalizar. Não saia do alcance de combate dela e reposicione quando necessário.",
    ],
    bossing: [
      "Abra com Pain Offering, mantenha o companheiro no chefe e use Pounce para atravessar áreas perigosas. Renove a oferenda somente em janelas seguras.",
    ],
    faq: [
      [
        "Quando devo mudar para Tame Beast?",
        "A gema fica disponível no tier 7, mas a transição costuma ser melhor após a segunda Ascendancy e com passivas suficientes de companheiro.",
      ],
      [
        "Mighty Silverfist é obrigatório?",
        "Não. Outras feras únicas funcionam, mas Mighty Silverfist é a opção de alvo único mais clara na campanha.",
      ],
    ],
  },
  "grenade-gemling-legionnaire": {
    meta: {
      title: "Gemling Legionnaire de granadas: campanha, mapas e chefes",
      shortTitle: "Gemling de granadas",
      summary:
        "Build de besta que limpa com Explosive Shot e concentra granadas para explosão, usando qualidade de Gemling, Mirage Archer e defesas em camadas.",
      description:
        "Guia Gemling Legionnaire de granadas para PoE2 0.5: troca de habilidades, Explosive, Cluster e Oil Grenade, equipamento e rotações.",
      imageAlt: "Gemling Legionnaire usando besta e granadas",
      seoTitle: "Gemling Legionnaire de granadas (PoE2 0.5)",
      seoDescription:
        "Nivelamento e endgame de Gemling de granadas no PoE2 0.5: qualidade, defesas e rotações para mapas e chefes.",
    },
    overview: [
      "Explosive Shot cuida da limpeza comum; Explosive Grenade e Cluster Grenade entregam dano explosivo. Oil Grenade aumenta o dano de fogo e Flash Grenade cria uma janela defensiva de stun.",
      "Gemling Legionnaire valoriza muito nível e qualidade das gemas. Na campanha, atualizar uma besta de alto dano importa mais do que perseguir um único caro sem sinergia.",
    ],
    keyPoints: [
      "Mantenha o dano da besta compatível com a área.",
      "Use Mirage Archer para automatizar parte das granadas.",
      "Priorize vida, resistências, evasão e deflection antes de dano de luxo.",
    ],
    pros: [
      "Limpeza rápida e explosão forte em chefes.",
      "Rota de campanha direta.",
      "Combina armadura, evasão e escudo de energia.",
    ],
    cons: [
      "As explosões reduzem a clareza visual.",
      "Qualidade e recuperação ficam caras no endgame.",
      "É preciso dominar pavios e pontos de queda.",
    ],
    leveling: [
      [
        "Ato 1",
        "Use Permafrost Bolts e Fragmentation Rounds e atualize a besta com frequência.",
      ],
      [
        "Ato 2",
        "Passe a limpar com Explosive Shot e adicione Explosive Grenade e Flash Grenade.",
      ],
      [
        "Do Ato 3 em diante",
        "Adicione Mirage Archer e depois Cluster Grenade; escolha a Ascendancy de qualidade quando os ganhos forem reais.",
      ],
    ],
    mapping: [
      "Dispare Explosive Shot enquanto avança, lance Explosive Grenade em grupos resistentes e deixe Mirage Archer limpar o restante. Guarde Flash Grenade para raros perigosos.",
    ],
    bossing: [
      "Coloque Oil Grenade, use Cluster e Explosive Grenade e mantenha Explosive Shot. Não gaste todas as cargas antes de uma mudança de fase.",
    ],
    faq: [
      [
        "Qual atributo é mais importante na besta?",
        "Priorize dano alto da arma e níveis úteis para habilidades de projétil; uma rara adequada supera um único sem sinergia.",
      ],
      [
        "Quando escolher Advanced Thaumaturgy?",
        "Quando as granadas principais tiverem qualidade suficiente para ganhos reais de recuperação, projéteis ou dano.",
      ],
    ],
  },
  "lightning-arrow-deadeye": {
    meta: {
      title: "Lightning Arrow Deadeye: do início ao endgame",
      shortTitle: "Lightning Arrow Deadeye",
      summary:
        "Arqueira veloz com Lightning Arrow, detonações de Lightning Rod, Herald of Thunder e miragens de Deadeye, com transição gradual de não crítico para crítico.",
      description:
        "Guia Lightning Arrow Deadeye para PoE2 0.5: nivelamento, posicionamento de Lightning Rod, Mirage Archer, arco e defesas.",
      imageAlt: "Deadeye atacando com um arco rápido de raio",
      seoTitle: "Guia Lightning Arrow Deadeye (PoE2 0.5)",
      seoDescription:
        "Lightning Arrow Deadeye no PoE2 0.5: progressão, Lightning Rod, melhorias de arco e configurações para mapas e chefes pináculo.",
    },
    overview: [
      "Lightning Arrow limpa grupos rapidamente e Lightning Rod transforma flechas repetidas em dano concentrado contra chefes. Herald of Thunder e miragens ampliam a cobertura, mas não substituem uma boa colocação das Rods.",
      "Comece com arco físico forte e versão sem crítico; mude para crítico somente quando accuracy, chance de crítico e defesas estiverem estáveis.",
    ],
    keyPoints: [
      "Em mapas comuns, Lightning Arrow costuma bastar.",
      "Coloque várias Lightning Rod antes de atacar um chefe.",
      "Priorize qualidade em Lightning Rod antes das ferramentas secundárias.",
    ],
    pros: [
      "Velocidade de limpeza excelente.",
      "Progressão suave na campanha.",
      "Escala até conteúdo pináculo.",
    ],
    cons: [
      "Defesas leves no começo.",
      "O dano em chefes exige preparar a combinação.",
      "Arcos e equipamento crítico finais são caros.",
    ],
    leveling: [
      [
        "Campanha",
        "Nivele com Lightning Arrow e Lightning Rod e troque o arco físico quando ficar atrás da área.",
      ],
      [
        "Primeiros mapas",
        "Use passivas sem crítico, complete resistências e estabilize evasão.",
      ],
      [
        "Transição para crítico",
        "Mude somente com accuracy, dano do arco, crítico e defesas prontos e quando o novo conjunto for melhor.",
      ],
    ],
    mapping: [
      "Use Lightning Arrow em grupos comuns. Coloque Lightning Rod sob raros resistentes e continue atirando para sobrepor chains e detonações.",
    ],
    bossing: [
      "Prepare várias Lightning Rod, adicione Tornado Shot se a versão usar e encadeie Lightning Arrow. Em pináculos, troque suportes de área por dano concentrado quando necessário.",
    ],
    faq: [
      [
        "Lightning Rod ainda é necessária na 0.5?",
        "Sim. Mesmo após ajustes, continua sendo a peça principal para dano de alvo único.",
      ],
      [
        "Posso começar direto com crítico?",
        "Não é recomendado. A versão sem crítico é mais confiável antes de obter accuracy, equipamento e defesas.",
      ],
    ],
  },
  tornado: {
    meta: {
      title: "Tornado: chão elemental, limite e dano degenerativo",
      shortTitle: "Tornado",
      summary:
        "Tornado cria uma tempestade de dano físico degenerativo que puxa inimigos e absorve chão elemental para adicionar o elemento correspondente.",
      description:
        "Guia Tornado no PoE2: duração de 8 segundos, limite, absorção de chão elemental, escalamento, suportes e builds.",
      imageAlt: "Tempestade Tornado criada por uma build Acolyte of Chayula",
      seoTitle: "Guia Tornado e absorção de chão (PoE2 0.5)",
      seoDescription:
        "Tornado no PoE2 0.5: dano físico degenerativo, chão elemental, duração, limite, suportes e usos em builds.",
    },
    overview: [
      "Tornado gera uma tempestade que puxa inimigos próximos e causa dano físico degenerativo. Ao sobrepor chão elemental, absorve o debuff e adiciona dano do elemento correspondente.",
      "A duração base é de 8 segundos e o limite é um; qualidade pode aumentar duração e quantidade simultânea.",
    ],
    keyPoints: [
      "Dano de spell afeta o debuff degenerativo.",
      "O raio da tempestade é de 3 metros.",
      "Variantes elementais dependem de absorver o chão correto.",
    ],
    mechanics: [
      "O núcleo de Tornado é dano degenerativo, não uma sequência de hits. O chão elemental altera o debuff aplicado e o tipo de dano adicional.",
      "Aumentar o limite permite várias tempestades e duração determina cobertura. Não confunda com a habilidade de projétil Tornado Shot.",
    ],
    mechanicBullets: [
      "Duração base: 8 segundos.",
      "Limite base: 1 Tornado.",
      "Qualidade pode aumentar duração e limite.",
    ],
    supports: [
      [
        "Prolonged Duration",
        "Amplia a cobertura e reduz a frequência de renovação.",
        "core",
      ],
      [
        "Magnified Area",
        "Melhora o puxão e a cobertura nos mapas.",
        "situational",
      ],
      ["Physical Mastery", "Aumenta o nível da habilidade física.", "core"],
    ],
    buildUse: [
      "Serve em cadeias de trigger de Archon, builds de dano físico degenerativo e combinações que colocam chão elemental de forma confiável sob a tempestade.",
    ],
    mistakes: [
      "Não escale apenas dano de hit. Confirme que o chão se sobrepõe ao Tornado em vez de assumir que qualquer área próxima foi absorvida.",
    ],
    faq: [
      [
        "Tornado pode absorver vários elementos?",
        "Pode obter dano adicional dos chãos elementais absorvidos; a build precisa garantir cada sobreposição e duração.",
      ],
      [
        "Tornado é igual a Tornado Shot?",
        "Não. Tornado é um spell de dano degenerativo; Tornado Shot é um ataque de projétil separado.",
      ],
    ],
  },
  "ball-lightning": {
    meta: {
      title: "Ball Lightning: frequência dos raios, Fire Infusion e shock",
      shortTitle: "Ball Lightning",
      summary:
        "Ball Lightning lança um projétil lento que não acerta por si só e descarrega raios em alvos próximos a cada 0,2 segundo.",
      description:
        "Guia Ball Lightning no PoE2: frequência, shock, velocidade, Fire Infusion, chão em chamas, suportes e Blood Mage.",
      imageAlt: "Blood Mage conjurando Ball Lightning",
      seoTitle: "Guia Ball Lightning e Infusion (PoE2 0.5)",
      seoDescription:
        "Ball Lightning no PoE2 0.5: descargas a cada 0,2 s, shock, Fire Infusion, velocidade, suportes e builds.",
    },
    overview: [
      "Ball Lightning move lentamente uma esfera através dos inimigos. A esfera não acerta: libera raios repetidos e o mesmo alvo pode receber uma descarga a cada 0,2 segundo.",
      "Ao consumir Fire Infusion, a esfera desacelera, deixa chão em chamas e explode em fogo ao desaparecer.",
    ],
    keyPoints: [
      "O projétil não acerta.",
      "O raio de busca é de 1,8 metro.",
      "A habilidade tem chance de shock muito alta.",
    ],
    mechanics: [
      "Velocidade menor mantém a esfera perto do chefe por mais tempo; velocidade demais pode reduzir descargas. Área e posicionamento decidem por quanto tempo o alvo fica no raio.",
      "Fire Infusion acrescenta uma ramificação separada de chão e explosão de fogo que precisa ser escalada de propósito.",
    ],
    mechanicBullets: [
      "Intervalo por alvo: 0,2 segundo.",
      "Raio de alvo: 1,8 metro.",
      "Chance base de crítico: 9%.",
    ],
    supports: [
      [
        "Considered Casting",
        "Útil em self-cast quando a perda de velocidade é aceitável.",
        "situational",
      ],
      [
        "Magnified Area",
        "Reduz a exigência de posicionamento na limpeza.",
        "situational",
      ],
      [
        "Lightning Mastery",
        "Aumenta o nível em builds de raio compatíveis.",
        "core",
      ],
    ],
    buildUse: [
      "Ballcano Blood Mage usa Ball Lightning para limpar e aplicar shock, reservando Volcano ou outro spell para concentrar dano em chefes.",
    ],
    mistakes: [
      "Não avalie o dano pelo contato da esfera, pois ela não acerta. Evite também velocidade que atravesse o alvo antes de descarregar vezes suficientes.",
    ],
    faq: [
      [
        "A esfera acerta ao atravessar inimigos?",
        "Não; o dano vem dos raios liberados repetidamente.",
      ],
      [
        "Por que usar Fire Infusion?",
        "Ela adiciona chão em chamas e uma explosão final, útil em builds híbridas que gerem e escalem Infusion.",
      ],
    ],
  },
  "gas-grenade": {
    meta: {
      title: "Gas Grenade: nuvem de veneno, detonação e recarga",
      shortTitle: "Gas Grenade",
      summary:
        "Gas Grenade cria uma nuvem de veneno crescente que fogo ou uma habilidade Detonator podem transformar em explosão; o limite é de 6 nuvens.",
      description:
        "Guia Gas Grenade no PoE2: limite de nuvens, poison, detonação de fogo, recuperação, suportes e rotação de Pathfinder.",
      imageAlt: "Pathfinder lançando Gas Grenade",
      seoTitle: "Gas Grenade: veneno e detonação (PoE2 0.5)",
      seoDescription:
        "Gas Grenade no PoE2 0.5: limite de 6 nuvens, fogo, recarga, qualidade, suportes e builds.",
    },
    overview: [
      "Gas Grenade quica e libera gás quando o pavio termina. A nuvem aplica poison como um hit sem ser um hit normal e cresce; burning ou um Detonator compatível causa uma explosão de fogo.",
      "A habilidade armazena várias cargas de recarga e mantém no máximo seis nuvens, então a rotação depende de sobreposição, duração e recuperação.",
    ],
    keyPoints: [
      "Máximo de 6 nuvens.",
      "Burning ou Detonator explode a nuvem.",
      "Qualidade melhora recuperação e dano de fogo.",
    ],
    mechanics: [
      "A nuvem de poison e a explosão escalam de maneiras diferentes. A ramificação de veneno busca chaos, magnitude e duração; a de explosão precisa de burning ou Detonator confiável.",
      "Desde a 0.3, a habilidade segue rigorosamente o pavio de granada, exigindo antecipação contra alvos móveis.",
    ],
    mechanicBullets: [
      "Armazena 3 usos de recarga.",
      "A nuvem cresce até seu limite atual.",
      "Não dá hit normal, mas aplica poison como um hit.",
    ],
    supports: [
      ["Second Wind", "Dá flexibilidade de cargas durante a explosão.", "core"],
      ["Persistent Ground", "Prolonga a cobertura das nuvens.", "situational"],
      [
        "Fire Mastery",
        "Apoia a ramificação de detonação de fogo.",
        "situational",
      ],
    ],
    buildUse: [
      "Pathfinder pode preparar nuvens antes do chefe aparecer, acumular Wither e Despair e então manter poison ou detonar para dano de fogo.",
    ],
    mistakes: [
      "Não escale poison e fogo sem escolher uma ramificação principal. Respeite o limite de seis nuvens e não esgote as cargas antes de o chefe poder ser alvo.",
    ],
    faq: [
      [
        "A nuvem envenena sem dar hit?",
        "Sim. Ela não é um hit normal, mas aplica poison como se fosse.",
      ],
      [
        "O que detona a nuvem?",
        "Efeitos de burning e habilidades Detonator compatíveis provocam a explosão de fogo.",
      ],
    ],
  },
  "lightning-spear": {
    meta: {
      title: "Lightning Spear: divisão com Frenzy Charge, raios e shock",
      shortTitle: "Lightning Spear",
      summary:
        "Lightning Spear libera 5 raios ao acertar; com Frenzy Charge, consome uma carga e divide a lança principal para 3 alvos.",
      description:
        "Guia Lightning Spear no PoE2: conversão para raio, divisão com Frenzy Charge, projéteis secundários, shock, qualidade e Amazon.",
      imageAlt: "Amazon lançando Lightning Spear",
      seoTitle: "Guia da divisão de Lightning Spear (PoE2 0.5)",
      seoDescription:
        "Lightning Spear no PoE2 0.5: conversão, 5 raios, divisão com Frenzy Charge, shock, qualidade e builds.",
    },
    overview: [
      "Lightning Spear lança uma lança que libera cinco raios secundários ao acertar. Com Frenzy Charge, consome uma e divide a lança principal para três alvos; cada lança gera sua própria descarga.",
      "A lança principal converte a maior parte do dano físico em raio; os projéteis secundários convertem tudo e têm maior capacidade de shock.",
    ],
    keyPoints: [
      "Lança principal: 80% do físico convertido em raio.",
      "Raios secundários: 100% de conversão e 5 projéteis.",
      "Uma Frenzy Charge divide a lança para 3 alvos.",
    ],
    mechanics: [
      "Projéteis adicionais afetam o limite de raios secundários, não adicionam lanças principais normalmente. A lança principal não pode pierce, fork, chain ou return.",
      "Dano sustentado depende de gerar Frenzy Charge; uma fonte instável reduz cobertura e múltiplas descargas.",
    ],
    mechanicBullets: [
      "Velocidade de ataque: 60% da base.",
      "Os raios procuram alvos em 5 metros.",
      "Qualidade adiciona raios e pode duplicar benefícios de carga.",
    ],
    supports: [
      [
        "Lightning Mastery",
        "Aumenta o nível da habilidade de raio quando compatível.",
        "core",
      ],
      ["Rapid Attacks", "Compensa a baixa velocidade base de ataque.", "core"],
      [
        "Magnified Area",
        "Amplia a cobertura da explosão na limpeza.",
        "situational",
      ],
    ],
    buildUse: [
      "Amazon combina accuracy, crítico e geração de Frenzy Charge para dividir lanças constantemente na limpeza, mantendo uma rotação separada de alvo único.",
    ],
    mistakes: [
      "Não presuma que modificadores comuns de projétil adicionem lanças principais. Corrija primeiro geração de Frenzy Charge e velocidade de ataque.",
    ],
    faq: [
      [
        "O que Frenzy Charge faz?",
        "Divide a lança principal para três alvos, e cada lança dividida produz sua própria descarga de raios.",
      ],
      [
        "A lança principal pode pierce ou chain?",
        "Não. Ela segue sua própria regra de divisão e não pode pierce, fork, chain ou return.",
      ],
    ],
  },
  "adonias-ego": {
    meta: {
      title: "Adonia's Ego: Power Charges, preparação e troca de arma",
      shortTitle: "Adonia's Ego",
      summary:
        "Adonia's Ego é uma Siphoning Wand única que usa Infusion e troca de armas para preparar Power Charges em builds avançadas de spell.",
      description:
        "Guia Adonia's Ego no PoE2: Power Charges, conjuntos de armas, falhas comuns e uso em Stormweaver.",
      seoTitle: "Adonia's Ego: Power Charges e troca de arma",
      seoDescription:
        "Adonia's Ego no PoE2 0.5: preparação de Infusion, troca de armas, Power Charges, erros e usos em Stormweaver.",
    },
    overview: [
      "Adonia's Ego serve para gerar e consumir Infusion ativamente a fim de preparar Power Charges. Normalmente fica em um conjunto de armas separado para não prejudicar a arma principal de dano.",
      "Não é uma fonte passiva de cargas: configure habilidades e conjuntos corretamente e execute a sequência no início do mapa ou antes do chefe.",
    ],
    keyPoints: [
      "Faça a preparação em um conjunto de armas separado.",
      "Ative a habilidade de Infusion no conjunto correto.",
      "O conjunto principal pode usar uma varinha rara ou peça central mais forte.",
    ],
    properties: [
      [
        "Base",
        "Siphoning Wand",
        "Varinha única voltada à sequência de Infusion e Power Charge.",
      ],
      [
        "Uso principal",
        "Preparar Power Charges",
        "Apoia a preparação, não substitui a rotação de dano.",
      ],
      [
        "Risco principal",
        "Configuração de conjuntos",
        "Uma configuração errada faz o item parecer não funcionar.",
      ],
    ],
    buildUse: [
      "Builds como Adonia's Trifusion Stormweaver usam a varinha no segundo conjunto para gerar Infusion e cargas antes de voltar ao conjunto principal.",
    ],
    alternatives: [
      "Sem essa sequência, uma varinha rara com Focus costuma oferecer mais. Compre o item apenas quando a build explicar como consome as cargas.",
    ],
    mistakes: [
      "Os erros comuns são ativar a habilidade no conjunto errado ou não gerar a Infusion necessária. Conflito de Rune única entre conjuntos também pode desativar a sequência.",
    ],
    faq: [
      [
        "Ela deve ser a arma principal de dano?",
        "Geralmente não. Muitas builds 0.5 a usam no segundo conjunto e atacam com varinha mais forte ou varinha e Focus.",
      ],
      [
        "Por que não recebo cargas?",
        "Verifique a fonte de Infusion, a ativação por conjunto de armas e conflitos de Rune única.",
      ],
    ],
  },
  "sire-of-shards": {
    meta: {
      title: "Sire of Shards: projéteis circulares, spells e usos",
      shortTitle: "Sire of Shards",
      summary:
        "Sire of Shards é um Chiming Staff único com Sigil of Power, dano e velocidade de spell que adiciona 4 projéteis em círculo.",
      description:
        "Guia Sire of Shards no PoE2: modificadores, projéteis circulares, Sigil of Power, Ball Lightning, vantagens e alternativas.",
      seoTitle: "Sire of Shards e projéteis circulares (PoE2 0.5)",
      seoDescription:
        "Sire of Shards no PoE2 0.5: +4 projéteis em círculo, dano e velocidade de spell, Sigil of Power e alternativas.",
    },
    overview: [
      "Sire of Shards faz spells compatíveis lançarem quatro projéteis adicionais em círculo. Também concede Sigil of Power nível 10, dano de spell, velocidade de cast e alguma resistência elemental.",
      "O padrão circular limpa grandes áreas, mas pode reduzir dano concentrado; avalie a geometria da habilidade, não apenas o valor de dano.",
    ],
    keyPoints: [
      "Spells lançam 4 projéteis adicionais.",
      "Os projéteis saem em círculo.",
      "Concede Sigil of Power nível 10.",
    ],
    properties: [
      [
        "Dano de spell",
        "80–120% aumentado",
        "Modificador global com intervalo amplo.",
      ],
      [
        "Velocidade de cast",
        "10–20% aumentada",
        "Melhora a sensação de self-cast.",
      ],
      [
        "Projéteis",
        "+4 em círculo",
        "Altera cobertura e posicionamento contra chefes.",
      ],
      ["Nível exigido", "25", "Requisito atual da base."],
    ],
    buildUse: [
      "Spells como Ball Lightning usam a dispersão para cobrir grupos ou sobrepor projéteis perto de alvos grandes; Ballcano Blood Mage pode adotá-lo como arma de transição ou central.",
    ],
    alternatives: [
      "Quando dano concentrado, defesa ou crítico importam mais, um cajado raro, varinha com Focus ou outro único especializado pode ser melhor.",
    ],
    mistakes: [
      "Quatro projéteis extras não garantem cinco vezes mais dano em chefes: o padrão circular determina quantos atravessam o alvo.",
    ],
    faq: [
      [
        "Todos os spells recebem quatro projéteis?",
        "Apenas spells de projétil compatíveis; os demais não ganham o padrão circular.",
      ],
      [
        "A rolagem de maior dano é sempre melhor?",
        "É valiosa, mas velocidade e compatibilidade do padrão podem importar mais que uma pequena diferença de dano.",
      ],
    ],
  },
  "crown-of-the-pale-king": {
    meta: {
      title:
        "Crown of the Pale King: Thorns, modificadores e melhoria Runemaster",
      shortTitle: "Crown of the Pale King",
      summary:
        "Cultist Crown única de nível baixo que adiciona Thorns físico e permite que Thorns retalie todos os hits.",
      description:
        "Guia Crown of the Pale King no PoE2: Thorns, armadura, escudo de energia, vida, melhoria Runemaster e Warbringer.",
      seoTitle: "Crown of the Pale King e Thorns (PoE2 0.5)",
      seoDescription:
        "Crown of the Pale King no PoE2 0.5: retaliação a todos os hits, vida, defesas, melhoria e builds.",
    },
    overview: [
      "Crown of the Pale King habilita builds iniciais de retaliação ao adicionar Thorns físico e permitir que Thorns responda a todos os hits.",
      "Também oferece armadura, escudo de energia, vida máxima e raridade. O requisito é baixo e depois ela pode virar Runemastered Cultist Crown.",
    ],
    keyPoints: [
      "Thorns retalia todos os hits.",
      "Adiciona dano físico de Thorns.",
      "Pode ser melhorada para Runemastered Cultist Crown.",
    ],
    properties: [
      [
        "Defesas",
        "50–100% mais armadura e escudo de energia",
        "Intervalo local amplo.",
      ],
      ["Vida máxima", "+40–80", "Sobrevivência útil no começo."],
      [
        "Thorns",
        "10–15 a 20–25 físico",
        "Intervalo explícito atual de retaliação.",
      ],
      [
        "Efeito único",
        "Retalia todos os hits",
        "Modificador central para Thorns.",
      ],
    ],
    buildUse: [
      "Thorns Warbringer usa o elmo para disparar retaliações constantemente e escala Thorns, armor break e sobrevivência para suportar os hits que geram dano.",
    ],
    alternatives: [
      "Se a ativação já estiver resolvida ou você precisar de muito mais armadura, vida, resistências ou corrupção específica, um elmo raro defensivo é melhor.",
    ],
    mistakes: [
      "O elmo não permite ignorar defesa. É preciso sobreviver ao hit para Thorns funcionar e continuar evitando golpes fortes de chefes.",
    ],
    faq: [
      [
        "Ele ativa Thorns em cada hit?",
        "O modificador permite retaliar todos os hits, mas o personagem ainda precisa recebê-los e sobreviver.",
      ],
      [
        "Pode ser melhorado?",
        "Sim. O sistema atual de Runeforging inclui a receita de Runemastered Cultist Crown.",
      ],
    ],
  },
  "best-atlas-tree-0-5": {
    meta: {
      title: "Melhor árvore do Atlas no PoE2 0.5: primeiros 20, 40 e 60 pontos",
      shortTitle: "Árvore do Atlas 0.5",
      summary:
        "Plano em etapas: garanta Waystones e progresso seguro antes de se especializar com Atlas Master em uma única mecânica lucrativa.",
      description:
        "Guia da árvore do Atlas no PoE2 0.5 com rotas de 20/40/60 pontos, sustentação de Waystones, Atlas Master, especialização e respec.",
      imageAlt: "Doryani junto à interface do Atlas do PoE2",
      seoTitle: "Melhor árvore do Atlas no PoE2 0.5: 20/40/60 pontos",
      seoDescription:
        "Rota do Atlas no PoE2 0.5: primeiros 20, 40 e 60 pontos, Waystones, Atlas Master, mecânica lucrativa e respec.",
    },
    quickAnswers: [
      [
        "Primeira prioridade",
        "Garanta Waystones e avanço antes de investir em lucro especializado.",
      ],
      [
        "Quando especializar",
        "Quando mapas e defesas estiverem estáveis, escolha uma mecânica e combine Atlas Master e Tablet.",
      ],
      [
        "Quando fazer respec",
        "Mude se a build não completar a mecânica com segurança ou se o custo superar o retorno esperado.",
      ],
    ],
    overview: [
      "Não existe uma única árvore permanentemente melhor. A primeira resolve acesso e sustentação; a árvore de lucro vem quando o personagem completa o conteúdo alvo com consistência.",
      "Use 20/40/60 pontos como verificações e não copie uma árvore que presume equipamento e desbloqueios de endgame.",
    ],
    keyPoints: [
      "Primeiro sustentação, depois lucro.",
      "Conclua uma especialização antes de espalhar pontos.",
      "Tablet e modificadores de mapa devem servir à estratégia.",
    ],
    steps: [
      [
        "Primeiros 20 pontos",
        "Priorize Waystones, progresso e nós que estabilizem mapas comuns.",
      ],
      [
        "Por volta de 40",
        "Escolha o Atlas Master do seu ciclo e entre em uma ramificação de mecânica.",
      ],
      [
        "Por volta de 60",
        "Complete as recompensas, acrescente quantidade e raridade seguras e evite modificadores incompatíveis.",
      ],
      [
        "Depois de 60",
        "Adicione uma mecânica complementar só quando a primeira estiver estável e acessível.",
      ],
    ],
    decisions: [
      "Builds rápidas e de grande área favorecem Breach ou Delirium; builds resistentes e controladas podem lidar com Expedition e Remnants perigosos. Em SSF, priorize materiais determinísticos em vez de valores realizáveis apenas no comércio.",
    ],
    mistakes: [
      "Não copie uma árvore de alto investimento ao entrar em mapas, não divida pontos entre quatro mecânicas e não compre Tablet caros antes de provar que completa o encontro básico.",
    ],
    faq: [
      [
        "Devo pegar quantidade de itens imediatamente?",
        "Não. Ela só é útil depois de estabilizar Waystones e sobrevivência.",
      ],
      [
        "Como escolher o Atlas Master?",
        "Escolha o que fortaleça a única mecânica que você completa com maior consistência e quer repetir.",
      ],
    ],
  },
  "currency-farming-strategies-0-5": {
    meta: {
      title: "Farm de moeda no PoE2 0.5: orçamento, Atlas e risco",
      shortTitle: "Farm de moeda 0.5",
      summary:
        "Escolha estratégias pela força do personagem, custo de entrada, liquidez e risco de falha, não por números por hora que envelhecem rápido.",
      description:
        "Guia de moeda no PoE2 0.5: Expedition, Runes of Aldur, Breach, Delirium, Ritual e mapas baratos com custos e riscos.",
      imageAlt: "Moedas e materiais de crafting do PoE2",
      seoTitle: "Farm de moeda no PoE2 0.5 por orçamento",
      seoDescription:
        "Escolha uma estratégia lucrativa no PoE2 0.5: Expedition, Runes, Breach, Delirium, Ritual e configuração do Atlas.",
    },
    quickAnswers: [
      [
        "Orçamento baixo",
        "Rode mapas comuns com sustentação e venda materiais líquidos; não compre convites caros.",
      ],
      [
        "Estratégia estável",
        "Expedition e Grand Expedition têm resultados negociáveis claros, mas exigem planejar Remnants.",
      ],
      [
        "Alta variância",
        "Ritual, corridas de chefe em Delirium e apostas com Runes caras exigem mais capital e tolerância a risco.",
      ],
    ],
    overview: [
      "O lucro muda com o mercado. Este guia compara a estrutura das estratégias e não promete um número fixo de Divine Orbs por hora.",
      "Registre pelo menos 20 tentativas com custo, conclusões, itens líquidos e falhas antes de decidir se a estratégia funciona.",
    ],
    keyPoints: [
      "Liquidez importa mais que valor teórico.",
      "Uma estratégia comum concluída sempre supera uma avançada com mortes frequentes.",
      "Precifique os materiais antes de iniciar a amostra.",
    ],
    steps: [
      [
        "Estabilize mapas",
        "Use sustentação de Waystones e Tablet baratos até concluir o tier alvo sem desperdiçar portais.",
      ],
      [
        "Escolha um ciclo",
        "Selecione Expedition, Runes, Breach, Delirium ou Ritual conforme a build e os preços atuais.",
      ],
      [
        "Registre 20 tentativas",
        "Anote custo total, moeda direta, materiais líquidos, itens caros e falhas.",
      ],
      [
        "Escale após validar",
        "Compre Tablet ou convites melhores apenas se o lucro continuar positivo após descontar estoque não vendido.",
      ],
    ],
    decisions: [
      "Expedition recompensa planejamento e resistência; Breach e Delirium favorecem velocidade e área; Ritual exige bom dano em espaço fechado. Se o retorno esperado de uma Rune of Aldur cara for menor que o preço, venda diretamente.",
    ],
    mistakes: [
      "Não conte raros invendáveis por preços otimistas, não ignore mapas perdidos nem troque de estratégia por três resultados de sorte. Defina objetivo e limite de perda antes de usar materiais caros.",
    ],
    faq: [
      [
        "Qual é o início mais seguro?",
        "Mapas comuns com nós de sustentação e drops líquidos antes de comprar entradas caras para uma build não testada.",
      ],
      [
        "Quando recalcular o lucro?",
        "Sempre que patch, guia popular ou mercado mudar oferta, demanda ou custos.",
      ],
    ],
  },
  "classes-ascendancies-guide": {
    meta: {
      title: "Classes e Ascendancies do PoE2: escolha pelo estilo na 0.5",
      shortTitle: "Classes e Ascendancies",
      summary:
        "Relacione as classes atuais a melee, distância, spells, minions, transformação ou poucas teclas sem tratar tier list como resposta permanente.",
      description:
        "Escolha classe e Ascendancy no PoE2 0.5 por estilo, complexidade, defesa, SSF e disponibilidade de um guia completo.",
      imageAlt:
        "Combate representando a escolha de classe e Ascendancy no PoE2",
      seoTitle: "Guia de classes e Ascendancies do PoE2 0.5",
      seoDescription:
        "Escolha sua classe e Ascendancy no PoE2 0.5 por estilo, dificuldade, defesa, SSF e build.",
    },
    quickAnswers: [
      [
        "Escolha mais simples",
        "Escolha primeiro como quer lutar e depois um guia atual com rota completa de nivelamento.",
      ],
      [
        "Limites da classe",
        "A classe base define início das passivas e Ascendancies; a maioria das gemas não é presa à classe.",
      ],
      [
        "Posso trocar?",
        "Você pode ajustar a Ascendancy pelas regras atuais, mas não transformar uma classe base em outra.",
      ],
    ],
    overview: [
      "Escolher classe não bloqueia habilidades para sempre: define início da árvore, conveniência de atributos e Ascendancies disponíveis.",
      "Para o primeiro personagem, um guia completo importa mais que teto teórico S-tier. Procure trocas claras de habilidade, equipamento comum e defesas compreensíveis.",
    ],
    keyPoints: [
      "Warrior: armadura, golpes pesados, escudo e Thorns.",
      "Ranger/Huntress: arco, lança, mobilidade e companheiro.",
      "Sorceress/Witch: spells, triggers, minions, vida e escudo de energia.",
      "Mercenary/Monk: besta, qualidade, quarterstaff e combate veloz.",
      "Druid: transformação, plantas e ataques/spells híbridos.",
    ],
    steps: [
      [
        "Escolha a distância",
        "Decida entre melee, ataque à distância, spells, minions ou transformação.",
      ],
      [
        "Escolha a complexidade",
        "Opte por poucas teclas, combos, triggers ou recursos conforme o que deseja manter.",
      ],
      [
        "Verifique a barreira de entrada",
        "A primeira build não deve depender de único raro, anointment caro ou Ascendancy oculta.",
      ],
      [
        "Abra o guia relacionado",
        "Confirme habilidades de campanha, marcos de passivas, prioridade de equipamento e alternativas.",
      ],
    ],
    decisions: [
      "Quem valoriza velocidade pode começar com Deadeye à distância; para resistência, Warrior de escudo ou armadura. Jogadores de minions comparam Infernalist e Spirit Walker; casters escolhem entre self-cast simples e triggers avançados.",
    ],
    mistakes: [
      "Não escolha apenas pela letra da tier list, não confunda equipamento de demonstração com equipamento inicial e não fixe Ascendancy antes de testar a mecânica central.",
    ],
    faq: [
      [
        "Todas as classes usam todas as habilidades?",
        "Muitas atravessam classes se arma e atributos forem atendidos, embora posição da árvore e Ascendancy criem diferenças grandes.",
      ],
      [
        "Qual é a melhor classe para iniciantes?",
        "A que tem rota atual, barata e completa cuja rotação e defesa você entende.",
      ],
    ],
  },
  "act-1-4-boss-permanent-rewards-checklist": {
    meta: {
      title: "Lista de chefes e recompensas permanentes dos Atos 1–4",
      shortTitle: "Lista de chefes dos Atos 1–4",
      summary:
        "Separe chefes principais, objetivos opcionais com recompensas permanentes e itens de missão fáceis de perder nos Atos 1 a 4.",
      description:
        "Lista PoE2 para Atos 1–4: ordem de chefes, vida, Spirit, resistências, pontos de arma e recuperação de recompensas perdidas.",
      imageAlt:
        "Count Geonor representando a lista de chefes da campanha de PoE2",
      seoTitle: "Chefes e recompensas permanentes dos Atos 1–4 de PoE2",
      seoDescription:
        "Acompanhe chefes, vida, Spirit, resistências, pontos de passiva de arma e objetivos opcionais dos Atos 1–4 de PoE2.",
    },
    quickAnswers: [
      [
        "Chefes principais",
        "Siga os marcadores principais: essas lutas abrem a próxima área ou Ato.",
      ],
      [
        "Recompensas permanentes",
        "Antes de sair, confira objetivos que dão vida, Spirit, resistências ou pontos de arma.",
      ],
      [
        "Recompensa perdida",
        "Volte pelo Waypoint, complete o objetivo e use ou entregue o item conforme necessário.",
      ],
    ],
    overview: [
      "A página combina a rota de chefes com uma lista permanente para decidir o que é obrigatório, o que merece o desvio e o que pode esperar.",
      "Valores e rotas podem mudar com a campanha. Consulte a página de cada chefe para golpes e o guia de recompensas para a matriz numérica.",
    ],
    keyPoints: [
      "Ato 1: Beira, Crowbell, King in the Mists e Candlemass.",
      "Ato 2: Balbala abre a primeira Trial e Kabala dá pontos de arma.",
      "Ato 3: Mighty Silverfist e Ignagduk oferecem poder permanente.",
      "Ato 4 e capítulos de transição adicionam Spirit, resistências e progresso.",
    ],
    steps: [
      [
        "Ao entrar em um Ato",
        "Abra a lista e marque apenas recompensas confirmadas para o patch atual.",
      ],
      [
        "Avance a história",
        "Derrote primeiro chefes principais e ative Waypoints antes de avaliar desvios longos.",
      ],
      [
        "Colete recompensas próximas",
        "Faça imediatamente as que estiverem na rota ou resolverem um problema atual.",
      ],
      [
        "Audite antes dos mapas",
        "Recupere todas as recompensas perdidas antes de investir pesado no endgame.",
      ],
    ],
    decisions: [
      "Priorize resistências ou vida se a sobrevivência falhar; busque Spirit cedo em builds de auras, minions ou habilidades persistentes. Pontos de arma valem mais se você realmente usa duas árvores especializadas.",
    ],
    mistakes: [
      "Matar o chefe nem sempre entrega a recompensa automaticamente: alguns itens usam clique direito e outros voltam para um NPC. O King in the Mists da campanha não é o pináculo do endgame.",
    ],
    faq: [
      [
        "Posso voltar por uma recompensa perdida?",
        "Sim. Retorne ao Waypoint, complete chefe ou missão e verifique se precisa usar ou entregar o item.",
      ],
      [
        "Preciso matar todos os chefes opcionais na hora?",
        "Chefes de atributos permanentes geralmente valem a pena; um de loot comum pode esperar se o desvio for longo e não resolver nada.",
      ],
    ],
  },
  "the-executioner": {
    meta: {
      title:
        "The Executioner: golpes carregados, reforços e rota de Ogham Village",
      shortTitle: "The Executioner",
      summary:
        "Chefe principal do Ato 1 em Ogham Village cujos golpes físicos lentos, ataque vermelho frontal e reforços punem quem fica na frente.",
      description:
        "Guia The Executioner no PoE2: localização, sinais dos golpes, reforços, posição segura, resistência a fogo e progresso da missão.",
      seoTitle: "Guia The Executioner do Ato 1 (PoE2)",
      seoDescription:
        "Derrote The Executioner no PoE2: rota de Ogham Village, golpe vermelho, reforços, posição, preparação e missão.",
    },
    overview: [
      "The Executioner bloqueia a rota principal no fim de Ogham Village. Ataca devagar, mas pune muito pela frente, e os reforços lotam a arena se não forem eliminados.",
      "A opção segura é circular a média distância, rolar de lado ou atravessá-lo quando carregar e atacar durante a longa recuperação.",
    ],
    keyPoints: [
      "Local: Executioner's Block, no fim de Ogham Village.",
      "Ameaças: golpes físicos pesados e varridas frontais.",
      "Resultado: avança The Trail of Corruption.",
    ],
    strategy: [
      "Quando levantar a arma ou brilhar vermelho, saia da linha frontal: role para o lado à distância ou atravesse para as costas se estiver perto. Ataque durante a recuperação.",
      "Ao invocar mercenários, mate primeiro os inimigos à distância e percorra a borda da arena. Não force dano com projéteis e chão em chamas sobrepostos.",
    ],
    strategyBullets: [
      "Não fique na frente durante a carga.",
      "Limpe os reforços antes de voltar ao chefe.",
      "Guarde uma esquiva para o golpe vermelho em linha.",
    ],
    preparation: [
      "Melhore a habilidade principal e a arma antes de entrar. Resistência a fogo ajuda contra a área e o chão em chamas; vida e mobilidade evitam morrer em um único golpe físico.",
    ],
    faq: [
      [
        "Onde fica The Executioner?",
        "Em Executioner's Block, no fim de Ogham Village do Ato 1, normalmente do outro lado do Waypoint.",
      ],
      [
        "O que devo evitar primeiro?",
        "O golpe vermelho ou com arma levantada; depois evite a frente durante a varrida ampla.",
      ],
      [
        "O que ele desbloqueia?",
        "Avança The Trail of Corruption e abre a rota para Manor Ramparts.",
      ],
    ],
  },
};
