import { Button } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";

import { errorCheckEmailNoExistButton, errorCheckEmailNoExistText, errorCheckEmailNoExistTitle } from "../../../constants/result-pages/result-pages";
import { resultsPagesTestId } from "../../../constants/data-test/data-test-id";
import './error-check-email-no-exist.scss';
import {history} from '../../../redux';

export const ErrorCheckEmailNoExist: React.FC = () => {
    const redirectBack = () => {
        history.back();
    }
    return (
        <section className='error-check-email-no-exist-wrapper'>
            <div className='container'>
                <div className='icon'>
                    <CloseCircleFilled />
                </div>
                <div className='text-wrapper'>
                    <h3>{errorCheckEmailNoExistTitle}</h3>
                    <p>{errorCheckEmailNoExistText}</p>
                </div>
                <Button type='primary' data-test-id={resultsPagesTestId.resultErrorCheckEmailNoExist} onClick={redirectBack}>{errorCheckEmailNoExistButton}</Button>
            </div>
        </section>
    );
};
