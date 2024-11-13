import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Icons } from '@/components/ui/icons'
import * as z from 'zod'
import { FieldPath, useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useSignUp } from '@clerk/clerk-react'
import { ClerkAPIError, OAuthStrategy } from '@clerk/types'
import { TwitchIcon } from 'lucide-react'
import { DiscordLogoIcon } from '@radix-ui/react-icons'
import { HTMLAttributes, useState } from 'react'
import { parseErrors } from '@/components/ui/SignUp/utils/ErrorHandler'
import { Separator } from '@/components/ui/separator'
import { FancyButton } from '@/components/FancyButton'
import { useOAuth } from '@/src/hooks/useOAuth'
import { Verification } from './Verification'
import { Link, useNavigate } from '@tanstack/react-router'
import { router } from '@/src/app/router'

interface AuthForm extends HTMLAttributes<HTMLDivElement> {}

interface SignUpError {
	errors: ClerkAPIError[]
}

const AccountFormSchema = z
	.object({
		email_address: z.string().email(),
		password: z.string().min(8, {
			message: 'Password must be at least 8 characters'
		}),
		confirm: z.string()
	})
	.required()
	.refine((data) => data.password === data.confirm, {
		message: "Passwords don't match",
		path: ['confirm']
	})

const VerifyCodeSchema = z
	.object({
		code: z.string().min(6, {
			message: 'Code must be at least 6 characters'
		})
	})
	.required()

type authFormValues = z.infer<typeof AccountFormSchema>

const defaultValues: Partial<authFormValues> = {
	email_address: '',
	password: '',
	confirm: ''
}

export const SignUpForm = ({ className, ...props }: AuthForm) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const { isLoaded, signUp, setActive } = useSignUp()
	const [verifying, setVerifying] = useState(false)
	const navigate = useNavigate()
	const { startOAuthFlow: googleOauthFlow } = useOAuth({ strategy: 'oauth_google' })
	const form = useForm<authFormValues>({
		resolver: zodResolver(AccountFormSchema),
		defaultValues
	})

	function displayFormErrors(err: SignUpError) {
		// This can return an array of errors.
		// See https://clerk.com/docs/custom-flows/error-handling to learn about error handling
		setIsLoading(false)

		const errors = err.errors as ClerkAPIError[]

		const parsedErrors = parseErrors(errors)

		parsedErrors.fieldErrors.forEach((fieldError) => {
			form.setError(fieldError.meta?.paramName as FieldPath<authFormValues>, fieldError)
		})

		parsedErrors.globalErrors.forEach((globalError) => {
			form.setError('root.globalError', globalError)
		})
	}

	const onSubmit = async (data: z.infer<typeof AccountFormSchema>) => {
		setIsLoading(true)
		if (!isLoaded) {
			return
		}

		try {
			const completeSignUp = await signUp.create({
				emailAddress: data.email_address,
				password: data.password
			})

			if (completeSignUp.status === 'complete') {
				await setActive({ session: completeSignUp.createdSessionId })
				// Handle your own logic here, like redirecting to a new page if needed.
				// await router.invalidate()
				await navigate({ to: '/' })
			} else {
				signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
				setVerifying(true)
			}
			// Send the user an email with the verification code
		} catch (err: unknown) {
			displayFormErrors(err as SignUpError)
		} finally {
			setIsLoading(false)
		}
	}

	const onVerifyCode = async (data: z.infer<typeof VerifyCodeSchema>) => {
		setIsLoading(true)
		if (!isLoaded) {
			return
		}

		const result = data.code

		try {
			// Submit the code that the user provides to attempt verification
			const completeSignUp = await signUp.attemptEmailAddressVerification({
				code: result
			})

			// Check the status to see if it is complete
			// If complete, the user has been created -- set the session active
			if (completeSignUp.status === 'complete') {
				await setActive({ session: completeSignUp.createdSessionId })
				// Handle your own logic here, like redirecting to a new page if needed.
				await router.invalidate()
				await navigate({ to: '/' })
			}
		} catch (err: unknown) {
			// This can return an array of errors.
			// See https://clerk.com/docs/custom-flows/error-handling to learn about error handling
			displayFormErrors(err as SignUpError)
		} finally {
			setIsLoading(false)
		}
	}

	// This function will handle the user submitting a code for verification

	const signUpWith = (strategy: OAuthStrategy) => {
		if (signUp) {
			if (strategy === 'oauth_google') {
				try {
					googleOauthFlow({ redirectUrl: `${import.meta.env.VITE_DOMAIN}/sso-callback` })
				} catch (err: unknown) {
					displayFormErrors(err as SignUpError)
				}
			}
		}
	}

	return (
		<>
			<div className="flex flex-col text-center mb-6">
				<h1 className="text-2xl font-medium">Create Your Account</h1>
				<p className={'text-md text-muted-foreground'}>
					Already have an account?{' '}
					<Link to="/signin" className="font-medium text-accent hover:text-accent-foreground inline-flex items-center">
						Sign in
					</Link>
				</p>
			</div>
			<div className={cn('grid', className)} {...props}>
				{!verifying && (
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-left">
							{form.formState.errors.root?.globalError && (
								<p className={'text-sm font-normal text-destructive-foreground mt-1'}>{form.formState.errors.root?.globalError.message}</p>
							)}
							<FormField
								control={form.control}
								name="email_address"
								render={({ field }) => (
									<FormItem>
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
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className={`grid`}>
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-md font-normal">Password</FormLabel>
											<FormControl>
												<Input
													type="password"
													autoComplete="off"
													autoCapitalize="none"
													autoCorrect="off"
													placeholder="Enter a Password"
													className="bg-black/30 backdrop-blur border border-muted h-11 shadow-inner shadow-black/30 placeholder:text-muted-foreground/60 font-mono text-sm"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className={`grid`}>
								<FormField
									control={form.control}
									name="confirm"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-md font-normal">Confirm Password</FormLabel>
											<FormControl>
												<Input
													type="password"
													autoComplete="off"
													autoCapitalize="none"
													autoCorrect="off"
													placeholder="Confirm Your Password"
													className="bg-black/30 backdrop-blur border border-muted h-11 shadow-inner shadow-black/30 placeholder:text-muted-foreground/60 font-mono text-sm"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="grid gap-2">
								<FancyButton variant="hero" type="submit" disabled={isLoading}>
									{isLoading ? (
										<>
											<Icons.loaderSquare className="mr-2 h-4 w-4 float-left" /> Please Wait
										</>
									) : (
										'Create Account'
									)}
								</FancyButton>
							</div>
							<div className="relative grid grid-cols-4 text-xs ggSmallCaps items-center hidden">
								<Separator className="col-span-1" />
								<div className="col-span-2 text-center align-center text-muted-foreground">Or continue with</div>
								<Separator className="grid col-span-1" />
							</div>
							<div className="grid grid-cols-3 gap-2 hidden">
								<Button variant="secondary" type="button" disabled={isLoading} onClick={() => signUpWith('oauth_google')}>
									{isLoading ? <Icons.loaderSquare className="mr-2 h-4 w-4" /> : <Icons.google className="mr-2 h-4 w-4" />} Google
								</Button>
								<Button variant="secondary" type="button" disabled={isLoading} onClick={() => signUpWith('oauth_twitch')}>
									{isLoading ? <Icons.loaderSquare className="mr-2 h-4 w-4" /> : <TwitchIcon className="mr-2 h-4 w-4" />} Twitch
								</Button>
								<Button variant="secondary" type="button" disabled={isLoading} onClick={() => signUpWith('oauth_discord')}>
									{isLoading ? <Icons.loaderSquare className="mr-2 h-4 w-4" /> : <DiscordLogoIcon className="mr-2 h-4 w-4" />} Discord
								</Button>
							</div>
						</form>
					</Form>
				)}
				{verifying && <Verification isLoading={isLoading} onSubmit={onVerifyCode} />}
			</div>
		</>
	)
}
