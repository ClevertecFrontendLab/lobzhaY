import { Button } from 'antd';

import { ModalWindowTypes, feedBacksEmpty } from '../../../constants/feedbacks-page/feedbacks-page';

import './feedbacks-empty.scss';
import { reviewsTestId } from '../../../constants/data-test/data-test-id';
import { useAppDispatch } from '../../../hooks';
import { addModal } from '../../../redux/slices/modal-slice';

export const FeedBacksEmptyComponent: React.FC = () => {
    const dispatch = useAppDispatch();
    const openModal = () => {
        dispatch(addModal({type: ModalWindowTypes.Feedback}));
    }
    return (
        <div className='center-wrapper'>
            <section className='feedbacks-empty-wrapper'>
                <div className='empty-container'>
                    <div className='empty-body'>
                        <h3>{feedBacksEmpty.title}</h3>
                        <div className='text-wrapper'>
                            <p>{feedBacksEmpty.text}</p>
                        </div>
                    </div>
                </div>
                <Button type='primary' onClick={openModal} data-test-id={reviewsTestId.noReviews}>{feedBacksEmpty.button}</Button>
            </section>
        </div>
    );
};
