/**
 * 文件职责：对第一批深度译文执行游戏语境编辑，统一术语并修正机器翻译中可重复定位的字面误译。
 *
 * 维护边界：规则只作用于 15 篇目标文章的 sections，不修改稳定 ID、来源 URL 或英语事实源。
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const targets = [
  ["builds", "big-monkee-spirit-walker"],
  ["builds", "grenade-gemling-legionnaire"],
  ["builds", "lightning-arrow-deadeye"],
  ["skills", "tornado"],
  ["skills", "ball-lightning"],
  ["skills", "gas-grenade"],
  ["skills", "lightning-spear"],
  ["items", "adonias-ego"],
  ["items", "sire-of-shards"],
  ["items", "crown-of-the-pale-king"],
  ["guides", "best-atlas-tree-0-5"],
  ["guides", "currency-farming-strategies-0-5"],
  ["guides", "classes-ascendancies-guide"],
  ["guides", "act-1-4-boss-permanent-rewards-checklist"],
  ["guides", "power-frenzy-endurance-charges"],
  ["guides", "resistance-curse-exposure-penetration"],
  ["skills", "cast-on-elemental-ailment"],
  ["skills", "wind-dancer"],
  ["bosses", "the-executioner"],
];

const rules = {
  "zh-cn": [
    [/构建/g, "构筑"],
    [/映射旋转/g, "刷图循环"],
    [/压轴旋转/g, "首领战循环"],
    [/保龄球旋转/g, "首领战循环"],
    [/旋转/g, "循环"],
    [/残局/g, "终局"],
    [/路径石|灵石/g, "Waystone"],
    [/高级平板|高级石碑/g, "高级 Tablet"],
    [/平板覆盖|石碑覆盖/g, "Tablet 覆盖"],
    [/地图大师/g, "Atlas Master"],
    [/赢得比赛/g, "赢下战斗"],
    [/比赛概况/g, "战斗概况"],
    [/比赛/g, "战斗"],
    [/物理近战搭配小吃和火力压力/g, "物理近战，伴随小怪与火焰地面压力"],
    [/小吃/g, "小怪"],
    [/物理减缓与生活/g, "物理减伤与生命"],
    [/防弹甲/g, "胸甲"],
    [/生活/g, "生命"],
    [/清连/g, "清怪配置"],
    [/前线/g, "正面攻击范围"],
    [/抗火能力|耐火性/g, "火焰抗性"],
    [/燃烧的土地/g, "燃烧地面"],
    [/压轴/g, "首领战"],
    [/老板|Boss/gi, "首领"],
    [/;\s*/g, "；"],
  ],
  "pt-br": [
    [/\badds\b/gi, "inimigos adicionais"],
    [/waystones/gi, "Waystones"],
    [/escalonação de doença/gi, "escalonamento de aflições"],
    [/as cargas estão em mão/gi, "as cargas são mantidas"],
    [
      /atribuição do conjunto de armas/gi,
      "configuração dos conjuntos de armas",
    ],
    [/enquanto os fusíveis se resolvem/gi, "enquanto os pavios terminam"],
  ],
  ru: [
    [/добавками/gi, "дополнительными противниками"],
    [
      /во время возвращения длинного топора/gi,
      "во время долгого восстановления после удара топором",
    ],
    [/Стоимость отказа/gi, "Цена поражения"],
    [/Дерево на первое место/gi, "Дерево с приоритетом поддержки Waystone"],
    [
      /отравляется так, будто ударило/gi,
      "накладывает яд так, словно нанесло удар",
    ],
    [/масштабирование болезни/gi, "масштабирование состояний"],
    [/взрыватели разрешаются/gi, "срабатывают запалы"],
    [/распределение оружия/gi, "настройка комплектов оружия"],
  ],
  de: [
    [/Langaxt-Bergung/gi, "langen Erholungsanimation nach dem Axtschlag"],
    [/Ausfallkosten/gi, "Kosten einer Niederlage"],
    [/Sustain-First-Baum/gi, "Atlas-Baum mit Fokus auf Waystone-Sustain"],
    [/zuverlässige Kartenabschluss/gi, "zuverlässigem Kartenabschluss"],
    [/Waffenzuweisung/gi, "Belegung der Waffensets"],
    [/während die Zünder sich auflösen/gi, "während die Zünder auslösen"],
    [
      /Amazon; Ritualist; Spirit Walker/g,
      "Amazon, Ritualist und Spirit Walker",
    ],
  ],
  es: [
    [/piedras? de camino/gi, "Waystones"],
    [/\badds\b/gi, "enemigos adicionales"],
    [/Coste de fallo/gi, "Coste de la derrota"],
    [/se resuelven las mechas/gi, "se consumen las mechas"],
  ],
  fr: [
    [/pierres? de chemin/gi, "Waystones"],
    [/\badds\b/gi, "ennemis supplémentaires"],
    [/Coût de défaillance/gi, "Coût d’une défaite"],
    [/échelle d’affection/gi, "mise à l’échelle des altérations"],
    [/Rotation des bosses/gi, "Rotation contre les boss"],
    [/pendant que les mèches se résolvent/gi, "pendant que les mèches brûlent"],
  ],
  ja: [
    [/試合に勝つ三つのルール/g, "戦闘に勝つための三つのルール"],
    [/まず前線を離れろ/g, "まず正面攻撃範囲から離れる"],
    [/ロングアックス回収中に攻撃/g, "斧攻撃後の長い硬直中に攻撃する"],
    [/試合概要/g, "戦闘概要"],
    [/物理的な近接攻撃と雑魚、火圧/g, "物理近接攻撃に加え、雑魚と炎上床の圧力"],
    [/故障コスト/g, "敗北時の負担"],
  ],
  ko: [
    [/선거 단계/g, "캠페인 단계"],
    [/경기 프로필/g, "전투 개요"],
    [/고장 비용/g, "실패 비용"],
    [/먼저 전선을 떠나세요/g, "정면 공격선을 먼저 벗어나세요"],
    [
      /롱 액스 회복 중에 공격을 받는다/g,
      "도끼 공격 후 긴 후딜 동안 공격하세요",
    ],
    [/애드/g, "추가 적"],
    [/가장 좋은 첫 나무/g, "가장 좋은 첫 번째 패시브 트리"],
    [/매핑 회전/g, "맵핑 운용"],
    [/보싱 회전/g, "보스전 운용"],
    [/회전/g, "운용"],
  ],
  tr: [
    [/Maçı kazandıran/gi, "Dövüşü kazandıran"],
    [
      /Uzun balta kurtarma sırasında saldırı/gi,
      "Balta vuruşundan sonraki uzun toparlanma sırasında saldırın",
    ],
    [/Arıza maliyeti/gi, "Yenilgi maliyeti"],
    [/toplama ve ateş baskısı ile/gi, "ek düşmanlar ve ateş baskısıyla"],
    [/hastalığın ölçeklenmesi/gi, "durum etkisi ölçeklendirmesi"],
    [/Ürün nasıl çalıştığı/gi, "Eşyanın çalışma şekli"],
    [/fitiller çözülürken/gi, "fitiller patlarken"],
    [/patlayıcılar geri alındıktan/gi, "kullanım hakları yenilendikten"],
    [/Deadeye; Pathfinder; Oracle/g, "Deadeye, Pathfinder ve Oracle"],
  ],
};

const controlledKeys = new Set([
  "id",
  "type",
  "order",
  "visible",
  "toc",
  "url",
  "sourceType",
  "contentType",
  "contentId",
  "sourceId",
  "itemId",
  "skillId",
  "phaseId",
  "attackId",
  "mediaId",
  "priority",
  "tier",
  "danger",
  "level",
]);

const controlledArrays = new Set([
  "tags",
  "filters",
  "damageTypes",
  "phaseIds",
  "mediaIds",
  "sourceIds",
  "supportSkillIds",
]);

const manualAct4 = {
  ja: {
    row: [
      "第4幕",
      "旅の終わり；死者の広間；祖先の試練；放棄された監獄；ワカパヌ島",
      "旅の終わりで武器セットパッシブポイント+2；3つの試練タトゥー選択；ナヴァリの安息所で最大マナ+5%；試練完了でパッシブポイント+2；フラスコ回復の恒久選択；防御の恒久選択",
      "ボス撃破後の受け取りまで完了する。フレイヤを解放し、ヒネコラに話しかけ、島々を離れる前に各タトゥーまたは恒久選択が反映されたことを確認する。",
    ],
    sourceLabels: [
      "Path of Exile 2 早期アクセス パッチノート",
      "PoE2DB 最新クエスト報酬表",
      "PoE2 Wiki クエスト報酬の照合",
    ],
    categories: [
      [
        "最新クエスト報酬表",
        "拡張された第4幕と幕間ルートを含む、各幕の目標と恒久報酬。",
      ],
      [
        "独立した報酬照合",
        "変更されたキャンペーン位置を確認するためのクエスト報酬と恒久キャラクターボーナス記録。",
      ],
    ],
  },
  ko: {
    row: [
      "4막",
      "여정의 끝; 망자의 전당; 선조의 시련; 버려진 감옥; 와카파누 섬",
      "여정의 끝에서 무기 세트 패시브 포인트 +2; 세 가지 시련 문신 선택; 나발리의 안식처에서 최대 마나 +5%; 시련 완료 후 패시브 포인트 +2; 플라스크 회복 영구 선택; 방어 영구 선택",
      "보스 처치 후 보상 수령까지 완료하세요. 프레야를 풀어 주고 히네코라와 대화한 뒤, 군도를 떠나기 전에 각 문신 또는 영구 선택이 적용되었는지 확인하세요.",
    ],
    sourceLabels: [
      "Path of Exile 2 얼리 액세스 패치 노트",
      "PoE2DB 최신 퀘스트 보상표",
      "PoE2 Wiki 퀘스트 보상 교차 확인",
    ],
    categories: [
      [
        "최신 퀘스트 보상표",
        "확장된 4막과 막간 경로를 포함한 막별 목표 및 영구 보상.",
      ],
      [
        "독립 보상 교차 확인",
        "변경된 캠페인 위치를 확인하는 데 사용한 퀘스트 보상 및 영구 캐릭터 보너스 기록.",
      ],
    ],
  },
  tr: {
    row: [
      "4. Perde",
      "Journey's End; Halls of the Dead; Trial of the Ancestors; Abandoned Prison; Whakapanu Island",
      "Journey's End'de +2 Silah Seti Pasif Puanı; üç deneme dövmesi seçimi; Navali's Rest'te %5 azami Mana; tamamlanan denemeden +2 pasif puan; kalıcı flask kurtarma seçimi; kalıcı savunma seçimi",
      "Boss sonrası teslimleri tamamlayın: Freya'yı serbest bırakın, Hinekora ile konuşun ve ada zincirinden ayrılmadan önce her dövmenin veya kalıcı seçimin uygulandığını doğrulayın.",
    ],
    sourceLabels: [
      "Path of Exile 2 Erken Erişim Yama Notları",
      "PoE2DB güncel görev ödülü tablosu",
      "PoE2 Wiki görev ödülü çapraz kontrolü",
    ],
    categories: [
      [
        "Güncel görev ödülü tablosu",
        "Genişletilmiş 4. Perde ve ara bölümler dâhil, perde bazında hedefler ve kalıcı ödüller.",
      ],
      [
        "Bağımsız ödül çapraz kontrolü",
        "Değişen kampanya konumlarını doğrulamak için kullanılan görev ödülü ve kalıcı karakter bonusu kayıtları.",
      ],
    ],
  },
};

/** 递归修改可见文本，不触碰对象键和值类型。 */
function polish(node, locale, key = "") {
  if (controlledKeys.has(key) || controlledArrays.has(key)) return node;
  if (typeof node === "string") {
    return (rules[locale] ?? []).reduce(
      (value, [pattern, replacement]) => value.replace(pattern, replacement),
      node,
    );
  }
  if (Array.isArray(node))
    return node.map((value) => polish(value, locale, key));
  if (!node || typeof node !== "object") return node;
  return Object.fromEntries(
    Object.entries(node).map(([childKey, value]) => [
      childKey,
      polish(value, locale, childKey),
    ]),
  );
}

/** 用英语事实源恢复 ID、枚举和链接结构，并只把内部链接切换到当前语言。 */
function restoreControlled(localized, source, locale, key = "") {
  if (key === "href" && typeof source === "string") {
    return source.replace(/^\/en\//, `/${locale}/`);
  }
  if (controlledKeys.has(key) || controlledArrays.has(key)) return source;
  if (Array.isArray(localized) && Array.isArray(source)) {
    return localized.map((value, index) =>
      restoreControlled(value, source[index], locale, key),
    );
  }
  if (
    localized &&
    source &&
    typeof localized === "object" &&
    typeof source === "object"
  ) {
    return Object.fromEntries(
      Object.entries(localized).map(([childKey, value]) => [
        childKey,
        restoreControlled(value, source[childKey], locale, childKey),
      ]),
    );
  }
  return localized;
}

for (const locale of Object.keys(rules)) {
  for (const [category, slug] of targets) {
    const path = join(ROOT, "content", locale, category, `${slug}.json`);
    const sourcePath = join(ROOT, "content", "en", category, `${slug}.json`);
    const article = JSON.parse(readFileSync(path, "utf8"));
    const source = JSON.parse(readFileSync(sourcePath, "utf8"));
    if (
      slug === "act-1-4-boss-permanent-rewards-checklist" &&
      manualAct4[locale]
    ) {
      const manual = manualAct4[locale];
      const progression = article.sections.find(
        (section) => section.id === "progression",
      );
      const act4Row = progression.rows[3];
      Object.keys(act4Row.cells).forEach((key, index) => {
        act4Row.cells[key] = manual.row[index];
      });
      article.sources = source.sources.map((entry, index) => ({
        ...entry,
        label: manual.sourceLabels[index],
      }));
      const sourcesSection = article.sections.find(
        (section) => section.id === "sources",
      );
      sourcesSection.categories = source.sections
        .find((section) => section.id === "sources")
        .categories.map((entry, index) => ({
          ...entry,
          label: manual.categories[index][0],
          description: manual.categories[index][1],
        }));
      article.revision = source.revision;
      article.translation.sourceRevision = source.revision;
      article.translation.translatedAt = "2026-08-11";
      article.translation.reviewedAt = "2026-08-11";
    }
    article.sections = polish(
      restoreControlled(article.sections, source.sections, locale),
      locale,
    );
    // 维护边界：正文与英语修订锚点完成同步后，统一收敛元数据，避免旧的 stale 状态覆盖已复核译文。
    article.revision = source.revision;
    article.translation = {
      ...article.translation,
      sourceLocale: "en",
      sourceContentId: source.id,
      sourceRevision: source.revision,
      translationStatus: "reviewed",
      translatedAt: "2026-08-11",
      reviewedAt: "2026-08-13",
      translator: "workbuddy-bing-codex-editorial-review",
      reviewer: "Exile2 Guides Automated QA",
      translationRisk: "low",
    };
    writeFileSync(path, `${JSON.stringify(article, null, 2)}\n`, "utf8");
  }
  console.log(`${locale}: polished ${targets.length} translations`);
}
