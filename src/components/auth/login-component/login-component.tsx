import { useEffect, useState } from 'react';

import { Button, Checkbox, Form, Input } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';

import {
    history,
    store,
    usePostAuthorizationMutation,
    usePostCheckEmailMutation,
} from '../../../redux';

import { AuthBodyType } from '../../../constants/api/api-types';

import { loginTestId } from '../../../constants/data-test/data-test-id';

import './login-component.scss';
import { hideLoader, showLoader } from '../../../redux/actions/loading-action';
import { addAuthData } from '../../../redux/slices/auth-slice';
import { FieldData } from 'rc-field-form/lib/interface';

type LoginFormType = {
    email: string;
    password: string;
    remember: undefined | boolean;
};

type StateFormType = {
    email: string;
};

export const LoginComponent: React.FC = () => {
    const [form] = Form.useForm();
    const [userState, setUserState] = useState<StateFormType | undefined>();
    const [disabledField, setDisabledField] = useState(false);

    const [postAuthorization] = usePostAuthorizationMutation();
    const [postCheckEmail] = usePostCheckEmailMutation();

    const checkEmail = async () => {
      form.validateFields(['email'])
      .then((data) => {
          console.log(data)
          setDisabledField(false);
          postValueCheckEmail();
      })
      .catch((err) => {
          console.log(err)
          setDisabledField(true);
      });
    };

    const postValueCheckEmail = async () => {
        const emailFieldValue = form.getFieldValue('email');

        console.log(form.isFieldValidating('email'));

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
                if (error.status === 404 && error.data.message === 'Email не найден') {
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
    }

    useEffect(() => {
        if (history.location.state) {
            const { state } = history.location;
            setUserState({ email: (state as StateFormType).email });
            checkEmail();
        }
    }, []);

    const onFinish = async (values: LoginFormType) => {

        if (values.password.length < 8) {
            console.log('меньше')
        } else {
            console.log('больше')
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
                    const storeData = {
                        userEmail: values.email,
                        userToken: data.accessToken,
                    };
                    store.dispatch(addAuthData(storeData));
    
                    store.dispatch(hideLoader());
                    history.push('/main');
                    console.log('+++', data);
                })
                .catch((error) => {
                    store.dispatch(hideLoader());
                    console.error('rejected', error);
                    history.push('/result/error-login');
                });
        }
      
    };

    const checkDisabledField = () => {
        form.validateFields(['email'])
            .then((data) => {
                console.log(data)
                setDisabledField(false);
            })
            .catch((err) => {
                console.log(err)
                setDisabledField(true);
            });
    };

    const [submittable, setSubmittable] = useState<boolean>(true);

    const values = Form.useWatch([], form);

    useEffect(() => {
        /*  form.validateFields({ validateOnly: true, recursive: true, dirty: true })
            .then((val) => {
                console.log(val);
                setSubmittable(true);
            })
            .catch((err) => {
                console.log(err);
                setSubmittable(false);
            }); */
    }, [form, values]);

    return (
        <div className='login-wrapper'>
            <Form
                form={form}
                name='login'
                onFinish={onFinish}
                validateTrigger={['onChange', 'onBlur']}
            >
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
                        validateTrigger={['onChange', 'onBlur']}
                    >
                        <Input
                            type='email'
                            addonBefore={<div className='email-login'>e-mail:</div>}
                            data-test-id={loginTestId.inputLogin}
                            onChange={checkDisabledField}
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
                         /*    {
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
                            }, */
                        ]}
                        validateTrigger={['onChange']}
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
                        <Button
                            type='text'
                            className='link'
                            data-test-id={loginTestId.buttonForgot}
                            onClick={checkEmail}
                            disabled={disabledField}
                        >
                            Забыли пароль?
                        </Button>
                    </div>
                </div>
                <div className='login-buttons'>
                    <Form.Item className='buttons-item submit' shouldUpdate>
                        {() => (
                            <Button
                                type='primary'
                                htmlType='submit'
                                data-test-id={loginTestId.buttonSubmit}
                                disabled={
                                    (!submittable && !form.isFieldsTouched(true)) ||
                                    !!form.getFieldsError().filter(({ errors }) => errors.length)
                                        .length
                                }
                            >
                                Log in
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
