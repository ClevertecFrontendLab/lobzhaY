import { Badge, Button, Modal } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useEffect, useState } from 'react';
import emptyExerciseList from '../../../assets/calendar/empty-exercises.svg';
import { LiteralUnion } from 'antd/es/_util/type';
import { CloseCircleOutlined, EditOutlined } from '@ant-design/icons';
import { PostPutExerciseType } from '../../../constants/api/api-types';
import {
    checkErrorResponse,
    closeDrawer,
    openDrawer,
    removeDataFromDrawer,
    savaDataFromDrawer,
} from '../../../redux/slices/exercise-slice';
import {
    DrawerType,
    TrainingListKeys,
    TrainingListText,
    colorStatusBadge,
    getColorStatusBadge,
} from '../../../constants/calendar/calendar-text';
import { store } from '../../../redux';
import { usePostExerciseMutation, usePutExerciseMutation } from '../../../redux/exercise-api';
import { getDataTestIdWithIndex } from '../../../constants/data-test/utils-data-test-id/utils';
import { calendarTestId } from '../../../constants/data-test/data-test-id';

type PopoverBodyComponentType = {
    listData: {
        trainingId: string;
        badge: {
            color:
                | LiteralUnion<
                      | 'blue'
                      | 'purple'
                      | 'cyan'
                      | 'green'
                      | 'magenta'
                      | 'pink'
                      | 'red'
                      | 'orange'
                      | 'yellow'
                      | 'volcano'
                      | 'geekblue'
                      | 'lime'
                      | 'gold'
                  >
                | undefined;
            content: string;
        };
    }[];
    createTrainingBtn: boolean;
    changeCreateTraining: (isCreate: boolean) => void;
    trainingListUser: [];
    activeSelect: TrainingListText;
    selectDate: string | undefined;
    closeModal: (isOpen: boolean) => void;
    isFuture: boolean;
    changeActiveSelect: (activeSelect: TrainingListText) => void;
    addTraining: boolean;
    changeAddTraining: (addTraining: boolean) => void;
};
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
    const { trainingList, userExercises } = useAppSelector((state) => state.userExercises);
    const { drawerTraining, typeDrawer } = useAppSelector((state) => state.userExercises.drawer);

    const [postExercise] = usePostExerciseMutation();
    const [putExercise] = usePutExerciseMutation();

    const dispatch = useAppDispatch();

    const [activeExercises, setActiveExercises] = useState<PostPutExerciseType>();

    const handleChangeTrainingBtn = () => {
        changeCreateTraining(true);
    };

    const handleAddExercises = () => {
        dispatch(
            openDrawer({
                activeSelect: colorStatusBadge[activeSelect as TrainingListText],
                typeDrawer: DrawerType.Create,
            }),
        );
    };

    useEffect(() => {
        const activeExercises = userExercises.filter(
            (elem) => new Date(elem.date).toLocaleDateString() === selectDate,
        );
        const activeFilterExercises = activeExercises.filter((elem) => elem.name === activeSelect);
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

    const handleSaveExercises = () => {
        if (activeExercises && typeDrawer === DrawerType.Create) {
            postExercise(activeExercises)
                .unwrap()
                .then(() => {
                    changeCreateTraining(false);
                })
                .catch(() => {
                    showDeleteConfirm();
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
                    showDeleteConfirm();
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
                    showDeleteConfirm();
                    closeModal(false);
                    dispatch(checkErrorResponse(true));
                });
        }
    };

    const { confirm } = Modal;

    const handleCloseModal = () => {
        changeCreateTraining(false);
        changeActiveSelect(TrainingListText.Null);

        dispatch(removeDataFromDrawer());
        dispatch(closeDrawer());
        setActiveExercises(undefined);
    };

    const showDeleteConfirm = () => {
        confirm({
            title: (
                <h6 data-test-id={calendarTestId.modalErrorUserTraining.title}>
                    При сохранении данных произошла ошибка
                </h6>
            ),
            centered: true,
            icon: (
                <CloseCircleOutlined
                    data-test-id={calendarTestId.modalErrorUserTraining.buttonClose}
                />
            ),
            content: (
                <p data-test-id={calendarTestId.modalErrorUserTraining.subtitle}>
                    Придётся попробовать ещё раз
                </p>
            ),
            cancelText: 'Закрыть',
            closable: false,
            okButtonProps: { style: { display: 'none' } },
            cancelButtonProps: { 'data-test-id': calendarTestId.modalErrorUserTraining.button },
            wrapClassName: 'confirm-modal',
            onCancel() {
                handleCloseModal();
            },
        });
    };

    const handleUpdateExercises = (itemContent: TrainingListText) => {
        changeAddTraining(false);
        changeCreateTraining(true);
        changeActiveSelect(itemContent);
    };

    const handleUpdateWithDrawer = (/* item */) => {
        dispatch(
            openDrawer({
                activeSelect: colorStatusBadge[activeSelect as TrainingListText],
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
