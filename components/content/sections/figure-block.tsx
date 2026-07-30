/** 文件职责：渲染带来源声明的配图区块，供各内容模块的 figure 章节复用。 */
import { resolveImageAsset } from "../../../lib/assets/image-assets";

/** 渲染单张配图及其标题、来源声明和可选外部链接。 */
export function FigureBlock({
  image,
  sourceLabel,
}: {
  image: {
    alt: string;
    caption: string;
    credit: string;
    sourceKind: string;
    sourceUrl?: string | undefined;
    src: string;
  };
  sourceLabel: string;
}) {
  return (
    <figure className="build-editorial-figure">
      <img
        alt={image.alt}
        decoding="async"
        height="900"
        loading="lazy"
        sizes="(max-width: 960px) calc(100vw - 2rem), 56vw"
        src={resolveImageAsset(image.src)}
        width="1600"
      />
      <figcaption>
        <span>{image.caption}</span>
        <small>
          {image.credit}
          {image.sourceUrl ? (
            <>
              {" · "}
              <a href={image.sourceUrl} rel="noreferrer" target="_blank">
                {sourceLabel} ↗
              </a>
            </>
          ) : null}
        </small>
      </figcaption>
    </figure>
  );
}
