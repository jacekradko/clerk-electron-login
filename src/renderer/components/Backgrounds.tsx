import { cn } from '@/lib/utils'

type SpotlightProps = {
	className?: string
	fill?: string
	fillOpacity?: string
}

const LargeGridBackground = () => {
	return (
		<div className="absolute -z-[1] h-screen w-screen bg-transparent bg-grid-small-white/[0.5] flex items-center justify-center pointer-events-none bg-largeGrid-bg">
			<div className="absolute pointer-events-none inset-0 bg-background [mask-image:radial-gradient(100%_100%_ellipse_at_50%_0%,transparent_80%,hsl(var(--background))_100%)] [-webkit-mask-image:radial-gradient(70%_100%_ellipse_at_50%_0%,transparent_70%,hsl(var(--background))_100%)]"></div>
		</div>
	)
}

const SmallGridBackground = () => {
	return (
		<div className="absolute top-0 left-0 h-full w-full bg-transparent flex items-center justify-center pointer-events-none bg-smallGrid-bg mix-blend-overlay">
			<div className="absolute pointer-events-none inset-0 bg-background [mask-image:radial-gradient(50%_50%_ellipse_at_50%_0%,transparent_0%,hsl(var(--background))_100%)] [-webkit-mask-image:radial-gradient(100%_180%_ellipse_at_50%_-20%,transparent_0%,hsl(var(--background)/0.7)_100%)]"></div>
		</div>
	)
}

const DotBackground = () => {
	return (
		<div className="absolute -z-[1] top-0 h-screen w-screen bg-transparent flex items-center justify-center pointer-events-none bg-dot-bg">
			<div className="absolute pointer-events-none inset-0 bg-transparent [mask-image:radial-gradient(50%_100%_ellipse_at_50%_0%,transparent_100%,hsl(var(--background))_100%)] [-webkit-mask-image:radial-gradient(65%_90%_ellipse_at_50%_30%,transparent_50%,hsl(var(--background))_100%)]"></div>
		</div>
	)
}
const DotBackgroundMain = () => {
	return (
		<div className="absolute -z-[2] top-0 h-screen w-screen bg-transparent flex items-center justify-center pointer-events-none bg-dot-bg-main">
			<div className="absolute pointer-events-none inset-0 bg-background [mask-image:radial-gradient(100%_100%_ellipse_at_0%_0%,transparent_50%,hsl(var(--background))_100%)] [-webkit-mask-image:radial-gradient(100%_100%_ellipse_at_0%_0%,transparent_50%,hsl(var(--background))_100%)]"></div>
		</div>
	)
}

const SpotlightBackground = ({ className }: SpotlightProps) => {
	return (
		<div className={'overflow-clip absolute w-screen h-screen top-0 pointer-events-none mx-auto z-[1]'}>
			<svg className={cn('animate-spotlight h-full w-full', className)} xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 1024 768`} fill="none">
				<g filter="url(#filter)">
					<ellipse cx="50%" cy="-15%" rx="25%" ry="75%" fill="#A9CEC0" id="lightsource"></ellipse>
				</g>

				<defs>
					<filter id="filter" x="0" y="0" width="100%" height="100%" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
						<feBlend mode="overlay" in="SourceGraphic" result="shape"></feBlend>
						<feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_1065_8"></feGaussianBlur>
					</filter>
				</defs>
			</svg>
		</div>
	)
}

export { DotBackground, LargeGridBackground, SmallGridBackground, SpotlightBackground, DotBackgroundMain }
