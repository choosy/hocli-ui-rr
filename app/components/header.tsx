import { Link } from "react-router";

import { ShoppingBag, Menu, X } from "lucide-react";
import * as Collapsible from "@radix-ui/react-collapsible";

import { useStore } from "app/lib/store";
import { ConnectedAccount } from "./connected_account";
import { Nav } from "./nav";

import Logo from "../assets/logo.svg";

export function Header() {
  const { showCart } = useStore();
  return (
    <div className="bg-custom-gradient flex w-full items-center justify-between p-4 lg:px-5 lg:py-3">
      <Link to="/">
        <img
          src={Logo}
          width={145}
          className="lg:w-[309px]"
          alt="Hocli's logo"
        />
      </Link>

      <Nav
        menuItems={[
          { id: 1, name: "WILD AT NIGHT" },
          { id: 2, name: "THE MOON" },
          { id: 3, name: "TO THE STARS" },
        ]}
        className="hidden lg:flex"
      />
      <Collapsible.Root>
        <div className="flex items-center gap-2 lg:flex-row lg:gap-8">
          <ShoppingBag
            onClick={() => showCart()}
            className="text-light-gray lg:hover:text-accent-yellow duration-300 ease-in-out lg:cursor-pointer lg:transition-transform lg:hover:scale-125"
            size={20}
          />
          <ConnectedAccount extraClass="" />
          <Collapsible.Trigger className="lg:hidden" asChild>
            <button type="button" className="bg-accent-yellow p-2.5">
              <Menu size={20} />
            </button>
          </Collapsible.Trigger>
        </div>

        <Collapsible.Content
          forceMount
          className="bg-primary-black fixed top-0 left-0 flex h-screen w-full flex-col p-4 data-[state=closed]:hidden"
        >
          <Link to="/">
            <img src={Logo} width={145} alt="Hocli's logo" className="mb-10" />
          </Link>
          <Collapsible.Trigger asChild>
            <button className="text-accent-yellow absolute top-6 right-6">
              <X size={36} />
            </button>
          </Collapsible.Trigger>

          <Nav
            menuItems={[
              { id: 1, name: "WILD AT NIGHT" },
              { id: 2, name: "THE MOON" },
              { id: 3, name: "TO THE STARS" },
              { id: 4, name: "ABOUT US" },
            ]}
          />
        </Collapsible.Content>
      </Collapsible.Root>
    </div>
  );
}
