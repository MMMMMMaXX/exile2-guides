/** 文件职责：维护第一批 15 篇攻略的韩语审校译文，不包含稳定标识与事实源 URL。 */
export const locale = "ko";
export const translator = "codex-gpt5-local-review";

export const ui = {
  sectionTitles: {
    overview: "개요",
    "pros-cons": "장점과 단점",
    leveling: "레벨링과 전환",
    mapping: "맵핑 운영",
    bossing: "보스전 운영",
    mechanics: "핵심 메커니즘",
    supports: "보조 젬 우선순위",
    "build-use-cases": "빌드 활용",
    properties: "속성",
    alternatives: "대체 장비와 강화",
    "common-mistakes": "자주 하는 실수",
    "quick-answer": "빠른 답변",
    "progression-steps": "권장 진행 순서",
    decisions: "선택 기준",
    strategy: "안전한 공략법",
    "build-considerations": "빌드 준비",
    faq: "자주 묻는 질문",
    sources: "출처와 검증",
  },
  sourceLabel: "현재 자료와 교차 검증",
  sourceDescription:
    "공식 패치 노트, 최신 데이터베이스, 표기된 커뮤니티 자료를 서로 대조해 사실을 확인했습니다.",
  verificationNote:
    "메커니즘과 패치 범위는 공식 자료, 최신 데이터베이스, 커뮤니티 가이드로 검증했습니다. 직접 PC 테스트 여부는 별도로 기록하며, 미실시 검증을 완료했다고 표현하지 않습니다.",
};

export const articles = {
  "big-monkee-spirit-walker": {
    meta: {
      title: "Big Monkee Spirit Walker: Tame Beast부터 엔드게임까지",
      shortTitle: "Big Monkee Spirit Walker",
      summary:
        "Mighty Silverfist를 길들이고 Pounce, Maul, Pain Offering을 조합하는 동료 중심 Spirit Walker입니다. 저예산으로 캠페인부터 엔드게임까지 진행할 수 있습니다.",
      description:
        "PoE2 0.5 Big Monkee Spirit Walker 가이드. Twister 레벨링, Tame Beast 전환, 동료 스케일링, 방어와 운영법을 설명합니다.",
      imageAlt: "Big Monkee Spirit Walker 빌드의 Mighty Silverfist",
      seoTitle: "Big Monkee Spirit Walker 빌드 가이드 (PoE2 0.5)",
      seoDescription:
        "PoE2 0.5 Big Monkee Spirit Walker: Mighty Silverfist 길들이기, 육성, 장비, 맵핑과 보스 운영을 안내합니다.",
    },
    overview: [
      "주력 피해는 길들인 고유 야수가 담당하고 Huntress도 Pounce와 Maul로 직접 전투에 참여합니다. Mighty Silverfist는 기본 치명타가 높아 캠페인에서 가장 명확한 단일 대상 선택지입니다.",
      "Tame Beast는 시작부터 쓸 수 없습니다. Twister 등 안정적인 Huntress 스킬로 육성하고 패시브 초기화용 골드를 남긴 뒤, 동료 스킬과 패시브가 갖춰졌을 때 전환합니다.",
    ],
    keyPoints: [
      "3막에서 Mighty Silverfist를 길들입니다.",
      "강한 희귀 몬스터와 보스에게 Pain Offering을 유지합니다.",
      "Pounce와 Maul로 직접 피해와 생명력 흡수에 기여합니다.",
    ],
    pros: [
      "낮은 예산에서도 피해가 강합니다.",
      "야수를 얻은 뒤 SSF에 적합합니다.",
      "동료가 맵핑 압박을 줄여 줍니다.",
    ],
    cons: [
      "좋은 야수 옵션을 찾는 데 시간이 듭니다.",
      "패시브 전환에 골드가 필요합니다.",
      "좁은 지형에서는 동료 AI가 불안정할 수 있습니다.",
    ],
    leveling: [
      [
        "1~2막",
        "Twister와 Whirling Slash로 육성하며 생명력, 저항, 공격 추가 피해를 우선합니다.",
      ],
      [
        "3막 전환",
        "두 번째 Ascendancy 이정표 뒤 Mighty Silverfist를 길들이고 동료와 공유 피해 쪽으로 패시브를 옮깁니다.",
      ],
      [
        "초기 맵",
        "비싼 anointment나 고급 동료 장비보다 생명력, 마나 회복, 방어도를 먼저 안정화합니다.",
      ],
    ],
    mapping: [
      "Pounce로 무리에 진입하고 Maul로 직접 기여를 유지하며 야수가 마무리하게 합니다. 동료의 교전 범위를 벗어나지 말고 필요하면 다시 불러 위치를 조정합니다.",
    ],
    bossing: [
      "Pain Offering으로 시작해 동료를 보스에 붙이고 Pounce로 위험 지대를 넘습니다. Offering은 안전한 빈틈에만 갱신합니다.",
    ],
    faq: [
      [
        "Tame Beast로 언제 전환하나요?",
        "젬은 7티어부터 사용할 수 있지만 보통 두 번째 Ascendancy와 충분한 동료 패시브를 갖춘 뒤 전환하는 편이 안정적입니다.",
      ],
      [
        "Mighty Silverfist가 필수인가요?",
        "아닙니다. 다른 고유 야수도 가능하지만 캠페인 단일 대상에서는 가장 명확한 선택입니다.",
      ],
    ],
  },
  "grenade-gemling-legionnaire": {
    meta: {
      title: "Grenade Gemling Legionnaire: 레벨링·맵핑·보스 공략",
      shortTitle: "Grenade Gemling",
      summary:
        "Explosive Shot으로 일반 몬스터를 정리하고 여러 수류탄으로 폭발 피해를 집중하는 석궁 빌드입니다. Gemling 품질, Mirage Archer, 다층 방어를 활용합니다.",
      description:
        "PoE2 0.5 Grenade Gemling Legionnaire 가이드. 스킬 전환, Explosive·Cluster·Oil Grenade, 장비와 운영을 설명합니다.",
      imageAlt: "석궁과 수류탄을 사용하는 Gemling Legionnaire",
      seoTitle: "Grenade Gemling Legionnaire (PoE2 0.5)",
      seoDescription:
        "PoE2 0.5 Grenade Gemling 육성과 엔드게임: 품질, 방어, 맵핑 및 보스 운영을 안내합니다.",
    },
    overview: [
      "일반 정리는 Explosive Shot, 순간 피해는 Explosive Grenade와 Cluster Grenade가 담당합니다. Oil Grenade는 화염 피해를 높이고 Flash Grenade는 기절을 통한 방어 틈을 만듭니다.",
      "Gemling Legionnaire는 젬 레벨과 품질 효율이 높습니다. 캠페인에서는 시너지 없는 비싼 고유 장비보다 피해가 높은 석궁을 제때 교체하는 편이 중요합니다.",
    ],
    keyPoints: [
      "지역 수준에 맞춰 석궁 피해를 갱신합니다.",
      "Mirage Archer로 일부 수류탄 운용을 자동화합니다.",
      "고급 피해보다 생명력, 저항, 회피, deflection을 먼저 확보합니다.",
    ],
    pros: [
      "맵 정리가 빠르고 보스 순간 피해가 높습니다.",
      "캠페인 전환 경로가 명확합니다.",
      "방어도, 회피, 에너지 보호막을 함께 씁니다.",
    ],
    cons: [
      "폭발 효과가 시야를 가립니다.",
      "엔드게임 품질·회복 장비가 비쌉니다.",
      "도화선과 낙하지점을 익혀야 합니다.",
    ],
    leveling: [
      [
        "1막",
        "Permafrost Bolts와 Fragmentation Rounds를 사용하고 석궁을 자주 갱신합니다.",
      ],
      [
        "2막",
        "정리 스킬을 Explosive Shot으로 바꾸고 Explosive Grenade와 Flash Grenade를 추가합니다.",
      ],
      [
        "3막 이후",
        "Mirage Archer, 이후 Cluster Grenade를 추가하고 품질 이득이 실제로 커질 때 품질 Ascendancy를 선택합니다.",
      ],
    ],
    mapping: [
      "이동하며 Explosive Shot을 발사하고 단단한 무리에 Explosive Grenade를 던지며 나머지는 Mirage Archer에게 맡깁니다. 위험한 희귀 적에게 쓸 Flash Grenade를 남깁니다.",
    ],
    bossing: [
      "Oil Grenade를 깔고 Cluster와 Explosive Grenade를 투입한 뒤 Explosive Shot을 유지합니다. 페이즈 전환 직전에 모든 충전을 쓰지 않습니다.",
    ],
    faq: [
      [
        "석궁에서 가장 중요한 옵션은 무엇인가요?",
        "높은 무기 피해와 유효한 투사체 스킬 레벨을 우선합니다. 알맞은 희귀 석궁이 무관한 고유 장비보다 좋습니다.",
      ],
      [
        "Advanced Thaumaturgy는 언제 선택하나요?",
        "주요 수류탄 품질이 회복, 투사체, 피해에 실질적인 이득을 줄 때 선택합니다.",
      ],
    ],
  },
  "lightning-arrow-deadeye": {
    meta: {
      title: "Lightning Arrow Deadeye: 리그 스타트부터 엔드게임까지",
      shortTitle: "Lightning Arrow Deadeye",
      summary:
        "Lightning Arrow, Lightning Rod 폭발, Herald of Thunder, Deadeye Mirage를 활용하는 고속 활 빌드입니다. 비치명타에서 치명타로 단계적으로 전환합니다.",
      description:
        "PoE2 0.5 Lightning Arrow Deadeye 가이드. 육성, Lightning Rod 배치, Mirage Archer, 활 갱신과 방어를 설명합니다.",
      imageAlt: "빠른 번개 활로 공격하는 Deadeye",
      seoTitle: "Lightning Arrow Deadeye 가이드 (PoE2 0.5)",
      seoDescription:
        "PoE2 0.5 Lightning Arrow Deadeye: 육성, Lightning Rod, 활 업그레이드, 맵핑과 pinnacle 보스 구성을 안내합니다.",
    },
    overview: [
      "Lightning Arrow는 무리를 빠르게 정리하고 Lightning Rod는 연속 화살을 보스 집중 피해로 바꿉니다. Herald of Thunder와 Mirage가 범위를 넓혀도 올바른 Rod 배치를 대신하지는 못합니다.",
      "초반에는 강한 물리 활과 비치명타 버전을 사용하고 명중, 치명타 확률, 방어가 안정된 뒤 치명타로 전환합니다.",
    ],
    keyPoints: [
      "일반 맵은 Lightning Arrow만으로 충분한 경우가 많습니다.",
      "보스를 공격하기 전에 Lightning Rod를 여러 개 배치합니다.",
      "보조 도구보다 Lightning Rod 품질을 먼저 올립니다.",
    ],
    pros: [
      "최상급 맵 정리 속도.",
      "캠페인 진행이 부드럽습니다.",
      "pinnacle 콘텐츠까지 확장됩니다.",
    ],
    cons: [
      "초반 방어가 약합니다.",
      "보스 피해에는 조합 준비가 필요합니다.",
      "후반 활과 치명타 장비가 비쌉니다.",
    ],
    leveling: [
      [
        "캠페인",
        "Lightning Arrow와 Lightning Rod로 육성하고 물리 활이 지역 수준에 뒤처지면 교체합니다.",
      ],
      [
        "초기 맵",
        "비치명타 패시브를 사용하고 저항 상한과 회피를 안정화합니다.",
      ],
      [
        "치명타 전환",
        "명중, 활 피해, 치명타, 방어가 모두 준비되고 새 구성이 실제로 강할 때만 바꿉니다.",
      ],
    ],
    mapping: [
      "일반 무리에는 Lightning Arrow를 사용합니다. 단단한 희귀 적 아래 Lightning Rod를 놓고 연쇄와 폭발이 겹치도록 계속 발사합니다.",
    ],
    bossing: [
      "Lightning Rod를 여러 개 준비하고 구성에 따라 Tornado Shot을 더한 뒤 Lightning Arrow를 연속 사용합니다. pinnacle에서는 필요 시 범위 보조를 집중 피해로 교체합니다.",
    ],
    faq: [
      [
        "0.5에서도 Lightning Rod가 필요한가요?",
        "필요합니다. 조정 이후에도 단일 대상 피해의 핵심 구성 요소입니다.",
      ],
      [
        "처음부터 치명타로 시작해도 되나요?",
        "권장하지 않습니다. 명중, 장비, 방어가 갖춰지기 전에는 비치명타가 더 안정적입니다.",
      ],
    ],
  },
  tornado: {
    meta: {
      title: "Tornado: 원소 지면 흡수·상한·지속 피해",
      shortTitle: "Tornado",
      summary:
        "Tornado는 적을 끌어당기는 물리 지속 피해 폭풍을 만들고 원소 지면을 흡수해 해당 원소 피해를 추가합니다.",
      description:
        "PoE2 Tornado 가이드. 8초 지속, 폭풍 상한, 원소 지면 흡수, 스케일링, 보조 젬과 빌드 활용을 설명합니다.",
      imageAlt: "Acolyte of Chayula 빌드가 만든 Tornado 폭풍",
      seoTitle: "Tornado와 원소 지면 흡수 가이드 (PoE2 0.5)",
      seoDescription:
        "PoE2 0.5 Tornado: 물리 지속 피해, 원소 지면, 지속시간, 상한, 보조 젬과 빌드 활용을 안내합니다.",
    },
    overview: [
      "Tornado는 주변 적을 끌어당기며 물리 지속 피해를 주는 폭풍을 생성합니다. 원소 지면과 겹치면 그 디버프를 흡수하고 해당 원소의 추가 피해를 얻습니다.",
      "기본 지속시간은 8초, 기본 상한은 1개이며 품질로 지속시간과 동시 존재 수를 늘릴 수 있습니다.",
    ],
    keyPoints: [
      "Spell Damage가 지속 피해 디버프에 적용됩니다.",
      "폭풍 반경은 3미터입니다.",
      "원소형은 알맞은 지면 흡수에 크게 의존합니다.",
    ],
    mechanics: [
      "Tornado의 핵심은 연속 적중이 아니라 지속 피해입니다. 원소 지면이 적용 디버프와 추가 피해 유형을 바꿉니다.",
      "상한을 올리면 여러 폭풍이 존재하고 지속시간이 유효 범위를 결정합니다. 투사체 공격인 Tornado Shot과 혼동하지 마세요.",
    ],
    mechanicBullets: [
      "기본 지속시간: 8초.",
      "기본 상한: Tornado 1개.",
      "품질로 지속시간과 상한 증가 가능.",
    ],
    supports: [
      [
        "Prolonged Duration",
        "유효 시간을 늘리고 재사용 빈도를 낮춥니다.",
        "core",
      ],
      ["Magnified Area", "끌어당김과 맵핑 범위를 넓힙니다.", "situational"],
      ["Physical Mastery", "물리 스킬 레벨을 올립니다.", "core"],
    ],
    buildUse: [
      "Archon 트리거 연계, 물리 지속 피해 빌드, 폭풍 아래 원소 지면을 안정적으로 만드는 조합에 적합합니다.",
    ],
    mistakes: [
      "적중 피해만 올리지 마세요. 근처에 지면이 있다는 이유로 흡수됐다고 가정하지 말고 Tornado와 실제로 겹치는지 확인합니다.",
    ],
    faq: [
      [
        "여러 원소를 흡수할 수 있나요?",
        "흡수한 원소 지면에 맞는 추가 피해를 얻을 수 있습니다. 빌드에서 각 중첩과 지속을 보장해야 합니다.",
      ],
      [
        "Tornado와 Tornado Shot은 같은가요?",
        "아닙니다. Tornado는 지속 피해 Spell이고 Tornado Shot은 별도 투사체 Attack입니다.",
      ],
    ],
  },
  "ball-lightning": {
    meta: {
      title: "Ball Lightning: 방전 주기·Fire Infusion·Shock",
      shortTitle: "Ball Lightning",
      summary:
        "Ball Lightning은 본체가 적중하지 않는 느린 투사체를 발사하고 주변 대상에 0.2초마다 번개를 방전합니다.",
      description:
        "PoE2 Ball Lightning 가이드. 방전 주기, Shock, 투사체 속도, Fire Infusion, 불타는 지면, 보조 젬과 Blood Mage를 설명합니다.",
      imageAlt: "Ball Lightning을 시전하는 Blood Mage",
      seoTitle: "Ball Lightning과 Infusion 가이드 (PoE2 0.5)",
      seoDescription:
        "PoE2 0.5 Ball Lightning: 0.2초 방전, Shock, Fire Infusion, 투사체 속도, 보조 젬과 빌드를 안내합니다.",
    },
    overview: [
      "Ball Lightning은 느린 구체를 적 사이로 이동시킵니다. 구체 자체는 적중하지 않고 같은 대상에 0.2초마다 번개를 반복 방출합니다.",
      "Fire Infusion을 소모하면 구체가 느려지고 불타는 지면을 남기며 사라질 때 화염 폭발을 일으킵니다.",
    ],
    keyPoints: [
      "투사체 본체는 적중하지 않습니다.",
      "대상 탐색 반경은 1.8미터입니다.",
      "매우 높은 Shock 확률을 가집니다.",
    ],
    mechanics: [
      "속도가 느릴수록 보스 근처에 오래 남고 너무 빠르면 방전 횟수가 줄 수 있습니다. 범위와 위치가 대상을 방전 반경 안에 두는 시간을 결정합니다.",
      "Fire Infusion은 불타는 지면과 화염 폭발이라는 별도 계열이므로 의도적으로 스케일링해야 합니다.",
    ],
    mechanicBullets: [
      "같은 대상 방전 간격: 0.2초.",
      "대상 반경: 1.8미터.",
      "기본 치명타 확률: 9%.",
    ],
    supports: [
      [
        "Considered Casting",
        "시전 속도 손실을 감수할 수 있는 self-cast에 적합합니다.",
        "situational",
      ],
      ["Magnified Area", "맵핑 위치 선정 부담을 줄입니다.", "situational"],
      [
        "Lightning Mastery",
        "호환되는 번개 빌드에서 스킬 레벨을 올립니다.",
        "core",
      ],
    ],
    buildUse: [
      "Ballcano Blood Mage는 Ball Lightning으로 맵을 정리하고 Shock을 만든 뒤 Volcano 등으로 보스 피해를 집중합니다.",
    ],
    mistakes: [
      "구체 접촉으로 피해를 판단하지 마세요. 본체는 적중하지 않습니다. 충분히 방전하기 전에 대상을 지나칠 만큼 속도를 높이지 않습니다.",
    ],
    faq: [
      [
        "구체가 적을 통과하면 적중하나요?",
        "아닙니다. 피해는 반복 방출되는 번개에서 나옵니다.",
      ],
      [
        "Fire Infusion을 왜 사용하나요?",
        "불타는 지면과 마지막 폭발을 더해 Infusion을 안정적으로 생성하고 강화하는 혼합 빌드에 유용합니다.",
      ],
    ],
  },
  "gas-grenade": {
    meta: {
      title: "Gas Grenade: 독 구름·폭발·재사용 대기시간",
      shortTitle: "Gas Grenade",
      summary:
        "Gas Grenade는 커지는 독 구름을 만들며 연소나 Detonator 스킬로 화염 폭발을 일으킵니다. 동시에 최대 6개 구름을 유지합니다.",
      description:
        "PoE2 Gas Grenade 가이드. 구름 상한, Poison, 화염 폭발, 회복, 보조 젬과 Pathfinder 운영을 설명합니다.",
      imageAlt: "Gas Grenade를 던지는 Pathfinder",
      seoTitle: "Gas Grenade 독 구름·폭발 가이드 (PoE2 0.5)",
      seoDescription:
        "PoE2 0.5 Gas Grenade: 6개 구름 상한, 화염 폭발, 회복, 품질, 보조 젬과 빌드를 안내합니다.",
    },
    overview: [
      "Gas Grenade는 튕긴 뒤 도화선이 끝나면 가스를 방출합니다. 구름은 일반 적중은 아니지만 적중처럼 Poison을 부여하며 커지고, 연소나 호환 Detonator로 화염 폭발을 일으킵니다.",
      "여러 재사용 충전을 저장하고 최대 6개의 구름을 유지하므로 중첩, 지속시간, 충전 회복이 운영의 핵심입니다.",
    ],
    keyPoints: [
      "독 구름은 최대 6개입니다.",
      "연소나 Detonator가 구름을 폭발시킵니다.",
      "품질로 충전 회복과 화염 피해가 좋아집니다.",
    ],
    mechanics: [
      "독 구름과 화염 폭발은 다르게 스케일링됩니다. 독 계열은 Chaos, Poison 효과, 지속시간을 보고 폭발 계열은 안정적인 연소나 Detonator가 필요합니다.",
      "0.3 이후에는 수류탄 도화선을 엄격히 따르므로 이동 대상을 예측해 던져야 합니다.",
    ],
    mechanicBullets: [
      "재사용 충전 3회 저장.",
      "구름은 현재 최대 크기까지 확장됩니다.",
      "일반 적중은 아니지만 적중처럼 Poison을 부여합니다.",
    ],
    supports: [
      ["Second Wind", "순간 피해 구간의 충전 여유를 늘립니다.", "core"],
      ["Persistent Ground", "독 구름 유효 시간을 연장합니다.", "situational"],
      ["Fire Mastery", "화염 폭발 계열을 지원합니다.", "situational"],
    ],
    buildUse: [
      "Pathfinder는 보스가 등장하기 전에 구름을 깔고 Wither와 Despair를 쌓은 뒤 Poison을 유지하거나 폭발시켜 화염 피해를 냅니다.",
    ],
    mistakes: [
      "주 계열을 정하지 않고 독과 화염을 함께 올리지 마세요. 6개 상한을 기억하고 보스를 지정할 수 있기 전에 모든 충전을 쓰지 않습니다.",
    ],
    faq: [
      [
        "구름이 적중하지 않고도 Poison을 주나요?",
        "그렇습니다. 일반 적중은 아니지만 적중한 것처럼 Poison을 부여합니다.",
      ],
      [
        "무엇이 구름을 폭발시키나요?",
        "연소 효과와 호환되는 Detonator 스킬이 화염 폭발을 일으킵니다.",
      ],
    ],
  },
  "lightning-spear": {
    meta: {
      title: "Lightning Spear: Frenzy Charge 분열·번개탄·Shock",
      shortTitle: "Lightning Spear",
      summary:
        "Lightning Spear는 적중 시 번개탄 5개를 방출하며 Frenzy Charge가 있으면 1개를 소모해 주 창을 3개 대상으로 분열합니다.",
      description:
        "PoE2 Lightning Spear 가이드. 번개 전환, Frenzy Charge 분열, 보조 투사체, Shock, 품질과 Amazon 활용을 설명합니다.",
      imageAlt: "Lightning Spear를 던지는 Amazon",
      seoTitle: "Lightning Spear 분열 메커니즘 가이드 (PoE2 0.5)",
      seoDescription:
        "PoE2 0.5 Lightning Spear: 피해 전환, 번개탄 5개, Frenzy Charge 분열, Shock, 품질과 빌드를 안내합니다.",
    },
    overview: [
      "Lightning Spear는 창을 던져 적중 시 주변 적에게 보조 번개탄 5개를 방출합니다. Frenzy Charge가 있으면 하나를 소모해 주 창을 3개 대상으로 나누고 각 창이 폭발을 만듭니다.",
      "주 창은 물리 피해 대부분을 번개로 전환하고 보조 투사체는 전부 번개로 전환하며 더 높은 Shock 성능을 가집니다.",
    ],
    keyPoints: [
      "주 창: 물리 피해 80%를 번개로 전환.",
      "보조 번개탄: 100% 전환, 5개 고정.",
      "Frenzy Charge를 소모해 3개 대상으로 분열.",
    ],
    mechanics: [
      "추가 투사체는 보조 번개탄 상한에 적용되며 일반 방식으로 주 창을 늘리지 않습니다. 주 창은 pierce, fork, chain, return할 수 없습니다.",
      "지속 피해는 Frenzy Charge 생성에 의존합니다. 공급이 불안정하면 범위와 다중 폭발이 모두 줄어듭니다.",
    ],
    mechanicBullets: [
      "공격 속도: 기본의 60%.",
      "번개탄은 5미터 안에서 대상을 찾습니다.",
      "품질로 번개탄과 Charge 효과 두 배 확률을 얻습니다.",
    ],
    supports: [
      ["Lightning Mastery", "호환 시 번개 스킬 레벨을 올립니다.", "core"],
      ["Rapid Attacks", "낮은 기본 공격 속도를 보완합니다.", "core"],
      ["Magnified Area", "맵핑 폭발 범위를 넓힙니다.", "situational"],
    ],
    buildUse: [
      "Amazon은 명중, 치명타, Frenzy Charge 생성을 조합해 맵핑 중 창을 안정적으로 분열시키고 단일 대상용 운영도 따로 둡니다.",
    ],
    mistakes: [
      "일반 추가 투사체 옵션이 주 창을 늘린다고 생각하지 마세요. Frenzy Charge 공급과 공격 속도를 먼저 해결합니다.",
    ],
    faq: [
      [
        "Frenzy Charge는 무엇을 하나요?",
        "주 창을 3개 대상으로 분열시키며 각 분열 창이 번개탄 폭발을 만듭니다.",
      ],
      [
        "주 창은 pierce나 chain이 가능한가요?",
        "아닙니다. 고유 분열 규칙을 따르며 pierce, fork, chain, return할 수 없습니다.",
      ],
    ],
  },
  "adonias-ego": {
    meta: {
      title: "Adonia's Ego: Power Charge 준비와 무기 전환",
      shortTitle: "Adonia's Ego",
      summary:
        "Adonia's Ego는 Infusion과 무기 전환으로 고급 Spell 빌드의 Power Charge를 준비하는 고유 Siphoning Wand입니다.",
      description:
        "PoE2 Adonia's Ego 가이드. Power Charge, 무기 세트, 자주 발생하는 문제와 Stormweaver 활용을 설명합니다.",
      seoTitle: "Adonia's Ego Power Charge·무기 전환 가이드",
      seoDescription:
        "PoE2 0.5 Adonia's Ego: Infusion 준비, 무기 전환, Power Charge, 흔한 실수와 Stormweaver 활용을 안내합니다.",
    },
    overview: [
      "Adonia's Ego는 Infusion을 능동적으로 생성하고 소모해 Power Charge를 준비합니다. 주력 무기를 방해하지 않도록 보통 별도 무기 세트에 둡니다.",
      "수동으로 Charge를 주는 장비가 아닙니다. 스킬과 무기 세트를 올바르게 설정하고 맵 시작 또는 보스 전에 절차를 실행합니다.",
    ],
    keyPoints: [
      "준비 절차는 별도 무기 세트에서 진행합니다.",
      "Infusion 스킬을 올바른 세트에서 활성화합니다.",
      "주력 세트에는 더 강한 희귀 Wand나 핵심 장비를 사용할 수 있습니다.",
    ],
    properties: [
      [
        "베이스",
        "Siphoning Wand",
        "Infusion과 Power Charge 절차용 고유 Wand입니다.",
      ],
      [
        "주요 용도",
        "Power Charge 준비",
        "준비를 지원하지만 피해 운영 자체를 대체하지 않습니다.",
      ],
      [
        "주요 위험",
        "무기 세트 설정",
        "잘못 설정하면 장비가 작동하지 않는 것처럼 보입니다.",
      ],
    ],
    buildUse: [
      "Adonia's Trifusion Stormweaver 같은 구성은 보조 세트에서 Infusion과 Charge를 만든 뒤 주력 세트로 돌아갑니다.",
    ],
    alternatives: [
      "Charge 절차가 필요 없다면 희귀 Wand와 Focus가 더 강한 경우가 많습니다. Charge 소모법이 명시된 빌드에서만 구매하세요.",
    ],
    mistakes: [
      "스킬이 잘못된 무기 세트에서 켜져 있거나 필요한 Infusion을 먼저 만들지 않은 경우가 많습니다. 세트 간 고유 Rune 충돌도 절차를 비활성화할 수 있습니다.",
    ],
    faq: [
      [
        "주력 피해 무기로 써야 하나요?",
        "보통 아닙니다. 많은 0.5 구성은 보조 세트에 두고 더 강한 Wand 또는 Wand와 Focus로 공격합니다.",
      ],
      [
        "Charge를 얻지 못하는 이유는 무엇인가요?",
        "Infusion 공급원, 무기 세트별 스킬 활성화, 고유 Rune 충돌을 확인하세요.",
      ],
    ],
  },
  "sire-of-shards": {
    meta: {
      title: "Sire of Shards: 원형 투사체·Spell 강화·빌드 활용",
      shortTitle: "Sire of Shards",
      summary:
        "Sire of Shards는 Sigil of Power, Spell Damage, Cast Speed를 제공하고 Spell에 원형 추가 투사체 4개를 부여하는 고유 Chiming Staff입니다.",
      description:
        "PoE2 Sire of Shards 가이드. 옵션, 원형 투사체, Sigil of Power, Ball Lightning, 장단점과 대체 장비를 설명합니다.",
      seoTitle: "Sire of Shards 원형 투사체 가이드 (PoE2 0.5)",
      seoDescription:
        "PoE2 0.5 Sire of Shards: 원형 +4 투사체, Spell Damage, Cast Speed, Sigil of Power와 대체 장비를 안내합니다.",
    },
    overview: [
      "Sire of Shards는 호환되는 Spell이 원형으로 투사체 4개를 추가 발사하게 합니다. 레벨 10 Sigil of Power, Spell Damage, Cast Speed, 소량의 원소 저항도 제공합니다.",
      "원형 패턴은 맵 정리 범위가 넓지만 단일 대상 집중 피해를 낮출 수 있습니다. 표시 피해뿐 아니라 스킬 궤적을 평가해야 합니다.",
    ],
    keyPoints: [
      "Spell이 투사체를 4개 추가 발사합니다.",
      "투사체가 원형으로 발사됩니다.",
      "레벨 10 Sigil of Power를 제공합니다.",
    ],
    properties: [
      ["Spell Damage", "80~120% 증가", "범위가 넓은 전역 옵션입니다."],
      ["Cast Speed", "10~20% 증가", "self-cast 조작감을 개선합니다."],
      ["투사체", "원형 +4", "맵핑 범위와 보스 위치 선정을 모두 바꿉니다."],
      ["요구 레벨", "25", "현재 베이스 요구치입니다."],
    ],
    buildUse: [
      "Ball Lightning 같은 Spell은 원형 분산으로 무리를 덮거나 큰 대상 가까이서 투사체를 겹칠 수 있습니다. Ballcano Blood Mage의 전환 또는 핵심 무기로 쓸 수 있습니다.",
    ],
    alternatives: [
      "집중 보스 피해, 방어, 치명타가 더 중요하면 희귀 Staff, Wand와 Focus, 다른 전용 고유 장비가 더 강할 수 있습니다.",
    ],
    mistakes: [
      "추가 4개가 보스 피해 5배를 보장하지 않습니다. 원형 궤적에 따라 실제로 대상을 통과하는 수가 결정됩니다.",
    ],
    faq: [
      [
        "모든 Spell이 투사체 4개를 얻나요?",
        "호환되는 투사체 Spell만 적용됩니다. 비투사체 Spell은 원형 발사를 얻지 못합니다.",
      ],
      [
        "Spell Damage 최고 수치가 항상 좋나요?",
        "중요하지만 Cast Speed와 원형 패턴 호환성이 작은 피해 차이보다 중요할 수 있습니다.",
      ],
    ],
  },
  "crown-of-the-pale-king": {
    meta: {
      title: "Crown of the Pale King: Thorns 반격·옵션·Runemaster 강화",
      shortTitle: "Crown of the Pale King",
      summary:
        "물리 Thorns를 추가하고 모든 Hit에 Thorns로 반격할 수 있게 하는 저레벨 고유 Cultist Crown입니다.",
      description:
        "PoE2 Crown of the Pale King 가이드. Thorns, 방어도, 에너지 보호막, 생명력, Runemaster 강화와 Warbringer를 설명합니다.",
      seoTitle: "Crown of the Pale King Thorns 가이드 (PoE2 0.5)",
      seoDescription:
        "PoE2 0.5 Crown of the Pale King: 모든 Hit 반격, 생명력, 방어, 강화 방법과 빌드를 안내합니다.",
    },
    overview: [
      "Crown of the Pale King는 물리 Thorns를 추가하고 모든 Hit에 Thorns 반격을 허용해 초반 반격 빌드를 가능하게 합니다.",
      "방어도, 에너지 보호막, 최대 생명력, 아이템 희귀도도 제공합니다. 요구치가 낮고 나중에 Runemastered Cultist Crown으로 강화할 수 있습니다.",
    ],
    keyPoints: [
      "Thorns가 모든 Hit에 반격합니다.",
      "물리 Thorns 피해를 추가합니다.",
      "Runemastered Cultist Crown으로 강화할 수 있습니다.",
    ],
    properties: [
      [
        "방어",
        "방어도와 에너지 보호막 50~100% 증가",
        "범위가 넓은 지역 옵션입니다.",
      ],
      ["최대 생명력", "+40~80", "초반에 유용한 생존 옵션입니다."],
      ["Thorns", "물리 10~15에서 20~25", "현재 명시된 반격 수치입니다."],
      ["고유 효과", "모든 Hit에 반격", "Thorns 빌드의 핵심 옵션입니다."],
    ],
    buildUse: [
      "Thorns Warbringer는 피격으로 꾸준히 반격하고 Thorns, armor break, 생존력을 올려 피해를 유발하는 Hit를 버팁니다.",
    ],
    alternatives: [
      "발동 조건을 이미 해결했거나 훨씬 높은 방어도, 생명력, 저항, 특정 corruption이 필요하면 방어형 희귀 Helmet이 낫습니다.",
    ],
    mistakes: [
      "Helmet이 있어도 방어를 무시할 수 없습니다. Thorns는 Hit를 살아남아야 작동하며 위험한 보스 강타는 계속 피해야 합니다.",
    ],
    faq: [
      [
        "모든 Hit에서 Thorns가 발동하나요?",
        "핵심 옵션이 모든 Hit 반격을 허용하지만 캐릭터는 그 피해를 받고 살아남아야 합니다.",
      ],
      [
        "강화할 수 있나요?",
        "가능합니다. 현재 Runeforging 시스템에 Runemastered Cultist Crown 조합법이 있습니다.",
      ],
    ],
  },
  "best-atlas-tree-0-5": {
    meta: {
      title: "PoE2 0.5 추천 Atlas 트리: 첫 20·40·60포인트",
      shortTitle: "0.5 Atlas 트리",
      summary:
        "단계별 Atlas 계획입니다. 먼저 Waystone 유지와 안전한 진행을 확보한 뒤 Atlas Master와 하나의 수익 메커니즘에 특화합니다.",
      description:
        "PoE2 0.5 Atlas 트리 가이드. 20/40/60포인트, Waystone 유지, Atlas Master, 특화와 초기화를 설명합니다.",
      imageAlt: "Doryani와 PoE2 Atlas 화면",
      seoTitle: "PoE2 0.5 추천 Atlas 트리: 20/40/60포인트",
      seoDescription:
        "PoE2 0.5 Atlas 경로: 첫 20·40·60포인트, Waystone, Atlas Master, 수익 메커니즘과 초기화를 안내합니다.",
    },
    quickAnswers: [
      [
        "첫 우선순위",
        "전문 수익보다 Waystone 유지와 진행을 먼저 안정화합니다.",
      ],
      [
        "특화 시점",
        "맵과 방어가 안정되면 하나의 메커니즘을 골라 Atlas Master와 Tablet을 조합합니다.",
      ],
      [
        "초기화 시점",
        "빌드가 안전하게 완료하지 못하거나 비용이 기대 수익보다 크면 변경합니다.",
      ],
    ],
    overview: [
      "영구적으로 하나뿐인 최고의 Atlas는 없습니다. 첫 트리는 진입과 유지를 해결하고 수익 패시브는 목표 콘텐츠를 꾸준히 완료할 수 있을 때 구성합니다.",
      "20/40/60포인트를 점검 지점으로 삼고 완성 장비와 전체 해금을 전제로 한 엔드게임 트리를 그대로 복사하지 마세요.",
    ],
    keyPoints: [
      "유지를 먼저, 수익을 나중에.",
      "하나의 특화를 완성한 뒤 분산 투자합니다.",
      "Tablet과 맵 옵션이 전략을 지원해야 합니다.",
    ],
    steps: [
      [
        "첫 20포인트",
        "Waystone 유지, 맵 진행, 일반 맵 안정화 노드를 우선합니다.",
      ],
      [
        "약 40포인트",
        "주력 순환에 맞는 Atlas Master를 고르고 하나의 메커니즘 가지로 들어갑니다.",
      ],
      [
        "약 60포인트",
        "보상 군집을 완성하고 안전한 Quantity와 Rarity를 더하며 처리 불가능한 옵션을 피합니다.",
      ],
      [
        "60포인트 이후",
        "첫 전략이 안정되고 비용을 감당할 때만 보완 메커니즘을 추가합니다.",
      ],
    ],
    decisions: [
      "빠른 광역 빌드는 Breach나 Delirium, 튼튼하고 제어가 좋은 빌드는 Expedition과 위험한 Remnant에 맞습니다. SSF에서는 거래에서만 가치가 생기는 수익보다 확정 재료를 우선합니다.",
    ],
    mistakes: [
      "맵 진입 직후 고투자 수익 트리를 복사하지 말고, 네 메커니즘에 포인트를 고르게 나누지 말며, 기본 조우를 완료하기 전에 비싼 Tablet을 사지 않습니다.",
    ],
    faq: [
      [
        "Item Quantity를 바로 찍어야 하나요?",
        "아닙니다. Waystone 유지와 생존이 안정된 뒤에만 의미가 있습니다.",
      ],
      [
        "Atlas Master는 어떻게 고르나요?",
        "가장 안정적으로 완료하고 오래 반복하고 싶은 하나의 메커니즘을 강화하는 Master를 고릅니다.",
      ],
    ],
  },
  "currency-farming-strategies-0-5": {
    meta: {
      title: "PoE2 0.5 화폐 파밍: 예산·Atlas·위험별 전략",
      shortTitle: "0.5 화폐 파밍",
      summary:
        "금방 낡는 시간당 수익 수치보다 캐릭터 성능, 입장 비용, 환금성, 실패 위험을 기준으로 파밍 전략을 선택합니다.",
      description:
        "PoE2 0.5 화폐 가이드. Expedition, Runes of Aldur, Breach, Delirium, Ritual, 저예산 맵의 비용과 위험을 설명합니다.",
      imageAlt: "PoE2 화폐와 제작 재료",
      seoTitle: "PoE2 0.5 화폐 파밍: 예산별 추천 전략",
      seoDescription:
        "PoE2 0.5 수익 전략: Expedition, Rune, Breach, Delirium, Ritual과 Atlas 구성을 예산별로 안내합니다.",
    },
    quickAnswers: [
      [
        "저예산",
        "유지 노드가 있는 일반 맵을 돌고 환금성 높은 재료를 팔며 비싼 초대장은 사지 않습니다.",
      ],
      [
        "안정 전략",
        "Expedition과 Grand Expedition은 거래 가능한 결과가 분명하지만 Remnant 계획이 필요합니다.",
      ],
      [
        "고변동",
        "Ritual, Delirium 보스 러시, 비싼 Rune 도박에는 더 큰 자본과 위험 감수가 필요합니다.",
      ],
    ],
    overview: [
      "수익은 시장 가격에 따라 바뀝니다. 이 가이드는 전략 구조를 비교하며 시간당 고정 Divine Orb를 약속하지 않습니다.",
      "전략을 판단하기 전에 최소 20회 동안 비용, 완료 수, 환금 품목, 실패를 기록합니다.",
    ],
    keyPoints: [
      "이론 가치보다 환금성이 중요합니다.",
      "항상 완료하는 일반 전략이 자주 죽는 고난도 전략보다 낫습니다.",
      "표본을 시작하기 전에 투입 재료 가격을 계산합니다.",
    ],
    steps: [
      [
        "맵 안정화",
        "Waystone 유지와 저렴한 Tablet을 사용해 포털 낭비 없이 목표 티어를 완료할 때까지 진행합니다.",
      ],
      [
        "하나의 순환 선택",
        "빌드 장점과 현재 가격을 보고 Expedition, Rune, Breach, Delirium, Ritual 중 하나를 고릅니다.",
      ],
      [
        "20회 기록",
        "총비용, 직접 화폐, 환금 재료, 고가 아이템, 실패를 적습니다.",
      ],
      [
        "검증 후 확대",
        "미판매 재고를 빼도 수익이 양수일 때만 더 좋은 Tablet이나 초대장을 삽니다.",
      ],
    ],
    decisions: [
      "Expedition은 계획과 내구, Breach와 Delirium은 속도와 광역, Ritual은 좁은 공간 피해를 평가합니다. 비싼 Rune of Aldur의 기대값이 시장가보다 낮으면 그대로 팝니다.",
    ],
    mistakes: [
      "팔리지 않는 희귀 장비를 낙관적 가격으로 수익에 넣지 말고, 실패 맵을 무시하지 말며, 세 번의 행운만으로 전략을 바꾸지 않습니다. 비싼 제작 전 목표와 손절선을 정합니다.",
    ],
    faq: [
      [
        "가장 안전한 시작은 무엇인가요?",
        "검증되지 않은 빌드로 비싼 입장권을 사기 전에 유지 노드 일반 맵과 환금성 높은 드롭을 이용합니다.",
      ],
      [
        "수익을 언제 다시 계산하나요?",
        "패치, 인기 가이드, 시장 변화가 공급·수요·비용을 바꿀 때마다 계산합니다.",
      ],
    ],
  },
  "classes-ascendancies-guide": {
    meta: {
      title: "PoE2 클래스·Ascendancy 가이드: 0.5 플레이스타일별 선택",
      shortTitle: "클래스와 Ascendancy",
      summary:
        "근접, 원거리, Spell, Minion, 변신, 적은 버튼 등 원하는 조작에 현재 클래스를 맞추고 Tier List를 영구적인 답으로 보지 않는 가이드입니다.",
      description:
        "플레이스타일, 복잡도, 방어, SSF, 완전한 빌드 가이드 유무로 PoE2 0.5 클래스와 Ascendancy를 선택합니다.",
      imageAlt: "PoE2 클래스와 Ascendancy 선택을 보여 주는 전투 장면",
      seoTitle: "PoE2 0.5 클래스·Ascendancy 선택 가이드",
      seoDescription:
        "플레이스타일, 난도, 방어, SSF와 빌드에 따라 PoE2 0.5 클래스와 Ascendancy를 고르는 방법입니다.",
    },
    quickAnswers: [
      [
        "가장 쉬운 선택법",
        "먼저 원하는 전투 방식을 고른 뒤 완전한 육성 경로가 있는 최신 가이드를 찾습니다.",
      ],
      [
        "클래스 제한",
        "기본 클래스가 패시브 시작점과 Ascendancy를 정하지만 대부분 젬은 클래스 전용이 아닙니다.",
      ],
      [
        "바꿀 수 있나요?",
        "현재 규칙에 따라 Ascendancy는 조정할 수 있지만 기본 클래스를 다른 클래스로 바꿀 수는 없습니다.",
      ],
    ],
    overview: [
      "클래스 선택이 스킬을 영구히 잠그지는 않습니다. 패시브 시작 위치, 속성 접근성, 이용 가능한 Ascendancy를 결정합니다.",
      "첫 캐릭터는 이론상 S Tier보다 완전한 가이드가 중요합니다. 스킬 전환이 명확하고 흔한 장비와 이해하기 쉬운 방어를 가진 구성을 우선합니다.",
    ],
    keyPoints: [
      "Warrior: 방어도, 강타, 방패, Thorns.",
      "Ranger/Huntress: 활, 창, 기동성, 동료.",
      "Sorceress/Witch: Spell, Trigger, Minion, 생명력과 에너지 보호막.",
      "Mercenary/Monk: 석궁, 품질, quarterstaff, 빠른 전투.",
      "Druid: 변신, 식물, Attack/Spell 혼합.",
    ],
    steps: [
      [
        "전투 거리 선택",
        "근접, 원거리 Attack, Spell, Minion, 변신 중 고릅니다.",
      ],
      [
        "복잡도 선택",
        "적은 버튼, 콤보, Trigger, 자원 관리 중 계속 유지하고 싶은 방식을 정합니다.",
      ],
      [
        "진입 조건 확인",
        "첫 빌드는 희귀 고유 장비, 비싼 anointment, 숨겨진 Ascendancy에 의존하지 않아야 합니다.",
      ],
      [
        "연결 가이드 열기",
        "캠페인 스킬, 패시브 이정표, 장비 우선순위, 대체안을 확인합니다.",
      ],
    ],
    decisions: [
      "속도를 원하면 원거리 Deadeye, 내구를 원하면 방패나 방어도 Warrior가 후보입니다. Minion은 Infernalist와 Spirit Walker, Spell은 단순 self-cast와 고급 Trigger를 비교합니다.",
    ],
    mistakes: [
      "Tier List 문자만 보고 고르지 말고, 시연 장비를 시작 장비로 착각하지 말며, 핵심 메커니즘의 손맛을 확인하기 전에 Ascendancy를 확정하지 않습니다.",
    ],
    faq: [
      [
        "모든 클래스가 모든 스킬을 쓸 수 있나요?",
        "무기와 속성 조건을 맞추면 많은 스킬을 클래스 간 사용할 수 있지만 트리 위치와 Ascendancy가 큰 차이를 만듭니다.",
      ],
      [
        "초보자에게 가장 좋은 클래스는 무엇인가요?",
        "현재 지원되고 저렴하며 완전한 육성 경로가 있고 운영과 방어를 이해할 수 있는 클래스입니다.",
      ],
    ],
  },
  "act-1-4-boss-permanent-rewards-checklist": {
    meta: {
      title: "PoE2 1~4막 보스·영구 보상 체크리스트",
      shortTitle: "1~4막 보스 목록",
      summary:
        "1~4막의 메인 보스, 영구 보상을 주는 선택 보스, 놓치기 쉬운 퀘스트 아이템을 구분합니다.",
      description:
        "PoE2 1~4막 체크리스트. 보스 순서, 생명력, Spirit, 저항, 무기 세트 패시브와 놓친 보상 회수를 설명합니다.",
      imageAlt: "PoE2 캠페인 보스 목록을 나타내는 Count Geonor",
      seoTitle: "PoE2 1~4막 보스·영구 보상 체크리스트",
      seoDescription:
        "PoE2 1~4막 보스, 생명력, Spirit, 저항, 무기 세트 패시브와 선택 목표를 확인하세요.",
    },
    quickAnswers: [
      [
        "메인 보스",
        "메인 표식을 따릅니다. 이 전투가 다음 지역이나 막을 엽니다.",
      ],
      [
        "영구 보상",
        "막을 떠나기 전에 생명력, Spirit, 저항, 무기 세트 포인트를 주는 목표를 확인합니다.",
      ],
      [
        "놓친 보상",
        "Waypoint로 돌아가 목표를 끝내고 지시에 따라 아이템을 사용하거나 제출합니다.",
      ],
    ],
    overview: [
      "이 페이지는 보스 진행과 영구 보상 목록을 묶어 지금 필수인지, 우회할 가치가 있는지, 나중에 해도 되는지 판단하도록 돕습니다.",
      "보상 수치와 경로는 캠페인 조정으로 바뀔 수 있습니다. 공격은 개별 보스 페이지, 정확한 수치는 영구 보상 가이드를 확인하세요.",
    ],
    keyPoints: [
      "1막: Beira, Crowbell, King in the Mists, Candlemass.",
      "2막: Balbala가 첫 Trial을 열고 Kabala가 무기 세트 포인트를 줍니다.",
      "3막: Mighty Silverfist와 Ignagduk 등이 영구 강화를 줍니다.",
      "4막과 전환 장에서는 Spirit, 저항, 진행 보상이 추가됩니다.",
    ],
    steps: [
      [
        "새 막 진입",
        "체크리스트를 열고 현재 패치에서 확인된 보상만 표시합니다.",
      ],
      [
        "메인 진행",
        "먼저 메인 보스를 처치하고 Waypoint를 연 뒤 긴 우회를 판단합니다.",
      ],
      [
        "동선 보상 회수",
        "주 경로 근처이거나 현재 문제를 해결하는 영구 보상은 즉시 완료합니다.",
      ],
      [
        "맵 전 점검",
        "엔드게임 장비에 큰 투자를 하기 전에 놓친 영구 보상을 모두 회수합니다.",
      ],
    ],
    decisions: [
      "생존이 부족하면 저항이나 생명력, Aura·Minion·지속 스킬 빌드는 이른 Spirit를 우선합니다. 무기 세트 포인트는 실제로 두 전문 트리를 쓸 때 가장 가치가 높습니다.",
    ],
    mistakes: [
      "보스를 죽였다고 항상 보상이 자동 획득되지는 않습니다. 우클릭해 쓰는 드롭이나 NPC에게 제출할 퀘스트 아이템이 있습니다. 캠페인의 King in the Mists는 엔드게임 pinnacle 버전과 다릅니다.",
    ],
    faq: [
      [
        "놓친 영구 보상을 나중에 얻을 수 있나요?",
        "가능합니다. 해당 Waypoint로 돌아가 보스나 퀘스트를 완료하고 아이템을 사용하거나 제출해야 하는지 확인합니다.",
      ],
      [
        "선택 보스를 모두 즉시 잡아야 하나요?",
        "영구 능력치를 주는 보스는 대체로 가치가 있습니다. 일반 드롭만 주고 우회가 길다면 나중에 잡아도 됩니다.",
      ],
    ],
  },
  "the-executioner": {
    meta: {
      title: "The Executioner 공략: 강타·증원·Ogham Village 경로",
      shortTitle: "The Executioner",
      summary:
        "1막 Ogham Village 메인 보스입니다. 느리지만 강한 물리 강타, 붉은 직선 공격, 지속 증원이 정면 공격을 벌합니다.",
      description:
        "PoE2 The Executioner 가이드. 위치, 공격 전조, 증원, 안전한 위치, 화염 저항과 퀘스트 진행을 설명합니다.",
      seoTitle: "The Executioner 1막 보스 공략 (PoE2)",
      seoDescription:
        "PoE2 The Executioner 공략: Ogham Village 경로, 붉은 강타, 증원, 위치 선정, 준비와 퀘스트를 안내합니다.",
    },
    overview: [
      "The Executioner는 Ogham Village 끝의 메인 경로를 막습니다. 공격은 느리지만 정면 피해가 크고 증원을 방치하면 전장이 빠르게 복잡해집니다.",
      "중거리에서 원을 그리며 움직이고 차징을 보면 옆으로 회피하거나 등 뒤로 통과한 뒤 긴 후딜에만 공격하는 것이 안전합니다.",
    ],
    keyPoints: [
      "위치: Ogham Village 끝 Executioner's Block.",
      "주요 위협: 강한 물리 강타와 정면 휩쓸기.",
      "결과: The Trail of Corruption 진행.",
    ],
    strategy: [
      "무기를 들거나 붉게 빛나면 정면 선에서 벗어납니다. 멀면 옆으로 구르고 가까우면 뒤로 통과해 회복 동작 중 공격합니다.",
      "용병을 소환하면 원거리 적부터 제거하고 전장 바깥을 따라 움직입니다. 투사체와 불타는 지면이 겹칠 때 보스 피해를 욕심내지 않습니다.",
    ],
    strategyBullets: [
      "차징 중 정면에 서지 않습니다.",
      "증원을 정리한 뒤 보스로 돌아갑니다.",
      "붉은 직선 강타에 쓸 회피를 1회 남깁니다.",
    ],
    preparation: [
      "Ogham Village에 들어가기 전 주 스킬과 무기를 갱신합니다. 화염 저항은 지역과 불타는 지면을 줄이고 충분한 생명력과 기동성이 강한 물리 공격의 즉사를 막습니다.",
    ],
    faq: [
      [
        "The Executioner는 어디에 있나요?",
        "1막 Ogham Village 끝 Executioner's Block이며 보통 Waypoint 반대편입니다.",
      ],
      [
        "가장 먼저 피할 공격은 무엇인가요?",
        "붉게 빛나거나 무기를 든 강타입니다. 다음으로 넓은 휩쓸기 중 정면을 피합니다.",
      ],
      [
        "처치하면 무엇이 열리나요?",
        "The Trail of Corruption이 진행되고 Manor Ramparts로 가는 길이 열립니다.",
      ],
    ],
  },
};
