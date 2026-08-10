/** 文件职责：维护第一批 15 篇攻略的西班牙语审校译文，不包含稳定标识与事实源 URL。 */
export const locale = "es";
export const translator = "codex-gpt5-local-review";

export const ui = {
  sectionTitles: {
    overview: "Resumen",
    "pros-cons": "Ventajas y desventajas",
    leveling: "Subida de nivel y transición",
    mapping: "Rotación para mapas",
    bossing: "Rotación contra jefes",
    mechanics: "Mecánicas principales",
    supports: "Prioridad de gemas de apoyo",
    "build-use-cases": "Usos en configuraciones",
    properties: "Propiedades",
    alternatives: "Alternativas y mejoras",
    "common-mistakes": "Errores frecuentes",
    "quick-answer": "Respuesta rápida",
    "progression-steps": "Ruta de progresión",
    decisions: "Criterios de decisión",
    strategy: "Estrategia segura",
    "build-considerations": "Preparación de la configuración",
    faq: "Preguntas frecuentes",
    sources: "Fuentes y verificación",
  },
  sourceLabel: "Fuentes actuales y verificación cruzada",
  sourceDescription:
    "Los datos se contrastaron con notas oficiales, bases de datos actuales y las fuentes comunitarias indicadas.",
  verificationNote:
    "Las mecánicas y la vigencia del parche se verificaron con fuentes oficiales, bases de datos actuales y guías comunitarias; las pruebas propias en PC se registran por separado y no se presentan como realizadas.",
};

export const articles = {
  "big-monkee-spirit-walker": {
    meta: {
      title: "Big Monkee Spirit Walker: de Tame Beast al final del juego",
      shortTitle: "Big Monkee Spirit Walker",
      summary:
        "Spirit Walker centrada en compañero: domestica a Mighty Silverfist y combina Pounce, Maul y Pain Offering en una configuración económica desde la campaña hasta el endgame.",
      description:
        "Guía de Big Monkee Spirit Walker para PoE2 0.5 con subida mediante Twister, transición a Tame Beast, escalado del compañero, defensas y rotaciones.",
      imageAlt:
        "Mighty Silverfist usado por la configuración Big Monkee Spirit Walker",
      seoTitle: "Guía de Big Monkee Spirit Walker (PoE2 0.5)",
      seoDescription:
        "Big Monkee Spirit Walker en PoE2 0.5: domestica a Mighty Silverfist y completa la campaña, el equipo y las rotaciones de mapas y jefes.",
    },
    overview: [
      "La configuración deja el daño principal en manos de una bestia única domesticada, mientras la Huntress participa con Pounce y Maul. Mighty Silverfist ofrece una base de crítico excelente y es el objetivo más claro durante la campaña.",
      "Tame Beast no está disponible al inicio. Sube con Twister u otra habilidad fiable de Huntress, reserva oro para reasignar puntos y cambia cuando estén listas las habilidades y pasivas de compañero.",
    ],
    keyPoints: [
      "Domestica a Mighty Silverfist en el acto 3.",
      "Mantén Pain Offering contra raros resistentes y jefes.",
      "Usa Pounce y Maul para aportar daño y sostener el robo de vida.",
    ],
    pros: [
      "Daño alto con poco presupuesto.",
      "Buena para SSF tras obtener la bestia.",
      "El compañero reduce la presión al limpiar mapas.",
    ],
    cons: [
      "Buscar los mejores modificadores de la bestia lleva tiempo.",
      "La transición de pasivas cuesta oro.",
      "La IA del compañero puede fallar en espacios estrechos.",
    ],
    leveling: [
      [
        "Actos 1 y 2",
        "Sube con Twister y Whirling Slash; prioriza vida, resistencias y daño añadido a ataques.",
      ],
      [
        "Transición en el acto 3",
        "Tras el segundo hito de ascendencia, domestica a Mighty Silverfist y reasigna puntos al compañero y al daño compartido.",
      ],
      [
        "Primeros mapas",
        "Estabiliza vida, regeneración de maná y armadura antes de comprar unciones o equipo de lujo para el compañero.",
      ],
    ],
    mapping: [
      "Entra en los grupos con Pounce, usa Maul para mantener tu aportación y deja que la bestia remate. No te alejes de su radio de combate y recolócala cuando sea necesario.",
    ],
    bossing: [
      "Abre con Pain Offering, mantén al compañero sobre el jefe y usa Pounce para cruzar zonas peligrosas. Renueva la ofrenda solo durante ventanas seguras.",
    ],
    faq: [
      [
        "¿Cuándo conviene cambiar a Tame Beast?",
        "La gema se habilita en el nivel 7, pero la transición suele ser más fluida tras la segunda ascendencia y con suficientes pasivas de compañero.",
      ],
      [
        "¿Es obligatorio Mighty Silverfist?",
        "No. Otras bestias únicas funcionan, pero Mighty Silverfist es la opción más clara de daño a un objetivo durante la campaña.",
      ],
    ],
  },
  "grenade-gemling-legionnaire": {
    meta: {
      title: "Gemling Legionnaire de granadas: subida, mapas y jefes",
      shortTitle: "Gemling de granadas",
      summary:
        "Configuración de ballesta que limpia con Explosive Shot y concentra granadas para el daño explosivo, aprovechando calidad de Gemling, Mirage Archer y defensas por capas.",
      description:
        "Guía de Gemling Legionnaire de granadas para PoE2 0.5: cambios de habilidad, Explosive, Cluster y Oil Grenade, equipo y rotaciones.",
      imageAlt: "Gemling Legionnaire usando ballesta y granadas",
      seoTitle: "Gemling Legionnaire de granadas (PoE2 0.5)",
      seoDescription:
        "Subida y endgame de Gemling de granadas en PoE2 0.5: calidad, defensas y rotaciones para mapas y jefes.",
    },
    overview: [
      "Explosive Shot se ocupa de la limpieza habitual; Explosive Grenade y Cluster Grenade aportan el estallido. Oil Grenade mejora el daño de fuego y Flash Grenade crea una ventana defensiva de aturdimiento.",
      "Gemling Legionnaire valora mucho el nivel y la calidad de las gemas. Durante la campaña es más importante renovar una ballesta de daño alto que perseguir un único caro sin sinergia.",
    ],
    keyPoints: [
      "Mantén el daño de la ballesta al nivel de la zona.",
      "Usa Mirage Archer para automatizar parte de las granadas.",
      "Prioriza vida, resistencias, evasión y deflexión antes del daño de lujo.",
    ],
    pros: [
      "Limpieza rápida y gran daño a jefes.",
      "Ruta de campaña directa.",
      "Combina armadura, evasión y escudo de energía.",
    ],
    cons: [
      "Las explosiones reducen la claridad visual.",
      "El equipo de calidad y recuperación es caro al final.",
      "Hay que dominar mechas y puntos de caída.",
    ],
    leveling: [
      [
        "Acto 1",
        "Usa Permafrost Bolts y Fragmentation Rounds y mejora con frecuencia la ballesta.",
      ],
      [
        "Acto 2",
        "Pasa a Explosive Shot para limpiar e incorpora Explosive Grenade y Flash Grenade.",
      ],
      [
        "Desde el acto 3",
        "Añade Mirage Archer y, más adelante, Cluster Grenade; toma la ascendencia de calidad cuando sus beneficios sean reales.",
      ],
    ],
    mapping: [
      "Dispara Explosive Shot mientras avanzas, lanza Explosive Grenade a grupos resistentes y deja que Mirage Archer limpie los restos. Conserva Flash Grenade para raros peligrosos.",
    ],
    bossing: [
      "Coloca Oil Grenade, despliega Cluster y Explosive Grenade y después mantén Explosive Shot. No gastes todas las cargas justo antes de un cambio de fase.",
    ],
    faq: [
      [
        "¿Qué atributo importa más en la ballesta?",
        "Prioriza daño de arma alto y niveles útiles para habilidades de proyectil; una rara adecuada supera a un único sin sinergia.",
      ],
      [
        "¿Cuándo tomar Advanced Thaumaturgy?",
        "Cuando las granadas principales tengan suficiente calidad para obtener beneficios reales de recuperación, proyectiles o daño.",
      ],
    ],
  },
  "lightning-arrow-deadeye": {
    meta: {
      title: "Lightning Arrow Deadeye: de inicio de liga al endgame",
      shortTitle: "Lightning Arrow Deadeye",
      summary:
        "Arquera veloz con Lightning Arrow, detonaciones de Lightning Rod, Herald of Thunder y espejismos de Deadeye, con transición progresiva de no crítico a crítico.",
      description:
        "Guía de Lightning Arrow Deadeye para PoE2 0.5: subida, colocación de Lightning Rod, Mirage Archer, arco y defensas.",
      imageAlt: "Deadeye atacando con un arco veloz de rayo",
      seoTitle: "Guía de Lightning Arrow Deadeye (PoE2 0.5)",
      seoDescription:
        "Lightning Arrow Deadeye en PoE2 0.5: subida, Lightning Rod, mejoras de arco y configuraciones para mapas y jefes pináculo.",
    },
    overview: [
      "Lightning Arrow limpia grupos con rapidez y Lightning Rod convierte las flechas repetidas en daño concentrado contra jefes. Herald of Thunder y los espejismos amplían la cobertura, pero no sustituyen una buena colocación de Rod.",
      "Comienza con un arco físico potente y una versión sin crítico; cambia al crítico solo cuando precisión, probabilidad de crítico y defensas estén estabilizadas.",
    ],
    keyPoints: [
      "En mapas normales suele bastar Lightning Arrow.",
      "Coloca varias Lightning Rod antes de atacar a un jefe.",
      "Prioriza la calidad de Lightning Rod antes que las herramientas secundarias.",
    ],
    pros: [
      "Velocidad de limpieza excepcional.",
      "Progresión de campaña fluida.",
      "Escala hasta contenido pináculo.",
    ],
    cons: [
      "Defensas ligeras al principio.",
      "El daño a jefes exige preparar la combinación.",
      "Los arcos y objetos de crítico finales son caros.",
    ],
    leveling: [
      [
        "Campaña",
        "Sube con Lightning Arrow y Lightning Rod y reemplaza el arco físico cuando quede por detrás de la zona.",
      ],
      [
        "Primeros mapas",
        "Mantén el árbol sin crítico, completa resistencias y estabiliza la evasión.",
      ],
      [
        "Transición a crítico",
        "Cambia solo cuando precisión, daño del arco, crítico y defensas estén listos y el nuevo conjunto sea una mejora real.",
      ],
    ],
    mapping: [
      "Usa Lightning Arrow en grupos normales. Bajo raros resistentes, coloca Lightning Rod y sigue disparando para superponer cadenas y detonaciones.",
    ],
    bossing: [
      "Prepara varias Lightning Rod, añade Tornado Shot si lo usa tu versión y encadena Lightning Arrow. En pináculos cambia apoyos de área por daño concentrado cuando proceda.",
    ],
    faq: [
      [
        "¿Lightning Rod sigue siendo necesaria en 0.5?",
        "Sí. Aunque recibió ajustes, continúa siendo la pieza principal para daño a un objetivo.",
      ],
      [
        "¿Puedo empezar directamente con crítico?",
        "No es recomendable. La versión sin crítico es más fiable antes de disponer de precisión, equipo y defensas.",
      ],
    ],
  },
  tornado: {
    meta: {
      title: "Tornado: suelo elemental, límite y daño degenerativo",
      shortTitle: "Tornado",
      summary:
        "Tornado crea una tormenta de daño físico degenerativo que atrae enemigos y absorbe suelo elemental para añadir el elemento correspondiente.",
      description:
        "Guía de Tornado en PoE2: duración de 8 segundos, límite, absorción de suelo elemental, escalado, apoyos y configuraciones.",
      imageAlt:
        "Tormenta Tornado creada por una configuración Acolyte of Chayula",
      seoTitle: "Guía de Tornado y absorción de suelo (PoE2 0.5)",
      seoDescription:
        "Tornado en PoE2 0.5: daño físico degenerativo, suelo elemental, duración, límite, gemas de apoyo y usos.",
    },
    overview: [
      "Tornado genera una tormenta que atrae a los enemigos cercanos y causa daño físico degenerativo. Al solaparse con suelo elemental, absorbe su penalización y añade daño del elemento correspondiente.",
      "Dura 8 segundos y el límite base es uno; la calidad puede aumentar la duración y el número simultáneo.",
    ],
    keyPoints: [
      "El daño de hechizos afecta a su penalización degenerativa.",
      "El radio de la tormenta es de 3 metros.",
      "Las variantes elementales dependen de absorber el suelo correcto.",
    ],
    mechanics: [
      "El núcleo de Tornado es el daño degenerativo, no una sucesión de impactos. El suelo elemental modifica la penalización aplicada y el tipo de daño adicional.",
      "Aumentar el límite permite varias tormentas y la duración determina su cobertura. No debe confundirse con la habilidad de proyectil Tornado Shot.",
    ],
    mechanicBullets: [
      "Duración base: 8 segundos.",
      "Límite base: 1 Tornado.",
      "La calidad puede aumentar duración y límite.",
    ],
    supports: [
      [
        "Prolonged Duration",
        "Amplía la cobertura y reduce la frecuencia de renovación.",
        "core",
      ],
      [
        "Magnified Area",
        "Mejora la atracción y la cobertura en mapas.",
        "situational",
      ],
      ["Physical Mastery", "Aumenta el nivel de la habilidad física.", "core"],
    ],
    buildUse: [
      "Encaja en cadenas de activación de Archon, configuraciones de daño físico degenerativo y combinaciones que colocan de forma fiable suelo elemental bajo la tormenta.",
    ],
    mistakes: [
      "No escales solo daño de impacto. Comprueba que el suelo se solapa realmente con Tornado en vez de asumir que cualquier suelo cercano ya fue absorbido.",
    ],
    faq: [
      [
        "¿Puede absorber varios elementos?",
        "Puede obtener daño adicional de los suelos elementales absorbidos; la configuración debe asegurar cada solapamiento y duración.",
      ],
      [
        "¿Es lo mismo que Tornado Shot?",
        "No. Tornado es un hechizo de daño degenerativo; Tornado Shot es un ataque de proyectil independiente.",
      ],
    ],
  },
  "ball-lightning": {
    meta: {
      title: "Ball Lightning: frecuencia de rayos, Fire Infusion y shock",
      shortTitle: "Ball Lightning",
      summary:
        "Ball Lightning lanza un proyectil lento que no impacta por sí mismo y descarga rayos sobre objetivos cercanos cada 0,2 segundos.",
      description:
        "Guía de Ball Lightning en PoE2: frecuencia, shock, velocidad, Fire Infusion, suelo incendiado, apoyos y Blood Mage.",
      imageAlt: "Blood Mage lanzando Ball Lightning",
      seoTitle: "Guía de Ball Lightning e Infusion (PoE2 0.5)",
      seoDescription:
        "Ball Lightning en PoE2 0.5: descargas cada 0,2 s, shock, Fire Infusion, velocidad de proyectil, apoyos y configuraciones.",
    },
    overview: [
      "Ball Lightning hace avanzar lentamente una esfera entre los enemigos. La esfera no impacta: libera rayos repetidos y un mismo objetivo puede recibir una descarga cada 0,2 segundos.",
      "Al consumir Fire Infusion, la esfera se ralentiza, deja suelo incendiado y provoca una explosión de fuego al desaparecer.",
    ],
    keyPoints: [
      "El proyectil no impacta.",
      "El radio de búsqueda es de 1,8 metros.",
      "La habilidad posee una probabilidad de shock muy alta.",
    ],
    mechanics: [
      "Una velocidad menor mantiene la esfera junto al jefe durante más tiempo; demasiada velocidad puede reducir las descargas. El área y la posición deciden cuánto permanece el objetivo dentro del radio.",
      "Fire Infusion añade una rama separada de suelo y explosión de fuego que debe escalarse de forma deliberada.",
    ],
    mechanicBullets: [
      "Intervalo por objetivo: 0,2 segundos.",
      "Radio de objetivo: 1,8 metros.",
      "Probabilidad base de crítico: 9 %.",
    ],
    supports: [
      [
        "Considered Casting",
        "Útil para lanzamiento propio si se tolera el coste de velocidad.",
        "situational",
      ],
      [
        "Magnified Area",
        "Reduce la exigencia de colocación al limpiar.",
        "situational",
      ],
      [
        "Lightning Mastery",
        "Aumenta el nivel en configuraciones de rayo compatibles.",
        "core",
      ],
    ],
    buildUse: [
      "Ballcano Blood Mage usa Ball Lightning para limpiar y aplicar shock, y reserva Volcano u otro hechizo para concentrar daño sobre jefes.",
    ],
    mistakes: [
      "No juzgues el daño por el contacto de la esfera, porque no impacta. Evita también una velocidad que atraviese al objetivo antes de descargar suficientes veces.",
    ],
    faq: [
      [
        "¿La esfera impacta al atravesar enemigos?",
        "No; el daño procede de los rayos que libera repetidamente.",
      ],
      [
        "¿Para qué sirve Fire Infusion?",
        "Añade suelo incendiado y una explosión final, útil en configuraciones híbridas que generen y escalen Infusion.",
      ],
    ],
  },
  "gas-grenade": {
    meta: {
      title: "Gas Grenade: nube venenosa, detonación y recuperación",
      shortTitle: "Gas Grenade",
      summary:
        "Gas Grenade crea una nube de veneno creciente que el fuego o una habilidad Detonator pueden convertir en una explosión; admite hasta 6 nubes.",
      description:
        "Guía de Gas Grenade en PoE2: límite de nubes, veneno, detonación de fuego, recuperación, apoyos y rotación de Pathfinder.",
      imageAlt: "Pathfinder lanzando Gas Grenade",
      seoTitle: "Gas Grenade: veneno y detonación (PoE2 0.5)",
      seoDescription:
        "Gas Grenade en PoE2 0.5: límite de 6 nubes, fuego, recuperación, calidad, apoyos y configuraciones.",
    },
    overview: [
      "Gas Grenade rebota y libera gas al terminar la mecha. La nube aplica veneno como si fuera un impacto sin ser un impacto normal y aumenta de tamaño; quemar o usar un Detonator compatible causa una explosión de fuego.",
      "La habilidad almacena varias cargas de recuperación y mantiene como máximo seis nubes, por lo que la rotación depende del solapamiento, duración y recarga.",
    ],
    keyPoints: [
      "Máximo de 6 nubes.",
      "Quemar o usar Detonator hace explotar la nube.",
      "La calidad mejora recuperación y daño de fuego.",
    ],
    mechanics: [
      "La nube de veneno y la explosión escalan de manera distinta. La rama de veneno busca caos, magnitud y duración; la de explosión necesita una fuente fiable de quemadura o Detonator.",
      "Desde 0.3 la habilidad respeta estrictamente la mecha de granada, así que hay que anticipar objetivos móviles.",
    ],
    mechanicBullets: [
      "Almacena 3 usos de recuperación.",
      "La nube crece hasta su límite actual.",
      "No impacta de forma normal, pero aplica veneno como un impacto.",
    ],
    supports: [
      [
        "Second Wind",
        "Aporta más flexibilidad de cargas durante el estallido.",
        "core",
      ],
      [
        "Persistent Ground",
        "Prolonga la cobertura de las nubes.",
        "situational",
      ],
      ["Fire Mastery", "Apoya la rama de detonación de fuego.", "situational"],
    ],
    buildUse: [
      "Pathfinder puede preparar nubes antes de que aparezca el jefe, acumular Wither y Despair y después mantener el veneno o detonar para obtener daño de fuego.",
    ],
    mistakes: [
      "No escales veneno y fuego sin elegir una rama principal. Respeta el límite de seis nubes y no agotes las cargas antes de que el jefe sea seleccionable.",
    ],
    faq: [
      [
        "¿La nube puede envenenar sin impactar?",
        "Sí. No es un impacto normal, pero aplica veneno como si lo fuera.",
      ],
      [
        "¿Qué detona la nube?",
        "Los efectos de quemadura y las habilidades Detonator compatibles provocan la explosión de fuego.",
      ],
    ],
  },
  "lightning-spear": {
    meta: {
      title: "Lightning Spear: división con Frenzy Charge, rayos y shock",
      shortTitle: "Lightning Spear",
      summary:
        "Lightning Spear libera 5 rayos al impactar; con Frenzy Charge consume una carga y divide la lanza principal hacia 3 objetivos.",
      description:
        "Guía de Lightning Spear en PoE2: conversión a rayo, división con Frenzy Charge, proyectiles secundarios, shock, calidad y Amazon.",
      imageAlt: "Amazon lanzando Lightning Spear",
      seoTitle: "Guía de la división de Lightning Spear (PoE2 0.5)",
      seoDescription:
        "Lightning Spear en PoE2 0.5: conversión, 5 rayos, división con Frenzy Charge, shock, calidad y configuraciones.",
    },
    overview: [
      "Lightning Spear lanza una jabalina que al impactar libera cinco rayos secundarios hacia enemigos cercanos. Si hay Frenzy Charge, consume una y divide la lanza principal hacia tres objetivos; cada una genera su propia descarga.",
      "La lanza principal convierte la mayor parte del daño físico en rayo; los proyectiles secundarios lo convierten por completo y aplican shock con mayor eficacia.",
    ],
    keyPoints: [
      "Lanza principal: 80 % de físico convertido a rayo.",
      "Rayos secundarios: 100 % de conversión y 5 proyectiles.",
      "Una Frenzy Charge divide la lanza hacia 3 objetivos.",
    ],
    mechanics: [
      "Los proyectiles adicionales afectan al límite de rayos secundarios, no añaden lanzas principales de la forma habitual. La lanza principal no puede perforar, bifurcarse, encadenarse ni regresar.",
      "El daño sostenido depende de generar Frenzy Charge; una fuente inestable reduce cobertura y descargas múltiples.",
    ],
    mechanicBullets: [
      "Velocidad de ataque: 60 % de la base.",
      "Los rayos buscan objetivos en 5 metros.",
      "La calidad añade rayos y puede duplicar beneficios de carga.",
    ],
    supports: [
      [
        "Lightning Mastery",
        "Aumenta el nivel de la habilidad de rayo cuando es compatible.",
        "core",
      ],
      ["Rapid Attacks", "Compensa la baja velocidad de ataque base.", "core"],
      [
        "Magnified Area",
        "Amplía la cobertura del estallido al limpiar.",
        "situational",
      ],
    ],
    buildUse: [
      "Amazon combina precisión, crítico y generación de Frenzy Charge para dividir lanzas de forma constante al limpiar, conservando una rotación separada para un solo objetivo.",
    ],
    mistakes: [
      "No supongas que los modificadores normales de proyectiles añaden lanzas principales. Corrige primero la generación de Frenzy Charge y la velocidad de ataque.",
    ],
    faq: [
      [
        "¿Qué aporta Frenzy Charge?",
        "Divide la lanza principal hacia tres objetivos y cada lanza dividida genera su propia descarga de rayos.",
      ],
      [
        "¿Puede perforar o encadenarse la lanza principal?",
        "No; sigue su regla propia de división y no puede perforar, bifurcarse, encadenarse ni regresar.",
      ],
    ],
  },
  "adonias-ego": {
    meta: {
      title: "Adonia's Ego: Power Charges, preparación y cambio de arma",
      shortTitle: "Adonia's Ego",
      summary:
        "Adonia's Ego es una Siphoning Wand única que usa Infusion y cambios de arma para preparar Power Charges en configuraciones de hechizos avanzadas.",
      description:
        "Guía de Adonia's Ego en PoE2: Power Charges, grupos de armas, fallos frecuentes y relación con Stormweaver.",
      seoTitle: "Adonia's Ego: Power Charges y cambio de arma",
      seoDescription:
        "Adonia's Ego en PoE2 0.5: preparación de Infusion, cambio de arma, Power Charges, errores y usos de Stormweaver.",
    },
    overview: [
      "Adonia's Ego sirve para generar y consumir Infusion de manera activa con el fin de preparar Power Charges. Normalmente ocupa un grupo de armas separado para no perjudicar el arma de daño principal.",
      "No es una fuente pasiva de cargas: hay que configurar habilidades y grupos correctamente y ejecutar la secuencia al iniciar un mapa o antes de un jefe.",
    ],
    keyPoints: [
      "Realiza la preparación en un grupo de armas separado.",
      "Activa la habilidad de Infusion en el grupo correcto.",
      "El grupo principal puede usar una varita rara o pieza central más potente.",
    ],
    properties: [
      [
        "Base",
        "Siphoning Wand",
        "Varita única destinada a la secuencia de Infusion y Power Charge.",
      ],
      [
        "Uso principal",
        "Preparar Power Charges",
        "Apoya la preparación, no reemplaza la rotación de daño.",
      ],
      [
        "Riesgo clave",
        "Configuración de grupos",
        "Un ajuste incorrecto hace que el objeto parezca no funcionar.",
      ],
    ],
    buildUse: [
      "Configuraciones como Adonia's Trifusion Stormweaver la llevan en el segundo grupo para generar Infusion y cargas antes de volver al grupo principal.",
    ],
    alternatives: [
      "Si no necesitas esa secuencia, una varita rara con Focus suele aportar más. Compra el objeto solo cuando la configuración explique cómo consume las cargas.",
    ],
    mistakes: [
      "Los fallos habituales son activar la habilidad en el grupo equivocado o no generar antes la Infusion necesaria. Un conflicto de Rune única entre grupos también puede deshabilitar la secuencia.",
    ],
    faq: [
      [
        "¿Debe ser el arma de daño principal?",
        "Normalmente no. Muchas configuraciones 0.5 la usan en el segundo grupo y reservan una varita más potente o varita con Focus para atacar.",
      ],
      [
        "¿Por qué no obtengo cargas?",
        "Revisa la fuente de Infusion, la activación por grupo de armas y los posibles conflictos de Rune única.",
      ],
    ],
  },
  "sire-of-shards": {
    meta: {
      title: "Sire of Shards: proyectiles circulares, hechizos y usos",
      shortTitle: "Sire of Shards",
      summary:
        "Sire of Shards es un Chiming Staff único con Sigil of Power, daño y velocidad de hechizos que añade 4 proyectiles en círculo.",
      description:
        "Guía de Sire of Shards en PoE2: modificadores, proyectiles circulares, Sigil of Power, Ball Lightning, ventajas y alternativas.",
      seoTitle: "Sire of Shards y proyectiles circulares (PoE2 0.5)",
      seoDescription:
        "Sire of Shards en PoE2 0.5: +4 proyectiles en círculo, daño de hechizos, velocidad, Sigil of Power y alternativas.",
    },
    overview: [
      "Sire of Shards hace que los hechizos compatibles lancen cuatro proyectiles adicionales en círculo. También concede Sigil of Power de nivel 10, daño de hechizos, velocidad de lanzamiento y algo de resistencia elemental.",
      "El patrón circular limpia con gran cobertura, pero puede reducir el daño concentrado; hay que evaluar la geometría de la habilidad y no solo la cifra de daño.",
    ],
    keyPoints: [
      "Los hechizos lanzan 4 proyectiles adicionales.",
      "Los proyectiles salen en círculo.",
      "Concede Sigil of Power de nivel 10.",
    ],
    properties: [
      [
        "Daño de hechizos",
        "80–120 % aumentado",
        "Modificador global con un intervalo amplio.",
      ],
      [
        "Velocidad de lanzamiento",
        "10–20 % aumentada",
        "Mejora la sensación del lanzamiento propio.",
      ],
      [
        "Proyectiles",
        "+4 en círculo",
        "Cambia la cobertura y la colocación contra jefes.",
      ],
      ["Nivel requerido", "25", "Requisito actual de la base."],
    ],
    buildUse: [
      "Hechizos como Ball Lightning aprovechan la dispersión para cubrir grupos o solapar proyectiles cerca de objetivos grandes; Ballcano Blood Mage puede usarlo como arma de transición o central.",
    ],
    alternatives: [
      "Cuando importan más el daño concentrado, las defensas o el crítico, un bastón raro, varita con Focus u otro único especializado puede superar este objeto.",
    ],
    mistakes: [
      "Cuatro proyectiles extra no garantizan cinco veces más daño a jefes: el patrón circular determina cuántos atraviesan realmente al objetivo.",
    ],
    faq: [
      [
        "¿Todos los hechizos reciben cuatro proyectiles?",
        "Solo los hechizos de proyectil compatibles; los demás no obtienen el patrón circular.",
      ],
      [
        "¿La tirada con más daño siempre es la mejor?",
        "Es valiosa, pero la velocidad y la compatibilidad del patrón pueden importar más que una diferencia pequeña de daño.",
      ],
    ],
  },
  "crown-of-the-pale-king": {
    meta: {
      title:
        "Crown of the Pale King: Thorns, modificadores y mejora Runemaster",
      shortTitle: "Crown of the Pale King",
      summary:
        "Cultist Crown única de nivel bajo que añade Thorns físicos y permite que Thorns contraataque todos los impactos.",
      description:
        "Guía de Crown of the Pale King en PoE2: Thorns, armadura, escudo de energía, vida, mejora Runemaster y Warbringer.",
      seoTitle: "Crown of the Pale King y Thorns (PoE2 0.5)",
      seoDescription:
        "Crown of the Pale King en PoE2 0.5: contraataque a todos los impactos, vida, defensas, mejora y configuraciones.",
    },
    overview: [
      "Crown of the Pale King habilita configuraciones tempranas de represalia al añadir Thorns físicos y permitir que Thorns contraataque cualquier impacto.",
      "También aporta armadura, escudo de energía, vida máxima y rareza. Su requisito es bajo y más adelante puede convertirse en Runemastered Cultist Crown.",
    ],
    keyPoints: [
      "Thorns contraataca todos los impactos.",
      "Añade daño físico de Thorns.",
      "Puede mejorarse a Runemastered Cultist Crown.",
    ],
    properties: [
      [
        "Defensas",
        "50–100 % más armadura y escudo de energía",
        "Intervalo local amplio.",
      ],
      ["Vida máxima", "+40–80", "Supervivencia útil al principio."],
      [
        "Thorns",
        "10–15 a 20–25 físico",
        "Intervalo explícito actual de represalia.",
      ],
      [
        "Efecto único",
        "Contraataca todos los impactos",
        "Modificador central para Thorns.",
      ],
    ],
    buildUse: [
      "Thorns Warbringer usa el casco para activar represalias de forma constante y escala Thorns, ruptura de armadura y supervivencia para soportar los impactos que impulsan el daño.",
    ],
    alternatives: [
      "Si la activación ya está resuelta o necesitas mucha más armadura, vida, resistencias o una corrupción concreta, un casco raro defensivo resulta mejor.",
    ],
    mistakes: [
      "El casco no permite ignorar la defensa. Debes sobrevivir al impacto para que Thorns funcione y seguir esquivando los golpes fuertes de jefes.",
    ],
    faq: [
      [
        "¿Activa Thorns con cada impacto?",
        "El modificador permite contraatacar todos los impactos, pero el personaje todavía debe recibirlos y sobrevivir.",
      ],
      [
        "¿Se puede mejorar?",
        "Sí. El sistema Runeforging actual incluye la receta de Runemastered Cultist Crown.",
      ],
    ],
  },
  "best-atlas-tree-0-5": {
    meta: {
      title: "Mejor árbol del Atlas en PoE2 0.5: primeros 20, 40 y 60 puntos",
      shortTitle: "Árbol del Atlas 0.5",
      summary:
        "Plan por etapas: asegura Waystones y progreso seguro antes de especializarte con Atlas Master en una única mecánica rentable.",
      description:
        "Guía del árbol del Atlas de PoE2 0.5 con rutas de 20/40/60 puntos, sostenimiento de Waystones, Atlas Master, especialización y reasignación.",
      imageAlt: "Doryani junto a la interfaz del Atlas de PoE2",
      seoTitle: "Mejor árbol del Atlas de PoE2 0.5: 20/40/60 puntos",
      seoDescription:
        "Ruta del Atlas en PoE2 0.5: primeros 20, 40 y 60 puntos, Waystones, Atlas Master, mecánicas rentables y reasignación.",
    },
    quickAnswers: [
      [
        "Primera prioridad",
        "Asegura Waystones y avance antes de invertir en beneficio especializado.",
      ],
      [
        "Cuándo especializarse",
        "Cuando mapas y defensas sean estables, elige una mecánica y combina su Atlas Master y Tablet.",
      ],
      [
        "Cuándo reasignar",
        "Cambia si la configuración no completa la mecánica con seguridad o si el coste supera el retorno esperado.",
      ],
    ],
    overview: [
      "No existe un único árbol óptimo permanente. El primero resuelve acceso y sostenimiento; el árbol de beneficio llega cuando el personaje completa el contenido objetivo con constancia.",
      "Usa 20/40/60 puntos como controles y no copies un árbol que presupone equipo y desbloqueos finales.",
    ],
    keyPoints: [
      "Primero sostenimiento; después beneficio.",
      "Completa una especialización antes de dispersar puntos.",
      "Tablet y modificadores de mapa deben apoyar la estrategia.",
    ],
    steps: [
      [
        "Primeros 20 puntos",
        "Prioriza Waystones, progreso y nodos que estabilicen mapas normales.",
      ],
      [
        "Alrededor de 40",
        "Elige el Atlas Master de tu ciclo y entra en una rama mecánica.",
      ],
      [
        "Alrededor de 60",
        "Completa sus recompensas, añade cantidad y rareza seguras y evita modificadores incompatibles.",
      ],
      [
        "Después de 60",
        "Añade una mecánica complementaria solo cuando la primera sea estable y asequible.",
      ],
    ],
    decisions: [
      "Las configuraciones rápidas y de gran área favorecen Breach o Delirium; las resistentes y controladas pueden abordar Expedition y Remnants peligrosos. En SSF prioriza materiales deterministas frente a valores que solo se realizan en comercio.",
    ],
    mistakes: [
      "No copies un árbol de inversión alta al entrar en mapas, no repartas puntos entre cuatro mecánicas ni compres Tablet caros antes de demostrar que completas el encuentro básico.",
    ],
    faq: [
      [
        "¿Debo tomar cantidad de objetos de inmediato?",
        "No. Solo es útil después de estabilizar Waystones y supervivencia.",
      ],
      [
        "¿Cómo elijo Atlas Master?",
        "Elige el que refuerce la única mecánica que completas con más constancia y quieres repetir.",
      ],
    ],
  },
  "currency-farming-strategies-0-5": {
    meta: {
      title: "Farmeo de moneda en PoE2 0.5: presupuesto, Atlas y riesgo",
      shortTitle: "Farmeo de moneda 0.5",
      summary:
        "Elige estrategias por fuerza del personaje, coste de entrada, liquidez y riesgo de fallo, no por cifras por hora que caducan rápido.",
      description:
        "Guía de moneda de PoE2 0.5: Expedition, Runes of Aldur, Breach, Delirium, Ritual y mapas económicos con costes y riesgos.",
      imageAlt: "Monedas y materiales de fabricación de PoE2",
      seoTitle: "Farmeo de moneda en PoE2 0.5 según presupuesto",
      seoDescription:
        "Elige una estrategia rentable en PoE2 0.5: Expedition, Runes, Breach, Delirium, Ritual y configuración del Atlas.",
    },
    quickAnswers: [
      [
        "Presupuesto bajo",
        "Juega mapas normales con sostenimiento y vende materiales líquidos; no compres invitaciones caras.",
      ],
      [
        "Estrategia estable",
        "Expedition y Grand Expedition ofrecen resultados negociables claros, pero exigen planificar Remnants.",
      ],
      [
        "Alta varianza",
        "Ritual, carreras de jefes de Delirium y apuestas con Runes caras necesitan más capital y tolerancia al riesgo.",
      ],
    ],
    overview: [
      "Los beneficios cambian con el mercado. Esta guía compara la estructura de cada estrategia y no promete una cantidad fija de Divine Orbs por hora.",
      "Registra al menos 20 intentos con coste, finalizaciones, objetos líquidos y fallos antes de decidir si una estrategia funciona.",
    ],
    keyPoints: [
      "La liquidez importa más que el valor teórico.",
      "Una estrategia normal completada siempre supera a otra avanzada con muertes frecuentes.",
      "Valora los materiales antes de iniciar la muestra.",
    ],
    steps: [
      [
        "Estabiliza mapas",
        "Usa sostenimiento de Waystones y Tablet baratos hasta completar el nivel objetivo sin malgastar portales.",
      ],
      [
        "Elige un ciclo",
        "Selecciona Expedition, Runes, Breach, Delirium o Ritual según la configuración y precios actuales.",
      ],
      [
        "Registra 20 intentos",
        "Anota coste total, moneda directa, materiales líquidos, objetos caros y fallos.",
      ],
      [
        "Escala tras validar",
        "Compra mejores Tablet o invitaciones solo si el beneficio sigue positivo después de descontar inventario no vendido.",
      ],
    ],
    decisions: [
      "Expedition premia planificación y resistencia; Breach y Delirium favorecen velocidad y área; Ritual exige buen daño en espacios cerrados. Si la expectativa de una Rune of Aldur cara es inferior a su precio, véndela directamente.",
    ],
    mistakes: [
      "No contabilices raros invendibles a precios optimistas, no ignores mapas fallidos ni cambies de estrategia por tres resultados afortunados. Define objetivo y límite de pérdidas antes de fabricar con materiales caros.",
    ],
    faq: [
      [
        "¿Cuál es el inicio más seguro?",
        "Mapas normales con nodos de sostenimiento y botín líquido antes de comprar entradas caras para una configuración no probada.",
      ],
      [
        "¿Cuándo recalculo el beneficio?",
        "Siempre que un parche, una guía popular o el mercado altere oferta, demanda o costes.",
      ],
    ],
  },
  "classes-ascendancies-guide": {
    meta: {
      title: "Clases y ascendencias de PoE2: elige por estilo en 0.5",
      shortTitle: "Clases y ascendencias",
      summary:
        "Relaciona clases actuales con cuerpo a cuerpo, distancia, hechizos, esbirros, transformación o pocas pulsaciones sin tratar una tier list como respuesta permanente.",
      description:
        "Elige clase y ascendencia en PoE2 0.5 por estilo, complejidad, defensa, SSF y disponibilidad de una guía completa.",
      imageAlt:
        "Combate representativo para elegir clase y ascendencia en PoE2",
      seoTitle: "Guía de clases y ascendencias de PoE2 0.5",
      seoDescription:
        "Elige tu clase y ascendencia de PoE2 0.5 según estilo, dificultad, defensa, SSF y configuración.",
    },
    quickAnswers: [
      [
        "Elección más sencilla",
        "Elige primero cómo quieres combatir y después una guía actual con ruta completa de subida.",
      ],
      [
        "Límites de clase",
        "La clase base determina inicio de pasivas y ascendencias; la mayoría de gemas no están bloqueadas por clase.",
      ],
      [
        "¿Se puede cambiar?",
        "Puedes ajustar la ascendencia bajo las reglas actuales, pero no convertir una clase base en otra.",
      ],
    ],
    overview: [
      "Elegir clase no bloquea para siempre las habilidades: determina el inicio del árbol, la comodidad de atributos y las ascendencias disponibles.",
      "Para el primer personaje importa más una guía completa que un techo teórico de tier S. Busca cambios de habilidad claros, equipo común y defensas comprensibles.",
    ],
    keyPoints: [
      "Warrior: armadura, golpes pesados, escudo y Thorns.",
      "Ranger/Huntress: arco, lanza, movilidad y compañero.",
      "Sorceress/Witch: hechizos, activaciones, esbirros, vida y escudo de energía.",
      "Mercenary/Monk: ballesta, calidad, quarterstaff y combate veloz.",
      "Druid: transformación, plantas y ataques/hechizos híbridos.",
    ],
    steps: [
      [
        "Elige distancia",
        "Decide entre cuerpo a cuerpo, ataque a distancia, hechizos, esbirros o transformación.",
      ],
      [
        "Elige complejidad",
        "Escoge pocas pulsaciones, combinaciones, activaciones o recursos según lo que quieras mantener.",
      ],
      [
        "Comprueba la barrera de entrada",
        "La primera configuración no debe depender de un único raro, una unción cara o una ascendencia oculta.",
      ],
      [
        "Abre la guía asociada",
        "Confirma habilidades de campaña, hitos de pasivas, prioridad de equipo y alternativas.",
      ],
    ],
    decisions: [
      "Quien valore velocidad puede empezar con una Deadeye a distancia; para aguantar, un Warrior de escudo o armadura. Los jugadores de esbirros comparan Infernalist y Spirit Walker; los de hechizos eligen entre lanzamiento simple y activaciones avanzadas.",
    ],
    mistakes: [
      "No elijas solo por una letra de tier list, no confundas equipo de muestra con equipo inicial y no fijes ascendencia antes de comprobar que te gusta la mecánica central.",
    ],
    faq: [
      [
        "¿Todas las clases pueden usar todas las habilidades?",
        "Muchas pueden cruzar clases si se cumplen arma y atributos, aunque la posición del árbol y la ascendencia producen diferencias grandes.",
      ],
      [
        "¿Cuál es la mejor clase para principiantes?",
        "La que tenga una ruta actual, económica y completa cuya rotación y defensa entiendas.",
      ],
    ],
  },
  "act-1-4-boss-permanent-rewards-checklist": {
    meta: {
      title: "Lista de jefes y recompensas permanentes de los actos 1–4",
      shortTitle: "Lista de jefes de los actos 1–4",
      summary:
        "Distingue jefes principales, objetivos opcionales con recompensas permanentes y objetos de misión fáciles de olvidar durante los actos 1 a 4.",
      description:
        "Lista de PoE2 para actos 1–4: orden de jefes, vida, Spirit, resistencias, puntos de arma y recuperación de recompensas omitidas.",
      imageAlt:
        "Count Geonor representando la lista de jefes de campaña de PoE2",
      seoTitle: "Jefes y recompensas permanentes de los actos 1–4 de PoE2",
      seoDescription:
        "Controla jefes, vida, Spirit, resistencias, puntos de pasivas de arma y objetivos opcionales de los actos 1–4 de PoE2.",
    },
    quickAnswers: [
      [
        "Jefes principales",
        "Sigue los marcadores principales: estas peleas abren la siguiente zona o acto.",
      ],
      [
        "Recompensas permanentes",
        "Antes de salir revisa objetivos que conceden vida, Spirit, resistencias o puntos de arma.",
      ],
      [
        "Recompensa omitida",
        "Regresa con el Waypoint, completa el objetivo y usa o entrega el objeto según corresponda.",
      ],
    ],
    overview: [
      "La página combina la ruta de jefes con una lista permanente para decidir qué es obligatorio, qué merece el desvío y qué puede esperar.",
      "Los valores y rutas cambian con la campaña. Consulta la página de cada jefe para ataques y la guía de recompensas para la matriz numérica.",
    ],
    keyPoints: [
      "Acto 1: Beira, Crowbell, King in the Mists y Candlemass.",
      "Acto 2: Balbala abre la primera Trial y Kabala da puntos de arma.",
      "Acto 3: Mighty Silverfist e Ignagduk ofrecen poder permanente.",
      "Acto 4 y capítulos de transición añaden Spirit, resistencias y progreso.",
    ],
    steps: [
      [
        "Al entrar en un acto",
        "Abre la lista y marca solo recompensas confirmadas para el parche actual.",
      ],
      [
        "Avanza la historia",
        "Derrota primero jefes principales y activa Waypoints antes de evaluar desvíos largos.",
      ],
      [
        "Recoge recompensas cercanas",
        "Completa de inmediato las que estén en la ruta o solucionen un problema actual.",
      ],
      [
        "Audita antes de mapas",
        "Recupera todas las recompensas omitidas antes de invertir mucho en equipo de endgame.",
      ],
    ],
    decisions: [
      "Prioriza resistencias o vida si la supervivencia falla; busca Spirit pronto en configuraciones de auras, esbirros o habilidades persistentes. Los puntos de arma valen más si realmente usas dos árboles especializados.",
    ],
    mistakes: [
      "Matar al jefe no siempre entrega automáticamente la recompensa: algunos objetos se usan con clic derecho y otros se devuelven a un PNJ. El King in the Mists de campaña no es el pináculo de endgame.",
    ],
    faq: [
      [
        "¿Puedo volver por una recompensa omitida?",
        "Sí. Regresa al Waypoint, completa jefe o misión y comprueba si debes usar o entregar el objeto.",
      ],
      [
        "¿Hay que matar enseguida a todos los jefes opcionales?",
        "Los de atributos permanentes suelen merecerlo; uno de botín normal puede esperar si el desvío es largo y no resuelve nada.",
      ],
    ],
  },
  "the-executioner": {
    meta: {
      title:
        "The Executioner: golpes cargados, refuerzos y ruta de Ogham Village",
      shortTitle: "The Executioner",
      summary:
        "Jefe principal del acto 1 en Ogham Village cuyos golpes físicos lentos, ataque rojo frontal y refuerzos castigan permanecer delante.",
      description:
        "Guía de The Executioner en PoE2: ubicación, señales de golpes, refuerzos, posición segura, resistencia al fuego y progreso de misión.",
      seoTitle: "Guía de The Executioner del acto 1 (PoE2)",
      seoDescription:
        "Derrota a The Executioner en PoE2: ruta de Ogham Village, golpe rojo, refuerzos, posición, preparación y misión.",
    },
    overview: [
      "The Executioner bloquea la ruta principal al final de Ogham Village. Ataca despacio pero castiga mucho de frente, y sus refuerzos llenan la arena si no se eliminan.",
      "La opción segura es girar a media distancia, rodar de lado o atravesarlo cuando carga y atacar durante su larga recuperación.",
    ],
    keyPoints: [
      "Ubicación: Executioner's Block, al final de Ogham Village.",
      "Amenazas: golpes físicos pesados y barridos frontales.",
      "Resultado: avanza The Trail of Corruption.",
    ],
    strategy: [
      "Cuando levante el arma o brille en rojo, abandona la línea frontal: rueda de lado si estás lejos o atraviesa hasta su espalda si estás cerca. Ataca durante la recuperación.",
      "Al invocar mercenarios, elimina primero a los enemigos a distancia y recorre el borde de la arena. No fuerces daño cuando coincidan proyectiles y suelo incendiado.",
    ],
    strategyBullets: [
      "No permanezcas delante durante la carga.",
      "Limpia refuerzos antes de volver al jefe.",
      "Guarda una esquiva para el golpe rojo lineal.",
    ],
    preparation: [
      "Mejora la habilidad principal y el arma antes de entrar. La resistencia al fuego ayuda contra la zona y el suelo incendiado; suficiente vida y movilidad evitan morir de un solo golpe físico.",
    ],
    faq: [
      [
        "¿Dónde está The Executioner?",
        "En Executioner's Block, al final de Ogham Village del acto 1, normalmente al otro lado del Waypoint.",
      ],
      [
        "¿Qué debo esquivar primero?",
        "El golpe rojo o con arma alzada; después evita el frente durante el barrido amplio.",
      ],
      [
        "¿Qué desbloquea?",
        "Avanza The Trail of Corruption y abre la ruta hacia Manor Ramparts.",
      ],
    ],
  },
};
