/** 文件职责：安全序列化并渲染 Schema.org JSON-LD，供静态页面共享。 */

export type StructuredDataProps = {
  data: object;
};

/** 输出构建期可见的 JSON-LD；替换左尖括号以避免数据意外闭合 script 标签。 */
export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replaceAll("<", "\\u003c"),
      }}
    />
  );
}
