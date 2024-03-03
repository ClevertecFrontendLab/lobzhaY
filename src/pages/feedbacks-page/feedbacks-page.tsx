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
import { useAppDispatch } from '../../hooks';
import { hideLoader, showLoader } from '../../redux/actions/loading-action';

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
            showModal(ModalWindowTypes.Server);
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

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [typeModal, setTypeModal] = useState<ModalWindowTypes>(ModalWindowTypes.Success);

    const showModal = (type: ModalWindowTypes) => {
        setIsModalOpen(true);
        setTypeModal(type);
    };

    return (
        <Layout className='main-container'>
            <BreadcrumbComponent />
            <ModalWindowComponent
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                typeModal={typeModal as ModalWindowTypes}
                showModal={showModal}
            />

            <Content className='feedback-content-container'>
                {feedbacks ? (
                    feedbacks.length > 0 ? (
                    <AllFeedbacksComponent feedbacks={feedbacks} showModal={showModal} />) : (<FeedBacksEmptyComponent showModal={showModal} />)
                ) : (
                    null
                )}
            </Content>
        </Layout>
    );
};

export default FeedbacksPage;
