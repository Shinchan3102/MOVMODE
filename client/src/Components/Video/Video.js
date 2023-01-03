import React from 'react'
import tmdbConfigs from '../../configs/tmdb';
import './Video.css';
import { MdVideoLibrary } from 'react-icons/md';
import { TfiVideoClapper } from 'react-icons/tfi';

const Video = ({ videos, backdrops }) => {
    console.log(videos);
    return (
        <>
            <div className='my-5 col-md-10 col-11 mx-auto'>
                <h3 className='d-flex align-items-center mb-3'>
                    <MdVideoLibrary className='me-3' style={{ color: 'rgb(11 96 224)' }} />VIDEOS
                </h3>
                <div className="slider-container">
                    <div className="slider_">
                        <div className="slides_">
                            {
                                videos.map((video, index) => {
                                    return (
                                        <div id={`slides__${index}`} className="slide_" key={index}>
                                            <iframe key={video.key} src={tmdbConfigs.youtubePath(video.key)} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className='my-5 col-md-10 col-11 mx-auto'>
                <h3 className='d-flex align-items-center mb-3' >
                    <TfiVideoClapper className='me-3' style={{ color: 'rgb(11 96 224)' }} />GLIMPSES
                </h3>
                <div className="slider-container">
                    <div className="slider_">
                        <div className="slides_">
                            {
                                backdrops.map((image, index) => {
                                    return (
                                        <div id={`slides__${index}`} className="slide_ mx-2" key={index} style={{background:`url(${tmdbConfigs.backdropPath(image.file_path)})`,backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center'}}>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Video
