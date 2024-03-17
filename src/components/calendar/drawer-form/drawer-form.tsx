import { Checkbox, Form, Input, InputNumber } from 'antd';
import { ExercisesType } from '../../../constants/api/api-types';
import { getDataTestIdWithIndex } from '../../../constants/data-test/utils-data-test-id/utils';
import { calendarTestId } from '../../../constants/data-test/data-test-id';
import { useEffect } from 'react';

type DrawerFormComponentType = {
    index: number;
    formData: ExercisesType;
    onChange: (index: number, data: ExercisesType) => void;
    isOpenDrawer: boolean;
};

export const DrawerFormComponent: React.FC<DrawerFormComponentType> = ({
    index,
    formData,
    onChange,
    isOpenDrawer,
}) => {
    const [form] = Form.useForm();

    const handleFormChange = () => {
        const formValue = form.getFieldsValue();

        const newFormData = {
            name: formValue.name,
            replays: formValue.replays || 1,
            weight: formValue.weight || 0,
            approaches: formValue.approaches || 1,
            isImplementation: formValue.isImplementation,
        };

        onChange(index, newFormData);
    };

    useEffect(() => {
        if (!isOpenDrawer) {
            form.resetFields();
        } else {
            
            form.setFieldsValue({
                name: formData.name,
                replays: formData.replays,
                weight: formData.weight,
                approaches: formData.approaches,
                isImplementation: formData.isImplementation,
            });
        }

    }, [isOpenDrawer, form, formData]);

    useEffect(() => {
        form.setFieldsValue({
            name: formData.name,
            replays: formData.replays,
            weight: formData.weight,
            approaches: formData.approaches,
            isImplementation: formData.isImplementation,
        });
    }, [formData, form]);

    return (
        <div key={index}>
            <Form form={form} name={`form-add-${index}`} onFieldsChange={handleFormChange}>
                <Form.Item name='name'>
                    <Input
                        data-test-id={getDataTestIdWithIndex(
                            calendarTestId.modalActionDrawer.inputExercise,
                            index,
                        )}
                    />
                </Form.Item>
                <Form.Item name='isImplementation' valuePropName='checked'>
                    <Checkbox
                        data-test-id={getDataTestIdWithIndex(
                            calendarTestId.modalActionDrawer.checkboxExercise,
                            index,
                        )}
                    >
                        Checkbox
                    </Checkbox>
                </Form.Item>
                <div>
                    <Form.Item name='approaches'>
                        <InputNumber
                            min={1}
                            data-test-id={getDataTestIdWithIndex(
                                calendarTestId.modalActionDrawer.inputApproach,
                                index,
                            )} 
                        />
                    </Form.Item>
                    <Form.Item name='weight'>
                        <InputNumber
                            data-test-id={getDataTestIdWithIndex(
                                calendarTestId.modalActionDrawer.inputWeight,
                                index,
                            )}
                            min={0} 
                        />
                    </Form.Item>
                    <Form.Item name='replays'>
                        <InputNumber
                            data-test-id={getDataTestIdWithIndex(
                                calendarTestId.modalActionDrawer.inputQuantity,
                                index,
                            )}
                            min={1} 
                        />
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};
