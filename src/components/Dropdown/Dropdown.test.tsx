import Dropdown from "components/Dropdown";
import { render } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";

describe("Dropdown test", () => {
  test("Should show the dropdown", () => {
    const onClick = vi.fn();

    const { getByRole } = render(<Dropdown options={[]} onChange={onClick} />);

    const button = getByRole("button");

    expect(button).toBeInTheDocument();
  });
});
