import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Icons } from '../icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const VerifyCodeSchema = z
	.object({
		code: z.string().min(6, {
			message: 'Code must be at least 6 characters'
		})
	})
	.required()

export type verifyCodeValues = z.infer<typeof VerifyCodeSchema>

export interface VerificationProps {
	onSubmit: (data: z.infer<typeof VerifyCodeSchema>) => void
	isLoading: boolean
}

export const Verification = ({ onSubmit, isLoading }: VerificationProps) => {
	const codeForm = useForm<verifyCodeValues>({
		resolver: zodResolver(VerifyCodeSchema)
	})

	return (
		<Form {...codeForm}>
			<form onSubmit={codeForm.handleSubmit(onSubmit)} className="space-y-8">
				<div className="grid gap-2">
					<div className="grid gap-1">
						<FormField
							control={codeForm.control}
							name="code"
							render={({ field }) => (
								<FormItem>
									<p>Check your email for our verification code and enter it below:</p>
									<FormLabel>Verification Code</FormLabel>
									<FormControl>
										<Input type="string" autoCapitalize="none" autoComplete="off" autoCorrect="off" placeholder="Enter Code" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button type="submit" disabled={isLoading} className="mt-4">
						{isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
						Verify
					</Button>
				</div>
			</form>
		</Form>
	)
}
