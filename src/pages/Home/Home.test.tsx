import { render } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import useFetchCountries from "hooks/useFetchCountries";
import Home from "pages/Home/Home";
import { describe, expect, test, vi } from "vitest";

const mockedUseNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const mod = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
  };
});

describe("Home test", () => {
  test("Should show the 2 dropdowns on Home", () => {
    const { getAllByTestId } = render(<Home />);
    const dropdowns = getAllByTestId("dropdown");
    expect(dropdowns.length).toBe(2);
  });

  test("Should fetch countries from API from custom hook", async () => {
    const { result, waitFor } = renderHook(() => useFetchCountries());

    await waitFor(() =>
      expect(result.current.countries.length).toBeGreaterThan(0)
    );
  });
});
