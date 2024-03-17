import { ArrowLeftOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Select } from 'antd';
import { useAppSelector } from '../../../hooks';
import { useEffect, useState } from 'react';
import { TrainingListText } from '../../../constants/calendar/calendar-text';
import { calendarTestId } from '../../../constants/data-test/data-test-id';

type PopoverTitleComponentType = {
    title: string;
    closePopover: (isOpen: boolean) => void;
    hasSubTitle: boolean;
    createTrainingBtn: boolean;
    changeCreateTraining: (isCreate: boolean) => void;
    changeActiveSelect: (activeSelect: TrainingListText) => void;
    addTraining: boolean;
    activeSelect: TrainingListText;
    isFuture: boolean;
};
export const PopoverTitleComponent: React.FC<PopoverTitleComponentType> = ({
    title,
    closePopover,
    hasSubTitle,
    createTrainingBtn,
    changeCreateTraining,
    changeActiveSelect,
    addTraining,
    activeSelect,
    isFuture,
}) => {
    const handleClosePopover = (e) => {
        e.stopPropagation();
        closePopover(false);
    };

    const { trainingList, userExercises } = useAppSelector((state) => state.userExercises);

    const [selectTrainingList, setSelectTrainingList] = useState();

    useEffect(() => {
        const activeExercises = userExercises.filter(
            (elem) => new Date(elem.date).toLocaleDateString() === title,
        );
        if (isFuture) {
            const newSelect = trainingList.filter((elem) => {
                return !activeExercises.some((item) => elem.name === item.name);
            });

            setSelectTrainingList(newSelect);
        } else {
            const newSelect = activeExercises.filter((elem) => {
               return !elem.isImplementation
            });

            setSelectTrainingList(newSelect);
        }
    }, [userExercises, isFuture, title, trainingList]);

    const handleChange = (value: string) => {
        changeActiveSelect(value);
    };

    return (
        <>
            {createTrainingBtn ? (
                <div>
                    <ArrowLeftOutlined
                        data-test-id={calendarTestId.modalActionCreate.buttonClose}
                        onClick={() => changeCreateTraining(false)}
                    />
                    <Select
                        data-test-id={calendarTestId.modalActionCreate.select}
                        defaultValue={addTraining ? TrainingListText.Null : activeSelect}
                        style={{ width: 120 }}
                        onChange={handleChange}
                        options={selectTrainingList?.map((elem: { name: TrainingListText }) => ({
                            value: elem.name,
                            label: elem.name,
                        }))}
                    />
                </div>
            ) : (
                <>
                    <div className='popover-title-active'>
                        <h6>Тренировки на {title}</h6>
                        {hasSubTitle || <p>Нет активный тренировок</p>}
                    </div>
                    <Button>
                        <CloseOutlined
                            onClick={handleClosePopover}
                            data-test-id={calendarTestId.modalActionTraining.buttonClose}
                        />
                    </Button>
                </>
            )}
        </>
    );
};
