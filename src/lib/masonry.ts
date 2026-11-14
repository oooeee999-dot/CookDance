// Preserve the original shortest-column algorithm, shared by both card modes and the food archive.
export function layoutWall(wall: HTMLElement) {
  const width = wall.clientWidth;
  const columns = Number(getComputedStyle(wall).getPropertyValue('--columns')) || 4;
  const gap = Number(getComputedStyle(wall).getPropertyValue('--wall-gap').replace('px', '')) || 18;
  const tileWidth = (width - gap * (columns - 1)) / columns;
  const heights = Array<number>(columns).fill(0);
  wall.classList.add('is-masonry');
  Array.from(wall.children).forEach(child => {
    if (!(child instanceof HTMLElement) || child.hidden) return;
    const column = heights.indexOf(Math.min(...heights));
    child.style.width = `${tileWidth}px`;
    child.style.transform = `translate(${column * (tileWidth + gap)}px, ${heights[column]}px)`;
    heights[column] += child.getBoundingClientRect().height + gap;
  });
  wall.style.height = `${Math.max(0, ...heights) - (heights.some(height => height > 0) ? gap : 0)}px`;
}
