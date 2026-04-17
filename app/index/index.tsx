import { Link } from "react-router";

import { ProductGrid } from "app/components/product_grid";
import { useConnect, useConnectors, useConnection, useDisconnect } from "wagmi";
import type { Route } from "./+types/index";
import type { Product } from "app/types/product";

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
  const connect = useConnect();
  const connectors = useConnectors();
  const connection = useConnection();
  const address = connection.address;
  const disconnect = useDisconnect();

  if (connect.isSuccess) {
    return (
      <div>
        <p>
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </p>
        <button onClick={() => disconnect.mutate()}>Disconnect</button>
      </div>
    );
  }

  return (
    <div className="text-3xl color-white">
      aaa
      {connectors.map((connector) => (
        <p key={connector.uid}>
          <button
            className="text-white"
            type="button"
            onClick={() =>
              connect.mutate(
                { connector },
                {
                  onError: (err) => console.error("connect error", err),
                  onSuccess: (data) => console.log("connect success", data),
                },
              )
            }
          >
            {connector.name}
          </button>{" "}
        </p>
      ))}
      {connect.error && (
        <p className="text-red-500 text-base">Error: {connect.error.message}</p>
      )}
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
  const products: Product[] = await data.json();
  console.log("products variants for leopard and the moonare");

  console.log(products[0]);

  return { products };
}

export default function Index({ loaderData }: Route.ComponentProps) {
  let products = loaderData.products;
  return (
    <div className="w-full p-4">
      <div className="mx-auto mt-56 lg:max-w-[1200px]">
        <div>
          aaa
          <ConnectWallet />
          aaa
          <h1 className="text-shadow-custom text-light-gray mb-2 text-2xl font-semibold lg:mb-5 lg:text-6xl lg:leading-tight">
            CRAFTED FOR <br /> ETHEREUM AFICIONADOS
          </h1>
          <h2 className="text-light-gray mb-2 text-base font-normal lg:mb-5 lg:text-2xl lg:font-light">
            Embrace the future and support the real web3 economy
          </h2>
          <Link
            to={{
              pathname: "/about-us",
            }}
            className="text-accent-yellow text-sm font-normal underline decoration-auto"
          >
            FIND OUT MORE
          </Link>
        </div>
        {/* end HERO div */}
        <ProductGrid products={products}></ProductGrid>
      </div>
      {/* end mt-* div */}
    </div>
  );
}
