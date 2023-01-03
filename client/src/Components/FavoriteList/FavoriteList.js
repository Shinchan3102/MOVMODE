import React, { useEffect, useState } from 'react'
import { BsHeart } from 'react-icons/bs'
import { GiJusticeStar } from 'react-icons/gi'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { fav_getList, fav_remove } from '../../actions/favorite'
import tmdbConfigs from '../../configs/tmdb'

const FavoriteList = () => {
  const [medias, setMedias] = useState([]);
  const [listMedias, setListMedias] = useState([]);
  const [page, setPage] = useState(1);
  const length = 12;
  const dispatch = useDispatch();

  useEffect(() => {
    const getFavoritesOfUser = async () => {
      const { data } = await dispatch(fav_getList());
      setMedias(data);
      setListMedias(data.slice(0, length));
    }
    getFavoritesOfUser();
    console.log(medias);
  }, []);


  console.log(medias);
  console.log(listMedias);


  const load = () => {
    setListMedias([...listMedias, ...medias.slice(page * length, page * length + length)]);
    setPage(page + 1);
  }
  const del = async (id) => {
    const { data } = await dispatch(fav_remove({ favoriteId: id }));
    if (data) {
      setListMedias(listMedias.filter((media) => media._id !== data._id));
    }
  }

  return (
    <div className='personExtra col-md-10 col-11 mx-auto' style={{ color: 'white', marginTop: '100px' }}>
      {
        medias?.length>0?
        <>
        <h3 className='d-flex align-items-center mt-5'>
        <BsHeart className='me-3' style={{ color: 'rgb(11 96 224)' }} /> Favorite Lists
      </h3>
      <div className='d-flex flex-wrap justify-content-center'>
        {
          listMedias.map((media, index) => {
            return (
              <div className='cardCont horizontalSlides' style={{ backgroundImage: `url(${tmdbConfigs.backdropPath(media.mediaPoster || media.backdrop_path)})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} key={index}>
                <RiDeleteBin5Fill className='dltFIcon' style={{ color: 'rgb(255,0,0)', position: 'absolute', top: '5px', right: '5px', fontSize: '30px', background: 'white', borderRadius: '50%', boxShadow: '1px 1px 3px black', padding: '5px', cursor: 'pointer' }} onClick={() => { del(media._id) }} />
                <NavLink to={`/${media.mediaType}/${media.mediaId}`} className='insideHorizontal d-flex flex-column justify-content-end align-items-start p-2' style={{ color: 'white', textDecoration: 'none' }}>
                  <div className='UpperTransition d-flex align-items-center'>
                    <GiJusticeStar className='me-2' style={{ color: '#f8b803', fontSize: '20px' }} />{media.mediaRate}/10
                  </div>
                  <div style={{ fontSize: '17px', fontWeight: '800' }} className='UpperTransition'>
                    {
                      media.mediaTitle.length > 25 ? media.mediaTitle.substring(0, 22) + '...' : media.mediaTitle
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
      </>
      :
      <div>
        Make a better selection for you
      </div>
        }
    </div>
  )
}

export default FavoriteList
