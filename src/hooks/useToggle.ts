import { useState } from "react";

// Explicit tuple return type: [current state value, toggle function]
function useToggle(initialValue: boolean = false): [boolean, () => void] {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = (): void => {
    setValue((prev) => !prev);
  };

  return [value, toggle];
}

export default useToggle;