"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import "./kuat-radial-progress.css"

const VIEWBOX_SIZE = 100
const STROKE_WIDTH = 4
const RADIUS = (VIEWBOX_SIZE - STROKE_WIDTH) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const CENTER = VIEWBOX_SIZE / 2

export const KUAT_RADIAL_PROGRESS_SIZES = ["mini", "small", "medium", "large"] as const
export const KUAT_RADIAL_PROGRESS_COLORS = [
  "default",
  "primary",
  "ee-blue",
  "tech-blue",
  "transform-teal",
  "equal-ember",
] as const

export type KuatRadialProgressSize = (typeof KUAT_RADIAL_PROGRESS_SIZES)[number]
export type KuatRadialProgressColor = (typeof KUAT_RADIAL_PROGRESS_COLORS)[number]

export interface KuatRadialProgressProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  /** Value from 0 to 100 */
  value: number
  /** Bar colour from Kuat palette; default uses semantic foreground-bar token */
  color?: KuatRadialProgressColor
  size?: KuatRadialProgressSize
  /** When true, animate from 0 to value on mount */
  animate?: boolean
}

const KuatRadialProgress = React.forwardRef<HTMLDivElement, KuatRadialProgressProps>(
  (
    {
      className,
      size = "medium",
      color = "default",
      value,
      animate = false,
      ...props
    },
    ref
  ) => {
    const clampedValue = Math.min(100, Math.max(0, value))
    const [displayValue, setDisplayValue] = React.useState(animate ? 0 : clampedValue)

    React.useEffect(() => {
      if (animate) {
        setDisplayValue(clampedValue)
      }
    }, [animate, clampedValue])

    React.useEffect(() => {
      if (!animate) {
        setDisplayValue(clampedValue)
      }
    }, [animate, clampedValue])

    const strokeDashoffset = CIRCUMFERENCE * (1 - displayValue / 100)

    const rootClassName = cn(
      "kuat-radial-progress",
      `kuat-radial-progress--${size}`,
      `kuat-radial-progress--${color}`,
      className
    )

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={`${Math.round(clampedValue)}%`}
        className={rootClassName}
        {...props}
      >
        <svg
          className="kuat-radial-progress__svg"
          viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
          aria-hidden
        >
          <g transform={`rotate(-90 ${CENTER} ${CENTER})`}>
            <circle
              data-kuat-radial-progress-track
              cx={CENTER}
              cy={CENTER}
              r={RADIUS}
              fill="none"
              stroke="var(--kuat-radial-progress-background-bar)"
              style={{ strokeWidth: "var(--kuat-radial-progress-stroke, 4)" }}
            />
            <circle
              data-kuat-radial-progress-arc
              cx={CENTER}
              cy={CENTER}
              r={RADIUS}
              fill="none"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{
                strokeWidth: "var(--kuat-radial-progress-stroke, 4)",
                transition: animate ? "stroke-dashoffset 0.6s ease-out" : undefined,
              }}
            />
          </g>
        </svg>
        <span
          className="kuat-radial-progress__label"
          aria-hidden
          data-kuat-radial-progress-label
        >
          {Math.round(clampedValue)}%
        </span>
      </div>
    )
  }
)
KuatRadialProgress.displayName = "KuatRadialProgress"

export { KuatRadialProgress }
