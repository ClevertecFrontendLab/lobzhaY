import { useEffect, useState } from 'react';

import { Button, Checkbox, Form, Input } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';

import { history, store, usePostAuthorizationMutation, usePostCheckEmailMutation } from '../../../redux';

import { AuthBodyType } from '../../../constants/api/api-types';

import { loginTestId } from '../../../constants/data-test/data-test-id';

import './login-component.scss';
import { hideLoader, showLoader } from '../../../redux/actions/loading-action';

type LoginFormType = {
    email: string;
    password: string;
    remember: undefined | boolean;
};
type StateFormType = {
    email: string
}

export const LoginComponent: React.FC = () => {
    const [form] = Form.useForm();
    const [userState, setUserState] = useState<StateFormType | undefined>();

    const [postAuthorization] = usePostAuthorizationMutation();
    const [postCheckEmail] = usePostCheckEmailMutation();

    const checkEmail = async () => {
        const emailFieldValue = form.getFieldValue('email');

        const body = {
            email: '',
        };

        if (emailFieldValue) {
            body.email = emailFieldValue;
        } 
        if (userState) {
            body.email = userState.email;
        }
        console.log(body);
        store.dispatch(showLoader());
        await postCheckEmail(body)
            .unwrap()
            .then((data) => {
                console.log('+++', data);
                history.push({ pathname: '/auth/confirm-email' }, { ...body });
                store.dispatch(hideLoader());
            })
            .catch((error) => {
                console.error('rejected', error);
                store.dispatch(hideLoader());
                if (error.data.statusCode === 404 && error.data.message === 'Email не найден') {
                    history.push('/result/error-check-email-no-exist');
                } else {
                    history.push(
                        {
                            pathname: '/result/error-check-email',
                        },
                        {
                            ...body,
                        },
                    );
                }
            });
    };

    useEffect(() => {
        if (history.location.state) {
            const {state}  = history.location
            setUserState({email: (state as StateFormType).email});
            checkEmail();
        }
    }, []);

    const onFinish = async (values: LoginFormType) => {
        console.log('Received values of form: ', values);
        const body: AuthBodyType = {
            email: values.email,
            password: values.password,
        };

        store.dispatch(showLoader());
        await postAuthorization(body)
            .unwrap()
            .then((data) => {
                if (values.remember) {
                    localStorage.setItem('token', data.accessToken);
                }
                sessionStorage.setItem('token', data.accessToken);
                history.push('/main');
                console.log('+++', data);
                store.dispatch(hideLoader());
            })
            .catch((error) => {
                store.dispatch(hideLoader());
                console.error('rejected', error);
                history.push('/result/error-login');
            });
    };

    return (
        <div className='login-wrapper'>
            <Form form={form} name='login' onFinish={onFinish}>
                <div className='login-form'>
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
                            addonBefore={<div className='email-login'>e-mail:</div>}
                            data-test-id={loginTestId.inputLogin}
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
                        ]}
                    >
                        <Input.Password data-test-id={loginTestId.inputPassword} />
                    </Form.Item>

                    <div className='item-remember'>
                        <Form.Item
                            name='remember'
                            valuePropName='checked'
                            wrapperCol={{ offset: 8, span: 16 }}
                            className='form-item-checked'
                        >
                            <Checkbox data-test-id={loginTestId.checkBoxRemember}>
                                Запомнить меня
                            </Checkbox>
                        </Form.Item>
                        <div
                            className='link'
                            data-test-id={loginTestId.buttonForgot}
                            onClick={checkEmail}
                        >
                            Забыли пароль?
                        </div>
                    </div>
                </div>
                <div className='login-buttons'>
                    <Form.Item className='buttons-item submit'>
                        <Button
                            type='primary'
                            htmlType='submit'
                            data-test-id={loginTestId.buttonSubmit}
                        >
                            Войти
                        </Button>
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
