import React from 'react';

const pointSize = 50;
const spanSize = 10;
var importedstyles = {
  grid: {
    width: 'fit-content',
    userSelect: 'none',
    position: 'relative'
  },
  row: {
    width: 'fit-content',
    fontSize: 0
  },
  point: {
    width: pointSize + 'px',
    height: pointSize + 'px',
    display: 'inline-block',
    margin: '20px'
  },
  selected_point: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  unselected_point: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  svg: {
    position: 'absolute',
    opacity: 0,
    top: 0,
    left: 0,
    pointerEvents: 'none'
  },
  pointSpanSelected: {
    display: 'block',
    borderRadius: '50%',
    width: spanSize + 'px',
    height: spanSize + 'px',
    backgroundColor: '#000',
    border: '1px solid #000'
  },
  pointSpanUnselected: {
    display: 'block',
    borderRadius: '50%',
    width: spanSize + 'px',
    height: spanSize + 'px',
    backgroundColor: 'transparent',
    border: '1px solid #000'
  }
};

class Selection {
  constructor() {
    this.init();
  }

  init() {
    this.selected = [];
    this.selectedStates = [];
    this.lines = [];
    this.selecting = false;
    this.linePreviousPoint = [];
  }

  start() {
    this.init();
    this.selecting = true;
    window.addEventListener('mouseup', () => this.stop());
    this.showLine();
  }

  showLine() {
    let svg = svgLineRef.current;
    svg.style.opacity = 1;
    svg.style.width = buttonsRef.current.offsetWidth + 'px';
    svg.setAttribute('width', buttonsRef.current.offsetWidth);
    svg.style.height = buttonsRef.current.offsetHeight + 'px';
    svg.setAttribute('height', buttonsRef.current.offsetHeight);
  }

  hideLine() {
    let svg = svgLineRef.current;
    svg.style.opacity = 0;
    svg.style.width = '';
    svg.style.height = '';
  }

  processLine() {
    let lines = this.lines;
    svgLineRef.current.innerHTML = '';

    if (!styles.hideLine) {
      return;
    }

    lines.forEach((line, i) => {
      let lineNode = document.createElementNS("http://www.w3.org/2000/svg", 'line');
      lineNode.setAttribute('x1', line[0][0]);
      lineNode.setAttribute('y1', line[0][1]);
      lineNode.setAttribute('x2', line[1][0]);
      lineNode.setAttribute('y2', line[1][1]);
      lineNode.setAttribute('stroke', styles.lineColor);
      lineNode.setAttribute('stroke-width', styles.lineWidth);
      svgLineRef.current.appendChild(lineNode);
    });
  }

  select(id, coordinates, callback) {
    this.selected.push(id);
    this.selectedStates.push(callback);
    let currentPoint = [coordinates.x, coordinates.y];

    if (this.selected.length > 1) {
      this.lines.push([this.linePreviousPoint, currentPoint]);
    }

    this.linePreviousPoint = currentPoint;
    this.processLine();
  }

  stop() {
    if (!this.selecting) {
      return;
    }

    this.selectedStates.forEach(callback => callback());
    this.selecting = false;
    stopCallback(this.selected);
    this.hideLine();
  }

}

let svgLineRef = React.createRef(null);
let buttonsRef = React.createRef(null);
let sel = new Selection();

class Point extends React.Component {
  constructor(props) {
    super(props);
    this.id = props['point-id'];
    this.state = {
      selected: false
    };
  }

  handleStart(e) {
    this.setState({
      selected: true
    });
    sel.start();
    sel.select(this.id, this.calculate(e), () => this.setState({
      selected: false
    }));
  }

  handleMouseEnter(e) {
    if (sel.selecting && !sel.selected.includes(this.id)) {
      this.calculate(e);
      sel.select(this.id, this.calculate(e), () => this.setState({
        selected: false
      }));
    }
  }

  calculate(e) {
    this.setState({
      selected: true
    });

    let _x = e.target.offsetLeft + e.target.offsetWidth / 2;

    let _y = e.target.offsetTop + e.target.offsetHeight / 2;

    return {
      x: _x,
      y: _y
    };
  }

  handleStop() {
    sel.stop();
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "__graphic_key_point",
      onMouseDown: e => this.handleStart(e),
      onMouseEnter: e => this.handleMouseEnter(e),
      onMouseUp: () => this.handleStop(),
      style: styles.point
    }, /*#__PURE__*/React.createElement("div", {
      className: this.state.selected ? "__graphic_key_selected_point" : "__graphic_key_unselected_point",
      style: this.state.selected ? styles.selected_point : styles.unselected_point
    }, /*#__PURE__*/React.createElement("span", {
      style: this.state.selected ? styles.pointSpanSelected : styles.pointSpanUnselected
    })));
  }

}

function PointsRow(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "__graphic_key_row",
    style: styles.row
  }, props.children);
}

function Line() {
  return /*#__PURE__*/React.createElement("svg", {
    ref: svgLineRef,
    style: styles.svg
  });
}

function nlsh(first, second, appendToSecond = false) {
  let result = first !== null && first !== undefined ? first : second;

  if (appendToSecond) {
    second = result;
  } else {
    return result;
  }
}

let stopCallback = selected => {};

let styles = {};
let stylesAssigned = false;

function GraphicKey(props) {
  const width = nlsh(props.width, 3);
  const height = nlsh(props.height, 3);
  stopCallback = nlsh(props.onEnd, selected => {});

  if (!stylesAssigned) {
    g;
    let stylings = nlsh(props.stylings, {});
    styles = Object.assign({}, importedstyles);
    stylesAssigned = true;
    styles.pointSpanSelected.border = nlsh(stylings.borderWidth, 1) + 'px solid ' + nlsh(stylings.borderColor, '#000');
    styles.pointSpanUnselected.border = nlsh(stylings.borderWidth, 1) + 'px solid ' + nlsh(stylings.borderColor, '#000');
    nlsh(stylings.backgroundColor, styles.pointSpanSelected.backgroundColor, true);
    nlsh(stylings.backgroundColor, styles.pointSpanUnselected.backgroundColor, true);
    styles.pointSpanSelected.width = nlsh(stylings.pointSize, 10) + 'px';
    styles.pointSpanSelected.height = nlsh(stylings.pointSize, 10) + 'px';
    styles.pointSpanUnselected.width = nlsh(stylings.pointSize, 10) + 'px';
    styles.pointSpanUnselected.height = nlsh(stylings.pointSize, 10) + 'px';
    nlsh(stylings.pointMargin, styles.point.margin, true);

    if (stylings.animateOnSelect === false) {
      styles.pointSpanUnselected.backgroundColor = styles.pointSpanSelected.backgroundColor;
    }

    styles.hideLine = stylings.hideLine === false ? false : true;
    styles.lineColor = nlsh(stylings.lineColor, 'black');
    styles.lineWidth = nlsh(stylings.lineWidth, 5);
  }

  const content = Array(height).fill().map((el, i) => {
    const row = Array(width).fill().map((e, j) => /*#__PURE__*/React.createElement(Point, {
      key: j,
      "point-id": i * width + j
    }));
    return /*#__PURE__*/React.createElement(PointsRow, {
      key: i
    }, row);
  });
  return /*#__PURE__*/React.createElement("div", {
    id: "__graphic_key_grid",
    style: styles.grid
  }, /*#__PURE__*/React.createElement("div", {
    id: "__graphic_key_svg_line"
  }, /*#__PURE__*/React.createElement(Line, null)), /*#__PURE__*/React.createElement("div", {
    id: "__graphic_key_buttons",
    ref: buttonsRef
  }, content));
}

export default GraphicKey;
//# sourceMappingURL=index.modern.js.map
