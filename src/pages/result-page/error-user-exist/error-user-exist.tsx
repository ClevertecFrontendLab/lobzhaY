import { Button } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';
import {
    errorUserExistTitle,
    errorUserExistText,
    errorUserExistButton,
} from '../../../constants/result-pages/result-pages';

import './error-user-exist.scss';
import { resultsPagesTestId } from '../../../constants/data-test/data-test-id';


export const ErrorUserExist: React.FC = () => {
    return (
        <section className='error-user-exist-wrapper'>
            <div className='container'>
                <div className='icon'>
                    <CloseCircleFilled />
                </div>
                <div className='text-wrapper'>
                    <h3>{errorUserExistTitle}</h3>
                    <p>{errorUserExistText}</p>
                </div>
                <Button type='primary' data-test-id={resultsPagesTestId.resultErrorUserExist}>{errorUserExistButton}</Button>
            </div>
        </section>
    );
};
