# JsonViewer Component Library

Welcome to the JsonViewer component library, a React-based tool designed to render JSON data in a beautifully structured, collapsible format. This library offers a convenient way to visualize JSON structures with optional levels of expansion and supports copying data directly from the viewer.

## Features

- **Collapsible JSON View**: Easily collapse and expand sections of your JSON data for better visualization.
- **Customizable Expansion Level**: Control the initial expansion level to display your JSON data as needed.
- **Copy Functionality**: Optional support for copying data elements directly from the viewer.
- **Styling**: Apply custom styles to the JSON viewer to match your application's design.
- **Root Name Customization**: Set a custom name for the root node of your JSON data.

## Installation

You can install the JsonViewer component library into your project by running:

```bash
npm install your-jsonviewer-package-name
```

or if you use Yarn:

```bash
yarn add your-jsonviewer-package-name
```

## Usage

Here's a simple way to use the JsonViewer component in your React application:

```jsx
import React from 'react';
import { JsonViewer } from 'your-jsonviewer-package-name';

const App = () => {
  const jsonData = {
    name: 'John Doe',
    age: 30,
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
    },
  };

  return (
    <div>
      <JsonViewer data={jsonData} expandLevel={1} />
    </div>
  );
};

export default App;
```

## Props

- **data** (required): The JSON data you want to visualize.
- **rootName** (optional): A string representing the name of the root node. Default is `'root'`.
- **style** (optional): Custom styles to apply to the viewer.
- **expandLevel** (optional): An integer indicating how many levels in the JSON structure should be expanded by default. Default is `0`.
- **onCopy** (optional): A callback function that gets triggered when a data element is copied.

## Styling

The JsonViewer component accepts a `style` prop allowing you to customize its appearance. For example:

```jsx
<JsonViewer
  data={yourData}
  style={{ backgroundColor: '#282c34', color: '#61dafb' }}
/>
```

## Copy Functionality

To enable copying data from the viewer, pass a function to the `onCopy` prop:

```jsx
<JsonViewer
  data={yourData}
  onCopy={copyData => console.log('Data copied:', copyData)}
/>
```

The `copyData` object contains the keys and values selected for copying.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any bugs, feature requests, or improvements.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

This readme provides a basic overview and setup instructions for the JsonViewer component library. Be sure to adjust the installation instructions and package name according to your actual package details.
