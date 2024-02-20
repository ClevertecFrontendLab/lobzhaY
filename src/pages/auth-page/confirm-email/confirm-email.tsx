import { useState } from 'react';

import VerificationInput from 'react-verification-input';

import { CloseCircleFilled, ExclamationCircleFilled } from '@ant-design/icons';

import {
    confirmEmailTextInfo,
    confirmEmailTitle,
    confirmEmailTitleError,
} from '../../../constants/auth-pages/auth-pages-text';

import './confirm-email.scss';
import { confirmEmailTestId } from '../../../constants/data-test/data-test-id';

export const ConfirmEmail: React.FC = () => {
    const [isError, setIsError] = useState(false);

    const changeVerification = (e: string) => {
        console.log(e);
    };
    const completeVerification = (e: string) => {
        console.log(e);
    };

    return (
        <div>
            <section className='change-password'>
                <div className='result'>
                    <div className='icon-wrapper'>
                        {isError ? (
                            <CloseCircleFilled className='icon-error' />
                        ) : (
                            <ExclamationCircleFilled className='icon' />
                        )}
                    </div>
                    <div className='text-wrapper'>
                        <h3>{isError ? confirmEmailTitleError : confirmEmailTitle}</h3>
                        <p>
                            Мы отправили вам на e-mail <span>victorbyden@gmail.com</span>{' '}
                             шестизначный код. Введите его в поле ниже.
                        </p>
                    </div>
                </div>
                <VerificationInput
                    length={6}
                    placeholder=''
                    data-test-id={confirmEmailTestId}
                    /* value={valVerification} */
                    onChange={(e) => changeVerification(e)}
                    onComplete={(e) => completeVerification(e)}
                    classNames={{
                        container: 'container-verification',
                        character: `${
                            isError ? 'character-verification__error' : 'character-verification'
                        }`,
                        characterInactive: 'character-verification--inactive',
                        characterSelected: 'character-verification--selected',
                        characterFilled: 'character-verification--filled',
                    }}
                />
                <p>{confirmEmailTextInfo}</p>
            </section>
        </div>
    );
};