/** 文件职责：集中维护分类页可索引导语和无内容状态文案，避免路由分散硬编码。 */
import type { ContentLocale, ContentType } from "../content/constants";

type CategoryCopy = {
  emptyDescription: string;
  emptyTitle: string;
  intro: string;
  label: string;
  metaDescription: string;
  metaTitle: string;
};

const categoryLabelByType: Record<ContentType, Record<ContentLocale, string>> = {
  boss: {
    en: "Bosses",
    "zh-cn": "首领攻略",
    "pt-br": "Chefes",
    ru: "Боссы",
    de: "Bosse",
    es: "Jefes",
    fr: "Bosses",
    ja: "ボス",
    ko: "보스",
    tr: "Bosslar",
  },
  build: {
    en: "Builds",
    "zh-cn": "Build 攻略",
    "pt-br": "Builds",
    ru: "Билды",
    de: "Builds",
    es: "Builds",
    fr: "Builds",
    ja: "ビルド",
    ko: "빌드",
    tr: "Build'ler",
  },
  guide: {
    en: "Guides",
    "zh-cn": "攻略",
    "pt-br": "Guias",
    ru: "Гайды",
    de: "Leitfäden",
    es: "Guías",
    fr: "Guides",
    ja: "ガイド",
    ko: "가이드",
    tr: "Rehberler",
  },
  item: {
    en: "Items",
    "zh-cn": "物品",
    "pt-br": "Itens",
    ru: "Предметы",
    de: "Gegenstände",
    es: "Objetos",
    fr: "Objets",
    ja: "アイテム",
    ko: "아이템",
    tr: "Eşyalar",
  },
  patch: {
    en: "Patch Notes",
    "zh-cn": "补丁说明",
    "pt-br": "Notas de Atualização",
    ru: "Примечания к обновлению",
    de: "Patch-Hinweise",
    es: "Notas del Parche",
    fr: "Notes de Mise à Jour",
    ja: "パッチノート",
    ko: "패치 노트",
    tr: "Yama Notları",
  },
  skill: {
    en: "Skills",
    "zh-cn": "技能",
    "pt-br": "Habilidades",
    ru: "Навыки",
    de: "Fähigkeiten",
    es: "Habilidades",
    fr: "Compétences",
    ja: "スキル",
    ko: "스킬",
    tr: "Yetenekler",
  },
};

const buildCopyByLocale: Record<ContentLocale, CategoryCopy> = {
  en: {
    emptyDescription:
      "Verified Build guides will appear here after editorial review. Drafts and unverified sample builds are never shown on this public page.",
    emptyTitle: "Verified Builds are being prepared",
    intro:
      "This Build index is designed to make Path of Exile 2 choices easier to compare without reducing a guide to a single score. Each published Build explains its class, main skill, patch context, expected budget and learning curve, then links to the full progression guide. Use the light filters to narrow a small launch catalogue by class, difficulty, budget or patch. A Build only appears after its written advice, supporting sources and verification date are ready for publication. That means this page will stay intentionally quiet while the editorial catalogue is being prepared, rather than filling the list with copied, speculative or untested setups. When a guide is available, read the full page before committing resources: a good choice depends on your preferred playstyle, current patch and the gear you can realistically obtain.",
    label: "Builds",
    metaDescription:
      "Verified Path of Exile 2 Build guides, filterable by class, difficulty, budget and patch.",
    metaTitle: "Path of Exile 2 Builds | Exile2 Guides",
  },
  "zh-cn": {
    emptyDescription:
      "经过编辑核验的 Build 攻略会在发布后显示于此。草稿、示例和未经核验的 Build 不会进入公开页面。",
    emptyTitle: "已核验 Build 攻略正在准备中",
    intro:
      "本页用于帮助玩家比较 Path of Exile 2 的 Build 选择，而不是用单一分数替代实际攻略。每一篇已发布 Build 都会说明职业、核心技能、适用版本、预算与上手难度，并链接到完整的成长路线。首发内容较少时，可通过职业、难度、预算和版本四个轻量条件缩小范围。只有在文字建议、核验来源和核验日期都准备完成后，Build 才会显示在这里。因此内容库准备期间，本页会保持真实的空状态，不会用搬运、猜测或未经测试的配置填充。攻略发布后，仍建议先阅读完整页面再投入资源：适合的选择取决于你的玩法偏好、当前版本，以及你实际能够取得的装备。",
    label: "Build 攻略",
    metaDescription:
      "经过核验的 Path of Exile 2 Build 攻略，可按职业、难度、预算和版本筛选。",
    metaTitle: "Path of Exile 2 Build 攻略 | Exile2 Guides",
  },
  "pt-br": {
    emptyDescription:
      "Guias de Build verificados aparecerão aqui após a revisão editorial. Rascunhos e builds de amostra não verificados nunca são exibidos nesta página pública.",
    emptyTitle: "Builds verificados estão sendo preparados",
    intro:
      "Este índice de Builds foi criado para facilitar a comparação de opções de Path of Exile 2 sem reduzir um guia a uma única pontuação. Cada Build publicado explica sua classe, habilidade principal, contexto de patch, orçamento previsto e curva de aprendizado, e então linka para o guia de progressão completo. Use os filtros leves para restringir um pequeno catálogo de lançamento por classe, dificuldade, orçamento ou patch. Um Build só aparece depois que seus conselhos escritos, fontes de apoio e data de verificação estiverem prontos para publicação. Isso significa que esta página permanecerá intencionalmente quieta enquanto o catálogo editorial é preparado, em vez de encher a lista com configurações copiadas, especulativas ou não testadas. Quando um guia estiver disponível, leia a página completa antes de comprometer recursos: uma boa escolha depende do seu estilo de jogo preferido, do patch atual e do equipamento que você consegue obter na prática.",
    label: "Builds",
    metaDescription:
      "Guias de Build de Path of Exile 2 verificados, filtráveis por classe, dificuldade, orçamento e patch.",
    metaTitle: "Path of Exile 2 Builds | Exile2 Guides",
  },
  ru: {
    emptyDescription:
      "Проверенные гайды по билдам появятся здесь после редакционной проверки. Черновики и непроверенные примеры билдов никогда не показываются на этой публичной странице.",
    emptyTitle: "Проверенные билды готовятся к публикации",
    intro:
      "Этот указатель билдов создан, чтобы облегчить сравнение вариантов Path of Exile 2, не сводя гайд к единственной оценке. Каждый опубликованный билд описывает свой класс, основной навык, контекст патча, ожидаемый бюджет и кривую обучения, а затем ссылается на полное руководство по прогрессии. Используйте лёгкие фильтры, чтобы сузить небольшой стартовый каталог по классу, сложности, бюджету или патчу. Билд появляется только после того, как его письменные советы, подтверждающие источники и дата проверки будут готовы к публикации. Это значит, что страница намеренно остаётся спокойной, пока готовится редакционный каталог, вместо того чтобы заполнять список скопированными, предположительными или непроверенными сборками. Когда гайд станет доступен, прочитайте полную страницу, прежде чем вкладывать ресурсы: хороший выбор зависит от вашего предпочитаемого стиля игры, текущего патча и снаряжения, которое вы реально можете получить.",
    label: "Билды",
    metaDescription:
      "Проверенные гайды по билдам Path of Exile 2, с фильтрацией по классу, сложности, бюджету и патчу.",
    metaTitle: "Path of Exile 2 Билды | Exile2 Guides",
  },
  de: {
    emptyDescription:
      "Verifizierte Build-Guides erscheinen hier nach redaktioneller Prüfung. Entwürfe und unverifizierte Beispiel-Builds werden auf dieser öffentlichen Seite nie angezeigt.",
    emptyTitle: "Verifizierte Builds werden vorbereitet",
    intro:
      "Dieser Build-Index soll den Vergleich von Path of Exile 2-Optionen erleichtern, ohne einen Guide auf eine einzelne Punktzahl zu reduzieren. Jeder veröffentlichte Build erklärt seine Klasse, Hauptfähigkeit, Patch-Kontext, das erwartete Budget und die Lernkurve und verlinkt dann auf den vollständigen Progression-Guide. Nutzen Sie die leichten Filter, um ein kleines Launch-Sortiment nach Klasse, Schwierigkeit, Budget oder Patch einzugrenzen. Ein Build erscheint erst, wenn seine schriftlichen Empfehlungen, unterstützende Quellen und das Verifizierungsdatum veröffentlichungsbereit sind. Das bedeutet, dass diese Seite bewusst ruhig bleibt, während der redaktionelle Katalog vorbereitet wird, anstatt die Liste mit kopierten, spekulativen oder ungetesteten Setups zu füllen. Wenn ein Guide verfügbar ist, lesen Sie die vollständige Seite, bevor Sie Ressourcen investieren: eine gute Wahl hängt von Ihrem bevorzugten Spielstil, dem aktuellen Patch und der Ausrüstung ab, die Sie realistisch erhalten können.",
    label: "Builds",
    metaDescription:
      "Verifizierte Path of Exile 2 Build-Guides, filterbar nach Klasse, Schwierigkeit, Budget und Patch.",
    metaTitle: "Path of Exile 2 Builds | Exile2 Guides",
  },
  es: {
    emptyDescription:
      "Las guías de Build verificadas aparecerán aquí tras la revisión editorial. Los borradores y las builds de muestra no verificadas nunca se muestran en esta página pública.",
    emptyTitle: "Las Builds verificadas se están preparando",
    intro:
      "Este índice de Builds está diseñado para facilitar la comparación de opciones de Path of Exile 2 sin reducir una guía a una sola puntuación. Cada Build publicada explica su clase, habilidad principal, contexto de parche, presupuesto esperado y curva de aprendizaje, y luego enlaza con la guía de progresión completa. Use los filtros ligeros para acotar un pequeño catálogo de lanzamiento por clase, dificultad, presupuesto o parche. Una Build solo aparece cuando sus consejos escritos, fuentes de apoyo y fecha de verificación están listos para publicarse. Eso significa que esta página permanecerá intencionalmente tranquila mientras se prepara el catálogo editorial, en lugar de llenar la lista con configuraciones copiadas, especulativas o no probadas. Cuando haya una guía disponible, lea la página completa antes de comprometer recursos: una buena elección depende de su estilo de juego preferido, del parche actual y del equipo que pueda obtener en la práctica.",
    label: "Builds",
    metaDescription:
      "Guías de Build de Path of Exile 2 verificadas, filtrables por clase, dificultad, presupuesto y parche.",
    metaTitle: "Path of Exile 2 Builds | Exile2 Guides",
  },
  fr: {
    emptyDescription:
      "Les guides de Build vérifiés apparaîtront ici après relecture éditoriale. Les brouillons et les builds d'exemple non vérifiés ne sont jamais affichés sur cette page publique.",
    emptyTitle: "Les Builds vérifiés sont en préparation",
    intro:
      "Cet index de Builds est conçu pour faciliter la comparaison des choix de Path of Exile 2 sans réduire un guide à un seul score. Chaque Build publié explique sa classe, sa compétence principale, le contexte du patch, le budget prévu et la courbe d'apprentissage, puis renvoie au guide de progression complet. Utilisez les filtres légers pour réduire un petit catalogue de lancement par classe, difficulté, budget ou patch. Un Build n'apparaît qu'une fois ses conseils écrits, ses sources justificatives et sa date de vérification prêts à être publiés. Cela signifie que cette page reste volontairement calme pendant la préparation du catalogue éditorial, plutôt que de remplir la liste de configurations copiées, spéculatives ou non testées. Lorsqu'un guide est disponible, lisez la page complète avant d'engager des ressources : un bon choix dépend de votre style de jeu préféré, du patch actuel et de l'équipement que vous pouvez réaliste obtenir.",
    label: "Builds",
    metaDescription:
      "Guides de Build Path of Exile 2 vérifiés, filtrables par classe, difficulté, budget et patch.",
    metaTitle: "Path of Exile 2 Builds | Exile2 Guides",
  },
  ja: {
    emptyDescription:
      "検証済みのビルドガイドは編集審査後にこちらに表示されます。草稿や未検証のサンプルビルドがこの公開ページに表示されることはありません。",
    emptyTitle: "検証済みビルドを準備中です",
    intro:
      "このビルド索引は、Path of Exile 2 の選択肢を単一のスコアに還元することなく比較しやすくするために作られています。公開された各ビルドは、クラス、メインスキル、パッチの状況、想定予算、習得難易度を説明し、その後完全な育成ガイドへリンクします。軽量なフィルタを使って、小さなローンチカタログをクラス、難易度、予算、パッチで絞り込めます。ビルドが表示されるのは、書面によるアドバイス、裏付けとなる情報源、検証日が公開に向けて準備できてからです。つまりこのページは、編集カタログの準備中は意図的に静かなままとなり、コピー・推測・未検証の構成で一覧を埋めることはありません。ガイドが利用可能になったら、リソースを投じる前に完全なページをお読みください。適切な選択は、あなたの好みのプレイスタイル、現在のパッチ、そして現実的に入手できる装備に依存します。",
    label: "ビルド",
    metaDescription:
      "Path of Exile 2 の検証済みビルドガイド。クラス、難易度、予算、パッチで絞り込み可能。",
    metaTitle: "Path of Exile 2 ビルド | Exile2 Guides",
  },
  ko: {
    emptyDescription:
      "검증된 빌드 가이드는 편집 검토 후에 여기에 표시됩니다. 초안과 검증되지 않은 샘플 빌드는 이 공개 페이지에 절대 표시되지 않습니다.",
    emptyTitle: "검증된 빌드를 준비 중입니다",
    intro:
      "이 빌드 색인은 Path of Exile 2 선택지를 단일 점수로 치환하지 않고 비교하기 쉽게 만들어졌습니다. 게시된 각 빌드는 클래스, 주력 스킬, 패치 상황, 예상 예산, 학습 곡선을 설명하고, 이후 전체 성장 가이드로 연결됩니다. 가벼운 필터를 사용해 작은 론칭 카탈로그를 클래스, 난이도, 예산, 패치로 좁힐 수 있습니다. 빌드는 작성된 조언, 근거 출처, 검증 날짜가 게시 준비를 마친 후에만 표시됩니다. 즉, 이 페이지는 편집 카탈로그가 준비되는 동안 의도적으로 조용히 유지되며, 복사·추측·미검증 세팅으로 목록을 채우지 않습니다. 가이드가 준비되면 자원을 투입하기 전에 전체 페이지를 읽으세요. 좋은 선택은 선호하는 플레이스타일, 현재 패치, 그리고 실제로 얻을 수 있는 장비에 달려 있습니다.",
    label: "빌드",
    metaDescription:
      "Path of Exile 2 빌드 가이드 검증 완료본. 클래스, 난이도, 예산, 패치로 필터링 가능.",
    metaTitle: "Path of Exile 2 빌드 | Exile2 Guides",
  },
  tr: {
    emptyDescription:
      "Doğrulanmış Build rehberleri, editöryel incelemeden sonra burada görünecektir. Taslaklar ve doğrulanmamış örnek build'ler bu genel sayfada hiçbir zaman gösterilmez.",
    emptyTitle: "Doğrulanmış Build'ler hazırlanıyor",
    intro:
      "Bu Build dizini, bir rehberi tek bir puana indirgemeksizin Path of Exile 2 seçeneklerini karşılaştırmayı kolaylaştırmak için tasarlanmıştır. Yayınlanan her Build, sınıfını, ana yeteneğini, yama bağlamını, beklenen bütçesini ve öğrenme eğrisini açıklar ve ardından tam ilerleme rehberine bağlanır. Küçük bir lansman kataloğunu sınıf, zorluk, bütçe veya yamaya göre daraltmak için hafif filtreleri kullanın. Bir Build, yazılı tavsiyeleri, destekleyici kaynakları ve doğrulama tarihi yayıma hazır olana kadar görünmez. Bu, editöryel katalog hazırlanırken bu sayfanın kasıtlı olarak sessiz kalacağı ve listeyi kopyalanmış, spekülatif veya test edilmemiş kurulumlarla doldurmayacağı anlamına gelir. Bir rehber hazır olduğunda, kaynak ayırmadan önce tüm sayfayı okuyun: iyi bir seçim, tercih ettiğiniz oynanış tarzına, güncel yamaya ve gerçekçi şekilde edinebileceğiniz ekipmana bağlıdır.",
    label: "Build'ler",
    metaDescription:
      "Path of Exile 2 Build rehberleri doğrulanmış, sınıf, zorluk, bütçe ve yamaya göre filtrelenebilir.",
    metaTitle: "Path of Exile 2 Build'ler | Exile2 Guides",
  },
};

const bossCopyByLocale: Record<ContentLocale, CategoryCopy> = {
  en: {
    emptyDescription:
      "Verified Boss guides will appear here after the encounter notes, sources and review date are ready. Drafts, placeholders and unverified sample bosses are never shown on this public page.",
    emptyTitle: "Verified Boss guides are being prepared",
    intro:
      "This Boss index collects verified Path of Exile 2 encounter guidance without pretending that every fight has a single universal solution. A published entry identifies its Campaign or Endgame context, Act or area when known, editorial difficulty, patch, recommended level when verified and the primary damage types worth preparing for. The light filters are deliberately limited to those facts, so the page remains useful with a small editorial catalogue and does not imply precision that the sources cannot support. Each Boss card leads to a full preparation page with its observed patterns, phase-by-phase notes, defensive considerations, common failure points, rewards only where verifiable, related guides and the sources behind the advice. Until those notes have been reviewed, this index stays honestly empty instead of filling a production route, sitemap or search index with speculative encounter details.",
    label: "Bosses",
    metaDescription:
      "Verified Path of Exile 2 Boss guides, filterable by campaign context, area, editorial difficulty and patch.",
    metaTitle: "Path of Exile 2 Bosses | Exile2 Guides",
  },
  "zh-cn": {
    emptyDescription:
      "首领攻略会在战斗笔记、来源和核验日期准备完成后显示。草稿、占位内容和未经核验的示例首领不会进入公开页面。",
    emptyTitle: "已核验首领攻略正在准备中",
    intro:
      "本页汇集经过核验的 Path of Exile 2 首领战攻略，不会假装每场战斗都存在唯一的通用解法。已发布条目会说明战役或终局语境、已知的章节或区域、编辑难度、适用版本、已核验时的建议等级，以及需要准备的主要伤害类型。筛选条件只保留这些可追溯事实，既能在首发内容较少时保持实用，也不会把来源无法支持的信息包装成精确结论。每张首领卡片都会通往完整的战前准备页面，其中包含已观察到的攻击提示、阶段笔记、防御准备、常见失误、仅在可核验时提供的掉落信息、关联攻略和来源。在这些内容经过审核前，本页会保持真实空状态，不会用猜测性的战斗细节填充生产路由、站点地图或搜索索引。",
    label: "首领攻略",
    metaDescription:
      "经过核验的 Path of Exile 2 首领攻略，可按战役语境、区域、编辑难度和版本筛选。",
    metaTitle: "Path of Exile 2 首领攻略 | Exile2 Guides",
  },
  "pt-br": {
    emptyDescription:
      "Guias de Chefes verificados aparecerão aqui quando as notas de encontro, fontes e data de revisão estiverem prontas. Rascunhos, espaços reservados e chefes de amostra não verificados nunca são exibidos nesta página pública.",
    emptyTitle: "Guias de Chefes verificados estão sendo preparados",
    intro:
      "Este índice de Chefes reúne orientações verificadas de encontros de Path of Exile 2 sem fingir que toda luta tem uma única solução universal. Uma entrada publicada identifica seu contexto de Campanha ou Fim de Jogo, Ato ou área quando conhecidos, dificuldade editorial, patch, nível recomendado quando verificado e os principais tipos de dano que vale a pena preparar. Os filtros leves são deliberadamente limitados a esses fatos, para que a página permaneça útil com um pequeno catálogo editorial e não sugira uma precisão que as fontes não comportam. Cada card de Chefe leva a uma página de preparação completa com padrões observados, notas fase a fase, considerações defensivas, pontos de falha comuns, recompensas apenas quando verificáveis, guias relacionados e as fontes por trás do conselho. Até que essas notas sejam revisadas, este índice permanece honestamente vazio em vez de preencher uma rota de produção, sitemap ou índice de busca com detalhes especulativos de encontro.",
    label: "Chefes",
    metaDescription:
      "Guias de Chefes de Path of Exile 2 verificados, filtráveis por contexto de campanha, área, dificuldade editorial e patch.",
    metaTitle: "Path of Exile 2 Chefes | Exile2 Guides",
  },
  ru: {
    emptyDescription:
      "Проверенные гайды по боссам появятся здесь, когда будут готовы заметки о встрече, источники и дата проверки. Черновики, заготовки и непроверенные примеры боссов никогда не показываются на этой публичной странице.",
    emptyTitle: "Проверенные гайды по боссам готовятся к публикации",
    intro:
      "Этот указатель боссов собирает проверенные рекомендации по сражениям Path of Exile 2, не делая вид, что у каждой битвы есть единственное универсальное решение. Опубликованная запись указывает её контекст Кампании или Эндгейма, Акт или зону, когда известны, редакционную сложность, патч, рекомендуемый уровень при наличии проверки и основные типы урона, к которым стоит готовиться. Лёгкие фильтры намеренно ограничены этими фактами, чтобы страница оставалась полезной при небольшом редакционном каталоге и не подразумевала точность, которую источники не подтверждают. Каждая карточка босса ведёт на полную страницу подготовки с наблюдаемыми паттернами, заметками по фазам, оборонительными соображениями, типичными ошибками, наградами только при наличии проверки, связанными гайдами и источниками за советом. Пока эти заметки не проверены, указатель честно остаётся пустым, вместо того чтобы заполнять производственный маршрут, карту сайта или поисковый индекс предположительными подробностями сражений.",
    label: "Боссы",
    metaDescription:
      "Проверенные гайды по боссам Path of Exile 2, с фильтрацией по контексту кампании, зоне, редакционной сложности и патчу.",
    metaTitle: "Path of Exile 2 Боссы | Exile2 Guides",
  },
  de: {
    emptyDescription:
      "Verifizierte Boss-Guides erscheinen hier, sobald die Begegnungsnotizen, Quellen und das Prüfdatum bereit sind. Entwürfe, Platzhalter und unverifizierte Beispiel-Bosse werden auf dieser öffentlichen Seite nie angezeigt.",
    emptyTitle: "Verifizierte Boss-Guides werden vorbereitet",
    intro:
      "Dieser Boss-Index sammelt verifizierte Path of Exile 2-Begegnungshinweise, ohne zu behaupten, dass jeder Kampf eine einzige universelle Lösung hat. Ein veröffentlichter Eintrag nennt seinen Kampagnen- oder Endgame-Kontext, Akt oder Bereich falls bekannt, redaktionelle Schwierigkeit, Patch, empfohlenes Level falls verifiziert und die wichtigsten Schadensarten, auf die man sich vorbereiten sollte. Die leichten Filter sind bewusst auf diese Fakten begrenzt, damit die Seite bei einem kleinen redaktionellen Katalog nützlich bleibt und keine Genauigkeit suggeriert, die die Quellen nicht stützen. Jede Boss-Karte führt zu einer vollständigen Vorbereitungsseite mit beobachteten Mustern, phasenweisen Notizen, defensiven Überlegungen, häufigen Fehlern, Belohnungen nur wo verifizierbar, verwandten Guidern und den Quellen hinter dem Rat. Bis diese Notizen geprüft sind, bleibt der Index ehrlich leer, statt einen Produktionspfad, Sitemap oder Suchindex mit spekulativen Begegnungsdetails zu füllen.",
    label: "Bosse",
    metaDescription:
      "Verifizierte Path of Exile 2 Boss-Guides, filterbar nach Kampagnenkontext, Bereich, redaktioneller Schwierigkeit und Patch.",
    metaTitle: "Path of Exile 2 Bosses | Exile2 Guides",
  },
  es: {
    emptyDescription:
      "Las guías de Jefes verificadas aparecerán aquí cuando las notas de encuentro, las fuentes y la fecha de revisión estén listas. Los borradores, marcadores y jefes de muestra no verificados nunca se muestran en esta página pública.",
    emptyTitle: "Las guías de Jefes verificadas se están preparando",
    intro:
      "Este índice de Jefes reúne orientación verificada de encuentros de Path of Exile 2 sin pretender que cada combate tenga una única solución universal. Una entrada publicada identifica su contexto de Campaña o Endgame, Acto o área cuando se conoce, dificultad editorial, parche, nivel recomendado cuando está verificado y los principales tipos de daño que conviene preparar. Los filtros ligeros se limitan deliberadamente a esos hechos, para que la página siga siendo útil con un pequeño catálogo editorial y no sugiera una precisión que las fuentes no respaldan. Cada tarjeta de Jefe conduce a una página de preparación completa con patrones observados, notas fase por fase, consideraciones defensivas, puntos de fallo comunes, recompensas solo donde sean verificables, guías relacionadas y las fuentes detrás del consejo. Hasta que esas notas hayan sido revisadas, este índice permanece honestamente vacío en lugar de llenar una ruta de producción, un sitemap o un índice de búsqueda con detalles especulativos de encuentro.",
    label: "Jefes",
    metaDescription:
      "Guías de Jefes de Path of Exile 2 verificadas, filtrables por contexto de campaña, área, dificultad editorial y parche.",
    metaTitle: "Path of Exile 2 Jefes | Exile2 Guides",
  },
  fr: {
    emptyDescription:
      "Les guides de Bosses vérifiés apparaîtront ici lorsque les notes de rencontre, les sources et la date de relecture seront prêtes. Les brouillons, les espaces réservés et les boss d'exemple non vérifiés ne sont jamais affichés sur cette page publique.",
    emptyTitle: "Les guides de Bosses vérifiés sont en préparation",
    intro:
      "Cet index de Bosses rassemble des conseils de rencontre vérifiés pour Path of Exile 2 sans prétendre que chaque combat a une seule solution universelle. Une entrée publiée identifie son contexte Campagne ou Endgame, Acte ou zone lorsqu'ils sont connus, la difficulté éditoriale, le patch, le niveau recommandé lorsqu'il est vérifié et les principaux types de dégâts à anticiper. Les filtres légers sont délibérément limités à ces faits, afin que la page reste utile avec un petit catalogue éditorial et ne suggère pas une précision que les sources ne permettent pas. Chaque carte de Boss mène à une page de préparation complète avec les schémas observés, des notes phase par phase, les considérations défensives, les points d'échec courants, les récompenses uniquement lorsqu'elles sont vérifiables, les guides associés et les sources derrière le conseil. Tant que ces notes n'ont pas été relues, cet index reste honnêtement vide au lieu de remplir une route de production, un sitemap ou un index de recherche avec des détails de rencontre spéculatifs.",
    label: "Bosses",
    metaDescription:
      "Guides de Bosses Path of Exile 2 vérifiés, filtrables par contexte de campagne, zone, difficulté éditoriale et patch.",
    metaTitle: "Path of Exile 2 Bosses | Exile2 Guides",
  },
  ja: {
    emptyDescription:
      "検証済みボスガイドは、エンカウントのメモ・出典・確認日が揃い次第こちらに表示されます。草稿、プレースホルダー、未検証のサンプルボスがこの公開ページに表示されることはありません。",
    emptyTitle: "検証済みボスガイドを準備中です",
    intro:
      "このボス索引は、あらゆる戦いに唯一の普遍的な解法があると見せかけることなく、Path of Exile 2 の検証済みエンカウント指南を集めます。公開された各項目は、キャンペーンまたはエンドゲームの文脈、判明している章やエリア、編集上の難易度、パッチ、検証時の推奨レベル、そして準備すべき主要ダメージ種を特定します。軽量フィルタは意図的にこれらの事実のみに限定されており、小さな編集カタログでも実用性を保ち、出典が裏付けられない精度をほのめかすことがありません。各ボスカードは、観察されたパターン、段階ごとのメモ、防御上の考慮点、よくある失敗、検証可能な場合のみの報酬、関連ガイド、そして助言の根拠となる出典を含む完全な準備ページへつながります。これらのメモが確認されるまで、この索引は推測的なエンカウント詳細で制作ルートやサイトマップ、検索インデックスを埋めるのではなく、正直に空のままです。",
    label: "ボス",
    metaDescription:
      "Path of Exile 2 の検証済みボスガイド。キャンペーン文脈、エリア、編集難易度、パッチで絞り込み可能。",
    metaTitle: "Path of Exile 2 ボス | Exile2 Guides",
  },
  ko: {
    emptyDescription:
      "검증된 보스 가이드는 전투 메모, 출처, 확인 날짜가 준비되면 여기에 표시됩니다. 초안, 플레이스홀더, 검증되지 않은 샘플 보스는 이 공개 페이지에 절대 표시되지 않습니다.",
    emptyTitle: "검증된 보스 가이드를 준비 중입니다",
    intro:
      "이 보스 색인은 모든 전투에 단 하나의 보편적 해법이 있는 것처럼 꾸미지 않고, Path of Exile 2 의 검증된 전투 지침을 모읍니다. 게시된 항목은 캠페인 또는 엔드게임 맥락, 알려진 액트나 지역, 편집 난이도, 패치, 검증된 경우 권장 레벨, 그리고 대비해야 할 주요 피해 유형을 식별합니다. 가벼운 필터는 의도적으로 이 사실들로만 제한되어, 작은 편집 카탈로그에서도 유용하며 출처가 뒷받침하지 못하는 정밀함을 암시하지 않습니다. 각 보스 카드는 관찰된 패턴, 단계별 메모, 방어 고려사항, 흔한 실패 지점, 검증 가능한 경우에만 보상, 관련 가이드, 그리고 조언의 출처로 이어지는 완전한 준비 페이지로 연결됩니다. 이 메모가 검토되기 전까지 이 색인은 추측성 전투 세부사항으로 제작 라우트나 사이트맵, 검색 인덱스를 채우는 대신 정직하게 비어 있습니다.",
    label: "보스",
    metaDescription:
      "Path of Exile 2 보스 가이드 검증 완료본. 캠페인 맥락, 지역, 편집 난이도, 패치로 필터링 가능.",
    metaTitle: "Path of Exile 2 보스 | Exile2 Guides",
  },
  tr: {
    emptyDescription:
      "Doğrulanmış Boss rehberleri, karşılaşma notları, kaynaklar ve inceleme tarihi hazır olunca burada görünecektir. Taslaklar, yer tutucular ve doğrulanmamış örnek boss'lar bu genel sayfada hiçbir zaman gösterilmez.",
    emptyTitle: "Doğrulanmış Boss rehberleri hazırlanıyor",
    intro:
      "Bu Boss dizini, her dövüşün tek bir evrensel çözümü varmış gibi davranmadan Path of Exile 2 karşılaşma rehberliğini toplar. Yayınlanan bir giriş, Kampanya veya Endgame bağlamını, biliniyorsa Akt veya alanı, editöryel zorluğu, yamayı, doğrulandığında önerilen seviyeyi ve hazırlanmaya değer ana hasar türlerini tanımlar. Hafif filtreler kasıtlı olarak bu gerçeklerle sınırlıdır, böylece sayfa küçük bir editöryel katalogla faydalı kalır ve kaynakların destekleyemeyeceği bir kesinlik ima etmez. Her Boss kartı, gözlemlenen desenler, aşama aşama notlar, savunma hususları, yaygın hata noktaları, yalnızca doğrulanabilirse ödüller, ilgili rehberler ve tavsiyenin ardındaki kaynaklarla dolu bir hazırlık sayfasına götürür. Bu notlar incelenene kadar, bu dizin spekülatif karşılaşma detaylarıyla bir üretim rotasını, sitemap'i veya arama indeksini doldurmak yerine dürüstçe boş kalır.",
    label: "Bosslar",
    metaDescription:
      "Path of Exile 2 Boss rehberleri doğrulanmış, kampanya bağlamına, alana, editöryel zorluğa ve yamaya göre filtrelenebilir.",
    metaTitle: "Path of Exile 2 Bosslar | Exile2 Guides",
  },
};

/** 通用分类文案（不含 label），按语言提供 10 语言翻译，{label} 在运行时替换为本地化分类名。 */
const genericCategoryCopyByLocale: Record<
  ContentLocale,
  Omit<CategoryCopy, "label">
> = {
  en: {
    emptyDescription:
      "Verified entries will appear after editorial review and publication. Drafts and sample content are not shown here.",
    emptyTitle: "{label} are being prepared",
    intro:
      "This category has a stable public URL for direct navigation. Its dedicated list, detail structure and verified editorial content will be completed in its scheduled project task.",
    metaDescription: "Verified {label} content status on Exile2 Guides.",
    metaTitle: "{label} | Exile2 Guides",
  },
  "zh-cn": {
    emptyDescription:
      "该分类的已核验内容将在完成编辑与发布后显示；本站不会使用草稿或样例填充页面。",
    emptyTitle: "{label} 正在准备中",
    intro: "该分类路由已经提供稳定的公开地址，方便从导航直接访问。专属列表、详情结构和内容核验将按项目任务逐步完成。",
    metaDescription: "{label} 的已核验内容准备状态。",
    metaTitle: "{label} | Exile2 Guides",
  },
  "pt-br": {
    emptyDescription:
      "Entradas verificadas aparecerão após revisão editorial e publicação. Rascunhos e conteúdo de amostra não são exibidos aqui.",
    emptyTitle: "{label} estão sendo preparados",
    intro:
      "Esta categoria possui uma URL pública estável para navegação direta. Sua lista dedicada, estrutura de detalhes e conteúdo editorial verificado serão concluídos na tarefa de projeto programada.",
    metaDescription: "Status de conteúdo verificado de {label} no Exile2 Guides.",
    metaTitle: "{label} | Exile2 Guides",
  },
  ru: {
    emptyDescription:
      "Проверенные записи появятся после редакционной проверки и публикации. Черновики и примеры контента здесь не показываются.",
    emptyTitle: "{label} готовятся к публикации",
    intro:
      "У этой категории есть стабильный публичный URL для прямой навигации. Её выделенный список, структура деталей и проверенный редакционный контент будут завершены в рамках запланированной задачи проекта.",
    metaDescription: "Статус проверенного контента {label} на Exile2 Guides.",
    metaTitle: "{label} | Exile2 Guides",
  },
  de: {
    emptyDescription:
      "Verifizierte Einträge erscheinen nach redaktioneller Prüfung und Veröffentlichung. Entwürfe und Beispielinhalte werden hier nicht angezeigt.",
    emptyTitle: "{label} werden vorbereitet",
    intro:
      "Diese Kategorie verfügt über eine stabile öffentliche URL für die direkte Navigation. Ihre eigene Liste, Detailstruktur und verifizierten redaktionellen Inhalte werden im geplanten Projekttask vervollständigt.",
    metaDescription: "Status der verifizierten {label}-Inhalte auf Exile2 Guides.",
    metaTitle: "{label} | Exile2 Guides",
  },
  es: {
    emptyDescription:
      "Las entradas verificadas aparecerán tras la revisión editorial y publicación. Los borradores y el contenido de muestra no se muestran aquí.",
    emptyTitle: "{label} se están preparando",
    intro:
      "Esta categoría tiene una URL pública estable para navegación directa. Su lista dedicada, estructura de detalles y contenido editorial verificado se completarán en su tarea de proyecto programada.",
    metaDescription: "Estado del contenido verificado de {label} en Exile2 Guides.",
    metaTitle: "{label} | Exile2 Guides",
  },
  fr: {
    emptyDescription:
      "Les entrées vérifiées apparaîtront après relecture éditoriale et publication. Les brouillons et le contenu d'exemple ne sont pas affichés ici.",
    emptyTitle: "{label} sont en préparation",
    intro:
      "Cette catégorie dispose d'une URL publique stable pour une navigation directe. Sa liste dédiée, sa structure détaillée et son contenu éditorial vérifié seront complétés dans la tâche de projet prévue.",
    metaDescription: "Statut du contenu vérifié de {label} sur Exile2 Guides.",
    metaTitle: "{label} | Exile2 Guides",
  },
  ja: {
    emptyDescription:
      "編集審査と公開が完了した検証済みの項目が表示されます。下書きやサンプルコンテンツはここには表示されません。",
    emptyTitle: "{label}を準備中です",
    intro:
      "このカテゴリには直接アクセスできる安定した公開 URL があります。専用の一覧、詳細構造、検証済みの編集コンテンツは、予定されたプロジェクトタスク内で完成します。",
    metaDescription: "Exile2 Guides 上の検証済み {label} コンテンツの状態。",
    metaTitle: "{label} | Exile2 Guides",
  },
  ko: {
    emptyDescription:
      "검증된 항목은 편집 검토와 게시 후에 표시됩니다. 초안과 샘플 콘텐츠는 여기에 표시되지 않습니다.",
    emptyTitle: "{label}을(를) 준비 중입니다",
    intro:
      "이 카테고리는 바로 이동할 수 있는 안정적인 공개 URL을 가지고 있습니다. 전용 목록, 상세 구조 및 검증된 편집 콘텐츠는 예정된 프로젝트 작업에서 완성됩니다.",
    metaDescription: "Exile2 Guides의 검증된 {label} 콘텐츠 상태.",
    metaTitle: "{label} | Exile2 Guides",
  },
  tr: {
    emptyDescription:
      "Doğrulanmış girdiler, editöryel inceleme ve yayımlamadan sonra görünecektir. Taslaklar ve örnek içerikler burada gösterilmez.",
    emptyTitle: "{label} hazırlanıyor",
    intro:
      "Bu kategorinin doğrudan gezinme için kararlı bir genel URL'si vardır. Ayrılmış listesi, detay yapısı ve doğrulanmış editöryel içeriği planlanan proje görevi içinde tamamlanacaktır.",
    metaDescription: "Exile2 Guides üzerinde doğrulanmış {label} içerik durumu.",
    metaTitle: "{label} | Exile2 Guides",
  },
};

/** 返回分类标题；Build 与 Boss 使用专属本地化名称，其他类型取对应语言的本地化术语。 */
export function getCategoryLabel(
  locale: ContentLocale,
  contentType: ContentType,
): string {
  if (contentType === "build") return buildCopyByLocale[locale].label;
  if (contentType === "boss") return bossCopyByLocale[locale].label;
  return categoryLabelByType[contentType][locale];
}

/** 返回当前任务可用的分类文案；未单独实现的分类保持诚实的通用准备状态（10 语言）。 */
export function getCategoryCopy(
  locale: ContentLocale,
  contentType: ContentType,
): CategoryCopy {
  if (contentType === "build") return buildCopyByLocale[locale];
  if (contentType === "boss") return bossCopyByLocale[locale];

  const label = getCategoryLabel(locale, contentType);
  const base = genericCategoryCopyByLocale[locale];
  return {
    emptyDescription: base.emptyDescription,
    emptyTitle: base.emptyTitle.replace("{label}", label),
    intro: base.intro,
    label,
    metaDescription: base.metaDescription.replace("{label}", label),
    metaTitle: base.metaTitle.replace("{label}", label),
  };
}
