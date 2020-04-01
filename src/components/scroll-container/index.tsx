import React, { useEffect, useRef } from 'react';
import dragscroll from 'dragscroll';
import styled from 'styled-components';

const ScrollContainerWrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

export const ScrollContainer: React.FC<IScrollContainer> = React.memo(
  ({ children, onMountCallback }) => {
    const myRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      dragscroll.reset();
      if (myRef.current && onMountCallback) {
        onMountCallback();
      }
    }, []);

    return (
      <ScrollContainerWrapper className="dragscroll" ref={myRef}>
        {children}
      </ScrollContainerWrapper>
    );
  }
);

interface IScrollContainer {
  onMountCallback?: Function;
}
