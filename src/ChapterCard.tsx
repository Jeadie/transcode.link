
export default function ChapterCard(title: string, gist: string, summary: string, startTimeSecs: number, endTimeSecs: number) {
    const duration = ((endTimeSecs - startTimeSecs) / 60).toPrecision(1)
    const startMin = Math.floor(startTimeSecs / 60)
    const startSecs = Math.floor(startTimeSecs % 60)

    return (
        <a className="relative block p-8 overflow-hidden border border-gray-100 rounded-lg max-w-md" href="">
        <span className="absolute inset-x-0 bottom-0 h-2  bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

        <div className="justify-between sm:flex">
            <div>
            <h5 className="text-xl font-bold text-gray-900">
                {title}
            </h5>
            <p className="mt-1 text-xs font-medium text-gray-600">{gist}</p>
            </div>
        </div>

        <div className="mt-4 sm:pr-8">
            <p className="text-sm text-gray-500">
                {summary}
            </p>
        </div>

        <dl className="flex mt-6">
            <div className="flex flex-col-reverse">
            <dd className="text-xs text-gray-500">{`${startMin}:${startSecs.toString().padStart(2, "0")}`}</dd>
            <dt className="text-sm font-medium text-gray-600">Starts: </dt>
            </div>

            <div className="flex flex-col-reverse ml-3 sm:ml-6">
            <dd className="text-xs text-gray-500">{duration} minutes</dd>
            <dt className="text-sm font-medium text-gray-600">Chapter Time</dt>
            </div>
        </dl>
        </a>

    )
}