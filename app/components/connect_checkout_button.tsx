import { useNavigate } from "react-router";
import { useConnect, useConnection } from "wagmi";
import { injected } from "wagmi/connectors";

import { Button } from "./button";

import { useCart } from "app/lib/cart";

type ConnectCheckoutButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function ConnectCheckoutButton({
  type,
  ...props
}: ConnectCheckoutButtonProps) {
  const navigate = useNavigate();
  const { closeCart } = useCart();
  const connection = useConnection();
  const connect = useConnect();

  let buttonText: string;
  let buttonAction: React.MouseEventHandler<HTMLButtonElement>;

  if (connection.isConnected) {
    buttonText = "CHECKOUT";
    buttonAction = (e) => {
      closeCart(e);
      navigate("/checkout");
    };
  } else {
    buttonText = connect.isPending ? "CONNECTING..." : "CONNECT WALLET";
    buttonAction = () => connect.mutate({ connector: injected() });
  }

  return (
    <div>
      <Button
        type={type}
        {...props}
        onClick={buttonAction}
        disabled={connect.isPending}
        className="w-full"
      >
        {buttonText}
      </Button>
    </div>
  );
}
