import { memo } from 'react';

import type { JsonViewerProps } from './types';

import { CollapsibleProvider } from './context';
import { JsonNode } from './components/JsonNode';

import styles from './styles.module.scss';

/**
 * Renders a JSON Viewer component that displays JSON data in a collapsible tree format.
 *
 * The `JsonViewer` component provides a visual representation of JSON data with features
 * such as collapsible nodes and custom styling options. It leverages the `JsonViewerContent`
 * for rendering the actual content and `CollapsibleProvider` for managing the collapsible state.
 *
 * @component
 * @param {JsonViewerProps} props - The properties passed to the JsonViewer component.
 * @param {unknown} props.data - The data to be visualized by the JsonViewer.
 * @param {string|false} [props.rootName] - The root name to be displayed at the root level of the JSON structure. No root name if not specified.
 * @param {React.CSSProperties} [props.style] - Optional CSS styles to be applied to the JsonViewer component.
 * @param {number} [props.expandLevel=0] - The initial level to which the JSON structure is expanded.
 * @param {Function} [props.onCopy] - Optional callback function to be invoked when a copy action is performed.
 *
 * @returns {ReactElement} A React Element that represents the JSON Viewer component.
 *
 * @example
 * <JsonViewer
 *   data={{ key: 'value', nested: { anotherKey: 'anotherValue' } }}
 *   rootName="ExampleJSON"
 *   expandLevel={1}
 *   onCopy={(copyInfo) => console.log('Copy action:', copyInfo)}
 * />
 */
export const JsonViewer: React.FC<JsonViewerProps> = memo(props => (
  <CollapsibleProvider>
    <div className={styles.viewer}>
      <JsonNode keys={[]} isRoot {...props} />
    </div>
  </CollapsibleProvider>
));
