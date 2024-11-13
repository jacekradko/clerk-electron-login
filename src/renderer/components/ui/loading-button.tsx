import { forwardRef, PropsWithChildren } from 'react'
import { Button, ButtonProps, buttonVariants } from './button'
import { Icons } from '@/components/ui/icons'

export interface LoadingButtonProps extends ButtonProps {
	loading?: boolean
}

const LoadingButton = forwardRef<HTMLButtonElement, PropsWithChildren<LoadingButtonProps>>(
	({ loading = true, children, disabled, ...props }, ref) => {
		return (
			<Button ref={ref} disabled={disabled || loading} {...props}>
				<div className="flex flex-col content-center items-center">
					<Icons.loaderSquare className={`h-4 w-4 ${!loading ? 'hidden' : ''}`} />
					<span className={loading ? 'invisible h-0' : ''}>{children}</span>
				</div>
			</Button>
		)
	}
)
LoadingButton.displayName = 'LoadingButton'

export { LoadingButton, buttonVariants }
