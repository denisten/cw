import React, { memo } from 'react';

const defaultElementWidth = '781px',
  defaultElementHeight = '301px';

const imgStyleConfig = {
  flexShrink: 0,
} as React.CSSProperties;

export const ImagesCollection: React.FC<IImagesCollection> = memo(
  ({ imgArray }) => {
    return (
      <>
        {imgArray.map(el => (
          <img
            src={el}
            key={el}
            alt="imgContent"
            width={defaultElementWidth}
            height={defaultElementHeight}
            style={imgStyleConfig}
          />
        ))}
      </>
    );
  }
);

interface IImagesCollection {
  imgArray: string[];
}
