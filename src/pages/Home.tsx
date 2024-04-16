import Dropdown from "components/Dropdown";

type Props = {
  title?: string;
};

export default function Home({}: Props) {
  return (
    <div className="rounded-lg bg-white min-h-[calc(100vh_-_162px)] w-full flex flex-col gap-3 p-8">
      <Dropdown onChange={() => {}} />
      <Dropdown onChange={() => {}} />
    </div>
  );
}
