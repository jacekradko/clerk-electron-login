import { IconProps } from '@radix-ui/react-icons/dist/types'
import { forwardRef } from 'react'

export const FilterIcon = forwardRef<SVGSVGElement, IconProps>(({ color = 'currentColor', ...props }, forwardedRef) => (
	<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} ref={forwardedRef}>
		<path
			d="M0.5 2C0.223858 2 0 2.22386 0 2.5C0 2.77614 0.223858 3 0.5 3H15.5C15.7761 3 16 2.77614 16 2.5C16 2.22386 15.7761 2 15.5 2H0.5Z"
			fill={color}
		/>
		<path
			d="M2.5 6C2.22386 6 2 6.22386 2 6.5C2 6.77614 2.22386 7 2.5 7H13.5C13.7761 7 14 6.77614 14 6.5C14 6.22386 13.7761 6 13.5 6H2.5Z"
			fill={color}
		/>
		<path
			d="M4 10.5C4 10.2239 4.22386 10 4.5 10H11.5C11.7761 10 12 10.2239 12 10.5C12 10.7761 11.7761 11 11.5 11H4.5C4.22386 11 4 10.7761 4 10.5Z"
			fill={color}
		/>
		<path
			d="M6.5 14C6.22386 14 6 14.2239 6 14.5C6 14.7761 6.22386 15 6.5 15H9.5C9.77614 15 10 14.7761 10 14.5C10 14.2239 9.77614 14 9.5 14H6.5Z"
			fill={color}
		/>
	</svg>
))

FilterIcon.displayName = 'FilterIcon'
