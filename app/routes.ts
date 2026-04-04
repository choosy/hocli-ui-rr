import { type RouteConfig, index, layout } from "@react-router/dev/routes";

export default [
  layout("./index/layout.tsx", [index("./index/index.tsx")]),
] satisfies RouteConfig;
