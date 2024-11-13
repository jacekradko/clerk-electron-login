import { Toaster as Sonner } from 'sonner'
import { ComponentProps } from 'react'

type ToasterProps = ComponentProps<typeof Sonner>

export const Toaster = ({ ...props }: ToasterProps) => {
	return (
		<Sonner
			className="toaster group"
			theme="dark"
			toastOptions={{
				classNames: {
					default: 'toast group',
					toast:
						'toast group group-[.toaster]:backdrop-blur-lg group-[.toaster]:border group-[.toaster]:border-muted-foreground/30 group-[.toaster]:shadow-md',
					error:
						'group-[.toaster]:bg-destructive/20 group-[.toaster]:border group-[.toaster]:border-destructive/80 group-[.toaster]:text-destructive-foreground'
				}
			}}
			{...props}
		/>
	)
}
