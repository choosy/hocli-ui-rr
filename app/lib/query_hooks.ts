import { useQuery } from "@tanstack/react-query";
import { query } from "app/lib/query";
import type { Session } from "~/types/cart";

export const useSession = () =>
  useQuery({
    queryKey: ["get_session"],
    queryFn: () => query<Session>("get", "/get_session"),
    refetchOnWindowFocus: false,
  });

export const useCustomer = () =>
  useQuery({
    queryKey: ["checkout_get_customer"],
    queryFn: () => query("get", "/checkout_get_customer"),
    refetchOnWindowFocus: false,
  });

export const useDelivery = () =>
  useQuery({
    queryKey: ["checkout_get_delivery"],
    queryFn: () => query("get", "/checkout_get_delivery"),
    refetchOnWindowFocus: false,
  });
