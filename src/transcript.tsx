import React from 'react';
import { Params, useParams } from "react-router-dom";
// import AudioPlayer from './audio_player';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import AssemblyAiClient from './transcript_api'
import { AutoHighlightQuote, Chapter, GetAutoHighlightQuotes, Transcript, Utterance } from './model';
import ChapterCard from './ChapterCard';
import DialogueView from './DialogueView';
import ChapterList from './ChapterList';
import { isString } from 'util';
import TopicsView from './topics';

interface TranscriptProps {
    params: Readonly<Params<string>> | undefined
}
  
interface TranscriptState {
    transcriptData: Transcript | undefined
    sentences: Utterance[] | undefined 
    chapters: Chapter[]
    showDialogue: boolean[]
}
const a = new AssemblyAiClient("af2dd3e98a3146dda72b41a35e66ad42")

class TranscriptView extends React.Component<TranscriptProps, TranscriptState> {
    constructor(props: TranscriptProps) {
        super(props)
        this.state = {transcriptData: undefined, sentences: undefined, chapters: [], showDialogue: []}
    }

    componentDidMount() {
        if (this.props.params?.transcriptId !== undefined) {
            a.get_transcript(this.props.params?.transcriptId, (data: Transcript, status: number) => {
                if (status == 200) {
                    this.setState({...this.state, transcriptData: data, chapters: data.chapters ?? []})
                } else {
                    console.log("Something went wrong", status)
                }
            })
            // end: 1528594
            // start: 1527 888
            a.get_sentences(this.props.params?.transcriptId, (data: Utterance[], status: number) => {
                if (status == 200) {
                    this.setState({...this.state, sentences: data})
                    console.log("Sentences", data)
                } else {
                    console.log("Something went wrong", status)
                }
                console.log(this.state)
            })
            
        }
    }

    getChapterCardsFromTranscript(): React.ReactNode {
        return (
            this.state.chapters.map((c, i) => {
                var utterances = this.state.transcriptData?.utterances.filter(u => u.start > c.start ) ?? [];
                return (
                    <div className="col-start-2 col-span-3">
                        {ChapterCard(c.headline, c.gist, c.summary, c.start / 1000, c.end / 1000, () => {
                            const showDialogue = this.state.showDialogue
                            showDialogue[i] = !showDialogue[i]
                            this.setState({showDialogue: showDialogue})
                        })}
                        {this.state.showDialogue[i] ? DialogueView(utterances): null}
                    </div>
                )
            })
        )
    }

    render(): React.ReactNode {
        console.log(this.state)
        const chapters = (
            this.state.chapters.map((c, i) => {
                var utterances = this.state.transcriptData?.utterances.filter(u => u.start > c.start ) ?? [];
                return (
                    <div className="col-start-2 col-span-3">
                        {ChapterCard(c.headline, c.gist, c.summary, c.start / 1000, c.end / 1000, () => {
                            const showDialogue = this.state.showDialogue
                            showDialogue[i] = !showDialogue[i]
                            this.setState({showDialogue: showDialogue})
                        })}
                        {this.state.showDialogue[i] ? DialogueView(utterances): null}
                    </div>
                )
            })
        )
        const audioPlayer = (
            <div className='col-start-2 col-span-3'>
                <AudioPlayer
                    // autoPlay
                    src="https://dcs.megaphone.fm/PNM8180482229.mp3?key=de4e2f2a1b930cdd998e759c768908ee"
                    onPlay={e => console.log("onPlay")}
                    // other props here
                />
            </div>
        )

        const topics = !this.state.transcriptData ? null : TopicsView(this.state.transcriptData)

        const keyQuotes = !this.state.transcriptData ? null : KeyQuotes(GetAutoHighlightQuotes(this.state.transcriptData, this.state.sentences ?? []))

        const chapterList = ChapterList(this.state.chapters)

        return (
            <div>

                <div className="grid grid-cols-5 place-content-center bg-slate-100">
                    {topics}
                    {chapterList}
                    {keyQuotes}
                    {audioPlayer}
                    {chapters}
                </div>
            </div>
        )
    }
}

function KeyQuotes(quotes: AutoHighlightQuote[]): React.ReactNode {
    quotes = quotes.sort((a: AutoHighlightQuote, b: AutoHighlightQuote) => {
        if (a.rank == b.rank) {
            return a.topic > b.topic ? 1: -1
        }
        return a.rank > b.rank ? 1 : -1
    })
    const keyIdeas = GroupBy(quotes, "topic" )
    const topics: React.ReactNode[] = []
    keyIdeas.forEach(
        (quotes: AutoHighlightQuote[], topic: string, _: Map<string, AutoHighlightQuote[]> ) => {topics.push(

        <ul className="py-2">
            {topic}
            {quotes.map(
                q => <li>  -  {q.text}</li>
            )}

        </ul>
    )})
    return (
        <ul className='col-start-2 col-span-3'>
            {topics}
        </ul>
    )
}

export default (props: any) => <TranscriptView {...props} params={useParams()} />;

function GroupBy<T, K extends keyof T>(array: T[], key: K) {
	let map = new Map<T[K], T[]>();
	array.forEach(item => {
		let itemKey = item[key];
		if (!map.has(itemKey)) {
			map.set(itemKey, array.filter(i => i[key] === item[key]));
		}
	});
	return map;
}

