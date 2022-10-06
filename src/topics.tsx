import { stringify } from "querystring";
import { isConstructorDeclaration, sortAndDeduplicateDiagnostics } from "typescript";
import { Transcript } from "./model";



export default function TopicsView(transcript: Transcript) {
    const categories = transcript.iab_categories_result.summary
    const topics: [string, number][] = [];
    for (const [key, value] of Object.entries(categories)) {
        if (typeof value === "number") {
            topics.push([extractKey(key), value])
        }
    }
    topics.sort((a: [string, number], b: [string, number]) => {
        return  a[1] == b[1] ? 0 : a[1] > b[1] ? 1: -1
    })  

    return (
        topics.map((t: [string, number]) => 
            <div className="p-4 text-green-700 border-l-4 border-green-700 bg-green-50" role="alert">
                <h3 className="text-sm font-medium">{t[0]}</h3>
            </div>
        )
    )
}

function extractKey(x: string): string {
    const parts = x.split(">")
    return parts[parts.length-1]
}