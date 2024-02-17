import { memo, ReactElement } from 'react';

import type { JsonViewerProps } from './types';

import { JsonViewerContent } from './components/JsonViewerContent';
import { CollapsibleProvider } from './context';

/**
 * Renders a JSON Viewer component that displays JSON data in a collapsible tree format.
 *
 * The `JsonViewer` component provides a visual representation of JSON data with features
 * such as collapsible nodes and custom styling options. It leverages the `JsonViewerContent`
 * for rendering the actual content and `CollapsibleProvider` for managing the collapsible state.
 *
 * @component
 * @param {JsonViewerProps} props - The properties passed to the JsonViewer component.
 * @param {object} props.data - The JSON data to be visualized by the JsonViewer.
 * @param {string} [props.rootName="root"] - The root name to be displayed at the root level of the JSON structure.
 * @param {React.CSSProperties} [props.style] - Optional CSS styles to be applied to the JsonViewer component.
 * @param {number} [props.expandLevel=0] - The initial level to which the JSON structure is expanded.
 * @param {Function} [props.onCopy] - Optional callback function to be invoked when a copy action is performed.
 *
 * @returns {ReactElement} A React Element that represents the JSON Viewer component.
 *
 * @example
 * <JsonViewer
 *   data={{ key: 'value', nested: { anotherKey: 'anotherValue' } }}
 *   rootName="Example JSON"
 *   expandLevel={1}
 *   onCopy={(copyInfo) => console.log('Copy action:', copyInfo)}
 * />
 */
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
