import { Button, Card, Result, Typography } from 'antd';
import './action-result-card.scss';
import { ResultStatusType } from 'antd/es/result';
import { ResultStatuses, feedbacksResults } from '../../constants/feedbacks-page/feedbacks-page';
import { ReactNode } from 'react';

const { Title } = Typography;

export type ActionResultCardType = {
    status: ResultStatusType;
    title: string;
    subTitle?: string;
    btnTitle: string[];
};
export type ActionButtonCardType = {
  extraBtn: ReactNode[] | ReactNode;
  modalKey: ResultStatuses;
}

export const ActionResultCardComponent: React.FC<ActionButtonCardType> = ({modalKey, extraBtn}) => {
    const { status, title, subTitle} = feedbacksResults[modalKey];
    return (
        <Card className='action-result-card' size={'small'}>
            <Result
                status={status}
                title={<Title level={3}>{title}</Title>}
                subTitle={subTitle}
                extra={extraBtn}
            />
        </Card>
    );
};
