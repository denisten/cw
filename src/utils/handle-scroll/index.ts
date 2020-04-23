import { debounce } from 'debounce';

export const removeClassNameDelay = 1000,
  addClassNameDelay = 50,
  stringTrue = 'true';

export enum AdvanceScrollBarAttr {
  ADVANCE_SCROLLBAR = 'advance-scrollbar',
  ON_SCROLLBAR = 'on-scrollbar',
  DATA_HANDLED = 'data-handled',
}

export const addHandleScrollForCollection = (refCollection: Element[]) => {
  const scrollArrayFlags = new Array(refCollection.length).fill(false);

  const removeClassName = debounce((props: IHandleScrollEvent) => {
    props.element &&
      props.element.classList.remove(AdvanceScrollBarAttr.ON_SCROLLBAR);
    scrollArrayFlags[props.idx] = false;
  }, removeClassNameDelay);

  const addClassName = debounce((props: IHandleScrollEvent) => {
    if (props.element) {
      props.element.classList.add(AdvanceScrollBarAttr.ON_SCROLLBAR);
      removeClassName(props);
    }
  }, addClassNameDelay);

  const handleScrollEvent = (props: IHandleScrollEvent) => {
    if (!scrollArrayFlags[props.idx]) {
      scrollArrayFlags[props.idx] = true;
      addClassName(props);
    } else {
      removeClassName(props);
    }
  };
  refCollection.map((element, idx) => {
    element.addEventListener('scroll', () =>
      handleScrollEvent({ element, idx })
    );
    element.setAttribute(AdvanceScrollBarAttr.DATA_HANDLED, stringTrue);
  });
};

interface IHandleScrollEvent {
  element: Element;
  idx: number;
}
