import { useCallback, useLayoutEffect, useState } from 'react';

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

/* const CalendarPage: React.FC = () => {
    const dispatch = useAppDispatch();

    const [trigger] = useLazyGetTrainingListQuery({});

    const { confirm } = Modal;

    const getDataTrainingList = useCallback(async () => {
        await trigger({})
            .unwrap()
            .then((data) => {
                dispatch(addTrainingListData({ trainingList: data }));
            })
            .catch(() => {
                Modal.destroyAll();
                showDeleteConfirm();
            });
    }, [dispatch, trigger]);

    const showDeleteConfirm = useCallback(() => {
        const modal = confirm({
            title: (
                <h6 data-test-id={calendarTestId.modalErrorUserTraining.title}>
                    {errorTrainingModalTitle}
                </h6>
            ),
            centered: true,
            icon: <CloseCircleOutlined />,
            content: (
                <p data-test-id={calendarTestId.modalErrorUserTraining.subtitle}>
                    {errorTrainingListModalText}
                </p>
            ),
            okText: 'Обновить',
            closable: true,
            closeIcon: (
                <CloseOutlined data-test-id={calendarTestId.modalErrorUserTraining.buttonClose} />
            ),
            cancelButtonProps: { style: { display: 'none' } },
            okButtonProps: { 'data-test-id': calendarTestId.modalErrorUserTraining.button },
            wrapClassName: 'confirm-modal',
            maskClosable: true,
            onOk() {
                modal.destroy();
                Modal.destroyAll();
                getDataTrainingList();
            },
            onCancel() {
                modal.destroy();
                Modal.destroyAll();
            },
        });
    }, [confirm, getDataTrainingList]);

    useLayoutEffect(() => {
        getDataTrainingList();
    }, [getDataTrainingList]);

    return (
        <Layout className='main-container'>
            <BreadcrumbComponent />
            <div className='settings-button-wrapper'>
                <SettingsButtonComponent />
            </div>
            <Content className='calendar-content-container'>
                <CalendarComponent />
            </Content>
        </Layout>
    );
}; */

const CalendarPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false); // Состояние для отслеживания видимости модального окна
    const [trigger] = useLazyGetTrainingListQuery({});

    const getDataTrainingList = async () => {
        try {
            const data = await trigger({}).unwrap();
            dispatch(addTrainingListData({ trainingList: data }));
        } catch (error) {
            setIsModalVisible(true); // Показываем модальное окно при ошибке
        }
    };

    const handleModalClose = () => {
        setIsModalVisible(false); // Закрываем модальное окно
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
                visible={isModalVisible} // Показываем модальное окно только при isModalVisible === true
                onCancel={handleModalClose} // Закрытие модального окна при нажатии на кнопку закрытия
                onOk={getDataTrainingList} // Повторный запрос при нажатии на кнопку "Обновить"
                title={
                    <h6 data-test-id={calendarTestId.modalErrorUserTraining.title}>
                        {errorTrainingModalTitle}
                    </h6>
                }
                centered
                //icon={<CloseCircleOutlined />}
                content={
                    <p data-test-id={calendarTestId.modalErrorUserTraining.subtitle}>
                        {errorTrainingListModalText}
                    </p>
                }
                okText='Обновить'
                closable
                closeIcon={<CloseOutlined data-test-id={calendarTestId.modalErrorUserTraining.buttonClose} />}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ 'data-test-id': calendarTestId.modalErrorUserTraining.button }}
                wrapClassName='confirm-modal'
                maskClosable
            />
        </Layout>
    );
};

export default CalendarPage;
