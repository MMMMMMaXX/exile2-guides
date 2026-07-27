/** 文件职责：集中维护 About、Contact 与法律页的真实静态文案，避免页面组件混入政策判断。 */
import type { ContentLocale } from "../content/constants";

export const informationPageSlugs = [
  "about",
  "contact",
  "privacy-policy",
  "terms-of-use",
  "cookie-policy",
  "disclaimer",
] as const;

export type InformationPageSlug = (typeof informationPageSlugs)[number];

type InformationSection = {
  bullets?: readonly string[];
  paragraphs?: readonly string[];
  title: string;
};

export type InformationPageCopy = {
  description: string;
  sections: readonly InformationSection[];
  title: string;
};

const englishDisclaimer =
  "Exile2 Guides is an independent, unofficial fan-made website and is not affiliated with or endorsed by Grinding Gear Games. Path of Exile and related marks belong to their respective owners.";
const chineseDisclaimer =
  "Exile2 Guides 是独立制作的非官方玩家攻略网站，与 Grinding Gear Games 不存在隶属、授权或背书关系。Path of Exile 及相关标识归其各自权利人所有。";

const informationCopyByLocale: Record<
  ContentLocale,
  Record<InformationPageSlug, InformationPageCopy>
> = {
  en: {
    about: {
      description:
        "How Exile2 Guides creates and verifies Path of Exile 2 guide content.",
      title: "About Exile2 Guides",
      sections: [
        {
          title: "What this site is",
          paragraphs: [
            "Exile2 Guides is a read-only Path of Exile 2 guide site for clear, patch-aware explanations of builds, bosses, items, skills and progression.",
            "Published content uses first-party information and game verification where possible. Community discussion and external tools may help identify topics, but are not copied as final editorial content.",
          ],
        },
        {
          title: "Editorial verification",
          paragraphs: [
            "Every public guide must carry its patch context, sources, reviewer and verification status. Approved pages may be published before PC verification, but must state that boundary clearly.",
            "AI may assist with research organisation or an early draft, but a human editor must review and verify material before publication.",
          ],
        },
        {
          title: "Independent status and corrections",
          paragraphs: [
            englishDisclaimer,
            "A public contact address must be configured before production launch so users can report factual errors and copyright concerns.",
          ],
        },
      ],
    },
    contact: {
      description:
        "Current reporting and contact information for Exile2 Guides.",
      title: "Contact",
      sections: [
        {
          title: "Contact status",
          paragraphs: [
            "Public contact: contact@stratlore.com. This read-only MVP has no backend contact form.",
            "The operator must monitor this address for factual corrections, copyright concerns and feedback, and keep the privacy policy synchronized before production launch.",
          ],
        },
        {
          title: "What to include",
          bullets: [
            "The page URL and the information that appears incorrect.",
            "A reliable source or clear reproduction steps when available.",
            "Only the minimum personal information needed to respond.",
          ],
        },
      ],
    },
    "privacy-policy": {
      description: "Privacy practices for the current Exile2 Guides MVP.",
      title: "Privacy Policy",
      sections: [
        {
          title: "Current data practices",
          paragraphs: [
            "The current MVP is a read-only static content site with no accounts, authentication, payment flow, user uploads, comments, database or backend business service.",
            "Analytics, advertising and contact forms are not enabled. The site does not intentionally write cookies or LocalStorage. Browser language is read only to choose the first language URL and is not sent to a server by the site.",
          ],
        },
        {
          title: "Future changes and third parties",
          paragraphs: [
            "External links are governed by their own policies. Any future analytics, advertising, contact channel or local preferences must be disclosed here before enablement, with required consent and withdrawal controls.",
          ],
        },
      ],
    },
    "terms-of-use": {
      description: "Terms for using the editorial content on Exile2 Guides.",
      title: "Terms of Use",
      sections: [
        {
          title: "Using this site",
          bullets: [
            "Guide content is for general informational use and may become outdated after game updates.",
            "The site does not guarantee a Build, strategy, item or outcome will work for every player or patch.",
            "Path of Exile and related third-party marks remain the property of their respective owners.",
            "Do not abuse the site, interfere with its operation or perform unauthorised automated attacks.",
            "External links are provided for context; their availability and content are outside this site’s control.",
          ],
        },
      ],
    },
    "cookie-policy": {
      description:
        "Cookie and browser-storage status for the current Exile2 Guides MVP.",
      title: "Cookie Policy",
      sections: [
        {
          title: "Current status",
          paragraphs: [
            "The current MVP does not intentionally set cookies or write LocalStorage. It also does not enable analytics or advertising cookies.",
            "If a future version adds necessary consent cookies, language, theme or recently viewed preferences, analytics or advertising, this page will list each actual use, purpose, retention and available privacy choices before enablement.",
          ],
        },
      ],
    },
    disclaimer: {
      description:
        "Important independence and content-use disclaimer for Exile2 Guides.",
      title: "Disclaimer",
      sections: [
        {
          title: "Unofficial fan site",
          paragraphs: [
            englishDisclaimer,
            "Guide content is not trading, investment or real-money income advice. Game systems and balance may change, so players should verify the current patch and make their own decisions.",
          ],
        },
      ],
    },
  },
  "zh-cn": {
    about: {
      description:
        "说明 Exile2 Guides 如何制作和核验 Path of Exile 2 攻略内容。",
      title: "关于 Exile2 Guides",
      sections: [
        {
          title: "本站是什么",
          paragraphs: [
            "Exile2 Guides 是一个只读的 Path of Exile 2 攻略站，为玩家提供清晰、适配版本的 Build、Boss、物品、技能与成长说明。",
            "已发布攻略会尽可能基于第一方资料与游戏内核验制作。社区讨论和外部工具可用于发现选题，但不会被直接复制成本站最终编辑内容。",
          ],
        },
        {
          title: "编辑核验",
          paragraphs: [
            "每篇公开攻略都必须包含版本背景、来源和核验日期。草稿和未经核验的示例不会进入公开路由与后续搜索消费者。",
            "AI 可用于研究整理或初稿辅助，但发布前必须由人工编辑审阅并核验。",
          ],
        },
        {
          title: "非官方身份与更正",
          paragraphs: [
            chineseDisclaimer,
            "正式公开发布前必须配置公开联系邮箱，以便用户报告事实错误和版权问题。",
          ],
        },
      ],
    },
    contact: {
      description: "Exile2 Guides 当前的错误报告与联系信息。",
      title: "联系",
      sections: [
        {
          title: "联系状态",
          paragraphs: [
            "公开联系邮箱：contact@stratlore.com。本只读 MVP 尚未提供后端联系表单。",
            "运营者必须持续维护该邮箱，用于事实更正、版权问题和一般反馈，并在生产上线前保持隐私政策同步。",
          ],
        },
        {
          title: "建议提供的信息",
          bullets: [
            "出现问题的页面 URL 与具体错误信息。",
            "如有，请提供可靠来源或清晰的复现步骤。",
            "仅提供回复所必需的最少个人信息。",
          ],
        },
      ],
    },
    "privacy-policy": {
      description: "当前 Exile2 Guides MVP 的隐私处理说明。",
      title: "隐私政策",
      sections: [
        {
          title: "当前数据处理方式",
          paragraphs: [
            "当前 MVP 是只读静态内容站，不包含账号、认证、支付、用户上传、评论、数据库或后端业务服务。",
            "当前阶段未启用分析、广告或联系表单，也不会主动写入 Cookie 或 LocalStorage。浏览器语言仅用于选择首次进入的语言 URL，本站不会将它发送到服务器。",
          ],
        },
        {
          title: "未来变更与第三方",
          paragraphs: [
            "外部链接受其网站自身政策约束。未来如启用分析、广告、联系渠道或本地偏好，必须在启用前在本页披露实际用途，并提供必要的同意与撤回控制。",
          ],
        },
      ],
    },
    "terms-of-use": {
      description: "使用 Exile2 Guides 编辑内容时适用的条款。",
      title: "使用条款",
      sections: [
        {
          title: "使用本站",
          bullets: [
            "攻略内容仅供一般参考，游戏更新后可能过时。",
            "本站不保证任何 Build、策略、物品或结果对每位玩家或每个版本都有效。",
            "Path of Exile 及其他第三方标识归其各自权利人所有。",
            "不得滥用本站、干扰其运行或发起未经授权的自动化攻击。",
            "外部链接仅提供背景信息，其可用性和内容不受本站控制。",
          ],
        },
      ],
    },
    "cookie-policy": {
      description: "当前 Exile2 Guides MVP 的 Cookie 与浏览器存储状态。",
      title: "Cookie 政策",
      sections: [
        {
          title: "当前状态",
          paragraphs: [
            "当前 MVP 不会主动设置 Cookie 或写入 LocalStorage，也未启用分析或广告 Cookie。",
            "未来如加入必要的同意 Cookie、语言、主题或最近浏览偏好、分析或广告，本页会在启用前逐项列出实际用途、保留期限和可用隐私选择。",
          ],
        },
      ],
    },
    disclaimer: {
      description: "Exile2 Guides 的非官方身份和内容使用重要声明。",
      title: "免责声明",
      sections: [
        {
          title: "非官方玩家网站",
          paragraphs: [
            chineseDisclaimer,
            "攻略内容不是交易、投资或现实货币收益建议。游戏系统和数值可能变化，请核对当前版本并自行作出决定。",
          ],
        },
      ],
    },
  },
};

/** 判断路由段是否为已定义的信息页，避免未知路径误用静态政策文案。 */
export function isInformationPageSlug(
  value: string | undefined,
): value is InformationPageSlug {
  return informationPageSlugs.includes(value as InformationPageSlug);
}

/** 获取语言对应的信息页文案；调用方先使用 isInformationPageSlug 校验路由参数。 */
export function getInformationPageCopy(
  locale: ContentLocale,
  slug: InformationPageSlug,
): InformationPageCopy {
  return informationCopyByLocale[locale][slug];
}
