import { Button, Checkbox, Form, Input } from 'antd';
import './login-component.scss';
import { GooglePlusOutlined } from '@ant-design/icons';

export const LoginComponent: React.FC = () => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
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
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input
                            type='email'
                            addonBefore={<div className='email-login'>e-mail:</div>}
                        />
                    </Form.Item>

                    <Form.Item
                        className='form-item'
                        name='password'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <div className='item-remember'>
                        <Form.Item
                            name='remember'
                            valuePropName='checked'
                            wrapperCol={{ offset: 8, span: 16 }}
                            className='form-item-checked'
                        >
                            <Checkbox>Запомнить меня</Checkbox>
                        </Form.Item>
                        <div className='link'>Забыли пароль?</div>
                    </div>
                </div>
                <div className='login-buttons'>
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
