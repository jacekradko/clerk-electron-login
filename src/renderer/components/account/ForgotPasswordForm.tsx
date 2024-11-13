import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { FieldPath, useForm, useWatch } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { HTMLAttributes, useState } from 'react'
import { useSignIn } from '@clerk/clerk-react'
import { ClerkAPIError } from '@clerk/types'
import { parseErrors } from '@/components/ui/SignUp/utils/ErrorHandler'
import { LoadingButton } from '@/components/ui/loading-button'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/PinInput'
import { useNavigate } from '@tanstack/react-router'

interface ForgotPasswordFormProps extends HTMLAttributes<HTMLDivElement> {
	email?: string
	embedded?: boolean
}

interface SignInError {
	errors: ClerkAPIError[]
}

const EmailSchema = z
	.object({
		emailAddress: z.string().email()
	})
	.required()

const NewPasswordSchema = z
	.object({
		code: z.string().min(6, {
			message: 'Verification code must be at least 6 characters'
		}),
		password: z.string().min(8, {
			message: 'Password must be at least 8 characters'
		})
	})
	.required()

type EmailValues = z.infer<typeof EmailSchema>
type NewPasswordValues = z.infer<typeof NewPasswordSchema>

export const ForgotPasswordForm = ({ email, embedded = true, className, ...props }: ForgotPasswordFormProps) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [successfulCreation, setSuccessfulCreation] = useState(false)
	const { isLoaded, signIn, setActive } = useSignIn()
	const navigate = useNavigate()

	const emailForm = useForm<EmailValues>({
		resolver: zodResolver(EmailSchema),
		defaultValues: {
			emailAddress: ''
		},
		values: {
			emailAddress: email || ''
		}
	})

	const resetPasswordForm = useForm<NewPasswordValues>({
		resolver: zodResolver(NewPasswordSchema),
		defaultValues: {
			code: '',
			password: ''
		}
	})

	const onCreate = async (data: z.infer<typeof EmailSchema>) => {
		try {
			setIsLoading(true)
			await signIn?.create({
				strategy: 'reset_password_email_code',
				identifier: data.emailAddress
			})

			setSuccessfulCreation(true)
		} catch (err: unknown) {
			// This can return an array of errors.
			// See https://clerk.com/docs/custom-flows/error-handling to learn about error handling
			const errors = (err as SignInError).errors as ClerkAPIError[]

			const parsedErrors = parseErrors(errors)

			parsedErrors.fieldErrors.forEach((fieldError) => {
				emailForm.setError(fieldError.meta?.paramName as FieldPath<EmailValues>, fieldError)
			})

			parsedErrors.globalErrors.forEach((globalError) => {
				emailForm.setError('root.globalError', globalError)
			})
		} finally {
			setIsLoading(false)
		}
	}

	const onSubmit = async (data: z.infer<typeof NewPasswordSchema>) => {
		if (!isLoaded) {
			return
		}
		setIsLoading(true)

		try {
			const result = await signIn?.attemptFirstFactor({
				strategy: 'reset_password_email_code',
				code: data.code,
				password: data.password
			})

			if (result.status === 'needs_second_factor') {
				throw new Error('Not implemented yet!')
			} else if (result.status === 'complete') {
				await setActive({ session: result.createdSessionId })
				!embedded && navigate({ to: '/' })
			}
		} catch (err: unknown) {
			// This can return an array of errors.
			// See https://clerk.com/docs/custom-flows/error-handling to learn about error handling
			const errors = (err as SignInError).errors as ClerkAPIError[]

			const parsedErrors = parseErrors(errors)

			parsedErrors.fieldErrors.forEach((fieldError) => {
				resetPasswordForm.setError(fieldError.meta?.paramName as FieldPath<NewPasswordValues>, fieldError)
			})

			parsedErrors.globalErrors.forEach((globalError) => {
				resetPasswordForm.setError('root.globalError', globalError)
			})
		} finally {
			setIsLoading(false)
		}
	}

	const { code: codeValue } = useWatch({ control: resetPasswordForm.control })

	return (
		<div className={cn('grid', className)} {...props}>
			{!successfulCreation && (
				<Form {...emailForm}>
					<form onSubmit={emailForm.handleSubmit(onCreate)} className="flex flex-col gap-4" noValidate={true}>
						{emailForm.formState.errors.root?.globalError && (
							<p className={'text-sm font-normal text-destructive-foreground mt-1'}>{emailForm.formState.errors.root?.globalError.message}</p>
						)}
						<FormField
							control={emailForm.control}
							name="emailAddress"
							// disabled={!!email}
							render={({ field }) => (
								<FormItem className="py-4">
									<FormLabel className="text-md font-normal">Email Address</FormLabel>
									<FormControl>
										<Input
											type="email"
											autoCapitalize="none"
											autoComplete="email"
											autoCorrect="off"
											autoFocus
											placeholder="your@email.com"
											className="bg-black/30 backdrop-blur border border-muted h-11 shadow-inner shadow-black/30 placeholder:text-muted-foreground/60 font-mono text-sm"
											{...field}
										/>
									</FormControl>
									<FormMessage className="col-span-4 col-start-2" />
								</FormItem>
							)}
						/>
						<LoadingButton className="self-end" type="submit" loading={isLoading} disabled={!email && !emailForm.formState.isDirty}>
							Send Code
						</LoadingButton>
					</form>
				</Form>
			)}

			{successfulCreation && (
				<Form {...resetPasswordForm}>
					<form onSubmit={resetPasswordForm.handleSubmit(onSubmit)} className="space-y-4 text-left">
						{resetPasswordForm.formState.errors.root?.globalError && (
							<p className={'text-sm font-normal text-destructive-foreground mt-1'}>{resetPasswordForm.formState.errors.root?.globalError.message}</p>
						)}
						<FormField
							control={resetPasswordForm.control}
							name="code"
							render={({ field }) => (
								<FormItem className="space-y-1">
									<FormLabel className="text-md font-normal">Verification Code</FormLabel>
									<FormControl>
										<InputOTP {...field} autoFocus={true} containerClassName="justify-center" maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
											<InputOTPGroup className="gap-4 flex-grow justify-between">
												<InputOTPSlot index={0} />
												<InputOTPSlot index={1} />
												<InputOTPSlot index={2} />
												<InputOTPSlot index={3} />
												<InputOTPSlot index={4} />
												<InputOTPSlot index={5} />
											</InputOTPGroup>
										</InputOTP>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={resetPasswordForm.control}
							name="password"
							render={({ field }) => (
								<FormItem className="space-y-1">
									<FormLabel className="text-md font-normal">New Password</FormLabel>
									<FormControl>
										<Input
											type="password"
											autoComplete="off"
											autoCapitalize="none"
											autoCorrect="off"
											placeholder="New password"
											className="bg-black/30 backdrop-blur border border-muted h-11 shadow-inner shadow-black/30 placeholder:text-muted-foreground/60 font-mono text-sm"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="grid">
							<LoadingButton
								variant="accent"
								className="w-full gap-2 contain ggSmallCaps mb-4 mt-2"
								type="submit"
								loading={isLoading}
								disabled={!(codeValue?.length === 6 && resetPasswordForm.formState.dirtyFields.password)}
							>
								Reset
							</LoadingButton>
						</div>
					</form>
				</Form>
			)}
		</div>
	)
}
