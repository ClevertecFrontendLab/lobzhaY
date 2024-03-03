import { Button } from 'antd';

import { ModalWindowTypes, feedBacksEmpty } from '../../../constants/feedbacks-page/feedbacks-page';

import './feedbacks-empty.scss';
import { reviewsTestId } from '../../../constants/data-test/data-test-id';

export const FeedBacksEmptyComponent: React.FC<{showModal: (types: ModalWindowTypes) => void}> = ({showModal}) => {
    const openModal = () => {
        showModal(ModalWindowTypes.Feedback)
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
