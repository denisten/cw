import React, { memo } from 'react';
import styled from 'styled-components';

const ImageCollectionElement = styled.img`
  width: 781px;
  height: 301px;
`;
export const ImagesCollection: React.FC<IImagesCollection> = memo(
  ({ imgArray }) => {
    return (
      <>
        {imgArray.map(el => (
          <ImageCollectionElement src={el} key={el} alt="imgContent" />
        ))}
      </>
    );
  }
);

interface IImagesCollection {
  imgArray: string[];
}
