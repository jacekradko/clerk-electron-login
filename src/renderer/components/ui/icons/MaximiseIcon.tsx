import { IconProps } from '@radix-ui/react-icons/dist/types'
import { forwardRef } from 'react'

export const MaximiseIcon = forwardRef<SVGSVGElement, IconProps>(({ color = 'currentColor', ...props }, forwardedRef) => (
	<svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} ref={forwardedRef}>
		<rect x="1.09375" y="0.75" width="7.82806" height="7.5" rx="1.25" stroke={color} strokeWidth="1.5" />
	</svg>
))

MaximiseIcon.displayName = 'MaximiseIcon'
