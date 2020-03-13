// import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
// import classnames from 'classnames';
// import debounce from 'debounce';
//
// const SCROLL_END_DEBOUNCE = 300;
//
// export default class ScrollContainer extends PureComponent {
//   static propTypes = {
//     vertical: PropTypes.bool,
//     horizontal: PropTypes.bool,
//     hideScrollbars: PropTypes.bool,
//     activationDistance: PropTypes.number,
//     children: PropTypes.node,
//     onStartScroll: PropTypes.func,
//     onScroll: PropTypes.func,
//     onEndScroll: PropTypes.func,
//     className: PropTypes.string,
//     style: PropTypes.object,
//     ignoreElements: PropTypes.string,
//     nativeMobileScroll: PropTypes.bool,
//     stopPropagation: PropTypes.bool,
//   };
//
//   static defaultProps = {
//     nativeMobileScroll: true,
//     hideScrollbars: true,
//     activationDistance: 10,
//     vertical: true,
//     horizontal: true,
//     stopPropagation: false,
//     style: {},
//   };
//
//   constructor(props) {
//     super(props);
//     this.container = React.createRef();
//     this.onEndScroll = debounce(this.onEndScroll, SCROLL_END_DEBOUNCE);
//
//     // Is container scrolling now (for example by inertia)
//     this.scrolling = false;
//     // Is scrolling started
//     this.started = false;
//     // Is touch active or mouse pressed down
//     this.pressed = false;
//   }
//
//   componentDidMount() {
//     const { nativeMobileScroll } = this.props;
//     const container = this.container.current;
//
//     window.addEventListener('mouseup', this.onMouseUp);
//     window.addEventListener('mousemove', this.onMouseMove);
//     window.addEventListener('touchmove', this.onTouchMove, { passive: false });
//     window.addEventListener('touchend', this.onTouchEnd);
//
//     // due to https://github.com/facebook/react/issues/9809#issuecomment-414072263
//     container.addEventListener('touchstart', this.onTouchStart, {
//       passive: false,
//     });
//     container.addEventListener('mousedown', this.onMouseDown, {
//       passive: false,
//     });
//
//     if (nativeMobileScroll) {
//       // We should check if it's the mobile device after page was loaded
//       // to prevent breaking SSR
//       this.isMobile = this.isMobileDevice();
//
//       // If it's the mobile device, we should rerender to change styles
//       if (this.isMobile) {
//         this.forceUpdate();
//       }
//     }
//   }
//
//   componentWillUnmount() {
//     window.removeEventListener('mouseup', this.onMouseUp);
//     window.removeEventListener('mousemove', this.onMouseMove);
//     window.removeEventListener('touchmove', this.onTouchMove);
//     window.removeEventListener('touchend', this.onTouchEnd);
//   }
//
//   getElement() {
//     return this.container.current;
//   }
//
//   // Simulate 'onEndScroll' event that fires when scrolling is stopped
//   onEndScroll = () => {
//     this.scrolling = false;
//     if (!this.pressed && this.started) {
//       this.processEnd();
//     }
//   };
//
//   onScroll = e => {
//     const container = this.container.current;
//     // Ignore the internal scrolls
//     if (
//       container.scrollLeft !== this.scrollLeft ||
//       container.scrollTop !== this.scrollTop
//     ) {
//       this.scrolling = true;
//       this.processScroll(e);
//       this.onEndScroll();
//     }
//   };
//
//   onMouseDown = e => {
//     if (this.isDraggable(e.target)) {
//       this.processClick(e, e.clientX, e.clientY);
//       e.preventDefault();
//       if (this.props.stopPropagation) {
//         e.stopPropagation();
//       }
//     }
//   };
//
//   onMouseMove = e => {
//     if (this.pressed) {
//       this.processMove(e, e.clientX, e.clientY);
//       e.preventDefault();
//       if (this.props.stopPropagation) {
//         e.stopPropagation();
//       }
//     }
//   };
//
//   onMouseUp = e => {
//     if (this.pressed) {
//       if (this.started) {
//         this.processEnd();
//       } else {
//         this.pressed = false;
//         this.forceUpdate();
//       }
//       e.preventDefault();
//       if (this.props.stopPropagation) {
//         e.stopPropagation();
//       }
//     }
//   };
//
//   processClick(e, clientX, clientY) {
//     const container = this.container.current;
//     this.scrollLeft = container.scrollLeft;
//     this.scrollTop = container.scrollTop;
//     this.clientX = clientX;
//     this.clientY = clientY;
//     this.pressed = true;
//   }
//
//   processStart(e, changeCursor = true) {
//     const { onStartScroll } = this.props;
//     const container = this.container.current;
//
//     this.started = true;
//
//     // Add the class to change displayed cursor
//     if (changeCursor) {
//       document.body.classList.add('indiana-dragging');
//     }
//
//     if (onStartScroll) {
//       onStartScroll(
//         container.scrollLeft,
//         container.scrollTop,
//         container.scrollWidth,
//         container.scrollHeight
//       );
//     }
//     this.forceUpdate();
//   }
//
//   // Process native scroll (scrollbar, mobile scroll)
//   processScroll(e) {
//     if (this.started) {
//       const { onScroll } = this.props;
//       const container = this.container.current;
//       if (onScroll) {
//         onScroll(
//           container.scrollLeft,
//           container.scrollTop,
//           container.scrollWidth,
//           container.scrollHeight
//         );
//       }
//     } else {
//       this.processStart(e, false);
//     }
//   }
//
//   // Process non-native scroll
//   processMove(e, newClientX, newClientY) {
//     const { horizontal, vertical, activationDistance, onScroll } = this.props;
//     const container = this.container.current;
//
//     if (!this.started) {
//       if (
//         (horizontal &&
//           Math.abs(newClientX - this.clientX) > activationDistance) ||
//         (vertical && Math.abs(newClientY - this.clientY) > activationDistance)
//       ) {
//         this.clientX = newClientX;
//         this.clientY = newClientY;
//         this.processStart();
//       }
//     } else {
//       if (horizontal) {
//         container.scrollLeft -= newClientX - this.clientX;
//       }
//       if (vertical) {
//         container.scrollTop -= newClientY - this.clientY;
//       }
//       if (onScroll) {
//         onScroll(
//           container.scrollLeft,
//           container.scrollTop,
//           container.scrollWidth,
//           container.scrollHeight
//         );
//       }
//       this.clientX = newClientX;
//       this.clientY = newClientY;
//       this.scrollLeft = container.scrollLeft;
//       this.scrollTop = container.scrollTop;
//     }
//   }
//
//   processEnd(e) {
//     const { onEndScroll } = this.props;
//     const container = this.container.current;
//
//     this.pressed = false;
//     this.started = false;
//     this.scrolling = false;
//
//     if (container && onEndScroll) {
//       onEndScroll(
//         container.scrollLeft,
//         container.scrollTop,
//         container.scrollWidth,
//         container.scrollHeight
//       );
//     }
//     document.body.classList.remove('indiana-dragging');
//     this.forceUpdate();
//   }
//
//   render() {
//     const { children, style } = this.props;
//
//     return (
//       <div style={style} ref={this.container} onScroll={this.onScroll}>
//         {children}
//       </div>
//     );
//   }
// }
