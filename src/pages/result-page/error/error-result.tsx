import { CloseCircleFilled } from '@ant-design/icons';
import { Button } from 'antd';
import {
    errorResultButton,
    errorResultText,
    errorResultTitle,
} from '../../../constants/result-pages/result-pages';

import { resultsPagesTestId } from '../../../constants/data-test/data-test-id';

import { history } from '../../../redux';

import './error-result.scss';
import { useEffect, useState } from 'react';

export const ErrorResult: React.FC = () => {
    const [backState, setBackState] = useState({});
    const redirectToRegister = () => {
        history.push(
            {
                pathname: '/auth/registration',
            },
            {
                ...backState,
            },
        );
    };
    useEffect(() => {
        if (history.location.state) {
            setBackState(history.location.state);
        }
    }, []);
    return (
        <section className='error-result-wrapper'>
            <div className='container'>
                <div className='icon'>
                    <CloseCircleFilled />
                </div>
                <div className='text-wrapper'>
                    <h3>{errorResultTitle}</h3>
                    <p>{errorResultText}</p>
                </div>
                <Button
                    type='primary'
                    data-test-id={resultsPagesTestId.resultError}
                    onClick={redirectToRegister}
                >
                    {errorResultButton}
                </Button>
            </div>
        </section>
    );
};
