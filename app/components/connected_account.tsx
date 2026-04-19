import { useConnect, useConnection } from "wagmi";
import { injected } from "wagmi/connectors";

import { Button } from "./button";

export function ConnectedAccount() {
  let connect = useConnect();
  let connection = useConnection();

  if (connection.isConnected) {
    return <div>{connection.address} </div>;
  } else {
    return (
      <Button
        className="hidden lg:block lg:px-8 lg:py-1.5"
        onClick={() => connect.mutate({ connector: injected() })}
      >
        Connect Wallet
      </Button>
    );
  }
}
