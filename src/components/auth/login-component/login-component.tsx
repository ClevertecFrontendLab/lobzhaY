import { Button, Checkbox, Form, Input } from 'antd';
import './login-component.scss';
import { GooglePlusOutlined } from '@ant-design/icons';
import { loginTestId } from '../../../constants/data-test/data-test-id';
import { history, usePostAuthorizationMutation, usePostCheckEmailMutation } from '../../../redux';
import { MouseEvent, useEffect } from 'react';
import { AuthBodyType } from '../../../constants/api/api-types';

export const LoginComponent: React.FC = () => {
    const [form] = Form.useForm();

    const [postAuthorization, {}] = usePostAuthorizationMutation();
    const [postCheckEmail, {}] = usePostCheckEmailMutation();

    const onFinish = async (values: any) => {
        console.log('Received values of form: ', values);
        const body: AuthBodyType = {
            email: values.email,
            password: values.password,
        };

        await postAuthorization(body)
            .unwrap()
            .then((data) => {
                if (values.remember) {
                    localStorage.setItem('token', data.accessToken);
                }
                sessionStorage.setItem('token', data.accessToken);
                history.push('/main');
                console.log('+++', data);
            })
            .catch((error) => {
                console.error('rejected', error);
                history.push('/result/error-login');
            });
    };

    const checkEmail = async (state?: any) => {
        console.log(state);
        const emailFieldValue = form.getFieldValue('email');

        const body = {
            email: '',
        };

        if (emailFieldValue) {
            body.email = emailFieldValue;
        } else {
            body.email = state.email;
        }
        console.log(body);
        await postCheckEmail(body)
            .unwrap()
            .then((data) => {
                console.log('+++', data);
                history.push({pathname: '/auth/confirm-email'}, {...body});
            })
            .catch((error) => {
                console.error('rejected', error);
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
            checkEmail(history.location.state);
        }
    }, []);

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
                            onClick={(e) => checkEmail(e)}
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
                            <GooglePlusOutlined />
                            <p>Регистрация через Google</p>
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};
