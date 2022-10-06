export interface ModelOutput {
    status: string
    results: any[]
    summary: any
}
export interface Chapter {
    start: number
    end: number
    gist: string
    summary: string
    headline: string
}

export interface LabelRelevance {
    label: string
    relevance: number
}

export interface TimePeriod {
    start: number
    end: number
}

export interface IabCategoryResult {
    labels: LabelRelevance[]
    text: string
    timestamp: TimePeriod
}

export interface Entity {
    start: number
    end: number
    entity_type: string
    text: string
}

export interface SentimentAnalysis {
    start: number
    end: number
    confidence: number
    sentiment: "POSITIVE" | "NEGATIVE" | "NEUTRAL"
    speaker: string
    text: string
}

export interface UtteredWord {
    start: number
    end: number
    text: string
    confidence: number
    speaker: string | undefined
}

export interface Utterance {
    start: number
    end: number
    confidence: number
    speaker: string | undefined
    text: string
    words: UtteredWord[]
}

export interface AutoHighlightResult {
    count: number
    rank: number
    text: string
    timestamps: TimePeriod[]
}


export interface Transcript {
    acoustic_model: string, 
    audio_duration: number
    audio_end_at: number | undefined
    audio_start_from: number | undefined
    audio_url: string | undefined
    auto_chapters: boolean
    auto_highlights: boolean
    auto_highlights_result: {status: string, results: AutoHighlightResult[]}
    boost_param: any[] | undefined
    chapters: Chapter[] | undefined
    confidence: number
    content_safety: boolean
    content_safety_labels: {status: string, results: any[], summary: any[]}
    custom_spelling: any | undefined
    disfluencies: boolean
    dual_channel: any | undefined
    entities: Entity[] | undefined
    entity_detection: boolean
    filter_profanity: boolean
    format_text: boolean
    iab_categories: boolean
    iab_categories_result: {status: string, results: IabCategoryResult[], summary: any}
    id: string
    language_code: string
    language_detection: boolean
    language_model: string
    punctuate: boolean
    redact_pii: boolean
    redact_pii_audio: boolean
    redact_pii_audio_quality: null
    redact_pii_policies: null
    redact_pii_sub: null
    sentiment_analysis: boolean
    sentiment_analysis_results: SentimentAnalysis[] | undefined
    speaker_labels: boolean
    speed_boost: boolean
    status: string
    text: string
    utterances: Utterance[]
    webhook_auth: boolean
    webhook_auth_header_name: any | undefined
    webhook_status_code: any | undefined
    webhook_url: any | undefined
    word_boost: any[]
    words: UtteredWord[]
}

export interface AutoHighlightQuote{
    text: string,
    speaker: string,
    topic: string,
    rank: number
}


export function GetAutoHighlightQuotes(transcript: Transcript, sentences: Utterance[]): AutoHighlightQuote[] {
    /**
     * Get quotes based off the highlights
     */
    console.log("GetAutoHighlightQuotes")
    if (!transcript.auto_highlights || transcript.auto_highlights_result.status != "success") {
        return []
    }
    return transcript.auto_highlights_result.results.flatMap(it => {
        return it.timestamps.map(t => {
            const words = sentences.filter(s => s.start <= t.start && s.end >= t.end)
            const sentence = words.length > 0 ? words[0].text : ""
            console.log(it.text, sentence)
            return {
                text: sentence,
                speaker: words.find((v: Utterance) => v.speaker !== null)?.speaker ?? "", // [0].speaker!!,
                topic: it.text,
                rank: it.rank
            }            
        })
    })
}