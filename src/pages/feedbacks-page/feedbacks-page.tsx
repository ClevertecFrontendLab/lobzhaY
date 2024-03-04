import { Layout } from 'antd';
import './feedbacks-page.scss';
import { Content } from 'antd/es/layout/layout';
import {
    FeedBacksEmptyComponent,
    BreadcrumbComponent,
    ModalWindowComponent,
    AllFeedbacksComponent,
} from '../../components';
import { useEffect, useState } from 'react';
import { ModalWindowTypes } from '../../constants/feedbacks-page/feedbacks-page';
import { FeedbackType } from '../../constants/api/api-types';
import { history, useLazyGetFeedbacksQuery } from '../../redux';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { hideLoader, showLoader } from '../../redux/actions/loading-action';
import { addModal } from '../../redux/slices/modal-slice';

type QueryResult = {
    data?: FeedbackType[];
    error?: { status: number };
};

const FeedbacksPage: React.FC = () => {
    const [getFeedbacks, {data: allFeedbacks}] = useLazyGetFeedbacksQuery();
    const [feedbacks, setFeedbacks] = useState<FeedbackType[]>();

    const dispatch = useAppDispatch();

    const handleError = (data: QueryResult) => {
            if (data.error && data.error.status === 403) {
            localStorage.removeItem('token');
            history.replace('/auth');
        } else if (data.error) {
            dispatch(addModal({type: ModalWindowTypes.Server}));
        }

    };

    useEffect(() => {
        const fetchData = async () => {
            dispatch(showLoader());
           
            await getFeedbacks({})
                .then((data) => handleError(data as QueryResult))
                .finally(() => dispatch(hideLoader()));
        };

        
        fetchData();
        
    }, [getFeedbacks]);

     useEffect(() => {
        if (allFeedbacks) {
            setFeedbacks(allFeedbacks);
        }
    }, [allFeedbacks]);

    return (
        <Layout className='main-container'>
            <BreadcrumbComponent />
            <ModalWindowComponent />

            <Content className='feedback-content-container'>
                {feedbacks ? (
                    feedbacks.length > 0 ? (
                    <AllFeedbacksComponent feedbacks={feedbacks} />) : (<FeedBacksEmptyComponent />)
                ) : (
                    null
                )}
            </Content>
        </Layout>
    );
};

export default FeedbacksPage;
