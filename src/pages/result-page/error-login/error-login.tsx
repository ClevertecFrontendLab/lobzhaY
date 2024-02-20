import { Button } from "antd";
import './error-login.scss';
import { WarningFilled } from "@ant-design/icons";
import { errorLoginText, errorLoginTitle } from "../../../constants/result-pages/result-pages";
import { resultsPagesTestId } from "../../../constants/data-test/data-test-id";

export const ErrorLogin: React.FC = () => {
  return (
      <section className='error-login-wrapper'>
          <div className='container'>
              <div className='icon'>
                  <WarningFilled />
              </div>
              <div className='text-wrapper'>
                  <h3>{errorLoginTitle}</h3>
                  <p>{errorLoginText}</p>
              </div>
              <Button type='primary' data-test-id={resultsPagesTestId.resultErrorLogin}>Повторить</Button>
          </div>
      </section>
  );
};