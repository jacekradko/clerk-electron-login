import { Skeleton } from '@/components/ui/skeleton'
import { HTMLAttributes, memo } from 'react'
import { cn } from '@/lib/utils'

export const Loading = memo(() => (
	<div className="loading-container">
		Loading...
	</div>
))

export const MultiLineSkeleton = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
	<div className={cn('flex items-center space-x-4', className)} {...props}>
		<Skeleton className="h-10 w-10 rounded-full" />
		<div className="space-y-2">
			<Skeleton className="h-4 w-full min-w-[100px] max-w-[220px]" />
			<Skeleton className="h-4 w-full min-w-[100px] max-w-[180px]" />
		</div>
	</div>
)
export const SidebarSkeleton = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
	<div className={cn('flex flex-col justify-start space-y-4 p-4 flex-shrink', className)} {...props}>
		<div className="flex justify-between items-center">
			<Skeleton className="h-10 w-10 rounded-full" />
			<Skeleton className="h-8 w-[100px] justify-end" />
		</div>
		<Skeleton className="justify-start w-full h-[100px]" />
	</div>
)
