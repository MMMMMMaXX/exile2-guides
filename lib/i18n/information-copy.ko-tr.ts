import type {
  InformationPageSlug,
  InformationPageCopy,
} from "./information-copy";

const contactEmail = "contact@stratlore.com";

export const koTrInfoCopy: Record<
  "ko" | "tr",
  Record<InformationPageSlug, InformationPageCopy>
> = {
  ko: {
    about: {
      description:
        "Exile2 Guides가 독립적으로 운영·조사·발행되는 비공식 Path of Exile 2 가이드 리소스인지 알아보세요.",
      title: "Exile2 Guides 소개",
      sections: [
        {
          title: "우리의 미션",
          paragraphs: [
            "Exile2 Guides는 한 명의 개발자가 독립적으로 운영하는 비공식 Path of Exile 2 가이드 리소스입니다. 목표는 조사 요약을 개인의 게임 플레이 경험처럼 제시하지 않고, 패치 상황을 반영한 유용한 답변을 정리하는 것입니다.",
            "사이트는 읽기 전용이며 무료로 이용할 수 있습니다. 문서는 구조화된 조사와 자동화된 품질 검사를 거친 후 게시되며, 불확실성이나 검증 범위는 필요한 경우 페이지에 표시됩니다.",
          ],
        },
        {
          title: "다루는 내용",
          connectionLinks: [
            {
              description:
                "모든 클래스의 레벨링 빌드, 엔드게임 구성, 장비 우선순위, 패시브 트리 경로, 젬 연결 설정.",
              href: "/en/builds/",
              label: "빌드",
            },
            {
              description:
                "보스 메커니즘, 단계 분석, 드롭 테이블, 저항 요구치, 단계별 전략 가이드.",
              href: "/en/bosses/",
              label: "보스",
            },
            {
              description:
                "유니크 아이템 데이터베이스, 통화 메커니즘, 제작 참고, 접두어/접미어 등급 설명.",
              href: "/en/items/",
              label: "아이템",
            },
            {
              description:
                "액티브 스킬 젬 분석, 서포트 젬 조합, 스케일링 메커니즘, 레벨 진행 데이터.",
              href: "/en/skills/",
              label: "스킬",
            },
            {
              description:
                "메커니즘 심층 분석, 초보자 튜토리얼, FAQ 답변, 일반 진행 가이드.",
              href: "/en/guides/",
              label: "가이드",
            },
          ],
        },
        {
          title: "편집 기준",
          paragraphs: [
            "문서는 공식 패치 노트, 현재 데이터베이스, 검증된 커뮤니티 가이드, 게임 플레이 영상, 플레이어 토론을 바탕으로 조사됩니다. 가능한 경우 주장에는 출처가 링크되며 관련 패치 맥락과 함께 작성됩니다.",
            "자동화된 QA는 콘텐츠 구조, 필수 메타데이터, 내부 링크, 게시 상태, 색인 가능 여부, 빌드 결과를 문서 게시 전에 확인합니다.",
            "게임 내에서 직접 테스트하지 않은 결론은 직접 테스트된 것이 아니라 출처로 검증된 것으로 제시합니다. 버전에 민감한 불확실성은 확신에 찬 표현 뒤에 숨기지 않고 그대로 드러냅니다.",
          ],
        },
        {
          title: "독립성",
          paragraphs: [
            "Exile2 Guides는 독립적인 팬 제작 리소스입니다. Grinding Gear Games 또는 그 외 어떤 회사와도 제휴, 보증, 후원 관계에 있지 않습니다.",
            "이 발행물은 한 명의 운영자가 관리하며, 실제로 수행하지 않은 1차 게임 플레이 테스트를 완료된 것으로 제시하지 않습니다.",
          ],
        },
        {
          title: "수정 및 피드백",
          paragraphs: [
            "게임 메커니즘은 자주 바뀌며 완벽한 가이드는 없습니다. 사실 오류, 오래된 메커니즘, 누락된 출처를 발견하시면 문의 페이지를 통해 알려주시거나 직접 이메일로 연락해 주세요.",
            "수정 사항과 저작권 신고는 가능한 범위 내에서 검토합니다. 영향이 큰 사실 오류를 우선하지만 답변 시간은 보장되지 않습니다.",
          ],
        },
      ],
    },
    contact: {
      description:
        "콘텐츠 수정, 저작권 신고, 일반 피드백을 위해 독립 운영되는 Exile2 Guides에 연락하세요.",
      title: "문의하기",
      sections: [
        {
          title: "연락처",
          paragraphs: [
            `공개된 유일한 연락 채널은 이메일입니다: ${contactEmail}. 수정 사항과 저작권 신고는 가능한 범위 내에서 검토합니다. 영향이 큰 사실 오류를 우선하지만 답변 시간은 보장되지 않습니다.`,
            "이 사이트는 서버 측 문의 양식이 없는 읽기 전용 정적 사이트입니다. 아래의 직접 이메일 링크를 이용해 주세요. 요청을 조용히 폐기할 수 있는 메시지 전송 버튼은 없습니다.",
          ],
          connectionLinks: [
            {
              description:
                "콘텐츠 수정, 저작권 신고, 기타 메모를 보내려면 이메일 클라이언트를 여세요.",
              href: `mailto:${contactEmail}`,
              label: contactEmail,
            },
          ],
        },
        {
          title: "문의 유형",
          issueCards: [
            {
              description:
                "오류가 있는 정확한 페이지 URL, 잘못된 구체적 주장, 테스트한 게임 버전 또는 패치, 그리고 신뢰할 수 있는 출처나 명확한 재현 단계를 포함하세요.",
              title: "콘텐츠 수정",
            },
            {
              description:
                "자산 또는 페이지 URL, 저작권 자료 설명, 소유권 또는 승인 증명, 요청하는 구체적 조치를 제공하세요.",
              title: "저작권 또는 출처 표기",
            },
            {
              description:
                "어떤 영역에 관심이 있는지 — 빌드, 보스, 아이템, 스킬 또는 전반적인 사이트 경험 — 와 상세한 제안을 알려주세요.",
              title: "일반 피드백",
            },
          ],
        },
        {
          title: "포함할 내용",
          bullets: [
            "문제가 나타나는 정확한 페이지 URL과 가능하다면 스크린샷 또는 인용 텍스트.",
            "수정에 대한 신뢰할 수 있는 출처 — 공식 패치 노트, 최신 데이터베이스 항목, 명확한 커뮤니티 테스트/보고서.",
            "메커니즘 불일치에 대한 명확한 재현 세부 정보, 가능한 경우 게임 버전 및 관련 설정 포함.",
            "문의에 답변하는 데 필요한 최소한의 개인 정보만.",
          ],
        },
        {
          title: "검토 정책",
          paragraphs: [
            "수정 사항과 저작권 신고는 가능한 범위 내에서 검토합니다. 영향이 큰 사실 오류를 우선하지만 답변 시간은 보장되지 않습니다.",
          ],
        },
      ],
    },
    "cookie-policy": {
      description:
        "Exile2 Guides의 전체 쿠키 및 브라우저 저장소 공개 — 쿠키가 무엇인지, 우리가 사용하는 것, 타사 쿠키, 그리고 환경설정을 관리하는 방법.",
      title: "쿠키 정책",
      sections: [
        {
          title: "쿠키란 무엇인가",
          paragraphs: [
            "쿠키는 웹사이트를 방문할 때 컴퓨터, 휴대폰 또는 기타 인터넷 연결 기기에 웹사이트가 저장하는 작은 텍스트 파일입니다. 쿠키는 웹사이트가 올바르게 작동하도록 하고, 성능을 개선하며, 사용자 환경설정을 기억하고, 운영자에게 정보를 제공하는 데 널리 사용됩니다.",
            "웹사이트는 LocalStorage, SessionStorage, IndexedDB와 같은 유사 기술(통칭 '브라우저 저장소')도 사용할 수 있습니다. 이 페이지에서 '쿠키'라는 표현은 별도로 명시하지 않는 한 이러한 모든 기술을 포함합니다.",
          ],
        },
        {
          title: "쿠키 사용 방식",
          paragraphs: [
            "Exile2 Guides는 의도적으로 어떤 쿠키도 설정하거나 브라우저 저장소에 기록하지 않습니다. 세션 쿠키, 영구 쿠키, 추적 픽셀, 핑거프린팅 스크립트, 또는 기기에 데이터를 저장하는 그 어떤 메커니즘도 사용하지 않습니다.",
            "이 사이트는 분석 서비스, 광고 네트워크, 소셜 미디어 위젯, 외부 콘텐츠 삽입, 또는 쿠키 기반 데이터 수집이 필요한 그 어떤 기능도 사용하지 않습니다.",
            "브라우저는 여전히 정적 리소스(HTML, CSS, JavaScript, 이미지)에 대한 표준 HTTP 캐시 항목을 생성할 수 있습니다. 이는 전적으로 브라우저가 제어하며 개인 데이터를 포함하지 않고 표준 웹 캐싱 프로토콜에 따라 관리됩니다.",
          ],
        },
        {
          title: "쿠키 분류",
          table: {
            headers: ["쿠키 분류", "목적", "기간", "이 사이트 상태"],
            rows: [
              [
                "반드시 필요",
                "사이트 기능, 보안, 부하 분산",
                "세션",
                "사용 안 함",
              ],
              ["환경설정", "언어, 테마, 화면 설정", "최대 1년", "사용 안 함"],
              [
                "분석",
                "사용 통계, 페이지 성능",
                "최대 2년",
                "사용 안 함",
              ],
              ["광고", "광고 타게팅, 캠페인 추적", "최대 2년", "사용 안 함"],
              [
                "소셜 미디어",
                "소셜 공유, 임베드 콘텐츠",
                "다름",
                "사용 안 함",
              ],
            ],
          },
        },
        {
          title: "타사 쿠키",
          paragraphs: [
            "Exile2 Guides는 기기에 쿠키를 설정하는 그 어떤 타사 서비스도 임베드하지 않습니다. Google 애널리틱스, Facebook 픽셀, Twitter 위젯, YouTube 임베드, Disqus 댓글, 또는 외부 데이터 수집을 수반하는 그 어떤 타사 연동도 사용하지 않습니다.",
            "이 사이트에는 커뮤니티 위키, 공식 패치 노트, 팬 도구, 스트리밍 플랫폼을 포함한 외부 웹사이트로의 링크가 있습니다. 이러한 외부 사이트는 우리와 무관한 자체 쿠키 정책을 가지고 있습니다.",
          ],
        },
        {
          title: "쿠키 사용의 향후 변경",
          paragraphs: [
            "향후 이 사이트 버전에서 언어 환경설정 유지, 다크 모드 전환, 사용 분석, 광고 등 쿠키나 브라우저 저장소가 필요한 기능을 도입한다면, 해당 기능이 활성화되기 전에 이 페이지가 업데이트됩니다.",
            "각 신규 쿠키 또는 저장 메커니즘은 이름, 제공자, 목적, 최대 기간, 그리고 사용 가능한 개인정보 보호 통제와 함께 여기에 기록됩니다. 법적으로 요구되는 경우 필수가 아닌 쿠키를 설정하기 전에 동의 메커니즘을 도입할 것입니다.",
          ],
        },
        {
          title: "브라우저에서 쿠키 관리",
          paragraphs: [
            "사용자는 기기에서 웹사이트가 쿠키를 사용하는 방식을 통제할 권리가 있습니다. 대부분의 최신 브라우저는 다음과 같은 통제 기능을 제공합니다:",
          ],
          bullets: [
            "기존 쿠키 보기 및 삭제 — 각 웹사이트가 저장한 모든 쿠키를 확인하고 개별 또는 일괄적으로 제거.",
            "모든 쿠키 차단 — 모든 웹사이트가 쿠키를 저장하지 못하게 함. 일부 사이트 오작동을 초래할 수 있음.",
            "타사 쿠키 차단 — 직접 방문한 웹사이트의 쿠키만 허용.",
            "비공개 또는 시크릿 모드 — 브라우징 세션을 닫을 때 모든 쿠키를 자동 삭제.",
          ],
        },
        {
          title: "브라우저별 안내",
          bullets: [
            "Google Chrome — 설정 > 개인정보 및 보안 > 쿠키 및 기타 사이트 데이터",
            "Mozilla Firefox — 설정 > 개인정보 및 보안 > 쿠키 및 사이트 데이터",
            "Apple Safari — 환경설정 > 개인정보 보호 > 쿠키 및 웹사이트 데이터",
            "Microsoft Edge — 설정 > 쿠키 및 사이트 권한 > 쿠키 관리 및 삭제",
            "Opera — 설정 > 고급 > 개인정보 및 보안 > 사이트 설정 > 쿠키",
          ],
        },
        {
          title: "문의하기",
          paragraphs: [
            `쿠키 관련 관행에 궁금한 점이 있으면 ${contactEmail}으로 연락해 주세요.`,
          ],
        },
      ],
    },
    disclaimer: {
      description:
        "Exile2 Guides의 중요 법적 면책 고지 — 비공식 상태, 콘텐츠 정확성, 재정 조언, 외부 링크, 사용자 책임을 다룹니다.",
      title: "면책 조항",
      sections: [
        {
          title: "비공식 팬 제작 리소스",
          paragraphs: [
            "Exile2 Guides는 독립적이고 비공식적인 팬 제작 웹사이트입니다. Path of Exile 2의 개발 및 배급사인 Grinding Gear Games Limited('GGG')와 제휴, 보증, 후원 또는 그 밖의 연결 관계에 있지 않습니다.",
            "Path of Exile, Path of Exile 2, Grinding Gear Games 및 모든 관련 로고, 캐릭터, 이름, 아트웍 및 기타 자료는 Grinding Gear Games Limited의 상표 또는 등록 상표입니다. 모든 권리는 각 소유자에게 있습니다. 이 사이트에서 이러한 자료를 사용하는 것은 정보 및 팬 커뮤니티 목적으로만 하며, GGG와의 제휴나 보증을 의미하지 않습니다.",
            "우리는 비공개 게임 데이터, 내부 개발 빌드, 기밀 서버 정보, 또는 Grinding Gear Games에 속한 그 밖의 독점 자료에 접근할 수 없습니다.",
          ],
        },
        {
          title: "콘텐츠 정확성 및 시의성",
          paragraphs: [
            "우리는 모든 가이드 콘텐츠가 게시 시점에 정확하고, 출처가 명확하며, 최신 상태임을 보장하기 위해 노력합니다. 그러나 Path of Exile 2는 빈번한 업데이트, 밸런스 변경, 핫픽스, 대형 패치를 받는 라이브 서비스 게임으로, 게임 메커니즘, 아이템 속성, 스킬 동작, 진행 시스템이 바뀔 수 있습니다.",
            "그 결과 작성 시점에 정확했던 정보라도 게임 업데이트 후에는 오래되거나 부정확해질 수 있습니다. 우리는 모든 문서가 각 패치 직후 즉시 업데이트됨을 보장할 수 없습니다.",
            "독자들은 중대한 게임 결정을 내리기 전에 항상 최신 공식 패치 노트, 게임 내 툴팁, 커뮤니티 테스트와 가이드 정보를 교차 검증해야 합니다. Exile2 Guides는 시효가 지난 정보에 의존함으로써 발생하는 그 어떤 게임 내 결과에 대해서도 책임을 지지 않습니다.",
          ],
        },
        {
          title: "재정 또는 전문가 조언이 아님",
          paragraphs: [
            "모든 콘텐츠는 일반적인 정보 제공, 교육, 오락 목적으로만 제공됩니다. 이 사이트의 어떤 내용도 재정 조언, 투자 조언, 거래 조언, 또는 그 밖의 형태의 전문가 조언을 구성하지 않습니다.",
            "Path of Exile 2는 비디오 게임입니다. 가이드 콘텐츠는 절대 실제 돈과 관련하여 게임 내 아이템, 통화, 계정 또는 서비스를 사고, 팔거나, 거래하거나, 교환하라는 권고로 해석되어서는 안 됩니다. 우리는 어떤 형태의 실화폐 거래(RMT)도 중개, 권장, 후원하지 않습니다.",
            "이 사이트에서 찾은 정보를 바탕으로 내리는 모든 결정은 전적으로 본인의 책임입니다. 우리는 가이드, 빌드 추천, 전략 제안을 따름으로써 발생할 수 있는 그 어떤 손실 — 게임 내 여부를 불문하고 — 에 대해서도 책임을 지지 않습니다.",
          ],
        },
        {
          title: "외부 링크 및 타사 콘텐츠",
          paragraphs: [
            "Exile2 Guides에는 추가 맥락, 참고 자료, 커뮤니티 도구를 위한 외부 웹사이트로의 링크가 포함될 수 있습니다. 이러한 링크는 편의를 위해 제공되며 링크된 콘텐츠에 대한 보증을 의미하지 않습니다.",
            "우리는 외부 웹사이트의 콘텐츠, 정확성, 개인정보 보호 관행, 보안 조치, 가용성을 통제하지 않습니다. 링크를 포함한다고 해서 해당 사이트의 정보를 보증하는 것은 아닙니다.",
            "외부 웹사이트는 사전 예고 없이 언제든 콘텐츠, 구조, 가용성을 변경할 수 있습니다. 끊긴 링크나 오래된 외부 참조를 발견하면 문의 페이지를 통해 신고해 주세요.",
          ],
        },
        {
          title: "사용자 책임",
          paragraphs: [
            "Exile2 Guides의 정보, 가이드, 빌드, 전략 또는 기타 콘텐츠를 사용하는 것은 전적으로 본인의 책임입니다. 우리는 이 사이트의 어떠한 콘텐츠에 대해서도 완전성, 정확성, 신뢰성, 적합성, 가용성에 관한 명시적 또는 묵시적 보증이나 진술을 하지 않습니다.",
            "플레이어는 본인의 게임 내 결정, 캐릭터 빌드, 패시브 스킬 트리 배분, 아이템 구매, 통화 지출, 거래 활동, 게임 플레이 전략을 포함하여 단독으로 책임을 집니다.",
            "Exile2 Guides는 이 사이트의 콘텐츠 사용 또는 사용 불능으로 인해 발생하는 직접, 간접, 부수, 파생, 특별 손해에 대해 책임을 지지 않습니다. 여기에는 게임 내 진행, 아이템, 통화, 계정 상태 또는 그 밖의 가상·현실 손실이 포함되나 이에 국한되지 않습니다.",
          ],
        },
        {
          title: "공정 이용 및 지식재산권",
          paragraphs: [
            "게임 메커니즘, 아이템 이름, 스킬 설명, 보스 전략에 대한 이 사이트의 게임 관련 콘텐츠는 공정 이용 원칙에 따라 커뮤니티 제작 게임 가이드와 해설을 제공할 목적으로 사용됩니다.",
            "우리는 Grinding Gear Games 및 모든 기타 권리 보유자의 지식재산권을 존중합니다. 이 사이트의 콘텐츠가 귀하의 지식재산권을 침해한다고 판단되는 경우, 청구 세부 내용과 함께 " +
              contactEmail +
              " 으로 즉시 연락해 주세요.",
            "Exile2 Guides 팀이 만든 모든 독창적 편집 콘텐츠, 디자인 요소, 사이트 인프라는 사전 서면 동의 없이 복제, 배포 또는 상업적 목적으로 사용될 수 없습니다.",
          ],
        },
      ],
    },
    "privacy-policy": {
      description:
        "Exile2 Guides의 전체 개인정보 보호정책 — 데이터 관행, 쿠키 사용, 타사 서비스, GDPR 및 CCPA에 따른 귀하의 권리, 그리고 정보를 보호하는 방법.",
      title: "개인정보 보호정책",
      sections: [
        {
          title: "개요",
          paragraphs: [
            "이 개인정보 보호정책은 Exile2 Guides('우리', '당사')가 당사 웹사이트 방문자의 개인 데이터 및 개인정보를 어떻게 다루는지 설명합니다. 우리는 귀하의 개인정보를 보호하고 데이터 관행에 대해 투명하게 공개할 것을 약속합니다.",
            "이 정책은 지리적 위치와 무관하게 모든 사용자에게 적용됩니다. 이 사이트를 사용함으로써 귀하는 이 개인정보 보호정책을 읽고 이해했음을 인정합니다. 최종 업데이트: 2026년 7월.",
          ],
        },
        {
          title: "수집하는 정보",
          paragraphs: [
            "Exile2 Guides는 읽기 전용 정적 콘텐츠 웹사이트입니다. 우리는 개인 데이터를 수집, 저장, 처리 또는 전송하지 않습니다. 구체적으로:",
          ],
          bullets: [
            "사용자 등록, 계정, 그 어떤 형태의 인증도 요구하지 않습니다.",
            "이름, 이메일 주소, IP 주소 또는 그 밖의 개인식별정보를 수집하지 않습니다.",
            "방문자 정보를 기록하는 서버 측 로깅 시스템을 운영하지 않습니다.",
            "추적 픽셀, 웹 비콘, 브라우저 핑거프린팅 기법을 사용하지 않습니다.",
            "사용자 업로드, 댓글, 포럼 게시물 또는 그 밖의 사용자 생성 콘텐츠를 처리하지 않습니다.",
            "결제 시스템, 구독 서비스, 전자상거래 기능을 운영하지 않습니다.",
            "쿠키를 설정하거나 브라우저 저장소에 기록하지 않습니다(자세한 내용은 쿠키 정책 참조).",
          ],
        },
        {
          title: "데이터 관행 한눈에 보기",
          table: {
            headers: ["데이터 관행", "현재 상태"],
            rows: [
              ["사용자 계정 및 인증", "제공 안 함"],
              ["개인 데이터 수집", "수집 안 함"],
              ["서버 측 접근 로깅", "비활성화"],
              ["분석 및 추적", "비활성화"],
              ["광고 및 마케팅", "비활성화"],
              ["쿠키 및 LocalStorage", "의도적으로 사용 안 함"],
              ["문의 양식 제출", "비활성화(이메일만)"],
              ["사용자 생성 콘텐츠", "수락 안 함"],
              ["타사 데이터 공유", "없음"],
              ["사이트 간 추적", "없음"],
            ],
          },
        },
        {
          title: "쿠키 및 브라우저 저장소",
          paragraphs: [
            "Exile2 Guides는 의도적으로 쿠키를 설정하거나 그 어떤 형태의 브라우저 저장소에도 기록하지 않습니다. 분석 쿠키, 광고 쿠키, 환경설정 쿠키 또는 그 밖의 분류의 쿠키를 사용하지 않습니다.",
            "브라우저는 정적 리소스에 대한 표준 HTTP 캐시 항목을 생성할 수 있습니다. 이는 브라우저가 제어하며 개인 데이터를 포함하지 않고 표준 웹 캐싱 프로토콜에 따라 관리됩니다. 자세한 내용은 쿠키 정책을 참조해 주세요.",
          ],
        },
        {
          title: "타사 서비스",
          paragraphs: [
            "우리는 사용자 데이터를 수집하는 그 어떤 타사 서비스도 연동하지 않습니다. Google 애널리틱스, 데이터 수집이 포함된 Cloudflare 분석, Facebook 픽셀, Twitter 추적, Hotjar, Mixpanel 또는 그 밖의 데이터 수집 서비스를 사용하지 않습니다.",
            "이 사이트는 정적 파일을 제공하는 Cloudflare Pages에서 호스팅됩니다. Cloudflare의 인프라는 보안 및 성능을 위해 네트워크 수준에서 요청을 처리할 수 있으나, 당사는 자사 측에서 그 어떤 데이터 수집 기능도 구성하지 않습니다.",
            "이 사이트에는 자체 개인정보 보호정책에 따라 운영되는 외부 웹사이트로의 링크가 포함되어 있습니다. 개인 정보를 제공하기 전에 해당 정책을 검토하시길 권장합니다.",
          ],
        },
        {
          title: "귀하의 데이터 보호 권리",
          paragraphs: [
            "관할 지역에 따라 다음과 같은 데이터 보호 권리가 있을 수 있습니다:",
          ],
          bullets: [
            "접근권(GDPR 제15조) — 개인 데이터 사본 요청. 우리는 개인 데이터를 수집하지 않으므로 제공할 데이터가 없습니다.",
            "정정권(GDPR 제16조) — 부정확한 개인 데이터의 정정 요청. 당사는 개인 데이터를 보유하지 않으므로 해당 없음.",
            "삭제권(GDPR 제17조) — 개인 데이터 삭제 요청. 당사는 개인 데이터를 보유하지 않으므로 해당 없음.",
            "처리 제한권(GDPR 제18조) — 데이터 사용 방식에 대한 제한 요청. 당사는 개인 데이터를 보유하지 않으므로 해당 없음.",
            "데이터 이동권(GDPR 제20조) — 데이터 이전 요청. 당사는 개인 데이터를 보유하지 않으므로 해당 없음.",
            "CCPA — 캘리포니아 거주자는 알 권리, 삭제권, 판매 거부권, 차별 금지권을 가집니다. 우리는 개인 정보를 수집하거나 판매하지 않으므로 이러한 권리는 본질적으로 충족됩니다.",
          ],
        },
        {
          title: "아동의 개인정보 보호",
          paragraphs: [
            "Exile2 Guides는 13세 미만(또는 관할 지역의 적용 디지털 동의 연령) 아동으로부터 개인 데이터를 의도적으로 수집하지 않습니다. 어떠한 사용자로부터도 개인 데이터를 수집하지 않으므로 본질적으로 해당합니다.",
            "귀하가 부모 또는 보호자이고 예기치 않은 경로를 통해 아동이 개인 데이터를 제공했다고 판단되는 경우, 연락해 주시면 상황에 맞는 적절한 조치를 취하겠습니다.",
          ],
        },
        {
          title: "국가 간 데이터 전송",
          paragraphs: [
            "Exile2 Guides는 개인 데이터를 수집, 저장 또는 처리하지 않으므로 공개할 국가 간 데이터 전송이 없습니다. 정적 콘텐츠는 글로벌 콘텐츠 전송 네트워크를 통해 제공되지만, 이러한 전송에 개인 데이터가 포함되거나 파생되지 않습니다.",
          ],
        },
        {
          title: "이 개인정보 보호정책의 변경",
          paragraphs: [
            "우리는 관행, 기술, 법적 요건 또는 그 밖의 요소의 변화를 반영하기 위해 이 개인정보 보호정책을 수시로 업데이트할 수 있습니다. 중대한 변경 사항은 사이트의 눈에 띄는 공지를 통해 알립니다.",
            "이 페이지 상단의 '최종 업데이트' 날짜는 가장 최근 개정을 반영합니다. 변경 후에도 사이트를 계속 이용하는 것은 업데이트된 정책에 동의함을 의미합니다.",
            "개인 데이터 수집을 수반하는 관행을 도입하는 경우, 해당 관행이 시작되기 전에 이 정책이 전면적으로 재작성되며 영향받는 사용자에게 통지됩니다.",
          ],
        },
        {
          title: "문의하기",
          paragraphs: [
            "이 개인정보 보호정책 또는 당사의 데이터 관행에 대해 질문, 우려 또는 요청이 있으면 다음으로 연락해 주세요:",
            `Email: ${contactEmail}`,
            "당사는 적용 가능한 데이터 보호 규정에 따라 모든 개인정보 관련 문의에 30일 이내에 답변합니다.",
          ],
        },
      ],
    },
    "terms-of-use": {
      description:
        "Exile2 Guides 사용을 규율하는 전체 이용 약관 — 수락, 사용자 행동, 지식재산권, 면책, 책임 제한, 분쟁 해결.",
      title: "이용 약관",
      sections: [
        {
          title: "약관의 수락",
          paragraphs: [
            "이 이용 약관('약관')은 Exile2 Guides 웹사이트('사이트'), 사이트에서 또는 사이트를 통해 이용 가능한 모든 콘텐츠, 기능, 기능성에 대한 귀하의 접근 및 사용을 규율합니다.",
            "Exile2 Guides에 접근, 탐색 또는 사용함으로써 귀하는 이 약관 전체를 읽고 이해했으며 이에 구속되는 데 동의함을 인정합니다. 이 약관의 전부에 동의하지 않는 경우 사이트에 접근하거나 사용해서는 안 됩니다.",
            "이 약관은 귀하('사용자')와 Exile2 Guides 운영자 간의 법적 구속력 있는 계약을 구성합니다. 변경 후에도 사이트를 계속 이용하는 것은 해당 변경에 대한 수락을 의미합니다.",
          ],
        },
        {
          title: "서비스 설명",
          paragraphs: [
            "Exile2 Guides는 Path of Exile 2와 관련된 커뮤니티 제작 게임 가이드, 빌드 추천, 보스 전략, 아이템 데이터베이스, 스킬 참고 자료 및 그 밖의 정보 콘텐츠를 제공하는 무료, 읽기 전용, 정적 콘텐츠 웹사이트입니다.",
            "이 사이트는 사용자 계정, 대화형 기능, 사용자 생성 콘텐츠 제출, 전자상거래, 결제 처리 또는 정적 콘텐츠 표시 외의 그 어떤 서비스도 제공하지 않습니다.",
            "우리는 사전 예고 여부와 관계없이 사이트의 일부를 수정, 일시 중단 또는 중단할 권리를 보유합니다.",
          ],
        },
        {
          title: "이용 자격",
          paragraphs: [
            "Exile2 Guides는 일반 대중을 대상으로 합니다. 정적 콘텐츠에 접근하기 위한 최소 연령 요건은 없습니다. 그러나 귀하가 관할 지역의 성년 연령 미만인 경우 부모 또는 보호자와 함께 이 약관을 검토해야 합니다.",
            "이 사이트를 사용함으로써 귀하는 이 약관을 체결할 법적 능력이 있으며 귀하의 사용이 관할 지역의 적용 법률이나 규정을 위반하지 않음을 진술하고 보증합니다.",
          ],
        },
        {
          title: "허용된 사용",
          paragraphs: [
            "귀하는 개인적, 비상업적, 정보 제공 목적으로만 콘텐츠에 접근, 탐색, 사용할 수 있습니다.",
            "적절한 출처가 표시되고 링크가 사이트의 원본 콘텐츠로 안내하는 한, 소셜 미디어, 포럼 또는 그 밖의 플랫폼에 콘텐츠 링크를 공유할 수 있습니다.",
            "콘텐츠가 수정, 재게시 또는 재배포되지 않는 한, 개인 오프라인 참고를 위해 개별 페이지를 인쇄하거나 저장할 수 있습니다.",
          ],
        },
        {
          title: "금지된 행위",
          paragraphs: ["귀하는 다음 금지 활동에 참여하지 않을 것에 동의합니다:"],
          bullets: [
            "사전 서면 허가 없이 자동화 시스템(봇, 스크레이퍼, 크롤러)을 사용하여 콘텐츠에 접근, 수집 또는 모니터링.",
            "사이트, 그 서버 또는 연결된 시스템의 어떤 부분에든 무단 접근을 시도.",
            "서비스 거부 공격 개시, 부하 테스트 또는 사이트 운영을 방해하려는 그 밖의 시도.",
            "바이러스, 악성코드 또는 그 밖의 악의적 코드를 사이트를 통해 또는 사이트로 전송.",
            "어떤 사람이나 실체를 사칭하거나 귀하의 소속을 허위로 진술.",
            "불법적 목적 또는 지역, 국가, 국제 법률 위반을 위한 사이트 사용.",
            "사이트의 보안 조치나 접근 제어를 우회하거나 우회하려 시도.",
          ],
        },
        {
          title: "지식재산권",
          paragraphs: [
            "Exile2 Guides의 모든 독창적 콘텐츠 — 편집 텍스트, 가이드 구조, 데이터 편집물, 디자인 요소, 사이트 코드 포함 — 는 적용 가능한 저작권, 상표, 지식재산권 법으로 보호됩니다.",
            "사전 서면 동의 없이 그 어떤 독창적 콘텐츠도 복제, 배포, 수정, 2차적 저작물 작성, 공개적 전시 또는 상업적 이용을 할 수 없습니다.",
            "Path of Exile, Path of Exile 2 및 모든 관련 게임 자산은 Grinding Gear Games Limited의 상표입니다. 이 자료는 커뮤니티 가이드 및 해설 목적으로 공정 이용 원칙에 따라 사용됩니다. 우리는 Grinding Gear Games의 지식재산권을 주장하지 않습니다.",
            `어떤 콘텐츠가 귀하의 지식재산권을 침해한다고 판단되는 경우, 침해에 대한 자세한 설명과 함께 ${contactEmail}으로 연락해 주세요.`,
          ],
        },
        {
          title: "보증의 부인",
          paragraphs: [
            "EXILE2 GUIDES는 상품성, 특정 목적 적합성, 비침해를 포함하되 이에 국한되지 않는 명시적 또는 묵시적 보증의 여부와 관계없이 '있는 그대로' 및 '이용 가능한 대로' 기준으로 어떠한 종류의 보증도 없이 제공됩니다.",
            "우리는 사이트가 중단 없이, 오류 없이, 또는 완전히 안전하다고 보증하지 않습니다. 콘텐츠가 정확, 완전, 신뢰, 최신 또는 오류 없다고 보증하지 않습니다.",
            "게임 메커니즘은 업데이트로 인해 빈번히 변경됨을 인정합니다. 콘텐츠는 사전 예고 없이 언제든 오래될 수 있습니다. 우리는 그 어떤 가이드, 빌드 추천, 전략이 특정 결과를 낼 것이라고 보증하지 않습니다.",
            "사이트를 통해 다운로드하거나 얻은 그 어떤 자료도 귀하의 재량과 책임하에 접근됩니다. 귀하는 자료에 접근함으로써 발생하는 컴퓨터 시스템 손상이나 데이터 손실에 단독으로 책임을 집니다.",
          ],
        },
        {
          title: "책임의 제한",
          paragraphs: [
            "적용 가능한 법률이 허용하는 최대 한도 내에서, Exile2 Guides, 그 운영자, 기여자 또는 계열사는 사이트 사용 또는 사용 불능과 관련하여 발생하는 그 어떤 직접, 간접, 부수, 특별, 파생 또는 징벌적 손해에 대해서도 책임을 지지 않습니다.",
            "이 제한은 계약 위반, 불법 행위, 엄격한 책임 또는 그 밖의 법리에 기반 여부를 불문하고 게임 내 진행, 아이템, 통화, 계정 상태의 손실, 데이터 손실, 수익 또는 예상 이익의 손실, 및 그 밖의 간접, 특별, 부수, 파생, 징벌적 손해를 포함하되 이에 국한되지 않는 모든 형태의 손해에 적용됩니다.",
            "이러한 제한은 Exile2 Guides에 그러한 손해 가능성을 통지받았는지 여부와 관계없이 적용됩니다. 어떤 콘텐츠나 이 약관에 불만족하는 경우 귀하의 유일한 구제 수단은 사이트 사용을 중단하는 것입니다.",
          ],
        },
        {
          title: "면책",
          paragraphs: [
            "(a) 사이트에 대한 귀하의 접근 또는 사용, (b) 이 약관 위반, (c) 지식재산권, 개인정보 보호권 또는 독점권을 포함한 제3자 권리 위반, (d) 귀하의 콘텐츠나 행위가 제3자에게 손해를 야기했다는 청구를 포함하여, 귀하의 접근 또는 사이트 사용에서 발생하거나 그와 관련된 모든 청구, 책임, 손해, 손실, 비용, 지출(합리적인 법률 비용 포함)에 대해 Exile2 Guides, 그 운영자, 기여자 및 계열사를 면책하고 방어하며 손해를 입히지 않을 것에 동의합니다.",
          ],
        },
        {
          title: "약관의 수정",
          paragraphs: [
            "우리는 전적으로 우리 재량으로 언제든 이 약관을 수정할 권리를 보유합니다. 변경 시 이 페이지 상단의 '최종 업데이트' 날짜를 업데이트합니다. 중대한 변경 사항은 사이트의 눈에 띄는 공지를 통해 안내될 수 있습니다.",
            "어떤 수정에도 동의하지 않는 경우 사이트 사용을 중단해야 합니다. 변경 후에도 계속 사용하는 것은 수정된 약관에 대한 수락을 의미합니다.",
          ],
        },
        {
          title: "준거법 및 분쟁 해결",
          paragraphs: [
            "이 약관은 사이트 운영자가 기반을 둔 관할 지역의 법률에 따라 규율되고 해석되며, 법률 충돌 규정은 고려하지 않습니다.",
            "이 약관에서 발생하거나 이 약관과 관련된 그 어떤 분쟁도 우선 선의의 협상을 통해 해결하려 시도합니다. 협상이 실패하면 분쟁은 적용 관할 지역의 관할 법원에 제출됩니다.",
            "귀하는 모든 분쟁 해결 절차가 집단, 통합 또는 대표 소송이 아닌 개별 기초로만 진행될 것에 동의합니다.",
          ],
        },
        {
          title: "일반 조항",
          paragraphs: [
            "이 약관의 어떤 조항이 집행 불가능하거나 무효인 것으로 판명되는 경우, 이 약관의 나머지 부분이 완전한 효력을 유지하도록 그 조항은 최소한의 범위 내에서 제한되거나 삭제됩니다.",
            "이 약관의 어떤 권리나 조항을 집행하지 않는 것은 그러한 권리의 포기를 의미하지 않습니다. 어떤 권리나 조항의 포기는 서면으로 작성되고 적법하게 권한을 부여받은 대표자가 서명한 경우에만 효력이 있습니다.",
            "이 약관은 개인정보 보호정책, 쿠키 정책, 면책 고지와 함께 귀하와 Exile2 Guides 간의 사이트 사용에 관한 전체 계약을 구성합니다.",
          ],
        },
        {
          title: "연락처 정보",
          paragraphs: [
            `이 이용 약관에 대한 질문이 있으면 ${contactEmail}으로 연락해 주세요.`,
          ],
        },
      ],
    },
  },
  tr: {
    about: {
      description:
        "Exile2 Guides'un bağımsız olarak nasıl işletildiğini, araştırıldığını ve gayri resmi bir Path of Exile 2 rehberi kaynağı olarak yayınlandığını öğrenin.",
      title: "Exile2 Guides Hakkında",
      sections: [
        {
          title: "Misyonumuz",
          paragraphs: [
            "Exile2 Guides, tek bir geliştirici tarafından bağımsız olarak işletilen gayri resmi bir Path of Exile 2 rehberi kaynağıdır. Amaç, araştırma özetlerini kişisel oyun deneyimi gibi sunmadan, yama farkında faydalı yanıtları düzenlemektir.",
            "Site salt okunur ve ücretsiz erişilebilirdir. Makaleler, yapılandırılmış araştırma ve otomatik kalite kontrollerinden sonra yayınlanır; belirsizlik ve doğrulama sınırları gerektiğinde sayfada gösterilir.",
          ],
        },
        {
          title: "Kapsamımız",
          connectionLinks: [
            {
              description:
                "Her sınıf için seviyeleme build'leri, endgame kurulumları, eşya öncelikleri, pasif ağaç yolları ve gem bağlantı yapılandırmaları.",
              href: "/en/builds/",
              label: "Build'ler",
            },
            {
              description:
                "Boss mekanikleri, faz ayrıntıları, düşürme tabloları, direnç gereksinimleri ve adım adım strateji rehberleri.",
              href: "/en/bosses/",
              label: "Boss'lar",
            },
            {
              description:
                "Nadir eşya veritabanları, para birimi mekanikleri, işçilik referansları ve önek/sonek kademe açıklamaları.",
              href: "/en/items/",
              label: "Eşyalar",
            },
            {
              description:
                "Aktif skill gemi incelemeleri, destek gemi eşleştirmeleri, ölçeklenme mekanikleri ve seviye ilerleme verileri.",
              href: "/en/skills/",
              label: "Skill'ler",
            },
            {
              description:
                "Mekanik derinlemesine incelemeler, yeni başlayan eğitimleri, SSS yanıtları ve genel ilerleme rehberleri.",
              href: "/en/guides/",
              label: "Rehberler",
            },
          ],
        },
        {
          title: "Editöryal Standartlar",
          paragraphs: [
            "Makaleler; resmi yama notları, güncel veritabanları, oturmuş topluluk rehberleri, oyun görüntüleri ve oyuncu tartışmaları kullanılarak araştırılır. İddialar mümkün olduğunda kaynaklarına bağlanır ve ilgili yama bağlamıyla yazılır.",
            "Otomatik QA, bir makale yayınlanmadan önce içerik yapısını, gerekli meta verileri, dahili bağlantıları, yayın durumunu, indekslenebilirliği ve derleme çıktısını kontrol eder.",
            "Bir sonuç oyun içinde kişisel olarak test edilmediyse, birincil elden test edilmiş değil kaynakla doğrulanmış olarak sunulur. Sürüme duyarlı belirsizlik, özgüvenli ifadelerin arkasına gizlenmek yerine görünür kalır.",
          ],
        },
        {
          title: "Bağımsızlık",
          paragraphs: [
            "Exile2 Guides bağımsız, hayran yapımı bir kaynaktır. Grinding Gear Games veya başka herhangi bir şirketle bağlı, onaylı veya sponsorlu değildir.",
            "Yayın, tek bir operatör tarafından yürütülür ve araştırma süreci, gerçekleştirilmemiş birincil oyun içi testi tamamlanmış gibi sunmaz.",
          ],
        },
        {
          title: "Düzeltmeler ve Geri Bildirim",
          paragraphs: [
            "Oyun mekanikleri sık sık değişir ve hiçbir rehber mükemmel değildir. Gerçek bir hata, güncel olmayan bir mekanik veya eksik bir kaynak bulursanız, lütfen İletişim sayfamız üzerinden veya doğrudan e-postayla bize ulaşın.",
            "Düzeltmeler ve telif hakkı bildirimleri zaman elverdikçe incelenir. Yüksek etkili gerçek hatalar önceliklidir, ancak yanıt süreleri garanti edilmez.",
          ],
        },
      ],
    },
    contact: {
      description:
        "İçerik düzeltmeleri, telif hakkı bildirimleri veya genel geri bildirim için bağımsız Exile2 Guides operatörüyle iletişime geçin.",
      title: "Bize Ulaşın",
      sections: [
        {
          title: "İletişime Geçin",
          paragraphs: [
            `Tek halka açık iletişim kanalı e-postadır: ${contactEmail}. Düzeltmeleri ve telif hakkı bildirimlerini zaman elverdikçe inceliyoruz. Yüksek etkili gerçek hatalar önceliklidir, ancak yanıt süreleri garanti edilmez.`,
            "Bu, sunucu taraflı bir iletişim formu olmayan salt okunur statik bir sitedir. Lütfen aşağıdaki doğrudan e-posta bağlantısını kullanın; isteğinizi sessizce atabilecek bir mesaj gönderme düğmesi yoktur.",
          ],
          connectionLinks: [
            {
              description:
                "Bir düzeltme, telif hakkı bildirimi veya başka bir not göndermek için e-posta istemcinizi açın.",
              href: `mailto:${contactEmail}`,
              label: contactEmail,
            },
          ],
        },
        {
          title: "İletişim Senaryoları",
          issueCards: [
            {
              description:
                "Hatanın bulunduğu tam sayfa URL'sini, yanlış olan özel iddiayı, test ettiğiniz oyun sürümünü veya yamasını ve güvenilir bir kaynağı ya da net yeniden üretim adımlarını ekleyin.",
              title: "İçerik düzeltmesi",
            },
            {
              description:
                "Varlık veya sayfa URL'sini, telif haklı materyalin açıklamasını, mülkiyet veya yetkilendirme kanıtını ve talep ettiğiniz özel işlemi sağlayın.",
              title: "Telif hakkı veya atıf",
            },
            {
              description:
                "Hangi alanın ilginizi çektiğini — build'ler, boss'lar, eşyalar, skill'ler veya genel site deneyimi — ve ayrıntılı önerinizi belirtin.",
              title: "Genel geri bildirim",
            },
          ],
        },
        {
          title: "Neler Eklenmeli",
          bullets: [
            "Sorunun göründüğü tam sayfa URL'si ve mümkünse bir ekran görüntüsü veya alıntılanmış metin.",
            "Düzeltme için güvenilir bir kaynak — resmi yama notları, güncel bir veritabanı girdisi veya net bir topluluk testi/raporu.",
            "Herhangi bir mekanik tutarsızlığı için net yeniden üretim ayrıntıları; biliniyorsa oyun sürümü ve ilgili kurulum dahil.",
            "Sorgunuzu yanıtlamak için gereken minimum kişisel bilgi.",
          ],
        },
        {
          title: "İnceleme Politikası",
          paragraphs: [
            "Düzeltmeleri ve telif hakkı bildirimlerini zaman elverdikçe inceliyoruz. Yüksek etkili gerçek hatalar önceliklidir, ancak yanıt süreleri garanti edilmez.",
          ],
        },
      ],
    },
    "cookie-policy": {
      description:
        "Exile2 Guides için eksiksiz çerez ve tarayıcı depolama açıklaması — çerezlerin ne olduğu, neleri kullandığımız, üçüncü taraf çerezleri ve tercihlerinizi yönetme yöntemi.",
      title: "Çerez Politikası",
      sections: [
        {
          title: "Çerezler Nelerdir",
          paragraphs: [
            "Çerezler, bir web sitesini ziyaret ettiğinizde web sitesinin bilgisayarınıza, telefonunuza veya diğer internete bağlı cihazınıza depoladığı küçük metin dosyalarıdır. Web sitelerinin doğru çalışmasını sağlamak, performansı iyileştirmek, kullanıcı tercihlerini hatırlamak ve site operatörlerine bilgi sağlamak için yaygın olarak kullanılırlar.",
            "Web siteleri, LocalStorage, SessionStorage veya IndexedDB (topluca 'tarayıcı depolama') gibi benzer teknolojiler de kullanabilir. Bu sayfada 'çerez' ifadesi, aksi belirtilmedikçe bu tür tüm teknolojileri kapsar.",
          ],
        },
        {
          title: "Çerezleri Nasıl Kullanıyoruz",
          paragraphs: [
            "Exile2 Guides bilerek hiçbir çerez ayarlamaz veya tarayıcı depolamasına yazmaz. Oturum çerezleri, kalıcı çerezler, izleme pikselleri, parmak izi komut dosyaları veya cihazınıza veri depolayan başka herhangi bir mekanizma kullanmayız.",
            "Sitemiz analiz hizmetleri, reklam ağları, sosyal medya widget'ları, gömülü üçüncü taraf içerik veya çerez tabanlı veri toplamayı gerektiren başka herhangi bir özellik kullanmaz.",
            "Tarayıcınız yine de statik varlıklarımız (HTML, CSS, JavaScript, görseller) için standart HTTP önbellek girişleri oluşturabilir. Bunlar tamamen tarayıcınız tarafından kontrol edilir, hiçbir kişisel veri içermez ve standart web önbellekleme protokollerine göre yönetilir.",
          ],
        },
        {
          title: "Çerez Kategorileri",
          table: {
            headers: ["Çerez kategorisi", "Amaç", "Süre", "Sitedeki durumu"],
            rows: [
              [
                "Kesinlikle gerekli",
                "Site işlevselliği, güvenlik, yük dengeleme",
                "Oturum",
                "Kullanılmıyor",
              ],
              [
                "Tercihler",
                "Dil, tema, görüntü ayarları",
                "En fazla 1 yıl",
                "Kullanılmıyor",
              ],
              [
                "Analitik",
                "Kullanım istatistikleri, sayfa performansı",
                "En fazla 2 yıl",
                "Kullanılmıyor",
              ],
              [
                "Reklam",
                "Reklam hedefleme, kampanya takibi",
                "En fazla 2 yıl",
                "Kullanılmıyor",
              ],
              [
                "Sosyal medya",
                "Sosyal paylaşım, gömülü içerik",
                "Değişir",
                "Kullanılmıyor",
              ],
            ],
          },
        },
        {
          title: "Üçüncü Taraf Çerezler",
          paragraphs: [
            "Exile2 Guides, cihazınıza çerez ayarlayacak hiçbir üçüncü taraf hizmetini gömmez. Google Analytics, Facebook Pixel, Twitter widget'ları, YouTube gömmeleri, Disqus yorumları veya harici veri toplamayı içeren başka hiçbir üçüncü taraf entegrasyonunu kullanmayız.",
            "Sitemiz; topluluk wiki'leri, resmi yama notları, hayran araçları ve yayın platformları dahil olmak üzere harici web sitelerine bağlantılar içerir. Bu harici sitelerin kendilerine ait, bizimkinden bağımsız çerez politikaları vardır.",
          ],
        },
        {
          title: "Çerez Kullanımındaki Gelecek Değişiklikler",
          paragraphs: [
            "Bu sitenin gelecekteki bir sürümü, dil tercihi kalıcılığı, karanlık mod değiştirme, kullanım analitiği veya reklam gibi çerez veya tarayıcı depolaması gerektiren özellikler getirirse, bu özellikler etkinleştirilmeden önce bu sayfa güncellenir.",
            "Her yeni çerez veya depolama mekanizması, adı, sağlayıcısı, amacı, azami süresi ve size sunulan gizlilik kontrolleriyle birlikte burada belgelenecektir. Yasal olarak gerektiğinde, gerekli olmayan çerezleri ayarlamadan önce onay mekanizmaları uygulayacağız.",
          ],
        },
        {
          title: "Çerezleri Tarayıcınızda Yönetme",
          paragraphs: [
            "Web sitelerinin cihazınızda çerezleri nasıl kullandığını kontrol etme hakkına sahipsiniz. Çoğu modern tarayıcı aşağıdaki kontrolleri sağlar:",
          ],
          bullets: [
            "Mevcut çerezleri görüntüleme ve silme — her web sitesi tarafından depolanan tüm çerezleri görün ve bunları tek tek veya toplu olarak kaldırın.",
            "Tüm çerezleri engelleme — hiçbir web sitesinin çerez depolamasını engeller. Bu, bazı sitelerin çalışmamasına neden olabilir.",
            "Üçüncü taraf çerezlerini engelleme — yalnızca doğrudan ziyaret ettiğiniz web sitesinin çerezlerine izin verir.",
            "Gizli veya özel mod — tarama oturumunu kapattığınızda tüm çerezleri otomatik olarak siler.",
          ],
        },
        {
          title: "Tarayıcıya Özel Talimatlar",
          bullets: [
            "Google Chrome — Ayarlar > Gizlilik ve güvenlik > Çerezler ve diğer site verileri",
            "Mozilla Firefox — Ayarlar > Gizlilik ve Güvenlik > Çerezler ve Site Verileri",
            "Apple Safari — Tercihler > Gizlilik > Çerezler ve web sitesi verileri",
            "Microsoft Edge — Ayarlar > Çerezler ve site izinleri > Çerezleri yönet ve sil",
            "Opera — Ayarlar > Gelişmiş > Gizlilik ve güvenlik > Site ayarları > Çerezler",
          ],
        },
        {
          title: "Bize Ulaşın",
          paragraphs: [
            `Çerez uygulamalarımızla ilgili sorularınız varsa lütfen ${contactEmail} adresinden bize ulaşın.`,
          ],
        },
      ],
    },
    disclaimer: {
      description:
        "Exile2 Guides için önemli yasal feragatler — gayri resmi durum, içerik doğruluğu, mali tavsiye, harici bağlantılar ve kullanıcı sorumluluğu.",
      title: "Sorumluluk Reddi",
      sections: [
        {
          title: "Gayri Resmi Hayran Yapımı Kaynak",
          paragraphs: [
            "Exile2 Guides bağımsız, gayri resmi bir hayran yapımı web sitesidir. Path of Exile 2'nin geliştiricisi ve yayıncısı olan Grinding Gear Games Limited ('GGG') ile bağlı, onaylı, sponsorlu veya başka şekilde ilişkili değildir.",
            "Path of Exile, Path of Exile 2, Grinding Gear Games ve tüm ilgili logolar, karakterler, adlar, sanat eserleri ve diğer materyaller Grinding Gear Games Limited'in ticari markaları veya tescilli ticari markalarıdır. Tüm hakları sahiplerine aittir. Bu sitede bu materyallerin kullanımı yalnızca bilgilendirme ve hayran topluluğu amaçlıdır ve GGG ile herhangi bir ilişkiyi veya GGG tarafından onaylandığını ima etmez.",
            "Grinding Gear Games'e ait kamuya açık olmayan oyun verilerine, dahili geliştirme sürümlerine, gizli sunucu bilgilerine veya diğer özel materyallerine erişimimiz yoktur.",
          ],
        },
        {
          title: "İçerik Doğruluğu ve Güncelliği",
          paragraphs: [
            "Tüm rehber içeriğinin yayın anında doğru, kaynaklı ve güncel olmasını sağlamak için çaba gösteririz. Ancak Path of Exile 2, oyun mekaniklerini, eşya özelliklerini, skill davranışlarını ve ilerleme sistemlerini değiştirebilecek sık güncellemeler, denge değişiklikleri, düzeltmeler ve büyük yamalar alan canlı bir hizmet oyunudur.",
            "Sonuç olarak, yazıldığı sırada doğru olan bilgiler bir oyun güncellemesinden sonra eskiyebilir veya yanlış hale gelebilir. Her makalenin her yamanın hemen ardından güncelleneceğini garanti edemeyiz.",
            "Okuyucular, önemli oyun kararları vermeden önce rehber bilgilerini her zaman en güncel resmi yama notları, oyun içi ipuçları ve topluluk testleriyle çapraz kontrol etmelidir. Exile2 Guides, eskiyen bilgilere dayanmaktan kaynaklanan hiçbir oyun içi sonuçtan sorumlu değildir.",
          ],
        },
        {
          title: "Mali veya Profesyonel Tavsiye Değildir",
          paragraphs: [
            "Tüm içerik yalnızca genel bilgilendirme, eğitim ve eğlence amaçlı sağlanmaktadır. Bu sitedeki hiçbir şey mali tavsiye, yatırım tavsiyesi, alım satım tavsiyesi veya diğer herhangi bir profesyonel tavsiye niteliği taşımaz.",
            "Path of Exile 2 bir video oyunudur. Rehber içeriği, gerçek para karşılığında herhangi bir oyun içi eşyayı, para birimini, hesabı veya hizmeti satın alma, satma, takas etme veya değiştirme önerisi olarak asla yorumlanmamalıdır. Gerçek para ticaretini (RMT) hiçbir şekilde kolaylaştırmıyor, teşvik etmiyor veya desteklemiyoruz.",
            "Bu sitede bulunan bilgilere dayanarak verdiğiniz tüm kararlar kendi sorumluluğunuzdadır. Rehberlerimizi, build önerilerimizi veya strateji önerilerimizi takip etmekten kaynaklanabilecek, oyun içi veya diğer, hiçbir kayıptan sorumlu değiliz.",
          ],
        },
        {
          title: "Harici Bağlantılar ve Üçüncü Taraf İçerik",
          paragraphs: [
            "Exile2 Guides, ek bağlam, referans materyali veya topluluk araçları için harici web sitelerine bağlantılar içerebilir. Bu bağlantılar kolaylık sağlamak amacıyla verilir ve bağlantılı içeriğin onaylandığı anlamına gelmez.",
            "Harici bir web sitesinin içeriği, doğruluğu, gizlilik uygulamaları, güvenlik önlemleri veya kullanılabilirliği üzerinde kontrolümüz yoktur. Bir bağlantı içermesi, o sitede sunulan bilgiyi onayladığımız anlamına gelmez.",
            "Harici web siteleri herhangi bir zamanda, önceden haber vermeden içeriklerini, yapısını veya kullanılabilirliğini değiştirebilir. Bozuk bir bağlantı veya güncel olmayan harici bir referansla karşılaşırsanız, lütfen İletişim sayfamız üzerinden bildirin.",
          ],
        },
        {
          title: "Kullanıcı Sorumluluğu",
          paragraphs: [
            "Exile2 Guides'taki herhangi bir bilgi, rehber, build, strateji veya diğer içeriği kullanımınız tamamen kendi sorumluluğunuzdadır. Bu sitedeki herhangi bir içeriğin eksiksizliği, doğruluğu, güvenilirliği, uygunluğu veya kullanılabilirliği konusunda açık veya zımni hiçbir garanti veya beyanda bulunmayız.",
            "Oyuncular, karakter build'leri, pasif skill ağacı dağılımları, eşya satın alımları, para birimi harcamaları, takas faaliyetleri ve oyun stratejisi dahil olmak üzere kendi oyun içi kararlarından münhasıran sorumludur.",
            "Exile2 Guides, bu sitedeki herhangi bir içeriğin kullanımından veya kullanılamamasından kaynaklanan doğrudan, dolaylı, arızi, sonuç olarak ortaya çıkan veya özel zararlardan sorumlu tutulamaz. Bu, oyun içi ilerleme, eşya, para birimi, hesap durumu veya diğer sanal veya gerçek kayıplar dahil ancak bunlarla sınırlı olmamak üzere.",
          ],
        },
        {
          title: "Adil Kullanım ve Fikri Mülkiyet",
          paragraphs: [
            "Bu sitedeki oyunla ilgili içerik — oyun mekaniklerine, eşya adlarına, skill açıklamalarına ve boss stratejilerine atıflar dahil — topluluk tarafından oluşturulan oyun rehberleri ve yorumları sağlama ilkesi uyarınca adil kullanım kapsamında kullanılır.",
            "Grinding Gear Games ve diğer tüm hak sahiplerinin fikri mülkiyet haklarına saygı duyarız. Bu sitedeki herhangi bir içeriğin fikri mülkiyet haklarınızı ihlal ettiğine inanıyorsanız, lütfen iddiânızın ayrıntılarıyla birlikte " +
              contactEmail +
              " adresinden derhal bize ulaşın.",
            "Exile2 Guides ekibi tarafından oluşturulan tüm orijinal editöryal içerik, tasarım öğeleri ve site altyapısı, önceden yazılı izin olmaksızın çoğaltılamaz, dağıtılamaz veya ticari amaçlarla kullanılamaz.",
          ],
        },
      ],
    },
    "privacy-policy": {
      description:
        "Exile2 Guides için eksiksiz gizlilik politikası — veri uygulamaları, çerez kullanımı, üçüncü taraf hizmetler, GDPR ve CCPA kapsamındaki haklarınız ve bilgilerinizi koruma yöntemimiz.",
      title: "Gizlilik Politikası",
      sections: [
        {
          title: "Genel Bakış",
          paragraphs: [
            "Bu Gizlilik Politikası, Exile2 Guides ('biz', 'bizim') olarak web sitemizi ziyaret edenlerin kişisel verilerini ve gizliliğini nasıl ele aldığımızı açıklar. Gizliliğinizi korumayı ve veri uygulamalarımız konusunda şeffaf olmayı taahhüt ediyoruz.",
            "Bu politika, coğrafi konumdan bağımsız olarak tüm kullanıcılara uygulanır. Bu siteyi kullanarak bu Gizlilik Politikasını okuduğunuzu ve anladığınızı kabul edersiniz. Son güncelleme: Temmuz 2026.",
          ],
        },
        {
          title: "Topladığımız Bilgiler",
          paragraphs: [
            "Exile2 Guides salt okunur, statik bir içerik web sitesidir. Hiçbir kişisel veri toplamayız, depolamayız, işleme koymayız veya iletmeyiz. Özellikle:",
          ],
          bullets: [
            "Kullanıcı kaydı, hesap veya herhangi bir kimlik doğrulama türü gerektirmiyoruz.",
            "İsim, e-posta adresleri, IP adresleri veya diğer kişisel olarak tanımlanabilir bilgileri toplamıyoruz.",
            "Ziyaretçi bilgilerini kaydeden sunucu taraflı günlükleme sistemleri çalıştırmıyoruz.",
            "İzleme pikselleri, web işaretçileri veya tarayıcı parmak izi teknikleri kullanmıyoruz.",
            "Kullanıcı yüklemelerini, yorumlarını, forum gönderilerini veya diğer kullanıcı tarafından oluşturulan içeriği işlemiyoruz.",
            "Ödeme sistemleri, abonelik hizmetleri veya e-ticaret işlevselliği çalıştırmıyoruz.",
            "Çerez ayarlamıyor veya tarayıcı depolamasına yazmıyoruz (ayrıntılar için Çerez Politikamıza bakın).",
          ],
        },
        {
          title: "Veri Uygulamalarımıza Genel Bakış",
          table: {
            headers: ["Veri uygulaması", "Mevcut durum"],
            rows: [
              ["Kullanıcı hesapları ve kimlik doğrulama", "Mevcut değil"],
              ["Kişisel veri toplama", "Toplanmadı"],
              ["Sunucu taraflı erişim günlüğü", "Etkin değil"],
              ["Analitik ve izleme", "Etkin değil"],
              ["Reklam ve pazarlama", "Etkin değil"],
              ["Çerezler ve LocalStorage", "Bilerek kullanılmıyor"],
              ["İletişim formu gönderimleri", "Etkin değil (yalnızca e-posta)"],
              ["Kullanıcı tarafından oluşturulan içerik", "Kabul edilmiyor"],
              ["Üçüncü taraf veri paylaşımı", "Yok"],
              ["Siteler arası izleme", "Yok"],
            ],
          },
        },
        {
          title: "Çerezler ve Tarayıcı Depolaması",
          paragraphs: [
            "Exile2 Guides bilerek çerez ayarlamaz veya herhangi bir tarayıcı depolama biçimine yazmaz. Analitik çerezleri, reklam çerezleri, tercih çerezleri veya diğer herhangi bir çerez kategorisi kullanmayız.",
            "Tarayıcınız statik varlıklarımız için standart HTTP önbellek girişleri oluşturabilir. Bunlar tarayıcınız tarafından kontrol edilir, hiçbir kişisel veri içermez ve standart web önbellekleme protokollerine göre yönetilir. Kapsamlı bilgi için lütfen Çerez Politikamıza bakın.",
          ],
        },
        {
          title: "Üçüncü Taraf Hizmetler",
          paragraphs: [
            "Kullanıcı verisi toplayan hiçbir üçüncü taraf hizmetini entegre etmiyoruz. Google Analytics, veri toplama içeren Cloudflare analitiği, Facebook Pixel, Twitter izleme, Hotjar, Mixpanel veya diğer veri toplayan hizmetleri kullanmıyoruz.",
            "Sitemiz statik dosyalar sunan Cloudflare Pages üzerinde barındırılır. Cloudflare'in altyapısı, güvenlik ve performans için ağ düzeyinde istekleri işleyebilir, ancak biz kendi tarafımızda hiçbir veri toplama özelliği yapılandırmıyoruz.",
            "Sitemiz, kendi gizlilik politikalarına göre çalışan harici web sitelerine bağlantılar içerir. Herhangi bir kişisel bilgi sağlamadan önce bu politikaları incelemenizi öneririz.",
          ],
        },
        {
          title: "Veri Koruma Haklarınız",
          paragraphs: [
            "Yargı bölgenize bağlı olarak aşağıdaki veri koruma haklarına sahip olabilirsiniz:",
          ],
          bullets: [
            "Erişim hakkı (GDPR Madde 15) — kişisel verilerinizin kopyalarını talep etme. Kişisel veri toplamadığımız için sağlanacak veri yoktur.",
            "Düzeltme hakkı (GDPR Madde 16) — yanlış kişisel verilerin düzeltilmesini talep etme. Hiç kişisel veri tutmadığımız için uygulanamaz.",
            "Silme hakkı (GDPR Madde 17) — kişisel verilerinizin silinmesini talep etme. Hiç kişisel veri tutmadığımız için uygulanamaz.",
            "İşlemeyi sınırlandırma hakkı (GDPR Madde 18) — verilerinizi kullanma biçimimize ilişkin sınırlar talep etme. Hiç kişisel veri tutmadığımız için uygulanamaz.",
            "Veri taşınabilirliği hakkı (GDPR Madde 20) — verilerinizin aktarılmasını talep etme. Hiç kişisel veri tutmadığımız için uygulanamaz.",
            "CCPA — Kaliforniya sakinleri; öğrenme, silme, satıştan vazgeçme ve ayrımcılık yapmama haklarına sahiptir. Kişisel bilgi toplamadığımız veya satmadığımız için bu haklar doğası gereği karşılanmıştır.",
          ],
        },
        {
          title: "Çocukların Gizliliği",
          paragraphs: [
            "Exile2 Guides, 13 yaşın altındaki (veya yargı bölgenizdeki geçerli dijital rıza yaşı) çocuklardan bilerek kişisel veri toplamaz. Hiçbir kullanıcıdan kişisel veri toplamadığımız için bu doğası gereği geçerlidir.",
            "Ebeveyn veya vasiyseniz ve öngörülmeyen bir mekanizma yoluyla bir çocuğun kişisel veri sağladığına inanıyorsanız, lütfen bizimle iletişime geçin; duruma uygun adımları atacağız.",
          ],
        },
        {
          title: "Uluslararası Veri Transferleri",
          paragraphs: [
            "Exile2 Guides kişisel veri toplamadığı, depolamadığı veya işlemediği için açıklanacak uluslararası veri transferi yoktur. Statik içeriğimiz küresel bir içerik dağıtım ağı üzerinden sunulur, ancak bu teslimatların hiçbirine kişisel veri dahil edilmez veya bunlardan türetilmez.",
          ],
        },
        {
          title: "Bu Gizlilik Politikasındaki Değişiklikler",
          paragraphs: [
            "Uygulamalarımızdaki, teknolojideki, yasal gerekliliklerdeki veya diğer faktörlerdeki değişiklikleri yansıtmak için bu Gizlilik Politikasını zaman zaman güncelleyebiliriz. Maddi değişiklikler, sitede belirgin bir bildirimle duyurulacaktır.",
            "Bu sayfanın üstündeki 'Son güncelleme' tarihi en son revizyonu yansıtır. Değişikliklerden sonra sitenin kullanılmaya devam edilmesi, güncellenmiş politikayı kabul anlamına gelir.",
            "Kişisel veri toplamayı içeren uygulamalar getirirsek, bu uygulamalar başlamadan önce bu politika kapsamlı şekilde yeniden yazılacak ve etkilenen kullanıcılara bildirim gönderilecektir.",
          ],
        },
        {
          title: "Bize Ulaşın",
          paragraphs: [
            "Bu Gizlilik Politikası veya veri uygulamalarımız hakkında sorularınız, endişeleriniz veya talepleriniz varsa lütfen şu adresten bize ulaşın:",
            `Email: ${contactEmail}`,
            "Uygulanabilir veri koruma yönetmeliklerine uygun olarak tüm gizlilikle ilgili soruları 30 gün içinde yanıtlayacağız.",
          ],
        },
      ],
    },
    "terms-of-use": {
      description:
        "Exile2 Guides kullanımınızı düzenleyen eksiksiz hüküm ve koşullar — kabul, kullanıcı davranışı, fikri mülkiyet, feragatler, sorumluluk sınırlamaları ve uyuşmazlık çözümü.",
      title: "Kullanım Şartları",
      sections: [
        {
          title: "Şartların Kabulü",
          paragraphs: [
            "Bu Kullanım Şartları ('Şartlar'), Exile2 Guides web sitesine ('Site') erişiminizi ve kullanımınızı, sitede veya site aracılığıyla kullanılabilir olan tüm içerik, özellik ve işlevselliği kapsar.",
            "Exile2 Guides'a erişerek, göz atarak veya kullanarak, bu Şartların tamamını okuduğunuzu, anladığınızı ve tümüyle bağlı olmayı kabul ettiğinizi kabul edersiniz. Bu Şartların tamamına katılmıyorsanız, siteye erişmemeli veya kullanmamalısınız.",
            "Bu Şartlar, siz ('Kullanıcı') ile Exile2 Guides operatörleri arasında yasal olarak bağlayıcı bir sözleşme teşkil eder. Herhangi bir değişikliğin ardından sitenin kullanılmaya devam edilmesi, söz konusu değişikliklerin kabulü anlamına gelir.",
          ],
        },
        {
          title: "Hizmetin Açıklaması",
          paragraphs: [
            "Exile2 Guides, Path of Exile 2 ile ilgili topluluk tarafından oluşturulan oyun rehberleri, build önerileri, boss stratejileri, eşya veritabanları, skill referansları ve diğer bilgilendirici içeriği sağlayan ücretsiz, salt okunur, statik bir içerik web sitesidir.",
            "Site, kullanıcı hesapları, etkileşimli özellikler, kullanıcı tarafından oluşturulan içerik gönderimi, e-ticaret, ödeme işleme veya statik içerik görüntülemenin ötesinde herhangi bir hizmet sunmaz.",
            "Sitenin herhangi bir bölümünü zaman zaman, önceden haber verip vermemeye bakılmaksızın değiştirme, askıya alma veya durdurma hakkını saklı tutarız.",
          ],
        },
        {
          title: "Uygunluk",
          paragraphs: [
            "Exile2 Guides genel izleyici kitlesine yöneliktir. Statik içeriğimize erişmek için minimum yaş gereksinimi yoktur. Ancak, yargı bölgenizdeki reşit olma yaşının altındaysanız, bu Şartları bir ebeveyn veya vasi ile birlikte incelemelisiniz.",
            "Bu siteyi kullanarak, bu Şartlara girme yasal kapasitesine sahip olduğunuzu ve kullanımınızın yargı bölgenizdeki geçerli yasa veya yönetmelikleri ihlal etmediğini beyan ve taahhüt edersiniz.",
          ],
        },
        {
          title: "İzne Tabi Kullanım",
          paragraphs: [
            "İçeriğe yalnızca kişisel, ticari olmayan, bilgilendirme amaçlı erişebilir, göz atabilir ve kullanabilirsiniz.",
            "Uygun atıf yapıldığı ve bağlantıların kullanıcıları sitemizdeki orijinal içeriğe yönlendirdiği sürece, içerik bağlantılarımızı sosyal medyada, forumlarda veya diğer platformlarda paylaşabilirsiniz.",
            "İçerik değiştirilmediği, yeniden yayınlanmadığı veya yeniden dağıtılmadığı sürece, kişisel çevrimdışı referans için tek tek sayfaları yazdırabilir veya kaydedebilirsiniz.",
          ],
        },
        {
          title: "Yasaklanmış Davranış",
          paragraphs: [
            "Aşağıdaki yasaklanmış etkinliklerden hiçbirine katılmamayı kabul edersiniz:",
          ],
          bullets: [
            "Önceden yazılı izin olmaksızın otomatik sistemler (botlar, kazıyıcılar, tarayıcılar) kullanarak içeriğe erişme, toplama veya izleme.",
            "Sitenin, sunucularının veya bağlı sistemlerinin herhangi bir bölümüne yetkisiz erişim sağlamayı deneme.",
            "Hizmet reddi saldırıları başlatma, yük testi yapma veya sitenin işleyişini aksatmaya yönelik diğer girişimler.",
            "Siteye veya site aracılığıyla virüs, kötü amaçlı yazılım veya diğer zararlı kodları iletme.",
            "Herhangi bir kişi veya kuruluşu taklit etme veya herhangi bir kişi veya kuruluşla olan ilişkinizi yanlış beyan etme.",
            "Siteyi herhangi bir yasadışı amaçla veya yerel, ulusal veya uluslararası herhangi bir yasayı ihlal ederek kullanma.",
            "Sitedeki güvenlik önlemlerini veya erişim kontrollerini atlatmaya veya atlatmayı deneme.",
          ],
        },
        {
          title: "Fikri Mülkiyet Hakları",
          paragraphs: [
            "Exile2 Guides'taki tüm orijinal içerik — editöryal metin, rehber yapısı, veri derlemeleri, tasarım öğeleri ve site kodu dahil — geçerli telif hakkı, ticari marka ve fikri mülkiyet yasalarıyla korunur.",
            "Önceden yazılı izin olmaksızın hiçbir orijinal içeriği çoğaltamaz, dağıtamaz, değiştiremez, türev eserler oluşturamaz, herkese açık şekilde görüntüleyemez veya ticari amaçla kullanamazsınız.",
            "Path of Exile, Path of Exile 2 ve tüm ilgili oyun varlıkları Grinding Gear Games Limited'in ticari markalarıdır. Bu materyaller, topluluk rehberi ve yorum amaçlı adil kullanım ilkeleri uyarınca kullanılır. Grinding Gear Games'e ait hiçbir fikri mülkiyet üzerinde hak iddia etmiyoruz.",
            `Herhangi bir içeriğin fikri mülkiyet haklarınızı ihlal ettiğine inanıyorsanız, lütfen ayrıntılı ihlal açıklamasıyla birlikte ${contactEmail} adresinden bize ulaşın.`,
          ],
        },
        {
          title: "Garanti Reddi",
          paragraphs: [
            "EXILE2 GUIDES, ticarilebilirlik, belirli bir amaca uygunluk ve ihlal etmeme dahil ancak bunlarla sınırlı olmamak üzere, açık veya zımni hiçbir tür garantisi olmaksızın, 'OLDUĞU GİBİ' ve 'MEVCUT OLDUĞU ŞEKİLDE' temelinde sağlanır.",
            "Sitenin kesintisiz, hatasız veya tamamen güvenli olacağını garanti etmiyoruz. İçeriğin doğru, eksiksiz, güvenilir, güncel veya hatasız olduğunu garanti etmiyoruz.",
            "Oyun mekaniklerinin güncellemelerle sık sık değiştiğini kabul edersiniz. İçerik herhangi bir zamanda, önceden haber verilmeksizin eskiyebilir. Hiçbir rehberin, build önerisinin veya stratejinin belirli sonuçlar üreteceğini garanti etmiyoruz.",
            "Site aracılığıyla indirilen veya elde edilen herhangi bir materyal, kendi takdiriniz ve riskiniz altında erişilir. Materyale erişimden kaynaklanan bilgisayar sisteminizdeki hasar veya veri kaybından münhasıran siz sorumlusunuz.",
          ],
        },
        {
          title: "Sorumluluğun Sınırlandırılması",
          paragraphs: [
            "Uygulanabilir yasanın izin verdiği azami ölçüde, Exile2 Guides, operatörleri, katkıda bulunanları veya bağlı kuruluşları, sitenin kullanımınızdan veya kullanamamanızdan kaynaklanan veya bununla ilgili doğrudan, dolaylı, arızi, özel, sonuç olarak ortaya çıkan veya cezai zararlardan hiçbir şekilde sorumlu tutulamaz.",
            "Bu sınırlama, oyun içi ilerleme, eşya, para birimi veya hesap durumunun kaybı; veri kaybı; gelir veya beklenen kârın kaybı; ve sözleşme ihlali, haksız fiil, katı sorumluluk veya diğer herhangi bir hukuki teoriye dayanıp dayanmamasına bakılmaksızın dolaylı, özel, arızi, sonuç olarak ortaya çıkan veya cezai diğer zararlar dahil ancak bunlarla sınırlı olmamak üzere tüm zarar biçimlerine uygulanır.",
            "Bu sınırlamalar, Exile2 Guides'a böyle bir zarar olasılığı bildirilmiş olsun veya olmasın geçerlidir. Herhangi bir içerikten veya bu Şartlardan memnun değilseniz, tek çareniz siteyi kullanmayı bırakmaktır.",
          ],
        },
        {
          title: "Tazminat",
          paragraphs: [
            "Şunlarla bağlantılı olarak veya bunlardan kaynaklanan her türlü talep, yükümlülük, zarar, kayıp, maliyet ve gideri (makul yasal ücretler dahil) karşılamayı, savunmayı ve Exile2 Guides'ı, operatörlerini, katkıda bulunanlarını ve bağlı kuruluşlarını zarar görmemiş tutmayı kabul edersiniz: (a) siteye erişiminiz veya kullanımınız; (b) bu Şartları ihlal etmeniz; (c) fikri mülkiyet, gizlilik veya özel haklar dahil olmak üzere üçüncü taraf haklarını ihlal etmeniz; veya (d) içeriğinizin veya eylemlerinizin üçüncü tarafa zarar verdiğine ilişkin herhangi bir iddia.",
          ],
        },
        {
          title: "Şartlardaki Değişiklikler",
          paragraphs: [
            "Bu Şartları herhangi bir zamanda, yalnızca kendi takdirimizle değiştirme hakkını saklı tutarız. Değişiklik yaptığımızda, bu sayfanın üstündeki 'Son güncelleme' tarihini güncelleyeceğiz. Maddi değişiklikler sitede belirgin bir bildirimle iletilebilir.",
            "Herhangi bir değişikliğe katılmıyorsanız, siteyi kullanmayı bırakmalısınız. Herhangi bir değişikliğin ardından kullanıma devam etmeniz, gözden geçirilmiş Şartları kabul anlamına gelir.",
          ],
        },
        {
          title: "Geçerli Hukuk ve Uyuşmazlık Çözümü",
          paragraphs: [
            "Bu Şartlar, site operatörlerinin bulunduğu yargı bölgesinin yasalarına tabi olacak ve bu yasalara göre yorumlanacak, hukuk çatışması hükümleri dikkate alınmayacaktır.",
            "Bu Şartlardan doğan veya bunlarla ilgili herhangi bir uyuşmazlık öncelikle iyi niyetli müzakere yoluyla çözülmeye çalışılacaktır. Müzakere başarısız olursa, uyuşmazlık ilgili yargı bölgesinin yetkili mahkemelerine sunulacaktır.",
            "Uyuşmazlık çözüm süreçlerinin yalnızca bireysel olarak, toplu, birleştirilmiş veya temsilci dava olarak değil, yürütüleceğini kabul edersiniz.",
          ],
        },
        {
          title: "Genel Hükümler",
          paragraphs: [
            "Bu Şartların herhangi bir hükmü uygulanamaz veya geçersiz bulunursa, bu Şartların geri kalanı tam olarak yürürlükte kalacak şekilde, bu hüküm zorunlu olan minimum ölçüde sınırlandırılacak veya ortadan kaldırılacaktır.",
            "Bu Şartların herhangi bir hakkını veya hükmünü uygulamamamız, bu hakların feragat edildiği anlamına gelmez. Herhangi bir hak veya hükmün feragatı yalnızca yazılı olarak yapılması ve yetkili bir temsilci tarafından imzalanması halinde geçerlidir.",
            "Bu Şartlar, Gizlilik Politikamız, Çerez Politikamız ve Sorumluluk Reddi ile birlikte, siteyi kullanımınız konusunda siz ile Exile2 Guides arasındaki tüm sözleşmeyi teşkil eder.",
          ],
        },
        {
          title: "İletişim Bilgileri",
          paragraphs: [
            `Bu Kullanım Şartları hakkında sorularınız için lütfen ${contactEmail} adresinden bize ulaşın.`,
          ],
        },
      ],
    },
  },
};
