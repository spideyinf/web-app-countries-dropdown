import Button from "components/Button";
import Dropdown from "components/Dropdown";
import useFetchCountries from "hooks/useFetchCountries";
import useFetchStates from "hooks/useFetchStates";
import { useState } from "react";
import { TDropdown } from "src/types/common";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [country, setCountry] = useState<TDropdown | undefined>(undefined);
  const [stateOfCountry, setStateOfCountry] = useState<TDropdown | undefined>(
    undefined
  );
  const { countries, isLoading: isLoadingCountries } = useFetchCountries();
  const { states, isLoading: isLoadingStates } = useFetchStates(country?.value);
  const navigate = useNavigate();

  const handleChangeCountry = (value: TDropdown) => {
    setStateOfCountry(undefined);
    setCountry(value);
  };

  const handleChangeStateOfCountry = (value: TDropdown) => {
    setStateOfCountry(value);
  };

  const handleSubmit = () => {
    navigate("/submit", { state: { country, stateOfCountry } });
  };

  return (
    <div className="rounded-lg bg-white min-h-[calc(100vh_-_162px)]">
      <div className="w-full md:max-w-[600px] flex flex-col gap-3 p-8">
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
        <Button
          type="submit"
          className="w-fit"
          disabled={!country || !stateOfCountry}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
