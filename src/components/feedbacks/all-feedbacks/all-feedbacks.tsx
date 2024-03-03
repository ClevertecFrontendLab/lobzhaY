import { Button, List } from 'antd';
import { FeedbackType } from '../../../constants/api/api-types';
import { useState } from 'react';
import { UserFeedbackComponent } from '..';
import { reviewsTestId } from '../../../constants/data-test/data-test-id';
import { ModalWindowTypes } from '../../../constants/feedbacks-page/feedbacks-page';

type AllFeedbacksType = {
    feedbacks: FeedbackType[];
    showModal: (types: ModalWindowTypes) => void
};
export const AllFeedbacksComponent: React.FC<AllFeedbacksType> = ({ feedbacks, showModal }) => {
    const [showAllFeedbacks, setShowAllFeedbacks] = useState(false);
    const displayedFeedbacks = showAllFeedbacks ? feedbacks : feedbacks.slice(0, 4);

    const showForm = () => {
        showModal(ModalWindowTypes.Feedback);
    };

    return (
        <section>
            <div>
                <List
                    dataSource={displayedFeedbacks}
                    renderItem={(item: FeedbackType) => (
                        <List.Item key={item.id}>
                            <UserFeedbackComponent userFeedback={item} />
                        </List.Item>
                    )}
                />
            </div>
            <div className='buttons'>
                <Button type='primary' data-test-id={reviewsTestId.reviewsPage.writeReview} onClick={showForm}>Написать отзыв</Button>
                {!showAllFeedbacks /* && feedbacks.length > 4 */ ? (
                    <Button type='text' onClick={() => setShowAllFeedbacks(true)} data-test-id={reviewsTestId.reviewsPage.allReviewsButton}>
                        Развернуть все отзывы
                    </Button>
                ) : (
                  <Button type='text' onClick={() => setShowAllFeedbacks(false)}>
                        Свернуть все отзывы
                    </Button>
                )}
            </div>
        </section>
    );
};
