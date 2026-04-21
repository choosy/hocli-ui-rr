import type { MouseEvent } from "react";
import { useStore } from "app/lib/store";
import { useMutation } from "@tanstack/react-query";

import { query } from "app/lib/query";
import { delay } from "app/lib/util";
import { useSession } from "app/lib/query_hooks";

interface AddCartData {
  product_id: number;
  size: string;
  color: string;
  qty: number;
}

interface UpdateQtyData {
  variant_id: number;
  qty: number;
}

export const useCart = () => {
  const { showCart, hideCart, cartVisible } = useStore();
  const sessionQuery = useSession();

  const addCartMutation = useMutation({
    mutationFn: (data: AddCartData) => query("post", "/add_cart", data),
  });

  const addCart = (
    productId: number,
    color: string,
    size: string,
    qty: number,
  ) => {
    addCartMutation.mutate({
      product_id: productId,
      size: size,
      color: color,
      qty,
    });
  };

  const updateQtyMutation = useMutation({
    mutationFn: (data: UpdateQtyData) => query("post", "/update_qty", data),
  });

  const handleUpdateQty = async (
    _e: MouseEvent,
    variantId: number,
    updateQty: number,
  ) => {
    updateQtyMutation.mutate({ variant_id: variantId, qty: updateQty });
    await delay(1000);
    refreshCart();
  };

  const refreshCart = function () {
    sessionQuery.refetch();
  };

  const handleAddCart = async (
    productId: number,
    color: string,
    size: string,
    qty: number,
  ) => {
    addCart(productId, color, size, qty);
    await delay(1000);
    refreshCart();
    showCart();
  };

  const closeCart = async function (e: MouseEvent) {
    e.preventDefault();
    hideCart();
  };

  return { handleAddCart, handleUpdateQty, closeCart, cartVisible };
};
