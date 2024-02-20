import { Button } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";

import { errorCheckEmailNoExistButton, errorCheckEmailNoExistText, errorCheckEmailNoExistTitle } from "../../../constants/result-pages/result-pages";
import { resultsPagesTestId } from "../../../constants/data-test/data-test-id";
import './error-check-email-no-exist.scss';

export const ErrorCheckEmailNoExist: React.FC = () => {
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
                <Button type='primary' data-test-id={resultsPagesTestId.resultErrorCheckEmailNoExist}>{errorCheckEmailNoExistButton}</Button>
            </div>
        </section>
    );
};
