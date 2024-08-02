import { FailureResponse } from "../types/TmdbTypes";
import { CONSTANTS } from "./Constants";

export async function fetchApi<T>(
  endPoint = "",
  methodType: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
  requestBody?: unknown
): Promise<T> {
  const completeUrl = new URL(CONSTANTS.ENV.TMDB_API_BASE_URL + endPoint);
  completeUrl.searchParams.set("api_key", CONSTANTS.ENV.TMDB_API_KEY);

  const options: RequestInit = {
    method: methodType,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (
    requestBody &&
    (methodType === "POST" || methodType === "PUT" || methodType === "PATCH")
  ) {
    options.body = JSON.stringify(requestBody);
  }

  try {
    const response = await fetch(completeUrl.toString(), options);
    const data = await response.json();

    if (!response.ok) {
      const errorMessage =
        (data as FailureResponse).status_message || "Unknown error occurred";
      console.log(errorMessage);
      throw new Error(errorMessage);
    }

    return data as T;
  } catch (error: unknown) {
    console.error(`Error Fetching Data: ${error}`);
    throw new Error(`Failed to fetch data`);
  }
}
