export const CHART_STYLE = `
.flex {
  display: flex;
}

.gap-sm {
  gap: var(--padding-sm);
}

label {
  display: flex;
  flex-direction: column;
  font-size: var(--text-sm);
}

.axis-legend {
  display: flex;
  justify-content: space-between;
  padding-top: 2px;
}

[id$="-label"] {
  line-height: 1;
}

#x-label {
  transform: translate(70px, -30px);
  width: 80vw;
}

#x-label .axis-legend span {
  transform: rotate(-90deg) translate(10px, -10px);
}

#y-label {
  transform: rotate(-90deg) translate(100px, 47px);
  transform-origin: bottom left;
  width: calc(60vh + 40px);
}

#y-label .axis-legend span {
  transform: rotate(90deg);
  width: 10rem;
  text-align: right;
}

.point {
  fill: var(--chart-primary);
}
`

export const ERROR_STYLE = `
@keyframes slide-in-out {
  from { transform: translateX(400px) }
  8% { transform: translateX(0) }
  92% { transform: translateX(0) }
  to { transform: translateX(400px) }
}

.error {
  font-size: var(--text-sm);
  color: var(--text-error);
  border: 1px solid var(--text-error);
  border-radius: var(--border-radius-sm);
  background: var(--bg-error);
  padding: var(--padding-sm);
  animation: slide-in-out 4s linear;
}
`
