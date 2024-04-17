import Dropdown from "components/Dropdown";
import useFetchCountries from "hooks/useFetchCountries";
import useFetchStates from "hooks/useFetchStates";
import { useState } from "react";

export default function Home() {
  const [country, setCountry] = useState<number | undefined>(undefined);
  const [stateOfCountry, setStateOfCountry] = useState<number | undefined>(
    undefined
  );
  const { countries, isLoading: isLoadingCountries } = useFetchCountries();
  const { states, isLoading: isLoadingStates } = useFetchStates(country);

  const handleChangeCountry = (value: number) => {
    setStateOfCountry(undefined);
    setCountry(value);
  };

  const handleChangeStateOfCountry = (value: number) => {
    setStateOfCountry(value);
  };

  return (
    <div className="rounded-lg bg-white min-h-[calc(100vh_-_162px)] w-full flex flex-col gap-3 p-8">
      <Dropdown
        options={countries}
        onChange={handleChangeCountry}
        value={country}
        isLoading={isLoadingCountries}
      />
      <Dropdown
        options={states}
        onChange={handleChangeStateOfCountry}
        value={stateOfCountry}
        disabled={!country}
        isLoading={isLoadingStates}
      />
    </div>
  );
}
