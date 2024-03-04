import { useState } from 'react';

import { Form, Rate } from 'antd';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import FormItem from 'antd/es/form/FormItem';
import TextArea from 'antd/es/input/TextArea';

import { FeedbackFormText } from '../../../constants/feedbacks-page/feedbacks-page';
import { PostFeedbackType } from '../../../constants/api/api-types';

import './form-feedback.scss';
import { requiredRule } from '../../../constants/auth-pages/auth-pages-text';

export const FormFeedbackComponent: React.FC<{
    submitFeedback: ({}: PostFeedbackType) => void;
}> = ({ submitFeedback }) => {
    const [form] = Form.useForm();

    const [rating, setRating] = useState(0);

    const handleChange = () => {
        setRating(form.getFieldValue(['rating']));
    };

    const onFinish = () => {
        const val = form.getFieldsValue();
        console.log(val);
        submitFeedback(val);
    };

    return (
        <div className='form-feedback-content'>
            <Form
                form={form}
                name='feedback'
                onFieldsChange={onFinish}
                validateTrigger={['onChange']}
                className='form'
            >
                <FormItem
                    className='rate'
                    name='rating'
                    rules={[requiredRule]}
                    validateTrigger={['onChange']}
                >
                    <Rate
                        /*  value={value} */
                        onChange={handleChange}
                        character={({ index = 0 }) =>
                            index <= (form.getFieldValue(['rating']) -1 ) ? (
                                <StarFilled />
                            ) : (
                                <StarOutlined />
                            )
                        }
                    />
                </FormItem>

                <Form.Item className='text-area' name='message'>
                    <TextArea
                        placeholder={FeedbackFormText.placeholder}
                        autoSize={{ minRows: 2, maxRows: 100 }}
                    />
                </Form.Item>
            </Form>
        </div>
    );
};
