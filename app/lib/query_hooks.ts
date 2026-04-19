import { useQuery } from "@tanstack/react-query";
import { query } from "/app/lib/query";

export const useSession = () =>
  useQuery({
    queryKey: ["get_session"],
    queryFn: () => query("get", "/get_session"),
    options: {
      refetchOnWindowFocus: false,
    },
  });

export const useCustomer = () =>
  useQuery({
    queryKey: ["checkout_get_customer"],
    queryFn: () => query("get", "/checkout_get_customer"),
    options: {
      refetchOnWindowFocus: false,
    },
  });

export const useDelivery = () =>
  useQuery({
    queryKey: ["checkout_get_delivery"],
    queryFn: () => query("get", "/checkout_get_delivery"),
    options: {
      refetchOnWindowFocus: false,
    },
  });
