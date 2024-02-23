import { useMutation, useQueryClient } from "@tanstack/react-query";
import privateAxios from "../../../api/privateAxios";
import useAuth from "../../useAuth";

// POST: https://apis.spaceyatech.com/api/orders/
const useMakeOrder = () => {
  const { auth, logout } = useAuth();
  const queryClient = useQueryClient();

  return useMutation(
    async (customerInfo) => {
      const response = await privateAxios.post("/orders/", customerInfo, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.access}`,
        },
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log("Added to cart: ", data);
        queryClient.invalidateQueries(["productsInCart"]);
      },
      onError: (error) => {
        // eslint-disable-next-line no-console
        console.error("Unable to add availability");
        if (error.response.status === 401) {
          logout();
        }
      },
    }
  );
};

export default useMakeOrder;
