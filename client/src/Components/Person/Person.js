import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { person_getDetail, person_getMedias } from '../../actions/person';
import tmdbConfigs from '../../configs/tmdb';
import Navbar from '../Navbar/Navbar'
import './Person.css';
import { RiCake2Fill, RiMovie2Line } from 'react-icons/ri';
import { GiJusticeStar } from 'react-icons/gi';
import { BsCalendarFill } from 'react-icons/bs';


const Person = () => {
  const { id } = useParams();
  const [medias, setMedias] = useState([]);
  const [listMedias, setListMedias] = useState([]);
  const [detail, setDetail] = useState([]);
  const [page, setPage] = useState(1);
  const length = 12;
  const dispatch = useDispatch();
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const getReleaseDate = (media) => {
    const date = media.media_type === tmdbConfigs.mediaType.movie ? new Date(media.release_date) : new Date(media.first_air_date);
    return date.getTime();
  }

  useEffect(() => {
    const getMedia = async () => {
      const { data } = await dispatch(person_getMedias({ personId: id }));
      // console.log(data);
      setMedias(data.cast.sort((a, b) => getReleaseDate(b) - getReleaseDate(a)));
      // console.log(medias);
      setListMedias(data.cast.sort((a, b) => getReleaseDate(b) - getReleaseDate(a)).slice(0, length));
    }
    getMedia();
    // console.log(medias);
    // console.log(listMedias);
    const getPersonDetail = async () => {
      const { data } = await dispatch(person_getDetail({ personId: id }));
      setDetail(data);
    }
    getPersonDetail();
  }, [id]);


  console.log(detail);
  console.log(medias);
  console.log(listMedias);


  const load = () => {
    setListMedias([...listMedias, ...medias.slice(page * length, page * length + length)]);
    setPage(page + 1);
  }

  // console.log(listMedias);

  return (
    <>
      <div className='col-md-10 col-11 mx-auto'>
        <div className='personDetail'>
          <img src={tmdbConfigs.posterPath(detail.profile_path)} alt='' />
          <div className='detailSummary'>
            <h3>
              {detail.name}
            </h3>
            <h4 className='d-flex align-items-center my-4'>
              <RiCake2Fill className='me-2' />{detail?.birthday?.split('-')[2] + ' ' + month[Number(detail?.birthday?.split('-')[1]) - 1] + ' ' + detail?.birthday?.split('-')[0]}
            </h4>
            <div>
              {detail.biography}
            </div>
          </div>
        </div>
        <div className='personExtra' style={{ color: 'white' }}>
          <h3 className='d-flex align-items-center'>
            <RiMovie2Line className='me-3' style={{ color: 'rgb(11 96 224)' }} /> Related Lists
          </h3>
          <div className='d-flex flex-wrap justify-content-center'>
            {
              listMedias.map((media, index) => {
                return (
                  <div className='cardCont horizontalSlides' style={{ backgroundImage: `url(${tmdbConfigs.backdropPath(media.poster_path || media.backdrop_path)})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} key={index}>
                    <NavLink to={`/${media.media_type}/${media.id}`} className='insideHorizontal d-flex flex-column justify-content-end align-items-start p-2' style={{ color: 'white', textDecoration: 'none' }}>
                      <div className='UpperTransition d-flex align-items-center'>
                        <GiJusticeStar className='me-2' style={{ color: '#f8b803', fontSize: '20px' }} />{media.vote_average}/10
                      </div>
                      <div className='UpperTransition'>
                        <BsCalendarFill className='me-2' style={{ color: 'rgb(51 205 247)' }} />{media.release_date?.split('-')[0] || media.first_air_date?.split('/')[0]}
                      </div>
                      <div style={{ fontSize: '17px', fontWeight: '800' }} className='UpperTransition'>
                        {
                          media.title ? (media.title.length > 25 ? media.title.substring(0, 22) + '...' : media.title)
                            : (media.name.length > 25 ? media.name.substring(0, 22) + '...' : media.name)
                        }
                      </div>
                    </NavLink>
                  </div>
                )
              })
            }
          </div>
          <div className='col-md-10 col-11 mx-auto text-center'>
            <button className={`btn Danger mt-3 mx-auto ${medias.slice(page * length, page * length + length).length > 0 ? '' : 'disabled'}`} onClick={load}>Load More</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Person
