import { useEffect, useState } from 'react';

import { Button, Form, Input } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';

import { history, store, usePostRegistrationMutation } from '../../../redux';
import { hideLoader, showLoader } from '../../../redux/actions/loading-action';

import { AuthBodyType } from '../../../constants/api/api-types';

import { registrationTestId } from '../../../constants/data-test/data-test-id';

import { authFormItemRules, changePasswordInputHelp, confirmAuthValidationRule, historyStateRedirect, passwordAuthValidationRule, requiredRule } from '../../../constants/auth-pages/auth-pages-text';

import './registration-component.scss';

type RegistrationFormType = {
    confirm: string;
    email: string;
    password: string;
};

export const RegistrationComponent: React.FC = () => {
    const [form] = Form.useForm();

    const [isValidate, setIsValidate] = useState<boolean>(false);

    const [postRegistration] = usePostRegistrationMutation();
    

    useEffect(() => {
        if (history.location.state) {
            onFinish(history.location.state as RegistrationFormType);
        }
    }, []);

    const onFinish = async (values: RegistrationFormType) => {
        const body: AuthBodyType = {
            email: values.email,
            password: values.password,
        };

        store.dispatch(showLoader());

        await postRegistration(body)
            .unwrap()
            .then(() => {
                store.dispatch(hideLoader());
                history.push(
                    {
                        pathname: '/result/success',
                    },
                    historyStateRedirect
                );
            })
            .catch((error) => {
                store.dispatch(hideLoader());
                if (error.status === 409) {
                    history.push(
                        {
                            pathname: '/result/error-user-exist',
                        },
                        historyStateRedirect
                    );
                } else {
                    history.push(
                        {
                            pathname: '/result/error',
                        },
                        {
                            ...body,
                           ...historyStateRedirect
                        },
                    );
                }
            });
    };

    return (
        <div className='registration-wrapper'>
            <Form form={form} name='register' onFinish={onFinish} validateTrigger={['onChange']}>
                <div className='registration-form'>
                    <Form.Item
                        className='form-item-email'
                        name='email'
                        rules={authFormItemRules}
                        validateTrigger={['onChange']}
                    >
                        <Input
                            type='email'
                            addonBefore={<div className='email-registration'>e-mail:</div>}
                            data-test-id={registrationTestId.inputLogin}
                        />
                    </Form.Item>

                    <Form.Item
                        className='form-item'
                        name='password'
                        rules={[
                            requiredRule,
                            passwordAuthValidationRule(() => setIsValidate(false), () => setIsValidate(true))
                            
                        ]}
                        help={changePasswordInputHelp}
                        validateTrigger={['onChange']}
                    >
                        <Input.Password data-test-id={registrationTestId.inputPassword} />
                    </Form.Item>

                    <Form.Item
                        className='form-item'
                        name='confirm'
                        dependencies={['password']}
                        rules={[
                            requiredRule,
                            confirmAuthValidationRule(() => setIsValidate(false)),
                            
                        ]}
                        validateTrigger={['onChange']}
                    >
                        <Input.Password data-test-id={registrationTestId.inputConfirmPassword} />
                    </Form.Item>
                </div>

                <div className='registration-buttons'>
                    <Form.Item shouldUpdate className='buttons-item submit'>
                        {() => (
                            <Button
                                type='primary'
                                htmlType='submit'
                                data-test-id={registrationTestId.buttonSubmit}
                                disabled={
                                    (isValidate && !form.isFieldsTouched(true)) ||
                                    !!form.getFieldsError().filter(({ errors }) => errors.length)
                                        .length
                                }
                            >
                                Войти
                            </Button>
                        )}
                    </Form.Item>
                    <Form.Item className='buttons-item google'>
                        <Button className='google-button'>
                            <GooglePlusOutlined className='span-icon' />
                            <p>Регистрация через Google</p>
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};
