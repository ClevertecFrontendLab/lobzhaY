import { useEffect, useState } from 'react';

import { Button, Form, Input } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';

import { history, store, usePostRegistrationMutation } from '../../../redux';
import { hideLoader, showLoader } from '../../../redux/actions/loading-action';

import { AuthBodyType } from '../../../constants/api/api-types';

import { registrationTestId } from '../../../constants/data-test/data-test-id';

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
                    {
                        flowRedirectFrom: true,
                    },
                );
            })
            .catch((error) => {
                store.dispatch(hideLoader());
                if (error.status === 409) {
                    history.push(
                        {
                            pathname: '/result/error-user-exist',
                        },
                        { flowRedirectFrom: true },
                    );
                } else {
                    history.push(
                        {
                            pathname: '/result/error',
                        },
                        {
                            ...body,
                            flowRedirectFrom: true,
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
                        rules={[
                            {
                                type: 'email',
                                message: '',
                            },
                            {
                                required: true,
                                message: '',
                            },
                        ]}
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
                            {
                                required: true,
                                message: '',
                            },
                            {
                                message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
                                validator: (_, value) => {
                                    if (
                                        /^(?=^.{8,}$)(?=(?:[^A-Z]*[A-Z]){1,}[^A-Z]*$)(?=(?:[^a-z]*[a-z]){1,}[^a-z]*$)(?=(?:\D*\d){1,}\D*$)[A-Za-z\d]+$/.test(
                                            value,
                                        )
                                    ) {
                                        return Promise.resolve(setIsValidate(false));
                                    }
                                    return Promise.reject(setIsValidate(true));
                                },
                            },
                        ]}
                        help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                        validateTrigger={['onChange']}
                    >
                        <Input.Password data-test-id={registrationTestId.inputPassword} />
                    </Form.Item>

                    <Form.Item
                        className='form-item'
                        name='confirm'
                        dependencies={['password']}
                        rules={[
                            {
                                required: true,
                                message: '',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve(setIsValidate(false));
                                    }
                                    return Promise.reject(new Error('Пароли не совпадают'));
                                },
                            }),
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
