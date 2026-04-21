export interface CartItem {
  variant_id: number;
  usd_price: number;
  size: string;
  image: string;
  name: string;
  summary: string;
  qty: number;
}

export interface Session {
  session_id: string;
  cart: CartItem[];
}
