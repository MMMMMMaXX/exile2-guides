/** 文件职责：集中维护 About、Contact 与法律页的完整线上正式文案，支持段落、列表、卡片网格与表格。 */
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

export type InformationConnectionLink = {
  description: string;
  href: string;
  label: string;
};

export type InformationIssueCard = {
  description: string;
  title: string;
};

export type InformationTable = {
  headers: readonly string[];
  rows: ReadonlyArray<ReadonlyArray<string>>;
};

export type InformationSection = {
  bullets?: readonly string[];
  connectionLinks?: readonly InformationConnectionLink[];
  issueCards?: readonly InformationIssueCard[];
  paragraphs?: readonly string[];
  table?: InformationTable;
  title: string;
};

export type InformationPageCopy = {
  description: string;
  sections: readonly InformationSection[];
  title: string;
};

const contactEmail = "contact@stratlore.com";

const informationCopyByLocale: Record<
  ContentLocale,
  Record<InformationPageSlug, InformationPageCopy>
> = {
  en: {
    about: {
      description:
        "Learn how Exile2 Guides is independently operated, researched, and published as an unofficial Path of Exile 2 guide resource.",
      title: "About Exile2 Guides",
      sections: [
        {
          title: "Our Mission",
          paragraphs: [
            "Exile2 Guides is independently operated by one developer as an unofficial Path of Exile 2 guide resource. The goal is to organise useful, patch-aware answers without presenting research summaries as personal gameplay experience.",
            "The site is read-only and free to access. Articles are published after structured research and automated quality checks, with uncertainty and verification boundaries shown on the page when they matter.",
          ],
        },
        {
          title: "What We Cover",
          connectionLinks: [
            {
              description:
                "Leveling builds, endgame setups, gear priorities, passive tree paths, and gem link configurations for every class.",
              href: "/en/builds/",
              label: "Builds",
            },
            {
              description:
                "Boss mechanics, phase breakdowns, loot tables, resistances requirements, and step-by-step strategy guides.",
              href: "/en/bosses/",
              label: "Bosses",
            },
            {
              description:
                "Unique item databases, currency mechanics, crafting references, and affix tier explanations.",
              href: "/en/items/",
              label: "Items",
            },
            {
              description:
                "Active skill gem breakdowns, support gem pairings, scaling mechanics, and level progression data.",
              href: "/en/skills/",
              label: "Skills",
            },
            {
              description:
                "Mechanics deep-dives, beginner tutorials, FAQ answers, and general progression guides.",
              href: "/en/guides/",
              label: "Guides",
            },
          ],
        },
        {
          title: "Editorial Standards",
          paragraphs: [
            "Articles are researched using official patch notes, current databases, established community guides, gameplay videos, and player discussions. Claims are linked to their sources where possible and written with the relevant patch context.",
            "Automated QA checks the content structure, required metadata, internal links, publication state, indexability, and build output before an article is released.",
            "When a conclusion has not been personally tested in game, it is presented as source-verified rather than first-hand tested. Version-sensitive uncertainty stays visible instead of being hidden behind confident wording.",
          ],
        },
        {
          title: "Independence",
          paragraphs: [
            "Exile2 Guides is an independent, fan-made resource. It is not affiliated with, endorsed by, or sponsored by Grinding Gear Games or any other company.",
            "The publication is maintained by one operator, and the research process does not present first-hand gameplay testing as completed when it has not been performed.",
          ],
        },
        {
          title: "Corrections and Feedback",
          paragraphs: [
            "Game mechanics change frequently, and no guide is perfect. If you find a factual error, outdated mechanic, or missing source, please reach out through our Contact page or email us directly.",
            "Corrections and copyright reports are reviewed as time permits. High-impact factual errors are prioritised, but response times are not guaranteed.",
          ],
        },
      ],
    },
    contact: {
      description:
        "Contact the independent Exile2 Guides operator about content corrections, copyright reports, or general feedback.",
      title: "Contact Us",
      sections: [
        {
          title: "Get in Touch",
          paragraphs: [
            `The only public contact channel is email: ${contactEmail}. We review corrections and copyright reports as time permits. High-impact factual errors are prioritised, but response times are not guaranteed.`,
            "This is a read-only static site with no server-side contact form. Please use the direct email link below; there is no message submission button that can silently discard your request.",
          ],
          connectionLinks: [
            {
              description:
                "Open your email client to send a correction, copyright report, or other note.",
              href: `mailto:${contactEmail}`,
              label: contactEmail,
            },
          ],
        },
        {
          title: "Contact Scenarios",
          issueCards: [
            {
              description:
                "Include the page URL, the specific claim that is incorrect, the game version or patch you tested in, and a reliable source or clear reproduction steps.",
              title: "Content correction",
            },
            {
              description:
                "Provide the asset or page URL, a description of the copyrighted material, proof of ownership or authorisation, and the specific action you are requesting.",
              title: "Copyright or attribution",
            },
            {
              description:
                "Tell us which area needs attention \u2014 builds, bosses, items, skills, or general site experience \u2014 along with your detailed suggestion.",
              title: "General feedback",
            },
          ],
        },
        {
          title: "What to Include",
          bullets: [
            "The exact page URL where the issue appears, along with a screenshot or quoted text if possible.",
            "A reliable source for the correction \u2014 official patch notes, a current database entry, or a clear community test/report.",
            "Clear reproduction details for any mechanic discrepancy, including the game version and relevant setup if known.",
            "Only the minimum personal information needed for us to respond to your inquiry.",
          ],
        },
        {
          title: "Review Policy",
          paragraphs: [
            "We review corrections and copyright reports as time permits. High-impact factual errors are prioritised, but response times are not guaranteed.",
          ],
        },
      ],
    },
    "cookie-policy": {
      description:
        "Complete cookie and browser storage disclosure for Exile2 Guides \u2014 what cookies are, what we use, third-party cookies, and how to manage your preferences.",
      title: "Cookie Policy",
      sections: [
        {
          title: "What Are Cookies",
          paragraphs: [
            "Cookies are small text files that websites store on your computer, phone, or other internet-connected device when you visit them. They are widely used to make websites function correctly, improve performance, remember user preferences, and provide information to site operators.",
            "Websites may also use similar technologies such as LocalStorage, SessionStorage, or IndexedDB (collectively \u2018browser storage\u2019). On this page, references to \u2018cookies\u2019 encompass all such technologies unless otherwise specified.",
          ],
        },
        {
          title: "How We Use Cookies",
          paragraphs: [
            "Exile2 Guides does not intentionally set any cookies or write to browser storage. We do not use session cookies, persistent cookies, tracking pixels, fingerprinting scripts, or any other mechanism that stores data on your device.",
            "Our site does not employ analytics services, advertising networks, social media widgets, embedded third-party content, or any other feature that would require cookie-based data collection.",
            "Your browser may still create standard HTTP cache entries for our static assets (HTML, CSS, JavaScript, images). These are controlled entirely by your browser, contain no personal data, and are managed according to standard web caching protocols.",
          ],
        },
        {
          title: "Cookie Categories",
          table: {
            headers: [
              "Cookie category",
              "Purpose",
              "Duration",
              "Status on this site",
            ],
            rows: [
              [
                "Strictly necessary",
                "Site functionality, security, load balancing",
                "Session",
                "Not used",
              ],
              [
                "Preferences",
                "Language, theme, display settings",
                "Up to 1 year",
                "Not used",
              ],
              [
                "Analytics",
                "Usage statistics, page performance",
                "Up to 2 years",
                "Not used",
              ],
              [
                "Advertising",
                "Ad targeting, campaign tracking",
                "Up to 2 years",
                "Not used",
              ],
              [
                "Social media",
                "Social sharing, embedded content",
                "Varies",
                "Not used",
              ],
            ],
          },
        },
        {
          title: "Third-Party Cookies",
          paragraphs: [
            "Exile2 Guides does not embed any third-party services that would set cookies on your device. We do not use Google Analytics, Facebook Pixel, Twitter widgets, YouTube embeds, Disqus comments, or any other third-party integration that involves external data collection.",
            "Our site contains links to external websites including community wikis, official patch notes, fan tools, and streaming platforms. These external sites have their own cookie policies that are independent of ours.",
          ],
        },
        {
          title: "Future Changes to Cookie Usage",
          paragraphs: [
            "If a future version of this site introduces features that require cookies or browser storage \u2014 such as language preference persistence, dark mode toggling, usage analytics, or advertising \u2014 this page will be updated before those features are activated.",
            "Each new cookie or storage mechanism will be documented here with its name, provider, purpose, maximum duration, and the privacy controls available to you. Where legally required, we will implement consent mechanisms before setting non-essential cookies.",
          ],
        },
        {
          title: "Managing Cookies in Your Browser",
          paragraphs: [
            "You have the right to control how websites use cookies on your device. Most modern browsers provide the following controls:",
          ],
          bullets: [
            "View and delete existing cookies \u2014 see all cookies stored by each website and remove them individually or in bulk.",
            "Block all cookies \u2014 prevents any website from storing cookies. This may cause some sites to malfunction.",
            "Block third-party cookies \u2014 only allows cookies from the website you are directly visiting.",
            "Private or incognito mode \u2014 automatically deletes all cookies when you close the browsing session.",
          ],
        },
        {
          title: "Browser-Specific Instructions",
          bullets: [
            "Google Chrome \u2014 Settings > Privacy and security > Cookies and other site data",
            "Mozilla Firefox \u2014 Settings > Privacy & Security > Cookies and Site Data",
            "Apple Safari \u2014 Preferences > Privacy > Cookies and website data",
            "Microsoft Edge \u2014 Settings > Cookies and site permissions > Manage and delete cookies",
            "Opera \u2014 Settings > Advanced > Privacy & security > Site settings > Cookies",
          ],
        },
        {
          title: "Contact Us",
          paragraphs: [
            `If you have questions about our cookie practices, please contact us at ${contactEmail}.`,
          ],
        },
      ],
    },
    disclaimer: {
      description:
        "Important legal disclaimers covering the unofficial status, content accuracy, financial advice, external links, and user responsibility for Exile2 Guides.",
      title: "Disclaimer",
      sections: [
        {
          title: "Unofficial Fan-Made Resource",
          paragraphs: [
            "Exile2 Guides is an independent, unofficial fan-made website. It is not affiliated with, endorsed by, sponsored by, or otherwise connected to Grinding Gear Games Limited (\u2018GGG\u2019), the developer and publisher of Path of Exile 2.",
            "Path of Exile, Path of Exile 2, Grinding Gear Games, and all related logos, characters, names, artwork, and other materials are trademarks or registered trademarks of Grinding Gear Games Limited. All rights are reserved by their respective owners. The use of these materials on this site is for informational and fan-community purposes only and does not imply any affiliation with or endorsement by GGG.",
            "We do not have access to non-public game data, internal development builds, confidential server information, or any other proprietary material belonging to Grinding Gear Games.",
          ],
        },
        {
          title: "Content Accuracy and Timeliness",
          paragraphs: [
            "We strive to ensure that all guide content is accurate, well-sourced, and up to date at the time of publication. However, Path of Exile 2 is a live-service game that receives frequent updates, balance changes, hotfixes, and major patches that can alter game mechanics, item properties, skill behaviours, and progression systems.",
            "As a result, information that was accurate at the time of writing may become outdated or incorrect after a game update. We cannot guarantee that every article will be updated immediately following each patch.",
            "Readers should always cross-reference guide information with the latest official patch notes, in-game tooltips, and community testing before making significant gameplay decisions. Exile2 Guides is not responsible for any in-game consequences resulting from reliance on information that has become outdated.",
          ],
        },
        {
          title: "Not Financial or Professional Advice",
          paragraphs: [
            "All content is provided for general informational, educational, and entertainment purposes only. Nothing on this site constitutes financial advice, investment advice, trading advice, or any other form of professional advice.",
            "Path of Exile 2 is a video game. Guide content should never be interpreted as a recommendation to buy, sell, trade, or exchange any in-game item, currency, account, or service for real-world money. We do not facilitate, encourage, or endorse real-money trading (RMT) in any form.",
            "Any decisions you make based on information found on this site are at your own risk. We are not responsible for any losses \u2014 in-game or otherwise \u2014 that may result from following our guides, build recommendations, or strategy suggestions.",
          ],
        },
        {
          title: "External Links and Third-Party Content",
          paragraphs: [
            "Exile2 Guides may contain links to external websites for additional context, reference material, or community tools. These links are provided for convenience and do not imply endorsement of the linked content.",
            "We do not control the content, accuracy, privacy practices, security measures, or availability of any external website. The inclusion of a link does not mean we vouch for the information presented on that site.",
            "External websites may change their content, structure, or availability at any time without notice. If you encounter a broken link or outdated external reference, please report it through our Contact page.",
          ],
        },
        {
          title: "User Responsibility",
          paragraphs: [
            "Your use of any information, guides, builds, strategies, or other content on Exile2 Guides is entirely at your own risk. We make no warranties or representations, express or implied, regarding the completeness, accuracy, reliability, suitability, or availability of any content on this site.",
            "Players are solely responsible for their own in-game decisions, including character builds, passive skill tree allocations, item purchases, currency spending, trading activity, and gameplay strategy.",
            "Exile2 Guides shall not be liable for any direct, indirect, incidental, consequential, or special damages arising from the use of, or inability to use, any content on this site. This includes but is not limited to loss of in-game progress, items, currency, account standing, or any other virtual or real-world losses.",
          ],
        },
        {
          title: "Fair Use and Intellectual Property",
          paragraphs: [
            "Game-related content on this site, including references to game mechanics, item names, skill descriptions, and boss strategies, is used under the principles of fair use and for the purpose of providing community-created game guides and commentary.",
            "We respect the intellectual property rights of Grinding Gear Games and all other rights holders. If you believe that any content on this site infringes upon your intellectual property rights, please contact us immediately at " +
              contactEmail +
              " with the details of your claim.",
            "All original editorial content, design elements, and site infrastructure created by the Exile2 Guides team may not be reproduced, distributed, or used for commercial purposes without prior written consent.",
          ],
        },
      ],
    },
    "privacy-policy": {
      description:
        "Complete privacy policy for Exile2 Guides \u2014 data practices, cookie usage, third-party services, your rights under GDPR and CCPA, and how we protect your information.",
      title: "Privacy Policy",
      sections: [
        {
          title: "Overview",
          paragraphs: [
            "This Privacy Policy describes how Exile2 Guides (\u2018we\u2019, \u2018us\u2019, \u2018our\u2019) handles personal data and privacy for visitors to our website. We are committed to protecting your privacy and being transparent about our data practices.",
            "This policy applies to all users regardless of geographic location. By using this site, you acknowledge that you have read and understood this Privacy Policy. Last updated: July 2026.",
          ],
        },
        {
          title: "Information We Collect",
          paragraphs: [
            "Exile2 Guides is a read-only static content website. We do not collect, store, process, or transmit personal data. Specifically:",
          ],
          bullets: [
            "We do not require user registration, accounts, or authentication of any kind.",
            "We do not collect names, email addresses, IP addresses, or any other personally identifiable information.",
            "We do not operate server-side logging systems that record visitor information.",
            "We do not use tracking pixels, web beacons, or browser fingerprinting techniques.",
            "We do not process user uploads, comments, forum posts, or any other user-generated content.",
            "We do not operate payment systems, subscription services, or e-commerce functionality.",
            "We do not set cookies or write to browser storage (see our Cookie Policy for details).",
          ],
        },
        {
          title: "Our Data Practices at a Glance",
          table: {
            headers: ["Data practice", "Current status"],
            rows: [
              ["User accounts and authentication", "Not available"],
              ["Personal data collection", "None collected"],
              ["Server-side access logging", "Not enabled"],
              ["Analytics and tracking", "Not enabled"],
              ["Advertising and marketing", "Not enabled"],
              ["Cookies and LocalStorage", "Not used intentionally"],
              ["Contact form submissions", "Not enabled (email only)"],
              ["User-generated content", "Not accepted"],
              ["Third-party data sharing", "None"],
              ["Cross-site tracking", "None"],
            ],
          },
        },
        {
          title: "Cookies and Browser Storage",
          paragraphs: [
            "Exile2 Guides does not intentionally set cookies or write to any form of browser storage. We do not use analytics cookies, advertising cookies, preference cookies, or any other category of cookie.",
            "Your browser may create standard HTTP cache entries for our static assets. These are controlled by your browser, contain no personal data, and are managed according to standard web caching protocols. For comprehensive information, please refer to our Cookie Policy.",
          ],
        },
        {
          title: "Third-Party Services",
          paragraphs: [
            "We do not integrate any third-party services that collect user data. We do not use Google Analytics, Cloudflare analytics with data collection, Facebook Pixel, Twitter tracking, Hotjar, Mixpanel, or any other data-collecting service.",
            "Our site is hosted on Cloudflare Pages, which serves static files. Cloudflare\u2019s infrastructure may process requests at the network level for security and performance, but we do not configure any data-collection features on our end.",
            "Our site contains links to external websites that operate under their own privacy policies. We encourage you to review their policies before providing any personal information.",
          ],
        },
        {
          title: "Your Data Protection Rights",
          paragraphs: [
            "Depending on your jurisdiction, you may have the following data protection rights:",
          ],
          bullets: [
            "Right of access (GDPR Article 15) \u2014 request copies of your personal data. Since we do not collect personal data, there is no data to provide.",
            "Right to rectification (GDPR Article 16) \u2014 request correction of inaccurate personal data. Not applicable as we hold no personal data.",
            "Right to erasure (GDPR Article 17) \u2014 request deletion of your personal data. Not applicable as we hold no personal data.",
            "Right to restrict processing (GDPR Article 18) \u2014 request limits on how we use your data. Not applicable as we hold no personal data.",
            "Right to data portability (GDPR Article 20) \u2014 request transfer of your data. Not applicable as we hold no personal data.",
            "CCPA \u2014 California residents have the right to know, delete, opt out of sale, and non-discrimination. As we do not collect or sell personal information, these rights are inherently satisfied.",
          ],
        },
        {
          title: "Children\u2019s Privacy",
          paragraphs: [
            "Exile2 Guides does not knowingly collect personal data from children under the age of 13 (or the applicable age of digital consent in your jurisdiction). As we do not collect personal data from any user, this is inherently the case.",
            "If you are a parent or guardian and believe a child has provided personal data through an unforeseen mechanism, please contact us and we will take appropriate steps to address the situation.",
          ],
        },
        {
          title: "International Data Transfers",
          paragraphs: [
            "As Exile2 Guides does not collect, store, or process personal data, there are no international data transfers to disclose. Our static content is served via a global content delivery network, but no personal data is included in or derived from these deliveries.",
          ],
        },
        {
          title: "Changes to This Privacy Policy",
          paragraphs: [
            "We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. Any material changes will be announced through a prominent notice on the site.",
            "The \u2018Last updated\u2019 date at the top of this page reflects the most recent revision. Continued use of the site after changes constitutes acceptance of the updated policy.",
            "If we introduce practices that involve personal data collection, this policy will be comprehensively rewritten before those practices begin, and affected users will be notified.",
          ],
        },
        {
          title: "Contact Us",
          paragraphs: [
            "If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:",
            `Email: ${contactEmail}`,
            "We will respond to all privacy-related inquiries within 30 days in accordance with applicable data protection regulations.",
          ],
        },
      ],
    },
    "terms-of-use": {
      description:
        "Complete terms and conditions governing your use of Exile2 Guides \u2014 acceptance, user conduct, intellectual property, disclaimers, liability limitations, and dispute resolution.",
      title: "Terms of Use",
      sections: [
        {
          title: "Acceptance of Terms",
          paragraphs: [
            "These Terms of Use (\u2018Terms\u2019) govern your access to and use of the Exile2 Guides website (\u2018Site\u2019), including all content, features, and functionality available on or through the site.",
            "By accessing, browsing, or using Exile2 Guides, you acknowledge that you have read, understood, and agree to be bound by these Terms in their entirety. If you do not agree to all of these Terms, you must not access or use this site.",
            "These Terms constitute a legally binding agreement between you (\u2018User\u2019) and the operators of Exile2 Guides. Your continued use of the site following any modifications constitutes acceptance of those changes.",
          ],
        },
        {
          title: "Description of Service",
          paragraphs: [
            "Exile2 Guides is a free, read-only, static content website that provides community-created game guides, build recommendations, boss strategies, item databases, skill references, and other informational content related to Path of Exile 2.",
            "The site does not offer user accounts, interactive features, user-generated content submission, e-commerce, payment processing, or any service beyond static content display.",
            "We reserve the right to modify, suspend, or discontinue any part of the site at any time, with or without notice.",
          ],
        },
        {
          title: "Eligibility",
          paragraphs: [
            "Exile2 Guides is intended for general audiences. There is no minimum age requirement to access our static content. However, if you are under the age of majority in your jurisdiction, you should review these Terms with a parent or guardian.",
            "By using this site, you represent and warrant that you have the legal capacity to enter into these Terms and that your use does not violate any applicable laws or regulations in your jurisdiction.",
          ],
        },
        {
          title: "Permitted Use",
          paragraphs: [
            "You may access, browse, and use the content for personal, non-commercial, informational purposes only.",
            "You may share links to our content on social media, forums, or other platforms, provided that proper attribution is given and the links direct users to the original content on our site.",
            "You may print or save individual pages for personal offline reference, provided that no content is modified, republished, or redistributed.",
          ],
        },
        {
          title: "Prohibited Conduct",
          paragraphs: [
            "You agree not to engage in any of the following prohibited activities:",
          ],
          bullets: [
            "Using automated systems (bots, scrapers, crawlers) to access, collect, or monitor content without prior written permission.",
            "Attempting to gain unauthorised access to any part of the site, its servers, or any connected systems.",
            "Launching denial-of-service attacks, stress testing, or otherwise attempting to disrupt the site\u2019s operation.",
            "Transmitting viruses, malware, or any other malicious code through or to the site.",
            "Impersonating any person or entity, or falsely representing your affiliation with any person or entity.",
            "Using the site for any unlawful purpose or in violation of any local, national, or international law.",
            "Circumventing or attempting to circumvent any security measures or access controls on the site.",
          ],
        },
        {
          title: "Intellectual Property Rights",
          paragraphs: [
            "All original content on Exile2 Guides \u2014 including editorial text, guide structure, data compilations, design elements, and site code \u2014 is protected by applicable copyright, trademark, and intellectual property laws.",
            "You may not reproduce, distribute, modify, create derivative works from, publicly display, or commercially exploit any original content without prior written consent.",
            "Path of Exile, Path of Exile 2, and all related game assets are trademarks of Grinding Gear Games Limited. These materials are used under the principles of fair use for community guide and commentary purposes. We do not claim ownership of any Grinding Gear Games intellectual property.",
            `If you believe that any content infringes your intellectual property rights, please contact us at ${contactEmail} with a detailed description of the alleged infringement.`,
          ],
        },
        {
          title: "Disclaimer of Warranties",
          paragraphs: [
            "EXILE2 GUIDES IS PROVIDED ON AN \u2018AS IS\u2019 AND \u2018AS AVAILABLE\u2019 BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.",
            "We do not warrant that the site will be uninterrupted, error-free, or completely secure. We do not warrant that the content is accurate, complete, reliable, current, or error-free.",
            "You acknowledge that game mechanics change frequently with updates. Content may become outdated at any time without notice. We do not warrant that any guide, build recommendation, or strategy will produce specific results.",
            "Any material downloaded or obtained through the site is accessed at your own discretion and risk. You are solely responsible for any damage to your computer system or loss of data that results from accessing any material.",
          ],
        },
        {
          title: "Limitation of Liability",
          paragraphs: [
            "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL EXILE2 GUIDES, ITS OPERATORS, CONTRIBUTORS, OR AFFILIATES BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF, OR INABILITY TO USE, THE SITE.",
            "This limitation applies to all forms of damages, including but not limited to: loss of in-game progress, items, currency, or account standing; loss of data; loss of revenue or anticipated profits; and any indirect, special, incidental, consequential, or punitive damages, whether based on breach of contract, tort, strict liability, or any other legal theory.",
            "These limitations apply regardless of whether Exile2 Guides has been advised of the possibility of such damages. If you are dissatisfied with any content or these Terms, your sole remedy is to discontinue using the site.",
          ],
        },
        {
          title: "Indemnification",
          paragraphs: [
            "You agree to indemnify, defend, and hold harmless Exile2 Guides, its operators, contributors, and affiliates from and against any and all claims, liabilities, damages, losses, costs, and expenses (including reasonable legal fees) arising out of or in any way connected with: (a) your access to or use of the site; (b) your violation of these Terms; (c) your violation of any third-party right, including any intellectual property, privacy, or proprietary right; or (d) any claim that your content or actions caused damage to a third party.",
          ],
        },
        {
          title: "Modifications to Terms",
          paragraphs: [
            "We reserve the right to modify these Terms at any time at our sole discretion. When we make changes, we will update the \u2018Last updated\u2019 date at the top of this page. Material changes may be communicated through a prominent notice on the site.",
            "If you disagree with any modification, you must discontinue use of the site. Your continued use following any changes constitutes acceptance of the revised Terms.",
          ],
        },
        {
          title: "Governing Law and Dispute Resolution",
          paragraphs: [
            "These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which the site operators are based, without regard to its conflict of law provisions.",
            "Any dispute arising out of or relating to these Terms shall first be attempted to be resolved through good-faith negotiation. If negotiation fails, disputes shall be submitted to the competent courts of the applicable jurisdiction.",
            "You agree that any dispute resolution proceedings will be conducted only on an individual basis, and not in a class, consolidated, or representative action.",
          ],
        },
        {
          title: "General Provisions",
          paragraphs: [
            "If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that these Terms shall otherwise remain in full force and effect.",
            "Our failure to enforce any right or provision of these Terms shall not be considered a waiver of those rights. The waiver of any right or provision shall be effective only if in writing and signed by a duly authorised representative.",
            "These Terms, together with our Privacy Policy, Cookie Policy, and Disclaimer, constitute the entire agreement between you and Exile2 Guides regarding your use of the site.",
          ],
        },
        {
          title: "Contact Information",
          paragraphs: [
            `For questions about these Terms of Use, please contact us at ${contactEmail}.`,
          ],
        },
      ],
    },
  },
  "zh-cn": {
    about: {
      description:
        "了解 Exile2 Guides 如何由独立开发者运营、整理资料并发布非官方 Path of Exile 2 攻略。",
      title: "关于 Exile2 Guides",
      sections: [
        {
          title: "我们的使命",
          paragraphs: [
            "Exile2 Guides 由一名独立开发者运营，是一个非官方的 Path of Exile 2 攻略资源站。我们的目标是整理清晰、适配版本的资料，而不会把资料汇总描述成个人游戏体验。",
            "本站是只读且免费访问的站点。文章经过结构化研究和自动化 QA 检查后发布；重要的不确定性和核验边界会直接显示在页面上。",
          ],
        },
        {
          title: "内容覆盖范围",
          connectionLinks: [
            {
              description:
                "升级 Build、终局配置、装备优先级、天赋树路线和宝石连接方案，覆盖所有职业。",
              href: "/zh-cn/builds/",
              label: "Build",
            },
            {
              description:
                "Boss 机制解析、阶段拆解、掉落表、抗性需求与分步攻略指南。",
              href: "/zh-cn/bosses/",
              label: "Boss",
            },
            {
              description: "暗金物品数据库、通货机制、制作参考与词缀等级说明。",
              href: "/zh-cn/items/",
              label: "物品",
            },
            {
              description:
                "主动技能宝石解析、辅助宝石搭配、成长机制与等级数据。",
              href: "/zh-cn/skills/",
              label: "技能",
            },
            {
              description:
                "机制深度解析、新手教程、常见问题解答与通用成长指南。",
              href: "/zh-cn/guides/",
              label: "攻略",
            },
          ],
        },
        {
          title: "编辑标准",
          paragraphs: [
            "文章会标注版本背景、来源引用和核验状态，让读者清楚判断信息的时效性和可靠性。",
            "文章结合官方补丁、当前数据库、成熟攻略、实战视频和玩家讨论整理；来源可支持的结论会尽量附上链接。自动化 QA 会检查内容结构、必要元数据、内链、发布状态、索引状态和构建产物。",
            "未经第一方游戏内测试的内容，会标记为来源核验，而不会声称已经实测。版本敏感的不确定性会保留在正文中，不用笼统的肯定语气掩盖。",
          ],
        },
        {
          title: "独立性",
          paragraphs: [
            "Exile2 Guides 是独立的非官方资源站。我们与 Grinding Gear Games 不存在隶属、授权或赞助关系。",
            "本站由一名运营者维护；研究过程不会把尚未完成的第一方游戏内测试说成已经实测。",
          ],
        },
        {
          title: "更正与反馈",
          paragraphs: [
            "游戏机制频繁变化，没有攻略是完美的。如果你发现事实错误、过时的机制描述或缺失的来源引用，请通过联系页面或直接发送邮件告诉我们。",
            "更正和版权报告会在时间允许时处理。高影响的事实错误会优先处理，但不保证回复时效。",
          ],
        },
      ],
    },
    contact: {
      description:
        "联系独立运营的 Exile2 Guides，提交内容更正、版权报告或一般反馈。",
      title: "联系我们",
      sections: [
        {
          title: "联系方式",
          paragraphs: [
            `公开联系渠道只有邮箱：${contactEmail}。更正和版权报告会在时间允许时处理。高影响的事实错误会优先处理，但不保证回复时效。`,
            "本站是只读静态站点，没有服务端联系表单。请使用下方的直接邮件链接；页面不会保留一个看似可发送、实际不会送达的按钮。",
          ],
          connectionLinks: [
            {
              description: "打开邮件客户端，发送内容更正、版权报告或其他留言。",
              href: `mailto:${contactEmail}`,
              label: contactEmail,
            },
          ],
        },
        {
          title: "联系场景",
          issueCards: [
            {
              description:
                "请提供页面 URL、具体错误内容、你测试的游戏版本或 Patch，以及可靠来源或清晰的复现步骤。",
              title: "内容更正",
            },
            {
              description:
                "请提供相关资产或页面 URL、版权材料描述、所有权或授权证明，以及你要求的具体处理措施。",
              title: "版权与归属",
            },
            {
              description:
                "请说明需要关注的领域\u2014\u2014Build、Boss、物品、技能或整体站点体验\u2014\u2014以及你的详细建议。",
              title: "一般反馈",
            },
          ],
        },
        {
          title: "建议提供的信息",
          bullets: [
            "出现问题的确切页面 URL，如有可能请附截图或引用文本。",
            "更正的可靠来源——官方 Patch Notes、当前数据库条目或清晰的社区测试/报告。",
            "机制差异的清晰复现信息，包括游戏版本和已知的相关配置。",
            "仅提供回复你的咨询所必需的最少个人信息。",
          ],
        },
        {
          title: "处理说明",
          paragraphs: [
            "更正和版权报告会在时间允许时处理。高影响的事实错误会优先处理，但不保证回复时效。",
          ],
        },
      ],
    },
    disclaimer: {
      description:
        "Exile2 Guides 的重要法律声明\u2014\u2014涵盖非官方身份、内容准确性、财务建议、外部链接和用户责任。",
      title: "免责声明",
      sections: [
        {
          title: "非官方玩家资源",
          paragraphs: [
            "Exile2 Guides 是一个独立的非官方玩家制作网站。它与 Grinding Gear Games Limited（\u201CGGG\u201D）\u2014\u2014Path of Exile 2 的开发者和发行商\u2014\u2014不存在隶属、授权、赞助或其他关联关系。",
            "Path of Exile、Path of Exile 2、Grinding Gear Games 及所有相关 Logo、角色、名称、美术素材和其他材料均为 Grinding Gear Games Limited 的商标或注册商标。所有权利归其各自所有者所有。本站使用这些材料仅用于信息和玩家社区目的，不代表与 GGG 存在任何关联或获得其背书。",
            "我们无法访问非公开的游戏数据、内部开发版本、机密服务器信息或属于 Grinding Gear Games 的任何其他专有材料。",
          ],
        },
        {
          title: "内容准确性与时效性",
          paragraphs: [
            "我们努力确保所有攻略内容在发布时准确、有据可查且为最新状态。然而，Path of Exile 2 是一款实时服务游戏，会频繁收到更新、平衡调整、热修复和大型补丁，这些都可能改变游戏机制、物品属性、技能行为和成长系统。",
            "因此，撰写时准确的信息可能在游戏更新后变得过时或不正确。我们无法保证每篇文章都会在每次补丁后立即更新。",
            "读者在做出重要游戏决策前，应始终将攻略信息与最新的官方 Patch Notes、游戏内提示和社区测试进行交叉验证。Exile2 Guides 不对因依赖已过时信息而产生的任何游戏内后果负责。",
          ],
        },
        {
          title: "非财务或专业建议",
          paragraphs: [
            "所有内容仅供一般参考、教育和娱乐用途。本站任何内容均不构成财务建议、投资建议、交易建议或任何其他形式的专业建议。",
            "所有内容仅供一般参考、教育和娱乐用途。本站任何内容均不构成财务建议、投资建议、交易建议或任何其他形式的专业建议。",
            "虚拟物品、游戏货币和账号交易涉及固有风险，包括但不限于欺诈、账号封禁和价值波动。我们不对任何此类交易的结果承担责任。在涉及真实货币的交易前，请始终咨询合格的财务顾问。",
          ],
        },
        {
          title: "外部链接与第三方资源",
          paragraphs: [
            "本站可能包含指向第三方网站、工具或资源的链接，例如官方游戏客户端下载页面、社区论坛、数据工具或其他攻略网站。这些链接仅出于方便和提供参考的目的而提供。",
            "我们不对任何第三方网站或资源的内容、准确性、隐私政策或做法负责。访问外部链接的风险由您自行承担，我们建议您在提供任何个人信息或进行交易前阅读相关网站的条款与隐私政策。",
          ],
        },
        {
          title: "用户责任与游戏行为",
          paragraphs: [
            "使用本站攻略信息时，您有责任遵守 Grinding Gear Games 的《Path of Exile 2 服务条款》和社区行为准则。本站不提供、不鼓励也不支持任何可能违反游戏服务条款的行为，包括但不限于利用漏洞、使用外挂、账号共享或任何其他形式的作弊行为。",
            "因使用本站信息而进行的游戏行为所产生的任何后果，包括账号处罚、物品损失或游戏内经济影响，均由用户自行承担。",
          ],
        },
        {
          title: "合理使用与知识产权",
          paragraphs: [
            "Path of Exile 2 的游戏内容、美术资产和设计版权归 Grinding Gear Games 所有。本站使用的游戏截图、图标和其他素材均基于合理使用原则，用于教育、评论和信息目的。",
            "本站原创内容（包括但不限于文字攻略、编辑分析、页面设计和代码）采用知识共享署名-非商业性使用 4.0 国际许可协议（CC BY-NC 4.0）授权。您可以自由分享和改编我们的原创内容，但必须注明出处且不得用于商业目的。",
          ],
        },
        {
          title: "免责声明变更",
          paragraphs: [
            "我们保留随时修改、更新或替换本免责声明任何部分的权利，恕不另行通知。修改后的声明将在发布时立即生效。",
            "继续使用本站即表示您接受更新后的免责声明条款。如果您不同意本免责声明的任何部分，请停止使用本站。",
            "如有问题，请通过 " + contactEmail + " 联系我们。",
          ],
        },
      ],
    },
    "cookie-policy": {
      description:
        "了解 Exile2 Guides 如何使用 Cookie 及类似技术来改善您的浏览体验、记住偏好设置并分析网站流量。",
      title: "Cookie 政策",
      sections: [
        {
          title: "什么是 Cookie",
          paragraphs: [
            "Cookie 是当您访问网站时放置在计算机或移动设备上的小型文本文件。它们广泛应用于使网站正常运行或提高效率，以及向网站所有者提供分析信息。",
            "本站使用 Cookie 和类似技术（如 localStorage 和 sessionStorage）来改善您的浏览体验、记住您的偏好设置（例如语言和区域选择）并分析网站流量模式。",
          ],
        },
        {
          title: "我们如何使用 Cookie",
          paragraphs: [
            "Exile2 Guides 使用 Cookie 主要用于以下目的：确保网站正常运行、记住您的语言偏好和阅读进度、分析网站流量以改进内容质量，以及在适用情况下提供个性化体验。",
            "我们不会使用 Cookie 进行广告投放或跟踪您的跨站浏览行为。本站不嵌入任何第三方广告追踪器或营销像素。",
          ],
        },
        {
          title: "Cookie 分类",
          table: {
            headers: ["类型", "用途", "持续时间"],
            rows: [
              [
                "严格必要",
                "确保网站核心功能正常运行，包括页面导航、安全验证和语言偏好存储。缺少这些 Cookie 将导致网站无法正常运行。",
                "会话 / 持久",
              ],
              [
                "功能性",
                "记住您的偏好设置，如首选语言、区域、暗色模式选择和阅读进度，以提供个性化的浏览体验。",
                "持久（最多 12 个月）",
              ],
              [
                "分析性",
                "帮助我们了解访问者如何使用本站，收集匿名统计数据以改进网站内容和结构。所有数据均为聚合形式，不与个人身份关联。",
                "持久（最多 24 个月）",
              ],
            ],
          },
        },
        {
          title: "第三方 Cookie",
          paragraphs: [
            "本站可能偶尔嵌入来自第三方服务的内容（如 YouTube 视频或 GitHub 链接）。这些服务可能会设置自己的 Cookie，我们无法控制。请参阅相关第三方服务的隐私政策以了解详情。",
            "我们不会将来自第三方服务的数据与本站收集的信息合并用于任何分析或营销目的。",
          ],
        },
        {
          title: "Cookie 相关法规合规",
          paragraphs: [
            "我们遵守欧盟《电子隐私指令》（ePrivacy Directive）和《通用数据保护条例》（GDPR）中关于 Cookie 使用的要求。在首次访问本站时，我们会显示 Cookie 同意横幅，让您选择接受或拒绝非必要的 Cookie。",
            "对于加利福尼亚州居民，我们同时遵守《加州消费者隐私法》（CCPA）中关于在线隐私披露的要求。",
          ],
        },
        {
          title: "如何管理或删除 Cookie",
          paragraphs: [
            "您可以通过浏览器设置控制和管理 Cookie。大多数浏览器允许您拒绝接受 Cookie、删除现有 Cookie 或在设置 Cookie 时收到通知。以下是主流浏览器的 Cookie 管理指引：",
          ],
          bullets: [
            "Google Chrome：设置 → 隐私和安全 → Cookie 和其他网站数据",
            "Mozilla Firefox：设置 → 隐私与安全 → Cookie 和网站数据",
            "Safari：偏好设置 → 隐私 → 管理网站数据",
            "Microsoft Edge：设置 → Cookie 和网站权限 → 管理和删除 Cookie",
            "Opera：设置 → 高级 → 隐私与安全 → Cookie 设置",
          ],
        },
        {
          title: "禁用 Cookie 的影响",
          paragraphs: [
            "如果您选择禁用 Cookie，本站的部分功能可能无法正常工作。例如，语言偏好可能不会自动记住，阅读进度可能无法保存。但您仍然可以浏览所有公开内容。",
          ],
        },
        {
          title: "本政策的变更",
          paragraphs: [
            "我们可能会不时更新本 Cookie 政策以反映技术变化、法律要求或网站功能的改进。重大变更将通过网站通知或醒目公告的方式告知。建议您定期查阅本政策以了解最新信息。",
            "如有问题，请通过 " + contactEmail + " 联系我们。",
          ],
        },
      ],
    },
    "privacy-policy": {
      description:
        "阅读 Exile2 Guides 的隐私政策，了解我们如何收集、使用、存储和保护您的个人信息，以及您享有的隐私权利。",
      title: "隐私政策",
      sections: [
        {
          title: "概述",
          paragraphs: [
            'Exile2 Guides（"本站"）由 Exile2 Guides 团队（"我们"）运营。我们重视您的隐私，并致力于保护您的个人信息。本隐私政策说明了我们如何收集、使用、存储和分享您的信息，以及您享有的相关权利。',
            "通过使用本站，即表示您同意本隐私政策中描述的做法。如果您不同意本政策的任何部分，请停止使用本站。",
          ],
        },
        {
          title: "我们收集的信息",
          paragraphs: [
            "我们仅收集为提供和改进网站服务所必需的信息。具体而言，我们可能收集以下类型的信息：",
          ],
          bullets: [
            "您通过联系表单或电子邮件主动提供的信息（如姓名、电子邮件地址和消息内容）",
            "浏览器自动发送的技术信息（如 IP 地址、浏览器类型、操作系统和屏幕分辨率）",
            "Cookie 和类似技术收集的信息（详见我们的 Cookie 政策）",
            "使用数据（如访问的页面、停留时间、引荐来源和点击行为）",
            "设备信息（如设备型号、操作系统版本和唯一设备标识符）",
            "语言和区域偏好设置",
            "您提交的错误报告或反馈信息",
          ],
        },
        {
          title: "信息收集方式",
          table: {
            headers: ["信息来源", "收集的信息", "收集方式"],
            rows: [
              ["联系表单", "姓名、邮箱、消息内容", "您主动提交"],
              ["网站分析", "IP 地址、页面访问、停留时间", "自动收集"],
              ["Cookie", "偏好设置、会话标识", "浏览器存储"],
              ["错误日志", "错误详情、浏览器信息", "自动收集"],
              ["电子邮件", "通信内容、时间戳", "您主动发送"],
            ],
          },
        },
        {
          title: "信息使用目的",
          paragraphs: [
            "我们收集的信息仅用于以下目的：运营和维护网站功能、回复您的查询和反馈、改进网站内容和用户体验、分析网站流量模式以优化性能，以及确保网站安全（如检测和防止滥用行为）。",
            "我们不会将您的个人信息用于广告投放、营销推广或出售给任何第三方。",
          ],
        },
        {
          title: "信息共享与披露",
          paragraphs: [
            "我们不会将您的个人信息出售、交易或以其他方式转让给外部方，但以下情况除外：",
          ],
          bullets: [
            "经您明确同意：在您明确授权的情况下，我们可能将您的信息共享给指定的第三方",
            "服务提供商：我们可能与协助我们运营网站的可信第三方（如托管服务商、分析工具提供商）共享必要的信息，这些方受保密义务约束",
            "法律要求：如果我们认为披露信息对于遵守法律义务、保护我们的权利或他人安全是合理必要的",
            "业务转让：如果本站被收购或合并，您的信息可能作为资产转让的一部分被转移，我们将通知您",
          ],
        },
        {
          title: "数据安全",
          paragraphs: [
            "我们采取合理的技术和组织措施来保护您的个人信息免遭未经授权的访问、更改、披露或销毁。这些措施包括 HTTPS 加密传输、安全的服务器基础设施和访问控制。",
            "然而，没有任何互联网传输方式或电子存储方法是百分之百安全的。尽管我们努力使用商业上可接受的手段保护您的个人信息，但我们无法保证其绝对安全。",
          ],
        },
        {
          title: "数据保留",
          paragraphs: [
            "我们仅在实现收集目的所需的时间内保留您的个人信息。联系表单提交的信息在回复完成后保留不超过 12 个月。分析数据在去标识化后可保留更长时间用于趋势分析。",
            "您有权随时要求我们删除您的个人信息，除非我们因法律义务需要保留。",
          ],
        },
        {
          title: "您的数据保护权利",
          paragraphs: ["根据您所在的司法管辖区，您可能享有以下数据保护权利："],
          bullets: [
            "访问权：您有权请求获取我们持有的关于您的个人信息的副本",
            "更正权：您有权要求更正任何不准确或不完整的信息",
            '删除权：在特定情况下，您有权要求删除您的个人信息（"被遗忘权"）',
            "限制处理权：您有权要求限制我们对您个人信息的使用",
            "数据可携带权：您有权请求将您的信息以结构化、机器可读的格式传输给您或另一方",
            "撤回同意权：如果我们基于同意处理您的信息，您有权随时撤回同意",
          ],
        },
        {
          title: "GDPR 合规（欧盟居民）",
          paragraphs: [
            "如果您是欧洲经济区（EEA）的居民，根据《通用数据保护条例》（GDPR），我们对您的个人信息处理基于合法利益、合同履行或您的同意。您有权随时向所在国的数据保护机构投诉。",
          ],
        },
        {
          title: "CCPA 合规（加州居民）",
          paragraphs: [
            "如果您是加利福尼亚州居民，根据《加州消费者隐私法》（CCPA），您有权了解我们收集的个人信息类别、要求删除、要求更正不准确的信息，以及不受歧视地行使您的隐私权利。",
            "在过去 12 个月中，我们收集的个人信息类别包括：标识符（如姓名和电子邮件）、互联网活动信息（如浏览历史）和电子网络信息（如 IP 地址）。",
          ],
        },
        {
          title: "儿童隐私",
          paragraphs: [
            "本站不面向 13 岁以下儿童。我们不会故意收集 13 岁以下儿童的个人信息。如果您认为我们无意中收集了儿童的信息，请立即通过 " +
              contactEmail +
              " 联系我们，我们将在核实后删除相关信息。",
          ],
        },
        {
          title: "国际数据传输",
          paragraphs: [
            "您的信息可能存储在您所在国家/地区以外的服务器上。当信息传输到欧洲经济区以外的国家时，我们确保接收方提供足够的数据保护水平，并使用标准合同条款等合法机制。",
          ],
        },
        {
          title: "隐私政策变更",
          paragraphs: [
            '我们可能会不时更新本隐私政策。重大变更将通过网站通知或在政策页面顶部更新"最后生效日期"的方式告知。建议您定期查阅本政策以了解最新信息。',
          ],
        },
        {
          title: "联系我们",
          paragraphs: [
            "如果您对本隐私政策有任何疑问、意见或请求，请通过以下方式联系我们：",
            "电子邮件：" + contactEmail,
            "我们将在收到请求后 30 天内回复。",
          ],
        },
      ],
    },
    "terms-of-use": {
      description:
        "阅读 Exile2 Guides 的使用条款，了解使用本站服务的权利、义务和限制条件。",
      title: "使用条款",
      sections: [
        {
          title: "条款接受",
          paragraphs: [
            '欢迎访问 Exile2 Guides（"本站"）。通过使用本站，即表示您同意受本使用条款（"条款"）的约束。如果您不同意本条款的任何部分，请勿使用本站。',
            "我们保留随时修改、更新或替换本条款任何部分的权利。修改后的条款将在发布时立即生效。您继续使用本站即表示接受更新后的条款。",
          ],
        },
        {
          title: "服务描述",
          paragraphs: [
            "Exile2 Guides 是一个免费的在线游戏攻略资源网站，提供 Path of Exile 2 相关的攻略、指南、Boss 战策略、Build 推荐、物品数据库和技能解析等内容。本站内容仅供一般参考、教育和娱乐用途。",
            "我们保留随时修改、暂停或终止本站全部或部分服务的权利，恕不另行通知。",
          ],
        },
        {
          title: "使用资格",
          paragraphs: [
            "使用本站即表示您声明您已年满 13 周岁。如果您未满 18 周岁，应在父母或法定监护人的同意下使用本站。13 岁以下儿童不得使用本站。",
          ],
        },
        {
          title: "允许的使用",
          paragraphs: [
            "您可以出于个人、非商业目的访问和使用本站内容，包括但不限于：阅读攻略和指南、在个人博客或社交媒体上引用本站内容（需注明出处并附链接）、将本站加入书签或收藏夹、与朋友分享本站链接。",
          ],
        },
        {
          title: "禁止的行为",
          paragraphs: ["使用本站时，您同意不从事以下行为："],
          bullets: [
            "将本站内容用于任何商业目的，包括但不限于出售、许可或创建衍生商业产品",
            "复制、镜像或爬取本站的全部或实质性部分，除非获得我们的明确书面授权",
            "试图干扰本站的正常运行，包括但不限于发起拒绝服务攻击、注入恶意代码或滥用自动化脚本",
            "规避、禁用或以其他方式干扰本站的安全相关功能",
            "冒充 Exile2 Guides 或其团队成员、编辑或贡献者",
            "上传、发布或传播任何违法、诽谤、骚扰、威胁或侵犯他人权利的内容",
            "收集或存储其他用户的个人信息",
            "利用本站的任何漏洞或技术缺陷谋取私利",
          ],
        },
        {
          title: "知识产权",
          paragraphs: [
            "本站的原创内容（包括但不限于文字、图形设计、页面布局、代码和编辑分析）采用知识共享署名-非商业性使用 4.0 国际许可协议（CC BY-NC 4.0）授权。",
            "Path of Exile 2 的名称、标志、游戏截图和相关资产归 Grinding Gear Games 所有。本站对这些素材的使用基于合理使用原则，仅用于教育和信息目的。",
            "未经授权复制本站内容可能违反版权法、商标法和其他法律。如果您认为本站内容侵犯了您的知识产权，请通过 " +
              contactEmail +
              " 联系我们。",
          ],
        },
        {
          title: "免责声明",
          paragraphs: [
            '本站所有内容均按"现状"和"可用"的基础提供，不提供任何形式的明示或暗示的保证，包括但不限于对适销性、特定用途适用性和非侵权性的保证。',
            "我们不保证本站将始终可用、无错误、安全或不含病毒。您使用本站的风险自行承担。在法律允许的最大范围内，我们不对因使用或无法使用本站而产生的任何直接、间接、附带、特殊或后果性损害负责。",
          ],
        },
        {
          title: "责任限制",
          paragraphs: [
            "在法律允许的最大范围内，Exile2 Guides 及其运营者、编辑、贡献者和关联方不对以下情况承担责任：",
          ],
          bullets: [
            "因使用或无法使用本站而导致的任何直接、间接、附带、特殊或后果性损失",
            "因本站内容中的任何错误、不准确或遗漏而产生的损失",
            "因本站服务中断、延迟或故障而导致的损失",
            "因使用本站而产生的任何游戏内后果，包括但不限于角色死亡、物品损失或账号处罚",
            "因黑客攻击、数据泄露或技术故障导致的个人信息丢失",
          ],
        },
        {
          title: "赔偿",
          paragraphs: [
            "您同意就因以下情况而产生的任何索赔、损失、责任、费用和开支（包括合理的律师费），对 Exile2 Guides 及其运营者、编辑和关联方进行赔偿并使其免受损害：",
          ],
          bullets: [
            "您违反本使用条款的任何规定",
            "您违反任何适用法律或法规",
            "您侵犯任何第三方的权利（包括但不限于知识产权或隐私权）",
            "因您的行为导致的任何争议或索赔",
          ],
        },
        {
          title: "条款修改",
          paragraphs: [
            '我们保留随时修改本条款的权利。修改后的条款将在发布时立即生效。我们将在政策页面顶部更新"最后生效日期"以标示最近一次修订。',
            "继续使用本站即表示您接受修改后的条款。如果您不同意更新后的条款，请停止使用本站。",
          ],
        },
        {
          title: "管辖法律",
          paragraphs: [
            "本条款受国际互联网惯例和适用司法管辖区的法律管辖和解释，不考虑法律冲突原则。因本条款或使用本站而产生的任何争议应首先通过友好协商解决。",
            "如果协商无法解决，争议应提交至有管辖权的法院。您同意接受该法院的属人管辖。",
          ],
        },
        {
          title: "一般条款",
          paragraphs: [
            "如果本条款的任何规定被认定为无效或不可执行，该规定应在法律允许的最大范围内执行，其余规定继续完全有效。",
            "我们未能执行本条款的任何规定不构成对该规定的放弃。本条款构成您与本站之间关于使用本站的完整协议。",
            "本条款连同我们的隐私政策、Cookie 政策和免责声明构成您与本站之间关于使用本站的完整协议。",
          ],
        },
        {
          title: "联系信息",
          paragraphs: [
            "如对本使用条款有疑问，请通过 " + contactEmail + " 联系我们。",
          ],
        },
      ],
    },
  },
};

/** 判断给定字符串是否为有效的信息页 slug */
export function isInformationPageSlug(
  value: string,
): value is InformationPageSlug {
  return (informationPageSlugs as readonly string[]).includes(value);
}

/** 获取指定语言和信息页 slug 对应的完整文案 */
export function getInformationPageCopy(
  locale: ContentLocale,
  slug: InformationPageSlug,
): InformationPageCopy {
  return informationCopyByLocale[locale][slug];
}
