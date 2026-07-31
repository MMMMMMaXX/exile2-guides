/** 文件职责：提供列表与关联内容共用的整卡链接展示，避免页面重复拼接内容元数据。 */
import type { ReactNode } from "react";

import { resolveImageAsset } from "../../lib/assets/image-assets";

export type ContentCardData = {
  attributes?: readonly string[];
  href: string;
  image?: string;
  imageAlt?: string;
  meta: string;
  summary: string;
  title: string;
  typeLabel: string;
};

/** 将卡片属性限制为最多三项，保持 PRD 要求的信息密度并避免列表失衡。 */
function getVisibleAttributes(attributes: readonly string[] = []): string[] {
  return attributes.slice(0, 3);
}

/** 渲染无嵌套链接的整卡入口；无图片时使用类型标识占位而非游戏官方资产。 */
export function ContentCard({
  content,
  footer,
}: {
  content: ContentCardData;
  footer?: ReactNode;
}) {
  const attributes = getVisibleAttributes(content.attributes);
  const resolvedImage = content.image
    ? resolveImageAsset(content.image)
    : undefined;

  return (
    <a aria-label={content.title} className="content-card" href={content.href} rel="noopener noreferrer" target="_blank">
      {resolvedImage ? (
        <img
          decoding="async"
          className="content-card__image"
          src={resolvedImage}
          srcSet={`${resolvedImage} 448w`}
          sizes="(max-width: 40rem) calc(100vw - 2rem), (max-width: 48rem) 10rem, (max-width: 74rem) 50vw, 25vw"
          alt={content.imageAlt ?? ""}
          height="252"
          loading="lazy"
          width="448"
        />
      ) : (
        <div className="content-card__placeholder" aria-hidden="true">
          {content.typeLabel.slice(0, 2).toUpperCase()}
        </div>
      )}
      <span className="content-card__body">
        <span className="content-card__type">{content.typeLabel}</span>
        <span className="content-card__title">{content.title}</span>
        <span className="content-card__summary">{content.summary}</span>
        <span className="content-card__meta">{content.meta}</span>
        {attributes.length > 0 ? (
          <span className="content-card__attributes">
            {attributes.map((attribute) => (
              <span key={attribute}>{attribute}</span>
            ))}
          </span>
        ) : null}
        {footer ? <span className="content-card__footer">{footer}</span> : null}
      </span>
    </a>
  );
}
