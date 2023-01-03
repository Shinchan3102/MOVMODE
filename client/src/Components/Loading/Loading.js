import React from 'react';
import './Loading.css';

const Loading = () => {
    return (
        <div className='loadingCont'>
            <div class="wrapper">
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="shadow"></div>
                <div class="shadow"></div>
                <div class="shadow"></div>
            </div>
        </div>
    )
}

export default Loading
