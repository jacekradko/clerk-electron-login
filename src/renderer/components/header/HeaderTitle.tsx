import { useLocation } from '@tanstack/react-router'
import { useMemo } from 'react'
import { GearIcon, GlobeIcon, HomeIcon, MixIcon } from '@radix-ui/react-icons'

export const HeaderTitle = () => {
	const location = useLocation()

	const { icon, title } = useMemo(() => {
		if (location.pathname.startsWith('/dashboard')) {
			return {
				icon: <HomeIcon className="w-4 h-4 mr-2" />,
				title: 'Home'
			}
		} else if (location.pathname.startsWith('/library')) {
			return {
				icon: <MixIcon className="w-4 h-4 mr-2" />,
				title: 'Library'
			}
		} else if (location.pathname.startsWith('/explore')) {
			return {
				icon: <GlobeIcon className="w-4 h-4 mr-2" />,
				title: 'Explore'
			}
		} else if (location.pathname.startsWith('/account')) {
			return {
				icon: <GearIcon className="w-4 h-4 mr-2" />,
				title: 'Settings'
			}
		}
		return {
			icon: null,
			title: ''
		}
	}, [location.pathname])

	return (
		<div className="scroll-m-20 min-w-[95px] text-md font-medium inline-flex items-center">
			{icon} {title}
		</div>
	)
}
