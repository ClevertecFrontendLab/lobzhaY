import { useEffect, useState } from 'react';

import { Button } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

import dayjs from 'dayjs';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
    addDataFromDrawer,
    checkErrorResponse
} from '../../../redux/slices/exercise-slice';

import { DrawerFormComponent } from '../drawer-form/drawer-form';

import { ExercisesType, PostPutExerciseType } from '../../../constants/api/api-types';
import { DrawerType } from '../../../constants/calendar/calendar-text';
import { store } from '../../../redux';

type DrawerBodyComponentType = {
    isOpenDrawer: boolean;
};

export const DrawerBodyComponent: React.FC<DrawerBodyComponentType> = ({ isOpenDrawer }) => {
    const dispatch = useAppDispatch();

    const { activeTraining, typeDrawer } = useAppSelector((state) => state.userExercises.drawer);
    const {
        allTrainings,
        userExercises,
        activeDate: selectedDate,
        activeTrainingId,
    } = useAppSelector((state) => state.userExercises);

    const getTrainingsById = () => {
        const activeTraining = allTrainings.filter(
            (elem: PostPutExerciseType) => elem._id === activeTrainingId,
        )[0];
        return (activeTraining as PostPutExerciseType)
            ? (activeTraining as PostPutExerciseType).exercises
            : [{ name: '', replays: 1, weight: 0, approaches: 1, isImplementation: false }];
    };

    const [formsData, setFormsData] = useState<ExercisesType[]>(getTrainingsById());

    const [deleteFormDisabled, setDeleteFormDisabled] = useState(true);
    const [isErrorResponse, setIsErrorResponse] = useState(false);

    const [prevFormsData, setPrevFormsData] = useState<ExercisesType[]>();

    useEffect(() => {
        const unsubscribe = store.subscribe(() =>
            setIsErrorResponse(() => store.getState().userExercises.drawer.isErrorResponse),
        );

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (isErrorResponse) {
            const prevExercises = userExercises.filter(
                (elem: PostPutExerciseType) => elem._id === activeTrainingId,
            )[0];

            setFormsData(() =>
                prevExercises ? (prevExercises as PostPutExerciseType).exercises : [],
            );
            dispatch(checkErrorResponse(false));
        } else {
            setPrevFormsData(formsData);
        }
    }, [isErrorResponse, formsData, prevFormsData, activeTrainingId, dispatch, userExercises]);

    useEffect(() => {
        if (typeDrawer === DrawerType.UpdateFuture) {
            setFormsData(() => {
                return (allTrainings as unknown as PostPutExerciseType[])[0].exercises;
            });
        }
    }, [typeDrawer, allTrainings]);

    useEffect(() => {
        if (!isOpenDrawer) {
            const formsWithData = formsData?.filter((form) => form.name.trim() !== '');
            if (formsWithData.length > 0) {
                dispatch(
                    addDataFromDrawer({
                        trainingName: activeTraining.content,
                        trainingDate: (selectedDate as unknown as dayjs.Dayjs)?.toISOString(),
                        training: formsData,
                        trainingId: activeTrainingId,
                        updateKey: DrawerType.UpdateFuture
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
        formsData,
        selectedDate,
        typeDrawer,
        activeTrainingId,
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
