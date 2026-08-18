/** 文件职责：将内容数据中的内部核验标记转换为十语言读者可理解的证据边界文案。 */

import type { ContentLocale } from "../content/constants";

type PublicEvidenceCopy = {
  currentClientCheck: string;
  currentManaCost: string;
};

/** 内部状态可保留在结构化数据中，但所有公开正文必须通过这里转换。 */
const publicEvidenceCopy: Record<ContentLocale, PublicEvidenceCopy> = {
  en: {
    currentClientCheck: "requires a value check in the current client",
    currentManaCost:
      "Use the current in-game tooltip for the mana cost; this page does not state a fixed value.",
  },
  "zh-cn": {
    currentClientCheck: "具体数值需在当前客户端核对",
    currentManaCost: "法力消耗请以当前游戏内提示为准；本页不提供固定数值。",
  },
  "pt-br": {
    currentClientCheck: "exige conferência dos valores no cliente atual",
    currentManaCost:
      "Use a dica atual do jogo para o custo de Mana; esta página não informa um valor fixo.",
  },
  ru: {
    currentClientCheck: "требует проверки значений в текущем клиенте",
    currentManaCost:
      "Сверяйте стоимость маны с текущей подсказкой в игре; на этой странице фиксированное значение не указано.",
  },
  de: {
    currentClientCheck: "erfordert eine Werteprüfung im aktuellen Client",
    currentManaCost:
      "Nutze für die Manakosten den aktuellen Tooltip im Spiel; diese Seite nennt keinen festen Wert.",
  },
  es: {
    currentClientCheck: "requiere comprobar los valores en el cliente actual",
    currentManaCost:
      "Consulta el coste de maná en el tooltip actual del juego; esta página no indica un valor fijo.",
  },
  fr: {
    currentClientCheck:
      "nécessite de vérifier les valeurs dans le client actuel",
    currentManaCost:
      "Consultez l'infobulle actuelle en jeu pour le coût en mana ; cette page n'indique pas de valeur fixe.",
  },
  ja: {
    currentClientCheck: "現行クライアントで数値の確認が必要",
    currentManaCost:
      "マナコストは現在のゲーム内ツールチップを参照してください。このページでは固定値を記載していません。",
  },
  ko: {
    currentClientCheck: "현재 클라이언트에서 수치 확인 필요",
    currentManaCost:
      "마나 소모량은 현재 게임 내 툴팁을 확인하세요. 이 페이지에는 고정 수치를 기재하지 않습니다.",
  },
  tr: {
    currentClientCheck: "güncel istemcide değer kontrolü gerektirir",
    currentManaCost:
      "Mana maliyeti için güncel oyun içi bilgi kutusunu kullanın; bu sayfa sabit bir değer belirtmez.",
  },
};

const beforePublicationPattern =
  /before publishing|before publication|vor der veröffentlichung|antes de la publicación|avant publication|公開前|게시 이전|antes da publicação|перед публикацией|yayınlanmadan önce|发布前|标记为已核验前/i;

/**
 * 将历史内容中的内部状态替换成当前证据边界；原始字段仍供编辑流程与校验脚本使用。
 */
export function formatPublicEvidenceText(
  locale: ContentLocale,
  text: string,
): string {
  const copy = publicEvidenceCopy[locale];
  if (beforePublicationPattern.test(text)) return copy.currentManaCost;
  return text.replace(/pending-pc/gi, copy.currentClientCheck);
}
