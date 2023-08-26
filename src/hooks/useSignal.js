import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useSignal = (clear) => {
  const dispatch = useDispatch();
  const signal = new AbortController();

  useEffect(() => {
    return () => {
      clear && dispatch(clear());
      signal.abort();
    };
  }, []);

  return { signal: signal.signal };
};
