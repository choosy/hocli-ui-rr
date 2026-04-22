import { useCart } from "app/lib/cart";
import { useOptionsStore } from "app/lib/optionsStore";

export function AddCartButton({ className, productId, ...props }) {
  const { options } = useOptionsStore();
  const { handleAddCart } = useCart();

  console.log("########### options are ##########");

  console.log(options);

  const optionsSelected =
    productId in options &&
    "color" in options[productId] &&
    "size" in options[productId];

  return (
    <button
      className={` ${className} bg-accent-yellow text-primary-black p-2 ${
        optionsSelected
          ? "hover:bg-accent-yellow-hover cursor-pointer"
          : "opacity-30"
      } `}
      disabled={!optionsSelected}
      {...props}
      onClick={async () => {
        if (optionsSelected) {
          handleAddCart(
            productId,
            options[productId].color,
            options[productId].size,
            1,
          );
        }
      }}
    >
      Add to cart
    </button>
  );
}
