import React from 'react';
import { Params, useParams } from "react-router-dom";
// import AudioPlayer from './audio_player';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import AssemblyAiClient from './transcript_api'
import { Chapter, Transcript } from './model';
import ChapterCard from './ChapterCard';

interface TranscriptProps {
    params: Readonly<Params<string>> | undefined
}
  
interface TranscriptState {
    transcriptData: any
    chapters: Chapter[]
}
const a = new AssemblyAiClient("")

class TranscriptView extends React.Component<TranscriptProps, TranscriptState> {
    constructor(props: TranscriptProps) {
        super(props)
        this.state = {transcriptData: {}, chapters: []}
    }

    componentDidMount() {
        if (this.props.params?.transcriptId !== undefined) {
            a.get_transcript(this.props.params?.transcriptId, (data: Transcript, status: number) => {
                if (status == 200) {
                    this.setState({transcriptData: data, chapters: data.chapters ?? []})
                } else {
                    console.log("SOmething went wrong", status)
                }
                console.log(data)
            })
        }
    }

    render(): React.ReactNode {
        console.log(this.state)
        return (
            <div>
                <p>Hello world. Here is your id: {this.props.params?.transcriptId ?? "No ID"}</p>
                <div className="grid grid-cols-1">
                    {this.state.chapters.map(c => ChapterCard(c.headline, c.gist, c.summary, c.start / 1000, c.end / 1000) )}
                </div>
                <div className='w-1/2'>
                    <AudioPlayer
                        // autoPlay
                        src="https://dcs.megaphone.fm/PNM8180482229.mp3?key=de4e2f2a1b930cdd998e759c768908ee"
                        onPlay={e => console.log("onPlay")}
                        // other props here
                    />
                </div>
            </div>
        )
    }
}

export default (props: any) => <TranscriptView {...props} params={useParams()} />;
