/** 文件职责：维护第一批 15 篇攻略的德语审校译文，不包含稳定标识与事实源 URL。 */
export const locale = "de";
export const translator = "codex-gpt5-local-review";

export const ui = {
  sectionTitles: {
    overview: "Überblick",
    "pros-cons": "Stärken und Nachteile",
    leveling: "Leveln und Umstieg",
    mapping: "Rotation für Karten",
    bossing: "Rotation gegen Bosse",
    mechanics: "Kernmechaniken",
    supports: "Priorität der Support-Gems",
    "build-use-cases": "Einsatz in Builds",
    properties: "Eigenschaften",
    alternatives: "Alternativen und Upgrades",
    "common-mistakes": "Häufige Fehler",
    "quick-answer": "Kurzantwort",
    "progression-steps": "Empfohlener Fortschritt",
    decisions: "Entscheidungsregeln",
    strategy: "Sichere Strategie",
    "build-considerations": "Build-Vorbereitung",
    faq: "Häufige Fragen",
    sources: "Quellen und Prüfung",
  },
  sourceLabel: "Aktuelle Quellen und Gegenprüfung",
  sourceDescription:
    "Die Angaben wurden mit offiziellen Patchnotes, aktuellen Datenbanken und den aufgeführten Community-Quellen abgeglichen.",
  verificationNote:
    "Mechaniken und Patchstand wurden anhand offizieller Quellen, aktueller Datenbanken und Community-Guides geprüft; eigene PC-Tests werden getrennt erfasst und nicht als durchgeführt dargestellt.",
};

export const articles = {
  "big-monkee-spirit-walker": {
    meta: {
      title: "Big Monkee Spirit Walker: von Tame Beast bis ins Endgame",
      shortTitle: "Big Monkee Spirit Walker",
      summary:
        "Begleiterorientierter Spirit Walker: Zähme Mighty Silverfist und kombiniere Pounce, Maul und Pain Offering zu einem günstigen Build für Kampagne und Endgame.",
      description:
        "Big-Monkee-Spirit-Walker-Guide für PoE2 0.5 mit Twister-Leveling, Tame-Beast-Umstieg, Begleiter-Skalierung, Verteidigung und Rotationen.",
      imageAlt: "Mighty Silverfist im Big-Monkee-Spirit-Walker-Build",
      seoTitle: "Big-Monkee-Spirit-Walker-Guide (PoE2 0.5)",
      seoDescription:
        "Big Monkee Spirit Walker in PoE2 0.5: Zähme Mighty Silverfist und folge Fortschritt, Ausrüstung sowie Karten- und Bossrotationen.",
    },
    overview: [
      "Der Build überlässt den Hauptschaden einer gezähmten einzigartigen Bestie, während die Huntress mit Pounce und Maul aktiv bleibt. Mighty Silverfist besitzt eine starke Krit-Basis und ist das klarste Ziel während der Kampagne.",
      "Tame Beast steht zu Beginn nicht zur Verfügung. Levele mit Twister oder einer zuverlässigen Huntress-Fertigkeit, spare Gold zum Umskillen und wechsle erst mit fertigen Begleiter-Gems und -Passiven.",
    ],
    keyPoints: [
      "Zähme Mighty Silverfist in Akt 3.",
      "Halte Pain Offering gegen zähe seltene Gegner und Bosse aktiv.",
      "Nutze Pounce und Maul für eigenen Schaden und Lebensraub.",
    ],
    pros: [
      "Starker Schaden mit kleinem Budget.",
      "Nach Erhalt der Bestie gut für SSF.",
      "Der Begleiter nimmt beim Mapping Druck ab.",
    ],
    cons: [
      "Die Suche nach idealen Bestien-Mods braucht Zeit.",
      "Der Passive-Umstieg kostet Gold.",
      "In engen Bereichen kann die Begleiter-KI stocken.",
    ],
    leveling: [
      [
        "Akt 1 und 2",
        "Levele mit Twister und Whirling Slash und priorisiere Leben, Widerstände und zusätzlichen Angriffsschaden.",
      ],
      [
        "Umstieg in Akt 3",
        "Zähme nach dem zweiten Ascendancy-Meilenstein Mighty Silverfist und verteile Punkte auf Begleiter und geteilte Schadensskalierung.",
      ],
      [
        "Frühe Karten",
        "Stabilisiere Leben, Manaregeneration und Rüstung vor teuren Anointments oder Luxusausrüstung für den Begleiter.",
      ],
    ],
    mapping: [
      "Springe mit Pounce in Gruppen, halte mit Maul deinen Anteil aufrecht und lasse die Bestie abschließen. Bleibe in ihrer Kampfreichweite und positioniere sie bei Bedarf neu.",
    ],
    bossing: [
      "Beginne mit Pain Offering, halte den Begleiter am Boss und überquere gefährliche Flächen mit Pounce. Erneuere das Offering nur in sicheren Zeitfenstern.",
    ],
    faq: [
      [
        "Wann sollte ich auf Tame Beast wechseln?",
        "Der Gem ist ab Tier 7 verfügbar, doch der Umstieg läuft meist nach der zweiten Ascendancy und mit genügend Begleiter-Passiven besser.",
      ],
      [
        "Ist Mighty Silverfist Pflicht?",
        "Nein. Andere einzigartige Bestien funktionieren ebenfalls, aber Mighty Silverfist ist in der Kampagne die klarste Einzelzieloption.",
      ],
    ],
  },
  "grenade-gemling-legionnaire": {
    meta: {
      title: "Granaten-Gemling-Legionnaire: Leveln, Karten und Bosse",
      shortTitle: "Granaten-Gemling",
      summary:
        "Armbrust-Build mit Explosive Shot für Clear und gebündelten Granaten für Burst, der Gemling-Qualität, Mirage Archer und mehrere Verteidigungsschichten nutzt.",
      description:
        "Granaten-Gemling-Legionnaire-Guide für PoE2 0.5: Skillwechsel, Explosive, Cluster und Oil Grenade, Ausrüstung und Rotationen.",
      imageAlt: "Gemling Legionnaire mit Armbrust und Granaten",
      seoTitle: "Granaten-Gemling-Legionnaire (PoE2 0.5)",
      seoDescription:
        "Leveling und Endgame des Granaten-Gemlings in PoE2 0.5: Qualität, Verteidigung sowie Karten- und Bossrotationen.",
    },
    overview: [
      "Explosive Shot übernimmt den normalen Clear; Explosive Grenade und Cluster Grenade liefern Burst. Oil Grenade verstärkt Feuerschaden und Flash Grenade schafft ein defensives Betäubungsfenster.",
      "Gemling Legionnaire profitiert stark von Gem-Level und -Qualität. In der Kampagne ist eine aktuelle Armbrust mit hohem Schaden wichtiger als ein teures Unique ohne Synergie.",
    ],
    keyPoints: [
      "Halte den Armbrustschaden auf Höhe des Gebiets.",
      "Automatisiere einen Teil der Granaten mit Mirage Archer.",
      "Priorisiere Leben, Widerstände, Ausweichen und Deflection vor Luxusschaden.",
    ],
    pros: [
      "Schneller Clear und starker Boss-Burst.",
      "Direkter Kampagnenpfad.",
      "Verbindet Rüstung, Ausweichen und Energieschild.",
    ],
    cons: [
      "Explosionen mindern die Übersicht.",
      "Qualitäts- und Erholungs-Ausrüstung wird im Endgame teuer.",
      "Zünderzeiten und Landepunkte müssen sitzen.",
    ],
    leveling: [
      [
        "Akt 1",
        "Nutze Permafrost Bolts und Fragmentation Rounds und erneuere die Armbrust regelmäßig.",
      ],
      [
        "Akt 2",
        "Wechsle für Clear auf Explosive Shot und ergänze Explosive Grenade sowie Flash Grenade.",
      ],
      [
        "Ab Akt 3",
        "Füge Mirage Archer und später Cluster Grenade hinzu; nimm die Qualitäts-Ascendancy erst bei messbarem Nutzen.",
      ],
    ],
    mapping: [
      "Feuere Explosive Shot in Bewegung, wirf Explosive Grenade auf zähe Gruppen und lasse Mirage Archer Reste beseitigen. Bewahre Flash Grenade für gefährliche seltene Gegner auf.",
    ],
    bossing: [
      "Lege Oil Grenade, setze Cluster und Explosive Grenade ein und halte danach Explosive Shot aufrecht. Verbrauche vor einem Phasenwechsel nicht alle Ladungen.",
    ],
    faq: [
      [
        "Welcher Wert ist auf der Armbrust am wichtigsten?",
        "Priorisiere hohen Waffenschaden und nützliche Stufen für Projektil-Skills; eine passende Rare schlägt ein unpassendes Unique.",
      ],
      [
        "Wann nehme ich Advanced Thaumaturgy?",
        "Wenn die Hauptgranaten genug Qualität besitzen, um echte Vorteile bei Erholung, Projektilen oder Schaden zu erhalten.",
      ],
    ],
  },
  "lightning-arrow-deadeye": {
    meta: {
      title: "Lightning Arrow Deadeye: vom Start bis ins Endgame",
      shortTitle: "Lightning Arrow Deadeye",
      summary:
        "Schneller Bogen-Build mit Lightning Arrow, Lightning-Rod-Detonationen, Herald of Thunder und Deadeye-Mirages samt schrittweisem Wechsel von Nicht-Krit zu Krit.",
      description:
        "Lightning-Arrow-Deadeye-Guide für PoE2 0.5: Leveling, Lightning-Rod-Platzierung, Mirage Archer, Bogen und Verteidigung.",
      imageAlt: "Deadeye greift mit einem schnellen Blitzbogen an",
      seoTitle: "Lightning-Arrow-Deadeye-Guide (PoE2 0.5)",
      seoDescription:
        "Lightning Arrow Deadeye in PoE2 0.5: Leveling, Lightning Rod, Bogen-Upgrades sowie Karten- und Pinnacle-Boss-Setups.",
    },
    overview: [
      "Lightning Arrow räumt Gruppen schnell und Lightning Rod bündelt wiederholte Pfeile zu Bossschaden. Herald of Thunder und Mirages vergrößern die Abdeckung, ersetzen aber keine korrekte Rod-Platzierung.",
      "Beginne mit einem starken physischen Bogen ohne Krit. Wechsle erst zu Krit, wenn Trefferchance, Krit-Chance und Verteidigung stabil sind.",
    ],
    keyPoints: [
      "Für normale Karten reicht meist Lightning Arrow.",
      "Platziere vor dem Boss mehrere Lightning Rods.",
      "Gib Lightning Rod zuerst Qualität, dann den Nebenwerkzeugen.",
    ],
    pros: [
      "Hervorragende Clear-Geschwindigkeit.",
      "Gleichmäßiger Kampagnenfortschritt.",
      "Skaliert bis zu Pinnacle-Inhalten.",
    ],
    cons: [
      "Anfangs dünne Verteidigung.",
      "Bossschaden verlangt vorbereitete Kombinationen.",
      "Endgame-Bögen und Krit-Ausrüstung sind teuer.",
    ],
    leveling: [
      [
        "Kampagne",
        "Levele mit Lightning Arrow und Lightning Rod und ersetze den physischen Bogen, sobald er hinter dem Gebiet zurückliegt.",
      ],
      [
        "Frühe Karten",
        "Bleibe auf Nicht-Krit-Passiven, cappe Widerstände und stabilisiere Ausweichen.",
      ],
      [
        "Krit-Umstieg",
        "Wechsle nur mit fertiger Trefferchance, Bogenschaden, Krit und Verteidigung und wenn das neue Set wirklich stärker ist.",
      ],
    ],
    mapping: [
      "Nutze Lightning Arrow gegen normale Gruppen. Lege Lightning Rod unter zähe Rares und schieße weiter, damit Ketten und Detonationen überlappen.",
    ],
    bossing: [
      "Bereite mehrere Lightning Rods vor, ergänze je nach Variante Tornado Shot und feuere Lightning Arrow. Tausche auf Pinnacle-Bossen Flächen-Supports gegen konzentrierten Schaden.",
    ],
    faq: [
      [
        "Braucht man Lightning Rod in 0.5 noch?",
        "Ja. Trotz Anpassungen bleibt sie die wichtigste Einzelzielkomponente.",
      ],
      [
        "Kann ich direkt mit Krit starten?",
        "Nicht empfohlen. Nicht-Krit ist zuverlässiger, bevor Trefferchance, Ausrüstung und Verteidigung stehen.",
      ],
    ],
  },
  tornado: {
    meta: {
      title: "Tornado: Elementarboden, Limit und Schaden über Zeit",
      shortTitle: "Tornado",
      summary:
        "Tornado erzeugt einen physischen Schaden-über-Zeit-Sturm, der Gegner anzieht und Elementarboden für zusätzlichen passenden Elementarschaden absorbiert.",
      description:
        "Tornado-Guide für PoE2: 8 Sekunden Dauer, Sturm-Limit, Elementarboden-Absorption, Skalierung, Supports und Builds.",
      imageAlt: "Tornado-Sturm eines Acolyte-of-Chayula-Builds",
      seoTitle: "Tornado- und Bodenabsorptions-Guide (PoE2 0.5)",
      seoDescription:
        "Tornado in PoE2 0.5: physischer Schaden über Zeit, Elementarboden, Dauer, Limit, Support-Gems und Builds.",
    },
    overview: [
      "Tornado erzeugt einen Sturm, der nahe Gegner anzieht und physischen Schaden über Zeit verursacht. Überlappt er Elementarboden, absorbiert er dessen Debuff und fügt den entsprechenden Elementarschaden hinzu.",
      "Die Basisdauer beträgt 8 Sekunden, das Grundlimit eins; Qualität kann Dauer und gleichzeitige Anzahl erhöhen.",
    ],
    keyPoints: [
      "Zauberschaden wirkt auf den Schaden-über-Zeit-Debuff.",
      "Der Sturmradius beträgt 3 Meter.",
      "Elementare Varianten hängen von der richtigen Bodenabsorption ab.",
    ],
    mechanics: [
      "Im Zentrum steht Schaden über Zeit, nicht eine Folge von Treffern. Elementarboden verändert den angewandten Debuff und die Art des Zusatzschadens.",
      "Ein höheres Limit erlaubt mehrere Stürme, während Dauer die Abdeckung bestimmt. Nicht mit dem Projektilangriff Tornado Shot verwechseln.",
    ],
    mechanicBullets: [
      "Basisdauer: 8 Sekunden.",
      "Grundlimit: 1 Tornado.",
      "Qualität kann Dauer und Limit erhöhen.",
    ],
    supports: [
      [
        "Prolonged Duration",
        "Verlängert die Abdeckung und reduziert erneutes Wirken.",
        "core",
      ],
      [
        "Magnified Area",
        "Verbessert Anziehung und Kartenabdeckung.",
        "situational",
      ],
      [
        "Physical Mastery",
        "Erhöht die Stufe der physischen Fertigkeit.",
        "core",
      ],
    ],
    buildUse: [
      "Passt zu Archon-Triggerketten, physischen DoT-Builds und Kombinationen, die zuverlässig Elementarboden unter dem Sturm erzeugen.",
    ],
    mistakes: [
      "Skaliere nicht nur Trefferschaden. Prüfe, ob der Boden Tornado wirklich überlappt, statt nahe Flächen automatisch als absorbiert anzusehen.",
    ],
    faq: [
      [
        "Kann Tornado mehrere Elemente absorbieren?",
        "Er kann Zusatzschaden von absorbierten Elementarböden erhalten; der Build muss jede Überlappung und Dauer sicherstellen.",
      ],
      [
        "Sind Tornado und Tornado Shot dasselbe?",
        "Nein. Tornado ist ein DoT-Zauber, Tornado Shot ein separater Projektilangriff.",
      ],
    ],
  },
  "ball-lightning": {
    meta: {
      title: "Ball Lightning: Blitzfrequenz, Fire Infusion und Shock",
      shortTitle: "Ball Lightning",
      summary:
        "Ball Lightning verschießt ein langsames Projektil, das selbst nicht trifft und nahe Ziele alle 0,2 Sekunden mit Blitzen entlädt.",
      description:
        "Ball-Lightning-Guide für PoE2: Entladungsfrequenz, Shock, Geschwindigkeit, Fire Infusion, Brandboden, Supports und Blood Mage.",
      imageAlt: "Blood Mage wirkt Ball Lightning",
      seoTitle: "Ball-Lightning- und Infusion-Guide (PoE2 0.5)",
      seoDescription:
        "Ball Lightning in PoE2 0.5: Entladungen alle 0,2 s, Shock, Fire Infusion, Projektiltempo, Supports und Builds.",
    },
    overview: [
      "Ball Lightning bewegt eine langsame Kugel durch Gegner. Die Kugel trifft selbst nicht, sondern entlädt wiederholt Blitze; dasselbe Ziel kann alle 0,2 Sekunden getroffen werden.",
      "Beim Verbrauch von Fire Infusion wird die Kugel langsamer, hinterlässt Brandboden und explodiert beim Verschwinden mit Feuerschaden.",
    ],
    keyPoints: [
      "Das Projektil selbst trifft nicht.",
      "Der Suchradius beträgt 1,8 Meter.",
      "Die Fertigkeit besitzt eine sehr hohe Shock-Chance.",
    ],
    mechanics: [
      "Geringeres Tempo hält die Kugel länger am Boss; zu viel Geschwindigkeit kann Entladungen kosten. Fläche und Position bestimmen, wie lange das Ziel im Radius bleibt.",
      "Fire Infusion ist ein eigener Zweig aus Brandboden und Feuerexplosion, der bewusst skaliert werden muss.",
    ],
    mechanicBullets: [
      "Intervall pro Ziel: 0,2 Sekunden.",
      "Zielradius: 1,8 Meter.",
      "Basis-Krit-Chance: 9 %.",
    ],
    supports: [
      [
        "Considered Casting",
        "Gut für Self-Cast, wenn der Geschwindigkeitsnachteil tragbar ist.",
        "situational",
      ],
      [
        "Magnified Area",
        "Verringert beim Clear die Anforderungen an die Positionierung.",
        "situational",
      ],
      [
        "Lightning Mastery",
        "Erhöht in kompatiblen Blitz-Builds die Skill-Stufe.",
        "core",
      ],
    ],
    buildUse: [
      "Ballcano Blood Mage nutzt Ball Lightning für Clear und Shock und bündelt mit Volcano oder einem anderen Zauber Schaden auf Bosse.",
    ],
    mistakes: [
      "Beurteile Schaden nicht am Kontakt der Kugel, da sie nicht trifft. Staple auch nicht so viel Geschwindigkeit, dass sie vor genügend Entladungen vorbeizieht.",
    ],
    faq: [
      [
        "Trifft die Kugel beim Durchqueren von Gegnern?",
        "Nein; der Schaden stammt aus den wiederholt freigesetzten Blitzen.",
      ],
      [
        "Warum Fire Infusion verwenden?",
        "Sie fügt Brandboden und eine Endexplosion hinzu und eignet sich für Hybrid-Builds, die Infusion zuverlässig erzeugen und skalieren.",
      ],
    ],
  },
  "gas-grenade": {
    meta: {
      title: "Gas Grenade: Giftwolke, Detonation und Erholung",
      shortTitle: "Gas Grenade",
      summary:
        "Gas Grenade erzeugt eine wachsende Giftwolke, die durch Brennen oder eine Detonator-Fertigkeit explodiert; maximal bestehen 6 Wolken.",
      description:
        "Gas-Grenade-Guide für PoE2: Wolkenlimit, Gift, Feuerdetonation, Erholung, Supports und Pathfinder-Rotation.",
      imageAlt: "Pathfinder wirft Gas Grenade",
      seoTitle: "Gas Grenade: Giftwolke und Detonation (PoE2 0.5)",
      seoDescription:
        "Gas Grenade in PoE2 0.5: 6-Wolken-Limit, Feuerdetonation, Erholung, Qualität, Supports und Builds.",
    },
    overview: [
      "Gas Grenade springt und setzt nach Ablauf des Zünders Gas frei. Die Wolke vergiftet wie ein Treffer, ohne ein normaler Treffer zu sein, und wächst; Brennen oder ein kompatibler Detonator löst eine Feuerexplosion aus.",
      "Die Fertigkeit speichert mehrere Erholungsladungen und hält höchstens sechs Wolken, daher zählen Überlappung, Dauer und Aufladung.",
    ],
    keyPoints: [
      "Maximal 6 Wolken.",
      "Brennen oder Detonator sprengt die Wolke.",
      "Qualität verbessert Erholung und Feuerschaden.",
    ],
    mechanics: [
      "Giftwolke und Feuerexplosion skalieren unterschiedlich. Gift sucht Chaos, Giftstärke und Dauer; Detonation benötigt zuverlässiges Brennen oder Detonator.",
      "Seit 0.3 folgt die Fertigkeit strikt dem Granatenzünder, daher müssen bewegliche Ziele vorausberechnet werden.",
    ],
    mechanicBullets: [
      "Speichert 3 Erholungsnutzungen.",
      "Die Wolke wächst bis zu ihrem aktuellen Limit.",
      "Sie trifft nicht normal, wendet Gift aber wie ein Treffer an.",
    ],
    supports: [
      [
        "Second Wind",
        "Bietet im Burst-Fenster mehr Flexibilität bei Ladungen.",
        "core",
      ],
      [
        "Persistent Ground",
        "Verlängert die Abdeckung der Giftwolken.",
        "situational",
      ],
      [
        "Fire Mastery",
        "Unterstützt den Feuerdetonations-Zweig.",
        "situational",
      ],
    ],
    buildUse: [
      "Pathfinder kann vor Erscheinen des Bosses Wolken vorbereiten, Wither und Despair stapeln und dann Gift erhalten oder für Feuerschaden detonieren.",
    ],
    mistakes: [
      "Skaliere Gift und Feuer nicht ohne klaren Hauptzweig. Beachte das Limit von sechs Wolken und verbrauche nicht alle Ladungen, bevor der Boss anvisierbar ist.",
    ],
    faq: [
      [
        "Kann die Wolke ohne Treffer vergiften?",
        "Ja. Sie ist kein normaler Treffer, wendet Gift aber so an, als wäre sie einer.",
      ],
      [
        "Was detoniert die Wolke?",
        "Brennende Effekte und kompatible Detonator-Fertigkeiten lösen die Feuerexplosion aus.",
      ],
    ],
  },
  "lightning-spear": {
    meta: {
      title: "Lightning Spear: Teilung mit Frenzy Charge, Blitze und Shock",
      shortTitle: "Lightning Spear",
      summary:
        "Lightning Spear setzt beim Treffer 5 Blitze frei; mit einer Frenzy Charge verbraucht sie eine Ladung und teilt den Hauptspeer auf 3 Ziele.",
      description:
        "Lightning-Spear-Guide für PoE2: Blitzumwandlung, Frenzy-Charge-Teilung, sekundäre Projektile, Shock, Qualität und Amazon.",
      imageAlt: "Amazon wirft Lightning Spear",
      seoTitle: "Lightning-Spear-Teilungs-Guide (PoE2 0.5)",
      seoDescription:
        "Lightning Spear in PoE2 0.5: Umwandlung, 5 Blitze, Frenzy-Charge-Teilung, Shock, Qualität und Builds.",
    },
    overview: [
      "Lightning Spear wirft einen Speer, der beim Treffer fünf sekundäre Blitze freisetzt. Mit einer Frenzy Charge verbraucht sie eine und teilt den Hauptspeer auf drei Ziele; jeder Speer erzeugt seinen eigenen Ausbruch.",
      "Der Hauptspeer wandelt den Großteil des physischen Schadens in Blitz um; die sekundären Projektile wandeln vollständig um und schocken stärker.",
    ],
    keyPoints: [
      "Hauptspeer: 80 % physisch zu Blitz.",
      "Sekundärblitze: 100 % Umwandlung und 5 Projektile.",
      "Eine Frenzy Charge teilt den Speer auf 3 Ziele.",
    ],
    mechanics: [
      "Zusätzliche Projektile wirken auf das Limit der Sekundärblitze, nicht wie üblich auf den Hauptspeer. Dieser kann nicht pierce, fork, chain oder return.",
      "Dauerhafter Schaden hängt von der Frenzy-Charge-Erzeugung ab; eine instabile Quelle kostet Abdeckung und Mehrfachausbrüche.",
    ],
    mechanicBullets: [
      "Angriffstempo: 60 % der Basis.",
      "Blitze suchen Ziele in 5 Metern.",
      "Qualität fügt Blitze hinzu und kann Ladungsboni verdoppeln.",
    ],
    supports: [
      [
        "Lightning Mastery",
        "Erhöht bei Kompatibilität die Stufe der Blitzfertigkeit.",
        "core",
      ],
      [
        "Rapid Attacks",
        "Gleicht das niedrige Basis-Angriffstempo aus.",
        "core",
      ],
      [
        "Magnified Area",
        "Vergrößert die Burst-Abdeckung beim Clear.",
        "situational",
      ],
    ],
    buildUse: [
      "Amazon kombiniert Trefferchance, Krit und Frenzy-Charge-Erzeugung für regelmäßige Teilungen beim Clear und behält eine getrennte Einzelzielrotation.",
    ],
    mistakes: [
      "Gehe nicht davon aus, dass normale Projektilmods Hauptspeere hinzufügen. Repariere zuerst Frenzy-Charge-Nachschub und Angriffstempo.",
    ],
    faq: [
      [
        "Was bewirkt Frenzy Charge?",
        "Sie teilt den Hauptspeer auf drei Ziele, und jeder geteilte Speer erzeugt einen eigenen Blitzausbruch.",
      ],
      [
        "Kann der Hauptspeer pierce oder chain?",
        "Nein. Er folgt seiner eigenen Teilungsregel und kann nicht pierce, fork, chain oder return.",
      ],
    ],
  },
  "adonias-ego": {
    meta: {
      title: "Adonia's Ego: Power Charges, Vorbereitung und Waffenwechsel",
      shortTitle: "Adonia's Ego",
      summary:
        "Adonia's Ego ist eine einzigartige Siphoning Wand, die mit Infusion und Waffenwechsel Power Charges für anspruchsvolle Zauber-Builds vorbereitet.",
      description:
        "Adonia's-Ego-Guide für PoE2: Power Charges, Waffensets, häufige Ausfälle und Einsatz bei Stormweaver.",
      seoTitle: "Adonia's Ego: Power Charges und Waffenwechsel",
      seoDescription:
        "Adonia's Ego in PoE2 0.5: Infusion-Vorbereitung, Waffenwechsel, Power Charges, Fehler und Stormweaver-Einsatz.",
    },
    overview: [
      "Adonia's Ego dient dazu, Infusion aktiv zu erzeugen und zu verbrauchen, um Power Charges vorzubereiten. Meist liegt sie in einem eigenen Waffenset, damit sie die Hauptschadenswaffe nicht verdrängt.",
      "Sie ist keine passive Ladungsquelle: Fertigkeiten und Waffensets müssen korrekt eingerichtet und die Sequenz zu Kartenbeginn oder vor einem Boss ausgeführt werden.",
    ],
    keyPoints: [
      "Führe die Vorbereitung in einem getrennten Waffenset aus.",
      "Aktiviere die Infusion-Fertigkeit im richtigen Set.",
      "Das Hauptset kann eine stärkere Rare-Wand oder Kernwaffe verwenden.",
    ],
    properties: [
      [
        "Basis",
        "Siphoning Wand",
        "Einzigartige Wand für die Infusion- und Power-Charge-Sequenz.",
      ],
      [
        "Haupteinsatz",
        "Power Charges vorbereiten",
        "Unterstützt die Vorbereitung, ersetzt nicht die Schadensrotation.",
      ],
      [
        "Hauptrisiko",
        "Waffenset-Einstellung",
        "Eine falsche Aktivierung lässt den Gegenstand wirkungslos erscheinen.",
      ],
    ],
    buildUse: [
      "Builds wie Adonia's Trifusion Stormweaver tragen sie im zweiten Set, erzeugen Infusion und Ladungen und wechseln danach zurück zum Hauptset.",
    ],
    alternatives: [
      "Ohne diese Sequenz bietet eine seltene Wand mit Focus meist mehr. Kaufe den Gegenstand nur, wenn der Build erklärt, wie die Ladungen verbraucht werden.",
    ],
    mistakes: [
      "Häufig sind die Fertigkeit im falschen Set aktiv oder die nötige Infusion wurde nicht erzeugt. Ein Konflikt einer einzigartigen Rune zwischen den Sets kann die Sequenz ebenfalls deaktivieren.",
    ],
    faq: [
      [
        "Soll sie die Hauptschadenswaffe sein?",
        "Normalerweise nicht. Viele 0.5-Builds halten sie im zweiten Set und greifen mit einer stärkeren Wand oder Wand plus Focus an.",
      ],
      [
        "Warum erhalte ich keine Ladungen?",
        "Prüfe Infusion-Quelle, Skill-Aktivierung pro Waffenset und Konflikte einzigartiger Runes.",
      ],
    ],
  },
  "sire-of-shards": {
    meta: {
      title: "Sire of Shards: kreisförmige Projektile, Zauber und Einsatz",
      shortTitle: "Sire of Shards",
      summary:
        "Sire of Shards ist ein einzigartiger Chiming Staff mit Sigil of Power, Zauberschaden und Cast Speed, der 4 Projektile kreisförmig hinzufügt.",
      description:
        "Sire-of-Shards-Guide für PoE2: Mods, kreisförmige Projektile, Sigil of Power, Ball Lightning, Abwägungen und Alternativen.",
      seoTitle: "Sire of Shards und kreisförmige Projektile (PoE2 0.5)",
      seoDescription:
        "Sire of Shards in PoE2 0.5: +4 Projektile im Kreis, Zauberschaden, Cast Speed, Sigil of Power und Alternativen.",
    },
    overview: [
      "Sire of Shards lässt kompatible Zauber vier zusätzliche Projektile kreisförmig abfeuern. Dazu kommen Sigil of Power Stufe 10, Zauberschaden, Cast Speed und etwas Elementarwiderstand.",
      "Das Kreismuster deckt Karten gut ab, kann aber konzentrierten Schaden verringern. Entscheidend ist die Geometrie der Fertigkeit, nicht nur der Anzeigewert.",
    ],
    keyPoints: [
      "Zauber feuern 4 zusätzliche Projektile ab.",
      "Projektile werden kreisförmig abgegeben.",
      "Gewährt Sigil of Power Stufe 10.",
    ],
    properties: [
      [
        "Zauberschaden",
        "80–120 % erhöht",
        "Globaler Modifikator mit großer Spanne.",
      ],
      ["Cast Speed", "10–20 % erhöht", "Verbessert das Self-Cast-Gefühl."],
      [
        "Projektile",
        "+4 im Kreis",
        "Verändert Clear-Abdeckung und Bosspositionierung.",
      ],
      ["Benötigte Stufe", "25", "Aktuelle Anforderung der Basis."],
    ],
    buildUse: [
      "Zauber wie Ball Lightning nutzen die Streuung für Gruppen oder überlappen nahe großer Ziele; Ballcano Blood Mage kann den Stab als Übergangs- oder Kernwaffe einsetzen.",
    ],
    alternatives: [
      "Wenn konzentrierter Bossschaden, Verteidigung oder Krit wichtiger sind, können ein seltener Stab, Wand plus Focus oder ein anderes spezialisiertes Unique stärker sein.",
    ],
    mistakes: [
      "Vier zusätzliche Projektile garantieren nicht fünffachen Bossschaden: Das Kreismuster entscheidet, wie viele das Ziel tatsächlich durchqueren.",
    ],
    faq: [
      [
        "Erhalten alle Zauber vier Projektile?",
        "Nur kompatible Projektilzauber; andere Zauber bekommen das Kreismuster nicht.",
      ],
      [
        "Ist der höchste Schadensroll immer am besten?",
        "Er ist wertvoll, doch Cast Speed und Kompatibilität des Musters können wichtiger als ein kleiner Schadensunterschied sein.",
      ],
    ],
  },
  "crown-of-the-pale-king": {
    meta: {
      title: "Crown of the Pale King: Thorns, Mods und Runemaster-Upgrade",
      shortTitle: "Crown of the Pale King",
      summary:
        "Niedrigstufige einzigartige Cultist Crown, die physischen Thorns-Schaden hinzufügt und Thorns gegen alle Treffer zurückschlagen lässt.",
      description:
        "Crown-of-the-Pale-King-Guide für PoE2: Thorns, Rüstung, Energieschild, Leben, Runemaster-Upgrade und Warbringer.",
      seoTitle: "Crown of the Pale King und Thorns (PoE2 0.5)",
      seoDescription:
        "Crown of the Pale King in PoE2 0.5: Vergeltung gegen alle Treffer, Leben, Verteidigung, Upgrade und Builds.",
    },
    overview: [
      "Crown of the Pale King ermöglicht frühe Vergeltungs-Builds, indem sie physischen Thorns-Schaden hinzufügt und Thorns auf alle Treffer reagieren lässt.",
      "Sie bietet außerdem Rüstung, Energieschild, maximales Leben und Seltenheit. Die Anforderung ist niedrig und später ist ein Upgrade zu Runemastered Cultist Crown möglich.",
    ],
    keyPoints: [
      "Thorns schlägt gegen alle Treffer zurück.",
      "Fügt physischen Thorns-Schaden hinzu.",
      "Kann zu Runemastered Cultist Crown aufgewertet werden.",
    ],
    properties: [
      [
        "Verteidigung",
        "50–100 % mehr Rüstung und Energieschild",
        "Große lokale Spanne.",
      ],
      ["Maximales Leben", "+40–80", "Nützliche frühe Überlebensfähigkeit."],
      [
        "Thorns",
        "10–15 bis 20–25 physisch",
        "Aktuelle explizite Vergeltungsspanne.",
      ],
      [
        "Einzigartiger Effekt",
        "Vergeltung gegen alle Treffer",
        "Kernmodifikator für Thorns.",
      ],
    ],
    buildUse: [
      "Thorns Warbringer nutzt den Helm für zuverlässige Vergeltung und skaliert Thorns, Armor Break und Überleben, um die schadenauslösenden Treffer auszuhalten.",
    ],
    alternatives: [
      "Ist die Auslösung bereits gelöst oder brauchst du deutlich mehr Rüstung, Leben, Widerstände oder eine bestimmte Corruption, ist ein defensiver Rare-Helm besser.",
    ],
    mistakes: [
      "Der Helm ersetzt keine Verteidigung. Du musst den Treffer überleben, damit Thorns wirkt, und schwere Bossangriffe weiterhin meiden.",
    ],
    faq: [
      [
        "Löst er Thorns bei jedem Treffer aus?",
        "Der Kernmod erlaubt Vergeltung gegen alle Treffer, doch der Charakter muss sie weiterhin empfangen und überleben.",
      ],
      [
        "Kann man ihn aufwerten?",
        "Ja. Das aktuelle Runeforging-System enthält das Rezept für Runemastered Cultist Crown.",
      ],
    ],
  },
  "best-atlas-tree-0-5": {
    meta: {
      title: "Bester Atlas-Baum in PoE2 0.5: die ersten 20, 40 und 60 Punkte",
      shortTitle: "Atlas-Baum 0.5",
      summary:
        "Stufenplan: Sichere zuerst Waystone-Nachschub und Fortschritt, bevor du dich mit Atlas Master auf eine profitable Mechanik spezialisierst.",
      description:
        "Atlas-Baum-Guide für PoE2 0.5 mit 20/40/60-Punkte-Pfaden, Waystone-Nachschub, Atlas Master, Spezialisierung und Respec.",
      imageAlt: "Doryani an der Atlas-Oberfläche von PoE2",
      seoTitle: "Bester Atlas-Baum PoE2 0.5: 20/40/60 Punkte",
      seoDescription:
        "Atlas-Pfad in PoE2 0.5: erste 20, 40 und 60 Punkte, Waystones, Atlas Master, profitable Mechanik und Respec.",
    },
    quickAnswers: [
      [
        "Erste Priorität",
        "Sichere Waystones und Fortschritt vor spezialisiertem Profit.",
      ],
      [
        "Zeitpunkt der Spezialisierung",
        "Wähle bei stabilen Karten und Defenses eine Mechanik und kombiniere Atlas Master und Tablet.",
      ],
      [
        "Zeitpunkt für Respec",
        "Wechsle, wenn dein Build die Mechanik nicht sicher schafft oder die Kosten den erwarteten Ertrag übersteigen.",
      ],
    ],
    overview: [
      "Es gibt keinen dauerhaft einzigen besten Atlas. Der erste Baum löst Zugang und Nachschub; Profit-Passiven kommen, wenn der Charakter den Zielinhalt konstant abschließt.",
      "Nutze 20/40/60 Punkte als Prüfstände und kopiere keinen Baum, der Endgame-Ausrüstung und vollständige Freischaltungen voraussetzt.",
    ],
    keyPoints: [
      "Erst Nachschub, dann Profit.",
      "Schließe eine Spezialisierung ab, bevor du Punkte verteilst.",
      "Tablet und Kartenmods müssen zur Strategie passen.",
    ],
    steps: [
      [
        "Erste 20 Punkte",
        "Priorisiere Waystone-Nachschub, Fortschritt und Knoten für stabile normale Karten.",
      ],
      [
        "Etwa 40 Punkte",
        "Wähle den Atlas Master deiner Schleife und beginne einen Mechanikzweig.",
      ],
      [
        "Etwa 60 Punkte",
        "Schließe die Belohnungscluster ab, füge sichere Menge und Seltenheit hinzu und meide unspielbare Mods.",
      ],
      [
        "Nach 60 Punkten",
        "Ergänze erst eine zweite Mechanik, wenn die erste stabil und bezahlbar ist.",
      ],
    ],
    decisions: [
      "Schnelle Flächen-Builds bevorzugen Breach oder Delirium; zähe, kontrollierte Builds bewältigen Expedition und gefährliche Remnants. In SSF sind deterministische Materialien wichtiger als nur im Handel realisierbarer Wert.",
    ],
    mistakes: [
      "Kopiere beim Karteneinstieg keinen teuren Profit-Baum, verteile Punkte nicht auf vier Mechaniken und kaufe keine teuren Tablet, bevor du die Basisbegegnung sicher schaffst.",
    ],
    faq: [
      [
        "Soll ich sofort Item Quantity nehmen?",
        "Nein. Sie lohnt sich erst nach stabilem Waystone-Nachschub und Überleben.",
      ],
      [
        "Wie wähle ich Atlas Master?",
        "Nimm den Master, der die eine Mechanik verstärkt, die du am zuverlässigsten abschließt und dauerhaft spielen willst.",
      ],
    ],
  },
  "currency-farming-strategies-0-5": {
    meta: {
      title: "Währungs-Farming in PoE2 0.5: Budget, Atlas und Risiko",
      shortTitle: "Währungs-Farming 0.5",
      summary:
        "Wähle Strategien nach Charakterstärke, Einstiegskosten, Liquidität und Fehlschlagrisiko statt nach schnell veraltenden Stundenwerten.",
      description:
        "Währungs-Guide für PoE2 0.5: Expedition, Runes of Aldur, Breach, Delirium, Ritual und günstige Karten samt Kosten und Risiko.",
      imageAlt: "Währungen und Crafting-Materialien aus PoE2",
      seoTitle: "Währungs-Farming PoE2 0.5 nach Budget",
      seoDescription:
        "Wähle eine Farming-Strategie in PoE2 0.5: Expedition, Runes, Breach, Delirium, Ritual und Atlas-Konfiguration.",
    },
    quickAnswers: [
      [
        "Kleines Budget",
        "Spiele normale Karten mit Nachschubknoten und verkaufe liquide Materialien; kaufe keine teuren Einladungen.",
      ],
      [
        "Stabile Strategie",
        "Expedition und Grand Expedition liefern klare Handelswaren, erfordern aber sorgfältige Remnant-Planung.",
      ],
      [
        "Hohe Schwankung",
        "Ritual, Delirium-Bossrush und Wetten mit teuren Runes brauchen mehr Kapital und Risikotoleranz.",
      ],
    ],
    overview: [
      "Profit verändert sich mit dem Markt. Dieser Guide vergleicht Strukturen und verspricht keine feste Zahl an Divine Orbs pro Stunde.",
      "Erfasse mindestens 20 Durchläufe mit Kosten, Abschlüssen, liquiden Beuten und Fehlschlägen, bevor du die Strategie bewertest.",
    ],
    keyPoints: [
      "Liquidität zählt mehr als theoretischer Wert.",
      "Eine immer abgeschlossene normale Strategie schlägt eine fortgeschrittene mit häufigen Toden.",
      "Bepreise Einsatzmaterialien vor der Stichprobe.",
    ],
    steps: [
      [
        "Karten stabilisieren",
        "Nutze Waystone-Nachschub und günstige Tablet, bis du den Ziel-Tier ohne verschwendete Portale abschließt.",
      ],
      [
        "Eine Schleife wählen",
        "Wähle Expedition, Runes, Breach, Delirium oder Ritual nach Build-Stärke und aktuellen Preisen.",
      ],
      [
        "20 Durchläufe erfassen",
        "Notiere Gesamtkosten, direkte Währung, liquide Materialien, wertvolle Gegenstände und Fehlschläge.",
      ],
      [
        "Nach Prüfung skalieren",
        "Kaufe bessere Tablet oder Einladungen nur, wenn der Gewinn nach Abzug unverkaufter Bestände positiv bleibt.",
      ],
    ],
    decisions: [
      "Expedition belohnt Planung und Robustheit; Breach und Delirium schnelle Fläche; Ritual benötigt Schaden auf engem Raum. Liegt der Erwartungswert einer teuren Rune of Aldur unter ihrem Preis, verkaufe sie direkt.",
    ],
    mistakes: [
      "Rechne unverkäufliche Rares nicht zu Wunschpreisen ein, ignoriere gescheiterte Karten nicht und wechsle nicht nach drei Glückstreffern. Definiere Ergebnis und Verlustgrenze vor teurem Crafting.",
    ],
    faq: [
      [
        "Was ist der sicherste Einstieg?",
        "Normale Karten mit Nachschubknoten und liquiden Drops, bevor ein ungetesteter Build teure Zugänge kauft.",
      ],
      [
        "Wann muss ich Profit neu berechnen?",
        "Bei jedem Patch, populären Guide oder Marktwechsel, der Angebot, Nachfrage oder Kosten verändert.",
      ],
    ],
  },
  "classes-ascendancies-guide": {
    meta: {
      title: "Klassen und Ascendancies in PoE2: Auswahl nach Spielstil in 0.5",
      shortTitle: "Klassen und Ascendancies",
      summary:
        "Ordne aktuelle Klassen Nahkampf, Fernkampf, Zaubern, Minions, Verwandlung oder wenigen Tasten zu, statt eine Tierlist als dauerhafte Antwort zu behandeln.",
      description:
        "Wähle Klasse und Ascendancy in PoE2 0.5 nach Spielstil, Komplexität, Verteidigung, SSF und verfügbarem vollständigen Build-Guide.",
      imageAlt: "Kampfszene zur Klassen- und Ascendancy-Wahl in PoE2",
      seoTitle: "Klassen- und Ascendancy-Guide für PoE2 0.5",
      seoDescription:
        "Wähle deine Klasse und Ascendancy in PoE2 0.5 nach Stil, Schwierigkeit, Verteidigung, SSF und Build.",
    },
    quickAnswers: [
      [
        "Einfachste Wahl",
        "Entscheide zuerst, wie du kämpfen willst, und suche danach einen aktuellen Guide mit vollständigem Levelpfad.",
      ],
      [
        "Klassenbeschränkung",
        "Die Basisklasse legt Passive-Start und Ascendancies fest; die meisten Gems sind nicht klassengebunden.",
      ],
      [
        "Kann man wechseln?",
        "Du kannst die Ascendancy nach aktuellen Regeln anpassen, aber keine Basisklasse in eine andere verwandeln.",
      ],
    ],
    overview: [
      "Die Klassenwahl sperrt Fertigkeiten nicht dauerhaft. Sie bestimmt Startposition im Baum, Attributnähe und verfügbare Ascendancies.",
      "Für den ersten Charakter zählt ein vollständiger Guide mehr als theoretisches S-Tier-Potenzial. Suche klare Skillwechsel, häufige Ausrüstung und verständliche Verteidigung.",
    ],
    keyPoints: [
      "Warrior: Rüstung, schwere Schläge, Schild und Thorns.",
      "Ranger/Huntress: Bogen, Speer, Mobilität und Begleiter.",
      "Sorceress/Witch: Zauber, Trigger, Minions, Leben und Energieschild.",
      "Mercenary/Monk: Armbrust, Qualität, Quarterstaff und schneller Nahkampf.",
      "Druid: Verwandlung, Pflanzen und hybride Angriffe/Zauber.",
    ],
    steps: [
      [
        "Kampfreichweite wählen",
        "Entscheide zwischen Nahkampf, Fernangriff, Zauber, Minions oder Verwandlung.",
      ],
      [
        "Komplexität wählen",
        "Wähle wenige Tasten, Kombos, Trigger oder Ressourcen nach dem Aufwand, den du dauerhaft willst.",
      ],
      [
        "Einstiegshürde prüfen",
        "Der erste Build sollte kein seltenes Unique, teures Anointment oder versteckte Ascendancy benötigen.",
      ],
      [
        "Passenden Guide öffnen",
        "Prüfe Kampagnen-Skills, Passive-Meilensteine, Ausrüstungspriorität und Alternativen.",
      ],
    ],
    decisions: [
      "Für Tempo eignet sich eine Fernkampf-Deadeye, für Zähigkeit ein Schild- oder Rüstungs-Warrior. Minion-Spieler vergleichen Infernalist und Spirit Walker; Caster wählen einfachen Self-Cast oder komplexe Trigger.",
    ],
    mistakes: [
      "Wähle nicht nur nach Tier-Buchstaben, verwechsle Showcase-Ausrüstung nicht mit Startausrüstung und lege die Ascendancy nicht fest, bevor dir ihre Kernmechanik gefällt.",
    ],
    faq: [
      [
        "Kann jede Klasse jede Fertigkeit nutzen?",
        "Viele Skills sind klassenübergreifend, wenn Waffe und Attribute passen; Baumposition und Ascendancy erzeugen dennoch große Unterschiede.",
      ],
      [
        "Welche Klasse ist für Anfänger am besten?",
        "Die mit einem aktuellen, günstigen und vollständigen Pfad, dessen Rotation und Verteidigung du verstehst.",
      ],
    ],
  },
  "act-1-4-boss-permanent-rewards-checklist": {
    meta: {
      title: "Checkliste der Bosse und permanenten Belohnungen in Akt 1–4",
      shortTitle: "Boss-Checkliste Akt 1–4",
      summary:
        "Unterscheide Hauptbosse, optionale Ziele mit permanenten Belohnungen und leicht übersehene Questgegenstände in Akt 1 bis 4.",
      description:
        "PoE2-Checkliste für Akt 1–4: Bossreihenfolge, Leben, Spirit, Widerstände, Waffenset-Punkte und verpasste Belohnungen.",
      imageAlt: "Count Geonor als Symbol der PoE2-Kampagnen-Bosscheckliste",
      seoTitle: "PoE2-Bosse und permanente Belohnungen Akt 1–4",
      seoDescription:
        "Verfolge PoE2-Bosse, Leben, Spirit, Widerstände, Waffenset-Passivpunkte und optionale Ziele in Akt 1–4.",
    },
    quickAnswers: [
      [
        "Hauptbosse",
        "Folge den Hauptmarkierungen; diese Kämpfe öffnen das nächste Gebiet oder den nächsten Akt.",
      ],
      [
        "Permanente Belohnungen",
        "Prüfe vor dem Verlassen Ziele für Leben, Spirit, Widerstände und Waffenset-Punkte.",
      ],
      [
        "Belohnung verpasst",
        "Kehre per Waypoint zurück, schließe das Ziel ab und benutze oder übergib den Gegenstand wie verlangt.",
      ],
    ],
    overview: [
      "Die Seite verbindet den Bossweg mit einer permanenten Checkliste, damit du Pflichtziele, lohnende Umwege und spätere Aufgaben unterscheidest.",
      "Werte und Wege können sich mit der Kampagne ändern. Einzelne Angriffe stehen auf Bossseiten, genaue Zahlen im Guide zu permanenten Belohnungen.",
    ],
    keyPoints: [
      "Akt 1: Beira, Crowbell, King in the Mists und Candlemass.",
      "Akt 2: Balbala öffnet die erste Trial und Kabala gibt Waffenset-Punkte.",
      "Akt 3: Mighty Silverfist und Ignagduk gewähren permanente Stärke.",
      "Akt 4 und Übergangskapitel fügen Spirit, Widerstände und Fortschritt hinzu.",
    ],
    steps: [
      [
        "Beim Betreten eines Akts",
        "Öffne die Checkliste und markiere nur für den aktuellen Patch bestätigte Belohnungen.",
      ],
      [
        "Story vorantreiben",
        "Besiege zuerst Hauptbosse und öffne Waypoints, bevor du lange Umwege nimmst.",
      ],
      [
        "Nahe Belohnungen holen",
        "Erledige Ziele auf dem Hauptweg oder solche, die ein aktuelles Problem lösen, sofort.",
      ],
      [
        "Vor Karten prüfen",
        "Hole alle verpassten permanenten Belohnungen vor großen Endgame-Investitionen nach.",
      ],
    ],
    decisions: [
      "Priorisiere Widerstände oder Leben bei Überlebensproblemen; hole Spirit früh für Auren, Minions oder anhaltende Skills. Waffenset-Punkte sind am wertvollsten, wenn du tatsächlich zwei spezialisierte Bäume nutzt.",
    ],
    mistakes: [
      "Ein Bosskill gewährt nicht immer automatisch die Belohnung: Manche Drops werden rechtsgeklickt, andere zu einem NPC gebracht. Der Kampagnen-King in the Mists ist nicht der Endgame-Pinnacle.",
    ],
    faq: [
      [
        "Kann ich eine verpasste Belohnung später holen?",
        "Ja. Kehre zum Waypoint zurück, erledige Boss oder Quest und prüfe, ob der Gegenstand benutzt oder abgegeben werden muss.",
      ],
      [
        "Muss ich jeden optionalen Boss sofort töten?",
        "Permanente Attributs-Bosse lohnen sich meist; ein reiner Beute-Boss kann warten, wenn der Umweg lang ist.",
      ],
    ],
  },
  "the-executioner": {
    meta: {
      title:
        "The Executioner: schwere Schläge, Verstärkung und Ogham-Village-Weg",
      shortTitle: "The Executioner",
      summary:
        "Hauptboss in Akt 1 von Ogham Village, dessen langsame physische Schläge, roter Frontalangriff und Verstärkung frontales Stehen bestrafen.",
      description:
        "The-Executioner-Guide für PoE2: Ort, Angriffssignale, Verstärkung, sichere Position, Feuerwiderstand und Questfortschritt.",
      seoTitle: "The-Executioner-Guide für Akt 1 (PoE2)",
      seoDescription:
        "Besiege The Executioner in PoE2: Weg durch Ogham Village, roter Schlag, Verstärkung, Positionierung, Vorbereitung und Quest.",
    },
    overview: [
      "The Executioner blockiert den Hauptweg am Ende von Ogham Village. Er greift langsam an, bestraft frontal aber hart, und seine Verstärkung überfüllt die Arena, wenn sie nicht beseitigt wird.",
      "Sicher ist, in mittlerer Distanz zu kreisen, während der Aufladung seitlich zu rollen oder hinter ihn zu gelangen und während der langen Erholung anzugreifen.",
    ],
    keyPoints: [
      "Ort: Executioner's Block am Ende von Ogham Village.",
      "Gefahren: schwere physische Schläge und frontale Schwünge.",
      "Ergebnis: bringt The Trail of Corruption voran.",
    ],
    strategy: [
      "Hebt er die Waffe oder leuchtet rot, verlasse die Frontlinie: Rolle auf Distanz seitlich oder durchquere ihn im Nahbereich zum Rücken. Greife in seiner Erholung an.",
      "Töte bei gerufenen Söldnern zuerst Fernkämpfer und bewege dich am Arenarand. Erzwinge keinen Bossschaden, wenn Projektile und Brandboden überlappen.",
    ],
    strategyBullets: [
      "Stehe während der Aufladung nicht frontal.",
      "Beseitige Verstärkung vor dem nächsten Bossangriff.",
      "Bewahre eine Ausweichrolle für den roten Linienangriff auf.",
    ],
    preparation: [
      "Verbessere Hauptfertigkeit und Waffe vor dem Eintritt. Feuerwiderstand hilft gegen Gebiet und Brandboden; genug Leben und Mobilität verhindern einen One-Shot durch schwere physische Angriffe.",
    ],
    faq: [
      [
        "Wo ist The Executioner?",
        "Im Executioner's Block am Ende von Ogham Village in Akt 1, meist auf der anderen Seite des Waypoints.",
      ],
      [
        "Was muss ich zuerst meiden?",
        "Den roten oder mit erhobener Waffe ausgeführten Schlag; bleibe danach beim breiten Schwung aus der Front.",
      ],
      [
        "Was schaltet der Sieg frei?",
        "Er setzt The Trail of Corruption fort und öffnet den Weg zu Manor Ramparts.",
      ],
    ],
  },
};
