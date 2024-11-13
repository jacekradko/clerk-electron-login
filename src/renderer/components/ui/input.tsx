import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
	return (
		<input
			type={type}
			className={cn(
				'flex h-10 w-full rounded border border-input/80 bg-background/90 px-3 py-1 text-md transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-primary/40 hover:bg-background/10 hover:ring-primary/20 active:border-primary/20 hover:ring-1 active:outline-none active:ring-1 active:ring-primary/50 hover:border-primary/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/60 focus-visible:shadow-none placeholder:font-normal focus-visible:pl-4 focus:outline-none focus-visible:bg-muted/10 disabled:cursor-not-allowed disabled:opacity-50',
				className
			)}
			ref={ref}
			{...props}
		/>
	)
})
Input.displayName = 'Input'

export { Input }
