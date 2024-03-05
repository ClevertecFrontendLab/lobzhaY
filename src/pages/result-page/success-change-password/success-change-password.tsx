import { Button } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';

import { history } from '../../../redux';

import {
    successChangePasswordText,
    successChangePasswordTitle,
} from '../../../constants/result-pages/result-pages';
import { ROUTE_PATHS } from '../../../constants/route-paths/paths';
import { resultsPagesTestId } from '../../../constants/data-test/data-test-id';

import './success-change-password.scss';

export const SuccessChangePassword: React.FC = () => {
    const redirectToAuth = () => {
        history.push(ROUTE_PATHS.routes.auth);
    };

    return (
        <section className='success-change-password-wrapper'>
            <div className='container'>
                <div className='icon'>
                    <CheckCircleFilled />
                </div>
                <div className='text-wrapper'>
                    <h3>{successChangePasswordTitle}</h3>
                    <p>{successChangePasswordText}</p>
                </div>
                <Button
                    type='primary'
                    data-test-id={resultsPagesTestId.resultSuccessChangePassword}
                    onClick={redirectToAuth}
                >
                    Вход
                </Button>
            </div>
        </section>
    );
};
