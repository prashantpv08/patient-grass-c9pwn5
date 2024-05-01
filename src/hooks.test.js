import { renderHook } from "@testing-library/react-hooks";
import { useProduct } from "./hooks";

describe("useProduct", () => {
  it("should start with initial state and load products", async () => {
    const mockProducts = { products: [{ id: 1, name: "Test Product" }] };
    fetch.mockResponseOnce(JSON.stringify(mockProducts));

    const { result, waitForNextUpdate } = renderHook(() => useProduct());

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toEqual([]);

    await waitForNextUpdate({ timeout: 3000 });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("");
  });

  it("should handle fetch error", async () => {
    fetch.mockReject(new Error("API failure"));

    const { result, waitForNextUpdate } = renderHook(() => useProduct());

    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("Error: API failure");
    expect(result.current.data).toEqual([]);
  });
});
