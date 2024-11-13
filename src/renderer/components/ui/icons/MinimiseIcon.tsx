import { IconProps } from '@radix-ui/react-icons/dist/types'
import { forwardRef } from 'react'

export const MinimiseIcon = forwardRef<SVGSVGElement, IconProps>(({ color = 'currentColor', ...props }, forwardedRef) => (
	<svg width="10" height="3" viewBox="0 0 10 3" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} ref={forwardedRef}>
		<rect x="0.0157471" y="0.65625" width="9.32806" height="1.6875" rx="0.84375" fill={color} />
	</svg>
))

MinimiseIcon.displayName = 'MinimiseIcon'
