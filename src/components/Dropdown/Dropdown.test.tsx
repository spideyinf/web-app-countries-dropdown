import Dropdown from "components/Dropdown";
import { fireEvent, render } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";

const options = [
  { value: 1, label: "Option 1" },
  { value: 2, label: "Option 2" },
];

describe("Dropdown test", () => {
  test("Should show the dropdown", () => {
    const onClick = vi.fn();
    const { getByTestId } = render(
      <Dropdown options={options} onChange={onClick} />
    );

    const dropdown = getByTestId("dropdown");
    expect(dropdown).toBeInTheDocument();
  });

  test("Should show the placeholder", () => {
    const onClick = vi.fn();
    const { getByText } = render(
      <Dropdown options={options} onChange={onClick} />
    );

    const placeholder = getByText("Select an option");
    expect(placeholder).toBeInTheDocument();
  });

  test("Simulates dropdown open/close", () => {
    const onClick = vi.fn();
    const { getByTestId, getAllByTestId } = render(
      <Dropdown options={options} onChange={onClick} />
    );

    const dropdown = getByTestId("dropdown");
    fireEvent.click(dropdown);

    const optionsList = getByTestId("dropdown-options");
    expect(optionsList).toBeVisible(); // open

    const optionsItems = getAllByTestId("dropdown-option");
    fireEvent.click(optionsItems[1]); // select an option

    expect(optionsList).not.toBeVisible(); // close
  });

  test("Should have option selected", () => {
    const onClick = vi.fn();
    const { getByTestId, getAllByTestId } = render(
      <Dropdown options={options} onChange={onClick} value={2} />
    );

    const dropdown = getByTestId("dropdown");
    fireEvent.click(dropdown);

    const optionsList = getByTestId("dropdown-options");
    expect(optionsList).toBeVisible(); // open

    const optionsItems = getAllByTestId("dropdown-option");
    fireEvent.click(optionsItems[0]); // select an option

    fireEvent.click(dropdown); // open again

    expect(optionsItems[0]).toHaveAttribute("aria-selected", "true"); // selected
  });
});
