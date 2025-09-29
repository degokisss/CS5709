import { clsx } from 'clsx'
import './LoadingSpinner.css'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  return (
    <div
      className={clsx(
        'loading-spinner',
        `loading-spinner-${size}`,
        className
      )}
    />
  )
}