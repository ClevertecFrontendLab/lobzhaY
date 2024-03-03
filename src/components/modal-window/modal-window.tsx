import { Button, Modal } from 'antd';
import { ActionResultCardComponent, FormFeedbackComponent } from '..';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import {
    FeedbackFormText,
    ModalWindowTypes,
    ResultStatuses,
    feedbacksResults,
} from '../../constants/feedbacks-page/feedbacks-page';
import './modal-window.scss';
import { reviewsTestId } from '../../constants/data-test/data-test-id';
import { history, usePostFeedbackMutation } from '../../redux';
import { useAppDispatch } from '../../hooks';
import { hideLoader, showLoader } from '../../redux/actions/loading-action';
import { PostFeedbackType } from '../../constants/api/api-types';

type ModalWindowComponentTypes = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    typeModal: ModalWindowTypes;
    showModal: (types: ModalWindowTypes) => void;
};

export const ModalWindowComponent: React.FC<ModalWindowComponentTypes> = ({
    isOpen,
    setIsOpen,
    typeModal,
    showModal,
}) => {
    const dispatch = useAppDispatch();
    const [postFeedback] = usePostFeedbackMutation();

    const [formFeedbackValue, setFormFeedbackValue] = useState<PostFeedbackType>();

    const handleOk = () => {
        setIsOpen(false);
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    const showFeedbackForm = () => {
        showModal(ModalWindowTypes.Feedback);
    };

    const createModalButton = (
        modalKey: ResultStatuses | ModalWindowTypes,
    ): ReactNode[] | ReactNode => {
        const { btnTitle } = feedbacksResults[modalKey as ResultStatuses];
        const [titleBtn, closeBtn] = btnTitle;
        if (modalKey === 'error-server') {
            return (
                <Button type='primary' onClick={() => history.push('/main')}>
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
                    >
                        {titleBtn}
                    </Button>,
                    <Button key='back' onClick={handleCancel}>
                        {closeBtn}
                    </Button>,
                ];
            } else {
                return [
                    <Button type='primary' key='good' onClick={handleOk}>
                        {titleBtn}
                    </Button>,
                ];
            }
        }
    };

    const getValue = (val: PostFeedbackType) => {
        setFormFeedbackValue(val)
    };

    const postUserFeedback = async () => {
       setIsOpen(false);
        dispatch(showLoader());

        await postFeedback(formFeedbackValue as PostFeedbackType)
            .unwrap()
            .then((data) => {
                dispatch(hideLoader());
                console.log(data);
                showModal(ModalWindowTypes.Success);
            })
            .catch((error) => {
                dispatch(hideLoader());
                showModal(ModalWindowTypes.Error);
            }); 
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
                    >
                        {FeedbackFormText.button}
                    </Button>
                ) : null
            }
            styles={modalStyles}
        >
            {typeModal === ModalWindowTypes.Feedback ? (
                <FormFeedbackComponent submitFeedback={getValue} />
            ) : (
                <ActionResultCardComponent
                    modalKey={typeModal}
                    extraBtn={createModalButton(typeModal)}
                />
            )}
        </Modal>
    );
};
