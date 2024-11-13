import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef, useRef, useState, MouseEvent } from 'react'

const buttonVariants = cva(
	'relative rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default: 'text-green-200 hover:text-green-100 tracking-[0.25rem] font-semibold text-sm ggSmallCaps',
				hero: 'font-medium text-sm ggSmallCaps transition-all duration-300 animate ease-in-out',
				plan: 'w-[100%]'
			},
			size: {
				default: 'h-12',
				hero: 'h-fit',
				plan: 'h-12'
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

const FancyButton = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, children, asChild = false, ...props }, ref) => {
	const divRef = useRef<HTMLButtonElement>(null)
	const [isFocused, setIsFocused] = useState(false)
	const [position, setPosition] = useState({ x: 0, y: 0 })
	const [opacity, setOpacity] = useState(50)

	const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
		if (!divRef.current || isFocused) return

		const div = divRef.current
		const rect = div.getBoundingClientRect()

		setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
	}

	const handleFocus = () => {
		setIsFocused(true)
		setOpacity(1)
	}

	const handleBlur = () => {
		setIsFocused(false)
		setOpacity(0)
	}

	const handleMouseEnter = () => {
		setOpacity(1)
	}

	const handleMouseLeave = () => {
		setOpacity(0)
	}

	const Comp = asChild ? Slot : 'button'

	// TODO: Handle the refs on the Comp component properly
	return (
		<Comp
			className={`${cn(buttonVariants({ variant, size, className }), `rounded bg-background`)}`}
			ref={divRef || ref}
			{...props}
			onMouseMove={handleMouseMove}
			onFocus={handleFocus}
			onBlur={handleBlur}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div className="relative w-full h-full p-[2px] border border-accent/70 hover:bg-transparent hover:border hover:border-emerald-400/80 rounded-lg">
				<span className="absolute hidden left-0 hover:opacity-100 h-full w-full blur-md animate-[pulse_8s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#1A5E3C_0%,#277C51_20%,#4ED594_30%,#1A5E3C_60%,#4ED594_65%,#1A5E3C_100%)]"></span>
				<div className="w-full h-full rounded items-center justify-center text-primary hover:text-[#B4FCD8] disabled:pointer-events-none disabled:opacity-50">
					<div className="rounded-sm flex items-center justify-center w-full h-full bg-accent/10 hover:bg-emerald-700/20 hover:backdrop-blur-[2px] hover:shadow-emerald-200/50 transition-all duration-300 animate ease-in-out">
						<span className="tracking-[0.2rem] px-4">{children}</span>
					</div>
					<div
						className="absolute rounded -inset-[2px] mix-blend-overlay animate duration-300 transition-all ease-in-out cursor-pointer"
						style={{
							opacity,
							background: `radial-gradient(200px circle at ${position.x}px ${position.y}px, rgba(30, 248, 190, 1), rgba(19, 37, 28, 0))`
						}}
					/>
				</div>
			</div>
		</Comp>
	)
})
FancyButton.displayName = 'FancyButton'

export { FancyButton, buttonVariants }
