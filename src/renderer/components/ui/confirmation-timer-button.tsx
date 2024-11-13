import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { AnimationSequence, motion, useAnimate } from 'motion/react'
import { Button } from '@/components/ui/button'
import { Cross2Icon } from '@radix-ui/react-icons'

export interface ConfirmationButtonProps extends PropsWithChildren {
	action: () => void
	isPending?: boolean
}

export const ConfirmationTimerButton = ({ action, isPending = false, children }: ConfirmationButtonProps): JSX.Element => {
	const [actionConfirm, setActionConfirm] = useState(false)
	const confirmationRef = useRef<HTMLDivElement>(null)
	const [scope, animate] = useAnimate()

	useEffect(() => {
		if (actionConfirm) {
			const timer = setTimeout(() => {
				setActionConfirm(false)
			}, 5000)
			return () => {
				clearTimeout(timer)
			}
		}
	}, [actionConfirm, setActionConfirm])

	useEffect(() => {
		const confirmationAnimations: AnimationSequence = actionConfirm
			? [[scope.current, { opacity: 1, x: 0 }, { duration: 0.2 }]]
			: [[scope.current, { opacity: 0, x: 15 }, { duration: 0.2 }]]
		animate([...confirmationAnimations])
	}, [actionConfirm, animate, scope])

	return (
		<div
			className={'outline-0'}
			ref={confirmationRef}
			tabIndex={0}
			onBlur={() => {
				setActionConfirm(false)
			}}
		>
			<Button
				variant="ghost"
				size="sm"
				className={`${actionConfirm ? 'hidden' : ''} text-destructive-foreground hover:text-destructive-foreground/90 hover:bg-destructive/20`}
				disabled={isPending}
				onClick={() => {
					confirmationRef.current?.focus()
					setActionConfirm(!actionConfirm)
				}}
			>
				{children}
			</Button>
			<div
				ref={scope}
				className={`${actionConfirm ? '' : 'hidden'} flex justify-start flex-row w-fit text-xs text-muted-foreground rounded-md shadow-[inset_0px_0px_0px_1px_hsl(var(--destructive)_/0.4)] relative`}
			>
				<div className="absolute bottom-[-3px] left-0 w-full h-[3px] bg-destructive/20 rounded-full">
					{actionConfirm && (
						<motion.pre
							initial={{ opacity: 1, width: '100%', height: '3px' }}
							animate={{ opacity: 1, width: '0%', height: '3px' }}
							transition={{ duration: 5 }}
							className={`flex bg-destructive/60 shadow-[inset_0px_0px_0px_1px_hsl(var(--destructive)_/0.4)] rounded-full`}
						/>
					)}
				</div>
				<div className="flex flex-row">
					<Button
						variant="secondary"
						size="sm"
						className="bg-destructive/20 text-destructive-foreground hover:text-destructive-foreground hover:bg-destructive/40"
						onClick={() => {
							void action()
							setActionConfirm(false)
						}}
					>
						abandon
					</Button>
					<Button
						variant="ghost"
						size="sm"
						className="flex-grow text-muted-foreground/80 hover:text-muted-foreground hover:bg-muted/40 rounded-none"
						onClick={() => setActionConfirm(false)}
					>
						<Cross2Icon className="w-4 h-4 mr-2" />
						Cancel
					</Button>
				</div>
			</div>
		</div>
	)
}
