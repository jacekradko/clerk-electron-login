import { createRootRouteWithContext, createRoute, redirect } from '@tanstack/react-router'
import { App, PageLayout } from '@/src/app/pages/layout'
import { useSession } from '@clerk/clerk-react'
import { SignInForm } from '@/components/ui/SignIn/SignInForm'
import { AuthLayout } from '@/src/app/pages/auth/AuthLayout'
import { SignUpForm } from '@/components/ui/SignUp/SignUpForm'
import { SSOCallback } from '@/components/account/SSOCallback'
import { QueryClient } from '@tanstack/react-query'
import { Outlet } from '@tanstack/react-router'
import { Signout } from '@/src/app/pages/auth/signout'
import { NotFound } from '@/src/app/pages/nomatch'
import { TanStackRouterDevtools } from '@/components/TanStackRouterDevTools'
import { Home } from './pages/home'

interface RouteContext {
	session: ReturnType<typeof useSession>
	queryClient: QueryClient
}

const rootRoute = createRootRouteWithContext<RouteContext>()({
	component: () => (
		<>
			<Outlet />
			<TanStackRouterDevtools />
		</>
	)
})

const authenticatedVirtualRoute = createRoute({
	getParentRoute: () => rootRoute,
	id: '_authenticated',
	beforeLoad: async ({ location, context }) => {
		if (!context.session?.isSignedIn) {
			throw redirect({
				to: '/signin',
				search: {
					// Use the current location to power a redirect after login
					// (Do not use `router.state.resolvedLocation` as it can
					// potentially lag behind the actual current location)
					redirect: location.href
				}
			})
		}
	},
	component: () => {
		return (
			<>
				<Outlet />
			</>
		)
	},
	notFoundComponent: () => {
		return <NotFound />
	}
})

export const signoutRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: 'signout',
	component: Signout
})

export const appVirtualRoute = createRoute({
	getParentRoute: () => authenticatedVirtualRoute,
	id: 'app',
	component: App
})

export const pageLayoutRoute = createRoute({
	getParentRoute: () => appVirtualRoute,
	id: 'pageLayout',
	component: PageLayout
})

export const homeLayoutRoute = createRoute({
  getParentRoute: () => pageLayoutRoute,
  path: '/home',
  component: Home
})

export const authLayoutRoute = createRoute({
	getParentRoute: () => rootRoute,
	id: 'authentication',
	component: AuthLayout
})

export const signinRoute = createRoute({
	getParentRoute: () => authLayoutRoute,
	path: 'signin',
	component: SignInForm
})

export const signupRoute = createRoute({
	getParentRoute: () => authLayoutRoute,
	path: 'signup',
	component: SignUpForm
})

export const ssoCallbackRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: 'sso-callback',
	component: SSOCallback
})

export const routeTree = rootRoute.addChildren([
	authLayoutRoute.addChildren([signinRoute, signupRoute]),
	signoutRoute,
	authenticatedVirtualRoute.addChildren([
		appVirtualRoute.addChildren([pageLayoutRoute.addChildren([homeLayoutRoute])]),
		ssoCallbackRoute
	])
])
