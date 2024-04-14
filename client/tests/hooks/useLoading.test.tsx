import { renderHook, act } from "@testing-library/react";
import useLoading from "../../src/hooks/useLoading";

describe("useLoading hook", () => {
  test("should set loading to true when load function is called", async () => {
    const { result } = renderHook(() => useLoading());
    expect(result.current.loading).toBe(false);
    act(() => {
      result.current.load();
    });
    expect(result.current.loading).toBe(true);
  });
  test("should set loading to false when promise resolves", async () => {
    const { result } = renderHook(() => useLoading());
    expect(result.current.loading).toBe(false);
    await act(async () => {
      await result.current.load(Promise.resolve());
    });
    expect(result.current.loading).toBe(false);
  });
});
