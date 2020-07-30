import React, { memo } from 'react';
import styled from 'styled-components';

const Img = styled.img<IImg>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  flex-shrink: 0;
`;

// const defaultElementWidth = '713px',
//   defaultElementHeight = '275px';
//
// const imgStyleConfig = {
//   flexShrink: 0,
// } as React.CSSProperties;

export const ImagesCollection: React.FC<IImagesCollection> = memo(
  ({ imgArray, ...config }) => {
    return (
      <>
        {imgArray.map(el => (
          <Img
            src={el}
            key={el}
            alt="imgContent"
            {...config}
            // width={defaultElementWidth}
            // height={defaultElementHeight}
          />
        ))}
      </>
    );
  }
);

interface IImagesCollection extends IImg {
  imgArray: string[];
}

interface IImg {
  width: number;
  height: number;
}
