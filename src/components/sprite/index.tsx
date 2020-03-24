import React, { memo, useEffect, useRef } from 'react';
const imgInstanse = new Image();

export const Sprite = memo((props: ISprite) => {
  const {
    fullImgHeight,
    canvasHeight,
    fullImgWidth,
    canvasWidth,
    img,
    numberOfFramesX,
    numberOfFramesY,
    ticksPerFrame,
  } = props;

  const myRef = useRef<HTMLCanvasElement>(null);

  let tickCount = 0,
    frameIndexX = 0,
    frameIndexY = 0;

  const start = () => {
    let loop = () => {
      update();
      render();

      window.requestAnimationFrame(loop);
    };

    window.requestAnimationFrame(loop);
  };

  useEffect(() => {
    imgInstanse.src = img;
    start();
  }, []);

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
          frameIndexY = 0;
          frameIndexX = 0;
        }
      }
    }
  };

  const render = () => {
    const container = myRef.current;
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
          imgInstanse,
          (fullImgWidth / numberOfFramesX) * frameIndexX,
          (fullImgHeight / numberOfFramesY) * frameIndexY,
          fullImgWidth / numberOfFramesX,
          fullImgHeight / numberOfFramesY,
          0,
          0,
          fullImgWidth / numberOfFramesX,
          fullImgHeight / numberOfFramesY
        );
      }
    }
  };

  return <canvas width={canvasWidth} height={canvasHeight} ref={myRef} />;
});

interface ISprite {
  canvasWidth: number;
  fullImgWidth: number;
  canvasHeight: number;
  fullImgHeight: number;
  img: string;
  numberOfFramesX: number;
  numberOfFramesY: number;
  ticksPerFrame: number;
}
