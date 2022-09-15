import axios from 'axios';

const concertsURL = '/api/v1/concerts';

const getConcerts = async () => {
    const req = axios({method: "GET", url: concertsURL});
    const res = await req;
    return res.data;
}

export {getConcerts}