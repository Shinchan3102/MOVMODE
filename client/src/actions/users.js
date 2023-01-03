import * as api from '../api';
import { fav_getList } from './favorite';

export const signIn=(user,navigate)=>async(dispatch)=>{
    try{
        dispatch({type:'START_LOADING'});
        const {data}=await api.signIn(user);
       
        dispatch({type:'REM_REG'});
        dispatch({type:'AUTH',data});
        dispatch(fav_getList());
        navigate('/');
        dispatch({type:'END_LOADING'});
    }catch(err){
        navigate('/contacts');
        alert('wrong credentials');
        console.log('user signin'+err.message);
    }
}

export const signUp=(user,navigate)=>async(dispatch)=>{
    try{
        dispatch({type:'START_LOADING'});
        const {data}=await api.signUp(user);
       
        dispatch({type:'REM_REG'});
        dispatch({type:'AUTH',data});
        navigate('/');
        dispatch({type:'END_LOADING'});
    }catch(err){
        
        console.log('user signup'+err);
    }
}

export const getInfo=()=>async(dispatch)=>{
    try{
        dispatch({type:'START_LOADING'});
        const {data}=await api.getInfo();
        dispatch({type:'AUTH',data});
        dispatch({type:'END_LOADING'});
    }catch(err){
        console.log('user info'+err);
    }
}