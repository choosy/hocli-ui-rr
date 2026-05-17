export interface Coin {
  id: number;
  website: string;
  symbol: string;
}

export interface OrderStatus {
  status: string;
  title: string;
  message: string;
}

export interface CheckoutState {
  customer: unknown | null;
  setCustomer: (customer: unknown) => void;
  delivery: unknown | null;
  setDelivery: (delivery: unknown) => void;

  orderStatus: OrderStatus | null;
  setOrderStatus: (status: string, title: string, message: string) => void;

  lastOrderId: string;
  setLastOrderId: (val: string) => void;

  selectedCoin: Coin | null;
  setSelectedCoin: (coin: Coin) => void;
}
