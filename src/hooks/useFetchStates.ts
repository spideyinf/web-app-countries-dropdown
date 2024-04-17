import { useEffect, useState } from "react";
import { fetchData } from "../api";
import { CData, DropdownOption } from "src/types/common";

const useFetchStates = (countryId: number | undefined) => {
  const [states, setStates] = useState<DropdownOption[]>([]);
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
          data.map((item: CData) => ({
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
