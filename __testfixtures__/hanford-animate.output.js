// Use https://github.com/hanford/animate to test transform

import * as React from "react";
import { Spring, config } from "react-spring";

class ZoomIn extends React.Component {
  static defaultProps = {
    reveal: true
  };

  render() {
    const { reveal, children, ...props } = this.props;

    return (
      <Spring
        {...props}
        from={{
          opacity: 0,
          scale: 0
        }}
        to={{
          opacity: reveal ? 1 : 0,
          scale: reveal ? 1 : 0
        }}
        config={config.gentle}
      >
        {({ opacity, scale }) => {
          if (opacity === 0) return null;

          const childStyle = children?.props?.style || {};
          const style = {
            ...childStyle,
            opacity,
            transform: `scale(${scale})`
          };

          return React.cloneElement(children, {
            ...children.props,
            style
          });
        }}
      </Spring>
    );
  }
}

export default ZoomIn;