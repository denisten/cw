export const copyTextNode = (textNodeRef: React.RefObject<HTMLSpanElement>) => {
  const node = textNodeRef?.current as Node;
  const selection = window.getSelection() as Selection;
  const range = document.createRange();
  range.selectNodeContents(node);
  selection.removeAllRanges();
  selection.addRange(range);
  document.execCommand('copy');
};
