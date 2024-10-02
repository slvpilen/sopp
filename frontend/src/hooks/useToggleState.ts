import { useState } from 'react';

export function useToggleState() {
  const [state, setState] = useState(false);

  const toggleState = () => setState(!state);

  return [state, toggleState] as const;
}
