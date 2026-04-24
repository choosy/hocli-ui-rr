import { AddCartButton } from "app/components/add_cart_button";
import { ImagesDetail } from "app/components/images_detail";
import {
  getColorsFromVariants,
  getSizesFromVariants,
} from "app/lib/util_product";
import { Colors } from "app/components/product_colors";
import { Sizes } from "app/components/product_sizes";
import { Summary } from "app/components/product_summary";
import { Materials } from "app/components/product_materials";

import type { Route } from "./+types/product";

export async function loader({ params }: Route.LoaderArgs) {
  console.log("params", params);
  // params { collection: 'moonlit-creatures', product: 'owl' }

  const apiUrl = import.meta.env.VITE_API_URL;
  if (typeof apiUrl !== "string" || !apiUrl) {
    throw new Error(
      "VITE_API_URL is not set. Add it to .env (see other pages using the same API base).",
    );
  }
  const data = await fetch(`${apiUrl}/get_product`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      _type: "tshirt",
      collection: params.collection,
      product: params.product,
    }),
  });

  return { ...(await data.json()) };
}

export default async function Product({ loaderData }: Route.ComponentProps) {
  const { product, collection, variants } = loaderData;
  const colors = getColorsFromVariants(variants);
  const sizes = getSizesFromVariants(variants);

  return (
    <div className="w-full p-4">
      <div className="mx-[10%] flex gap-4">
        <ImagesDetail product={product} images={product.images} />
        <div className="flex w-[40%] flex-none flex-col gap-y-8 border border-green-500">
          <div className="border border-yellow-500">
            <h2 className="text-3xl">{product.name}</h2>
          </div>
          <div>{product.price}</div>
          <Colors productId={product.id} colors={colors} />
          <Sizes productId={product.id} sizes={sizes} />
          <AddCartButton productId={product.id} />
          <Summary summary={product.summary} />
          <Materials materials={product.materials} />
        </div>
      </div>
    </div>
  );
}
