import axios, { AxiosResponse } from 'axios';
import { Transcript } from "./model";

const ls = require('localstorage-ttl');

export default class AssemblyAiClient {
    private key: string;

    constructor(key: string) {
        this.key = key
    }

    async get_transcript(id: string, callback: (data: Transcript, status: number) => void ) {
        const data = ls.get(id)
        if (data != undefined) {
            callback(data, 200)
            return 
        } 

        axios.get('https://api.assemblyai.com/v2/transcript/' + id, {
            headers: {authorization: this.key}
          }).then((v: AxiosResponse) => {
            const {data, status} = v
            ls.set(id, data, [20 * 1000]);
            callback(data, status)
          })
    }
}