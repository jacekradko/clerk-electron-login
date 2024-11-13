import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

const buttonVariants = cva(
	'inline-flex items-center justify-center cursor-pointer rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90 px-4 py-2',
				destructive: 'bg-destructive/40 border-destructive text-destructive-foreground shadow-sm hover:bg-destructive-foreground/30 px-4 py-2',
				outline:
					' px-4 text-primary/90 border border-input bg-transparent shadow-sm hover:bg-secondary/40 hover:border-secondary-foreground/40 hover:text-primary active:bg-muted/50 bg-clip-padding',
				secondary: 'bg-secondary/70 text-secondary-foreground shadow-sm hover:bg-secondary',
				filter: 'bg-secondary/70 border border-secondary-foreground/20 border-dashed text-secondary-foreground shadow-sm hover:bg-secondary',
				ghost: 'text-primary/80 hover:text-primary hover:bg-muted/50',
				link: 'text-primary ggSmallCaps text-xs relative inline-flex flex-shrink hover:text-accent-foreground hover:transition-color hover:duration-300 after:absolute after:bg-accent after:bottom-1.5 after:left-0 after:right-0 after:h-[1px] after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300 hover:after:px-0',
				accent: 'bg-accent/20 border border-accent/60 text-accent-foreground shadow-sm hover:text-primary hover:bg-accent/40 hover:border-accent'
			},
			size: {
				default: 'h-9',
				xs: 'h-6 rounded-md px-2 text-xs',
				sm: 'h-8 rounded-md px-3 text-sm',
				lg: 'h-10 rounded-md px-8 text-md',
				icon: 'h-9 w-9',
				'icon-sm': 'h-8 w-8',
				link: 'h-9 px-0 py-2'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	}
)

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
	asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
	const Comp = asChild ? Slot : 'button'
	return <Comp type={'button'} className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
})
Button.displayName = 'Button'

export { Button, buttonVariants }
