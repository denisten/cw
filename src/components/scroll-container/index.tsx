import React, { useEffect, useRef, useState } from 'react';
import dragscroll from 'dragscroll';
import styled from 'styled-components';
import debounce from 'debounce';

const ScrollContainerWrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

// export class ScrollContainer extends PureComponent<IScrollContainer, {}> {
//   container = React.createRef<HTMLDivElement>();
//   isPressed = false;
//   isScrolling = false;
//
//   componentDidMount() {
//     const { onMountCallback } = this.props;
//     dragscroll.reset();
//     onMountCallback(this.container.current);
//   }
//
//   onEndScroll = () => {
//     const { onEndScrollCallback } = this.props;
//     const container = this.container.current;
//     if (container && !this.isPressed) {
//       if (onEndScrollCallback) {
//         onEndScrollCallback([container.scrollTop, container.scrollLeft]);
//         this.isScrolling = false;
//       }
//       console.log('on ended scroll');
//     }
//   };
//   debouncedOnEndScroll = debounce(this.onEndScroll, 300);
//
//   onScroll = () => {
//     const container = this.container.current;
//     if (container) {
//       if (
//         container.scrollLeft !== this.scrollLeft ||
//         container.scrollTop !== this.scrollTop
//       ) {
//         this.scrolling = true;
//         this.processScroll(e);
//         this.onEndScroll();
//       }
//     }
//     if (this.isScrolling) {
//       this.debouncedOnEndScroll();
//     } else {
//       if (this.props.onStartScrollCallback) {
//         this.props.onStartScrollCallback();
//         this.isScrolling = true;
//       }
//     }
//   };
//
//   render() {
//     const { children } = this.props;
//     return (
//       <ScrollContainerWrapper
//         className="dragscroll"
//         onScroll={this.onScroll}
//         ref={this.container}
//         onMouseDown={() => (this.isScrolling = true)}
//         onMouseUp={() => (this.isScrolling = false)}
//       >
//         {children}
//       </ScrollContainerWrapper>
//     );
//   }
// }
// const doNothingFunction = () => {};
const delay = 300;
export const ScrollContainer: React.FC<IScrollContainer> = React.memo(
  ({
    children,
    onMountCallback,
    onEndScrollCallback,
    onScrollCallback,
    onStartScrollCallback,
  }) => {
    const [isScrolling, setIsScrolling] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const myRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      dragscroll.reset();
      if (myRef.current) {
        onMountCallback(myRef.current);
      }
    }, []);

    const onEndScroll = debounce(() => {
      if (myRef.current && !isPressed) {
        onEndScrollCallback([
          myRef.current.scrollTop,
          myRef.current.scrollLeft,
        ]);
        setIsScrolling(false);
      }
    }, delay);

    const onScroll = () => {
      onScrollCallback();
      if (isScrolling) {
        onEndScroll();
      } else {
        onStartScrollCallback();
        setIsScrolling(true);
      }
    };
    return (
      <ScrollContainerWrapper
        className="dragscroll"
        onScroll={onScroll}
        ref={myRef}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
      >
        {children}
      </ScrollContainerWrapper>
    );
  }
);

interface IScrollContainer {
  onMountCallback: Function;
  onEndScrollCallback: (args: number[]) => void;
  onScrollCallback: () => void;
  onStartScrollCallback: () => void;
}
