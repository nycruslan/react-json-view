import { useCallback, useContext, useEffect, useState } from 'react';
import { CollapsibleContext } from '../context';

export const useCollapsible = (initialState: boolean = true, id: string) => {
  const context = useContext(CollapsibleContext);
  if (!context) {
    throw new Error('useCollapsible must be used within a CollapsibleProvider');
  }

  const { states, setCollapsedState } = context;
  const [collapsed, setCollapsed] = useState<boolean>(
    () => states[id] ?? initialState
  );

  const toggleCollapse = useCallback(() => {
    setCollapsed(prev => {
      const newState = !prev;
      requestAnimationFrame(() => setCollapsedState(id, newState));
      return newState;
    });
  }, [id, setCollapsedState]);

  useEffect(() => {
    if (id in states) {
      setCollapsed(states[id]);
    } else {
      setCollapsed(initialState);
    }
  }, [id, initialState, states]);

  return { collapsed, toggleCollapse };
};
