import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/sonner'
import { HubClerkProvider } from '@/src/provider/ClerkProvider'
import { queryClient } from '@/src/network/QueryClient'
import { InnerApp } from '@/components/router/InnerApp'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ClerkLoaded } from '@clerk/clerk-react'




export const Root = () => {


	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider defaultTheme="dark">
						<HubClerkProvider>
							{/* Define a /sso-callback route that handle the OAuth redirect flow */}
							<ClerkLoaded>
								<InnerApp />
							</ClerkLoaded>
							<Toaster />
						</HubClerkProvider>
			</ThemeProvider>
			<ReactQueryDevtools buttonPosition="top-left" />
		</QueryClientProvider>
	)
}

const el = document.getElementById('root')

if (el) {
	createRoot(el).render(<Root />)
}
