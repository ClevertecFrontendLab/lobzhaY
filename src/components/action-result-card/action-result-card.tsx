import { ReactNode } from 'react';

import { Card, Result, Typography } from 'antd';
import { ResultStatusType } from 'antd/es/result';

import {
    ModalWindowTypes,
    ResultStatuses,
    feedbacksResults,
} from '../../constants/feedbacks-page/feedbacks-page';

import './action-result-card.scss';

export type ActionResultCardType = {
    status: ResultStatusType;
    title: string;
    subTitle?: string;
    btnTitle: string[];
};
export type ActionButtonCardType = {
    extraBtn: ReactNode[] | ReactNode;
    modalKey: ResultStatuses;
};

export const ActionResultCardComponent: React.FC<ActionButtonCardType> = ({
    modalKey,
    extraBtn,
}) => {
    const { status, title, subTitle } = feedbacksResults[modalKey];
    const { Title } = Typography;
    const getPadding = (): { padding: string } => {
        return {
            padding: `${modalKey === ModalWindowTypes.Server ? '64px 32px 56px' : '64px 32px'}`,
        };
    };
    
    return (
        <Card className='action-result-card' style={getPadding()}>
            <Result
                status={status}
                title={<Title level={3}>{title}</Title>}
                subTitle={subTitle}
                extra={extraBtn}
            />
        </Card>
    );
};
