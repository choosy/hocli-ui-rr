import { useAccount, useConnect, useDisconnect } from "wagmi";
import type { Route } from "./+types/components/index/index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Your Ethereum clothing store" },
    {
      name: "description",
      content: "Welcome to Hocli, your web3 clothing store!",
    },
  ];
}

function ConnectWallet() {
  const { connectors, connect } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div>
        <p>
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </p>
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    );
  }

  return (
    <div>
      {connectors.map((connector) => (
        <button key={connector.uid} onClick={() => connect({ connector })}>
          {connector.name}
        </button>
      ))}
    </div>
  );
}

export default function Index() {
  return (
    <div>
      <ConnectWallet />
    </div>
  );
}
