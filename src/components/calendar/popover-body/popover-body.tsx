import { useEffect, useState } from 'react';

import { Badge, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import { store } from '../../../redux';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
    checkErrorResponse,
    closeDrawer,
    openDrawer,
    removeDataFromDrawer,
    savaDataFromDrawer,
} from '../../../redux/slices/exercise-slice';
import { usePostExerciseMutation, usePutExerciseMutation } from '../../../redux/exercise-api';

import { PostPutExerciseType } from '../../../constants/api/api-types';
import {
    DrawerType,
    TrainingListKeys,
    TrainingListText,
    colorStatusBadge,
    getColorStatusBadge,
} from '../../../constants/calendar/calendar-text';
import { getDataTestIdWithIndex } from '../../../constants/data-test/utils-data-test-id/utils';
import { calendarTestId } from '../../../constants/data-test/data-test-id';

import { showDeleteConfirm } from './popover-body-utils';

import { PopoverBodyComponentType } from './popover-body-type';

import emptyExerciseList from '../../../assets/calendar/empty-exercises.svg';

export const PopoverBodyComponent: React.FC<PopoverBodyComponentType> = ({
    listData,
    trainingListUser,
    activeSelect,
    createTrainingBtn,
    changeCreateTraining,
    selectDate,
    closeModal,
    isFuture,
    changeActiveSelect,
    addTraining,
    changeAddTraining,
}) => {
    const dispatch = useAppDispatch();
  
    const { trainingList, userExercises } = useAppSelector((state) => state.userExercises);
    const { drawerTraining, typeDrawer } = useAppSelector((state) => state.userExercises.drawer);

    const [postExercise] = usePostExerciseMutation();
    const [putExercise] = usePutExerciseMutation();

    const [activeExercises, setActiveExercises] = useState<PostPutExerciseType>();

    useEffect(() => {
        const activeExercises = userExercises.filter(
            (elem: PostPutExerciseType) => new Date(elem.date).toLocaleDateString() === selectDate,
        );
        const activeFilterExercises = activeExercises.filter((elem: PostPutExerciseType) => elem.name === activeSelect);
        setActiveExercises(activeFilterExercises[0]);
    }, [activeSelect, selectDate, userExercises]);

    useEffect(() => {
        const unsubscribe = store.subscribe(() =>
            setActiveExercises(() => {
                const training = store.getState().userExercises.drawer.drawerTraining;
                if (training.exercises.length !== 0) {
                    return training;
                }
            }),
        );

        return () => {
            unsubscribe();
        };
    }, [drawerTraining]);

    const handleChangeTrainingBtn = () => {
        changeCreateTraining(true);
    };

    const handleAddExercises = () => {
        dispatch(
            openDrawer({
                activeSelect: colorStatusBadge[activeSelect as TrainingListKeys],
                typeDrawer: DrawerType.Create,
            }),
        );
    };

    const handleSaveExercises = () => {
        if (activeExercises && typeDrawer === DrawerType.Create) {
            postExercise(activeExercises)
                .unwrap()
                .then(() => {
                    changeCreateTraining(false);
                })
                .catch(() => {
                    showDeleteConfirm(handleCloseModal);
                    closeModal(false);
                });
        }
        if (activeExercises && typeDrawer === DrawerType.UpdateFuture && isFuture) {
            putExercise({
                id: activeExercises._id as string,
                body: {
                    name: activeExercises.name,
                    date: activeExercises.date,
                    exercises: activeExercises.exercises,
                },
            })
                .unwrap()
                .then(() => {
                    changeCreateTraining(false);
                    dispatch(checkErrorResponse(false));
                })
                .catch(() => {
                    showDeleteConfirm(handleCloseModal);
                    closeModal(false);
                    dispatch(checkErrorResponse(true));
                });
        }

        if (activeExercises && typeDrawer === DrawerType.UpdateFuture && !isFuture) {
            putExercise({
                id: activeExercises._id as string,
                body: {
                    name: activeExercises.name,
                    date: activeExercises.date,
                    exercises: activeExercises.exercises,
                    isImplementation: true,
                },
            })
                .unwrap()
                .then(() => {
                    changeCreateTraining(false);
                    dispatch(checkErrorResponse(false));
                })
                .catch(() => {
                    showDeleteConfirm(handleCloseModal);
                    closeModal(false);
                    dispatch(checkErrorResponse(true));
                });
        }
    };

    const handleCloseModal = () => {
        changeCreateTraining(false);
        changeActiveSelect(TrainingListText.Null);
        dispatch(removeDataFromDrawer());
        dispatch(closeDrawer());
        setActiveExercises(undefined);
    };

    const handleUpdateExercises = (itemContent: TrainingListText) => {
        changeAddTraining(false);
        changeCreateTraining(true);
        changeActiveSelect(itemContent);
    };

    const handleUpdateWithDrawer = (/* item */) => {
        dispatch(
            openDrawer({
                activeSelect: colorStatusBadge[activeSelect as TrainingListKeys],
                typeDrawer: DrawerType.UpdateFuture,
            }),
        );
        dispatch(
            savaDataFromDrawer({
                trainingName: activeExercises?.name,
                trainingDate: activeExercises?.date,
                training: activeExercises?.exercises,
                trainingId: activeExercises?._id,
            }),
        );
    };

    return (
        <div
            data-test-id={
                !createTrainingBtn
                    ? calendarTestId.modalActionTraining.training
                    : calendarTestId.modalActionCreate.exercise
            }
            className={createTrainingBtn ? 'popover-body-drawer' : ''}
        >
            <div className='list-body'>
                {createTrainingBtn ? (
                    !!activeExercises?.exercises.length || !addTraining ? (
                        <ul className='list-body-drawer'>
                            {activeExercises?.exercises.map((item, index) => (
                                <li key={item.name}>
                                    {item.name}{' '}
                                    <EditOutlined
                                        onClick={() => handleUpdateWithDrawer(item)}
                                        data-test-id={getDataTestIdWithIndex(
                                            calendarTestId.modalActionTraining.editButton,
                                            index,
                                        )}
                                    />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className='empty-training'>
                            <img src={emptyExerciseList} alt='No active training' />
                        </div>
                    )
                ) : trainingListUser.length ? (
                    <ul>
                        {trainingListUser.map((item: PostPutExerciseType, index) => (
                            <li
                                key={index}
                                className={
                                    item.isImplementation
                                        ? 'active-implementation'
                                        : 'inactive-implementation'
                                }
                            >
                                <Badge
                                    color={getColorStatusBadge(item.name as TrainingListKeys).color}
                                    text={
                                        getColorStatusBadge(item.name as TrainingListKeys).content
                                    }
                                />
                                <button
                                    onClick={() =>
                                        handleUpdateExercises(item.name as TrainingListText)
                                    }
                                    data-test-id={getDataTestIdWithIndex(
                                        calendarTestId.modalActionTraining.editButton,
                                        index,
                                    )}
                                    disabled={item.isImplementation}
                                >
                                    <EditOutlined />
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className='empty-training'>
                        <img src={emptyExerciseList} alt='No active training' />
                    </div>
                )}
            </div>
            <span className='actions'>
                {createTrainingBtn ? (
                    <>
                        <Button
                            disabled={!activeSelect || activeSelect === TrainingListText.Null}
                            onClick={handleAddExercises}
                        >
                            Добавить упражнения
                        </Button>
                        <Button
                            type='text'
                            disabled={
                                !activeExercises ||
                                !activeSelect ||
                                activeSelect === TrainingListText.Null ||
                                !activeExercises?.exercises.length
                            }
                            onClick={handleSaveExercises}
                        >
                            {isFuture ? ' Сохранить' : 'Сохранить изменения'}
                        </Button>
                    </>
                ) : (
                    <Button
                        disabled={!isFuture || trainingList.length <= listData.length}
                        className='create'
                        type='primary'
                        onClick={handleChangeTrainingBtn}
                    >
                        Создать тренировку
                    </Button>
                )}
            </span>
        </div>
    );
};
