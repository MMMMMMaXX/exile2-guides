/** 文件职责：维护第一批 15 篇攻略的法语审校译文，不包含稳定标识与事实源 URL。 */
export const locale = "fr";
export const translator = "codex-gpt5-local-review";

export const ui = {
  sectionTitles: {
    overview: "Vue d’ensemble",
    "pros-cons": "Avantages et inconvénients",
    leveling: "Progression et transition",
    mapping: "Rotation en carte",
    bossing: "Rotation contre les boss",
    mechanics: "Mécaniques principales",
    supports: "Priorité des gemmes de soutien",
    "build-use-cases": "Utilisation dans les builds",
    properties: "Propriétés",
    alternatives: "Alternatives et améliorations",
    "common-mistakes": "Erreurs fréquentes",
    "quick-answer": "Réponse rapide",
    "progression-steps": "Parcours recommandé",
    decisions: "Règles de décision",
    strategy: "Stratégie sûre",
    "build-considerations": "Préparation du build",
    faq: "Questions fréquentes",
    sources: "Sources et vérification",
  },
  sourceLabel: "Sources actuelles et vérification croisée",
  sourceDescription:
    "Les informations ont été recoupées avec les notes officielles, les bases de données actuelles et les sources communautaires indiquées.",
  verificationNote:
    "Les mécaniques et la portée du patch ont été vérifiées avec des sources officielles, des bases actuelles et des guides communautaires ; les essais directs sur PC sont consignés séparément et ne sont pas présentés comme réalisés.",
};

export const articles = {
  "big-monkee-spirit-walker": {
    meta: {
      title: "Big Monkee Spirit Walker : de Tame Beast à l’endgame",
      shortTitle: "Big Monkee Spirit Walker",
      summary:
        "Spirit Walker axé compagnon : apprivoisez Mighty Silverfist et combinez Pounce, Maul et Pain Offering dans un build économique de la campagne à l’endgame.",
      description:
        "Guide Big Monkee Spirit Walker pour PoE2 0.5 : progression avec Twister, transition vers Tame Beast, scaling du compagnon, défenses et rotations.",
      imageAlt:
        "Mighty Silverfist utilisé par le build Big Monkee Spirit Walker",
      seoTitle: "Guide Big Monkee Spirit Walker (PoE2 0.5)",
      seoDescription:
        "Big Monkee Spirit Walker dans PoE2 0.5 : apprivoisez Mighty Silverfist et suivez la progression, l’équipement et les rotations de cartes et de boss.",
    },
    overview: [
      "Le build confie les dégâts principaux à une bête unique apprivoisée, tandis que la Huntress participe avec Pounce et Maul. Mighty Silverfist possède une excellente base de critique et constitue la cible la plus claire pendant la campagne.",
      "Tame Beast n’est pas disponible au départ. Progressez avec Twister ou une autre compétence fiable de Huntress, gardez de l’or pour la respécialisation et changez lorsque les compétences et passifs de compagnon sont prêts.",
    ],
    keyPoints: [
      "Apprivoisez Mighty Silverfist à l’acte 3.",
      "Maintenez Pain Offering contre les rares robustes et les boss.",
      "Utilisez Pounce et Maul pour contribuer aux dégâts et entretenir le vol de vie.",
    ],
    pros: [
      "Dégâts élevés avec peu de budget.",
      "Adapté au SSF après l’obtention de la bête.",
      "Le compagnon réduit la pression en carte.",
    ],
    cons: [
      "Trouver les meilleurs modificateurs de bête prend du temps.",
      "La transition de passifs coûte de l’or.",
      "L’IA du compagnon peut hésiter dans les espaces étroits.",
    ],
    leveling: [
      [
        "Actes 1 et 2",
        "Progressez avec Twister et Whirling Slash, en privilégiant vie, résistances et dégâts ajoutés aux attaques.",
      ],
      [
        "Transition à l’acte 3",
        "Après le deuxième palier d’Ascendancy, apprivoisez Mighty Silverfist et réallouez les points au compagnon et aux dégâts partagés.",
      ],
      [
        "Premières cartes",
        "Stabilisez vie, régénération de mana et armure avant les anointments ou l’équipement de luxe du compagnon.",
      ],
    ],
    mapping: [
      "Entrez dans les groupes avec Pounce, utilisez Maul pour maintenir votre contribution et laissez la bête finir. Restez à portée de son combat et replacez-la si nécessaire.",
    ],
    bossing: [
      "Commencez par Pain Offering, maintenez le compagnon sur le boss et utilisez Pounce pour traverser les zones dangereuses. Renouvelez l’offrande uniquement pendant une fenêtre sûre.",
    ],
    faq: [
      [
        "Quand passer à Tame Beast ?",
        "La gemme est disponible au palier 7, mais la transition est généralement plus fluide après la deuxième Ascendancy et avec assez de passifs de compagnon.",
      ],
      [
        "Mighty Silverfist est-il obligatoire ?",
        "Non. D’autres bêtes uniques fonctionnent, mais Mighty Silverfist reste le choix mono-cible le plus évident pendant la campagne.",
      ],
    ],
  },
  "grenade-gemling-legionnaire": {
    meta: {
      title: "Gemling Legionnaire grenades : progression, cartes et boss",
      shortTitle: "Gemling grenades",
      summary:
        "Build arbalète qui nettoie avec Explosive Shot et concentre ses grenades pour le burst, en exploitant la qualité Gemling, Mirage Archer et des défenses superposées.",
      description:
        "Guide Gemling Legionnaire grenades pour PoE2 0.5 : changements de compétences, Explosive, Cluster et Oil Grenade, équipement et rotations.",
      imageAlt: "Gemling Legionnaire utilisant une arbalète et des grenades",
      seoTitle: "Gemling Legionnaire grenades (PoE2 0.5)",
      seoDescription:
        "Progression et endgame du Gemling grenades dans PoE2 0.5 : qualité, défenses et rotations de cartes et de boss.",
    },
    overview: [
      "Explosive Shot assure le nettoyage courant ; Explosive Grenade et Cluster Grenade fournissent le burst. Oil Grenade augmente les dégâts de feu et Flash Grenade crée une fenêtre défensive d’étourdissement.",
      "Gemling Legionnaire valorise fortement le niveau et la qualité des gemmes. Pendant la campagne, renouveler une arbalète à forts dégâts compte davantage que poursuivre un unique coûteux sans synergie.",
    ],
    keyPoints: [
      "Gardez les dégâts de l’arbalète au niveau de la zone.",
      "Utilisez Mirage Archer pour automatiser une partie des grenades.",
      "Privilégiez vie, résistances, évasion et deflection avant les dégâts de luxe.",
    ],
    pros: [
      "Nettoyage rapide et fort burst sur les boss.",
      "Parcours de campagne direct.",
      "Combine armure, évasion et bouclier d’énergie.",
    ],
    cons: [
      "Les explosions nuisent à la lisibilité.",
      "Qualité et récupération coûtent cher en endgame.",
      "Il faut maîtriser mèches et points de chute.",
    ],
    leveling: [
      [
        "Acte 1",
        "Utilisez Permafrost Bolts et Fragmentation Rounds et améliorez souvent l’arbalète.",
      ],
      [
        "Acte 2",
        "Passez à Explosive Shot pour nettoyer et ajoutez Explosive Grenade et Flash Grenade.",
      ],
      [
        "À partir de l’acte 3",
        "Ajoutez Mirage Archer puis Cluster Grenade ; prenez l’Ascendancy de qualité lorsque ses gains deviennent concrets.",
      ],
    ],
    mapping: [
      "Tirez Explosive Shot en avançant, lancez Explosive Grenade sur les groupes résistants et laissez Mirage Archer finir. Gardez Flash Grenade pour les rares dangereux.",
    ],
    bossing: [
      "Posez Oil Grenade, déployez Cluster et Explosive Grenade puis maintenez Explosive Shot. Ne dépensez pas toutes les charges juste avant un changement de phase.",
    ],
    faq: [
      [
        "Quel attribut privilégier sur l’arbalète ?",
        "Des dégâts d’arme élevés et des niveaux utiles aux compétences de projectile ; une rare adaptée dépasse un unique sans synergie.",
      ],
      [
        "Quand prendre Advanced Thaumaturgy ?",
        "Quand les grenades principales ont assez de qualité pour obtenir de vrais gains de récupération, projectiles ou dégâts.",
      ],
    ],
  },
  "lightning-arrow-deadeye": {
    meta: {
      title: "Lightning Arrow Deadeye : du league start à l’endgame",
      shortTitle: "Lightning Arrow Deadeye",
      summary:
        "Archère rapide avec Lightning Arrow, détonations de Lightning Rod, Herald of Thunder et mirages de Deadeye, avec transition progressive du non-critique au critique.",
      description:
        "Guide Lightning Arrow Deadeye pour PoE2 0.5 : progression, placement de Lightning Rod, Mirage Archer, arc et défenses.",
      imageAlt: "Deadeye attaquant avec un arc rapide de foudre",
      seoTitle: "Guide Lightning Arrow Deadeye (PoE2 0.5)",
      seoDescription:
        "Lightning Arrow Deadeye dans PoE2 0.5 : progression, Lightning Rod, améliorations d’arc et configurations cartes et boss pinnacle.",
    },
    overview: [
      "Lightning Arrow nettoie rapidement et Lightning Rod transforme les flèches répétées en dégâts concentrés contre les boss. Herald of Thunder et les mirages élargissent la couverture sans remplacer un bon placement des Rods.",
      "Commencez avec un arc physique puissant et une version non critique ; passez au critique seulement lorsque précision, chance de critique et défenses sont stables.",
    ],
    keyPoints: [
      "Lightning Arrow suffit généralement en carte normale.",
      "Posez plusieurs Lightning Rod avant d’attaquer un boss.",
      "Privilégiez la qualité de Lightning Rod avant les outils secondaires.",
    ],
    pros: [
      "Vitesse de nettoyage exceptionnelle.",
      "Progression de campagne fluide.",
      "Évolue jusqu’au contenu pinnacle.",
    ],
    cons: [
      "Défenses légères au départ.",
      "Les dégâts de boss demandent de préparer la combinaison.",
      "Les arcs et objets critiques finaux sont coûteux.",
    ],
    leveling: [
      [
        "Campagne",
        "Progressez avec Lightning Arrow et Lightning Rod et remplacez l’arc physique lorsqu’il accuse du retard sur la zone.",
      ],
      [
        "Premières cartes",
        "Gardez les passifs non critiques, capez les résistances et stabilisez l’évasion.",
      ],
      [
        "Transition critique",
        "Changez uniquement avec précision, dégâts d’arc, critique et défenses prêts, et si le nouvel ensemble est réellement meilleur.",
      ],
    ],
    mapping: [
      "Utilisez Lightning Arrow sur les groupes ordinaires. Posez Lightning Rod sous les rares robustes et continuez à tirer pour superposer chaînes et détonations.",
    ],
    bossing: [
      "Préparez plusieurs Lightning Rod, ajoutez Tornado Shot si la variante l’utilise et enchaînez Lightning Arrow. Sur les pinnacle, remplacez les soutiens de zone par du dégât concentré si nécessaire.",
    ],
    faq: [
      [
        "Lightning Rod reste-t-elle nécessaire en 0.5 ?",
        "Oui. Malgré ses ajustements, elle demeure la composante principale des dégâts mono-cible.",
      ],
      [
        "Puis-je commencer directement en critique ?",
        "Ce n’est pas conseillé. La version non critique est plus fiable avant d’avoir précision, équipement et défenses.",
      ],
    ],
  },
  tornado: {
    meta: {
      title: "Tornado : sol élémentaire, limite et dégâts sur la durée",
      shortTitle: "Tornado",
      summary:
        "Tornado crée une tempête de dégâts physiques sur la durée qui attire les ennemis et absorbe un sol élémentaire pour ajouter l’élément correspondant.",
      description:
        "Guide Tornado dans PoE2 : durée de 8 secondes, limite, absorption du sol élémentaire, scaling, soutiens et builds.",
      imageAlt: "Tempête Tornado créée par un build Acolyte of Chayula",
      seoTitle: "Guide Tornado et absorption du sol (PoE2 0.5)",
      seoDescription:
        "Tornado dans PoE2 0.5 : dégâts physiques sur la durée, sol élémentaire, durée, limite, soutiens et usages.",
    },
    overview: [
      "Tornado génère une tempête qui attire les ennemis proches et inflige des dégâts physiques sur la durée. En chevauchant un sol élémentaire, elle absorbe son debuff et ajoute les dégâts de l’élément correspondant.",
      "Sa durée de base est de 8 secondes et sa limite de un ; la qualité peut augmenter durée et quantité simultanée.",
    ],
    keyPoints: [
      "Les dégâts de sorts affectent son debuff de dégâts sur la durée.",
      "Le rayon de la tempête est de 3 mètres.",
      "Les variantes élémentaires dépendent du bon sol absorbé.",
    ],
    mechanics: [
      "Le cœur de Tornado est le dégât sur la durée, pas une succession de hits. Le sol élémentaire modifie le debuff appliqué et le type de dégâts supplémentaires.",
      "Augmenter la limite autorise plusieurs tempêtes et la durée détermine leur couverture. Ne la confondez pas avec Tornado Shot.",
    ],
    mechanicBullets: [
      "Durée de base : 8 secondes.",
      "Limite de base : 1 Tornado.",
      "La qualité peut augmenter durée et limite.",
    ],
    supports: [
      [
        "Prolonged Duration",
        "Étend la couverture et réduit la fréquence de relance.",
        "core",
      ],
      [
        "Magnified Area",
        "Améliore l’attraction et la couverture en carte.",
        "situational",
      ],
      [
        "Physical Mastery",
        "Augmente le niveau de la compétence physique.",
        "core",
      ],
    ],
    buildUse: [
      "Convient aux chaînes de déclenchement Archon, aux builds physiques sur la durée et aux combinaisons capables de placer de manière fiable un sol élémentaire sous la tempête.",
    ],
    mistakes: [
      "Ne scalez pas uniquement les dégâts de hit. Vérifiez que le sol chevauche réellement Tornado au lieu de supposer qu’un sol proche a été absorbé.",
    ],
    faq: [
      [
        "Tornado peut-elle absorber plusieurs éléments ?",
        "Elle peut obtenir les dégâts supplémentaires des sols absorbés ; le build doit garantir chaque chevauchement et sa durée.",
      ],
      [
        "Tornado et Tornado Shot sont-elles identiques ?",
        "Non. Tornado est un sort de dégâts sur la durée ; Tornado Shot est une attaque de projectile distincte.",
      ],
    ],
  },
  "ball-lightning": {
    meta: {
      title: "Ball Lightning : fréquence des éclairs, Fire Infusion et shock",
      shortTitle: "Ball Lightning",
      summary:
        "Ball Lightning lance un projectile lent qui ne touche pas lui-même et décharge des éclairs sur les cibles proches toutes les 0,2 seconde.",
      description:
        "Guide Ball Lightning dans PoE2 : fréquence, shock, vitesse, Fire Infusion, sol brûlant, soutiens et Blood Mage.",
      imageAlt: "Blood Mage lançant Ball Lightning",
      seoTitle: "Guide Ball Lightning et Infusion (PoE2 0.5)",
      seoDescription:
        "Ball Lightning dans PoE2 0.5 : décharges toutes les 0,2 s, shock, Fire Infusion, vitesse, soutiens et builds.",
    },
    overview: [
      "Ball Lightning fait avancer lentement une sphère parmi les ennemis. La sphère ne touche pas : elle libère des éclairs répétés et une même cible peut recevoir une décharge toutes les 0,2 seconde.",
      "En consommant Fire Infusion, la sphère ralentit, laisse un sol brûlant et produit une explosion de feu en disparaissant.",
    ],
    keyPoints: [
      "Le projectile ne touche pas.",
      "Le rayon de recherche est de 1,8 mètre.",
      "La compétence possède une très forte chance de shock.",
    ],
    mechanics: [
      "Une vitesse réduite maintient la sphère près du boss plus longtemps ; trop de vitesse peut diminuer le nombre de décharges. Zone et placement déterminent le temps passé dans le rayon.",
      "Fire Infusion ajoute une branche séparée de sol et d’explosion de feu qui doit être scalée volontairement.",
    ],
    mechanicBullets: [
      "Intervalle par cible : 0,2 seconde.",
      "Rayon de cible : 1,8 mètre.",
      "Chance critique de base : 9 %.",
    ],
    supports: [
      [
        "Considered Casting",
        "Utile en self-cast si la perte de vitesse est acceptable.",
        "situational",
      ],
      [
        "Magnified Area",
        "Réduit les contraintes de placement au nettoyage.",
        "situational",
      ],
      [
        "Lightning Mastery",
        "Augmente le niveau dans les builds foudre compatibles.",
        "core",
      ],
    ],
    buildUse: [
      "Ballcano Blood Mage utilise Ball Lightning pour nettoyer et appliquer shock, puis Volcano ou un autre sort pour concentrer les dégâts sur les boss.",
    ],
    mistakes: [
      "N’évaluez pas les dégâts au contact de la sphère puisqu’elle ne touche pas. Évitez aussi une vitesse qui traverse la cible avant assez de décharges.",
    ],
    faq: [
      [
        "La sphère touche-t-elle en traversant un ennemi ?",
        "Non ; les dégâts proviennent des éclairs qu’elle libère à répétition.",
      ],
      [
        "Pourquoi utiliser Fire Infusion ?",
        "Elle ajoute un sol brûlant et une explosion finale, utile dans les builds hybrides qui génèrent et scalent Infusion.",
      ],
    ],
  },
  "gas-grenade": {
    meta: {
      title: "Gas Grenade : nuage de poison, détonation et récupération",
      shortTitle: "Gas Grenade",
      summary:
        "Gas Grenade crée un nuage de poison croissant que le feu ou une compétence Detonator peut transformer en explosion ; la limite est de 6 nuages.",
      description:
        "Guide Gas Grenade dans PoE2 : limite de nuages, poison, détonation de feu, récupération, soutiens et rotation Pathfinder.",
      imageAlt: "Pathfinder lançant Gas Grenade",
      seoTitle: "Gas Grenade : poison et détonation (PoE2 0.5)",
      seoDescription:
        "Gas Grenade dans PoE2 0.5 : limite de 6 nuages, feu, récupération, qualité, soutiens et builds.",
    },
    overview: [
      "Gas Grenade rebondit et libère du gaz à la fin de sa mèche. Le nuage applique poison comme un hit sans être un hit normal et grandit ; une brûlure ou un Detonator compatible provoque une explosion de feu.",
      "La compétence stocke plusieurs charges de récupération et maintient au maximum six nuages, donc la rotation dépend du chevauchement, de la durée et de la recharge.",
    ],
    keyPoints: [
      "Maximum de 6 nuages.",
      "Brûlure ou Detonator fait exploser le nuage.",
      "La qualité améliore récupération et dégâts de feu.",
    ],
    mechanics: [
      "Le nuage de poison et l’explosion ne se scalent pas pareil. La branche poison recherche chaos, magnitude et durée ; la branche explosion nécessite une brûlure ou un Detonator fiable.",
      "Depuis 0.3, la compétence respecte strictement la mèche de grenade, il faut donc anticiper les cibles mobiles.",
    ],
    mechanicBullets: [
      "Stocke 3 utilisations de récupération.",
      "Le nuage grandit jusqu’à sa limite actuelle.",
      "Il ne touche pas normalement mais applique poison comme un hit.",
    ],
    supports: [
      [
        "Second Wind",
        "Ajoute de la souplesse de charges pendant le burst.",
        "core",
      ],
      [
        "Persistent Ground",
        "Prolonge la couverture des nuages.",
        "situational",
      ],
      [
        "Fire Mastery",
        "Soutient la branche de détonation de feu.",
        "situational",
      ],
    ],
    buildUse: [
      "Pathfinder peut préparer des nuages avant l’arrivée du boss, cumuler Wither et Despair, puis entretenir le poison ou détoner pour des dégâts de feu.",
    ],
    mistakes: [
      "Ne scalez pas poison et feu sans choisir de branche principale. Respectez la limite de six nuages et n’épuisez pas les charges avant que le boss soit ciblable.",
    ],
    faq: [
      [
        "Le nuage peut-il empoisonner sans hit ?",
        "Oui. Ce n’est pas un hit normal, mais il applique poison comme s’il en était un.",
      ],
      [
        "Qu’est-ce qui fait exploser le nuage ?",
        "Les effets de brûlure et les compétences Detonator compatibles déclenchent l’explosion de feu.",
      ],
    ],
  },
  "lightning-spear": {
    meta: {
      title: "Lightning Spear : division avec Frenzy Charge, éclairs et shock",
      shortTitle: "Lightning Spear",
      summary:
        "Lightning Spear libère 5 éclairs à l’impact ; avec une Frenzy Charge, elle consomme une charge et divise la lance principale vers 3 cibles.",
      description:
        "Guide Lightning Spear dans PoE2 : conversion foudre, division Frenzy Charge, projectiles secondaires, shock, qualité et Amazon.",
      imageAlt: "Amazon lançant Lightning Spear",
      seoTitle: "Guide de la division Lightning Spear (PoE2 0.5)",
      seoDescription:
        "Lightning Spear dans PoE2 0.5 : conversion, 5 éclairs, division Frenzy Charge, shock, qualité et builds.",
    },
    overview: [
      "Lightning Spear lance un javelot qui libère cinq éclairs secondaires à l’impact. Avec une Frenzy Charge, elle en consomme une et divise la lance principale vers trois cibles ; chaque lance produit sa propre décharge.",
      "La lance principale convertit la majeure partie du physique en foudre ; les projectiles secondaires le convertissent entièrement et appliquent mieux shock.",
    ],
    keyPoints: [
      "Lance principale : 80 % du physique converti en foudre.",
      "Éclairs secondaires : 100 % de conversion et 5 projectiles.",
      "Une Frenzy Charge divise la lance vers 3 cibles.",
    ],
    mechanics: [
      "Les projectiles supplémentaires affectent la limite des éclairs secondaires, sans ajouter normalement de lance principale. Celle-ci ne peut pas pierce, fork, chain ou return.",
      "Les dégâts soutenus dépendent de la génération de Frenzy Charge ; une source instable réduit couverture et décharges multiples.",
    ],
    mechanicBullets: [
      "Vitesse d’attaque : 60 % de la base.",
      "Les éclairs cherchent des cibles dans 5 mètres.",
      "La qualité ajoute des éclairs et peut doubler les bénéfices de charge.",
    ],
    supports: [
      [
        "Lightning Mastery",
        "Augmente le niveau de la compétence foudre si compatible.",
        "core",
      ],
      [
        "Rapid Attacks",
        "Compense la faible vitesse d’attaque de base.",
        "core",
      ],
      [
        "Magnified Area",
        "Étend la couverture du burst au nettoyage.",
        "situational",
      ],
    ],
    buildUse: [
      "Amazon combine précision, critique et génération de Frenzy Charge pour diviser régulièrement les lances en nettoyage, tout en gardant une rotation mono-cible distincte.",
    ],
    mistakes: [
      "Ne supposez pas que les modificateurs ordinaires de projectiles ajoutent des lances principales. Corrigez d’abord génération de Frenzy Charge et vitesse d’attaque.",
    ],
    faq: [
      [
        "Que fait Frenzy Charge ?",
        "Elle divise la lance principale vers trois cibles, et chaque lance divisée produit sa propre décharge d’éclairs.",
      ],
      [
        "La lance principale peut-elle pierce ou chain ?",
        "Non. Elle suit sa propre règle de division et ne peut pas pierce, fork, chain ou return.",
      ],
    ],
  },
  "adonias-ego": {
    meta: {
      title: "Adonia's Ego : Power Charges, préparation et changement d’arme",
      shortTitle: "Adonia's Ego",
      summary:
        "Adonia's Ego est une Siphoning Wand unique qui utilise Infusion et le changement d’arme pour préparer des Power Charges dans les builds de sorts avancés.",
      description:
        "Guide Adonia's Ego dans PoE2 : Power Charges, ensembles d’armes, pannes fréquentes et usage Stormweaver.",
      seoTitle: "Adonia's Ego : Power Charges et changement d’arme",
      seoDescription:
        "Adonia's Ego dans PoE2 0.5 : préparation d’Infusion, changement d’arme, Power Charges, erreurs et usages Stormweaver.",
    },
    overview: [
      "Adonia's Ego sert à générer puis consommer activement Infusion afin de préparer des Power Charges. Elle occupe généralement un ensemble d’armes séparé pour ne pas pénaliser l’arme principale.",
      "Ce n’est pas une source passive de charges : configurez correctement compétences et ensembles, puis exécutez la séquence au début d’une carte ou avant un boss.",
    ],
    keyPoints: [
      "Effectuez la préparation dans un ensemble d’armes séparé.",
      "Activez la compétence d’Infusion dans le bon ensemble.",
      "L’ensemble principal peut employer une baguette rare ou une pièce centrale plus puissante.",
    ],
    properties: [
      [
        "Base",
        "Siphoning Wand",
        "Baguette unique dédiée à la séquence Infusion et Power Charge.",
      ],
      [
        "Usage principal",
        "Préparer les Power Charges",
        "Soutient la préparation sans remplacer la rotation de dégâts.",
      ],
      [
        "Risque principal",
        "Configuration des ensembles",
        "Un mauvais réglage donne l’impression que l’objet ne fonctionne pas.",
      ],
    ],
    buildUse: [
      "Des builds comme Adonia's Trifusion Stormweaver la placent dans le second ensemble pour générer Infusion et charges avant de revenir à l’ensemble principal.",
    ],
    alternatives: [
      "Sans cette séquence, une baguette rare avec Focus offre souvent davantage. Achetez l’objet seulement si le build explique comment les charges sont consommées.",
    ],
    mistakes: [
      "Les erreurs courantes sont une compétence active dans le mauvais ensemble ou l’absence de l’Infusion nécessaire. Un conflit de Rune unique entre les ensembles peut également désactiver la séquence.",
    ],
    faq: [
      [
        "Doit-elle être l’arme principale de dégâts ?",
        "Généralement non. De nombreux builds 0.5 la gardent dans le second ensemble et attaquent avec une baguette plus puissante ou baguette plus Focus.",
      ],
      [
        "Pourquoi ne reçois-je aucune charge ?",
        "Vérifiez la source d’Infusion, l’activation par ensemble d’armes et les conflits de Rune unique.",
      ],
    ],
  },
  "sire-of-shards": {
    meta: {
      title: "Sire of Shards : projectiles circulaires, sorts et usages",
      shortTitle: "Sire of Shards",
      summary:
        "Sire of Shards est un Chiming Staff unique avec Sigil of Power, dégâts et vitesse de sorts qui ajoute 4 projectiles en cercle.",
      description:
        "Guide Sire of Shards dans PoE2 : modificateurs, projectiles circulaires, Sigil of Power, Ball Lightning, compromis et alternatives.",
      seoTitle: "Sire of Shards et projectiles circulaires (PoE2 0.5)",
      seoDescription:
        "Sire of Shards dans PoE2 0.5 : +4 projectiles circulaires, dégâts et vitesse de sorts, Sigil of Power et alternatives.",
    },
    overview: [
      "Sire of Shards fait lancer quatre projectiles supplémentaires en cercle aux sorts compatibles. Il accorde aussi Sigil of Power niveau 10, dégâts de sorts, vitesse d’incantation et un peu de résistance élémentaire.",
      "Le motif circulaire nettoie une large zone mais peut réduire les dégâts concentrés ; évaluez la géométrie de la compétence, pas seulement la valeur de dégâts.",
    ],
    keyPoints: [
      "Les sorts lancent 4 projectiles supplémentaires.",
      "Les projectiles partent en cercle.",
      "Accorde Sigil of Power niveau 10.",
    ],
    properties: [
      [
        "Dégâts de sorts",
        "80–120 % augmentés",
        "Modificateur global à large plage.",
      ],
      [
        "Vitesse d’incantation",
        "10–20 % augmentée",
        "Améliore le confort en self-cast.",
      ],
      [
        "Projectiles",
        "+4 en cercle",
        "Modifie couverture et placement contre les boss.",
      ],
      ["Niveau requis", "25", "Condition actuelle de la base."],
    ],
    buildUse: [
      "Des sorts comme Ball Lightning utilisent la dispersion pour couvrir les groupes ou superposer les projectiles près de grandes cibles ; Ballcano Blood Mage peut en faire une arme de transition ou centrale.",
    ],
    alternatives: [
      "Lorsque dégâts concentrés, défenses ou critique priment, un bâton rare, une baguette avec Focus ou un autre unique spécialisé peut être supérieur.",
    ],
    mistakes: [
      "Quatre projectiles supplémentaires ne garantissent pas cinq fois les dégâts sur boss : le motif circulaire détermine combien traversent réellement la cible.",
    ],
    faq: [
      [
        "Tous les sorts reçoivent-ils quatre projectiles ?",
        "Uniquement les sorts de projectile compatibles ; les autres n’obtiennent pas le motif circulaire.",
      ],
      [
        "Le jet de dégâts maximal est-il toujours meilleur ?",
        "Il compte, mais la vitesse et la compatibilité du motif peuvent dépasser une petite différence de dégâts.",
      ],
    ],
  },
  "crown-of-the-pale-king": {
    meta: {
      title:
        "Crown of the Pale King : Thorns, modificateurs et amélioration Runemaster",
      shortTitle: "Crown of the Pale King",
      summary:
        "Cultist Crown unique de bas niveau qui ajoute des Thorns physiques et permet à Thorns de riposter à tous les hits.",
      description:
        "Guide Crown of the Pale King dans PoE2 : Thorns, armure, bouclier d’énergie, vie, amélioration Runemaster et Warbringer.",
      seoTitle: "Crown of the Pale King et Thorns (PoE2 0.5)",
      seoDescription:
        "Crown of the Pale King dans PoE2 0.5 : riposte à tous les hits, vie, défenses, amélioration et builds.",
    },
    overview: [
      "Crown of the Pale King rend possibles les premiers builds de riposte en ajoutant des Thorns physiques et en permettant à Thorns de répondre à tous les hits.",
      "Elle offre aussi armure, bouclier d’énergie, vie maximale et rareté. Son prérequis est faible et elle peut devenir Runemastered Cultist Crown.",
    ],
    keyPoints: [
      "Thorns riposte à tous les hits.",
      "Ajoute des dégâts physiques de Thorns.",
      "Peut être améliorée en Runemastered Cultist Crown.",
    ],
    properties: [
      [
        "Défenses",
        "50–100 % d’armure et de bouclier d’énergie en plus",
        "Large plage locale.",
      ],
      ["Vie maximale", "+40–80", "Survie utile au départ."],
      [
        "Thorns",
        "10–15 à 20–25 physiques",
        "Plage explicite actuelle de riposte.",
      ],
      [
        "Effet unique",
        "Riposte à tous les hits",
        "Modificateur central pour Thorns.",
      ],
    ],
    buildUse: [
      "Thorns Warbringer utilise le casque pour déclencher régulièrement les ripostes puis scale Thorns, armor break et survie afin d’encaisser les hits qui alimentent les dégâts.",
    ],
    alternatives: [
      "Si le déclenchement est déjà résolu ou si vous avez besoin de beaucoup plus d’armure, vie, résistances ou d’une corruption précise, un casque rare défensif est préférable.",
    ],
    mistakes: [
      "Le casque ne permet pas d’ignorer les défenses. Il faut survivre au hit pour que Thorns fonctionne et continuer à esquiver les lourdes attaques de boss.",
    ],
    faq: [
      [
        "Déclenche-t-il Thorns à chaque hit ?",
        "Le modificateur autorise la riposte à tous les hits, mais le personnage doit toujours les recevoir et y survivre.",
      ],
      [
        "Peut-on l’améliorer ?",
        "Oui. Le système Runeforging actuel comporte la recette Runemastered Cultist Crown.",
      ],
    ],
  },
  "best-atlas-tree-0-5": {
    meta: {
      title:
        "Meilleur arbre de l’Atlas PoE2 0.5 : 20, 40 et 60 premiers points",
      shortTitle: "Arbre de l’Atlas 0.5",
      summary:
        "Plan par étapes : assurez les Waystones et une progression sûre avant de vous spécialiser avec un Atlas Master dans une mécanique rentable.",
      description:
        "Guide de l’arbre de l’Atlas PoE2 0.5 : parcours 20/40/60 points, maintien des Waystones, Atlas Master, spécialisation et respécialisation.",
      imageAlt: "Doryani près de l’interface de l’Atlas de PoE2",
      seoTitle: "Meilleur arbre de l’Atlas PoE2 0.5 : 20/40/60 points",
      seoDescription:
        "Parcours de l’Atlas PoE2 0.5 : 20, 40 et 60 premiers points, Waystones, Atlas Master, mécanique rentable et respec.",
    },
    quickAnswers: [
      [
        "Première priorité",
        "Assurez Waystones et progression avant d’investir dans un rendement spécialisé.",
      ],
      [
        "Quand se spécialiser",
        "Quand cartes et défenses sont stables, choisissez une mécanique et associez son Atlas Master et ses Tablet.",
      ],
      [
        "Quand respécialiser",
        "Changez si le build ne termine pas la mécanique en sécurité ou si le coût dépasse le rendement attendu.",
      ],
    ],
    overview: [
      "Il n’existe pas un unique meilleur arbre permanent. Le premier résout l’accès et le maintien ; l’arbre de rendement vient lorsque le personnage termine régulièrement le contenu visé.",
      "Considérez 20/40/60 points comme des contrôles et ne copiez pas un arbre qui suppose équipement et déblocages d’endgame.",
    ],
    keyPoints: [
      "D’abord le maintien, ensuite le rendement.",
      "Terminez une spécialisation avant de disperser les points.",
      "Tablet et mods de carte doivent servir la stratégie.",
    ],
    steps: [
      [
        "20 premiers points",
        "Privilégiez Waystones, progression et nœuds qui stabilisent les cartes ordinaires.",
      ],
      [
        "Vers 40 points",
        "Choisissez l’Atlas Master de votre boucle et entrez dans une branche mécanique.",
      ],
      [
        "Vers 60 points",
        "Terminez ses récompenses, ajoutez quantité et rareté sûres et évitez les mods incompatibles.",
      ],
      [
        "Après 60 points",
        "Ajoutez une mécanique complémentaire uniquement lorsque la première est stable et abordable.",
      ],
    ],
    decisions: [
      "Les builds rapides à grande zone favorisent Breach ou Delirium ; les builds robustes et contrôlés gèrent Expedition et Remnants dangereux. En SSF, privilégiez les matériaux déterministes plutôt que la valeur réalisable uniquement en commerce.",
    ],
    mistakes: [
      "Ne copiez pas un arbre à fort investissement en arrivant en carte, ne répartissez pas les points entre quatre mécaniques et n’achetez pas de Tablet chers avant de réussir la rencontre de base.",
    ],
    faq: [
      [
        "Faut-il prendre immédiatement la quantité d’objets ?",
        "Non. Elle n’a de valeur qu’après stabilisation des Waystones et de la survie.",
      ],
      [
        "Comment choisir Atlas Master ?",
        "Choisissez celui qui renforce l’unique mécanique que vous terminez le plus régulièrement et souhaitez répéter.",
      ],
    ],
  },
  "currency-farming-strategies-0-5": {
    meta: {
      title: "Farm de monnaie PoE2 0.5 : budget, Atlas et risque",
      shortTitle: "Farm de monnaie 0.5",
      summary:
        "Choisissez selon puissance du personnage, coût d’entrée, liquidité et risque d’échec, pas selon des chiffres horaires qui vieillissent vite.",
      description:
        "Guide monnaie PoE2 0.5 : Expedition, Runes of Aldur, Breach, Delirium, Ritual et cartes économiques avec coûts et risques.",
      imageAlt: "Monnaies et matériaux de craft de PoE2",
      seoTitle: "Farm de monnaie PoE2 0.5 selon le budget",
      seoDescription:
        "Choisissez une stratégie rentable PoE2 0.5 : Expedition, Runes, Breach, Delirium, Ritual et configuration de l’Atlas.",
    },
    quickAnswers: [
      [
        "Petit budget",
        "Jouez des cartes normales avec maintien et vendez les matériaux liquides ; n’achetez pas d’invitations coûteuses.",
      ],
      [
        "Stratégie stable",
        "Expedition et Grand Expedition ont des produits négociables clairs, mais demandent de planifier les Remnants.",
      ],
      [
        "Forte variance",
        "Ritual, boss rush Delirium et paris avec Runes chères exigent davantage de capital et de tolérance au risque.",
      ],
    ],
    overview: [
      "Le profit change avec le marché. Ce guide compare la structure des stratégies sans promettre un nombre fixe de Divine Orbs par heure.",
      "Consignez au moins 20 tentatives avec coûts, réussites, objets liquides et échecs avant de juger une stratégie.",
    ],
    keyPoints: [
      "La liquidité compte plus que la valeur théorique.",
      "Une stratégie ordinaire toujours terminée dépasse une stratégie avancée avec morts fréquentes.",
      "Évaluez les matériaux avant l’échantillon.",
    ],
    steps: [
      [
        "Stabilisez les cartes",
        "Utilisez maintien des Waystones et Tablet bon marché jusqu’à terminer le tier visé sans gaspiller de portails.",
      ],
      [
        "Choisissez une boucle",
        "Sélectionnez Expedition, Runes, Breach, Delirium ou Ritual selon le build et les prix actuels.",
      ],
      [
        "Consignez 20 tentatives",
        "Notez coût total, monnaie directe, matériaux liquides, objets chers et échecs.",
      ],
      [
        "Augmentez après validation",
        "Achetez de meilleurs Tablet ou invitations seulement si le profit reste positif après retrait du stock invendu.",
      ],
    ],
    decisions: [
      "Expedition récompense planification et robustesse ; Breach et Delirium favorisent vitesse et zone ; Ritual exige de bons dégâts en espace clos. Si l’espérance d’une Rune of Aldur chère est inférieure au prix, vendez-la.",
    ],
    mistakes: [
      "Ne comptez pas les rares invendables à des prix optimistes, n’ignorez pas les cartes perdues et ne changez pas après trois coups de chance. Définissez résultat et limite de perte avant un craft cher.",
    ],
    faq: [
      [
        "Quel est le départ le plus sûr ?",
        "Des cartes ordinaires avec nœuds de maintien et drops liquides avant d’acheter des accès chers pour un build non validé.",
      ],
      [
        "Quand recalculer le profit ?",
        "Chaque fois qu’un patch, un guide populaire ou le marché change offre, demande ou coûts.",
      ],
    ],
  },
  "classes-ascendancies-guide": {
    meta: {
      title: "Classes et Ascendancies de PoE2 : choisir par style en 0.5",
      shortTitle: "Classes et Ascendancies",
      summary:
        "Associez les classes actuelles à mêlée, distance, sorts, minions, transformation ou faible nombre de touches sans traiter une tier list comme vérité permanente.",
      description:
        "Choisissez classe et Ascendancy PoE2 0.5 selon style, complexité, défense, SSF et disponibilité d’un guide complet.",
      imageAlt:
        "Combat illustrant le choix d’une classe et Ascendancy dans PoE2",
      seoTitle: "Guide des classes et Ascendancies PoE2 0.5",
      seoDescription:
        "Choisissez votre classe et Ascendancy PoE2 0.5 selon style, difficulté, défense, SSF et build.",
    },
    quickAnswers: [
      [
        "Choix le plus simple",
        "Choisissez d’abord votre manière de combattre puis un guide actuel avec progression complète.",
      ],
      [
        "Limites de classe",
        "La classe de base fixe départ des passifs et Ascendancies ; la plupart des gemmes ne sont pas verrouillées par classe.",
      ],
      [
        "Peut-on changer ?",
        "Vous pouvez ajuster l’Ascendancy selon les règles actuelles, mais pas convertir une classe de base en une autre.",
      ],
    ],
    overview: [
      "Le choix de classe ne verrouille pas les compétences à vie : il détermine départ de l’arbre, facilité d’attributs et Ascendancies disponibles.",
      "Pour un premier personnage, un guide complet compte plus qu’un plafond théorique S-tier. Cherchez des changements de compétences clairs, de l’équipement courant et des défenses compréhensibles.",
    ],
    keyPoints: [
      "Warrior : armure, frappes lourdes, bouclier et Thorns.",
      "Ranger/Huntress : arc, lance, mobilité et compagnon.",
      "Sorceress/Witch : sorts, triggers, minions, vie et bouclier d’énergie.",
      "Mercenary/Monk : arbalète, qualité, quarterstaff et combat rapide.",
      "Druid : transformation, plantes et attaques/sorts hybrides.",
    ],
    steps: [
      [
        "Choisissez la portée",
        "Décidez entre mêlée, attaque à distance, sorts, minions ou transformation.",
      ],
      [
        "Choisissez la complexité",
        "Optez pour peu de touches, combos, triggers ou ressources selon ce que vous voulez gérer.",
      ],
      [
        "Vérifiez la barrière d’entrée",
        "Le premier build ne doit pas dépendre d’un unique rare, d’un anointment cher ou d’une Ascendancy cachée.",
      ],
      [
        "Ouvrez le guide associé",
        "Confirmez compétences de campagne, paliers de passifs, priorité d’équipement et solutions de repli.",
      ],
    ],
    decisions: [
      "Pour la vitesse, une Deadeye à distance convient ; pour la robustesse, un Warrior bouclier ou armure. Les joueurs minions comparent Infernalist et Spirit Walker ; les casters choisissent self-cast simple ou triggers avancés.",
    ],
    mistakes: [
      "Ne choisissez pas uniquement une lettre de tier list, ne confondez pas équipement de démonstration et équipement de départ, et ne fixez pas l’Ascendancy avant d’aimer sa mécanique centrale.",
    ],
    faq: [
      [
        "Toutes les classes utilisent-elles toutes les compétences ?",
        "Beaucoup traversent les classes si arme et attributs sont satisfaits, mais position dans l’arbre et Ascendancy créent de fortes différences.",
      ],
      [
        "Quelle est la meilleure classe pour débuter ?",
        "Celle qui possède un parcours actuel, économique et complet dont vous comprenez rotation et défenses.",
      ],
    ],
  },
  "act-1-4-boss-permanent-rewards-checklist": {
    meta: {
      title: "Liste des boss et récompenses permanentes des actes 1 à 4",
      shortTitle: "Liste des boss actes 1 à 4",
      summary:
        "Distinguez boss principaux, objectifs optionnels à récompense permanente et objets de quête faciles à manquer entre les actes 1 et 4.",
      description:
        "Liste PoE2 actes 1 à 4 : ordre des boss, vie, Spirit, résistances, points d’arme et récupération des récompenses oubliées.",
      imageAlt:
        "Count Geonor représentant la liste des boss de campagne de PoE2",
      seoTitle: "Boss et récompenses permanentes des actes 1 à 4 de PoE2",
      seoDescription:
        "Suivez boss, vie, Spirit, résistances, points de passifs d’arme et objectifs optionnels des actes 1 à 4 de PoE2.",
    },
    quickAnswers: [
      [
        "Boss principaux",
        "Suivez les marqueurs principaux : ces combats ouvrent la zone ou l’acte suivant.",
      ],
      [
        "Récompenses permanentes",
        "Avant de partir, vérifiez les objectifs qui donnent vie, Spirit, résistances ou points d’arme.",
      ],
      [
        "Récompense oubliée",
        "Revenez par Waypoint, terminez l’objectif puis utilisez ou rendez l’objet demandé.",
      ],
    ],
    overview: [
      "Cette page combine l’itinéraire des boss avec une liste permanente pour savoir ce qui est obligatoire, mérite un détour ou peut attendre.",
      "Valeurs et parcours peuvent changer avec la campagne. Consultez chaque page de boss pour les attaques et le guide de récompenses pour la matrice chiffrée.",
    ],
    keyPoints: [
      "Acte 1 : Beira, Crowbell, King in the Mists et Candlemass.",
      "Acte 2 : Balbala ouvre la première Trial et Kabala donne des points d’arme.",
      "Acte 3 : Mighty Silverfist et Ignagduk accordent de la puissance permanente.",
      "Acte 4 et chapitres de transition ajoutent Spirit, résistances et progression.",
    ],
    steps: [
      [
        "En entrant dans un acte",
        "Ouvrez la liste et cochez uniquement les récompenses confirmées pour le patch actuel.",
      ],
      [
        "Avancez l’histoire",
        "Tuez d’abord les boss principaux et activez les Waypoints avant les longs détours.",
      ],
      [
        "Prenez les récompenses proches",
        "Faites immédiatement celles sur la route ou qui résolvent un problème actuel.",
      ],
      [
        "Auditez avant les cartes",
        "Récupérez toutes les récompenses oubliées avant un gros investissement d’endgame.",
      ],
    ],
    decisions: [
      "Privilégiez résistances ou vie si la survie manque ; cherchez tôt Spirit pour auras, minions ou compétences persistantes. Les points d’arme valent surtout si vous utilisez réellement deux arbres spécialisés.",
    ],
    mistakes: [
      "Tuer le boss n’accorde pas toujours automatiquement la récompense : certains objets s’utilisent au clic droit, d’autres se rendent à un PNJ. Le King in the Mists de campagne n’est pas le pinnacle d’endgame.",
    ],
    faq: [
      [
        "Puis-je revenir chercher une récompense oubliée ?",
        "Oui. Revenez au Waypoint, terminez boss ou quête et vérifiez s’il faut utiliser ou rendre l’objet.",
      ],
      [
        "Faut-il tuer immédiatement tous les boss optionnels ?",
        "Ceux qui donnent un attribut permanent en valent généralement la peine ; un boss de butin normal peut attendre si le détour est long.",
      ],
    ],
  },
  "the-executioner": {
    meta: {
      title:
        "The Executioner : attaques chargées, renforts et route d’Ogham Village",
      shortTitle: "The Executioner",
      summary:
        "Boss principal de l’acte 1 à Ogham Village dont les lourdes frappes physiques, l’attaque rouge frontale et les renforts punissent le face-à-face.",
      description:
        "Guide The Executioner dans PoE2 : emplacement, signaux d’attaque, renforts, placement sûr, résistance au feu et progression de quête.",
      seoTitle: "Guide The Executioner de l’acte 1 (PoE2)",
      seoDescription:
        "Battez The Executioner dans PoE2 : route d’Ogham Village, frappe rouge, renforts, placement, préparation et quête.",
    },
    overview: [
      "The Executioner bloque la route principale au bout d’Ogham Village. Il attaque lentement mais punit durement de face, et ses renforts saturent l’arène s’ils ne sont pas éliminés.",
      "La méthode sûre consiste à tourner à moyenne distance, rouler de côté ou le traverser pendant sa charge, puis attaquer durant sa longue récupération.",
    ],
    keyPoints: [
      "Emplacement : Executioner's Block, au bout d’Ogham Village.",
      "Menaces : lourdes frappes physiques et balayages frontaux.",
      "Résultat : fait progresser The Trail of Corruption.",
    ],
    strategy: [
      "Quand il lève son arme ou brille en rouge, quittez la ligne frontale : roulez de côté à distance ou traversez vers son dos au contact. Attaquez pendant la récupération.",
      "Lorsqu’il invoque des mercenaires, éliminez d’abord les ennemis à distance et longez le bord de l’arène. Ne forcez pas les dégâts lorsque projectiles et sol brûlant se superposent.",
    ],
    strategyBullets: [
      "Ne restez pas devant pendant la charge.",
      "Nettoyez les renforts avant de revenir au boss.",
      "Gardez une esquive pour la frappe rouge en ligne.",
    ],
    preparation: [
      "Améliorez la compétence principale et l’arme avant d’entrer. La résistance au feu aide contre la zone et le sol brûlant ; vie et mobilité évitent de mourir sur une seule frappe physique.",
    ],
    faq: [
      [
        "Où se trouve The Executioner ?",
        "Dans Executioner's Block, au bout d’Ogham Village à l’acte 1, généralement de l’autre côté du Waypoint.",
      ],
      [
        "Que faut-il esquiver en priorité ?",
        "La frappe rouge ou arme levée ; évitez ensuite l’avant pendant le large balayage.",
      ],
      [
        "Que débloque-t-il ?",
        "Il fait progresser The Trail of Corruption et ouvre la route vers Manor Ramparts.",
      ],
    ],
  },
};
