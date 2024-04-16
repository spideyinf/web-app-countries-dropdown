import { useEffect, useState } from "react";
import { CData, DropdownOption } from "src/types/common";

const useFetchStates = (countryId: number | undefined) => {
  const [states, setStates] = useState<DropdownOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!countryId) {
      return;
    }

    const fetchCountries = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/countries/${countryId}/states`,
          {
            method: "GET",
            headers: {
              "x-api-key": import.meta.env.VITE_APP_X_API_KEY ?? "",
            },
          }
        );
        const data = await response.json();
        setStates(
          data.map((item: CData) => ({
            value: item.id,
            label: item.value,
          }))
        );
      } catch (error) {
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, [countryId]);

  return { states, isLoading };
};

export default useFetchStates;
