import { AppKitButton } from "@reown/appkit/react";
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

export default function Index() {
  return (
    <div>
      <AppKitButton />
    </div>
  );
}
