import { Form, Rate } from 'antd';
import './form-feedback.scss';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import { FeedbackFormText } from '../../../constants/feedbacks-page/feedbacks-page';
import FormItem from 'antd/es/form/FormItem';
import { PostFeedbackType } from '../../../constants/api/api-types';

export const FormFeedbackComponent: React.FC<{submitFeedback: ({}: PostFeedbackType) => void}> = ({submitFeedback}) => {
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
            <div className='rate'>
                <button onClick={onFinish}>++++</button>
            </div>
            <div className='text-form'>
                <Form
                    form={form}
                    name='feedback'
                    onChange={onFinish}
                    validateTrigger={['onChange']}
                >
                    <FormItem className='rate' name='rating' validateTrigger={['onChange']}>
                        <Rate
                            /*  value={value} */
                            onChange={handleChange}
                            //  defaultValue={0}
                            character={({ index = 0 }) =>
                                index < form.getFieldValue(['rating']) ? <StarFilled /> : <StarOutlined />
                            }
                        />
                    </FormItem>
                    <Form.Item
                        className='form-item'
                        name='message'
                        // rules={[requiredRule]}
                        validateTrigger={['onChange']}
                    >
                        <TextArea
                            placeholder={FeedbackFormText.placeholder}
                            // autoSize={{ minRows: 1 }}
                            // maxLength={100}
                        />
                        {/*  <TextArea showCount maxLength={100} placeholder="can resize" /> */}
                    </Form.Item>
                    
                </Form>
            </div>
        </div>
    );
};
