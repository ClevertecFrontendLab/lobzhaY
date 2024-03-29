import { Button } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';

import { history } from '../../../redux';

import {
    successResultTitle,
    successResultText,
    successResultButton,
} from '../../../constants/result-pages/result-pages';
import { ROUTE_PATHS } from '../../../constants/route-paths/paths';
import { resultsPagesTestId } from '../../../constants/data-test/data-test-id';

import './success.scss';

export const SuccessResult: React.FC = () => {
    const redirectToAuth = () => {
        history.push(ROUTE_PATHS.routes.auth);
    };

    return (
        <section className='success-result-wrapper'>
            <div className='container'>
                <div className='icon'>
                    <CheckCircleFilled />
                </div>
                <div className='text-wrapper'>
                    <h3>{successResultTitle}</h3>
                    <p>{successResultText}</p>
                </div>
                <Button
                    type='primary'
                    data-test-id={resultsPagesTestId.resultSuccess}
                    onClick={redirectToAuth}
                >
                    {successResultButton}
                </Button>
            </div>
        </section>
    );
};
