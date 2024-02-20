import { Button } from 'antd';
import somethingWrong from '../../../assets/result-auth/something-wrong.png';
import { errorCheckEmailText, errorCheckEmailTitle } from '../../../constants/result-pages/result-pages';
import { resultsPagesTestId } from '../../../constants/data-test/data-test-id';
import './error-check-email.scss';

export const ErrorCheckEmail: React.FC = () => {
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
            <Button type="primary" data-test-id={resultsPagesTestId.resultErrorCheckEmail}>Назад</Button>
            </div>
        </section>
    );
};
