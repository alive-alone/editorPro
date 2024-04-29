const computeDomMovePro = (
  block: object,
  difRotate: number,
  rotate: number
) => {
  const rotateAbs = Math.abs(difRotate);
  const blockCenter = {
    x: block.outerStyle.left + block.outerStyle.width / 2,
    y: block.outerStyle.top + block.outerStyle.height / 2,
  };
  const disSquare = {
    x: (boxCenter.x - blockCenter.x) ** 2,
    y: (boxCenter.y - blockCenter.y) ** 2,
  };
  const bcSquare = disSquare.x + disSquare.y;
  const cosTempX = Math.sqrt(disSquare.y) / Math.sqrt(bcSquare);
  const TempX = Math.acos(cosTempX);
  const angleX = -(difRotate / 180) * Math.PI + TempX;
  const difTop = Math.sqrt(bcSquare) * Math.cos(angleX);
  const difLeft = Math.sqrt(bcSquare) * Math.sin(angleX);
  console.log(TempX, angleX, difLeft, difTop);
  if (blockCenter.x > boxCenter.x) {
    block.outerStyle.left = -block.outerStyle.width / 2 + boxCenter.x + difLeft;
  } else {
    block.outerStyle.left = -block.outerStyle.width / 2 + boxCenter.x - difLeft;
  }
  if (blockCenter.y > boxCenter.y) {
    block.outerStyle.top = -block.outerStyle.height / 2 + boxCenter.y + difTop;
  } else {
    block.outerStyle.top = -block.outerStyle.height / 2 + boxCenter.y - difTop;
  }
};

const computeDomMovePro2 = (
  block: object,
  difRotate: number,
  rotate: number
) => {
  const rotateAbs = Math.abs(difRotate);
  const blockCenter = {
    x: block.outerStyle.left + block.outerStyle.width / 2,
    y: block.outerStyle.top + block.outerStyle.height / 2,
  };
  const disSquare = {
    x: (boxCenter.x - blockCenter.x) ** 2,
    y: (boxCenter.y - blockCenter.y) ** 2,
  };
  const bcSquare = disSquare.x + disSquare.y;
  const cosTempX = Math.sqrt(disSquare.y) / Math.sqrt(bcSquare);
  const TempX = Math.acos(cosTempX);
  const angleX = -(difRotate / 180) * Math.PI + TempX;
  const difTop = Math.sqrt(bcSquare) * Math.cos(angleX);
  const difLeft = Math.sqrt(bcSquare) * Math.sin(angleX);
  //0.993177698132206 0.11687662993075007 0.10936598697573913 5.395107774221788 49.133927301860716
  console.log(cosTempX, TempX, angleX, difLeft, difTop);
  const startBlockPos =
    (blockCenter.x - startPoint.x) ** 2 + (blockCenter.y - startPoint.y) ** 2;
  const startBoxPos =
    (boxCenter.x - startPoint.x) ** 2 + (boxCenter.y - startPoint.y) ** 2;
  const cosStartA =
    (bcSquare + startBoxPos - startBlockPos) /
    (2 * Math.sqrt(bcSquare * startBoxPos));
  const startA = (Math.acos(cosStartA) / Math.PI) * 180 + rotate;
  if (0 <= startA && startA <= 90) {
    block.outerStyle.left = -block.outerStyle.width / 2 + boxCenter.x - difLeft;
    block.outerStyle.top = -block.outerStyle.height / 2 + boxCenter.y + difTop;
  } else if (90 <= startA && startA <= 180) {
    block.outerStyle.left = -block.outerStyle.width / 2 + boxCenter.x - difLeft;
    block.outerStyle.top = -block.outerStyle.height / 2 + boxCenter.y - difTop;
  } else if (0 > startA && startA >= -90) {
    block.outerStyle.left = -block.outerStyle.width / 2 + boxCenter.x + difLeft;
    block.outerStyle.top = -block.outerStyle.height / 2 + boxCenter.y + difTop;
  } else {
    block.outerStyle.left = -block.outerStyle.width / 2 + boxCenter.x + difLeft;
    block.outerStyle.top = -block.outerStyle.height / 2 + boxCenter.y - difTop;
  }
};
