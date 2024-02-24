import { useEffect, useState } from 'react';

import VerificationInput from 'react-verification-input';

import { history, store, usePostConfirmEmailMutation } from '../../../redux';

import { CloseCircleFilled, ExclamationCircleFilled } from '@ant-design/icons';

import {
    confirmEmailTextInfo,
    confirmEmailTitleError,
} from '../../../constants/auth-pages/auth-pages-text';

import { ConfirmEmailBodyType } from '../../../constants/api/api-types';

import { confirmEmailTestId } from '../../../constants/data-test/data-test-id';

import './confirm-email.scss';
import { showLoader, hideLoader } from '../../../redux/actions/loading-action';

export const ConfirmEmail: React.FC = () => {
    const [isError, setIsError] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        if (history.location.state) {
            const stateValue = Object.values(history.location.state).join();
            setUserEmail(stateValue);
        }
    }, []);

    const [postConfirmEmail] = usePostConfirmEmailMutation();

    const completeVerification = async (confirmPassword: string) => {
        console.log(confirmPassword);
        const body: ConfirmEmailBodyType = {
            email: userEmail,
            code: confirmPassword,
        };
        store.dispatch(showLoader());
        await postConfirmEmail(body)
            .unwrap()
            .then((data) => {
                console.log(data);
                store.dispatch(hideLoader());
                history.push('/auth/change-password');
            })
            .catch((error) => {
                console.log(error);
                store.dispatch(hideLoader());
                setIsError(true);
            });
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
                    /* value={valVerification} */
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
                    inputProps={{'data-test-id': confirmEmailTestId}}
                />
                <p>{confirmEmailTextInfo}</p>
            </section>
        </div>
    );
};
