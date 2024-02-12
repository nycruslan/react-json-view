// Import the necessary dependencies
import { memo, ReactElement } from 'react';

import type { JsonViewerProps } from './types';

import { JsonViewerContent } from './components/JsonViewerContent';
import { CollapsibleProvider } from './context';

// Define the JsonViewer component
export const JsonViewer = memo(
  ({
    data,
    rootName = 'root',
    style,
    expandLevel = 0,
    onCopy,
  }: JsonViewerProps): ReactElement => {
    return (
      <CollapsibleProvider>
        <JsonViewerContent
          data={data}
          rootName={rootName}
          style={style}
          expandLevel={expandLevel}
          onCopy={onCopy}
        />
      </CollapsibleProvider>
    );
  }
);
