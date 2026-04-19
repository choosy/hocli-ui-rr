import { useNavigate } from "react-router";
import { useAccount } from "wagmi";

import { useConnectModal } from "@rainbow-me/rainbowkit";

import { Button } from "./button";

import { useCart } from "app/lib/cart";

export function ConnectCheckoutButton({ type, ...props }) {
  const navigate = useNavigate();
  const { closeCart } = useCart();
  const account = useAccount();

  const { openConnectModal } = useConnectModal();

  let buttonText, buttonAction;

  if (account.isConnected) {
    buttonText = "CHECKOUT";
    buttonAction = (e) => {
      closeCart(e);
      navigate("/checkout");
    };
  } else {
    buttonText = "CONNECT WALLET";
    buttonAction = () => openConnectModal();
  }
  return (
    <div>
      <Button type={type} {...props} onClick={buttonAction} className="w-full">
        {buttonText}
      </Button>
    </div>
  );
}
