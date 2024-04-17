import { TData } from "src/types/common";

export const fetchData = async (url: string): Promise<TData[]> => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-api-key": import.meta.env.VITE_APP_X_API_KEY ?? "",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
