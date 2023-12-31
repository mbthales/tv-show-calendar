import Auth from './Auth'

export default function Hero() {
	return (
		<div className="flex w-full h-full flex-col items-center justify-center gap-12">
			<h1 className="text-6xl text-center">Tv Show Calendar</h1>
			<p className="text-xl">
				Follow your favorite tv shows and never miss an episode again.
			</p>
			<Auth />
		</div>
	)
}
