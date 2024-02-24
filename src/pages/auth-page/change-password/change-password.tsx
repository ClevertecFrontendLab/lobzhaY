import { useEffect, useState } from 'react';

import { Button, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import { usePostChangePasswordMutation, history, store } from '../../../redux';

import {
    changePasswordButton,
    changePasswordInputError,
    changePasswordInputHelp,
    changePasswordInputPlaceholder,
    changePasswordInputPlaceholderRepeat,
    changePasswordTitle,
} from '../../../constants/auth-pages/auth-pages-text';

import { ChangePasswordBodyType } from '../../../constants/api/api-types';

import { changePasswordTestId } from '../../../constants/data-test/data-test-id';

import './change-password.scss';
import { showLoader, hideLoader } from '../../../redux/actions/loading-action';

export const ChangePassword: React.FC = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [disableSubmitButton, setDisableSubmitButton] = useState(false);
    const [form] = Form.useForm();
    const [userState, setUserState] = useState<ChangePasswordBodyType>();

    const [postChangePassword] = usePostChangePasswordMutation();

    const onFinish = async (values?: any) => {
        const body: ChangePasswordBodyType = {
            password: '',
            confirmPassword: '',
        };

        if (values) {
            body.password = values.password;
            body.confirmPassword = values['password-repeat'];
        }
        if (userState?.password) {
            body.password = userState.password;
            body.confirmPassword = userState.confirmPassword;
        }
        store.dispatch(showLoader());
        await postChangePassword(body)
            .unwrap()
            .then(() => {
                store.dispatch(hideLoader());
                history.push('/result/success-change-password');
            })
            .catch((error) => {
                console.log(error);
                store.dispatch(hideLoader());
                history.push(
                    {
                        pathname: '/result/error-change-password',
                    },
                    {
                        ...body,
                    },
                );
            });
    };

    useEffect(() => {
        if (history.location.state) {
            setUserState(history.location.state as ChangePasswordBodyType);
            onFinish();
        }
    }, []);
    return (
        <section className='change-password-wrapper'>
            <div className='change-password-container'>
                <h3>{changePasswordTitle}</h3>
                <Form form={form} className='change-password-form' onFinish={onFinish}>
                    <Form.Item
                        help={changePasswordInputHelp}
                        name='password'
                        className='change-password-form-item'
                        rules={[{ required: true }]}
                    >
                        <Input.Password
                            placeholder={changePasswordInputPlaceholder}
                            data-test-id={changePasswordTestId.inputPassword}
                        />
                    </Form.Item>
                    <Form.Item
                        className='change-password-form-item'
                        rules={[
                            { required: true, message: 'Пожалуйста, введите пароль' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error(changePasswordInputError));
                                },
                            }),
                        ]}
                        name='password-repeat'
                        dependencies={['password']}
                    >
                        <Input.Password
                            placeholder={changePasswordInputPlaceholderRepeat}
                            iconRender={(visible) =>
                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                            }
                            data-test-id={changePasswordTestId.inputConfirmPassword}
                        />
                    </Form.Item>

                    <Button
                        type='primary'
                        className='change-password-button'
                        htmlType='submit'
                        disabled={disableSubmitButton}
                        data-test-id={changePasswordTestId.buttonSubmit}
                    >
                        {changePasswordButton}
                    </Button>
                </Form>
            </div>
        </section>
    );
};
