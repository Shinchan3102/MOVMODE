const baseUrl=process.env.TMDB_URL;
const key=process.env.TMDB_KEY;

const getUrl=(endpoint, params)=>{
    const query=new URLSearchParams(params);
    return `${baseUrl}${endpoint}?api_key=${key}&${query}`;
};
module.exports={getUrl};