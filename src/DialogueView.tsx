import { Utterance } from "./model";

export default function DialogueView(utterances: Utterance[]) {
    return (
        <ul>
           - {utterances.map(m => <li>{m.text}</li>)}
        </ul>
    )
}