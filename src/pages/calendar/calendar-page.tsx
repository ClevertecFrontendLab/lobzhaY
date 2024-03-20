import { useLayoutEffect, useState } from 'react';

import { Layout, Modal } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';

import { useAppDispatch } from '../../hooks';
import { useLazyGetTrainingListQuery } from '../../redux/catalogs-api';
import { addTrainingListData } from '../../redux/slices/exercise-slice';

import { BreadcrumbComponent, CalendarComponent, SettingsButtonComponent } from '../../components';

import {
    errorTrainingListModalText,
    errorTrainingModalTitle,
} from '../../constants/calendar/calendar-text';
import { calendarTestId } from '../../constants/data-test/data-test-id';

import './calendar-page.scss';

const CalendarPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [trigger] = useLazyGetTrainingListQuery({});

    const getDataTrainingList = async () => {
        try {
            const data = await trigger({}).unwrap();
            dispatch(addTrainingListData({ trainingList: data }));
        } catch (error) {
            setIsModalVisible(true);
        }
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
    };

    useLayoutEffect(() => {
        getDataTrainingList();
    }, []);

    return (
        <Layout className='main-container'>
            <BreadcrumbComponent />
            <div className='settings-button-wrapper'>
                <SettingsButtonComponent />
            </div>
            <Content className='calendar-content-container'>
                <CalendarComponent />
            </Content>
            <Modal
                className='custom-modal'
                visible={isModalVisible}
                onCancel={handleModalClose}
                onOk={getDataTrainingList}
                centered
                okText='Обновить'
                closable
                closeIcon={
                    <CloseOutlined
                        data-test-id={calendarTestId.modalErrorUserTraining.buttonClose}
                    />
                }
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ 'data-test-id': calendarTestId.modalErrorUserTraining.button }}
                wrapClassName='confirm-modal'
                maskClosable
            >
                <>
                    <CloseCircleOutlined />
                    <div className='error-body-wrapper'>
                        <h6 data-test-id={calendarTestId.modalErrorUserTraining.title}>
                            {errorTrainingModalTitle}
                        </h6>
                        <p data-test-id={calendarTestId.modalErrorUserTraining.subtitle}>
                            {errorTrainingListModalText}
                        </p>
                    </div>
                </>
            </Modal>
        </Layout>
    );
};

export default CalendarPage;
