import { ChevronRight } from "lucide-react";
import { PageTitle } from "app/components/page_title.js";
import { CheckoutPanes } from "app/components/checkout.jsx";
import { CheckoutOrderStatus } from "app/components/checkout_order_status.jsx";

export default function Checkout() {
  return (
    <div className="border border-sky-500 p-4">
      <div className="mx-auto border border-red-500 lg:max-w-[1200px]">
        <div className="flex items-center">
          Home <ChevronRight className="h-4 w-4" /> Cart{" "}
          <ChevronRight className="h-4 w-4" /> Checkout
        </div>
        <PageTitle text="Checkout" />
        <CheckoutOrderStatus />
        <CheckoutPanes />
      </div>
    </div>
  );
}
