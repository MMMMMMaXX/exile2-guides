/** 文件职责：渲染视频推荐卡片网格，供各内容模块的 video 章节复用。 */

/** 将视频条目渲染为带外部预览链接的卡片网格。 */
export function VideoList({
  entries,
  labels,
}: {
  entries: readonly {
    creator?: string | undefined;
    description?: string | undefined;
    label: string;
    takeaway?: string | undefined;
    url: string;
  }[];
  labels: { source: string; takeaway: string; videoPreview: string };
}) {
  return (
    <div className="build-video-grid">
      {entries.map((entry) => (
        <article
          className="build-video-card"
          key={`${entry.label}:${entry.url}`}
        >
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
      ))}
    </div>
  );
}
