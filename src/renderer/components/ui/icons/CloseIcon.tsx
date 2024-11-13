import { IconProps } from '@radix-ui/react-icons/dist/types'
import { forwardRef } from 'react'

export const CloseIcon = forwardRef<SVGSVGElement, IconProps>(({ color = 'currentColor', ...props }, forwardedRef) => (
	<svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} ref={forwardedRef}>
		<path
			id="Vector"
			d="M0.899266 8.77951C1.05008 8.9265 1.2491 9 1.44811 9C1.64713 9 1.84614 8.9265 1.99851 8.78101L5.33513 5.56064L8.67175 8.77951C8.82412 8.9265 9.02313 9 9.22215 9C9.42116 9 9.62018 8.9265 9.77255 8.78101C10.0757 8.48852 10.0757 8.01304 9.77255 7.72055L6.43438 4.50019L9.771 1.28132C10.0757 0.987334 10.0757 0.513354 9.77255 0.219366C9.46936 -0.073122 8.97649 -0.073122 8.6733 0.219366L5.33513 3.43973L1.99851 0.220866C1.69533 -0.0716214 1.20245 -0.0716214 0.899266 0.220866C0.596078 0.513354 0.596078 0.988834 0.899266 1.28132L4.23588 4.50019L0.899266 7.71905C0.596078 8.01154 0.596078 8.48702 0.899266 8.77951Z"
			fill={color}
		/>
	</svg>
))
CloseIcon.displayName = 'CloseIcon'
