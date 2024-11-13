import { useSignIn, useSignUp } from '@clerk/clerk-react'
import type { OAuthStrategy } from '@clerk/types'

export type UseOAuthFlowParams = {
	strategy: OAuthStrategy
	redirectUrl?: string
	unsafeMetadata?: SignUpUnsafeMetadata
}

export type StartOAuthFlowParams = {
	redirectUrl?: string
	unsafeMetadata?: SignUpUnsafeMetadata
}

// @ts-ignore
export const useOAuth = (useOAuthParams: UseOAuthFlowParams) => {
	const { strategy } = useOAuthParams || {}
	if (!strategy) {
		throw new Error('Missing oauth strategy')
	}
	const { signIn, setActive, isLoaded: isSignInLoaded } = useSignIn()
	const { signUp, isLoaded: isSignUpLoaded } = useSignUp()

	async function startOAuthFlow(startOAuthFlowParams?: StartOAuthFlowParams) {
		if (!isSignInLoaded || !isSignUpLoaded) {
			return {
				createdSessionId: '',
				signIn,
				signUp,
				setActive
			}
		}

		// Create a redirect url for the current platform and environment.
		//
		// This redirect URL needs to be whitelisted for your Clerk production instance via
		// https://clerk.com/docs/reference/backend-api/tag/Redirect-URLs#operation/CreateRedirectURL
		//
		// For more information go to:
		// https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionmakeredirecturi
		const oauthRedirectUrl = startOAuthFlowParams?.redirectUrl || useOAuthParams.redirectUrl || `${import.meta.env.VITE_DOMAIN}/sso-callback`

		await signIn.create({ strategy, redirectUrl: oauthRedirectUrl })

		const { externalVerificationRedirectURL } = signIn.firstFactorVerification

		if (strategy === 'oauth_google') {
			externalVerificationRedirectURL?.searchParams.set('prompt', 'select_account')
		}

		// openAuthWindow(externalVerificationRedirectURL?.toString() || '')

		// onAuthCallback(async (ssoUrl: string) => {
		// 	const url = new URL(ssoUrl)
    //
		// 	const params = url.searchParams
    //
		// 	const rotatingTokenNonce = params.get('rotating_token_nonce') || ''
		// 	await signIn.reload({ rotatingTokenNonce })
    //
		// 	const { status, firstFactorVerification } = signIn
    //
		// 	let createdSessionId = ''
    //
		// 	if (status === 'complete') {
		// 		createdSessionId = signIn.createdSessionId!
		// 	} else if (firstFactorVerification.status === 'transferable') {
		// 		await signUp.create({
		// 			transfer: true,
		// 			unsafeMetadata: startOAuthFlowParams?.unsafeMetadata || useOAuthParams.unsafeMetadata
		// 		})
		// 		createdSessionId = signUp.createdSessionId || ''
		// 	}
    //
		// 	if (createdSessionId) {
		// 		setActive({
		// 			session: createdSessionId,
		// 			beforeEmit: () => navigate({ to: '/' })
		// 		})
		// 	} else {
		// 		// Use signIn or signUp for next steps such as MFA
		// 	}
		// })
	}

	return {
		startOAuthFlow
	}
}
