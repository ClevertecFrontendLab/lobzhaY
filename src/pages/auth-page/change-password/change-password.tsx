import { useEffect, useState } from 'react';

import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';

import {
    changePasswordButton,
    changePasswordInputError,
    changePasswordInputHelp,
    changePasswordInputPlaceholder,
    changePasswordInputPlaceholderRepeat,
    changePasswordTitle,
} from '../../../constants/auth-pages/auth-pages-text';

import './change-password.scss';
import { changePasswordTestId } from '../../../constants/data-test/data-test-id';

export const ChangePassword: React.FC = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [disableSubmitButton, setDisableSubmitButton] = useState(true);
    const [form] = Form.useForm();
    const onFinish = (values: any) => {
        console.log(values);
    };

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
                        <Input.Password placeholder={changePasswordInputPlaceholder} data-test-id={changePasswordTestId.inputPassword} />
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

                    <Button type='primary' className='change-password-button' htmlType='submit' disabled={disableSubmitButton} data-test-id={changePasswordTestId.buttonSubmit} >
                        {changePasswordButton}
                    </Button>
                </Form>
            </div>
        </section>
    );
};
