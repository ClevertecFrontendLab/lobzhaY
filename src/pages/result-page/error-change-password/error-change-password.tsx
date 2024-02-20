import { CloseCircleFilled } from "@ant-design/icons";
import { Button } from "antd";
import { errorChangePasswordButton, errorChangePasswordText, errorChangePasswordTitle } from "../../../constants/result-pages/result-pages";
import { resultsPagesTestId } from "../../../constants/data-test/data-test-id";
import './error-change-password.scss';

export const ErrorChangePassword: React.FC = () => {
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
              <Button type='primary' data-test-id={resultsPagesTestId.resultErrorChangePassword}>{errorChangePasswordButton}</Button>
          </div>
      </section>
  );
};