import * as api from '../api';

export const review_add = (query) => async (dispatch) => {
    try {
        dispatch({type:'START_LOADING'});
        const {data} = await api.review_add(query);
       
        dispatch({type:'END_LOADING'});
        return data._doc;

    } catch (err) {
        console.log('review add' + err);
    }
}

export const review_remove = ({ reviewId }) => async (dispatch) => {
    try {
        dispatch({type:'START_LOADING'});
       
        const { data } = await api.review_remove(reviewId);
        
        dispatch({type:'END_LOADING'});
        return data;
    } catch (err) {
        console.log('review remove' + err);
    }
}

export const review_getList = () => async (dispatch) => {
    try {
        dispatch({type:'START_LOADING'});
        const { data } = await api.review_getList();
        dispatch({ type: 'AUTH', data });
        dispatch({type:'END_LOADING'});
    } catch (err) {
        console.log('review getlist' + err);
    }
}