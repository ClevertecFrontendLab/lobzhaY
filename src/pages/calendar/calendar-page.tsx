import { Layout, Modal } from 'antd';
import { BreadcrumbComponent, CalendarComponent, SettingsButtonComponent } from '../../components';
import { Content } from 'antd/es/layout/layout';

import './calendar-page.scss';
import { useAppDispatch } from '../../hooks';
import { useLazyGetTrainingListQuery } from '../../redux/catalogs-api';
import { useCallback, useLayoutEffect } from 'react';
import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import {
    errorTrainingListModalText,
    errorTrainingModalTitle,
} from '../../constants/calendar/calendar-text';
import { addTrainingListData } from '../../redux/slices/exercise-slice';
import { calendarTestId } from '../../constants/data-test/data-test-id';

const CalendarPage: React.FC = () => {
    const dispatch = useAppDispatch();

    const [trigger] = useLazyGetTrainingListQuery({});

    const { confirm } = Modal;

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
            //  open: confirmVisible,
            onOk() {
                //  setConfirmVisible(false);
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

    const getDataTrainingList = useCallback(async () => {
        await trigger({})
            .unwrap()
            .then((data) => {
                dispatch(addTrainingListData({ trainingList: data }));
            })
            .catch(() => {
                //  if (!confirmVisible) {
                //      setConfirmVisible(true)
                Modal.destroyAll();
                showDeleteConfirm();
                //  }
            });
    }, [dispatch, showDeleteConfirm, trigger]);

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
};

export default CalendarPage;
