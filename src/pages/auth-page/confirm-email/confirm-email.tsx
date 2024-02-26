import { useEffect, useState } from 'react';

import VerificationInput from 'react-verification-input';

import { history, store, usePostConfirmEmailMutation } from '../../../redux';
import { showLoader, hideLoader } from '../../../redux/actions/loading-action';

import { CloseCircleFilled, ExclamationCircleFilled } from '@ant-design/icons';

import {
    confirmEmailTextInfo,
    confirmEmailTitleError,
} from '../../../constants/auth-pages/auth-pages-text';

import { ConfirmEmailBodyType } from '../../../constants/api/api-types';

import { confirmEmailTestId } from '../../../constants/data-test/data-test-id';

import './confirm-email.scss';

export const ConfirmEmail: React.FC = () => {
    const [isError, setIsError] = useState(false);
    const [valVerification, setValVerification] = useState('');
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        if (history.location.state) {
            const stateValue = Object.values(history.location.state).join();
            setUserEmail(stateValue);
        }
    }, []);

    const [postConfirmEmail] = usePostConfirmEmailMutation();

    const completeVerification = async (confirmPassword: string) => {
        const body: ConfirmEmailBodyType = {
            email: userEmail,
            code: confirmPassword,
        };

        store.dispatch(showLoader());

        await postConfirmEmail(body)
            .unwrap()
            .then(() => {
                store.dispatch(hideLoader());
                history.push('/auth/change-password');
            })
            .catch(() => {
                store.dispatch(hideLoader());
                setIsError(true);
                setValVerification('');
            });
    };

    const changeVerification = (str: string) => {
        setValVerification(str);
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
                        {isError ? (
                            <h3>{confirmEmailTitleError}</h3>
                        ) : (
                            <h3>
                                Введите код <br /> для восстановления аккауанта
                            </h3>
                        )}
                        <p>
                            Мы отправили вам на e-mail <span>{userEmail}</span> <br />
                            шестизначный код. Введите его в поле ниже.
                        </p>
                    </div>
                </div>
                <VerificationInput
                    length={6}
                    placeholder=''
                    value={valVerification}
                    onComplete={(e) => completeVerification(e)}
                    onChange={(e) => changeVerification(e)}
                    classNames={{
                        container: 'container-verification',
                        character: `${
                            isError ? 'character-verification__error' : 'character-verification'
                        }`,
                        characterInactive: 'character-verification--inactive',
                        characterSelected: 'character-verification--selected',
                        characterFilled: 'character-verification--filled',
                    }}
                    inputProps={{ 'data-test-id': confirmEmailTestId }}
                />
                <p>{confirmEmailTextInfo}</p>
            </section>
        </div>
    );
};
