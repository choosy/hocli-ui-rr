import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  layout("./pages/index/layout.tsx", [index("./pages/index/index.tsx")]),
  layout("./pages/nohome_layout.tsx", [
    route("product/tshirt/:collection/:product", "./pages/product.tsx"),
  ]),
] satisfies RouteConfig;
