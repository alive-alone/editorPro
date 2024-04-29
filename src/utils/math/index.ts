export const RotateMatrix = (
  x: number,
  y: number,
  Ox: number,
  Oy: number,
  theta: number
) => {
  let cos = Math.cos(theta);
  let sin = Math.sin(theta);
  let dx = x - Ox;
  let dy = y - Oy;
  let nx = cos * dx - sin * dy;
  let ny = sin * dx + cos * dy;
  nx += Ox;
  ny += Oy;
  return [nx, ny];
};
