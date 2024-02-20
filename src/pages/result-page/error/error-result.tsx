import { CloseCircleFilled } from "@ant-design/icons";
import { Button } from "antd";
import { errorResultButton, errorResultText, errorResultTitle } from "../../../constants/result-pages/result-pages";

import { resultsPagesTestId } from "../../../constants/data-test/data-test-id";

import './error-result.scss';

export const ErrorResult: React.FC = () => {
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
              <Button type='primary' data-test-id={resultsPagesTestId.resultError}>{errorResultButton}</Button>
          </div>
      </section>
  );
};