import { Navigate } from '@tanstack/react-router'
import { signinRoute } from '@/src/app/route-tree'
import { useEffect } from 'react'
import { router } from '@/src/app/router'
import { Loading } from '@/components/fallbacks/Loading'
import { useAuth, useClerk } from '@clerk/clerk-react'

export const Signout = () => {
	const { session } = useClerk()
	const { isSignedIn } = useAuth()

	useEffect(() => {
		void router.invalidate()
	}, [])
  console.log("SIGNOUT")
  console.log(session)
  console.log(isSignedIn)

	return <>{session || isSignedIn ? <Loading /> : <Navigate to={signinRoute.fullPath} />}</>
}
