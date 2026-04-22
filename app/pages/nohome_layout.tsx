import { Outlet } from "react-router";
import { Header } from "app/components/header";
import { Cart } from "app/components/cart";

export const handle = {
  bodyClassName:
    "bg-primary-black font-moderustic text-light-gray relative min-h-screen",
};

export default function Layout() {
  return (
    <div>
      <Cart />
      <Header />
      <Outlet />;
    </div>
  );
}
