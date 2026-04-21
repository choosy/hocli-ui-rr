interface CartItem {
  variant_id: number;
  usd_price: number;
  size: string;
  image: string;
  name: string;
  summary: string;
  qty: number;
}

interface Session {
  session_id: string;
  cart: Array<CartItem>;
}
