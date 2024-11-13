import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva('inline-flex items-center rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-default', {
	variants: {
		variant: {
			default: 'border-transparent bg-primary text-primary-foreground shadow',
			secondary: 'border-transparent bg-secondary text-secondary-foreground',
			purple: 'border-transparent bg-violet-400/10 text-violet-300',
			destructive: 'border-transparent bg-destructive text-destructive-foreground shadow',
			outline: 'text-foreground border-secondary-foreground/30 shadow'
		},
		size: {
			default: 'h-6 py-2.5 px-3 font-medium text-xs',
			xs: 'h-[22px] px-2 font-medium text-xxs',
			sm: 'h-6 py-[0px] px-[4px] font-medium text-xs',
			lg: 'h-6 py-[0px] px-[4px] font-medium text-lg'
		},
		status: {
			free: 'px-2 bg-transparent text-foreground border-secondary-foreground/30 shadow ggSmallCaps text-xxs items-center justify-center',
			pro: 'bg-clip-padding shadow-none h-5 bg-[rgba(22,20,19,1)] ggSmallCaps text-xxs shadow-[inset_0px_2px_1px_0px_rgba(233,202,158,0.55),_0px_3px_2px_0px_rgba(0,0,0,0.1)] [color:_#FFF1DE] rounded-md',
			trial: 'px-2 border-transparent bg-secondary text-secondary-foreground text-capitalize ggSmallCaps text-xxs items-center justify-center'
		}
	},
	defaultVariants: {
		variant: 'default',
		size: 'default'
	}
})

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, status, size, ...props }: BadgeProps) {
	return <div className={cn(badgeVariants({ variant, status, size }), className)} {...props} />
}

export { Badge, badgeVariants }
