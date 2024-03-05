import { ReactNode, useState } from 'react';

import { Button, Modal } from 'antd';

import { ActionResultCardComponent, FormFeedbackComponent } from '..';

import { history, usePostFeedbackMutation } from '../../redux';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { hideLoader, showLoader } from '../../redux/actions/loading-action';
import { addModal, changeFormValidate, removeModal } from '../../redux/slices/modal-slice';

import {
    FeedbackFormText,
    ModalWindowTypes,
    ResultStatuses,
    feedbacksResults,
} from '../../constants/feedbacks-page/feedbacks-page';

import { reviewsTestId } from '../../constants/data-test/data-test-id';
import { ROUTE_PATHS } from '../../constants/route-paths/paths';
import { PostFeedbackType } from '../../constants/api/api-types';

import './modal-window.scss';

export const ModalWindowComponent: React.FC = () => {
    const dispatch = useAppDispatch();

    const { isOpen, type: typeModal, formValidate } = useAppSelector((state) => state.modal);

    const [postFeedback] = usePostFeedbackMutation();

    const [formFeedbackValue, setFormFeedbackValue] = useState<PostFeedbackType>();

    const handleOk = () => {
        dispatch(removeModal());
        dispatch(changeFormValidate({ formValidate: true }));
    };

    const handleCancel = () => {
        dispatch(removeModal());
        dispatch(changeFormValidate({ formValidate: true }));
    };

    const showFeedbackForm = () => {
        dispatch(
            addModal({
                type: ModalWindowTypes.Feedback,
                isRepeat: true,
                repeatVal: formFeedbackValue,
            }),
        );
    };

    const createModalButton = (
        modalKey: ResultStatuses | ModalWindowTypes,
    ): ReactNode[] | ReactNode => {
        if (feedbacksResults[modalKey as ResultStatuses]) {
            const { btnTitle } = feedbacksResults[modalKey as ResultStatuses];
            const [titleBtn, closeBtn] = btnTitle;
            if (modalKey === 'error-server') {
                return (
                    <Button
                        type='primary'
                        className='modal-button-server'
                        onClick={() => history.push(ROUTE_PATHS.main)}
                    >
                        {titleBtn}
                    </Button>
                );
            } else {
                if (btnTitle.length > 1) {
                    return [
                        <Button
                            type='primary'
                            key='feedback'
                            data-test-id={reviewsTestId.errorModal}
                            onClick={showFeedbackForm}
                            className='modal-button-feedback'
                        >
                            {titleBtn}
                        </Button>,
                        <Button key='back' className='modal-button-back' onClick={handleCancel}>
                            {closeBtn}
                        </Button>,
                    ];
                } else {
                    return [
                        <Button
                            type='primary'
                            className='modal-button-good'
                            key='good'
                            onClick={handleOk}
                        >
                            {titleBtn}
                        </Button>,
                    ];
                }
            }
        }
    };

    const getValue = (val: PostFeedbackType) => {
        setFormFeedbackValue(val);
    };

    const postUserFeedback = async () => {
        if (!formFeedbackValue?.rating) {
            dispatch(changeFormValidate({ formValidate: true }));
        }

        if (formFeedbackValue && !formValidate) {
            dispatch(removeModal());
            dispatch(showLoader());
            await postFeedback(formFeedbackValue as PostFeedbackType)
                .unwrap()
                .then(() => {
                    dispatch(hideLoader());
                    dispatch(addModal({ type: ModalWindowTypes.Success }));
                })
                .catch(() => {
                    dispatch(hideLoader());
                    dispatch(addModal({ type: ModalWindowTypes.Error }));
                });
        }
    };

    const modalStyles = {
        mask: {
            backdropFilter: 'blur(12px)',
            backgroundColor: `rgba(121, 156, 213, ${
                typeModal === ModalWindowTypes.Feedback ? '0.1' : '0.5'
            })`,
        },
    };

    return (
        <Modal
            open={isOpen}
            centered
            onOk={handleOk}
            onCancel={handleCancel}
            closable={typeModal === ModalWindowTypes.Feedback ? true : false}
            title={
                typeModal === ModalWindowTypes.Feedback ? <h6>{FeedbackFormText.title}</h6> : null
            }
            footer={
                typeModal === ModalWindowTypes.Feedback ? (
                    <Button
                        type='primary'
                        data-test-id={reviewsTestId.newFeedbackModal}
                        onClick={postUserFeedback}
                        disabled={formValidate}
                    >
                        {FeedbackFormText.button}
                    </Button>
                ) : null
            }
            styles={modalStyles}
            width={540}
            className='modal--wrapper'
        >
            {typeModal === ModalWindowTypes.Feedback ? (
                <FormFeedbackComponent submitFeedback={getValue} />
            ) : (
                <ActionResultCardComponent extraBtn={createModalButton(typeModal)} />
            )}
        </Modal>
    );
};
