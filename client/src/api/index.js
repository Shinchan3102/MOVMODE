import axios from 'axios';

const API=axios.create({baseURL:'https://movmode.vercel.app/api'});

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.authorization= `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

// user

export const signUp=(user)=>API.post('/users/signup',user);
export const signIn=(user)=>API.post('/users/signin',user);
export const getInfo=()=>API.get('/users/info');

// review

export const review_add=(data)=>API.post('/review/',data);
export const review_remove=(reviewId)=>API.delete(`/review/${reviewId}`);
export const review_getList=()=>API.get('/review/');

// person

export const person_getDetail=(personId)=>API.get(`/person/${personId}`);
export const person_getMedias=(personId)=>API.get(`/person/${personId}/medias`);

// favorite 

export const fav_add=(data)=>API.post('/favorite/favorites',data);
export const fav_remove=(favoriteId)=>API.delete(`/favorite/favorites/${favoriteId}`);
export const fav_getList=()=>API.get('/favorite/favorites');

// media 

export const genre_getList=(mediaType)=>API.get(`/media/${mediaType}/genres`);
export const media_getList=({ mediaType, mediaCategory, page })=>API.get(`/media/${mediaType}/${mediaCategory}?page=${page}`);
export const media_getDetail=({ mediaType, mediaId })=>API.get(`/media/${mediaType}/detail/${mediaId}`);
export const media_search=({ mediaType, query, page })=>API.get(`/media/${mediaType}/search?query=${query}&page=${page}`);