# react-graphic-key

> Customizable ReactJS component of graphic key

[![NPM](https://img.shields.io/npm/v/react-graphic-key.svg)](https://www.npmjs.com/package/react-graphic-key) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

![Demo](https://user-images.githubusercontent.com/59040542/113913643-9fdc7280-97ed-11eb-87ad-c5a7042b23f5.gif)

## Install

```bash
npm install --save react-graphic-key
```

## Usage

```jsx
import React from 'react'
import GraphicKey from 'react-graphic-key'

function App() {
  render() {
    return <GraphicKey onEnd={points => alert('Selected '+points.join(', '))} />
  }
}
```

## Component props

| GraphicKey | component | props |
|------------|-----------|-------|
| width | optional (default: 3) | Number of points in width for graphic key area |
| height | optional (default: 3) | Number of points in height for graphic key area |
| onEnd | optional (function) | Callback which will be called with 1 argument — array of numbers, selected points |
| stylings | optional (object) | Object of styles for graphic key area (see fields below) |

## Customization

In order to customize component, you have to pass `stylings` object as prop.

| stylings | object | fields |
|----------|--------|--------|
| borderColor | css color string | Color of point border |
| borderWidth | css color string | Width of point border |
| backgroundColor | css color string | Background color of point |
| pointSize | number of pixels | Background color of point |
| pointMargin | number of pixels | outer margin from interactive area to row border |
| animateOnSelect | true or false | If true, background will change from transparent to backgroundColor on selection |
| hideLine | true or false | If true, selection line between points will be hidden |
| lineColor | css color string | Color of selection line |
| lineWidth | number of pixels | Width of selection line |

css color string may be hex (`#121212`), rgb/rgba (`rgba(0, 0, 0, 0.25)`) or hsl.

## Examples

```
import React from 'react'
import GraphicKey from 'react-graphic-key'

function App() {
  render() {
    return <GraphicKey width={3} height={1} />
  }
}
```

```
import React from 'react'
import GraphicKey from 'react-graphic-key'

function App() {
  render() {
    return <GraphicKey width={4} height={4} stylings={{
        backgroundColor: 'green',
        borderColor: 'blue'
      }} />
  }
}
```

## IDs

ID of each point is count of points in row multiplied by row index plus it's position in row:

```
1 2 3
4 5 6
7 8 9
```

OR

```
 1  2  3  4  5
 6  7  8  9 10
11 12 13 14 15
16 17 18 19 20
21 22 23 24 25
```

OR

```
1 2 3 4  5
6 7 8 9 10
```

## License

MIT © [VityaSchel](https://github.com/VityaSchel)
