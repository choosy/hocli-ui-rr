import { create } from "zustand";
import { produce } from "immer";

type ProductId = string | number;

type StoreState = {
  isLargeScreen: boolean;
  setLargeScreenTrue: () => void;
  setLargeScreenFalse: () => void;

  cartVisible: boolean;
  showCart: () => void;
  hideCart: () => void;

  showSizesMenu: Record<string, boolean>;
  toggleShowSizesMenu: (productId: ProductId) => void;

  productImages: Record<string, unknown>;
  setProductImages: (productId: ProductId, images: unknown) => void;

  focusedProductImage: Record<string, unknown>;
  setFocusedProductImage: (productId: ProductId, image: unknown) => void;
};

export const useStore = create<StoreState>((set) => ({
  isLargeScreen: false,
  setLargeScreenTrue: () => set(() => ({ isLargeScreen: true })),
  setLargeScreenFalse: () => set(() => ({ isLargeScreen: false })),

  cartVisible: false,
  showCart: () => set(() => ({ cartVisible: true })),
  hideCart: () => set(() => ({ cartVisible: false })),

  showSizesMenu: {},
  toggleShowSizesMenu: (productId) =>
    set(
      produce((state: StoreState) => {
        const currentValue = state.showSizesMenu[String(productId)] || false;
        state.showSizesMenu[String(productId)] = !currentValue;
      }),
    ),

  productImages: {},
  setProductImages: (productId, images) =>
    set(
      produce((state: StoreState) => {
        state.productImages[String(productId)] = images;
      }),
    ),

  focusedProductImage: {},
  setFocusedProductImage: (productId, image) =>
    set(
      produce((state: StoreState) => {
        state.focusedProductImage[String(productId)] = image;
      }),
    ),
}));
