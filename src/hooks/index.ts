import { useCallback, useState } from 'react';

export const useCollapsible = (initialState = true) => {
  const [collapsed, setCollapsed] = useState(initialState);
  const toggleCollapse = useCallback(() => setCollapsed(prev => !prev), []);

  return { collapsed, toggleCollapse };
};
