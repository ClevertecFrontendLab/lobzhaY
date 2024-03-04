import { ReactNode, useEffect, useState } from 'react';

import { Card, Result, Typography } from 'antd';
import { ResultStatusType } from 'antd/es/result';

import {
    ModalWindowTypes,
    ResultStatuses,
    feedbacksResults,
} from '../../constants/feedbacks-page/feedbacks-page';

import './action-result-card.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addModal } from '../../redux/slices/modal-slice';

export type ActionResultCardType = {
    status: ResultStatusType;
    title: string;
    subTitle?: string;
    btnTitle: string[];
};
export type ActionButtonCardType = {
    extraBtn: ReactNode[] | ReactNode;
};

export const ActionResultCardComponent: React.FC<ActionButtonCardType> = ({ extraBtn }) => {
    const { type: modalKey } = useAppSelector((state) => state.modal);
  
    const [state, setState] = useState<{status: ResultStatusType , title: string, subTitle: string | undefined }>();
    useEffect(() => {
        console.log(modalKey)
        if (modalKey != ModalWindowTypes.Feedback) {
            const { status, title, subTitle } = feedbacksResults[modalKey as ResultStatuses];
            setState({status, title, subTitle})
        }
    }, [modalKey])


    const { Title } = Typography;
    const getPadding = (): { padding: string } => {
        return {
            padding: `${modalKey === ModalWindowTypes.Server ? '64px 32px 56px' : '64px 32px'}`,
        };
    };

    return (
        <Card className='action-result-card' style={getPadding()}>
            <Result
                status={state?.status}
                title={<Title level={3}>{state?.title}</Title>}
                subTitle={state?.subTitle}
                extra={extraBtn}
            />
        </Card>
    );
};
