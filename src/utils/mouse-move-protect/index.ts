export const mouseMoveProtect = (
  callBack: () => void,
  setMaxMouseMoveFaultAfterClick: number
) => {
  let mouseDownFlag = false,
    mouseMoveFlag = 0;
  const maxMouseMoveFaultAfterClick = setMaxMouseMoveFaultAfterClick;
  const handleMouseDown = () => {
    mouseDownFlag = true;
  };
  const handleMouseMove = () => {
    if (mouseDownFlag) {
      mouseMoveFlag += 1;
    }
  };
  const handleMouseUp = () => {
    if (mouseDownFlag && mouseMoveFlag < maxMouseMoveFaultAfterClick) {
      callBack();
      mouseMoveFlag = 0;
      mouseDownFlag = false;
    } else {
      mouseMoveFlag = 0;
      mouseDownFlag = false;
    }
  };

  return { handleMouseDown, handleMouseMove, handleMouseUp };
};
