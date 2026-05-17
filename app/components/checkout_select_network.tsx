import { useChainId, useChains } from "wagmi";

export const CheckoutSelectNetwork = () => {
  const chainId = useChainId();
  const chains = useChains();
  const chain = chains.find((c) => c.id === chainId);

  return (
    <div>
      You are on {chain?.name ?? "Unknown"} (id: {chainId})
    </div>
  );
};
