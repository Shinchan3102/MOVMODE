import * as api from '../api';

export const fav_add = (query) => async (dispatch) => {
    try {
        dispatch({type:'START_LOADING'});
        const { data } = await api.fav_add(query);
       
        dispatch({ type: 'FAV_ADD', data:data.data });
        dispatch({type:'END_LOADING'});

    } catch (err) {
        console.log('fav_add' + err);
    }
}

export const fav_remove = ({ favoriteId }) => async (dispatch) => {
    try {
        dispatch({type:'START_LOADING'});
        const { data } = await api.fav_remove(favoriteId);
        
        dispatch({ type: 'FAV_REMOVE', data:data.data });
        dispatch({type:'END_LOADING'});
        return data;
    } catch (err) {
        console.log('fav remove' + err);
    }
}

export const fav_getList = () => async (dispatch) => {
    try {
        const { data } = await api.fav_getList();
        
        dispatch({ type: 'FAV_SETLIST', data:data.data });
        dispatch({type:'END_LOADING'});
        return data;
    } catch (err) {
        console.log('fav_setlist' + err);
    }
}