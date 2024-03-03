import { Avatar, Rate } from 'antd';
import './user-feedback.scss';
import { StarFilled, StarOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { FeedbackType } from '../../../constants/api/api-types';

type UserFeedbackType = {
    userFeedback: FeedbackType
}

export const UserFeedbackComponent: React.FC<UserFeedbackType> = ({userFeedback}) => {
    return (
        <section className='user-feedback'>
            <div className='content-author'>
                <div className='author-avatar'>
                    <Avatar size={42} src={userFeedback.imageSrc ? userFeedback.imageSrc : null} icon={userFeedback.imageSrc ? null : <UserOutlined />} />
                </div>
                <div className='author-name'>
                    <h6>{userFeedback.fullName ? userFeedback.fullName : 'Пользователь'}</h6>
                </div>
            </div>

            <div className='content-comment'>
                <div className='info'>
                    <Rate
                        value={userFeedback.rating}
                        character={({ index = 0 }) =>
                            index < userFeedback.rating ? <StarFilled /> : <StarOutlined />
                        }
                    />
                    <span className='date'>25.10.2023</span>
                </div>
                <div className='comment'>
                    {userFeedback.message ? userFeedback.message : ''}
                </div>
            </div>
        </section>
    );
};
