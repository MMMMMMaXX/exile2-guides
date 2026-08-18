/** 文件职责：集中全站通用 UI 文案（导航、页头、页脚、搜索、404、首页分区、缺翻译对话框），支持 10 种语言。 */
import { supportedLocales, type ContentLocale } from "../content/constants";
import { extraUiByLocale, type ExtraUiKey } from "./ui-extra";

/** 全部通用 UI 文案键；新增文案必须在此登记并在 10 种语言中提供。 */
export type UiKey =
  | "nav.home"
  | "nav.builds"
  | "nav.bosses"
  | "nav.items"
  | "nav.skills"
  | "nav.guides"
  | "nav.patches"
  | "info.about"
  | "info.contact"
  | "info.privacy"
  | "info.terms"
  | "info.cookie"
  | "info.disclaimer"
  | "header.toggleNav"
  | "header.navAria"
  | "header.utilitiesAria"
  | "header.searchLabel"
  | "header.searchPlaceholder"
  | "footer.tagline"
  | "footer.disclaimer"
  | "footer.guidesHeading"
  | "footer.infoHeading"
  | "footer.copyright"
  | "notFound.eyebrow"
  | "notFound.title"
  | "notFound.lead"
  | "notFound.returnHome"
  | "notFound.searchGuides"
  | "notFound.popular"
  | "home.sectionBuildKicker"
  | "home.sectionBuildTitle"
  | "home.sectionBossKicker"
  | "home.sectionBossTitle"
  | "home.sectionItemKicker"
  | "home.sectionItemTitle"
  | "home.sectionSkillKicker"
  | "home.sectionSkillTitle"
  | "home.sectionGuideKicker"
  | "home.sectionGuideTitle"
  | "home.sectionPatchKicker"
  | "home.sectionPatchTitle"
  | "home.viewAll"
  | "home.typeBuild"
  | "home.typeBoss"
  | "home.typeItem"
  | "home.typeSkill"
  | "home.typeGuide"
  | "home.typePatch"
  | "home.latestMajorPatch"
  | "home.majorPatch"
  | "home.readPatch"
  | "home.versionScope"
  | "home.currentVersion"
  | "home.historicalPatch"
  | "home.publishedContent"
  | "home.editorialNote"
  | "home.editorialNoteBody"
  | "home.siteStatus"
  | "home.startHere"
  | "home.quickAccess"
  | "home.popular"
  | "home.searchPlaceholder"
  | "home.searchSubmit"
  | "home.quickBuilds"
  | "home.quickBosses"
  | "home.quickGuides"
  | "home.quickItems"
  | "home.quickSkills"
  | "home.quickPatches"
  | "search.title"
  | "search.placeholder"
  | "search.submit"
  | "search.resultsFor"
  | "search.noResults"
  | "search.resultsCount"
  | "missing.title"
  | "missing.viewEnglish"
  | "missing.browseCategory"
  | ExtraUiKey;

/** 10 种语言的完整 UI 文案表；英语是事实源，其余从英语翻译。 */
export const uiByLocale: Record<ContentLocale, Record<string, string>> = {
  en: {
    "nav.home": "Home",
    "nav.builds": "Builds",
    "nav.bosses": "Bosses",
    "nav.items": "Items",
    "nav.skills": "Skills",
    "nav.guides": "Guides",
    "nav.patches": "Patch Notes",
    "info.about": "About",
    "info.contact": "Contact",
    "info.privacy": "Privacy Policy",
    "info.terms": "Terms of Use",
    "info.cookie": "Cookie Policy",
    "info.disclaimer": "Disclaimer",
    "header.toggleNav": "Toggle navigation menu",
    "header.navAria": "Primary navigation",
    "header.utilitiesAria": "Site utilities",
    "header.searchLabel": "Search",
    "header.searchPlaceholder": "Search guides...",
    "footer.tagline":
      "Clear, patch-aware guides for Path of Exile 2 builds, bosses, items, skills and progression.",
    "footer.disclaimer":
      "Exile2 Guides is an unofficial fan-made guide site and is not affiliated with or endorsed by Grinding Gear Games.",
    "footer.guidesHeading": "Guides",
    "footer.infoHeading": "Information",
    "footer.copyright": "All rights reserved.",
    "notFound.eyebrow": "The route was not found",
    "notFound.title": "Use search or return to a content hub.",
    "notFound.lead":
      "This address does not exist, has moved, or is not published yet. Return home, search published content, or browse a main category.",
    "notFound.returnHome": "Return home",
    "notFound.searchGuides": "Search guides",
    "notFound.popular": "Popular categories",
    "home.sectionBuildKicker": "Build library",
    "home.sectionBuildTitle": "Builds",
    "home.sectionBossKicker": "Encounter library",
    "home.sectionBossTitle": "Boss Guides",
    "home.sectionItemKicker": "Browse mechanics",
    "home.sectionItemTitle": "Items Database",
    "home.sectionSkillKicker": "Skill reference",
    "home.sectionSkillTitle": "Skills",
    "home.sectionGuideKicker": "Recently updated",
    "home.sectionGuideTitle": "Latest Guides",
    "home.sectionPatchKicker": "Patch library",
    "home.sectionPatchTitle": "Major Patches",
    "home.viewAll": "View all",
    "home.typeBuild": "Build",
    "home.typeBoss": "Boss",
    "home.typeItem": "Item",
    "home.typeSkill": "Skill",
    "home.typeGuide": "Guide",
    "home.typePatch": "Patch",
    "home.latestMajorPatch": "Latest major content patch",
    "home.majorPatch": "Major patch",
    "home.readPatch": "Read patch analysis",
    "home.versionScope": "Version scope",
    "home.currentVersion": "Current game version",
    "home.historicalPatch": "Historical patch library",
    "home.publishedContent": "Published content",
    "home.editorialNote": "Editorial note",
    "home.editorialNoteBody":
      "Every public page identifies its patch and cited sources. First-hand observations and their limits are stated beside the relevant claim.",
    "home.siteStatus": "Site status",
    "home.startHere": "Start here",
    "home.quickAccess": "Quick Access",
    "home.popular": "Popular:",
    "home.searchPlaceholder":
      "Search builds, bosses, items, skills and guides…",
    "home.searchSubmit": "Search",
    "home.quickBuilds": "Starter Builds",
    "home.quickBosses": "Boss Guides",
    "home.quickGuides": "Guides",
    "home.quickItems": "Items",
    "home.quickSkills": "Skills",
    "home.quickPatches": "Patch Notes",
    "search.title": "Search",
    "search.placeholder": "Search builds, bosses, items, skills and guides…",
    "search.submit": "Search",
    "search.resultsFor": "Results for",
    "search.noResults":
      "No results found. Try a different term or browse a category.",
    "search.resultsCount": "{count} result(s)",
    "missing.title": "This guide is not available in {language} yet.",
    "missing.viewEnglish": "View the English guide",
    "missing.browseCategory": "Browse {category} in {language}",
  },
  "zh-cn": {
    "nav.home": "首页",
    "nav.builds": "Build 攻略",
    "nav.bosses": "Boss 攻略",
    "nav.items": "物品资料",
    "nav.skills": "技能资料",
    "nav.guides": "综合攻略",
    "nav.patches": "版本更新",
    "info.about": "关于",
    "info.contact": "联系我们",
    "info.privacy": "隐私政策",
    "info.terms": "使用条款",
    "info.cookie": "Cookie 政策",
    "info.disclaimer": "免责声明",
    "header.toggleNav": "切换主导航菜单",
    "header.navAria": "主导航",
    "header.utilitiesAria": "站点工具",
    "header.searchLabel": "搜索",
    "header.searchPlaceholder": "搜索攻略…",
    "footer.tagline":
      "提供清晰、适配版本的 Path of Exile 2 Build、Boss、物品、技能与成长攻略。",
    "footer.disclaimer":
      "Exile2 Guides 是非官方玩家制作攻略站，与 Grinding Gear Games 不存在任何隶属、授权或赞助关系。",
    "footer.guidesHeading": "攻略",
    "footer.infoHeading": "站点信息",
    "footer.copyright": "保留所有权利。",
    "notFound.eyebrow": "未找到该路由",
    "notFound.title": "使用搜索或返回内容中心。",
    "notFound.lead":
      "该地址不存在、已移动，或尚未发布。你可以返回首页、搜索已发布内容，或浏览主要分类。",
    "notFound.returnHome": "返回首页",
    "notFound.searchGuides": "搜索攻略",
    "notFound.popular": "热门分类",
    "home.sectionBuildKicker": "Build 资料库",
    "home.sectionBuildTitle": "Build 攻略",
    "home.sectionBossKicker": "首领资料库",
    "home.sectionBossTitle": "Boss 攻略",
    "home.sectionItemKicker": "机制速查",
    "home.sectionItemTitle": "物品资料",
    "home.sectionSkillKicker": "技能速查",
    "home.sectionSkillTitle": "技能资料",
    "home.sectionGuideKicker": "最近更新",
    "home.sectionGuideTitle": "最新攻略",
    "home.sectionPatchKicker": "补丁资料库",
    "home.sectionPatchTitle": "大型补丁",
    "home.viewAll": "查看全部",
    "home.typeBuild": "Build",
    "home.typeBoss": "Boss",
    "home.typeItem": "物品",
    "home.typeSkill": "技能",
    "home.typeGuide": "攻略",
    "home.typePatch": "补丁",
    "home.latestMajorPatch": "最新大型内容补丁",
    "home.majorPatch": "大型补丁",
    "home.readPatch": "阅读版本分析",
    "home.versionScope": "版本范围",
    "home.currentVersion": "当前游戏版本",
    "home.historicalPatch": "历史补丁资料库",
    "home.publishedContent": "公开内容",
    "home.editorialNote": "编辑说明",
    "home.editorialNoteBody":
      "所有公开内容都会说明适用版本与引用来源；第一方实机观察及其边界会写在相关结论旁。",
    "home.siteStatus": "站点状态",
    "home.startHere": "从这里开始",
    "home.quickAccess": "快捷入口",
    "home.popular": "快速搜索：",
    "home.searchPlaceholder": "搜索 Build、Boss、物品、技能与攻略…",
    "home.searchSubmit": "搜索",
    "home.quickBuilds": "Build 入门",
    "home.quickBosses": "Boss 攻略",
    "home.quickGuides": "综合攻略",
    "home.quickItems": "物品资料",
    "home.quickSkills": "技能资料",
    "home.quickPatches": "版本更新",
    "search.title": "搜索",
    "search.placeholder": "搜索 Build、Boss、物品、技能与攻略…",
    "search.submit": "搜索",
    "search.resultsFor": "搜索结果",
    "search.noResults": "未找到结果。请换一个关键词或浏览某个分类。",
    "search.resultsCount": "{count} 条结果",
    "missing.title": "本攻略尚未提供 {language} 版本。",
    "missing.viewEnglish": "查看英文攻略",
    "missing.browseCategory": "浏览 {language} 的 {category}",
  },
  "pt-br": {
    "nav.home": "Início",
    "nav.builds": "Builds",
    "nav.bosses": "Chefes",
    "nav.items": "Itens",
    "nav.skills": "Habilidades",
    "nav.guides": "Guias",
    "nav.patches": "Notas de Atualização",
    "info.about": "Sobre",
    "info.contact": "Contato",
    "info.privacy": "Política de Privacidade",
    "info.terms": "Termos de Uso",
    "info.cookie": "Política de Cookies",
    "info.disclaimer": "Aviso Legal",
    "header.toggleNav": "Alternar menu de navegação",
    "header.navAria": "Navegação principal",
    "header.utilitiesAria": "Utilitários do site",
    "header.searchLabel": "Buscar",
    "header.searchPlaceholder": "Buscar guias...",
    "footer.tagline":
      "Guias claros e atualizados para builds, chefes, itens, habilidades e progressão de Path of Exile 2.",
    "footer.disclaimer":
      "Exile2 Guides é um site de fãs não oficial e não é afiliado, patrocinado nem endossado pela Grinding Gear Games.",
    "footer.guidesHeading": "Guias",
    "footer.infoHeading": "Informações",
    "footer.copyright": "Todos os direitos reservados.",
    "notFound.eyebrow": "A rota não foi encontrada",
    "notFound.title": "Use a busca ou retorne a um hub de conteúdo.",
    "notFound.lead":
      "Este endereço não existe, foi movido ou ainda não foi publicado. Volte ao início, busque conteúdo publicado ou navegue por uma categoria principal.",
    "notFound.returnHome": "Voltar ao início",
    "notFound.searchGuides": "Buscar guias",
    "notFound.popular": "Categorias populares",
    "home.sectionBuildKicker": "Biblioteca de builds",
    "home.sectionBuildTitle": "Builds",
    "home.sectionBossKicker": "Biblioteca de encontros",
    "home.sectionBossTitle": "Guias de Chefes",
    "home.sectionItemKicker": "Consulte mecânicas",
    "home.sectionItemTitle": "Banco de Itens",
    "home.sectionSkillKicker": "Referência de habilidades",
    "home.sectionSkillTitle": "Habilidades",
    "home.sectionGuideKicker": "Recentemente atualizado",
    "home.sectionGuideTitle": "Últimos Guias",
    "home.sectionPatchKicker": "Biblioteca de patches",
    "home.sectionPatchTitle": "Grandes Atualizações",
    "home.viewAll": "Ver tudo",
    "home.typeBuild": "Build",
    "home.typeBoss": "Chefe",
    "home.typeItem": "Item",
    "home.typeSkill": "Habilidade",
    "home.typeGuide": "Guia",
    "home.typePatch": "Patch",
    "home.latestMajorPatch": "Última grande atualização de conteúdo",
    "home.majorPatch": "Grande atualização",
    "home.readPatch": "Ler análise do patch",
    "home.versionScope": "Escopo de versão",
    "home.currentVersion": "Versão atual do jogo",
    "home.historicalPatch": "Biblioteca de patches anteriores",
    "home.publishedContent": "Conteúdo publicado",
    "home.editorialNote": "Nota editorial",
    "home.editorialNoteBody":
      "Toda página pública identifica o patch e as fontes citadas. Observações diretas e seus limites aparecem junto à afirmação relevante.",
    "home.siteStatus": "Status do site",
    "home.startHere": "Comece aqui",
    "home.quickAccess": "Acesso Rápido",
    "home.popular": "Populares:",
    "home.searchPlaceholder":
      "Busque builds, chefes, itens, habilidades e guias…",
    "home.searchSubmit": "Buscar",
    "home.quickBuilds": "Builds Iniciais",
    "home.quickBosses": "Guias de Chefes",
    "home.quickGuides": "Guias",
    "home.quickItems": "Itens",
    "home.quickSkills": "Habilidades",
    "home.quickPatches": "Notas de Atualização",
    "search.title": "Buscar",
    "search.placeholder": "Busque builds, chefes, itens, habilidades e guias…",
    "search.submit": "Buscar",
    "search.resultsFor": "Resultados para",
    "search.noResults":
      "Nenhum resultado encontrado. Tente outro termo ou navegue por uma categoria.",
    "search.resultsCount": "{count} resultado(s)",
    "missing.title": "Este guia ainda não está disponível em {language}.",
    "missing.viewEnglish": "Ver o guia em inglês",
    "missing.browseCategory": "Navegar por {category} em {language}",
  },
  ru: {
    "nav.home": "Главная",
    "nav.builds": "Билды",
    "nav.bosses": "Боссы",
    "nav.items": "Предметы",
    "nav.skills": "Умения",
    "nav.guides": "Гайды",
    "nav.patches": "Патч-ноты",
    "info.about": "О нас",
    "info.contact": "Контакты",
    "info.privacy": "Политика конфиденциальности",
    "info.terms": "Условия использования",
    "info.cookie": "Политика cookie",
    "info.disclaimer": "Отказ от ответственности",
    "header.toggleNav": "Переключить меню навигации",
    "header.navAria": "Основная навигация",
    "header.utilitiesAria": "Инструменты сайта",
    "header.searchLabel": "Поиск",
    "header.searchPlaceholder": "Искать гайды...",
    "footer.tagline":
      "Понятные гайды по Path of Exile 2 с учётом патчей: билды, боссы, предметы, умения и прокачка.",
    "footer.disclaimer":
      "Exile2 Guides — неофициальный фанатский сайт гайдов, не связанный с Grinding Gear Games.",
    "footer.guidesHeading": "Гайды",
    "footer.infoHeading": "Информация",
    "footer.copyright": "Все права защищены.",
    "notFound.eyebrow": "Маршрут не найден",
    "notFound.title": "Воспользуйтесь поиском или вернитесь к разделу.",
    "notFound.lead":
      "Этот адрес не существует, был перемещён или ещё не опубликован. Вернитесь на главную, найдите опубликованный контент или выберите основную категорию.",
    "notFound.returnHome": "На главную",
    "notFound.searchGuides": "Искать гайды",
    "notFound.popular": "Популярные категории",
    "home.sectionBuildKicker": "Библиотека билдов",
    "home.sectionBuildTitle": "Билды",
    "home.sectionBossKicker": "Библиотека сражений",
    "home.sectionBossTitle": "Гайды по боссам",
    "home.sectionItemKicker": "Справочник механик",
    "home.sectionItemTitle": "База предметов",
    "home.sectionSkillKicker": "Справочник умений",
    "home.sectionSkillTitle": "Умения",
    "home.sectionGuideKicker": "Недавно обновлено",
    "home.sectionGuideTitle": "Свежие гайды",
    "home.sectionPatchKicker": "Библиотека патчей",
    "home.sectionPatchTitle": "Крупные обновления",
    "home.viewAll": "Смотреть все",
    "home.typeBuild": "Билд",
    "home.typeBoss": "Босс",
    "home.typeItem": "Предмет",
    "home.typeSkill": "Умение",
    "home.typeGuide": "Гайд",
    "home.typePatch": "Патч",
    "home.latestMajorPatch": "Последнее крупное обновление",
    "home.majorPatch": "Крупное обновление",
    "home.readPatch": "Читать анализ патча",
    "home.versionScope": "Версии",
    "home.currentVersion": "Текущая версия игры",
    "home.historicalPatch": "Архив патчей",
    "home.publishedContent": "Опубликованный контент",
    "home.editorialNote": "Редакционная заметка",
    "home.editorialNoteBody":
      "На каждой публичной странице указаны патч и источники. Собственные наблюдения и границы их применимости приведены рядом с соответствующим утверждением.",
    "home.siteStatus": "Статус сайта",
    "home.startHere": "Начните здесь",
    "home.quickAccess": "Быстрый доступ",
    "home.popular": "Популярное:",
    "home.searchPlaceholder": "Ищите билды, боссов, предметы, умения и гайды…",
    "home.searchSubmit": "Искать",
    "home.quickBuilds": "Стартовые билды",
    "home.quickBosses": "Гайды по боссам",
    "home.quickGuides": "Гайды",
    "home.quickItems": "Предметы",
    "home.quickSkills": "Умения",
    "home.quickPatches": "Патч-ноты",
    "search.title": "Поиск",
    "search.placeholder": "Ищите билды, боссов, предметы, умения и гайды…",
    "search.submit": "Искать",
    "search.resultsFor": "Результаты по запросу",
    "search.noResults":
      "Ничего не найдено. Попробуйте другой запрос или выберите категорию.",
    "search.resultsCount": "{count} результат(ов)",
    "missing.title": "Этот гайд пока недоступен на {language}.",
    "missing.viewEnglish": "Смотреть английский гайд",
    "missing.browseCategory": "Смотреть {category} на {language}",
  },
  de: {
    "nav.home": "Startseite",
    "nav.builds": "Builds",
    "nav.bosses": "Bosse",
    "nav.items": "Gegenstände",
    "nav.skills": "Fähigkeiten",
    "nav.guides": "Guides",
    "nav.patches": "Patch Notes",
    "info.about": "Über uns",
    "info.contact": "Kontakt",
    "info.privacy": "Datenschutz",
    "info.terms": "Nutzungsbedingungen",
    "info.cookie": "Cookie-Richtlinie",
    "info.disclaimer": "Haftungsausschluss",
    "header.toggleNav": "Navigationsmenü umschalten",
    "header.navAria": "Hauptnavigation",
    "header.utilitiesAria": "Website-Werkzeuge",
    "header.searchLabel": "Suche",
    "header.searchPlaceholder": "Guides suchen...",
    "footer.tagline":
      "Klare, patchespezifische Guides für Builds, Bosse, Gegenstände, Fähigkeiten und Progression in Path of Exile 2.",
    "footer.disclaimer":
      "Exile2 Guides ist eine inoffizielle Fan-Seite und steht in keiner Verbindung zu Grinding Gear Games.",
    "footer.guidesHeading": "Guides",
    "footer.infoHeading": "Informationen",
    "footer.copyright": "Alle Rechte vorbehalten.",
    "notFound.eyebrow": "Route nicht gefunden",
    "notFound.title": "Nutze die Suche oder kehre zu einem Bereich zurück.",
    "notFound.lead":
      "Diese Adresse existiert nicht, wurde verschoben oder ist noch nicht veröffentlicht. Kehre zur Startseite zurück, suche veröffentlichte Inhalte oder stöbere in einer Hauptkategorie.",
    "notFound.returnHome": "Zur Startseite",
    "notFound.searchGuides": "Guides suchen",
    "notFound.popular": "Beliebte Kategorien",
    "home.sectionBuildKicker": "Build-Bibliothek",
    "home.sectionBuildTitle": "Builds",
    "home.sectionBossKicker": "Begegnungs-Bibliothek",
    "home.sectionBossTitle": "Boss-Guides",
    "home.sectionItemKicker": "Mechaniken durchsuchen",
    "home.sectionItemTitle": "Gegenstandsdatenbank",
    "home.sectionSkillKicker": "Fähigkeiten-Referenz",
    "home.sectionSkillTitle": "Fähigkeiten",
    "home.sectionGuideKicker": "Kürzlich aktualisiert",
    "home.sectionGuideTitle": "Neueste Guides",
    "home.sectionPatchKicker": "Patch-Bibliothek",
    "home.sectionPatchTitle": "Große Patches",
    "home.viewAll": "Alle anzeigen",
    "home.typeBuild": "Build",
    "home.typeBoss": "Boss",
    "home.typeItem": "Gegenstand",
    "home.typeSkill": "Fähigkeit",
    "home.typeGuide": "Guide",
    "home.typePatch": "Patch",
    "home.latestMajorPatch": "Neueste große Inhalts-Patches",
    "home.majorPatch": "Großer Patch",
    "home.readPatch": "Patch-Analyse lesen",
    "home.versionScope": "Versionsbereich",
    "home.currentVersion": "Aktuelle Spielversion",
    "home.historicalPatch": "Historische Patch-Bibliothek",
    "home.publishedContent": "Veröffentlichte Inhalte",
    "home.editorialNote": "Redaktionelle Anmerkung",
    "home.editorialNoteBody":
      "Jede öffentliche Seite nennt Patch und Quellen. Eigene Beobachtungen und ihre Grenzen stehen direkt bei der jeweiligen Aussage.",
    "home.siteStatus": "Website-Status",
    "home.startHere": "Hier beginnen",
    "home.quickAccess": "Schnellzugriff",
    "home.popular": "Beliebt:",
    "home.searchPlaceholder":
      "Builds, Bosse, Gegenstände, Fähigkeiten und Guides suchen…",
    "home.searchSubmit": "Suchen",
    "home.quickBuilds": "Einsteiger-Builds",
    "home.quickBosses": "Boss-Guides",
    "home.quickGuides": "Guides",
    "home.quickItems": "Gegenstände",
    "home.quickSkills": "Fähigkeiten",
    "home.quickPatches": "Patch Notes",
    "search.title": "Suche",
    "search.placeholder":
      "Builds, Bosse, Gegenstände, Fähigkeiten und Guides suchen…",
    "search.submit": "Suchen",
    "search.resultsFor": "Ergebnisse für",
    "search.noResults":
      "Keine Ergebnisse gefunden. Versuche einen anderen Begriff oder stöbere in einer Kategorie.",
    "search.resultsCount": "{count} Ergebnis(se)",
    "missing.title": "Dieser Guide ist noch nicht auf {language} verfügbar.",
    "missing.viewEnglish": "Englischen Guide ansehen",
    "missing.browseCategory": "{category} auf {language} durchsuchen",
  },
  es: {
    "nav.home": "Inicio",
    "nav.builds": "Builds",
    "nav.bosses": "Jefes",
    "nav.items": "Objetos",
    "nav.skills": "Habilidades",
    "nav.guides": "Guías",
    "nav.patches": "Notas del Parche",
    "info.about": "Acerca de",
    "info.contact": "Contacto",
    "info.privacy": "Política de Privacidad",
    "info.terms": "Términos de Uso",
    "info.cookie": "Política de Cookies",
    "info.disclaimer": "Aviso Legal",
    "header.toggleNav": "Alternar menú de navegación",
    "header.navAria": "Navegación principal",
    "header.utilitiesAria": "Herramientas del sitio",
    "header.searchLabel": "Buscar",
    "header.searchPlaceholder": "Buscar guías...",
    "footer.tagline":
      "Guías claras y actualizadas para builds, jefes, objetos, habilidades y progresión de Path of Exile 2.",
    "footer.disclaimer":
      "Exile2 Guides es un sitio de fans no oficial y no está afiliado ni respaldado por Grinding Gear Games.",
    "footer.guidesHeading": "Guías",
    "footer.infoHeading": "Información",
    "footer.copyright": "Todos los derechos reservados.",
    "notFound.eyebrow": "La ruta no fue encontrada",
    "notFound.title": "Usa la búsqueda o vuelve a un centro de contenido.",
    "notFound.lead":
      "Esta dirección no existe, se movió o aún no se ha publicado. Vuelve al inicio, busca contenido publicado o explora una categoría principal.",
    "notFound.returnHome": "Volver al inicio",
    "notFound.searchGuides": "Buscar guías",
    "notFound.popular": "Categorías populares",
    "home.sectionBuildKicker": "Biblioteca de builds",
    "home.sectionBuildTitle": "Builds",
    "home.sectionBossKicker": "Biblioteca de encuentros",
    "home.sectionBossTitle": "Guías de Jefes",
    "home.sectionItemKicker": "Explorar mecánicas",
    "home.sectionItemTitle": "Base de Objetos",
    "home.sectionSkillKicker": "Referencia de habilidades",
    "home.sectionSkillTitle": "Habilidades",
    "home.sectionGuideKicker": "Recientemente actualizado",
    "home.sectionGuideTitle": "Últimas Guías",
    "home.sectionPatchKicker": "Biblioteca de parches",
    "home.sectionPatchTitle": "Parches Principales",
    "home.viewAll": "Ver todo",
    "home.typeBuild": "Build",
    "home.typeBoss": "Jefe",
    "home.typeItem": "Objeto",
    "home.typeSkill": "Habilidad",
    "home.typeGuide": "Guía",
    "home.typePatch": "Parche",
    "home.latestMajorPatch": "Último parche de contenido importante",
    "home.majorPatch": "Parche importante",
    "home.readPatch": "Leer análisis del parche",
    "home.versionScope": "Alcance de versión",
    "home.currentVersion": "Versión actual del juego",
    "home.historicalPatch": "Biblioteca de parches anteriores",
    "home.publishedContent": "Contenido publicado",
    "home.editorialNote": "Nota editorial",
    "home.editorialNoteBody":
      "Cada página pública indica el parche y las fuentes citadas. Las observaciones directas y sus límites aparecen junto a la afirmación relevante.",
    "home.siteStatus": "Estado del sitio",
    "home.startHere": "Empieza aquí",
    "home.quickAccess": "Acceso Rápido",
    "home.popular": "Popular:",
    "home.searchPlaceholder":
      "Busca builds, jefes, objetos, habilidades y guías…",
    "home.searchSubmit": "Buscar",
    "home.quickBuilds": "Builds Iniciales",
    "home.quickBosses": "Guías de Jefes",
    "home.quickGuides": "Guías",
    "home.quickItems": "Objetos",
    "home.quickSkills": "Habilidades",
    "home.quickPatches": "Notas del Parche",
    "search.title": "Buscar",
    "search.placeholder": "Busca builds, jefes, objetos, habilidades y guías…",
    "search.submit": "Buscar",
    "search.resultsFor": "Resultados para",
    "search.noResults":
      "No se encontraron resultados. Prueba otro término o explora una categoría.",
    "search.resultsCount": "{count} resultado(s)",
    "missing.title": "Esta guía aún no está disponible en {language}.",
    "missing.viewEnglish": "Ver la guía en inglés",
    "missing.browseCategory": "Explorar {category} en {language}",
  },
  fr: {
    "nav.home": "Accueil",
    "nav.builds": "Builds",
    "nav.bosses": "Chefs",
    "nav.items": "Objets",
    "nav.skills": "Compétences",
    "nav.guides": "Guides",
    "nav.patches": "Notes de Patch",
    "info.about": "À propos",
    "info.contact": "Contact",
    "info.privacy": "Politique de Confidentialité",
    "info.terms": "Conditions d'Utilisation",
    "info.cookie": "Politique des Cookies",
    "info.disclaimer": "Avertissement",
    "header.toggleNav": "Basculer le menu de navigation",
    "header.navAria": "Navigation principale",
    "header.utilitiesAria": "Outils du site",
    "header.searchLabel": "Rechercher",
    "header.searchPlaceholder": "Rechercher des guides...",
    "footer.tagline":
      "Des guides clairs et à jour sur Path of Exile 2 : builds, chefs, objets, compétences et progression.",
    "footer.disclaimer":
      "Exile2 Guides est un site de fans non officiel, sans lien avec Grinding Gear Games.",
    "footer.guidesHeading": "Guides",
    "footer.infoHeading": "Informations",
    "footer.copyright": "Tous droits réservés.",
    "notFound.eyebrow": "La route est introuvable",
    "notFound.title": "Utilisez la recherche ou revenez à un hub de contenu.",
    "notFound.lead":
      "Cette adresse n'existe pas, a été déplacée ou n'est pas encore publiée. Revenez à l'accueil, recherchez du contenu publié ou parcourez une catégorie principale.",
    "notFound.returnHome": "Retour à l'accueil",
    "notFound.searchGuides": "Rechercher des guides",
    "notFound.popular": "Catégories populaires",
    "home.sectionBuildKicker": "Bibliothèque de builds",
    "home.sectionBuildTitle": "Builds",
    "home.sectionBossKicker": "Bibliothèque d'affrontements",
    "home.sectionBossTitle": "Guides de Chefs",
    "home.sectionItemKicker": "Parcourir les mécaniques",
    "home.sectionItemTitle": "Base d'Objets",
    "home.sectionSkillKicker": "Référence de compétences",
    "home.sectionSkillTitle": "Compétences",
    "home.sectionGuideKicker": "Récemment mis à jour",
    "home.sectionGuideTitle": "Derniers Guides",
    "home.sectionPatchKicker": "Bibliothèque de patches",
    "home.sectionPatchTitle": "Patches Majeurs",
    "home.viewAll": "Tout voir",
    "home.typeBuild": "Build",
    "home.typeBoss": "Chef",
    "home.typeItem": "Objet",
    "home.typeSkill": "Compétence",
    "home.typeGuide": "Guide",
    "home.typePatch": "Patch",
    "home.latestMajorPatch": "Dernier patch de contenu majeur",
    "home.majorPatch": "Patch majeur",
    "home.readPatch": "Lire l'analyse du patch",
    "home.versionScope": "Périmètre de version",
    "home.currentVersion": "Version actuelle du jeu",
    "home.historicalPatch": "Bibliothèque de patches précédents",
    "home.publishedContent": "Contenu publié",
    "home.editorialNote": "Note éditoriale",
    "home.editorialNoteBody":
      "Chaque page publique indique le patch et les sources citées. Les observations directes et leurs limites figurent près de l’affirmation concernée.",
    "home.siteStatus": "État du site",
    "home.startHere": "Commencez ici",
    "home.quickAccess": "Accès Rapide",
    "home.popular": "Populaire :",
    "home.searchPlaceholder":
      "Recherchez builds, chefs, objets, compétences et guides…",
    "home.searchSubmit": "Rechercher",
    "home.quickBuilds": "Builds Débutant",
    "home.quickBosses": "Guides de Chefs",
    "home.quickGuides": "Guides",
    "home.quickItems": "Objets",
    "home.quickSkills": "Compétences",
    "home.quickPatches": "Notes de Patch",
    "search.title": "Rechercher",
    "search.placeholder":
      "Recherchez builds, chefs, objets, compétences et guides…",
    "search.submit": "Rechercher",
    "search.resultsFor": "Résultats pour",
    "search.noResults":
      "Aucun résultat trouvé. Essayez un autre terme ou parcourez une catégorie.",
    "search.resultsCount": "{count} résultat(s)",
    "missing.title": "Ce guide n'est pas encore disponible en {language}.",
    "missing.viewEnglish": "Voir le guide en anglais",
    "missing.browseCategory": "Parcourir {category} en {language}",
  },
  ja: {
    "nav.home": "ホーム",
    "nav.builds": "ビルド",
    "nav.bosses": "ボス",
    "nav.items": "アイテム",
    "nav.skills": "スキル",
    "nav.guides": "ガイド",
    "nav.patches": "パッチノート",
    "info.about": "概要",
    "info.contact": "お問い合わせ",
    "info.privacy": "プライバシーポリシー",
    "info.terms": "利用規約",
    "info.cookie": "Cookie ポリシー",
    "info.disclaimer": "免責事項",
    "header.toggleNav": "ナビゲーションメニューを切り替え",
    "header.navAria": "メインナビゲーション",
    "header.utilitiesAria": "サイトツール",
    "header.searchLabel": "検索",
    "header.searchPlaceholder": "ガイドを検索...",
    "footer.tagline":
      "Path of Exile 2 のビルド、ボス、アイテム、スキル、育成に関する、パッチに即对した分かりやすいガイド。",
    "footer.disclaimer":
      "Exile2 Guides は非公式のファン制作ガイドサイトで、Grinding Gear Games とは無関係です。",
    "footer.guidesHeading": "ガイド",
    "footer.infoHeading": "情報",
    "footer.copyright": "無断転載を禁じます。",
    "notFound.eyebrow": "ルートが見つかりません",
    "notFound.title": "検索するか、コンテンツハブに戻ってください。",
    "notFound.lead":
      "このアドレスは存在しないか、移動したか、まだ公開されていません。ホームに戻るか、公開コンテンツを検索するか、主要カテゴリを参照してください。",
    "notFound.returnHome": "ホームに戻る",
    "notFound.searchGuides": "ガイドを検索",
    "notFound.popular": "人気のカテゴリ",
    "home.sectionBuildKicker": "ビルドライブラリ",
    "home.sectionBuildTitle": "ビルド",
    "home.sectionBossKicker": "戦闘ライブラリ",
    "home.sectionBossTitle": "ボスガイド",
    "home.sectionItemKicker": "機能を参照",
    "home.sectionItemTitle": "アイテムデータベース",
    "home.sectionSkillKicker": "スキルリファレンス",
    "home.sectionSkillTitle": "スキル",
    "home.sectionGuideKicker": "最近の更新",
    "home.sectionGuideTitle": "最新ガイド",
    "home.sectionPatchKicker": "パッチライブラリ",
    "home.sectionPatchTitle": "大型パッチ",
    "home.viewAll": "すべて表示",
    "home.typeBuild": "ビルド",
    "home.typeBoss": "ボス",
    "home.typeItem": "アイテム",
    "home.typeSkill": "スキル",
    "home.typeGuide": "ガイド",
    "home.typePatch": "パッチ",
    "home.latestMajorPatch": "最新の大型コンテンツパッチ",
    "home.majorPatch": "大型パッチ",
    "home.readPatch": "パッチ解説を読む",
    "home.versionScope": "バージョン範囲",
    "home.currentVersion": "現在のゲームバージョン",
    "home.historicalPatch": "過去のパッチライブラリ",
    "home.publishedContent": "公開コンテンツ",
    "home.editorialNote": "編集者注記",
    "home.editorialNoteBody":
      "すべての公開ページに対象パッチと出典を明記し、実測した内容とその限界を該当する記述の近くに示します。",
    "home.siteStatus": "サイト状況",
    "home.startHere": "ここから始める",
    "home.quickAccess": "クイックアクセス",
    "home.popular": "人気：",
    "home.searchPlaceholder": "ビルド、ボス、アイテム、スキル、ガイドを検索…",
    "home.searchSubmit": "検索",
    "home.quickBuilds": "入門ビルド",
    "home.quickBosses": "ボスガイド",
    "home.quickGuides": "ガイド",
    "home.quickItems": "アイテム",
    "home.quickSkills": "スキル",
    "home.quickPatches": "パッチノート",
    "search.title": "検索",
    "search.placeholder": "ビルド、ボス、アイテム、スキル、ガイドを検索…",
    "search.submit": "検索",
    "search.resultsFor": "検索結果",
    "search.noResults":
      "結果が見つかりませんでした。別のキーワードを試すか、カテゴリを参照してください。",
    "search.resultsCount": "{count} 件",
    "missing.title": "このガイドは {language} 版はまだ公開されていません。",
    "missing.viewEnglish": "英語版のガイドを見る",
    "missing.browseCategory": "{language} の {category} を参照",
  },
  ko: {
    "nav.home": "홈",
    "nav.builds": "빌드",
    "nav.bosses": "보스",
    "nav.items": "아이템",
    "nav.skills": "스킬",
    "nav.guides": "가이드",
    "nav.patches": "패치 노트",
    "info.about": "소개",
    "info.contact": "문의하기",
    "info.privacy": "개인정보 처리방침",
    "info.terms": "이용 약관",
    "info.cookie": "쿠키 정책",
    "info.disclaimer": "면책 조항",
    "header.toggleNav": "탐색 메뉴 전환",
    "header.navAria": "주요 탐색",
    "header.utilitiesAria": "사이트 도구",
    "header.searchLabel": "검색",
    "header.searchPlaceholder": "가이드 검색...",
    "footer.tagline":
      "Path of Exile 2의 빌드, 보스, 아이템, 스킬, 육성에 대한 패치 대응 가이드를 제공합니다.",
    "footer.disclaimer":
      "Exile2 Guides는 비공식 팬 제작 가이드 사이트이며 Grinding Gear Games와 무관합니다.",
    "footer.guidesHeading": "가이드",
    "footer.infoHeading": "정보",
    "footer.copyright": "모든 권리 보유.",
    "notFound.eyebrow": "경로를 찾을 수 없습니다",
    "notFound.title": "검색을 사용하거나 콘텐츠 허브로 돌아가세요.",
    "notFound.lead":
      "이 주소는 존재하지 않거나, 이동했거나, 아직 게시되지 않았습니다. 홈으로 돌아가거나 게시된 콘텐츠를 검색하거나 주요 카테고리를 둘러보세요.",
    "notFound.returnHome": "홈으로 돌아가기",
    "notFound.searchGuides": "가이드 검색",
    "notFound.popular": "인기 카테고리",
    "home.sectionBuildKicker": "빌드 라이브러리",
    "home.sectionBuildTitle": "빌드",
    "home.sectionBossKicker": "전투 라이브러리",
    "home.sectionBossTitle": "보스 가이드",
    "home.sectionItemKicker": "메커니즘 살펴보기",
    "home.sectionItemTitle": "아이템 데이터베이스",
    "home.sectionSkillKicker": "스킬 참조",
    "home.sectionSkillTitle": "스킬",
    "home.sectionGuideKicker": "최근 업데이트",
    "home.sectionGuideTitle": "최신 가이드",
    "home.sectionPatchKicker": "패치 라이브러리",
    "home.sectionPatchTitle": "주요 패치",
    "home.viewAll": "전체 보기",
    "home.typeBuild": "빌드",
    "home.typeBoss": "보스",
    "home.typeItem": "아이템",
    "home.typeSkill": "스킬",
    "home.typeGuide": "가이드",
    "home.typePatch": "패치",
    "home.latestMajorPatch": "최신 주요 콘텐츠 패치",
    "home.majorPatch": "주요 패치",
    "home.readPatch": "패치 분석 읽기",
    "home.versionScope": "버전 범위",
    "home.currentVersion": "현재 게임 버전",
    "home.historicalPatch": "이전 패치 라이브러리",
    "home.publishedContent": "게시된 콘텐츠",
    "home.editorialNote": "편집자 노트",
    "home.editorialNoteBody":
      "모든 공개 페이지에는 적용 패치와 인용 출처가 표시되며, 직접 관찰한 내용과 그 한계는 관련 주장 옆에 명시됩니다.",
    "home.siteStatus": "사이트 상태",
    "home.startHere": "여기서 시작",
    "home.quickAccess": "빠른 메뉴",
    "home.popular": "인기:",
    "home.searchPlaceholder": "빌드, 보스, 아이템, 스킬, 가이드 검색…",
    "home.searchSubmit": "검색",
    "home.quickBuilds": "입문 빌드",
    "home.quickBosses": "보스 가이드",
    "home.quickGuides": "가이드",
    "home.quickItems": "아이템",
    "home.quickSkills": "스킬",
    "home.quickPatches": "패치 노트",
    "search.title": "검색",
    "search.placeholder": "빌드, 보스, 아이템, 스킬, 가이드 검색…",
    "search.submit": "검색",
    "search.resultsFor": "검색 결과",
    "search.noResults":
      "결과를 찾을 수 없습니다. 다른 검색어를 시도하거나 카테고리를 둘러보세요.",
    "search.resultsCount": "{count}개 결과",
    "missing.title": "이 가이드는 아직 {language} 버전이 없습니다.",
    "missing.viewEnglish": "영문 가이드 보기",
    "missing.browseCategory": "{language}의 {category} 둘러보기",
  },
  tr: {
    "nav.home": "Ana Sayfa",
    "nav.builds": "Build'ler",
    "nav.bosses": "Bosslar",
    "nav.items": "Eşyalar",
    "nav.skills": "Yetenekler",
    "nav.guides": "Rehberler",
    "nav.patches": "Yama Notları",
    "info.about": "Hakkında",
    "info.contact": "İletişim",
    "info.privacy": "Gizlilik Politikası",
    "info.terms": "Kullanım Şartları",
    "info.cookie": "Çerez Politikası",
    "info.disclaimer": "Sorumluluk Reddi",
    "header.toggleNav": "Gezinme menüsünü aç/kapat",
    "header.navAria": "Ana gezinme",
    "header.utilitiesAria": "Site araçları",
    "header.searchLabel": "Ara",
    "header.searchPlaceholder": "Rehber ara...",
    "footer.tagline":
      "Path of Exile 2 için yama farkında, açık build, boss, eşya, yetenek ve ilerleme rehberleri.",
    "footer.disclaimer":
      "Exile2 Guides, Grinding Gear Games ile bağlantısı olmayan resmi olmayan bir hayran rehber sitesidir.",
    "footer.guidesHeading": "Rehberler",
    "footer.infoHeading": "Bilgiler",
    "footer.copyright": "Tüm hakları saklıdır.",
    "notFound.eyebrow": "Rota bulunamadı",
    "notFound.title": "Aramayı kullanın veya bir içerik merkezine dönün.",
    "notFound.lead":
      "Bu adres mevcut değil, taşınmış veya henüz yayınlanmamış. Ana sayfaya dönün, yayınlanmış içeriği arayın veya ana kategoriyi göz atın.",
    "notFound.returnHome": "Ana sayfaya dön",
    "notFound.searchGuides": "Rehber ara",
    "notFound.popular": "Popüler kategoriler",
    "home.sectionBuildKicker": "Build kütüphanesi",
    "home.sectionBuildTitle": "Build'ler",
    "home.sectionBossKicker": "Karşılaşma kütüphanesi",
    "home.sectionBossTitle": "Boss Rehberleri",
    "home.sectionItemKicker": "Mekaniklere göz at",
    "home.sectionItemTitle": "Eşya Veritabanı",
    "home.sectionSkillKicker": "Yetenek referansı",
    "home.sectionSkillTitle": "Yetenekler",
    "home.sectionGuideKicker": "Yakın zamanda güncellendi",
    "home.sectionGuideTitle": "Son Rehberler",
    "home.sectionPatchKicker": "Yama kütüphanesi",
    "home.sectionPatchTitle": "Büyük Yamalar",
    "home.viewAll": "Tümünü gör",
    "home.typeBuild": "Build",
    "home.typeBoss": "Boss",
    "home.typeItem": "Eşya",
    "home.typeSkill": "Yetenek",
    "home.typeGuide": "Rehber",
    "home.typePatch": "Yama",
    "home.latestMajorPatch": "Son büyük içerik yaması",
    "home.majorPatch": "Büyük yama",
    "home.readPatch": "Yama analizini oku",
    "home.versionScope": "Sürüm kapsamı",
    "home.currentVersion": "Mevcut oyun sürümü",
    "home.historicalPatch": "Geçmiş yama kütüphanesi",
    "home.publishedContent": "Yayınlanan içerik",
    "home.editorialNote": "Editöryel not",
    "home.editorialNoteBody":
      "Her açık sayfa yamayı ve alıntılanan kaynakları belirtir. Doğrudan gözlemler ve sınırları ilgili iddianın yanında açıklanır.",
    "home.siteStatus": "Site durumu",
    "home.startHere": "Buradan başlayın",
    "home.quickAccess": "Hızlı Erişim",
    "home.popular": "Popüler:",
    "home.searchPlaceholder": "Build, boss, eşya, yetenek ve rehberleri ara…",
    "home.searchSubmit": "Ara",
    "home.quickBuilds": "Başlangıç Build'leri",
    "home.quickBosses": "Boss Rehberleri",
    "home.quickGuides": "Rehberler",
    "home.quickItems": "Eşyalar",
    "home.quickSkills": "Yetenekler",
    "home.quickPatches": "Yama Notları",
    "search.title": "Ara",
    "search.placeholder": "Build, boss, eşya, yetenek ve rehberleri ara…",
    "search.submit": "Ara",
    "search.resultsFor": "Sonuçlar:",
    "search.noResults":
      "Sonuç bulunamadı. Farklı bir terim deneyin veya bir kategoriye göz atın.",
    "search.resultsCount": "{count} sonuç",
    "missing.title": "Bu rehber henüz {language} dilinde mevcut değil.",
    "missing.viewEnglish": "İngilizce rehberi görüntüle",
    "missing.browseCategory": "{language} dilindeki {category} göz at",
  },
};

/** 判断给定语言是否拥有完整 UI 文案表（用于防御性回退）。 */
export function hasUiTable(locale: ContentLocale): boolean {
  return (
    locale in uiByLocale &&
    Object.keys(uiByLocale[locale]).length === Object.keys(uiByLocale.en).length
  );
}

/**
 * 返回指定语言的 UI 文案；缺失键或语言时回退英语，保证页面永远可读。
 * params 支持简单 {placeholder} 替换（如 missing.title）。
 */
export function t(
  locale: ContentLocale | undefined,
  key: UiKey,
  params?: Record<string, string>,
): string {
  const table =
    locale && hasUiTable(locale) ? uiByLocale[locale] : uiByLocale.en;
  const extra = extraUiByLocale[locale ?? "en"] as Record<string, string>;
  let value =
    table[key] ??
    extra[key] ??
    uiByLocale.en[key] ??
    (extraUiByLocale.en as Record<string, string>)[key] ??
    key;
  if (params) {
    for (const [name, replacement] of Object.entries(params)) {
      value = value.replaceAll(`{${name}}`, replacement);
    }
  }
  return value;
}

/** 返回导航标签（与 site-navigation 的 id 对应）。 */
export function getNavigationLabel(
  locale: ContentLocale | undefined,
  id: "builds" | "bosses" | "items" | "skills" | "guides" | "patches",
): string {
  const map: Record<
    "builds" | "bosses" | "items" | "skills" | "guides" | "patches",
    UiKey
  > = {
    builds: "nav.builds",
    bosses: "nav.bosses",
    items: "nav.items",
    skills: "nav.skills",
    guides: "nav.guides",
    patches: "nav.patches",
  };
  return t(locale, map[id]);
}

/** 返回法律/信息页导航标签（与 footerInformationLinks 的 slug 对应）。 */
export function getInformationLinkLabel(
  locale: ContentLocale | undefined,
  slug:
    | "about"
    | "contact"
    | "privacy-policy"
    | "terms-of-use"
    | "cookie-policy"
    | "disclaimer",
): string {
  const map: Record<
    | "about"
    | "contact"
    | "privacy-policy"
    | "terms-of-use"
    | "cookie-policy"
    | "disclaimer",
    UiKey
  > = {
    about: "info.about",
    contact: "info.contact",
    "privacy-policy": "info.privacy",
    "terms-of-use": "info.terms",
    "cookie-policy": "info.cookie",
    disclaimer: "info.disclaimer",
  };
  return t(locale, map[slug]);
}

/** 暴露受支持语言列表，供需要遍历 UI 文案的调用方使用。 */
export { supportedLocales };
