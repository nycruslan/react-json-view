import { useCallback, useContext, useEffect, useState } from 'react';
import { CollapsibleContext } from '../context'; // Adjust the import path as necessary

export const useCollapsible = (initialState: boolean = true, id: string) => {
  const context = useContext(CollapsibleContext);
  if (!context) {
    throw new Error('useCollapsible must be used within a CollapsibleProvider');
  }

  const { states, setCollapsedState } = context;
  const [collapsed, setCollapsed] = useState<boolean>(
    states[id] ?? initialState
  );

  const toggleCollapse = useCallback(() => {
    setCollapsed(prev => {
      const newState = !prev;
      setCollapsedState(id, newState);
      return newState;
    });
  }, [id, setCollapsedState]);

  // Effect to handle external updates to initialState or id
  useEffect(() => {
    if (id in states) {
      setCollapsed(states[id]);
    } else {
      setCollapsed(initialState);
    }
  }, [id, initialState, states]);

  return { collapsed, toggleCollapse };
};
