import React from 'react';
import { Params, useParams } from "react-router-dom";
// import AudioPlayer from './audio_player';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import AssemblyAiClient from './transcript_api'

interface TranscriptProps {
    params: Readonly<Params<string>> | undefined
}
  
interface TranscriptState {
    transcriptData: any
}
const a = new AssemblyAiClient("")

class Transcript extends React.Component<TranscriptProps, TranscriptState> {
    constructor(props: TranscriptProps) {
        super(props)
    }

    componentDidMount() {
        if (this.props.params?.transcriptId !== undefined) {
            a.get_transcript(this.props.params?.transcriptId, (data: any, status: number) => {
                if (status == 200) {
                    this.setState({transcriptData: data})
                } else {
                    console.log("SOmething went wrong", status)
                }
                console.log(data)
            })
        }
    }

    render(): React.ReactNode {
        return (
            <div>
                <p>Hello world. Here is your id: {this.props.params?.transcriptId ?? "No ID"}</p>
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

export default (props: any) => <Transcript {...props} params={useParams()} />;
