"use client";

import { Link } from "react-router";
import { useStore } from "/app/lib/store";
import { useCart } from "/app/lib/cart";
import { getImageURLByHeight, selectImageByType } from "/app/lib/images";

export function ProductGrid({ products }) {
  const { showSizesMenu, toggleShowSizesMenu } = useStore();
  const { handleAddCart } = useCart();

  const imagesMap = {};
  for (const product of products) {
    imagesMap[product.id] = selectImageByType(product.images, "artwork");
  }

  return (
    <div className="flex flex-wrap justify-between gap-4 lg:gap-5 mt-10 mb-10">
      {products.map((product) => (
        <div className="lg:h-[438px]" key={product.id}>
          <div
            className={`
               group/product
               flex items-center
               relative border border-stroke bg-linear-to-tr
               from-primary-black to-medium-gray bg-[45deg]
               h-[127px] lg:h-[271px]
           `}
          >
            <Link
              to={`/product/tshirt/${product.collection.human_id}/${product.human_id}`}
            >
              <img
                src={getImageURLByHeight(imagesMap[product.id].url, 171)}
                alt=""
                className="block lg:hidden"
              />
              <img
                src={getImageURLByHeight(imagesMap[product.id].url, 271)}
                alt=""
                className="hidden lg:block"
              />
            </Link>

            {/* begin of the quick button and sizes area div */}
            <div
              onMouseEnter={() => toggleShowSizesMenu(product.id)}
              onMouseLeave={() => toggleShowSizesMenu(product.id)}
              className={`
                absolute flex justify-center
                items-center
                inset-x-4
                py-4
                bottom-0
                ${showSizesMenu?.[product.id] ? "bg-olive" : "bg-accent-yellow-hover"}
                text-primary-black
                text-lg
                font-normal
                opacity-0
                group-hover/product:opacity-100
                group-hover/product:bottom-4
                transition-all 
                ease-in-out
                duration-400
                `}
            >
              {showSizesMenu?.[product.id] && (
                <div>
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      className="text-primary-black px-2 py-2 hover:bg-olive-strong"
                      onClick={async (e) => handleAddCart(e, variant.id)}
                    >
                      {variant.size}
                    </button>
                  ))}
                </div>
              )}

              {!showSizesMenu?.[product.id] && <div>QUICK ADD</div>}
            </div>
            {/* end of the quick button and sizes area div */}
          </div>
          {/* end the div parent of the image */}

          <div className="flex flex-col mt-3 gap-1">
            <span className="text-light-gray text-sm font-medium">
              {product.name}
            </span>
            <span className="text-light-gray text-sm font-medium">
              ${product.variants[0].usd_price}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
