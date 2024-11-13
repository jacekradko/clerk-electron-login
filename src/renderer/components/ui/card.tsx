import { HTMLAttributes, forwardRef } from 'react'

import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const cardVariants = cva('variant rounded-lg border bg-card text-card-foreground shadow cursor-auto', {
	variants: {
		variant: {
			default: 'p-4',
			proUpgrade: 'p-4 border-none bg-transparent cursor-pointer [&_button]:',
			secondary:
				'transition-all duration-100 animate ease-in-out px-1 py-2 bg-gradient-to-l from-[rgba(28,28,31,1)] to-[rgba(20,20,23,1)] hover:from-[rgba(40,40,45,1)] hover:to-[rgba(24,24,28,1)] shadow-[inset_0px_0px_0px_1px_rgba(255,255,255,0.06)] hover:shadow-[inset_0px_0px_0px_1px_rgba(255,255,255,0.08)] text-primary/70 cursor-pointer [&_button]:border-muted-foreground [&_button]:hover:border-primary',
			secondarySelected:
				'transition-all duration-100 animate ease-in-out selected px-1 py-2 border-muted hover:bg-opacity-25 rounded-md bg-gradient-to-l from-muted-foreground/40 to-muted-foreground/30 shadow-[inset_0px_0px_0px_1px_hsl(var(--primary)/0.4),_inset_0px_2px_8px_0px_hsl(var(--primary)/0.65)] text-primary disabled:border-accent cursor-pointer'
		}
	},
	defaultVariants: {
		variant: 'default'
	}
})

export interface CardProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

const Card = forwardRef<HTMLDivElement, CardProps>(({ className, variant, ...props }, ref) => (
	<div ref={ref} className={cn(cardVariants({ variant, className }))} {...props} />
))
Card.displayName = 'Card'

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn('flex flex-col space-y-4', className)} {...props} />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
	<h3 ref={ref} className={cn('font-medium leading-none', className)} {...props} />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
	<p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
))
CardDescription.displayName = 'CardDescription'

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn(className)} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn('flex items-center', className)} {...props} />
))
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
