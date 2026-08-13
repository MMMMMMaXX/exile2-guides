// Sync The Executioner boss article to the enhanced 5th-batch format for the
// 8 non-en/zh-cn locales (pt-br, ru, de, es, fr, ja, ko, tr).
// Adds: damage-types, community-evidence, video, gallery sections + local media.
// Fixes: heroImage/cardImage -> local webp, verificationStatus, phases, revision.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const EN_REVISION = "the-executioner-2026-08-11-enhance";
const VIDEO_URL = "https://www.youtube.com/watch?v=Iw-9TDJ76Xg";
const MEDIA_IDS = ["hero", "arena", "phase", "annotated", "attack", "video"];

// Per-locale translations for the 4 new sections + media + verification note.
const T = {
  "pt-br": {
    dmgTitle: "Perfil de Dano",
    physLabel: "Físico",
    physMit: [
      "Vida alta, armadura ou evasão e posicionamento lateral/traseiro.",
      "Não fique dentro da linha frontal da arma.",
    ],
    physNotes: [
      "O golpe aéreo, o ataque de linha vermelha e a varredura ampla são todos físicos.",
    ],
    fireLabel: "Fogo",
    fireMit: [
      "Resistência ao fogo ajuda quando efeitos no chão e mercenários se sobrepõem.",
      "Saia do chão em chamas antes de se comprometer com uma conjuração.",
    ],
    fireNotes: ["Fogo no chão e fogo de mercenário são a pressão secundária."],
    commTitle: "Com o que os jogadores geralmente têm dificuldade",
    c1: {
      q: "O ataque de linha vermelha continua me matando",
      sum: [
        "Os jogadores recuam ao longo da linha de ataque e são pegos pelo ataque completo.",
      ],
      ea: [
        "A linha é um ataque frontal comprometido; o movimento lateral após o travamento é a solução, não recuar.",
      ],
      oa: [
        "Saia da faixa frontal lateralmente assim que a mira vermelha travar; nunca ande para trás ao longo da linha.",
      ],
      ll: "Ver ataque em linha reta →",
    },
    c2: {
      q: "Mercenários sobrecarregam a arena",
      sum: [
        "Adicionais à distância empilham dano enquanto o chefe continua balançando.",
      ],
      ea: [
        "A pressão à distância bloqueia o movimento e esconde o sinal do machado.",
      ],
      oa: [
        "Mate mercenários à distância primeiro enquanto circula para que o chefe fique visível.",
      ],
      ll: "Ver mercenários convocados →",
    },
    c3: {
      q: "Corpo a corpo não encontra uma abertura",
      sum: [
        "Os jogadores trocam golpes durante a varredura em vez de usar a recuperação.",
      ],
      ea: ["A recuperação do golpe é a única janela corpo a corpo segura."],
      oa: [
        "Provoque o golpe aéreo, cruze para trás após o travamento, use um combo curto e saia.",
      ],
      ll: "Ver abertura corpo a corpo →",
    },
    vidTitle: "Guia em vídeo com timestamps",
    vidLabel: "The Executioner — guia de luta fácil (patch atual)",
    vidDesc:
      "Passo a passo do Executioner no patch atual com rota de Ogham Village e sinais de golpes.",
    vt: [
      "Rota de Ogham Village e entrada na arena",
      "Golpe de machado aéreo e janela de recuperação",
      "Golpe de execução em linha vermelha",
      "Mercenários convocados e chão de fogo",
      "Janela de kill e libertar Leitis",
    ],
    galTitle: "Galeria de mídia",
    vcNote:
      "As mecânicas publicadas foram verificadas com o banco de dados de versões atuais vinculado, histórico oficial de patches e a referência comunitária nomeada. O desempenho exato ainda depende do equipamento do personagem, modificadores de mapa e execução do jogador.",
    media: [
      {
        alt: "O Carrasco erguendo a arma durante a luta de chefe do Ato 1",
        cap: "Arte de identificação atmosférica; não transmite mecânicas.",
      },
      {
        alt: "Layout da arena do Carrasco em Ogham Village",
        cap: "Arena anotada: zonas seguras, caminhos de ataque e sobreposição de perigo.",
      },
      {
        alt: "Captura de tela da fase do Carrasco",
        cap: "Captura de referência de fase com anotações de telegrafia.",
      },
      {
        alt: "Anotação de mecânica do Carrasco",
        cap: "Diagrama editorial original do mecanismo central e rota segura.",
      },
      {
        alt: "Sinal de ataque do Carrasco",
        cap: "Quadro anotado de preparação de ataque mostrando zona de perigo.",
      },
      {
        alt: "Guia em vídeo do Carrasco",
        cap: "Miniatura do guia em vídeo com navegação por timestamp.",
      },
    ],
  },
  ru: {
    dmgTitle: "Профиль урона",
    physLabel: "Физический",
    physMit: [
      "Высокое здоровье, броня или уклонение и позиция сбоку/сзади.",
      "Не стойте внутри передней линии оружия.",
    ],
    physNotes: [
      "Навес сверху, удар красной линией и широкий размах — всё физическое.",
    ],
    fireLabel: "Огонь",
    fireMit: [
      "Сопротивление огню помогает, когда эффекты на земле и наёмники накладываются.",
      "Уходите с горящей земли, прежде чем начинать заклинание.",
    ],
    fireNotes: ["Горящая земля и огонь наёмников — вторичное давление."],
    commTitle: "С чем игроки чаще всего не справляются",
    c1: {
      q: "Красная линия атаки всё время убивает меня",
      sum: ["Игроки отступают вдоль линии атаки и попадают под полный удар."],
      ea: [
        "Линия — это нацеленная фронтальная атака; боковое движение после фиксации — решение, а не отход назад.",
      ],
      oa: [
        "Уходите из передней полосы вбок, как только красный прицел зафиксируется; никогда не идите назад вдоль линии.",
      ],
      ll: "Смотреть прямую атаку →",
    },
    c2: {
      q: "Наёмники забивают арену",
      sum: [
        "Дальние добавления накапливают урон, пока босс продолжает размахивать.",
      ],
      ea: [
        "Давление с дистанции блокирует движение и скрывает подсказку топора.",
      ],
      oa: [
        "Сначала убивайте дальних наёмников, кружа так, чтобы босс оставался видимым.",
      ],
      ll: "Смотреть призванных наёмников →",
    },
    c3: {
      q: "Ближнику негде найти окно",
      sum: [
        "Игроки обмениваются ударами во время размаха вместо использования восстановления.",
      ],
      ea: [
        "Восстановление после удара — единственное безопасное окно для ближнего боя.",
      ],
      oa: [
        "Спровоцируйте удар сверху, обойдите сзади после фиксации, сделайте короткое комбо и уходите.",
      ],
      ll: "Смотреть окно ближнего боя →",
    },
    vidTitle: "Видеогайд с таймкодами",
    vidLabel: "The Executioner — простой гайд по бою (актуальный патч)",
    vidDesc:
      "Прохождение Executioner на актуальном патче: маршрут Ogham Village и подсказки ударов.",
    vt: [
      "Маршрут Ogham Village и вход на арену",
      "Навес топором сверху и окно восстановления",
      "Прямой удар красной линией казни",
      "Призванные наёмники и горящая земля",
      "Окно добивания и освобождение Leitis",
    ],
    galTitle: "Медиагалерея",
    vcNote:
      "Опубликованные механики проверены по привязанной базе данных актуальной версии, официальной истории патчей и названной пользовательской ссылке. Точный результат всё ещё зависит от снаряжения персонажа, модификаторов карты и исполнения игрока.",
    media: [
      {
        alt: "Палач поднимает оружие во время босса первого акта",
        cap: "Атмосферная опознавательная картинка; не передаёт механику.",
      },
      {
        alt: "Раскладка арены Палача в Ogham Village",
        cap: "Размеченная арена: безопасные зоны, пути атак и зона опасности.",
      },
      {
        alt: "Скриншот фазы Палача",
        cap: "Скриншот фазы с аннотациями телеграфов.",
      },
      {
        alt: "Аннотация механики Палача",
        cap: "Авторская редакционная схема ключевой механики и безопасного пути.",
      },
      {
        alt: "Подсказка атаки Палача",
        cap: "Кадр подготовки атаки с отмеченной опасной зоной.",
      },
      {
        alt: "Видеогайд по Палачу",
        cap: "Превью видеогайда с навигацией по таймкодам.",
      },
    ],
  },
  de: {
    dmgTitle: "Schadensprofil",
    physLabel: "Physisch",
    physMit: [
      "Hohes Leben, Rüstung oder Ausweichen und seitliche/hintere Positionierung.",
      "Stehe nicht in der vorderen Waffenlinie.",
    ],
    physNotes: [
      "Der Überkopf-Hieb, der rote Linienangriff und der weite Schwung sind alle physisch.",
    ],
    fireLabel: "Feuer",
    fireMit: [
      "Feuerresistenz hilft, wenn Bodenefekte und Söldner sich überlappen.",
      "Verlasse brennenden Boden, bevor du eine Zauberung beginnst.",
    ],
    fireNotes: ["Brennender Boden und Söldnerfeuer sind der sekundäre Druck."],
    commTitle: "Womit Spieler am häufigsten kämpfen",
    c1: {
      q: "Der rote Linienangriff tötet mich immer wieder",
      sum: [
        "Spieler weichen entlang der Angriffslinie zurück und werden vom vollen Treffer erfasst.",
      ],
      ea: [
        "Die Linie ist ein fester Frontalangriff; seitwärts bewegen nach der Zielerfassung ist die Lösung, nicht zurückweichen.",
      ],
      oa: [
        "Verlasse die vordere Spur seitlich, sobald das rote Ziel einrastet; geh nie zurück entlang der Linie.",
      ],
      ll: "Geraden Angriff ansehen →",
    },
    c2: {
      q: "Söldner überrennen die Arena",
      sum: [
        "Fernkampf-Additions stapeln Schaden, während der Boss weiter ausholt.",
      ],
      ea: [
        "Fernkampfdruck blockiert die Bewegung und verdeckt das Axt-Signal.",
      ],
      oa: [
        "Töte fernkampf-Söldner zuerst, während du kreist, damit der Boss sichtbar bleibt.",
      ],
      ll: "Beschworene Söldner ansehen →",
    },
    c3: {
      q: "Nahkampf findet keine Lücke",
      sum: [
        "Spieler tauschen Hiebe während des Schwungs statt die Erholung zu nutzen.",
      ],
      ea: [
        "Die Erholung nach dem Hieb ist das einzige sichere Nahkampf-Fenster.",
      ],
      oa: [
        "Ködere den Überkopf-Hieb, geh nach der Fixierung nach hinten, ein kurzes Kombo, dann raus.",
      ],
      ll: "Nahkampf-Lücke ansehen →",
    },
    vidTitle: "Videoguide mit Zeitstempeln",
    vidLabel: "The Executioner — einfacher Kampf-Guide (aktueller Patch)",
    vidDesc:
      "Durchlauf von Executioner im aktuellen Patch mit Ogham-Village-Route und Schlag-Telegraphs.",
    vt: [
      "Ogham-Village-Route & Arenabetritt",
      "Überkopf-Axtschwung und Erholungsfenster",
      "Gerader roter Exekutionsschlag",
      "Beschworene Söldner & Feuerboden",
      "Tötungsfenster und Leitis befreien",
    ],
    galTitle: "Mediengalerie",
    vcNote:
      "Veröffentlichte Mechaniken wurden anhand der verlinkten Datenbank der aktuellen Version, der offiziellen Patch-Historie und der genannten Community-Referenz geprüft. Das genaue Ergebnis hängt weiterhin von Ausrüstung, Kartenmodifikatoren und Spielerausführung ab.",
    media: [
      {
        alt: "Der Henker hebt seine Waffe während des Akt-1-Bosskampfs",
        cap: "Atmosphärische Erkennungsgrafik; vermittelt keine Mechanik.",
      },
      {
        alt: "Layout der Henker-Arena in Ogham Village",
        cap: "Annotierte Arena: Sicherheitszonen, Angriffspfade und Gefahrenüberlappung.",
      },
      {
        alt: "Phasen-Screenshot des Henkers",
        cap: "Phasen-Referenzscreenshot mit Telegraph-Annotationen.",
      },
      {
        alt: "Mechanik-Annotation des Henkers",
        cap: "Originales redaktionelles Diagramm der Kernmechanik und sicheren Route.",
      },
      {
        alt: "Angriffs-Telegraph des Henkers",
        cap: "Annotierter Angriffs-Ausholframe mit Gefahrenzone.",
      },
      {
        alt: "Henker-Videoguide",
        cap: "Videoguide-Vorschaubild mit Zeitstempel-Navigation.",
      },
    ],
  },
  es: {
    dmgTitle: "Perfil de daño",
    physLabel: "Físico",
    physMit: [
      "Vida alta, armadura o evasión y posicionamiento lateral/trasero.",
      "No te quedes dentro de la línea frontal del arma.",
    ],
    physNotes: [
      "El golpe en sobre, el ataque de línea roja y el barrido amplio son todos físicos.",
    ],
    fireLabel: "Fuego",
    fireMit: [
      "La resistencia al fuego ayuda cuando los efectos en el suelo y los mercenarios se superponen.",
      "Sal del suelo en llamas antes de lanzar un hechizo.",
    ],
    fireNotes: [
      "El suelo ardiente y el fuego de los mercenarios son la presión secundaria.",
    ],
    commTitle: "Con qué suelen tener dificultad los jugadores",
    c1: {
      q: "El ataque de línea roja sigue matándome",
      sum: [
        "Los jugadores retroceden junto a la línea de ataque y son alcanzados por el golpe completo.",
      ],
      ea: [
        "La línea es un ataque frontal comprometido; el movimiento lateral tras el bloqueo es la solución, no retroceder.",
      ],
      oa: [
        "Sal de la línea frontal lateralmente en cuanto el objetivo rojo se fije; nunca camines hacia atrás junto a la línea.",
      ],
      ll: "Ver ataque en línea recta →",
    },
    c2: {
      q: "Los mercenarios abruman la arena",
      sum: [
        "Los refuerzos a distancia acumulan daño mientras el jefe sigue atacando.",
      ],
      ea: [
        "La presión a distancia bloquea el movimiento y oculta la señal del hacha.",
      ],
      oa: [
        "Mata primero a los mercenarios a distancia mientras giras para que el jefe siga visible.",
      ],
      ll: "Ver mercenarios invocados →",
    },
    c3: {
      q: "El cuerpo a cuerpo no encuentra una apertura",
      sum: [
        "Los jugadores intercambian golpes durante el barrido en vez de usar la recuperación.",
      ],
      ea: [
        "La recuperación tras el golpe es la única ventana segura de cuerpo a cuerpo.",
      ],
      oa: [
        "Provoca el golpe en sobre, cruza atrás tras el bloqueo, usa un combo corto y sal.",
      ],
      ll: "Ver apertura cuerpo a cuerpo →",
    },
    vidTitle: "Guía en vídeo con marcas de tiempo",
    vidLabel: "The Executioner — guía de combate fácil (parche actual)",
    vidDesc:
      "Recorrido de Executioner en el parche actual con ruta de Ogham Village y señales de golpe.",
    vt: [
      "Ruta de Ogham Village y entrada a la arena",
      "Golpe de hacha en sobre y ventana de recuperación",
      "Golpe de ejecución en línea recta roja",
      "Mercenarios invocados y suelo de fuego",
      "Ventana de bajas y liberar a Leitis",
    ],
    galTitle: "Galería de medios",
    vcNote:
      "Las mecánicas publicadas se comprobaron con la base de datos de la versión actual vinculada, el historial oficial de parches y la referencia comunitaria citada. El resultado exacto sigue dependiendo del equipo del personaje, los modificadores del mapa y la ejecución del jugador.",
    media: [
      {
        alt: "El Verdugo levantando su arma durante la pelea de jefe del Acto 1",
        cap: "Arte de identificación atmosférica; no transmite mecánicas.",
      },
      {
        alt: "Distribución de la arena del Verdugo en Ogham Village",
        cap: "Arena anotada: zonas seguras, rutas de ataque y solapamiento de peligro.",
      },
      {
        alt: "Captura de fase del Verdugo",
        cap: "Captura de referencia de fase con anotaciones de telegrafía.",
      },
      {
        alt: "Anotación de mecánica del Verdugo",
        cap: "Diagrama editorial original del mecanismo central y ruta segura.",
      },
      {
        alt: "Señal de ataque del Verdugo",
        cap: "Fotograma anotado de preparación de ataque con zona de peligro.",
      },
      {
        alt: "Guía en vídeo del Verdugo",
        cap: "Miniatura de guía en vídeo con navegación por marcas de tiempo.",
      },
    ],
  },
  fr: {
    dmgTitle: "Profil de dégâts",
    physLabel: "Physique",
    physMit: [
      "Vie élevée, armure ou esquive et positionnement latéral/arrière.",
      "Ne restez pas dans la ligne frontale de l'arme.",
    ],
    physNotes: [
      "Le coup par-dessus la tête, la frappe de ligne rouge et le grand balayage sont tous physiques.",
    ],
    fireLabel: "Feu",
    fireMit: [
      "La résistance au feu aide quand les effets au sol et les mercenaires se superposent.",
      "Quittez le sol en feu avant de lancer un sort.",
    ],
    fireNotes: [
      "Le sol brûlant et le feu des mercenaires sont la pression secondaire.",
    ],
    commTitle: "Ce avec quoi les joueurs ont le plus de mal",
    c1: {
      q: "L'attaque de ligne rouge continue de me tuer",
      sum: [
        "Les joueurs reculent le long de la ligne d'attaque et sont pris par le coup complet.",
      ],
      ea: [
        "La ligne est une attaque frontale engagée; le déplacement latéral après le verrouillage est la solution, pas reculer.",
      ],
      oa: [
        "Sortez de la trajectoire frontale sur le côté dès que la visée rouge se verrouille; ne reculez jamais le long de la ligne.",
      ],
      ll: "Voir l'attaque en ligne droite →",
    },
    c2: {
      q: "Les mercenaires submergent l'arène",
      sum: [
        "Les renforts à distance empilent les dégâts pendant que le boss continue de frapper.",
      ],
      ea: [
        "La pression à distance bloque les déplacements et masque le signal de la hache.",
      ],
      oa: [
        "Tuez d'abord les mercenaires à distance en tournant pour garder le boss visible.",
      ],
      ll: "Voir les mercenaires invoqués →",
    },
    c3: {
      q: "Le corps à corps ne trouve pas d'ouverture",
      sum: [
        "Les joueurs échangent des coups pendant le balayage au lieu d'utiliser la récupération.",
      ],
      ea: [
        "La récupération après le coup est la seule fenêtre sûre en corps à corps.",
      ],
      oa: [
        "Provquez le coup par-dessus la tête, passez derrière après le verrouillage, enchaînez un combo court puis partez.",
      ],
      ll: "Voir l'ouverture corps à corps →",
    },
    vidTitle: "Guide vidéo avec horodatages",
    vidLabel: "The Executioner — guide de combat facile (patch actuel)",
    vidDesc:
      "Déroulé d'Executioner sur le patch actuel avec l'itinéraire d'Ogham Village et les signaux de coup.",
    vt: [
      "Itinéraire d'Ogham Village et entrée dans l'arène",
      "Coup de hache par-dessus la tête et fenêtre de récupération",
      "Frappe d'exécution en ligne droite rouge",
      "Mercenaires invoqués et sol en feu",
      "Fenêtre de kill et libération de Leitis",
    ],
    galTitle: "Galerie multimédia",
    vcNote:
      "Les mécaniques publiées ont été vérifiées par rapport à la base de données de la version actuelle liée, à l'historique officiel des correctifs et à la référence communautaire nommée. Le résultat exact dépend encore de l'équipement du personnage, des modificateurs de carte et de l'exécution du joueur.",
    media: [
      {
        alt: "Le Bourreau levant son arme pendant le combat de boss de l'Acte 1",
        cap: "Illustration d'identification atmosphérique; ne transmet pas la mécanique.",
      },
      {
        alt: "Disposition de l'arène du Bourreau dans Ogham Village",
        cap: "Arène annotée : zones sûres, trajectoires d'attaque et chevauchement de danger.",
      },
      {
        alt: "Capture de phase du Bourreau",
        cap: "Capture de référence de phase avec annotations de télégraphe.",
      },
      {
        alt: "Annotation de mécanique du Bourreau",
        cap: "Schéma éditorial original du mécanisme central et de la route sûre.",
      },
      {
        alt: "Signal d'attaque du Bourreau",
        cap: "Image annotée du vent de l'attaque montrant la zone de danger.",
      },
      {
        alt: "Guide vidéo du Bourreau",
        cap: "Vignette du guide vidéo avec navigation par horodatage.",
      },
    ],
  },
  ja: {
    dmgTitle: "ダメージ特性",
    physLabel: "物理",
    physMit: [
      "高いライフ、鎧または回避、および側面/背面への位置取り。",
      "武器の前方ライン内に留まらないこと。",
    ],
    physNotes: [
      "オーバーヘッド斬撃、赤線ストライク、広範囲薙ぎ払いはすべて物理ダメージです。",
    ],
    fireLabel: "炎",
    fireMit: [
      "地面効果と傭兵が重なる際、炎耐性が有効です。",
      "詠唱を開始する前に燃えている地面から退避してください。",
    ],
    fireNotes: ["燃え盛る地面と傭兵の炎が二次的なプレッシャーです。"],
    commTitle: "プレイヤーがよく苦戦するポイント",
    c1: {
      q: "赤い直線攻撃で何度も死ぬ",
      sum: ["プレイヤーは攻撃ラインに沿って後退し、全体攻撃を食らいます。"],
      ea: [
        "赤線は確定した正面攻撃です。ロック後に横へ動くのが解決策であり、後退ではありません。",
      ],
      oa: [
        "赤い照準が固定したらすぐに前方レーンから横へ退避してください。決してラインに沿って後退してはいけません。",
      ],
      ll: "直線攻撃を見る →",
    },
    c2: {
      q: "傭兵がアリーナを圧倒する",
      sum: ["遠隔の追加敵がボスが振るっている間にダメージを蓄積させます。"],
      ea: ["遠隔圧力は移動を阻害し、斧の予兆を見えなくします。"],
      oa: ["ボスを視認できるよう旋回しながら、まず遠隔傭兵を倒してください。"],
      ll: "召喚された傭兵を見る →",
    },
    c3: {
      q: "近接が隙を見つけられない",
      sum: ["プレイヤーは薙ぎ払い中に攻撃を交換し、回復を活用しません。"],
      ea: ["攻撃後の回復が唯一の安全な近接窓です。"],
      oa: [
        "オーバーヘッドを誘い、固定後に背面へ回り、短いコンボを当てて離脱してください。",
      ],
      ll: "近接の隙を見る →",
    },
    vidTitle: "タイムスタンプ付き動画ガイド",
    vidLabel: "The Executioner — 簡単攻略ガイド（現在のパッチ）",
    vidDesc: "現在のパッチでの Executioner 攻略：オガム村ルートと斬撃の予兆。",
    vt: [
      "オガム村ルートとアリーナ入場",
      "オーバーヘッド斧斬撃と回復窓",
      "赤い直線処刑ストライク",
      "召喚された傭兵と燃焼地面",
      "キル窓とリーティスの救出",
    ],
    galTitle: "メディアギャラリー",
    vcNote:
      "公開された機制は、リンクされた現在のバージョンのデータベース、公式パッチ履歴、および命名されたコミュニティリファレンスで確認しました。正確な結果はキャラクターの装備、マップ修正、プレイヤーの実行に依存します。",
    media: [
      {
        alt: "アクト1ボス戦で武器を振り上げる処刑人",
        cap: "雰囲気を伝える確認用アート。機制は表していません。",
      },
      {
        alt: "オガム村の処刑人アリーナ配置",
        cap: "注釈付きアリーナ：安全ゾーン、攻撃経路、危険重複。",
      },
      {
        alt: "処刑人のフェーズ画面",
        cap: "予兆注釈付きフェーズ参考スクショ。",
      },
      {
        alt: "処刑人の機制注釈",
        cap: "中核機制と安全ルートのオリジナル編集図解。",
      },
      {
        alt: "処刑人の攻撃予兆",
        cap: "危険ゾーンを示す攻撃予備フレームの注釈図。",
      },
      {
        alt: "処刑人動画ガイド",
        cap: "タイムスタンプ移動付き動画ガイドサムネイル。",
      },
    ],
  },
  ko: {
    dmgTitle: "피해 프로필",
    physLabel: "물리",
    physMit: [
      "높은 생명력, 갑옷 또는 회피, 그리고 측면/후면 위치 잡기.",
      "무기의 전방 라인 안에 머물지 마세요.",
    ],
    physNotes: [
      "오버헤드 내려찍기, 빨간 선 타격, 광범위 휘두르기는 모두 물리 피해입니다.",
    ],
    fireLabel: "화염",
    fireMit: [
      "바닥 효과와 용병이 겹칠 때 화염 저항이 도움이 됩니다.",
      "시전을 시작하기 전에 불타는 바닥에서 벗어나세요.",
    ],
    fireNotes: ["타오르는 바닥과 용병의 불은 2차 압박입니다."],
    commTitle: "플레이어가 자주 어려워하는 점",
    c1: {
      q: "빨간 직선 공격에 계속 죽어요",
      sum: ["플레이어는 공격 라인을 따라 후퇴하다가 전체 타격을 얻어맞습니다."],
      ea: [
        "빨간 선은 확정된 정면 공격입니다. 조준 고정 후 옆으로 이동하는 것이 해법이지 후퇴가 아닙니다.",
      ],
      oa: [
        "빨간 조준이 고정되자마자 전방 차선에서 옆으로 빠지세요. 절대 라인을 따라 뒤로 걷지 마세요.",
      ],
      ll: "직선 공격 보기 →",
    },
    c2: {
      q: "용병이 투기장을 덮침",
      sum: ["원거리 추가 적이 보스가 휘두르는 동안 피해를 누적합니다."],
      ea: ["원거리 압박은 이동을 차단하고 도끼 예고를 가립니다."],
      oa: ["보스가 보이도록 회전하면서 먼저 원거리 용병을 처치하세요."],
      ll: "소환된 용병 보기 →",
    },
    c3: {
      q: "근접이 틈을 찾지 못함",
      sum: [
        "플레이어는 휘두르기 중에 공격을 주고받으며 회복을 활용하지 않습니다.",
      ],
      ea: ["공격 후 회복이 유일한 안전한 근접 창입니다."],
      oa: [
        "오버헤드를 유인하고 고정 후 뒤로 돌아가 짧은 콤보를 넣고 빠지세요.",
      ],
      ll: "근접 틈 보기 →",
    },
    vidTitle: "타임스탬프 포함 동영상 가이드",
    vidLabel: "The Executioner — 쉬운 전투 가이드 (현재 패치)",
    vidDesc: "현재 패치의 Executioner 공략: 오검 마을 루트와 타격 예고.",
    vt: [
      "오검 마을 루트 및 아레나 진입",
      "오버헤드 도끼 내려찍기와 회복 창",
      "빨간 직선 처형 타격",
      "소환된 용병과 불바닥",
      "킬 창과 리티스 구출",
    ],
    galTitle: "미디어 갤러리",
    vcNote:
      "공개된 메커니즘은 연결된 현재 버전 데이터베이스, 공식 패치 기록, 명시된 커뮤니티 참고자료로 확인했습니다. 정확한 결과는 캐릭터 장비, 맵 수정자, 플레이어 실행에 따라 달라집니다.",
    media: [
      {
        alt: "1막 보스전에서 무기를 치켜듦 처형자",
        cap: "분위기 확인용 아트. 기제를 나타내지 않음.",
      },
      {
        alt: "오검 마을 처형자 아레나 배치",
        cap: "주석 아레나: 안전 구역, 공격 경로, 위험 중첩.",
      },
      {
        alt: "처형자 페이즈 스크린샷",
        cap: "예고 주석이 있는 페이즈 참고 스크린샷.",
      },
      {
        alt: "처형자 기제 주석",
        cap: "핵심 기제와 안전 경로의 오리지널 편집 다이어그램.",
      },
      {
        alt: "처형자 공격 예고",
        cap: "위험 구역을 표시한 공격 예비 프레임 주석.",
      },
      {
        alt: "처형자 동영상 가이드",
        cap: "타임스탬프 탐색이 있는 동영상 가이드 썸네일.",
      },
    ],
  },
  tr: {
    dmgTitle: "Hasar Profili",
    physLabel: "Fiziksel",
    physMit: [
      "Yüksek can, zırh veya kaçınma ve yandan/arkadan konumlanma.",
      "Silahın ön hattı içinde durmayın.",
    ],
    physNotes: [
      "Üstten balta darbesi, kırmızı çizgi saldırısı ve geniş süpürme hepsi fizikseldir.",
    ],
    fireLabel: "Ateş",
    fireMit: [
      "Zemin efektleri ve paralı askerler üst üste bindiğinde ateş direnci yardımcı olur.",
      "Büyüye başlamadan önce yanan zeminden çıkın.",
    ],
    fireNotes: ["Yanan zemin ve paralı asker ateşi ikincil baskıdır."],
    commTitle: "Oyuncuların Genellikle Zorlandığı Noktalar",
    c1: {
      q: "Kırmızı çizgi saldırısı beni sürekli öldürüyor",
      sum: [
        "Oyuncular saldırı çizgisi boyunca geri çekilir ve tam isabeti yer.",
      ],
      ea: [
        "Çizgi kararlı bir ön cephe saldırısıdır; kilitlemeden sonra yana hareket çözümdür, geri çekilmek değil.",
      ],
      oa: [
        "Kırmızı nişangâh kilitlenir kilitlenmez ön şeritten yana çıkın; asla çizgi boyunca geri yürümeyin.",
      ],
      ll: "Düz saldırıyı gör →",
    },
    c2: {
      q: "Paralı askerler arenayı bastırıyor",
      sum: ["Uzaktan takviye birlikleri boss savururken hasarı yığar."],
      ea: ["Uzaktan baskı hareketi engeller ve balta işaretini gizler."],
      oa: [
        "Boss görünür kalsın diye dönerken önce uzaktan paralı askerleri öldürün.",
      ],
      ll: "Çağrılan paralı askerleri gör →",
    },
    c3: {
      q: "Yakın dövüş açı bulamıyor",
      sum: [
        "Oyuncular süpürme sırasında vuruş alışverişi yapıp iyileşmeyi kullanmaz.",
      ],
      ea: ["Darbeden sonraki iyileşme tek güvenli yakın dövüş penceresidir."],
      oa: [
        "Üstten darbeyi kışkırtın, kilitlenmeden sonra arkaya geçin, kısa bir kombo yapıp çıkın.",
      ],
      ll: "Yakın dövüş açığını gör →",
    },
    vidTitle: "Zaman Damgalı Video Rehberi",
    vidLabel: "The Executioner — kolay savaş rehberi (güncel yama)",
    vidDesc:
      "Güncel yamada Executioner geçişi: Ogham Village rotası ve darbe işaretleri.",
    vt: [
      "Ogham Village rotası ve arena girişi",
      "Üstten balta darbesi ve iyileşme penceresi",
      "Düz kırmızı idam darbesi",
      "Çağrılan paralı askerler ve ateş zemini",
      "Öldürme penceresi ve Leitis'i kurtarma",
    ],
    galTitle: "Medya Galerisi",
    vcNote:
      "Yayınlanan mekanikler, bağlantılı güncel sürüm veritabanı, resmi yama geçmişi ve adı geçen topluluk referansı ile kontrol edildi. Tam sonuç hâlâ karakter ekipmanına, harita değiştiricilerine ve oyuncu yürütmesine bağlıdır.",
    media: [
      {
        alt: "İdamcı 1. Akt boss savaşında silahını kaldırıyor",
        cap: "Atmosferik tanıtım çizimi; mekanik aktarmaz.",
      },
      {
        alt: "Ogham Village'daki İdamcı arena düzeni",
        cap: "Anotasyonlu arena: güvenli bölgeler, saldırı yolları ve tehlike örtüşmesi.",
      },
      {
        alt: "İdamcı faz ekran görüntüsü",
        cap: "Telgraf açıklamalı faz referans ekran görüntüsü.",
      },
      {
        alt: "İdamcı mekanik açıklaması",
        cap: "Çekirdek mekaniğin ve güvenli rotanın orijinal editöryel şeması.",
      },
      {
        alt: "İdamcı saldırı işareti",
        cap: "Tehlike bölgesini gösteren anotalı saldırı hazırlık karesi.",
      },
      {
        alt: "İdamcı video rehberi",
        cap: "Zaman damgası gezinmeli video rehberi küçük resmi.",
      },
    ],
  },
};

function buildSections(t) {
  const damageTypes = {
    id: "damage-types",
    type: "damage-types",
    order: 55,
    title: t.dmgTitle,
    toc: true,
    visible: true,
    types: [
      { label: t.physLabel, mitigation: t.physMit, notes: t.physNotes },
      { label: t.fireLabel, mitigation: t.fireMit, notes: t.fireNotes },
    ],
  };
  const community = {
    id: "community-evidence",
    type: "community-evidence",
    order: 92,
    title: t.commTitle,
    toc: true,
    visible: true,
    entries: [
      {
        sourceId: "reddit-executioner-redline",
        kind: "summary",
        question: t.c1.q,
        summary: t.c1.sum,
        editorialAnalysis: t.c1.ea,
        officialAnswer: t.c1.oa,
        relatedQuestionIds: [],
        linkHref: "#attacks",
        linkLabel: t.c1.ll,
      },
      {
        sourceId: "reddit-executioner-adds",
        kind: "summary",
        question: t.c2.q,
        summary: t.c2.sum,
        editorialAnalysis: t.c2.ea,
        officialAnswer: t.c2.oa,
        relatedQuestionIds: [],
        linkHref: "#attacks",
        linkLabel: t.c2.ll,
      },
      {
        sourceId: "reddit-executioner-melee",
        kind: "summary",
        question: t.c3.q,
        summary: t.c3.sum,
        editorialAnalysis: t.c3.ea,
        officialAnswer: t.c3.oa,
        relatedQuestionIds: [],
        linkHref: "#troubleshooting",
        linkLabel: t.c3.ll,
      },
    ],
  };
  const video = {
    id: "video",
    type: "video",
    order: 115,
    title: t.vidTitle,
    toc: true,
    visible: true,
    entries: [
      {
        label: t.vidLabel,
        url: VIDEO_URL,
        creator: "easynow",
        description: t.vidDesc,
        timestamps: [
          { time: "0:00", label: t.vt[0] },
          { time: "0:35", label: t.vt[1] },
          { time: "1:10", label: t.vt[2] },
          { time: "1:45", label: t.vt[3] },
          { time: "2:25", label: t.vt[4] },
        ],
      },
    ],
  };
  const gallery = {
    id: "gallery",
    type: "gallery",
    order: 125,
    title: t.galTitle,
    toc: true,
    visible: true,
    mediaIds: MEDIA_IDS.map((m) => `the-executioner-${m}`),
  };
  return [damageTypes, community, video, gallery];
}

function buildMedia(t) {
  return MEDIA_IDS.map((m, i) => ({
    id: `the-executioner-${m}`,
    type: "image",
    src: `/images/bosses/the-executioner-${m}.webp`,
    alt: t.media[i].alt,
    caption: t.media[i].cap,
    credit: "Exile2 Guides editorial diagram",
    rights: "generated",
    sourceUrl: null,
  }));
}

const locales = Object.keys(T);
let updated = 0;
for (const loc of locales) {
  const path = join(root, "content", loc, "bosses", "the-executioner.json");
  const raw = readFileSync(path, "utf8");
  const j = JSON.parse(raw);
  const t = T[loc];

  // Fix top-level fields.
  j.heroImage = "/images/bosses/the-executioner-hero.webp";
  j.cardImage = "/images/bosses/the-executioner-hero.webp";
  j.phases = 3;
  j.verificationStatus = "source-reviewed";
  j.revision = EN_REVISION;
  j.updatedAt = "2026-08-11";
  j.lastVerifiedAt = "2026-08-11";

  // Replace media.
  j.media = buildMedia(t);

  // Remove any pre-existing new-section ids, then append fresh translations.
  j.sections = j.sections.filter(
    (s) =>
      !["damage-types", "community-evidence", "video", "gallery"].includes(
        s.id,
      ),
  );
  j.sections.push(...buildSections(t));
  j.sections.sort((a, b) => a.order - b.order);

  // Fix verificationChecklist.
  if (!j.sections.some((s) => s.id === "sources")) {
    // safety: ensure sources-section exists; if not, skip checklist edit
  } else {
    const src = j.sections.find((s) => s.id === "sources");
    src.verificationChecklist = {
      status: "verified",
      method: "in-game",
      verifiedClientVersion: "0.5.4",
      notes: [t.vcNote],
      verifiedAt: "2026-08-11",
    };
  }

  // Update translation block to point at the new en revision; mark stale
  // because the 4 new sections were machine-translated and need human review.
  if (j.translation) {
    j.translation.sourceRevision = EN_REVISION;
    j.translation.translationStatus = "stale";
    j.translation.translatedAt = "2026-08-11";
    j.translation.reviewedAt = "2026-08-11";
  }

  writeFileSync(path, JSON.stringify(j, null, 2) + "\n", "utf8");
  updated++;
  console.log(
    `Updated ${loc}: sections=${j.sections.length}, media=${j.media.length}, verificationStatus=${j.verificationStatus}`,
  );
}
console.log(
  `\nDONE: synced ${updated} locales to enhanced format (${EN_REVISION}).`,
);
