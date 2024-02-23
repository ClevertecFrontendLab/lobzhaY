import { useEffect, useState } from 'react';

import { Button, Form, Input } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';

import { history, usePostRegistrationMutation } from '../../../redux';

import { AuthBodyType } from '../../../constants/api/api-types';

import { registrationTestId } from '../../../constants/data-test/data-test-id';

import './registration-component.scss';

export const RegistrationComponent: React.FC = () => {
    const [form] = Form.useForm();

    const [isValidate, setIsValidate] = useState<boolean>(false);

    const [postRegistration] = usePostRegistrationMutation();

    useEffect(() => {
        if (history.location.state) {
            onFinish(history.location.state);
        }
    }, []);

    const onFinish = async (values: any) => {
        console.log('Received values of form: ', values);
        const body: AuthBodyType = {
            email: values.email,
            password: values.password,
        };
        await postRegistration(body)
            .unwrap()
            .then(() => history.push('/result/success'))
            .catch((error) => {
                if (error.data.statusCode === 409) {
                    history.push('/result/error-user-exist');
                }
                history.push(
                    {
                        pathname: '/result/error',
                    },
                    {
                        ...body,
                    },
                );
                console.error('rejected', error);
            });
    };

    return (
        <div className='registration-wrapper'>
            <Form form={form} name='register' onFinish={onFinish}>
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
                                    return Promise.reject(setIsValidate(true));
                                },
                            }),
                        ]}
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
                        <Button className='google-button' onClick={onFinish}>
                            <GooglePlusOutlined className='span-icon' />
                            <p>Регистрация через Google</p>
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};
