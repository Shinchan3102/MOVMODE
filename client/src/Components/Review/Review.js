import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { review_add, review_remove } from '../../actions/review';
import { FaListAlt } from 'react-icons/fa';
import './Review.css';
import { TiDelete } from 'react-icons/ti';

const Review = ({ reviews, media, mediaType }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    // console.log(user.token)
    const [listReviews, setListReviews] = useState([]);
    const [page, setPage] = useState(0);
    const length = 4;
    const [reviewCount, setReviewCount] = useState(0);
    const [content, setContent] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        setListReviews(reviews);
        setReviewCount(reviews.length);
    }, [reviews]);

    const add = async () => {
        // console.log(content);
        const res = await dispatch(review_add({
            content,
            mediaId: media.id,
            mediaType,
            mediaTitle: media.title || media.name,
        }));
        // console.log(res);
        if (res) {
            setListReviews([res, ...listReviews]);
        }
        setContent("");
        setReviewCount(reviewCount + 1);
    }

    const loadMore = () => {
        setListReviews([...listReviews, ...[...reviews].slice(page * length, page * length + length)]);
        setPage(page + length);
    }

    const del = async (id) => {
        // console.log(id);
        const { data } = await dispatch(review_remove({ reviewId: id }));
        if (data) {
            setListReviews(listReviews.filter((review) => review._id !== data._id));
        }
    }
    console.log(listReviews);
    return (
        <div className='col-md-10 col-11 mx-auto my-5'>
            <h3 style={{ color: 'white' }}>
                <FaListAlt className='me-3' style={{ color: 'rgb(11 96 224)' }} /> REVIEWS {
                    `(${reviewCount})`
                }
            </h3>
            {
                user?.token &&
                (
                    <div>
                        <div>
                            <textarea className='textArea' placeholder='Leave Your Comment here...' value={content} onChange={(e) => { setContent(e.target.value) }} />
                        </div>
                        <button className='btn Danger' onClick={add}>Comment</button>
                    </div>
                )}

            <hr />
            {
                listReviews.slice(page, page + length).map((review, index) => {
                    return (
                        <div key={index} className='reviewSubCont'>
                            <div className='d-flex justify-content-between'>
                                <div style={{fontSize:'20px', color:'rgb(11 96 224)' }}>{review.user.displayName || user?.userProfile?.displayName}</div>
                                {
                                    (user?.userProfile.displayName === review.user.displayName || user?.userProfile._id===review.user) &&
                                    <TiDelete className='dltIcon' onClick={() => { del(review._id) }} />
                                }
                            </div>
                            <div className='ps-2' style={{fontSize:'15px'}}>
                                {review.content}
                            </div>
                        </div>
                    )
                })
            }
            <button className={`btn Danger ${listReviews.slice(page + length, page + 2 * length).length === 0 ? 'disabled' : ''} my-2`} onClick={loadMore}>Load More</button>
        </div>
    )
}

export default Review
