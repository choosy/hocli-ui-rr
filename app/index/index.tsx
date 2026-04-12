import { useAccount, useConnect, useDisconnect } from "wagmi";
import type { Route } from "./+types/index";

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
    <div className="text-3xl color-white">
      aaa
      {connectors.map((connector) => (
        <p>
          <a
            className="text-white"
            key={connector.uid}
            href="#"
            onClick={() => connect({ connector })}
          >
            {connector.name}
          </a>{" "}
        </p>
      ))}
    </div>
  );
}

export async function loader({ params }: Route.LoaderArgs) {
  console.log("opa sa sa 1");
  const apiUrl = import.meta.env.VITE_API_URL;
  const data = await fetch(`${apiUrl}/list_products`, {
    method: "POST",
    cache: "no-store",
  });
  console.log(data.status);
  const products = await data.json();
  console.log("products variants for leopard and the moonare");

  console.log(products[0]);
}

export default function Index() {
  return (
    <div>
      <ConnectWallet />
    </div>
  );
}
