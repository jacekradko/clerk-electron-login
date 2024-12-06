import { createHashHistory, createRouter as createTanstackRouter } from '@tanstack/react-router'
import { routeTree } from '@/src/app/route-tree'
import { NotFound } from '@/src/app/pages/nomatch'

const hashHistory = createHashHistory()

export const createRouter = () =>
	createTanstackRouter({
		routeTree,
		history: hashHistory,
		defaultPreload: 'intent',
		defaultPreloadStaleTime: 0,
		// defaultErrorComponent: DefaultCatchBoundary,
		defaultNotFoundComponent: () => <NotFound />,
		context: {
			session: undefined!,
			queryClient: undefined!
		}
	})

declare module '@tanstack/react-router' {
	interface Register {
		router: ReturnType<typeof createRouter>
	}
}

export const router = createRouter()
