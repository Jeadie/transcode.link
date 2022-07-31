import axios, { AxiosResponse } from 'axios';
import { Transcript, Utterance } from "./model";

const ls = require('localstorage-ttl');

export default class AssemblyAiClient {
    private key: string;

    constructor(key: string) {
        this.key = key
    }

    async get_transcript(id: string, callback: (data: Transcript, status: number) => void ) {
        const data = ls.get(id + "transcript")
        if (data != undefined) {
            callback(data, 200)
            return 
        } 

        axios.get('https://api.assemblyai.com/v2/transcript/' + id, {
            headers: {authorization: this.key}
          }).then((v: AxiosResponse) => {
            const {data, status} = v
            ls.set(id + "transcript", data, [200 * 1000]);
            callback(data, status)
          })
    }

    async get_sentences(id: string, callback: (data: Utterance[], status: number) => void ) {
        const data = ls.get(id + "/sentences")
        if (data != undefined) {
            callback(data, 200)
            return 
        } 

        axios.get('https://api.assemblyai.com/v2/' + id + "/sentences", {
            headers: {authorization: this.key}
          }).then((v: AxiosResponse) => {
            const {data, status} = v
            ls.set(id + "/sentences", data, [200 * 1000]);
            callback(data, status)
          })
    }
}