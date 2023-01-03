import * as api from '../api';

export const person_getDetail = ({personId}) => async (dispatch) => {
    try {
        dispatch({type:'START_LOADING'});
        const { data } = await api.person_getDetail(personId);
        console.log(data);
        dispatch({type:'END_LOADING'});
        return data;
       

    } catch (err) {
        console.log('person detail' + err);
    }
}

export const person_getMedias = ({ personId }) => async (dispatch) => {
    try {
        dispatch({type:'START_LOADING'});
        const { data } = await api.person_getMedias(personId);
        console.log(data);
        dispatch({type:'END_LOADING'});
        return data;
      
    } catch (err) {
        console.log('person getmedia' + err);
    }
}