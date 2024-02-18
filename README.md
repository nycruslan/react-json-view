# JsonViewer Component Library

Welcome to the JsonViewer component library! This React-based tool is designed to render JSON data in a beautifully structured, collapsible format. It offers a convenient and intuitive way to visualize JSON structures, with features that enhance both functionality and user experience.

## Features

- **Collapsible JSON View**: Toggle visibility for sections of your JSON data for improved readability.
- **Customizable Expansion Level**: Define the initial expansion level to tailor the display of your JSON data.
- **Copy Functionality**: Enable users to copy data elements directly from the viewer.
- **Custom Styling**: Style the JSON viewer to seamlessly integrate with your application's aesthetics.
- **Root Name Customization**: Assign a custom name to the root node of your JSON structure for clearer representation.

## Installation

Install the JsonViewer component library with npm:

```bash
npm install view-json-react
```

Or with Yarn:

```bash
yarn add view-json-react
```

## Usage

Incorporate the JsonViewer component into your React application like so:

```jsx
import React from 'react';
import { JsonViewer } from 'view-json-react';

const App = () => {
  const jsonData = {
    /* your JSON data */
  };

  return <JsonViewer data={jsonData} expandLevel={1} />;
};

export default App;
```

## Props

The JsonViewer component accepts the following props:

- `data` (required): The JSON data to visualize.
- `rootName` (optional, default: `'root'`): Name for the root node. Set to false to remove.
- `style` (optional): CSS properties for custom styling.
- `expandLevel` (optional, default: `0`): Initial JSON structure expansion level.
- `onCopy` (optional): Callback for the copy action.

## Customization

### Styling

Apply custom styles via the `style` prop:

```jsx
<JsonViewer
  data={yourData}
  style={{ backgroundColor: '#282c34', color: '#61dafb' }}
/>
```

### Copy Functionality

Enable data copying with the `onCopy` prop:

```jsx
<JsonViewer
  data={yourData}
  onCopy={copyData => console.log('Copied data:', copyData)}
/>
```

## Contributing

We welcome contributions! Feel free to open an issue or submit a pull request for any bugs, feature requests, or improvements.

## License

JsonViewer is made available under the MIT License. See the [LICENSE](./LICENSE) file for more details.
