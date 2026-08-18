/** 文件职责：集中维护详情页事实侧栏的十语言文案与公开核验状态，避免内部工作流值泄漏到页面。 */

import type { ContentLocale } from "../content/constants";

export type ArticleSidebarCopy = {
  author: string;
  browseAll: string;
  contentTags: string;
  editorialProcess: string;
  evidenceScope: string;
  evidenceScopeBody: string;
  evidenceStatus: string;
  pageFacts: string;
  patch: string;
  statusFallback: string;
  statusLabels: Record<"pending-pc" | "source-reviewed" | "verified", string>;
  updated: string;
};

const articleSidebarCopyByLocale: Record<ContentLocale, ArticleSidebarCopy> = {
  en: {
    author: "Author",
    browseAll: "Browse all {category}",
    contentTags: "Content tags",
    editorialProcess: "Editorial process",
    evidenceScope: "Evidence scope",
    evidenceScopeBody:
      "The article separates sourced facts, patch scope and first-hand observations, and states any testing limits beside the relevant claim.",
    evidenceStatus: "Evidence status",
    pageFacts: "Page facts",
    patch: "Patch",
    statusFallback: "Evidence scope stated",
    statusLabels: {
      "pending-pc": "Sources reviewed; playtest scope stated",
      "source-reviewed": "Sources reviewed",
      verified: "Gameplay checked",
    },
    updated: "Updated",
  },
  "zh-cn": {
    author: "作者",
    browseAll: "浏览全部{category}",
    contentTags: "内容标签",
    editorialProcess: "编辑流程",
    evidenceScope: "证据范围",
    evidenceScopeBody:
      "正文会区分来源事实、版本范围与第一方观察，并在相关结论旁说明实机测试边界。",
    evidenceStatus: "证据状态",
    pageFacts: "页面信息",
    patch: "版本",
    statusFallback: "证据范围已说明",
    statusLabels: {
      "pending-pc": "来源已审核，实机范围已说明",
      "source-reviewed": "来源审核完成",
      verified: "实机核验完成",
    },
    updated: "更新日期",
  },
  "pt-br": {
    author: "Autor",
    browseAll: "Ver tudo em {category}",
    contentTags: "Tags do conteúdo",
    editorialProcess: "Processo editorial",
    evidenceScope: "Escopo das evidências",
    evidenceScopeBody:
      "O artigo separa fatos com fonte, escopo do patch e observações diretas, indicando os limites dos testes junto à afirmação relevante.",
    evidenceStatus: "Estado das evidências",
    pageFacts: "Dados da página",
    patch: "Patch",
    statusFallback: "Escopo das evidências informado",
    statusLabels: {
      "pending-pc": "Fontes revisadas; escopo dos testes informado",
      "source-reviewed": "Fontes revisadas",
      verified: "Testado no jogo",
    },
    updated: "Atualizado",
  },
  ru: {
    author: "Автор",
    browseAll: "Все материалы: {category}",
    contentTags: "Метки материала",
    editorialProcess: "Редакционный процесс",
    evidenceScope: "Объём подтверждений",
    evidenceScopeBody:
      "В статье отдельно указаны факты из источников, версия патча и личные наблюдения, а ограничения проверки приведены рядом с соответствующим утверждением.",
    evidenceStatus: "Статус подтверждений",
    pageFacts: "О странице",
    patch: "Патч",
    statusFallback: "Объём подтверждений указан",
    statusLabels: {
      "pending-pc": "Источники проверены; границы тестирования указаны",
      "source-reviewed": "Источники проверены",
      verified: "Проверено в игре",
    },
    updated: "Обновлено",
  },
  de: {
    author: "Autor",
    browseAll: "Alle Beiträge in {category}",
    contentTags: "Inhalts-Tags",
    editorialProcess: "Redaktioneller Ablauf",
    evidenceScope: "Nachweisumfang",
    evidenceScopeBody:
      "Der Artikel trennt belegte Fakten, Patch-Umfang und eigene Beobachtungen und nennt Testgrenzen direkt bei der jeweiligen Aussage.",
    evidenceStatus: "Nachweisstatus",
    pageFacts: "Seitendaten",
    patch: "Patch",
    statusFallback: "Nachweisumfang angegeben",
    statusLabels: {
      "pending-pc": "Quellen geprüft; Testumfang angegeben",
      "source-reviewed": "Quellen geprüft",
      verified: "Im Spiel geprüft",
    },
    updated: "Aktualisiert",
  },
  es: {
    author: "Autor",
    browseAll: "Ver todo en {category}",
    contentTags: "Etiquetas del contenido",
    editorialProcess: "Proceso editorial",
    evidenceScope: "Alcance de las pruebas",
    evidenceScopeBody:
      "El artículo separa los hechos con fuente, el alcance del parche y las observaciones directas, e indica los límites de las pruebas junto a cada afirmación relevante.",
    evidenceStatus: "Estado de las pruebas",
    pageFacts: "Datos de la página",
    patch: "Parche",
    statusFallback: "Alcance de las pruebas indicado",
    statusLabels: {
      "pending-pc": "Fuentes revisadas; alcance de pruebas indicado",
      "source-reviewed": "Fuentes revisadas",
      verified: "Comprobado en el juego",
    },
    updated: "Actualizado",
  },
  fr: {
    author: "Auteur",
    browseAll: "Tout voir dans {category}",
    contentTags: "Étiquettes du contenu",
    editorialProcess: "Processus éditorial",
    evidenceScope: "Périmètre des preuves",
    evidenceScopeBody:
      "L’article distingue les faits sourcés, le périmètre du patch et les observations directes, et précise les limites des tests près de chaque affirmation concernée.",
    evidenceStatus: "État des preuves",
    pageFacts: "Informations de la page",
    patch: "Patch",
    statusFallback: "Périmètre des preuves indiqué",
    statusLabels: {
      "pending-pc": "Sources relues ; périmètre des tests indiqué",
      "source-reviewed": "Sources relues",
      verified: "Vérifié en jeu",
    },
    updated: "Mis à jour",
  },
  ja: {
    author: "著者",
    browseAll: "{category}をすべて見る",
    contentTags: "コンテンツタグ",
    editorialProcess: "編集方針",
    evidenceScope: "根拠の範囲",
    evidenceScopeBody:
      "本文では出典に基づく事実、パッチ範囲、実測結果を区別し、検証の限界を該当する記述の近くに明示します。",
    evidenceStatus: "根拠の状態",
    pageFacts: "ページ情報",
    patch: "パッチ",
    statusFallback: "根拠の範囲を明記",
    statusLabels: {
      "pending-pc": "出典確認済み・実測範囲を明記",
      "source-reviewed": "出典確認済み",
      verified: "ゲーム内で確認済み",
    },
    updated: "更新日",
  },
  ko: {
    author: "작성자",
    browseAll: "{category} 전체 보기",
    contentTags: "콘텐츠 태그",
    editorialProcess: "편집 절차",
    evidenceScope: "근거 범위",
    evidenceScopeBody:
      "본문은 출처가 있는 사실, 패치 범위, 직접 관찰을 구분하고 관련 주장 옆에 테스트 한계를 명시합니다.",
    evidenceStatus: "근거 상태",
    pageFacts: "페이지 정보",
    patch: "패치",
    statusFallback: "근거 범위 명시",
    statusLabels: {
      "pending-pc": "출처 검토 완료·플레이 테스트 범위 명시",
      "source-reviewed": "출처 검토 완료",
      verified: "게임 내 확인 완료",
    },
    updated: "업데이트",
  },
  tr: {
    author: "Yazar",
    browseAll: "Tüm {category} içeriklerine göz at",
    contentTags: "İçerik etiketleri",
    editorialProcess: "Editoryal süreç",
    evidenceScope: "Kanıt kapsamı",
    evidenceScopeBody:
      "Makale kaynaklı bilgileri, yama kapsamını ve doğrudan gözlemleri ayırır; test sınırlarını ilgili iddianın yanında belirtir.",
    evidenceStatus: "Kanıt durumu",
    pageFacts: "Sayfa bilgileri",
    patch: "Yama",
    statusFallback: "Kanıt kapsamı belirtildi",
    statusLabels: {
      "pending-pc": "Kaynaklar incelendi; test kapsamı belirtildi",
      "source-reviewed": "Kaynaklar incelendi",
      verified: "Oyun içinde doğrulandı",
    },
    updated: "Güncellendi",
  },
};

/** 获取当前语言的详情侧栏文案；Record 让缺失语言在类型检查时失败。 */
export function getArticleSidebarCopy(
  locale: ContentLocale,
): ArticleSidebarCopy {
  return articleSidebarCopyByLocale[locale];
}

/** 将内部核验枚举映射为读者可理解的公开证据说明，未知值不回显原始内部标记。 */
export function formatPublicVerificationStatus(
  locale: ContentLocale,
  status: string,
): string {
  const copy = getArticleSidebarCopy(locale);
  return status in copy.statusLabels
    ? copy.statusLabels[status as keyof typeof copy.statusLabels]
    : copy.statusFallback;
}
