import { useEffect, useState } from "react";
import { fetchData } from "../api";
import { TData, TDropdown } from "src/types/common";

const useFetchCountries = () => {
  const [countries, setCountries] = useState<TDropdown[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_APP_API_URL}/countries`)
      .then((data) => {
        setCountries(
          data.map((item: TData) => ({
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
