import React from 'react';
import styled from 'styled-components';
const defaultFontSize = 20,
  defaultLineHeight = 1.4,
  defaultNormalValue = 'normal',
  defaultFontFamily = 'MTSSansBold';

export const StyledSpan = styled.span`
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  color: #01acc8;
`;

const SpanWrapper = styled.span<ISpanWrapper>`
  color: #${props => props.color || '01acc8'};
  font-size: ${props => props.fontSize || defaultFontSize}px;
  font-weight: ${props => props.fontWeight || defaultNormalValue};
  font-stretch: ${props => props.fontStretch || defaultNormalValue};
  font-style: ${props => props.fontStyle || defaultNormalValue};
  line-height: ${props => props.lineHeight || defaultLineHeight};
  letter-spacing: ${props => props.letterSpacing || defaultNormalValue};
  font-family: ${props => props.fontFamily || defaultFontFamily};
  margin: ${props => props.margin};
`;

export const Span: React.FC<ISpan> = ({ content, ...props }) => {
  return <SpanWrapper {...props}>{content}</SpanWrapper>;
};

interface ISpan extends ISpanWrapper {
  content: string;
}

interface ISpanWrapper {
  color?: string;
  fontSize?: number;
  fontWeight?: string;
  fontStretch?: string;
  fontStyle?: string;
  lineHeight?: number;
  letterSpacing?: string;
  fontFamily?: string;
  margin?: string;
}
