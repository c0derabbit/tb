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

.axis-legend > span {
  width: 0;
  height: 0;
  overflow: visible;
}

#x-label {
  transform: translate(70px, -18px);
  width: 80vw;
}

#x-label .axis-legend span {
  transform: rotate(-90deg);
}

#y-label {
  transform: rotate(-90deg) translate(90px, 20px);
  transform-origin: bottom left;
  width: 60vh;
}

#y-label .axis-legend > span {
  transform: rotate(90deg) translate(-15px, -10px);
  overflow: visible;
}

#y-label .axis-legend span span {
  /* what an ugly hack! sorry for this. */
  display: inline-block;
  width: 60px;
  text-align: right;
}

.bar {
  stroke: var(--chart-primary);
  stroke-width: 6px;
  transform: translateX(4px);
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
