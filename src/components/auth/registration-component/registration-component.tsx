import { Button, Form, Input } from 'antd';
import './registration-component.scss';
import { GooglePlusOutlined } from '@ant-design/icons';

export const RegistrationComponent: React.FC = () => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    return (
        <div className='registration-wrapper'>
            <Form form={form} name='register' onFinish={onFinish}>
                <div className='registration-form'>
                    <Form.Item className='form-item-email'
                        name='email'
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input type='email' addonBefore={<div className='email-registration'>e-mail:</div>} />
                    </Form.Item>

                    <Form.Item className='form-item'
                        name='password'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item className='form-item'
                        name='confirm'
                        dependencies={['password']}
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error(
                                            'The new password that you entered do not match!',
                                        ),
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                </div>

                <div className='registration-buttons'>
                    <Form.Item className='buttons-item submit'>
                        <Button type='primary' htmlType='submit'>
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
