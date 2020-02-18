import React from 'react';
import styled from 'styled-components';

const TowerInfoDescriptionWrapper = styled.div`
  font-family: SFProDisplay;
  font-size: 16px;
  line-height: 1.5;
  color: #000000;
`;

export const TowerInfoDescription = () => {
  return (
    <TowerInfoDescriptionWrapper>
      МТС («Моби́льные ТелеСисте́мы», ПАО «МТС») — российская телекоммуникационная
      компания, оказывающая услуги в России и странах СНГ под торговой маркой
      «МТС». Компания оказывает услуги сотовой связи (в стандартах GSM, UMTS
      (3G) и LTE), услуги проводной телефонной связи, широкополосного доступа в
      Интернет, мобильного телевидения, кабельного телевидения, спутникового
      телевидения, цифрового телевидения и сопутствующие услуги, в частности
      услуги по продаже контента. По состоянию на март 2019 года компания во
      всех странах своего присутствия обслуживала 104,7 млн абонентов.
    </TowerInfoDescriptionWrapper>
  );
};
