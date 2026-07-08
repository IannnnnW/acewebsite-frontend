export default function ACEPattern({
  rows = 5,
  cols = 8,
  size = 6,
  gap = 10,
  opacity = 0.13,
  className = '',
  style,
}) {
  const w = cols * (size + gap) - gap
  const h = rows * (size + gap) - gap
  const rects = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      rects.push(
        <rect
          key={`${r}-${c}`}
          x={c * (size + gap)}
          y={r * (size + gap)}
          width={size}
          height={size}
          fill="#a71c20"
          fillOpacity={opacity}
        />
      )
    }
  }
  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      className={className}
      style={style}
      aria-hidden="true"
      role="presentation"
    >
      {rects}
    </svg>
  )
}
