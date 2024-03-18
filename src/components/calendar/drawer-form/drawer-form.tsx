import { Checkbox, Form, Input, InputNumber } from 'antd';
import { ExercisesType } from '../../../constants/api/api-types';
import { getDataTestIdWithIndex } from '../../../constants/data-test/utils-data-test-id/utils';
import { calendarTestId } from '../../../constants/data-test/data-test-id';
import { useEffect } from 'react';
import { useAppSelector } from '../../../hooks';
import { DrawerType } from '../../../constants/calendar/calendar-text';

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

    const { typeDrawer } = useAppSelector((state) => state.userExercises.drawer);

    return (
        <Form form={form} name={`form-add-${index}`} onFieldsChange={handleFormChange}>
            <div className='exercises-name'>
                <Form.Item
                    name='name'
                    style={{
                        width: `${
                            typeDrawer !== DrawerType.UpdateFuture ? '100%' : 'calc(100% - 40px)'
                        }`,
                    }}
                >
                    <Input
                        data-test-id={getDataTestIdWithIndex(
                            calendarTestId.modalActionDrawer.inputExercise,
                            index,
                        )}
                    />
                </Form.Item>
                
                    {typeDrawer === DrawerType.UpdateFuture && (
                        <div className='checkbox'>
                    <Form.Item name='isImplementation' valuePropName='checked'>
                        <Checkbox
                            data-test-id={getDataTestIdWithIndex(
                                calendarTestId.modalActionDrawer.checkboxExercise,
                                index,
                            )}
                            style={{ width: '40px', height: '24px' }}
                        ></Checkbox>
                    </Form.Item>
                    </div>) }
                
            </div>
            <div className='exercises-settings'>
                <Form.Item
                    name='approaches'
                    label='Подходы, раз'
                    className='exercises-settings__first-item'
                    labelAlign='left'
                >
                    <InputNumber
                        min={1}
                        data-test-id={getDataTestIdWithIndex(
                            calendarTestId.modalActionDrawer.inputApproach,
                            index,
                        )}
                        addonBefore={'+'}
                    />
                </Form.Item>
                <div className='exercises-settings__items'>
                    <Form.Item name='weight' label='Вес, кг' labelAlign='left'>
                        <InputNumber
                            data-test-id={getDataTestIdWithIndex(
                                calendarTestId.modalActionDrawer.inputWeight,
                                index,
                            )}
                            min={0}
                        />
                    </Form.Item>
                    <p>X</p>
                    <Form.Item name='replays' label='Количество' labelAlign='left'>
                        <InputNumber
                            data-test-id={getDataTestIdWithIndex(
                                calendarTestId.modalActionDrawer.inputQuantity,
                                index,
                            )}
                            min={1}
                        />
                    </Form.Item>
                </div>
            </div>
        </Form>
    );
};
