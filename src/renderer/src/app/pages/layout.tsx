import { Outlet, useRouter } from '@tanstack/react-router'
import { Suspense } from 'react'
import { Loading } from '@/components/fallbacks/Loading'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { Button } from '@/components/ui/button'
import { useAuth } from '@clerk/clerk-react'

import { ExitIcon, ReloadIcon } from '@radix-ui/react-icons'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { PageHeader } from '@/components/header/PageHeader'
import { signoutRoute } from '@/src/app/route-tree'

export const PageLayout = () => {
	return (
		<>
			<main className="h-screen w-screen flex flex-grow flex-row overscroll-none overflow-hidden">
				<section className="flex h-full"></section>
				<section className="h-screen flex-grow flex flex-col">
					<PageHeader />
					<Suspense fallback={<Loading />}>
						<div className="flex flex-col flex-grow min-h-0">
							<Outlet />
						</div>
					</Suspense>
				</section>
			</main>
		</>
	)
}

export const App = () => {
	const router = useRouter()
	const { signOut } = useAuth()

	const fallbackSignoutAction = async () => {
		await router.navigate({ to: signoutRoute.fullPath })
	}

	return (
		<>
			<Suspense fallback={<Loading />}>
				<QueryErrorResetBoundary>
					{({ reset }) => (
						<ErrorBoundary
							onReset={reset}
							fallbackRender={({ resetErrorBoundary }) => (
								<div className="flex w-full h-screen items-center justify-center">
									<Alert
										variant="destructive"
										className="w-full max-w-md border-none text-destructive-foreground space-y-6 items-center justify-center"
									>
										<AlertTitle className="font-normal text-lg text-destructive-foreground justify-center text-center">
											<h2 className="ggSmallCaps text-xl font-medium shadow-md">Error</h2>{' '}
											<small>Something went wrong...</small>
										</AlertTitle>
										<AlertDescription className="flex flex-row gap-4 items-center justify-center">
											<div>
												<Button variant="default" onClick={() => resetErrorBoundary()}>
													<ReloadIcon className="w-4 h-4 mr-2" /> Try again
												</Button>
											</div>
											<div>
												<Button
													variant="ghost"
													className="text-destructive-foreground"
													onClick={async () => {
														await signOut(fallbackSignoutAction)
													}}
												>
													<ExitIcon className="w-4 h-4 mr-2" /> Log out
												</Button>
											</div>
										</AlertDescription>
									</Alert>
								</div>
							)}
						>
							<Outlet />
						</ErrorBoundary>
					)}
				</QueryErrorResetBoundary>
			</Suspense>
		</>
	)
}
