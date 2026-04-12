import { Outlet } from "react-router";

export const handle = {
  bodyClassName:
    "bg-primary-black text-white text-xl font-moderustic relative min-h-screen bg-hero-sm sm:bg-hero-sm \
  xl:bg-hero-xl 2xl:bg-hero-2xl 3xl:bg-hero-3xl 4xl:bg-hero-4xl 5xl:bg-hero-5xl 6xl:bg-hero-6xl bg-cover bg-center bg-no-repeat",
};

export default function Layout() {
  return <Outlet />;
}
