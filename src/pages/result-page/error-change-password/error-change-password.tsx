import { useEffect, useState } from 'react';

import { Button } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';

import { history } from '../../../redux';

import {
    errorChangePasswordButton,
    errorChangePasswordText,
    errorChangePasswordTitle,
} from '../../../constants/result-pages/result-pages';

import { resultsPagesTestId } from '../../../constants/data-test/data-test-id';

import './error-change-password.scss';

export const ErrorChangePassword: React.FC = () => {
    const [bodyState, setBodyState] = useState({});

    useEffect(() => {
        if (history.location.state) {
            setBodyState(history.location.state);
        }
    }, []);

    const redirectBack = () => {
        history.push(
            {
                pathname: '/auth/change-password',
            },
            {
                ...bodyState,
            },
        );
    };

    return (
        <section className='error-change-password-wrapper'>
            <div className='container'>
                <div className='icon'>
                    <CloseCircleFilled />
                </div>
                <div className='text-wrapper'>
                    <h3>{errorChangePasswordTitle}</h3>
                    <p>{errorChangePasswordText}</p>
                </div>
                <Button
                    type='primary'
                    data-test-id={resultsPagesTestId.resultErrorChangePassword}
                    onClick={redirectBack}
                >
                    {errorChangePasswordButton}
                </Button>
            </div>
        </section>
    );
};
