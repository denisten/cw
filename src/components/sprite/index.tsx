import React, { Fragment, memo, useEffect, useRef, useState } from 'react';

export const Sprite = memo((props: ISprite) => {
  const {
    canvasHeight,
    canvasWidth,
    img,
    numberOfFramesX,
    numberOfFramesY,
    ticksPerFrame,
    style,
    infinity = true,
    onAnimationEnd,
  } = props;

  const imgInstance = new Image();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [displayFlag, setDisplayFlag] = useState(true);
  let requestCallback: number;
  let isAnimationStopped = false;
  let fullImgWidth = 0,
    fullImgHeight = 0,
    tickCount = 0,
    frameIndexX = 0,
    frameIndexY = 0;

  const unsubscribe = () => {
    window.cancelAnimationFrame(requestCallback);
    isAnimationStopped = true;
  };
  const update = () => {
    tickCount++;
    if (tickCount > ticksPerFrame) {
      tickCount = 0;
      if (
        frameIndexX < numberOfFramesX - 1 &&
        frameIndexY < numberOfFramesY - 1
      ) {
        frameIndexX++;
      } else {
        if (frameIndexY < numberOfFramesY - 1) {
          frameIndexY++;
          frameIndexX = 0;
        } else {
          if (infinity) {
            frameIndexY = 0;
            frameIndexX = 0;
          } else {
            setDisplayFlag(false);
            if (onAnimationEnd) {
              onAnimationEnd();
            }
            unsubscribe();
          }
        }
      }
    }
  };

  const render = () => {
    const container = canvasRef.current;
    if (container) {
      const ctx = container.getContext('2d');
      if (ctx) {
        ctx.clearRect(
          0,
          0,
          fullImgHeight / numberOfFramesX,
          fullImgHeight / numberOfFramesY
        );
        ctx.drawImage(
          imgInstance,
          (fullImgWidth / numberOfFramesX) * frameIndexX,
          (fullImgHeight / numberOfFramesY) * frameIndexY,
          fullImgWidth / numberOfFramesX,
          fullImgHeight / numberOfFramesY,
          0,
          0,
          canvasWidth,
          canvasHeight
        );
      }
    }
  };

  const start = () => {
    const loop = () => {
      update();
      render();
      if (!isAnimationStopped)
        requestCallback = window.requestAnimationFrame(loop);
    };

    requestCallback = window.requestAnimationFrame(loop);
  };

  useEffect(() => {
    imgInstance.src = img;
    imgInstance.onload = () => {
      fullImgHeight = imgInstance.naturalHeight;
      fullImgWidth = imgInstance.naturalWidth;
    };
    start();
    return () => unsubscribe();
  }, []);

  return (
    <Fragment>
      {displayFlag ? (
        <canvas
          width={canvasWidth}
          height={canvasHeight}
          ref={canvasRef}
          style={style}
        />
      ) : null}
    </Fragment>
  );
});

interface ISprite {
  canvasWidth: number;
  canvasHeight: number;
  img: string;
  numberOfFramesX: number;
  numberOfFramesY: number;
  ticksPerFrame: number;
  style?: React.CSSProperties;
  infinity?: boolean;
  onAnimationEnd?: () => void;
}
