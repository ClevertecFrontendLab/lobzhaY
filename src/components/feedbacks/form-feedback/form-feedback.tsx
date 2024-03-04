import { useEffect, useState } from 'react';

import { Form, Rate } from 'antd';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import FormItem from 'antd/es/form/FormItem';
import TextArea from 'antd/es/input/TextArea';

import { useAppSelector } from '../../../hooks';

import { FeedbackFormText } from '../../../constants/feedbacks-page/feedbacks-page';
import { PostFeedbackType } from '../../../constants/api/api-types';
import { requiredRule } from '../../../constants/auth-pages/auth-pages-text';

import './form-feedback.scss';

export const FormFeedbackComponent: React.FC<{
    submitFeedback: (val: PostFeedbackType) => void;
}> = ({ submitFeedback }) => {
    const { isOpen, repeatFeedback } = useAppSelector((state) => state.modal);

    const [form] = Form.useForm();

    const [rating, setRating] = useState(0);

    const handleChange = () => {
        setRating(form.getFieldValue(['rating']));
    };

    const onFinish = () => {
        const val = form.getFieldsValue();
        if (!val.rating) {
            val.rating = rating;
        }
        submitFeedback(val);
    };

    useEffect(() => {
        if (isOpen && repeatFeedback.isRepeat) {
            form.setFieldsValue({
                ...repeatFeedback.repeatVal,
            });
        }
        if (!isOpen) {
            form.resetFields();
        }
    }, [isOpen, form, repeatFeedback.isRepeat, repeatFeedback.repeatVal]);

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
                        onChange={handleChange}
                        character={({ index = 0 }) =>
                            index <= form.getFieldValue(['rating']) - 1 ? (
                                <StarFilled />
                            ) : (
                                <StarOutlined />
                            )
                        }
                    />
                </FormItem>

                <Form.Item className='text-area' name='message' validateTrigger={['onChange']}>
                    <TextArea
                        placeholder={FeedbackFormText.placeholder}
                        autoSize={{ minRows: 2, maxRows: 100 }}
                    />
                </Form.Item>
            </Form>
        </div>
    );
};
