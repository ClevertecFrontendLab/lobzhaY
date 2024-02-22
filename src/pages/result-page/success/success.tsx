import { Button } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { successResultTitle, successResultText, successResultButton } from '../../../constants/result-pages/result-pages';
import { resultsPagesTestId } from '../../../constants/data-test/data-test-id';
import {history} from '../../../redux';
import './success.scss';
import { useEffect } from 'react';

export const SuccessResult: React.FC = () => {
    const redirectToAuth = () => {
        console.log(history);
        history.push('/auth')
    }
    useEffect(() => {
        console.log(history);
    }, []);
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
              <Button type='primary' data-test-id={resultsPagesTestId.resultSuccess} onClick={redirectToAuth}>{successResultButton}</Button>
          </div>
      </section>
  );
};