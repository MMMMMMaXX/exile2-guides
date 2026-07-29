/** 文件职责：声明应用路由清单，并确保内部开发页面不会进入生产路由。 */
import { type RouteConfig, index, route } from "@react-router/dev/routes";

// 设计系统路由必须在注册阶段排除，而不是只依赖 noindex；这样未来扩展预渲染
// 清单时，内部演示页也不会意外成为可访问、可索引的生产 URL。
const developmentOnlyRoutes =
  process.env.NODE_ENV === "development"
    ? [route("__design-system", "./routes/design-system.tsx")]
    : [];

export default [
  index("./routes/index.tsx"),
  route(":locale", "./routes/home.tsx"),
  route(":locale/about", "./routes/about.tsx"),
  route(":locale/contact", "./routes/contact.tsx"),
  route(":locale/privacy-policy", "./routes/privacy-policy.tsx"),
  route(":locale/terms-of-use", "./routes/terms-of-use.tsx"),
  route(":locale/cookie-policy", "./routes/cookie-policy.tsx"),
  route(":locale/disclaimer", "./routes/disclaimer.tsx"),
  route(":locale/search", "./routes/search.tsx"),
  route(":locale/builds/classes/:class", "./routes/content-subtype.tsx"),
  route(":locale/:section", "./routes/content-list.tsx"),
  route(":locale/:section/:slug", "./routes/content-detail.tsx"),
  route("*", "./routes/not-found.tsx"),
  ...developmentOnlyRoutes,
] satisfies RouteConfig;
