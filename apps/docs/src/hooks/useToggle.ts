import { useState } from "react"

export const useToggle = (defaultValue: boolean): [boolean, () => void] => {
  const [value, setValue] = useState<boolean>(defaultValue);
  const toggleValue = () => setValue((prevValue) => !prevValue);
  return [value, toggleValue];
}