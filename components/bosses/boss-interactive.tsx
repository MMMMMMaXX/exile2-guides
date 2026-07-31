/** 文件职责：提供 Boss V5 原型中的客户端交互组件（阶段切换、攻击筛选、准备清单、社区折叠、灯箱）。 */
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import { resolveImageAsset } from "../../lib/assets/image-assets";
import type { ContentLocale } from "../../lib/content/constants";

// --- 阶段切换（V5 Phase Tabs） ---

export type BossPhaseTabItem = {
  label: string;
  mediaAlt?: string | undefined;
  mediaCaption?: string | undefined;
  mediaSrc?: string | undefined;
  notes: readonly string[];
  objectives: readonly string[];
  phaseId: string;
  tags: readonly string[];
  trigger: string;
};

/** 左侧标签页 + 右侧详情视图的阶段切换器；默认选中第一阶段。 */
export function BossPhaseTabs({
  locale,
  phases,
}: {
  locale: ContentLocale;
  phases: readonly BossPhaseTabItem[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = phases[activeIndex] ?? phases[0];
  if (!active) return null;

  const triggerLabel = locale === "zh-cn" ? "触发条件" : "Trigger";
  const objectivesLabel = locale === "zh-cn" ? "阶段目标" : "Objectives";

  return (
    <div className="boss-phase-layout">
      <div className="boss-phase-tabs" role="tablist">
        {phases.map((phase, index) => (
          <button
            aria-selected={index === activeIndex}
            className={index === activeIndex ? "selected" : undefined}
            key={phase.phaseId}
            onClick={() => setActiveIndex(index)}
            role="tab"
            type="button"
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <b>{phase.label}</b>
            <small>{phase.trigger}</small>
          </button>
        ))}
      </div>
      <div className="boss-phase-view">
        <div className="boss-phase-copy">
          <p className="boss-phase-label">
            {locale === "zh-cn" ? "阶段" : "Phase"} {activeIndex + 1} ·{" "}
            {active.label}
          </p>
          <p className="boss-phase-trigger">
            <strong>{triggerLabel}:</strong> {active.trigger}
          </p>
          {active.objectives.length > 0 ? (
            <>
              <strong className="boss-phase-objectives-label">
                {objectivesLabel}
              </strong>
              <ul>
                {active.objectives.map((objective) => (
                  <li key={objective}>{objective}</li>
                ))}
              </ul>
            </>
          ) : null}
          {active.notes.map((note) => (
            <p key={note}>{note}</p>
          ))}
          {active.tags.length > 0 ? (
            <div className="boss-phase-tags">
              {active.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          ) : null}
        </div>
        {active.mediaSrc ? (
          <BossLightboxTrigger
            alt={active.mediaAlt ?? ""}
            caption={active.mediaCaption}
            src={active.mediaSrc}
          />
        ) : null}
      </div>
    </div>
  );
}

// --- 攻击表筛选（V5 Attack Filters） ---

export type BossAttackRow = {
  attackId: string;
  commonMistakes: readonly string[];
  danger?: string | undefined;
  name: string;
  phaseIds: readonly string[];
  responses: readonly string[];
  telegraph: readonly string[];
};

/** 带阶段/危险等级筛选按钮的攻击参照表；筛选状态仅存在于客户端。 */
export function BossAttackTable({
  attacks,
  filterLabels,
  locale,
  phaseFilters,
}: {
  attacks: readonly BossAttackRow[];
  filterLabels: Record<string, string>;
  locale: ContentLocale;
  phaseFilters: readonly string[];
}) {
  const [filter, setFilter] = useState("all");

  const matches = (attack: BossAttackRow) => {
    if (filter === "all") return true;
    if (filter === "critical")
      return attack.danger === "high" || attack.danger === "critical";
    return attack.phaseIds.includes(filter);
  };

  const dangerLabel = (danger: string) =>
    danger === "high" || danger === "critical"
      ? locale === "zh-cn"
        ? "高"
        : "High"
      : danger === "medium"
        ? locale === "zh-cn"
          ? "中"
          : "Med"
        : locale === "zh-cn"
          ? "低"
          : "Low";

  return (
    <div className="boss-attacks">
      <div className="boss-filter-row">
        <button
          className={filter === "all" ? "selected" : undefined}
          onClick={() => setFilter("all")}
          type="button"
        >
          {locale === "zh-cn" ? "全部" : "All"}
        </button>
        {phaseFilters.map((phaseId) => (
          <button
            className={filter === phaseId ? "selected" : undefined}
            key={phaseId}
            onClick={() => setFilter(phaseId)}
            type="button"
          >
            {filterLabels[phaseId] ?? phaseId}
          </button>
        ))}
        <button
          className={filter === "critical" ? "selected" : undefined}
          onClick={() => setFilter("critical")}
          type="button"
        >
          {locale === "zh-cn" ? "高危险" : "High risk"}
        </button>
      </div>
      <div className="boss-table-wrap">
        <table className="boss-data-table boss-attack-table">
          <thead>
            <tr>
              <th>{locale === "zh-cn" ? "招式" : "Attack"}</th>
              <th>{locale === "zh-cn" ? "前摇提示" : "Telegraph"}</th>
              <th>{locale === "zh-cn" ? "正确应对" : "Response"}</th>
              <th>{locale === "zh-cn" ? "常见失败" : "Common mistakes"}</th>
              <th>{locale === "zh-cn" ? "危险" : "Danger"}</th>
            </tr>
          </thead>
          <tbody>
            {attacks.filter(matches).map((attack) => (
              <tr key={attack.attackId}>
                <td>
                  <b>{attack.name}</b>
                  {attack.phaseIds.length > 0 ? (
                    <small>
                      {attack.phaseIds
                        .map((id) => filterLabels[id] ?? id)
                        .join(" · ")}
                    </small>
                  ) : null}
                </td>
                <td>{attack.telegraph.join(" ")}</td>
                <td>{attack.responses.join(" ")}</td>
                <td>{attack.commonMistakes.join(" ")}</td>
                <td>
                  {attack.danger ? (
                    <span
                      className={`boss-risk boss-risk--${attack.danger === "high" || attack.danger === "critical" ? "high" : attack.danger}`}
                    >
                      {dangerLabel(attack.danger)}
                    </span>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- 战前准备清单（V5 Prep Checklist，localStorage 持久化） ---

export type BossPrepItem = {
  checks: readonly string[];
  fix?: string | undefined;
  label: string;
  why?: string | undefined;
};

/** 带勾选计数和 localStorage 持久化的准备检查表；每篇文章按 slug 独立存储。 */
export function BossPrepChecklist({
  items,
  locale,
  storageKey,
}: {
  items: readonly BossPrepItem[];
  locale: ContentLocale;
  storageKey: string;
}) {
  /** 首次渲染时从 localStorage 恢复勾选状态；预渲染环境无 localStorage 时全部视为未勾选。 */
  const [checked, setChecked] = useState<boolean[]>(() => {
    try {
      if (typeof localStorage === "undefined") {
        return items.map(() => false);
      }
      const saved = JSON.parse(
        localStorage.getItem(`boss-v5-prep:${storageKey}`) || "[]",
      ) as boolean[];
      return items.map((_, index) => Boolean(saved[index]));
    } catch {
      return items.map(() => false);
    }
  });

  /** 更新状态并同步写入 localStorage；写入失败不阻塞交互。 */
  const persist = (next: boolean[]) => {
    setChecked(next);
    try {
      localStorage.setItem(`boss-v5-prep:${storageKey}`, JSON.stringify(next));
    } catch {
      /* localStorage 不可用时忽略持久化 */
    }
  };

  const checkedCount = checked.filter(Boolean).length;

  return (
    <div className="boss-preparation">
      <div className="boss-prep-toolbar">
        <span>
          {checkedCount} / {items.length}{" "}
          {locale === "zh-cn" ? "已检查" : "checked"}
        </span>
        <button
          onClick={() => persist(items.map(() => false))}
          type="button"
        >
          {locale === "zh-cn" ? "清除勾选" : "Reset"}
        </button>
      </div>
      <div className="boss-table-wrap">
        <table className="boss-data-table boss-prep-table">
          <thead>
            <tr>
              <th>{locale === "zh-cn" ? "完成" : "Done"}</th>
              <th>{locale === "zh-cn" ? "检查项" : "Check"}</th>
              <th>{locale === "zh-cn" ? "为什么重要" : "Why it matters"}</th>
              <th>{locale === "zh-cn" ? "低成本修正" : "Quick fix"}</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.label}>
                <td>
                  <input
                    checked={checked[index] ?? false}
                    onChange={() =>
                      persist(
                        checked.map((value, i) =>
                          i === index ? !value : value,
                        ),
                      )
                    }
                    type="checkbox"
                  />
                </td>
                <td>
                  <b>{item.label}</b>
                  {item.checks.map((check) => (
                    <p key={check}>{check}</p>
                  ))}
                </td>
                <td>{item.why ?? ""}</td>
                <td>{item.fix ?? ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- 社区证据折叠（V5 Community Toggle） ---

/** 前两张社区卡片直接展示，其余通过 CSS 类折叠在"查看更多"按钮后面。 */
export function BossCommunityGrid({
  children,
  locale,
  totalCount,
}: {
  children: ReactNode;
  locale: ContentLocale;
  totalCount: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasHidden = totalCount > 2;

  return (
    <div
      className={`boss-community${expanded ? " boss-community--expanded" : ""}`}
    >
      <div className="boss-community-grid">{children}</div>
      {hasHidden ? (
        <button
          className="boss-community-toggle"
          onClick={() => setExpanded((value) => !value)}
          type="button"
        >
          {expanded
            ? locale === "zh-cn"
              ? "收起更多讨论"
              : "Show fewer discussions"
            : locale === "zh-cn"
              ? "查看更多讨论与编辑分析"
              : "View more discussions & analysis"}
        </button>
      ) : null}
    </div>
  );
}

// --- 灯箱（V5 Lightbox） ---

/** 点击图片打开全屏预览；支持 Escape 和点击遮罩关闭。 */
export function BossLightboxTrigger({
  alt,
  caption,
  src,
}: {
  alt: string;
  caption?: string | undefined;
  src: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <figure
        className="boss-annotated-media"
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
      >
        <img
          alt={alt}
          decoding="async"
          height="900"
          loading="lazy"
          sizes="(max-width: 960px) calc(100vw - 2rem), 56vw"
          src={resolveImageAsset(src)}
          srcSet={`${resolveImageAsset(src)} 1600w`}
          width="1600"
        />
        {caption ? <figcaption>{caption}</figcaption> : null}
        <button
          aria-label={alt || "Zoom"}
          className="boss-zoom-button"
          type="button"
        >
          ＋
        </button>
      </figure>
      {open ? (
        <div
          className="boss-lightbox"
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
          role="dialog"
          aria-modal="true"
          aria-label={alt || "Image preview"}
        >
          <button
            className="boss-lightbox-close"
            onClick={() => setOpen(false)}
            type="button"
          >
            ×
          </button>
          <img alt={alt} src={src} />
          {caption ? <p>{caption}</p> : null}
        </div>
      ) : null}
    </>
  );
}
