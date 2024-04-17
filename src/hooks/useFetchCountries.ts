import { useEffect, useState } from "react";
import { fetchData } from "../api";
import { CData, DropdownOption } from "src/types/common";

const useFetchCountries = () => {
  const [countries, setCountries] = useState<DropdownOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_APP_API_URL}/countries`)
      .then((data) => {
        setCountries(
          data.map((item: CData) => ({
            value: item.id,
            label: item.value,
          }))
        );
      })
      .catch((error) => {
        throw error;
      })
      .finally(() => setIsLoading(false));
  }, []);

  return { countries, isLoading };
};

export default useFetchCountries;
