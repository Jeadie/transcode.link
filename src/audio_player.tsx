import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';


export default function Player() {
    return (
        <div className='w-1/2'>
        <AudioPlayer
            // autoPlay
            src="https://dcs.megaphone.fm/PNM8180482229.mp3?key=de4e2f2a1b930cdd998e759c768908ee"
            onPlay={e => console.log("onPlay")}
            // other props here
        />
        </div>
    )
}