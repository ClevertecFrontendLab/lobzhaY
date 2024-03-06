import { useEffect, useState } from 'react';

import { Button } from 'antd';

import { history } from '../../../redux';

import {
    errorCheckEmailText,
    errorCheckEmailTitle,
} from '../../../constants/result-pages/result-pages';

import { resultsPagesTestId } from '../../../constants/data-test/data-test-id';
import { ROUTE_PATHS } from '../../../constants/route-paths/paths';
import somethingWrong from '../../../assets/result-auth/something-wrong.png';

import './error-check-email.scss';

export const ErrorCheckEmail: React.FC = () => {
    const [backState, setBackState] = useState({});

    useEffect(() => {
        if (history.location.state) {
            setBackState(history.location.state);
        }
    }, []);

    const redirectToBack = () => {
        history.push(
            {
                pathname: ROUTE_PATHS.routes.auth,
            },
            {
                ...backState,
            },
        );
    };

    return (
        <section className='error-check-email-wrapper'>
            <div className='container'>
                <div className='image-wrapper'>
                    <img src={somethingWrong} alt='Что-то пошло не так' />
                </div>
                <div className='text-wrapper'>
                    <h3>{errorCheckEmailTitle}</h3>
                    <p>{errorCheckEmailText}</p>
                </div>
                <Button
                    type='primary'
                    data-test-id={resultsPagesTestId.resultErrorCheckEmail}
                    onClick={redirectToBack}
                >
                    Назад
                </Button>
            </div>
        </section>
    );
};
