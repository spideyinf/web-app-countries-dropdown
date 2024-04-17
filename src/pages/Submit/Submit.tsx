import { useLocation } from "react-router-dom";

export default function Submit() {
  const { state } = useLocation();

  return (
    <div className="rounded-lg bg-white min-h-[calc(100vh_-_162px)] p-6">
      <h1 className="text-2xl font-bold">Submitted</h1>
      <p className="text-lg">Country: {state?.country?.label}</p>
      <p className="text-lg">State: {state?.stateOfCountry?.label}</p>
    </div>
  );
}
