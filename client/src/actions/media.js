import * as api from '../api';

export const genre_getList = ({mediaType}) => async (dispatch) => {
    try {
        dispatch({type:'START_LOADING'});
        const {data} = await api.genre_getList(mediaType);
        
        dispatch({type:'END_LOADING'});
        return data;

    } catch (err) {
        console.log('genre getlist' + err);
    }
}

export const media_getList = ({ mediaType, mediaCategory, page }) => async (dispatch) => {
    try {
        dispatch({type:'START_LOADING'});
        const {data} = await api.media_getList({ mediaType, mediaCategory, page });
        dispatch({type:'END_LOADING'});
        return data;

    } catch (err) {
        console.log('media getlist' + err);
    }
}

export const media_getDetail = ({ mediaType, mediaId }) => async (dispatch) => {
    try {
        dispatch({type:'START_LOADING'});
        const {data} = await api.media_getDetail({ mediaType, mediaId });
        
        dispatch({type:'END_LOADING'});
        return data;
    } catch (err) {
        console.log('media getdetail' + err);
    }
}

export const media_search=({ mediaType, query, page })=>async (dispatch)=>{
    try{
        const {data}=await api.media_search({ mediaType, query, page });
      
        return data;
    }catch(err){
        console.log('media_search '+err);
    }
}