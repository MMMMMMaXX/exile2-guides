/** 文件职责：渲染视频卡片，YouTube 支持页面内封面+点击嵌入播放，并在旁列出可跳转的重要节点，供各内容模块的 video 章节复用。 */
import { useState } from "react";

import { resolveImageAsset } from "../../../lib/assets/image-assets";

/** 视频条目结构，与共享 videoEntriesSchema 对齐。 */
type VideoEntry = {
  creator?: string | undefined;
  description?: string | undefined;
  label: string;
  poster?: string | undefined;
  takeaway?: string | undefined;
  timestamps?: readonly { label: string; time: string }[] | undefined;
  url: string;
};

/** 视频卡片文案，缺省的节点/播放文案由调用方按语言注入。 */
type VideoLabels = {
  playVideo?: string | undefined;
  source: string;
  takeaway: string;
  timestamps?: string | undefined;
  videoPreview: string;
};

/** 从常见 YouTube 链接形态（watch?v=、youtu.be、embed/v）解析视频 ID；无法解析时回退为外链预览。 */
function extractYouTubeId(url: string): string | undefined {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");
    if (host === "youtu.be") {
      return parsed.pathname.slice(1) || undefined;
    }
    if (host === "youtube.com" || host === "m.youtube.com") {
      if (parsed.pathname === "/watch") {
        return parsed.searchParams.get("v") ?? undefined;
      }
      const nested = parsed.pathname.match(/^\/(?:embed|v)\/([^/]+)/);
      if (nested) return nested[1];
    }
  } catch {
    return undefined;
  }
  return undefined;
}

/** 将 "m:ss"、"mm:ss" 或 "h:mm:ss" 形式的时间解析为秒数；非法输入返回 undefined。 */
function parseTimestampSeconds(time: string): number | undefined {
  const segments = time.split(":").map((part) => Number(part.trim()));
  if (segments.length === 0 || segments.some((value) => !Number.isFinite(value))) {
    return undefined;
  }
  return segments.reduce((total, value) => total * 60 + value, 0);
}

/** 渲染单个视频卡片：管理封面/播放态，YouTube 显示可点击封面并按节点从指定时间开始播放。 */
function VideoCard({
  entry,
  labels,
  solo,
}: {
  entry: VideoEntry;
  labels: VideoLabels;
  solo: boolean;
}) {
  const youtubeId = extractYouTubeId(entry.url);
  const timestamps = entry.timestamps ?? [];
  const hasTimestamps = timestamps.length > 0;
  // active 记录当前播放的起始秒数；null 表示仍展示封面尚未加载 iframe。
  const [active, setActive] = useState<number | null>(null);
  const posterSrc = entry.poster ? resolveImageAsset(entry.poster) : undefined;
  const coverSrc =
    posterSrc ??
    (youtubeId ? `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg` : undefined);
  const playVideo = labels.playVideo ?? labels.videoPreview;

  /** 加载嵌入播放器并从指定秒数开始，供封面与节点列表共用。 */
  const playFrom = (start: number) => setActive(start);

  const embedSrc = (() => {
    const params = new URLSearchParams({ autoplay: "1", rel: "0" });
    if (active && active > 0) params.set("start", String(active));
    return `https://www.youtube-nocookie.com/embed/${youtubeId}?${params.toString()}`;
  })();

  return (
    <>
      <article
        className={`build-video-card${solo && !hasTimestamps ? " build-video-card--wide" : ""}`}
      >
        {youtubeId ? (
          active !== null ? (
            <div className="build-video-card__embed">
              <iframe
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                src={embedSrc}
                title={entry.label}
              />
            </div>
          ) : (
            <button
              aria-label={`${playVideo}: ${entry.label}`}
              className="build-video-card__cover"
              onClick={() => playFrom(0)}
              type="button"
            >
              {coverSrc ? (
                <img
                  alt=""
                  aria-hidden="true"
                  decoding="async"
                  height="360"
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                  sizes="(max-width: 960px) calc(100vw - 2rem), 56vw"
                  src={coverSrc}
                  srcSet={`${coverSrc} 640w`}
                  width="640"
                />
              ) : null}
              <span aria-hidden="true" className="build-video-card__play" />
            </button>
          )
        ) : (
          <a
            aria-label={`${labels.videoPreview}: ${entry.label}`}
            className="build-video-card__external-preview"
            href={entry.url}
            rel="noreferrer"
            target="_blank"
          >
            <span aria-hidden="true">▶</span>
            <strong>{labels.videoPreview}</strong>
          </a>
        )}
        <div className="build-video-card__body">
          <p className="build-section-kicker">{entry.creator ?? "YouTube"}</p>
          <h3>{entry.label}</h3>
          {entry.description ? <p>{entry.description}</p> : null}
          {entry.takeaway ? (
            <p>
              <strong>{labels.takeaway}:</strong> {entry.takeaway}
            </p>
          ) : null}
          <a href={entry.url} rel="noreferrer" target="_blank">
            {labels.source} ↗
          </a>
        </div>
      </article>
      {hasTimestamps ? (
        <aside className="build-video-timestamps">
          <p className="build-section-kicker">{labels.timestamps ?? "Timestamps"}</p>
          <ol>
            {timestamps.map((timestamp) => {
              const seconds = parseTimestampSeconds(timestamp.time);
              const seekable = Boolean(youtubeId) && seconds !== undefined;
              return (
                <li key={`${timestamp.time}:${timestamp.label}`}>
                  <button
                    className="build-video-timestamps__item"
                    disabled={!seekable}
                    onClick={
                      seekable ? () => playFrom(seconds as number) : undefined
                    }
                    type="button"
                  >
                    <span className="build-video-timestamps__time">
                      {timestamp.time}
                    </span>
                    <span className="build-video-timestamps__label">
                      {timestamp.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </aside>
      ) : null}
    </>
  );
}

/** 将视频条目渲染为可页面内播放的卡片网格；有节点时并排展示重要节点列表，非 YouTube 链接回退为外部预览入口。 */
export function VideoList({
  entries,
  labels,
}: {
  entries: readonly VideoEntry[];
  labels: VideoLabels;
}) {
  const solo = entries.length === 1;
  return (
    <div className="build-video-grid">
      {entries.map((entry) => (
        <VideoCard
          entry={entry}
          key={`${entry.label}:${entry.url}`}
          labels={labels}
          solo={solo}
        />
      ))}
    </div>
  );
}
