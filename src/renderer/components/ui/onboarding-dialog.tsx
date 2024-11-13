import * as React from 'react'
import * as OnboardingDialogPrimitive from '@radix-ui/react-alert-dialog'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

const OnboardingDialog = OnboardingDialogPrimitive.Root

const OnboardingDialogTrigger = OnboardingDialogPrimitive.Trigger

const OnboardingDialogPortal = OnboardingDialogPrimitive.Portal

const OnboardingDialogOverlay = React.forwardRef<
	React.ElementRef<typeof OnboardingDialogPrimitive.Overlay>,
	React.ComponentPropsWithoutRef<typeof OnboardingDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
	<OnboardingDialogPrimitive.Overlay
		className={cn(
			'fixed inset-0 z-50 bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
			className
		)}
		{...props}
		ref={ref}
	/>
))
OnboardingDialogOverlay.displayName = OnboardingDialogPrimitive.Overlay.displayName

const OnboardingDialogContent = React.forwardRef<
	React.ElementRef<typeof OnboardingDialogPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof OnboardingDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
	<OnboardingDialogPortal>
		<OnboardingDialogOverlay />
		<OnboardingDialogPrimitive.Content
			ref={ref}
			className={cn(
				'fixed left-[50%] top-[50%] z-50 grid w-full max-w-sm translate-x-[-50%] translate-y-[-50%] gap-4 bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
				className
			)}
			{...props}
		/>
	</OnboardingDialogPortal>
))
OnboardingDialogContent.displayName = OnboardingDialogPrimitive.Content.displayName

const OnboardingDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={cn('flex flex-col space-y-2 text-center sm:text-left', className)} {...props} />
)
OnboardingDialogHeader.displayName = 'OnboardingDialogHeader'

const OnboardingDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={cn('flex flex-col-reverse justify-center sm:flex-row sm:space-x-2 mt-8 py-4 w-full', className)} {...props} />
)
OnboardingDialogFooter.displayName = 'OnboardingDialogFooter'

const OnboardingDialogTitle = React.forwardRef<
	React.ElementRef<typeof OnboardingDialogPrimitive.Title>,
	React.ComponentPropsWithoutRef<typeof OnboardingDialogPrimitive.Title>
>(({ className, ...props }, ref) => <OnboardingDialogPrimitive.Title ref={ref} className={cn('text-lg font-semibold', className)} {...props} />)
OnboardingDialogTitle.displayName = OnboardingDialogPrimitive.Title.displayName

const OnboardingDialogDescription = React.forwardRef<
	React.ElementRef<typeof OnboardingDialogPrimitive.Description>,
	React.ComponentPropsWithoutRef<typeof OnboardingDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
	<OnboardingDialogPrimitive.Description ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
))
OnboardingDialogDescription.displayName = OnboardingDialogPrimitive.Description.displayName

const OnboardingDialogAction = React.forwardRef<
	React.ElementRef<typeof OnboardingDialogPrimitive.Action>,
	React.ComponentPropsWithoutRef<typeof OnboardingDialogPrimitive.Action>
>(({ className, ...props }, ref) => <OnboardingDialogPrimitive.Action ref={ref} className={cn(buttonVariants(), className)} {...props} />)
OnboardingDialogAction.displayName = OnboardingDialogPrimitive.Action.displayName

const OnboardingDialogCancel = React.forwardRef<
	React.ElementRef<typeof OnboardingDialogPrimitive.Cancel>,
	React.ComponentPropsWithoutRef<typeof OnboardingDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
	<OnboardingDialogPrimitive.Cancel ref={ref} className={cn(buttonVariants({ variant: 'outline' }), 'mt-2 sm:mt-0', className)} {...props} />
))
OnboardingDialogCancel.displayName = OnboardingDialogPrimitive.Cancel.displayName

export {
	OnboardingDialog,
	OnboardingDialogPortal,
	OnboardingDialogOverlay,
	OnboardingDialogTrigger,
	OnboardingDialogContent,
	OnboardingDialogHeader,
	OnboardingDialogFooter,
	OnboardingDialogTitle,
	OnboardingDialogDescription,
	OnboardingDialogAction,
	OnboardingDialogCancel
}
