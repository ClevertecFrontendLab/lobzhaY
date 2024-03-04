import { Button, Form, Modal } from 'antd';
import { ActionResultCardComponent, FormFeedbackComponent } from '..';
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import {
    FeedbackFormText,
    ModalWindowTypes,
    ResultStatuses,
    feedbacksResults,
} from '../../constants/feedbacks-page/feedbacks-page';
import './modal-window.scss';
import { reviewsTestId } from '../../constants/data-test/data-test-id';
import { history, store, usePostFeedbackMutation } from '../../redux';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { hideLoader, showLoader } from '../../redux/actions/loading-action';
import { PostFeedbackType } from '../../constants/api/api-types';
import { addModal, removeModal } from '../../redux/slices/modal-slice';

export const ModalWindowComponent: React.FC = () => {
    const dispatch = useAppDispatch();

    const { isOpen, type: typeModal } = useAppSelector((state) => state.modal);

    const [postFeedback] = usePostFeedbackMutation();

    const [formFeedbackValue, setFormFeedbackValue] = useState<PostFeedbackType>();
    const [buttonDisable, setButtonDisable] = useState(false);

    const handleOk = () => {
        dispatch(removeModal());
    };

    const handleCancel = () => {
        dispatch(removeModal());
    };

    const showFeedbackForm = () => {
        dispatch(addModal({ type: ModalWindowTypes.Feedback, isRepeat: true, repeatVal: formFeedbackValue }));
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
                        onClick={() => history.push('/main')}
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
        if (!formFeedbackValue || !formFeedbackValue.rating) {
            setButtonDisable(true);
        } else {
            setButtonDisable(false);
        }
        setFormFeedbackValue(val);
    };

    const postUserFeedback = async () => {
         if (!formFeedbackValue || !formFeedbackValue.rating) {
            setButtonDisable(true);
        } else {
        setButtonDisable(false);
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
                dispatch(addModal({ type: ModalWindowTypes.Error}));
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
                        disabled={buttonDisable}
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
