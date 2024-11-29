import { Separator } from '@/components/ui/separator'
import { memo } from 'react'
import { router } from '@/src/app/router'
import { HeaderTitle } from '@/components/header/HeaderTitle'
import { signoutRoute } from '@/src/app/route-tree'
import { useClerk } from '@clerk/clerk-react'
import { Button } from '@/components/ui/button'

export const PageHeader = memo(() => {
const { signOut } = useClerk()

  const signOutAction = async () => {
    window.electron.ipcRenderer.send('auth:logout')
		await router.navigate({ to: signoutRoute.fullPath })
	}

	return (
		<>
			<div className="flex flex-row flex-grow pl-6 pr-4 gap-4 items-center justify-between h-16 min-h-16 max-h-16 shrink-0 bg-muted/20">
				<HeaderTitle />
				<div className={'flex flex-row items-center justify-end flex-grow'}>





				</div>
				<div className="flex flex-row items-center gap-2">
          <Button onClick={async () => {
						await signOut(signOutAction)
					}}></Button>
				</div>
			</div>
			<Separator />
		</>
	)
})
