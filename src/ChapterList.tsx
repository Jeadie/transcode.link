import React, { ReactNode } from "react";
import { Chapter } from "./model";


export default function ChapterList(chapters: Chapter[]): ReactNode {

    return (
        <div className="col-start-2 col-span-3">
            {chapters.map((c: Chapter,  i: number, _: Chapter[]) => ChapterLine(c, i))}
        </div>
    )
}

function ChapterLine(c: Chapter, i: number): React.ReactNode {
    const endTimeSecs = c.end/1000
    const startTimeSecs = c.start/1000
    const duration = ((endTimeSecs - startTimeSecs) / 60).toPrecision(1)
    const startMin = Math.floor(startTimeSecs / 60)
    const startSecs = Math.floor(startTimeSecs % 60)

    return (
        <div>
            <a className="relative bg-white block p-4 my-2 shadow-l overflow-hidden border border-gray-100 rounded-lg" href="">
            <span className="absolute inset-x-0 bottom-0 h-1  bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

            <div className="justify-between sm:flex">
                <div>
                <h5 className="text-md text-gray-900"><h5 className="font-bold inline-flex">Chapter {i+1}: </h5> {c.gist}</h5>
                </div>
            </div>
            <dl className="flex mt-2">
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
        </div>
    )
}