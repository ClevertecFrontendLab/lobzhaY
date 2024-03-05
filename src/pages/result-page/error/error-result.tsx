import { useEffect, useState } from 'react';

import { Button } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';

import { history } from '../../../redux';

import {
    errorResultButton,
    errorResultText,
    errorResultTitle,
} from '../../../constants/result-pages/result-pages';
import { ROUTE_PATHS } from '../../../constants/route-paths/paths';
import { resultsPagesTestId } from '../../../constants/data-test/data-test-id';

import './error-result.scss';

export const ErrorResult: React.FC = () => {
    const [backState, setBackState] = useState({});

    useEffect(() => {
        if (history.location.state) {
            setBackState(history.location.state);
        }
    }, []);

    const redirectToRegister = () => {
        history.push(
            {
                pathname: ROUTE_PATHS.authOutlet.registration,
            },
            {
                ...backState,
            },
        );
    };

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
