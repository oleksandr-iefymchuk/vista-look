import './Reviews.scss';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import { Rating } from '@mui/material';
import { formatDate } from '../../../../../../../helpers';
import { delReviewThunk } from '../../../../../../../store/reviews/thunk';

import ButtonWrapper from '../../../../../../common/Button/Button';
import ConfirmDialog from '../../../../../../common/ConfirmDialog/ConfirmDialog';
import ReviewFormModal from '../ReviewFormModal/ReviewFormModal';

const Reviews = ({ productId }) => {
  const dispatch = useDispatch();
  const isMobileDevice = useMediaQuery({ maxWidth: 768 });
  const [openModalForm, setOpenModalForm] = useState(false);
  const [parentCommentId, setParentCommentId] = useState(null);
  const [replyToUser, setReplyToUser] = useState(null);
  const [openRepliesIds, setOpenRepliesIds] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentReviewId, setCurrentReviewId] = useState(null);

  const { isAdmin } = useSelector(store => store.user);
  const reviews = useSelector(store => store.reviews);
  const productReviews = reviews.filter(
    review => review.productId === productId
  );
  productReviews.sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleOpenDialog = reviewId => {
    setCurrentReviewId(reviewId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => setOpenDialog(false);

  const handleDeleteКReview = async () => {
    dispatch(delReviewThunk(currentReviewId));
    handleCloseDialog();
  };

  const handleOpenModalForm = (userName, parentCommentId) => {
    setOpenModalForm(true);
    setReplyToUser(userName);
    setParentCommentId(parentCommentId);
  };

  const handleCloseModalForm = () => {
    setOpenModalForm(false);
    setReplyToUser(null);
    setParentCommentId(null);
  };

  const toggleReplies = reviewId => {
    if (openRepliesIds.includes(reviewId)) {
      setOpenRepliesIds(openRepliesIds.filter(id => id !== reviewId));
    } else {
      setOpenRepliesIds([...openRepliesIds, reviewId]);
    }
  };

  return (
    <div className='reviews-wrapper'>
      <div className='block-add-review'>
        {!isMobileDevice && <p>Залиште свій відгук на цей товар</p>}
        <ButtonWrapper
          buttonClassName='add-review-btn'
          onClick={handleOpenModalForm}
          buttonText='Написати відгук'
        />
      </div>
      {productReviews.map(
        ({ _id, userName, rating, comment, date, replies }, index) => (
          <div className='item-review' key={index}>
            <div className='review-header'>
              <h4>{userName}</h4>
              <p className='review-date'>{formatDate(date)}</p>
              <Rating className='review-rating' value={rating} readOnly />
              {isAdmin && (
                <ButtonWrapper
                  buttonClassName='review-del-btn'
                  icon='delete'
                  onClick={() => handleOpenDialog(_id)}
                />
              )}
            </div>
            <p>{comment}</p>

            <div className='reply-section'>
              <ButtonWrapper
                buttonClassName='reply-btn'
                onClick={() => handleOpenModalForm(userName, _id)}
                buttonText='Відповісти'
                icon='arrow-return'
              />
              {replies.length > 0 && (
                <ButtonWrapper
                  buttonClassName='open-replies-btn'
                  onClick={() => toggleReplies(_id)}
                  buttonText={
                    openRepliesIds.includes(_id)
                      ? 'Приховати відповіді'
                      : 'Читати всі відповіді'
                  }
                />
              )}

              {openRepliesIds.includes(_id) && (
                <div className='replies-list'>
                  {replies
                    .slice()
                    .reverse()
                    .map((reply, replyIndex) => (
                      <div className='item-review' key={replyIndex}>
                        <div className='review-header'>
                          <h4>{reply.userName}</h4>
                          <p className='review-date'>
                            {formatDate(reply.date)}
                          </p>
                        </div>
                        <p>{reply.comment}</p>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        )
      )}
      <ReviewFormModal
        _id={productId}
        openModalForm={openModalForm}
        closeModalForm={handleCloseModalForm}
        replyToUser={replyToUser}
        parentCommentId={parentCommentId}
      />

      <ConfirmDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleDeleteКReview}
        title='Підтвердження видалення відгуку'
        content='Ви дійсно бажаєте видалити цей відгук?'
      />
    </div>
  );
};

Reviews.propTypes = {
  productId: PropTypes.string,
  reviews: PropTypes.array
};

export default Reviews;
