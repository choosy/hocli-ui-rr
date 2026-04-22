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

export default async function Product(props) {
  const params = await props.params;
  const apiUrl = process.env.HOCLIUI_API_URL;
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

  const result = await data.json();
  const product = result.product;
  const collection = result.collection;
  const variants = result.variants;
  const colors = getColorsFromVariants(variants);
  const sizes = getSizesFromVariants(variants);

  console.log("in page Product. product is below:");
  console.log(product);

  console.log("in page Product. collection is below:");
  console.log(collection);

  console.log("in page Product. variants are below:");
  console.log(variants);

  console.log("in page Product. colors are below:");
  console.log(colors);

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
