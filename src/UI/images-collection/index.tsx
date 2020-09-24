import React, { memo } from 'react';
import styled from 'styled-components';

const Img = styled.img`
  width: 773px;
  height: 301px;
  flex-shrink: 0;
`;

export const ImagesCollection: React.FC<IImagesCollection> = memo(
  ({ imgArray }) => (
    <>
      {imgArray.map(el => (
        <Img src={el} key={el} alt="imgContent" />
      ))}
    </>
  )
);
interface IImagesCollection {
  imgArray: string[];
}
