/** 文件职责：维护第一批 15 篇攻略的日语审校译文，不包含稳定标识与事实源 URL。 */
export const locale = "ja";
export const translator = "codex-gpt5-local-review";

export const ui = {
  sectionTitles: {
    overview: "概要",
    "pros-cons": "長所と短所",
    leveling: "レベリングと移行",
    mapping: "マップ周回のローテーション",
    bossing: "ボス戦のローテーション",
    mechanics: "主要メカニクス",
    supports: "サポートジェムの優先度",
    "build-use-cases": "ビルドでの用途",
    properties: "性能",
    alternatives: "代替装備と強化",
    "common-mistakes": "よくあるミス",
    "quick-answer": "要点",
    "progression-steps": "推奨進行ルート",
    decisions: "判断基準",
    strategy: "安全な攻略法",
    "build-considerations": "ビルドの準備",
    faq: "よくある質問",
    sources: "出典と検証",
  },
  sourceLabel: "最新情報とクロスチェック",
  sourceDescription:
    "記載内容は公式パッチノート、最新データベース、および掲載したコミュニティ資料を照合しています。",
  verificationNote:
    "メカニクスと対応パッチは公式情報、最新データベース、コミュニティガイドで検証しています。PCでの独自実機検証は別途記録し、未実施の検証を実施済みとは表現していません。",
};

export const articles = {
  "big-monkee-spirit-walker": {
    meta: {
      title: "Big Monkee Spirit Walker：Tame Beastからエンドゲームまで",
      shortTitle: "Big Monkee Spirit Walker",
      summary:
        "Mighty Silverfistをテイムし、Pounce、Maul、Pain Offeringを組み合わせるコンパニオン中心のSpirit Walker。低予算でキャンペーンからエンドゲームまで進めます。",
      description:
        "PoE2 0.5向けBig Monkee Spirit Walkerガイド。Twisterでの育成、Tame Beastへの移行、コンパニオン強化、防御、各種ローテーションを解説。",
      imageAlt: "Big Monkee Spirit Walkerで使用するMighty Silverfist",
      seoTitle: "Big Monkee Spirit Walkerビルドガイド（PoE2 0.5）",
      seoDescription:
        "PoE2 0.5のBig Monkee Spirit Walker。Mighty Silverfistのテイム、育成、装備、マップとボスのローテーションを解説。",
    },
    overview: [
      "メイン火力はテイムしたユニークビーストに任せ、Huntress自身もPounceとMaulで戦います。Mighty Silverfistは基礎クリティカルが高く、キャンペーン中の単体火力要員として分かりやすい選択肢です。",
      "Tame Beastは開始直後には使えません。Twisterなど安定したHuntressスキルで育成し、振り直し用のゴールドを残して、コンパニオン用スキルとパッシブが揃ってから移行します。",
    ],
    keyPoints: [
      "Act 3でMighty Silverfistをテイムする。",
      "耐久力の高いレア敵やボスにはPain Offeringを維持する。",
      "PounceとMaulで自身も火力とライフ吸収に貢献する。",
    ],
    pros: [
      "低予算でも高火力。",
      "ビースト入手後はSSFにも適する。",
      "コンパニオンがマップでの負担を軽減する。",
    ],
    cons: [
      "理想的なビーストModの厳選に時間がかかる。",
      "パッシブ移行にゴールドが必要。",
      "狭い場所ではAIが不安定になることがある。",
    ],
    leveling: [
      [
        "Act 1～2",
        "TwisterとWhirling Slashで育成し、ライフ、耐性、攻撃への追加ダメージを優先します。",
      ],
      [
        "Act 3で移行",
        "2回目のAscendancy到達後にMighty Silverfistをテイムし、コンパニオンと共有ダメージへパッシブを振り直します。",
      ],
      [
        "初期マップ",
        "高価なanointmentやコンパニオン装備より先に、ライフ、マナ回復、アーマーを安定させます。",
      ],
    ],
    mapping: [
      "Pounceで敵集団へ入り、Maulで自身の火力を保ちつつビーストに処理させます。コンパニオンの戦闘範囲から離れず、必要なら呼び戻して位置を調整します。",
    ],
    bossing: [
      "Pain Offeringで開始し、コンパニオンをボスに張り付かせます。危険な床はPounceで越え、Offeringの更新は安全な隙だけで行います。",
    ],
    faq: [
      [
        "Tame Beastへはいつ移行する？",
        "ジェムはTier 7で使えますが、通常は2回目のAscendancyと十分なコンパニオンパッシブが揃ってからの方が安定します。",
      ],
      [
        "Mighty Silverfistは必須？",
        "必須ではありません。他のユニークビーストも使えますが、キャンペーンでは単体火力が分かりやすい選択肢です。",
      ],
    ],
  },
  "grenade-gemling-legionnaire": {
    meta: {
      title: "Grenade Gemling Legionnaire：育成・マップ・ボス攻略",
      shortTitle: "Grenade Gemling",
      summary:
        "Explosive Shotで雑魚を処理し、複数のグレネードで瞬間火力を出すクロスボウビルド。Gemlingの品質、Mirage Archer、多層防御を活用します。",
      description:
        "PoE2 0.5向けGrenade Gemling Legionnaire。スキル移行、Explosive・Cluster・Oil Grenade、装備、ローテーションを解説。",
      imageAlt: "クロスボウとグレネードを使うGemling Legionnaire",
      seoTitle: "Grenade Gemling Legionnaire（PoE2 0.5）",
      seoDescription:
        "PoE2 0.5のGrenade Gemling育成・エンドゲームガイド。品質、防御、マップとボスのローテーションを解説。",
    },
    overview: [
      "通常の殲滅はExplosive Shot、瞬間火力はExplosive GrenadeとCluster Grenadeが担当します。Oil Grenadeは火ダメージを伸ばし、Flash Grenadeはスタンによる防御の隙を作ります。",
      "Gemling Legionnaireはジェムレベルと品質の恩恵が大きいクラスです。キャンペーンでは、相性のない高価なユニークより、ダメージの高いクロスボウを適宜更新する方が重要です。",
    ],
    keyPoints: [
      "エリア進行に合わせてクロスボウ火力を更新する。",
      "Mirage Archerで一部のグレネードを自動化する。",
      "高級火力より先にライフ、耐性、回避、deflectionを確保する。",
    ],
    pros: [
      "殲滅が速くボスへの瞬間火力も高い。",
      "キャンペーンの移行が明確。",
      "アーマー、回避、エナジーシールドを併用できる。",
    ],
    cons: [
      "爆発が多く視認性が落ちる。",
      "終盤の品質・回復装備は高価。",
      "導火線と着弾位置への理解が必要。",
    ],
    leveling: [
      [
        "Act 1",
        "Permafrost BoltsとFragmentation Roundsを使い、クロスボウをこまめに更新します。",
      ],
      [
        "Act 2",
        "雑魚処理をExplosive Shotへ移し、Explosive GrenadeとFlash Grenadeを追加します。",
      ],
      [
        "Act 3以降",
        "Mirage Archer、後にCluster Grenadeを追加し、品質の実利が出る段階で品質系Ascendancyを取得します。",
      ],
    ],
    mapping: [
      "移動しながらExplosive Shotを撃ち、硬い集団へExplosive Grenadeを投げ、残りはMirage Archerに任せます。危険なレア敵にはFlash Grenadeを残します。",
    ],
    bossing: [
      "Oil Grenadeを置き、Cluster GrenadeとExplosive Grenadeを展開してからExplosive Shotを続けます。フェーズ移行直前に全チャージを使い切らないようにします。",
    ],
    faq: [
      [
        "クロスボウで最重要のModは？",
        "高い武器ダメージと有効な投射物スキルレベルを優先します。相性の良いレアは、無関係なユニークより強力です。",
      ],
      [
        "Advanced Thaumaturgyはいつ取る？",
        "主要グレネードの品質が、回復、投射物、ダメージに実際の利益を与える段階で取得します。",
      ],
    ],
  },
  "lightning-arrow-deadeye": {
    meta: {
      title: "Lightning Arrow Deadeye：リーグスタートからエンドゲームまで",
      shortTitle: "Lightning Arrow Deadeye",
      summary:
        "Lightning Arrow、Lightning Rodの起爆、Herald of Thunder、DeadeyeのMirageを使う高速弓ビルド。非クリティカルからクリティカルへ段階的に移行します。",
      description:
        "PoE2 0.5向けLightning Arrow Deadeye。育成、Lightning Rod配置、Mirage Archer、弓更新、防御を解説。",
      imageAlt: "高速の雷弓で攻撃するDeadeye",
      seoTitle: "Lightning Arrow Deadeyeガイド（PoE2 0.5）",
      seoDescription:
        "PoE2 0.5のLightning Arrow Deadeye。育成、Lightning Rod、弓強化、マップ、pinnacleボス構成を解説。",
    },
    overview: [
      "Lightning Arrowは敵集団を素早く処理し、Lightning Rodは連続した矢をボスへの集中火力へ変換します。Herald of ThunderやMirageは範囲を広げますが、正確なRod配置の代わりにはなりません。",
      "序盤は強い物理弓と非クリティカル構成を使い、命中、クリティカル率、防御が安定してからクリティカルへ移行します。",
    ],
    keyPoints: [
      "通常マップはLightning Arrowだけで十分なことが多い。",
      "ボスを攻撃する前に複数のLightning Rodを設置する。",
      "品質は補助スキルより先にLightning Rodへ与える。",
    ],
    pros: [
      "非常に高い殲滅速度。",
      "キャンペーン進行が滑らか。",
      "pinnacleコンテンツまで伸ばせる。",
    ],
    cons: [
      "序盤の防御が薄い。",
      "ボス火力にはコンボの準備が必要。",
      "終盤の弓とクリティカル装備が高価。",
    ],
    leveling: [
      [
        "キャンペーン",
        "Lightning ArrowとLightning Rodで育成し、物理弓がエリアに追いつかなくなったら交換します。",
      ],
      [
        "初期マップ",
        "非クリティカルパッシブを使い、耐性を上限まで確保して回避を安定させます。",
      ],
      [
        "クリティカル移行",
        "命中、弓ダメージ、クリティカル、防御が揃い、新構成が明確に強い場合だけ移行します。",
      ],
    ],
    mapping: [
      "通常集団にはLightning Arrowを使います。硬いレア敵の足元にLightning Rodを置き、連鎖と起爆が重なるように撃ち続けます。",
    ],
    bossing: [
      "複数のLightning Rodを準備し、構成にあればTornado Shotを加え、Lightning Arrowを連射します。pinnacle戦では必要に応じて範囲サポートを集中火力へ交換します。",
    ],
    faq: [
      [
        "0.5でもLightning Rodは必要？",
        "必要です。調整後も単体火力の主要パーツです。",
      ],
      [
        "最初からクリティカルで始められる？",
        "推奨しません。命中、装備、防御が揃うまでは非クリティカルの方が安定します。",
      ],
    ],
  },
  tornado: {
    meta: {
      title: "Tornado：元素床の吸収・上限・継続ダメージ",
      shortTitle: "Tornado",
      summary:
        "Tornadoは敵を引き寄せる物理継続ダメージの嵐を作り、元素床を吸収して対応する元素ダメージを追加します。",
      description:
        "PoE2のTornadoガイド。8秒の持続時間、上限、元素床の吸収、スケーリング、サポート、ビルド用途を解説。",
      imageAlt: "Acolyte of Chayulaビルドが作るTornadoの嵐",
      seoTitle: "Tornadoと元素床吸収ガイド（PoE2 0.5）",
      seoDescription:
        "PoE2 0.5のTornado。物理継続ダメージ、元素床、持続時間、上限、サポート、ビルド用途を解説。",
    },
    overview: [
      "Tornadoは周囲の敵を引き寄せ、物理継続ダメージを与える嵐を生成します。元素床と重なるとそのデバフを吸収し、対応する元素の追加ダメージを得ます。",
      "基本持続時間は8秒、基本上限は1個です。品質で持続時間と同時存在数を増やせます。",
    ],
    keyPoints: [
      "Spell Damageは継続ダメージのデバフに作用する。",
      "嵐の半径は3メートル。",
      "元素型は正しい床を吸収できるかに大きく依存する。",
    ],
    mechanics: [
      "Tornadoの中心は連続ヒットではなく継続ダメージです。元素床によって付与するデバフと追加ダメージの種類が変わります。",
      "上限を増やすと複数の嵐を維持でき、持続時間が有効範囲を決めます。投射物攻撃のTornado Shotとは別物です。",
    ],
    mechanicBullets: [
      "基本持続時間：8秒。",
      "基本上限：Tornado 1個。",
      "品質で持続時間と上限を増加可能。",
    ],
    supports: [
      [
        "Prolonged Duration",
        "有効時間を延ばし、再使用の頻度を下げます。",
        "core",
      ],
      ["Magnified Area", "引き寄せとマップ範囲を広げます。", "situational"],
      ["Physical Mastery", "物理スキルレベルを上げます。", "core"],
    ],
    buildUse: [
      "Archonのトリガーチェーン、物理継続ダメージ、嵐の下へ安定して元素床を置ける組み合わせに適します。",
    ],
    mistakes: [
      "ヒットダメージだけを伸ばさないでください。近くに床があるだけで吸収済みと判断せず、Tornadoと実際に重なっているか確認します。",
    ],
    faq: [
      [
        "複数の元素を吸収できる？",
        "吸収した元素床から対応する追加ダメージを得られます。各床の重なりと持続を構成側で確保してください。",
      ],
      [
        "TornadoとTornado Shotは同じ？",
        "違います。Tornadoは継続ダメージのSpell、Tornado Shotは独立した投射物Attackです。",
      ],
    ],
  },
  "ball-lightning": {
    meta: {
      title: "Ball Lightning：放電頻度・Fire Infusion・Shock",
      shortTitle: "Ball Lightning",
      summary:
        "Ball Lightningは本体がヒットしない低速投射物を放ち、周囲の対象へ0.2秒ごとに雷を放電します。",
      description:
        "PoE2のBall Lightningガイド。放電頻度、Shock、投射物速度、Fire Infusion、燃焼床、サポート、Blood Mageを解説。",
      imageAlt: "Ball Lightningを詠唱するBlood Mage",
      seoTitle: "Ball LightningとInfusionガイド（PoE2 0.5）",
      seoDescription:
        "PoE2 0.5のBall Lightning。0.2秒放電、Shock、Fire Infusion、投射物速度、サポート、ビルドを解説。",
    },
    overview: [
      "Ball Lightningは低速の球体を敵の間に進ませます。球体自体はヒットせず、同じ対象へ0.2秒ごとに雷を放ちます。",
      "Fire Infusionを消費すると球体が減速し、燃焼床を残して、消滅時に火の爆発を起こします。",
    ],
    keyPoints: [
      "投射物本体はヒットしない。",
      "対象の探索半径は1.8メートル。",
      "非常に高いShock確率を持つ。",
    ],
    mechanics: [
      "速度が遅いほどボスの近くに長く残り、速すぎると放電回数が減ります。範囲と立ち位置が、対象を放電半径に留める時間を左右します。",
      "Fire Infusionは燃焼床と火の爆発という別系統で、意図的にスケーリングする必要があります。",
    ],
    mechanicBullets: [
      "同一対象への間隔：0.2秒。",
      "対象半径：1.8メートル。",
      "基本クリティカル率：9%。",
    ],
    supports: [
      [
        "Considered Casting",
        "キャスト速度低下を許容できるself-cast向けです。",
        "situational",
      ],
      ["Magnified Area", "殲滅時の位置取りを楽にします。", "situational"],
      [
        "Lightning Mastery",
        "対応する雷ビルドでスキルレベルを上げます。",
        "core",
      ],
    ],
    buildUse: [
      "Ballcano Blood MageはBall Lightningで雑魚処理とShockを行い、Volcanoなどでボスへの集中火力を出します。",
    ],
    mistakes: [
      "球体の接触ではダメージを判断できません。本体はヒットしないためです。十分に放電する前に通過するほど速度を上げないでください。",
    ],
    faq: [
      [
        "球体が敵を通過するとヒットする？",
        "しません。ダメージは繰り返し放つ雷から発生します。",
      ],
      [
        "Fire Infusionを使う理由は？",
        "燃焼床と終点の爆発を追加し、Infusionを安定して生成・強化できるハイブリッド構成に有効です。",
      ],
    ],
  },
  "gas-grenade": {
    meta: {
      title: "Gas Grenade：毒雲・起爆・クールダウン",
      shortTitle: "Gas Grenade",
      summary:
        "Gas Grenadeは成長する毒雲を作り、燃焼またはDetonatorスキルで火の爆発へ変えます。同時に最大6個の雲を維持できます。",
      description:
        "PoE2のGas Grenadeガイド。毒雲上限、Poison、火の起爆、回復、サポート、Pathfinderのローテーションを解説。",
      imageAlt: "Gas Grenadeを投げるPathfinder",
      seoTitle: "Gas Grenadeの毒雲と起爆ガイド（PoE2 0.5）",
      seoDescription:
        "PoE2 0.5のGas Grenade。6雲上限、火の起爆、クールダウン、品質、サポート、ビルドを解説。",
    },
    overview: [
      "Gas Grenadeは跳ねた後、導火線終了時にガスを放出します。雲は通常のヒットではありませんがヒット同様にPoisonを付与して拡大し、燃焼または対応Detonatorで火の爆発を起こします。",
      "複数のクールダウン使用回数を持ち、最大6個の雲を維持します。重なり、持続、回復がローテーションの要点です。",
    ],
    keyPoints: [
      "毒雲は最大6個。",
      "燃焼またはDetonatorで雲が爆発する。",
      "品質でクールダウン回復と火ダメージが向上する。",
    ],
    mechanics: [
      "毒雲と火の爆発は異なる方法でスケーリングします。毒型はChaos、Poison効果、持続時間を重視し、起爆型は安定した燃焼やDetonatorが必要です。",
      "0.3以降はグレネードの導火線を厳密に使うため、移動する敵を予測して投げます。",
    ],
    mechanicBullets: [
      "クールダウン使用回数：3。",
      "毒雲は現在の最大範囲まで拡大する。",
      "通常ヒットではないがヒット同様にPoisonを付与する。",
    ],
    supports: [
      ["Second Wind", "瞬間火力中の使用回数に余裕を作ります。", "core"],
      ["Persistent Ground", "毒雲の有効時間を延ばします。", "situational"],
      ["Fire Mastery", "火の起爆型を支援します。", "situational"],
    ],
    buildUse: [
      "Pathfinderはボス出現前に雲を準備し、WitherとDespairを重ねてから、Poisonを維持するか起爆して火ダメージを出します。",
    ],
    mistakes: [
      "主軸を決めずに毒と火を同時に伸ばさないでください。6雲上限を意識し、ボスを対象にできる前に全使用回数を消費しないようにします。",
    ],
    faq: [
      [
        "雲はヒットせずにPoisonを付与できる？",
        "できます。通常ヒットではありませんが、ヒットしたかのようにPoisonを付与します。",
      ],
      [
        "何が毒雲を起爆する？",
        "燃焼効果と対応するDetonatorスキルが火の爆発を発生させます。",
      ],
    ],
  },
  "lightning-spear": {
    meta: {
      title: "Lightning Spear：Frenzy Charge分裂・雷弾・Shock",
      shortTitle: "Lightning Spear",
      summary:
        "Lightning Spearは命中時に5発の雷弾を放ち、Frenzy Chargeがあれば1つ消費して主槍を3対象へ分裂させます。",
      description:
        "PoE2のLightning Spearガイド。雷変換、Frenzy Charge分裂、二次投射物、Shock、品質、Amazonでの用途を解説。",
      imageAlt: "Lightning Spearを投げるAmazon",
      seoTitle: "Lightning Spear分裂メカニクスガイド（PoE2 0.5）",
      seoDescription:
        "PoE2 0.5のLightning Spear。ダメージ変換、5発の雷弾、Frenzy Charge分裂、Shock、品質、ビルドを解説。",
    },
    overview: [
      "Lightning Spearは槍を投げ、命中時に周囲へ5発の二次雷弾を放ちます。Frenzy Chargeがある場合は1つ消費して主槍を3対象へ分裂し、それぞれが雷弾を発生させます。",
      "主槍は物理ダメージの大半を雷へ変換し、二次投射物はすべてを雷へ変換して高いShock性能を持ちます。",
    ],
    keyPoints: [
      "主槍：物理の80%を雷へ変換。",
      "二次雷弾：100%変換、固定5発。",
      "Frenzy Chargeで主槍が3対象へ分裂。",
    ],
    mechanics: [
      "追加投射物は二次雷弾の上限に作用し、通常のように主槍を増やしません。主槍はpierce、fork、chain、returnできません。",
      "継続火力はFrenzy Charge生成に依存します。不安定だと殲滅範囲と多重爆発の両方を失います。",
    ],
    mechanicBullets: [
      "攻撃速度：基本値の60%。",
      "雷弾は5メートル以内の対象を探す。",
      "品質で雷弾追加とCharge効果倍化の可能性を得る。",
    ],
    supports: [
      ["Lightning Mastery", "対応時に雷スキルレベルを上げます。", "core"],
      ["Rapid Attacks", "低い基本攻撃速度を補います。", "core"],
      ["Magnified Area", "殲滅時の爆発範囲を広げます。", "situational"],
    ],
    buildUse: [
      "Amazonは命中、クリティカル、Frenzy Charge生成を組み合わせ、殲滅時に安定して槍を分裂させつつ、単体用ローテーションも用意します。",
    ],
    mistakes: [
      "通常の追加投射物Modが主槍を増やすと思わないでください。まずFrenzy Charge供給と攻撃速度を整えます。",
    ],
    faq: [
      [
        "Frenzy Chargeの効果は？",
        "主槍を3対象へ分裂させ、分裂した各槍が雷弾を発生させます。",
      ],
      [
        "主槍はpierceやchainできる？",
        "できません。独自の分裂ルールに従い、pierce、fork、chain、returnは不可です。",
      ],
    ],
  },
  "adonias-ego": {
    meta: {
      title: "Adonia's Ego：Power Charge準備と武器切り替え",
      shortTitle: "Adonia's Ego",
      summary:
        "Adonia's EgoはInfusionと武器切り替えを使って、高度なSpellビルド用のPower Chargeを準備するユニークSiphoning Wandです。",
      description:
        "PoE2のAdonia's Egoガイド。Power Charge、武器セット、よくある不具合、Stormweaverでの用途を解説。",
      seoTitle: "Adonia's EgoのPower Charge・武器切り替えガイド",
      seoDescription:
        "PoE2 0.5のAdonia's Ego。Infusion準備、武器切り替え、Power Charge、よくあるミス、Stormweaverでの用途を解説。",
    },
    overview: [
      "Adonia's EgoはInfusionを能動的に生成・消費してPower Chargeを準備するために使います。通常は主火力武器を邪魔しない別武器セットへ置きます。",
      "自動的にChargeを得る装備ではありません。スキルと武器セットを正しく設定し、マップ開始時やボス前に手順を実行します。",
    ],
    keyPoints: [
      "準備は別の武器セットで行う。",
      "Infusionスキルを正しいセットで有効にする。",
      "主セットにはより強いレアWandやコア装備を使える。",
    ],
    properties: [
      [
        "ベース",
        "Siphoning Wand",
        "InfusionとPower Charge手順用のユニークWandです。",
      ],
      [
        "主用途",
        "Power Chargeの準備",
        "準備を支援し、火力ローテーション自体は置き換えません。",
      ],
      [
        "主要リスク",
        "武器セット設定",
        "設定ミスにより装備が機能していないように見えます。",
      ],
    ],
    buildUse: [
      "Adonia's Trifusion Stormweaverなどは第2セットでInfusionとChargeを生成し、その後主火力セットへ戻ります。",
    ],
    alternatives: [
      "Charge手順が不要なら、レアWandとFocusの方が強いことが多いです。Chargeの消費方法が明記されたビルドでのみ購入します。",
    ],
    mistakes: [
      "よくある原因は、スキルが誤った武器セットで有効になっていること、必要なInfusionを先に生成していないことです。セット間のユニークRune競合でも無効になります。",
    ],
    faq: [
      [
        "主火力武器として使う？",
        "通常は使いません。多くの0.5構成は第2セットへ置き、より強いWandまたはWand＋Focusで攻撃します。",
      ],
      [
        "Chargeを得られないのはなぜ？",
        "Infusionの供給源、武器セットごとのスキル有効化、ユニークRuneの競合を確認してください。",
      ],
    ],
  },
  "sire-of-shards": {
    meta: {
      title: "Sire of Shards：円形投射物・Spell強化・ビルド用途",
      shortTitle: "Sire of Shards",
      summary:
        "Sire of ShardsはSigil of Power、Spell Damage、Cast Speedを持ち、Spellに円形の追加投射物4発を与えるユニークChiming Staffです。",
      description:
        "PoE2のSire of Shardsガイド。Mod、円形投射物、Sigil of Power、Ball Lightning、長所と代替装備を解説。",
      seoTitle: "Sire of Shards円形投射物ガイド（PoE2 0.5）",
      seoDescription:
        "PoE2 0.5のSire of Shards。円形＋4投射物、Spell Damage、Cast Speed、Sigil of Power、代替装備を解説。",
    },
    overview: [
      "Sire of Shardsは対応するSpellへ円形に4発の追加投射物を与えます。さらにレベル10のSigil of Power、Spell Damage、Cast Speed、少量の元素耐性を持ちます。",
      "円形パターンは殲滅範囲に優れますが、単体への集中火力を下げる場合があります。表示火力だけでなくスキルの軌道を確認します。",
    ],
    keyPoints: [
      "Spellが追加投射物を4発放つ。",
      "投射物は円形に発射される。",
      "レベル10 Sigil of Powerを付与する。",
    ],
    properties: [
      ["Spell Damage", "80～120%増加", "振れ幅の広いグローバルModです。"],
      ["Cast Speed", "10～20%増加", "self-castの操作感を改善します。"],
      ["投射物", "円形に＋4", "殲滅範囲とボス位置取りの両方を変えます。"],
      ["要求レベル", "25", "現在のベース要求値です。"],
    ],
    buildUse: [
      "Ball Lightningなどは円形散布で敵集団を覆ったり、大型対象の近くで複数を重ねたりできます。Ballcano Blood Mageでは移行用またはコア武器になります。",
    ],
    alternatives: [
      "集中ボス火力、防御、クリティカルが重要なら、レアStaff、Wand＋Focus、専用ユニークの方が強い場合があります。",
    ],
    mistakes: [
      "追加4発がボス火力5倍を保証するわけではありません。円形の軌道によって実際に対象を通る数が決まります。",
    ],
    faq: [
      [
        "すべてのSpellが4発追加される？",
        "対応する投射物Spellだけです。投射物ではないSpellは円形発射を得ません。",
      ],
      [
        "Spell Damage最大値が必ず最良？",
        "重要ですが、Cast Speedや円形パターンとの相性が小さなダメージ差より大きい場合があります。",
      ],
    ],
  },
  "crown-of-the-pale-king": {
    meta: {
      title: "Crown of the Pale King：Thorns反撃・Mod・Runemaster強化",
      shortTitle: "Crown of the Pale King",
      summary:
        "物理Thornsを追加し、すべてのHitにThornsで反撃できるようにする低レベルのユニークCultist Crownです。",
      description:
        "PoE2のCrown of the Pale Kingガイド。Thorns、アーマー、エナジーシールド、ライフ、Runemaster強化、Warbringerを解説。",
      seoTitle: "Crown of the Pale King Thornsガイド（PoE2 0.5）",
      seoDescription:
        "PoE2 0.5のCrown of the Pale King。全Hit反撃、ライフ、防御、強化方法、対応ビルドを解説。",
    },
    overview: [
      "Crown of the Pale Kingは物理Thornsを追加し、すべてのHitへThornsで反撃可能にすることで、序盤の反撃ビルドを成立させます。",
      "アーマー、エナジーシールド、最大ライフ、アイテムレアリティも持ちます。要求値が低く、後にRunemastered Cultist Crownへ強化できます。",
    ],
    keyPoints: [
      "ThornsがすべてのHitへ反撃する。",
      "物理Thornsダメージを追加する。",
      "Runemastered Cultist Crownへ強化可能。",
    ],
    properties: [
      [
        "防御",
        "アーマーとエナジーシールド50～100%増加",
        "振れ幅の広いローカルModです。",
      ],
      ["最大ライフ", "+40～80", "序盤に有用な生存Modです。"],
      ["Thorns", "物理10～15から20～25", "現在の明示的な反撃値です。"],
      ["ユニーク効果", "すべてのHitへ反撃", "ThornsビルドのコアModです。"],
    ],
    buildUse: [
      "Thorns Warbringerは被弾で確実に反撃し、Thorns、armor break、生存力を伸ばしてダメージ源となるHitを耐えます。",
    ],
    alternatives: [
      "既に発動条件を解決している場合や、さらに高いアーマー、ライフ、耐性、特定corruptionが必要なら、防御レアHelmetが適します。",
    ],
    mistakes: [
      "Helmetがあっても防御を無視できません。Thornsには被弾を生き残る必要があり、危険なボスの大技は引き続き回避します。",
    ],
    faq: [
      [
        "すべてのHitでThornsが発動する？",
        "コアModにより全Hitへ反撃できますが、キャラクターはそのダメージを受けて生存する必要があります。",
      ],
      [
        "強化できる？",
        "できます。現在のRuneforgingにはRunemastered Cultist Crownのレシピがあります。",
      ],
    ],
  },
  "best-atlas-tree-0-5": {
    meta: {
      title: "PoE2 0.5おすすめAtlasツリー：最初の20・40・60ポイント",
      shortTitle: "0.5 Atlasツリー",
      summary:
        "段階式Atlasプラン。まずWaystone維持と安全な進行を確保し、その後Atlas Masterと1つの収益メカニクスへ特化します。",
      description:
        "PoE2 0.5のAtlasツリーガイド。20/40/60ポイント、Waystone維持、Atlas Master、特化、振り直しを解説。",
      imageAlt: "DoryaniとPoE2のAtlas画面",
      seoTitle: "PoE2 0.5おすすめAtlasツリー：20/40/60ポイント",
      seoDescription:
        "PoE2 0.5のAtlasルート。最初の20・40・60ポイント、Waystone維持、Atlas Master、収益メカニクス、振り直しを解説。",
    },
    quickAnswers: [
      ["最優先", "特化収益より先にWaystone維持と進行を安定させます。"],
      [
        "特化する時期",
        "マップと防御が安定したら1つのメカニクスを選び、Atlas MasterとTabletを組み合わせます。",
      ],
      [
        "振り直す時期",
        "ビルドが安全に完了できない、または費用が期待利益を上回る場合に変更します。",
      ],
    ],
    overview: [
      "永続的に唯一の最良Atlasはありません。最初のツリーは進入と維持を解決し、収益パッシブは対象コンテンツを安定して完了できてから組みます。",
      "20/40/60ポイントをチェック地点にし、完成装備と全開放を前提としたエンドゲームツリーをそのままコピーしないでください。",
    ],
    keyPoints: [
      "維持を先、収益を後にする。",
      "1つの特化を完成させてから分散する。",
      "TabletとマップModを戦略に合わせる。",
    ],
    steps: [
      [
        "最初の20ポイント",
        "Waystone維持、進行、通常マップを安定させるノードを優先します。",
      ],
      [
        "約40ポイント",
        "周回に合うAtlas Masterを選び、1つのメカニクス分岐へ入ります。",
      ],
      [
        "約60ポイント",
        "報酬クラスターを完成し、安全なQuantityとRarityを追加し、処理不能なModを避けます。",
      ],
      [
        "60ポイント以降",
        "最初の戦略が安定し費用を払える場合だけ、補完メカニクスを加えます。",
      ],
    ],
    decisions: [
      "高速広範囲ビルドはBreachやDelirium、耐久と制御があるビルドはExpeditionや危険なRemnantに向きます。SSFでは取引でしか価値化できない利益より、確定材料を優先します。",
    ],
    mistakes: [
      "マップ開始直後に高投資ツリーをコピーしない、4メカニクスへ均等に分散しない、基本遭遇を完了できる前に高価なTabletを買わないようにします。",
    ],
    faq: [
      [
        "Item Quantityをすぐ取る？",
        "取りません。Waystone維持と生存が安定して初めて価値があります。",
      ],
      [
        "Atlas Masterの選び方は？",
        "最も安定して完了でき、長く周回したい1つのメカニクスを強化するMasterを選びます。",
      ],
    ],
  },
  "currency-farming-strategies-0-5": {
    meta: {
      title: "PoE2 0.5通貨ファーム：予算・Atlas・リスク別戦略",
      shortTitle: "0.5通貨ファーム",
      summary:
        "すぐ古くなる時給値ではなく、キャラクター火力、参入費、換金性、失敗リスクからファーム戦略を選びます。",
      description:
        "PoE2 0.5通貨ガイド。Expedition、Runes of Aldur、Breach、Delirium、Ritual、低予算マップの費用とリスクを解説。",
      imageAlt: "PoE2の通貨とクラフト素材",
      seoTitle: "PoE2 0.5通貨ファーム：予算別おすすめ戦略",
      seoDescription:
        "PoE2 0.5の収益戦略。Expedition、Rune、Breach、Delirium、Ritual、Atlas構成を予算別に解説。",
    },
    quickAnswers: [
      [
        "低予算",
        "維持ノード付き通常マップを回り、換金しやすい素材を売却し、高価な招待は買いません。",
      ],
      [
        "安定戦略",
        "ExpeditionとGrand Expeditionは売りやすい報酬が明確ですが、Remnantの計画が必要です。",
      ],
      [
        "高変動",
        "Ritual、Deliriumボスラッシュ、高価なRune賭けには大きな資金とリスク許容が必要です。",
      ],
    ],
    overview: [
      "利益は市場価格で変わります。本ガイドは戦略構造を比較し、1時間あたり固定のDivine Orbを約束しません。",
      "戦略判断前に少なくとも20回分の費用、完了数、換金可能品、失敗を記録します。",
    ],
    keyPoints: [
      "理論価値より換金性が重要。",
      "安定して完了できる通常戦略は、頻繁に死亡する高難度戦略より優れる。",
      "サンプル開始前に投入素材を価格評価する。",
    ],
    steps: [
      [
        "マップを安定",
        "Waystone維持と安価なTabletを使い、ポータルを無駄にせず対象Tierを完了できるまで進めます。",
      ],
      [
        "1つの周回を選択",
        "ビルド特性と現在価格からExpedition、Rune、Breach、Delirium、Ritualを選びます。",
      ],
      ["20回を記録", "総費用、直接通貨、換金素材、高額品、失敗を記録します。"],
      [
        "検証後に拡大",
        "未売却在庫を除いても利益が正の場合だけ、より良いTabletや招待を買います。",
      ],
    ],
    decisions: [
      "Expeditionは計画と耐久、BreachとDeliriumは速度と範囲、Ritualは狭い場所での火力を評価します。高価なRune of Aldurの期待値が市場価格より低ければ、そのまま売ります。",
    ],
    mistakes: [
      "売れないレアを楽観価格で利益に含めない、失敗マップを無視しない、3回の幸運だけで戦略を変えないでください。高価なクラフト前に目標と損切りを決めます。",
    ],
    faq: [
      [
        "最も安全な開始方法は？",
        "未検証ビルドで高価な入場券を買う前に、維持ノード付き通常マップと換金しやすいドロップを回します。",
      ],
      [
        "利益を再計算する時期は？",
        "パッチ、人気ガイド、市場変動が需給や費用を変えた時です。",
      ],
    ],
  },
  "classes-ascendancies-guide": {
    meta: {
      title: "PoE2クラス・Ascendancyガイド：0.5のプレイスタイル別選択",
      shortTitle: "クラスとAscendancy",
      summary:
        "近接、遠隔、Spell、Minion、変身、少ボタンなど好みの操作に現在のクラスを合わせ、Tier Listを永続的な答えとして扱わないためのガイドです。",
      description:
        "プレイスタイル、複雑さ、防御、SSF、完全なビルドガイドの有無からPoE2 0.5のクラスとAscendancyを選びます。",
      imageAlt: "PoE2のクラスとAscendancy選択を示す戦闘場面",
      seoTitle: "PoE2 0.5クラス・Ascendancy選択ガイド",
      seoDescription:
        "プレイスタイル、難度、防御、SSF、ビルドからPoE2 0.5のクラスとAscendancyを選ぶ方法。",
    },
    quickAnswers: [
      [
        "最も簡単な選び方",
        "まず戦い方を選び、その後に完全な育成ルートを持つ最新ガイドを探します。",
      ],
      [
        "クラス制限",
        "基本クラスはパッシブ開始位置とAscendancyを決めますが、多くのジェムはクラス専用ではありません。",
      ],
      [
        "変更できる？",
        "現在のルールでAscendancyは調整できますが、基本クラスを別クラスへ変えることはできません。",
      ],
    ],
    overview: [
      "クラス選択でスキルが永久に固定されるわけではありません。パッシブ開始位置、属性の取りやすさ、利用可能なAscendancyが決まります。",
      "最初のキャラクターでは理論上のS Tierより、完全なガイドが重要です。スキル移行が明確で、一般的な装備と理解しやすい防御を持つ構成を優先します。",
    ],
    keyPoints: [
      "Warrior：アーマー、重攻撃、盾、Thorns。",
      "Ranger/Huntress：弓、槍、機動力、コンパニオン。",
      "Sorceress/Witch：Spell、Trigger、Minion、ライフとエナジーシールド。",
      "Mercenary/Monk：クロスボウ、品質、quarterstaff、高速戦闘。",
      "Druid：変身、植物、Attack/Spellハイブリッド。",
    ],
    steps: [
      ["戦闘距離を選ぶ", "近接、遠隔Attack、Spell、Minion、変身から選びます。"],
      [
        "複雑さを選ぶ",
        "少ボタン、コンボ、Trigger、リソース管理のうち、継続して扱いたいものを決めます。",
      ],
      [
        "参入条件を確認",
        "最初のビルドは希少ユニーク、高価なanointment、隠しAscendancyに依存させません。",
      ],
      [
        "対応ガイドを開く",
        "キャンペーンスキル、パッシブ節目、装備優先度、代替案を確認します。",
      ],
    ],
    decisions: [
      "速度重視の初心者は遠隔Deadeye、耐久重視なら盾やアーマーWarriorが候補です。MinionならInfernalistとSpirit Walker、Spellなら単純self-castと高度なTriggerを比較します。",
    ],
    mistakes: [
      "Tier Listの文字だけで選ばない、ショーケース装備を初期装備と思わない、主要メカニクスの操作感を確認する前にAscendancyを決めないようにします。",
    ],
    faq: [
      [
        "すべてのクラスがすべてのスキルを使える？",
        "武器と属性条件を満たせば多くのスキルはクラスをまたいで使えますが、ツリー位置とAscendancyで大きな差が出ます。",
      ],
      [
        "初心者に最良のクラスは？",
        "現在対応し、安価で完全な育成ルートがあり、ローテーションと防御を理解できるクラスです。",
      ],
    ],
  },
  "act-1-4-boss-permanent-rewards-checklist": {
    meta: {
      title: "PoE2 Act 1～4ボス・永続報酬チェックリスト",
      shortTitle: "Act 1～4ボス一覧",
      summary:
        "Act 1～4のメインボス、永続報酬を持つ任意ボス、見落としやすいクエストアイテムを区別します。",
      description:
        "PoE2 Act 1～4チェックリスト。ボス順、ライフ、Spirit、耐性、武器セットパッシブ、取り逃した報酬の回収を解説。",
      imageAlt: "PoE2キャンペーンボス一覧を示すCount Geonor",
      seoTitle: "PoE2 Act 1～4ボス・永続報酬チェックリスト",
      seoDescription:
        "PoE2 Act 1～4のボス、ライフ、Spirit、耐性、武器セットパッシブ、任意目標を確認できます。",
    },
    quickAnswers: [
      [
        "メインボス",
        "メインマーカーに従います。これらの戦闘が次のエリアやActを開きます。",
      ],
      [
        "永続報酬",
        "Actを離れる前にライフ、Spirit、耐性、武器セットポイントを与える目標を確認します。",
      ],
      [
        "取り逃し",
        "Waypointで戻り、目標を完了し、指示どおりアイテムを使用または提出します。",
      ],
    ],
    overview: [
      "本ページはボス進行と永続報酬リストをまとめ、今必須、寄り道する価値あり、後回しにできる目標を判断できるようにします。",
      "報酬値やルートはキャンペーン調整で変わる場合があります。攻撃は個別ボスページ、正確な数値は永続報酬ガイドを参照してください。",
    ],
    keyPoints: [
      "Act 1：Beira、Crowbell、King in the Mists、Candlemass。",
      "Act 2：Balbalaが最初のTrialを開き、Kabalaが武器セットポイントを与える。",
      "Act 3：Mighty Silverfist、Ignagdukなどが永続強化を与える。",
      "Act 4と移行章ではSpirit、耐性、進行報酬が追加される。",
    ],
    steps: [
      [
        "新Actへ入る",
        "チェックリストを開き、現在パッチで確認済みの報酬だけを記録します。",
      ],
      [
        "メイン進行",
        "先にメインボスを倒してWaypointを開き、長い寄り道はその後に判断します。",
      ],
      [
        "道中報酬を回収",
        "主ルート付近または現在の問題を解決する永続報酬はすぐ取得します。",
      ],
      [
        "マップ前の監査",
        "エンドゲーム装備へ大きく投資する前に、取り逃しをすべて回収します。",
      ],
    ],
    decisions: [
      "生存が厳しければ耐性やライフ、Aura・Minion・持続スキル型なら早めのSpiritを優先します。武器セットポイントは2つの専門ツリーを実際に使う場合に最も価値があります。",
    ],
    mistakes: [
      "ボスを倒すだけで報酬が自動取得されるとは限りません。右クリックで使うドロップやNPCへ渡すアイテムがあります。キャンペーンのKing in the Mistsはエンドゲームpinnacle版とは別です。",
    ],
    faq: [
      [
        "取り逃した永続報酬は後から取れる？",
        "取れます。対応Waypointへ戻ってボスやクエストを完了し、アイテムを使用または提出する必要があるか確認します。",
      ],
      [
        "任意ボスは全員すぐ倒す？",
        "永続ステータスを与えるボスは多くの場合価値があります。通常ドロップだけで遠回りなら後回しでも構いません。",
      ],
    ],
  },
  "the-executioner": {
    meta: {
      title: "The Executioner攻略：大振り・増援・Ogham Villageルート",
      shortTitle: "The Executioner",
      summary:
        "Act 1 Ogham Villageのメインボス。遅い高威力物理攻撃、赤い直線攻撃、継続的な増援が正面での攻撃を罰します。",
      description:
        "PoE2 The Executionerガイド。場所、攻撃予兆、増援、安全な位置、火耐性、クエスト進行を解説。",
      seoTitle: "The Executioner Act 1ボス攻略（PoE2）",
      seoDescription:
        "PoE2のThe Executionerを攻略。Ogham Villageルート、赤い大振り、増援、位置取り、準備、クエストを解説。",
    },
    overview: [
      "The ExecutionerはOgham Village終端のメインルートを塞ぎます。攻撃は遅いものの正面への威力が高く、増援を放置するとアリーナが急速に混雑します。",
      "中距離で周回し、溜めを見たら横へ回避するか背後へ抜け、長い後隙だけ攻撃するのが安全です。",
    ],
    keyPoints: [
      "場所：Ogham Village終端のExecutioner's Block。",
      "主な脅威：高威力の物理攻撃と正面薙ぎ払い。",
      "結果：The Trail of Corruptionが進行。",
    ],
    strategy: [
      "武器を上げる、または赤く光ったら正面線上から離れます。遠距離なら横回避、近距離なら背後へ抜け、後隙に攻撃します。",
      "傭兵を召喚したら遠隔敵から倒し、アリーナ外周を移動します。投射物と燃焼床が重なる間はボスへの欲張り攻撃を避けます。",
    ],
    strategyBullets: [
      "溜め中は正面に立たない。",
      "増援を処理してからボスへ戻る。",
      "赤い直線大振り用に回避を1回残す。",
    ],
    preparation: [
      "Ogham Villageへ入る前に主スキルと武器を更新します。火耐性はエリアと燃焼床を軽減し、十分なライフと移動力が重い物理攻撃による即死を防ぎます。",
    ],
    faq: [
      [
        "The Executionerはどこ？",
        "Act 1 Ogham Village終端のExecutioner's Blockで、通常はWaypointの反対側です。",
      ],
      [
        "最優先で避ける攻撃は？",
        "赤く光る、または武器を掲げる大振りです。次に広い薙ぎ払い中の正面を避けます。",
      ],
      [
        "倒すと何が開く？",
        "The Trail of Corruptionが進み、Manor Rampartsへの道が開きます。",
      ],
    ],
  },
};
