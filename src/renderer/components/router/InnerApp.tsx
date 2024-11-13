import { useAuth, useClerk } from '@clerk/clerk-react'
import { RouterProvider } from '@tanstack/react-router'
import { router } from '@/src/app/router'
import { queryClient } from '@/src/network/QueryClient'

export const InnerApp = () => {
	const clerk = useClerk()
  const { isSignedIn } = useAuth()
  console.log("SIGNIN")
  console.log(isSignedIn)
  console.log(clerk.session)
	return <RouterProvider router={router} context={{ clerk, queryClient }} />
}
