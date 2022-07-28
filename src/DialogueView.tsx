import { resourceUsage } from "process";
import { Utterance } from "./model";

export default function DialogueView(utterances: Utterance[]) {
        const speakers = Array.from(new Set<string>(utterances.filter(u => u.speaker !== undefined).map(u => u.speaker!!)))
        const colours = ["green-300", "blue-200", "purple-300", ]
        const messages = utterances.filter(u => u.speaker !== undefined).map(u => {
            const speakerNumber = speakers.indexOf(u.speaker!!)
            return {
                isRight: speakerNumber % 2 == 1,
                text: u.text,
                colour: colours[speakerNumber % colours.length],
                speakerId: speakerNumber
            }
        })
        return ChatBox(messages)
}

interface ChatMessage {
    isRight: boolean
    text: string
    colour: string
    speakerId: number
}
// https://www.tailwindcsscomponent.com/chat
function ChatMessage(message: ChatMessage) {
    // items-end vs items-start  and justify-end
    // order-1 vs order-2
    // On last in set, 
    // <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" className="w-6 h-6 rounded-full order-1"></img>
    const padding = message.isRight ? "pl-8" : "pr-8"
    const textAlignment = message.isRight ? "text-right" : "text-left"
    const className = `py-3 rounded-lg text-gray-600`
    return (
        
        <div className={className}>
            <span className={`rounded-lg font-bold py-1 px-1 mr-2 inline-block bg-${message.colour}`}>Speaker {message.speakerId}:  </span>
            <span>{message.text}</span>
        </div>
    )
}

function ChatBox(message: ChatMessage[]) {
    return (
        <div id="messages" className="flex flex-col flex-no-wrap space-y-4 p-3 overflow-y-auto overflow-auto max-h-128">
        {message.map(m => ChatMessage(m))}
        </div>
    )
}