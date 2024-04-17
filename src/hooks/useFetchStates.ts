import { useEffect, useState } from "react";
import { fetchData } from "../api";
import { TData, TDropdown } from "src/types/common";

const useFetchStates = (countryId: number | undefined) => {
  const [states, setStates] = useState<TDropdown[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!countryId) {
      return;
    }

    setIsLoading(true);
    fetchData(
      `${import.meta.env.VITE_APP_API_URL}/countries/${countryId}/states`
    )
      .then((data) => {
        setStates(
          data.map((item: TData) => ({
            value: item.id,
            label: item.value,
          }))
        );
      })
      .catch((error) => {
        throw error;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [countryId]);

  return { states, isLoading };
};

export default useFetchStates;
