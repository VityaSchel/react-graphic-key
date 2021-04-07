function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

var pointSize = 50;
var spanSize = 10;
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

var Selection = /*#__PURE__*/function () {
  function Selection() {
    this.init();
  }

  var _proto = Selection.prototype;

  _proto.init = function init() {
    this.selected = [];
    this.selectedStates = [];
    this.lines = [];
    this.selecting = false;
    this.linePreviousPoint = [];
  };

  _proto.start = function start() {
    var _this = this;

    this.init();
    this.selecting = true;
    window.addEventListener('mouseup', function () {
      return _this.stop();
    });
    this.showLine();
  };

  _proto.showLine = function showLine() {
    var svg = svgLineRef.current;
    svg.style.opacity = 1;
    svg.style.width = buttonsRef.current.offsetWidth + 'px';
    svg.setAttribute('width', buttonsRef.current.offsetWidth);
    svg.style.height = buttonsRef.current.offsetHeight + 'px';
    svg.setAttribute('height', buttonsRef.current.offsetHeight);
  };

  _proto.hideLine = function hideLine() {
    var svg = svgLineRef.current;
    svg.style.opacity = 0;
    svg.style.width = '';
    svg.style.height = '';
  };

  _proto.processLine = function processLine() {
    var lines = this.lines;
    svgLineRef.current.innerHTML = '';

    if (!styles.hideLine) {
      return;
    }

    lines.forEach(function (line, i) {
      var lineNode = document.createElementNS("http://www.w3.org/2000/svg", 'line');
      lineNode.setAttribute('x1', line[0][0]);
      lineNode.setAttribute('y1', line[0][1]);
      lineNode.setAttribute('x2', line[1][0]);
      lineNode.setAttribute('y2', line[1][1]);
      lineNode.setAttribute('stroke', styles.lineColor);
      lineNode.setAttribute('stroke-width', styles.lineWidth);
      svgLineRef.current.appendChild(lineNode);
    });
  };

  _proto.select = function select(id, coordinates, callback) {
    this.selected.push(id);
    this.selectedStates.push(callback);
    var currentPoint = [coordinates.x, coordinates.y];

    if (this.selected.length > 1) {
      this.lines.push([this.linePreviousPoint, currentPoint]);
    }

    this.linePreviousPoint = currentPoint;
    this.processLine();
  };

  _proto.stop = function stop() {
    if (!this.selecting) {
      return;
    }

    this.selectedStates.forEach(function (callback) {
      return callback();
    });
    this.selecting = false;
    stopCallback(this.selected);
    this.hideLine();
  };

  return Selection;
}();

var svgLineRef = React.createRef(null);
var buttonsRef = React.createRef(null);
var sel = new Selection();

var Point = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Point, _React$Component);

  function Point(props) {
    var _this2;

    _this2 = _React$Component.call(this, props) || this;
    _this2.id = props['point-id'];
    _this2.state = {
      selected: false
    };
    return _this2;
  }

  var _proto2 = Point.prototype;

  _proto2.handleStart = function handleStart(e) {
    var _this3 = this;

    this.setState({
      selected: true
    });
    sel.start();
    sel.select(this.id, this.calculate(e), function () {
      return _this3.setState({
        selected: false
      });
    });
  };

  _proto2.handleMouseEnter = function handleMouseEnter(e) {
    var _this4 = this;

    if (sel.selecting && !sel.selected.includes(this.id)) {
      this.calculate(e);
      sel.select(this.id, this.calculate(e), function () {
        return _this4.setState({
          selected: false
        });
      });
    }
  };

  _proto2.calculate = function calculate(e) {
    this.setState({
      selected: true
    });

    var _x = e.target.offsetLeft + e.target.offsetWidth / 2;

    var _y = e.target.offsetTop + e.target.offsetHeight / 2;

    return {
      x: _x,
      y: _y
    };
  };

  _proto2.handleStop = function handleStop() {
    sel.stop();
  };

  _proto2.render = function render() {
    var _this5 = this;

    return /*#__PURE__*/React.createElement("div", {
      className: "__graphic_key_point",
      onMouseDown: function onMouseDown(e) {
        return _this5.handleStart(e);
      },
      onMouseEnter: function onMouseEnter(e) {
        return _this5.handleMouseEnter(e);
      },
      onMouseUp: function onMouseUp() {
        return _this5.handleStop();
      },
      style: styles.point
    }, /*#__PURE__*/React.createElement("div", {
      className: this.state.selected ? "__graphic_key_selected_point" : "__graphic_key_unselected_point",
      style: this.state.selected ? styles.selected_point : styles.unselected_point
    }, /*#__PURE__*/React.createElement("span", {
      style: this.state.selected ? styles.pointSpanSelected : styles.pointSpanUnselected
    })));
  };

  return Point;
}(React.Component);

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

function nlsh(first, second, appendToSecond) {
  if (appendToSecond === void 0) {
    appendToSecond = false;
  }

  var result = first !== null && first !== undefined ? first : second;

  if (appendToSecond) {
    second = result;
  } else {
    return result;
  }
}

var stopCallback = function stopCallback(selected) {};

var styles = {};
var stylesAssigned = false;

function GraphicKey(props) {
  var width = nlsh(props.width, 3);
  var height = nlsh(props.height, 3);
  stopCallback = nlsh(props.onEnd, function (selected) {});

  if (!stylesAssigned) {
    var stylings = nlsh(props.stylings, {});
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

  var content = Array(height).fill().map(function (el, i) {
    var row = Array(width).fill().map(function (e, j) {
      return /*#__PURE__*/React.createElement(Point, {
        key: j,
        "point-id": i * width + j
      });
    });
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

module.exports = GraphicKey;
//# sourceMappingURL=index.js.map
