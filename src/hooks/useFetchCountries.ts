import { useEffect, useState } from "react";
import { CData, DropdownOption } from "src/types/common";

const useFetchCountries = () => {
  const [countries, setCountries] = useState<DropdownOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/countries`,
          {
            method: "GET",
            headers: {
              "x-api-key": import.meta.env.VITE_APP_X_API_KEY ?? "",
            },
          }
        );
        const data = await response.json();
        setCountries(
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
  }, []);

  return { countries, isLoading };
};

export default useFetchCountries;
