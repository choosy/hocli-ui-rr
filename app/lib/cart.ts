import { useStore } from "app/lib/store";
import { useMutation } from "@tanstack/react-query";

import { query } from "app/lib/query";
import { delay } from "app/lib/util";
import { useSession } from "app/lib/query_hooks";

export const useCart = () => {
  const { showCart, hideCart, cartVisible } = useStore();
  const sessionQuery = useSession();

  const addCartMutation = useMutation({
    mutationFn: (data) => query("post", "/add_cart", data),
  });

  const addCart = function (productId, color, size, qty) {
    addCartMutation.mutate({
      product_id: productId,
      size: size,
      color: color,
      qty,
    });
  };

  const updateQtyMutation = useMutation({
    mutationFn: (data) => query("post", "/update_qty", data),
  });

  const handleUpdateQty = async function (e, variantId, updateQty) {
    updateQtyMutation.mutate({ variant_id: variantId, qty: updateQty });
    await delay(1000);
    refreshCart();
  };

  const refreshCart = function () {
    sessionQuery.refetch();
  };

  const handleAddCart = async function (productId, color, size, qty) {
    addCart(productId, color, size, qty);
    await delay(1000);
    refreshCart();
    showCart();
  };

  const closeCart = async function (e) {
    e.preventDefault();
    hideCart();
  };

  return { handleAddCart, handleUpdateQty, closeCart, cartVisible };
};
