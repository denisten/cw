import React, { memo } from 'react';

const defaultElementWidth = '781px',
  defaultElementHeight = '301px';

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
          />
        ))}
      </>
    );
  }
);

interface IImagesCollection {
  imgArray: string[];
}
