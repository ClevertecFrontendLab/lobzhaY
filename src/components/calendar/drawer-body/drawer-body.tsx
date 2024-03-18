import { useEffect, useState } from 'react';

import { Button } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

import { Dayjs } from 'dayjs';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { savaDataFromDrawer } from '../../../redux/slices/exercise-slice';

import { DrawerFormComponent } from '../drawer-form/drawer-form';

import { ExercisesType } from '../../../constants/api/api-types';
import { DrawerType } from '../../../constants/calendar/calendar-text';

type DrawerBodyComponentType = {
    selectedDate: Dayjs | undefined;
    isOpenDrawer: boolean;
};

export const DrawerBodyComponent: React.FC<DrawerBodyComponentType> = ({
    selectedDate,
    isOpenDrawer,
}) => {
    const dispatch = useAppDispatch();

    const { activeTraining, typeDrawer, drawerTraining, isErrorResponse } = useAppSelector(
        (state) => state.userExercises.drawer,
    );

    const [formsData, setFormsData] = useState<ExercisesType[]>(
        drawerTraining.exercises || [
            { name: '', replays: 1, weight: 0, approaches: 1, isImplementation: false },
        ],
    );
    const [prevFormsData, setPrevFormsData] = useState<ExercisesType[]>(
        drawerTraining.exercises || [],
    );
    const [deleteFormDisabled, setDeleteFormDisabled] = useState(true);

    useEffect(() => {
        if (isErrorResponse) {
            setFormsData(() => prevFormsData);
        } else {
            setPrevFormsData(formsData);
        }
    }, [isErrorResponse, formsData, prevFormsData]);

    useEffect(() => {
        if (typeDrawer === DrawerType.UpdateFuture) {
            setFormsData(() => {
                return drawerTraining.exercises;
            });
        }
    }, [typeDrawer, drawerTraining.exercises]);

    useEffect(() => {
        if (!isOpenDrawer) {
            const formsWithData = formsData?.filter((form) => form.name.trim() !== '');
            if (formsWithData.length > 0) {
                dispatch(
                    savaDataFromDrawer({
                        trainingName: activeTraining.content,
                        trainingDate: selectedDate?.toISOString(),
                        training: formsData,
                        trainingId: drawerTraining._id,
                    }),
                );
            }

            if (typeDrawer !== DrawerType.UpdateFuture) {
                setFormsData([
                    { name: '', replays: 1, weight: 0, approaches: 1, isImplementation: false },
                ]);
            }
        }
    }, [
        isOpenDrawer,
        dispatch,
        activeTraining,
        drawerTraining,
        formsData,
        selectedDate,
        typeDrawer,
    ]);

    const addForm = () => {
        setFormsData([
            ...formsData,
            { name: '', replays: 1, weight: 0, approaches: 1, isImplementation: false },
        ]);
    };

    const handleFormChange = (index: number, value: ExercisesType) => {
        const updatedFormsData = [...formsData];
        updatedFormsData[index] = value;
        setFormsData(updatedFormsData);

        if (value.isImplementation) {
            setDeleteFormDisabled(false);
        }
    };

    const handleDeleteForm = () => {
        setFormsData((prev) => {
            const filterArr = prev.filter((elem) => !elem.isImplementation);
            return filterArr;
        });

        setDeleteFormDisabled(true);
    };

    return (
        <>
            <div className='drawer-form-content'>
                {formsData.map((elem, index) => (
                    <DrawerFormComponent
                        key={index}
                        index={index}
                        formData={elem}
                        onChange={handleFormChange}
                        isOpenDrawer={isOpenDrawer}
                    />
                ))}
            </div>
            <div className='drawer-body-action'>
                <Button onClick={addForm} type='text' className='action-add'>
                    <PlusOutlined /> Добавить ещё
                </Button>
                {typeDrawer === DrawerType.UpdateFuture && (
                    <Button
                        disabled={deleteFormDisabled}
                        onClick={handleDeleteForm}
                        className='action-remove'
                        type='text'
                    >
                        <MinusOutlined />
                        Удалить
                    </Button>
                )}
            </div>
        </>
    );
};
