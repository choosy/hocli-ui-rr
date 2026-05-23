import { useChainId, useChains } from "wagmi";

// Files in `public/` are served from the site root by Vite / React Router,
// so `public/images/chains/ethereum.svg` is referenced as `/images/chains/ethereum.svg`.
const CHAIN_LOGOS: Record<number, string> = {
  1: "/images/chains/ethereum.jpg", // Ethereum mainnet
  10: "/images/chains/optimism.svg", // Optimism
  8453: "/images/chains/base.jpeg", // Base
  42161: "/images/chains/arbitrum.svg", // Arbitrum One
};

export const CheckoutSelectNetwork = () => {
  const chainId = useChainId();
  const chains = useChains();
  const activeChain = chains.find((c) => c.id === chainId);

  return (
    <div>
      <div className="text-lg font-semibold mb-2">Choose thy chain</div>
      <div className="flex flex-col gap-2">
        {chains.map((c) => {
          const logo = CHAIN_LOGOS[c.id];
          const isActive = c.id === chainId;
          return (
            <div
              key={c.id}
              className={`flex items-center gap-2 mb-2 rounded  border-olive-strong  w-100 ${
                isActive
                  ? "bg-accent-yellow text-secondary-black border-1 border-white"
                  : "bg-olive-strong"
              }`}
            >
              <img src={logo} alt={`${c.name} logo`} className="h-8 w-8" />
              <div>
                <div className="font-medium">{c.name}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-2 text-sm text-gray-500">
        You are on {activeChain?.name ?? "Unknown"} (id: {chainId})
      </div>
    </div>
  );
};
