import React from 'react';
import { ICatalogItems } from '../../../../effector/coupons/store';
import styled from 'styled-components';
import { StyledSpan } from '../../../../UI/span';
import { MTSSans } from '../../../../fonts';
import { MoneyCounter } from '../../shop-content/money-counter';

const TitleText = styled(StyledSpan)`
  font-family: ${MTSSans.BOLD};
  font-size: 24px;
  line-height: 32px;
  letter-spacing: -0.6px;
  color: #212527;
  margin-bottom: 15px;
`;
const DescriptionText = styled(StyledSpan)`
  width: 225px;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: -0.6px;
  color: #212527;
  opacity: 0.6;
  margin-bottom: auto;
  margin-top: auto;

  a {
    margin-left: 6px;
  }
`;

export const ProductDescription: React.FC<IProductDescription> = ({
  selectedStoreItem,
}) => {
  const linkRegExp = /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi;
  const returnTextWithATag = (text: string) =>
    text.replace(linkRegExp, (url: string) => {
      return `<a href=http://${url} target='_blank' rel="noopener noreferrer">Перейти</a>`;
    });

  const createMarkup = (html: string) => {
    return { __html: html };
  };

  return (
    <>
      <TitleText>{selectedStoreItem?.name.replace(/Купон|"/gi, '')}</TitleText>
      <MoneyCounter
        sum={String(selectedStoreItem?.price)}
        additionText=" /шт."
      />
      <DescriptionText
        dangerouslySetInnerHTML={createMarkup(
          returnTextWithATag(selectedStoreItem?.description || '')
        )}
      ></DescriptionText>
    </>
  );
};

interface IProductDescription {
  selectedStoreItem: ICatalogItems | null;
}
