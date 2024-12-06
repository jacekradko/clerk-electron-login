

import { useSession } from '@clerk/clerk-react'
import { Navigate } from '@tanstack/react-router'
import { signinRoute } from '@/src/app/route-tree'

export const NoMatch = () => {

	return <Navigate to={'/home'} />
}

export const NoMatchAuth = () => {
	return <Navigate to={signinRoute.fullPath} />
}

export const NotFound = () => {
	const { session, isSignedIn } = useSession()
	if (isSignedIn && session) {
		return <NoMatch />
	}

	return <NoMatchAuth />
}
