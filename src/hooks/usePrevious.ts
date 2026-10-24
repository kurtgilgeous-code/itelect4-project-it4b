import { useState } from "react";

// Generic T allows storing previous values for any state type
function usePrevious<T>(value: T): T | undefined {
  const [state, setState] = useState<{ current: T; previous: T | undefined }>({
    current: value,
    previous: undefined,
  });

  if (!Object.is(value, state.current)) {
    setState({ current: value, previous: state.current });
  }

  return state.previous;
}

export default usePrevious;