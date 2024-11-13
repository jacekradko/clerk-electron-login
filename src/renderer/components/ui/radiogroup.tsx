import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { cn } from '@/lib/utils'
import { ElementRef, forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

const RadioGroupRootVariants = cva('flex flex-col gap-2.5', {
	variants: {
		variant: {
			default: '',
			button: ''
		}
	},
	defaultVariants: {
		variant: 'default'
	}
})

export interface RadioGroupRootProps extends RadioGroupPrimitive.RadioGroupProps, VariantProps<typeof RadioGroupRootVariants> {}

const RadioGroupRoot = forwardRef<ElementRef<typeof RadioGroupPrimitive.Root>, RadioGroupRootProps>(({ className, variant, ...props }, ref) => (
	<RadioGroupPrimitive.Root className={cn(RadioGroupRootVariants({ variant, className }))} ref={ref} {...props} />
))
RadioGroupRoot.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItemVariants = cva('w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] focus:shadow-[0_0_0_2px]  outline-none cursor-pointer', {
	variants: {
		variant: {
			default: 'bg-transparent hover:bg-gray-300 focus:shadow-black',
			button: 'bg-white shadow-blackA4 hover:bg-gray-300 focus:shadow-black'
		}
	},
	defaultVariants: {
		variant: 'default'
	}
})

export interface RadioGroupItemProps extends RadioGroupPrimitive.RadioGroupItemProps, VariantProps<typeof RadioGroupItemVariants> {}

const RadioGroupItem = forwardRef<ElementRef<typeof RadioGroupPrimitive.Item>, RadioGroupItemProps>(({ className, variant, ...props }, ref) => (
	<RadioGroupPrimitive.Item className={cn(RadioGroupItemVariants({ variant, className }))} ref={ref} {...props} />
))
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

const RadioGroupIndicatorVariants = cva(
	"after:cursor-pointer flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%]",
	{
		variants: {
			variant: {
				default: 'after:bg-accent',
				button: 'after:bg-accent'
			}
		},
		defaultVariants: {
			variant: 'default'
		}
	}
)

export interface RadioGroupIndicatorProps extends RadioGroupPrimitive.RadioGroupIndicatorProps, VariantProps<typeof RadioGroupIndicatorVariants> {}

const RadioGroupIndicator = forwardRef<ElementRef<typeof RadioGroupPrimitive.Indicator>, RadioGroupIndicatorProps>(
	({ className, variant, ...props }, ref) => (
		<RadioGroupPrimitive.Indicator className={cn(RadioGroupIndicatorVariants({ variant, className }))} ref={ref} {...props} />
	)
)

RadioGroupIndicator.displayName = RadioGroupPrimitive.Indicator.displayName

export { RadioGroupRoot, RadioGroupItem, RadioGroupIndicator }
