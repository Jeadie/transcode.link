import { MouseEventHandler, useState } from "react"
import DialogueView from "./DialogueView"
import { Utterance } from "./model"

export default function ChapterCard(title: string, gist: string, summary: string, startTimeSecs: number, endTimeSecs: number, onClick: () => void) {
    const duration = ((endTimeSecs - startTimeSecs) / 60).toPrecision(1)
    const startMin = Math.floor(startTimeSecs / 60)
    const startSecs = Math.floor(startTimeSecs % 60)

    const callback: MouseEventHandler<HTMLAnchorElement> = (e) => {e.preventDefault(); onClick()} 
    return (
        //  max-w-lg    
        <div>
            <a className="relative block p-8 overflow-hidden border border-gray-100 rounded-lg" href="" onClick={callback}>
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

                <div className="flex flex-col-reverse ml-13 sm:ml-16">
                    {HoverArrowCTA("Transcript")}
                </div>
            </dl>
            </a>
        </div>

    )
}


function HoverArrowCTA(text: string, colour: string = "indigo-600") {
    return (
        <div className={"inline-flex items-center mt-16 text-" + colour}>
        <p className="text-lg font-medium">{text}</p>

        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 ml-3 transition-transform transform group-hover:translate-x-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
        </div>
    )
}