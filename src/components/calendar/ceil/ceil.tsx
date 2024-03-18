import { useEffect, useState } from 'react';

import { Badge, Popover } from 'antd';

import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isoWeek from 'dayjs/plugin/isoWeek';

import { useAppSelector } from '../../../hooks';

import { PopoverTitleComponent } from '../popover-title/popover-title';
import { PopoverBodyComponent } from '../popover-body/popover-body';

import {
    TrainingListKeys,
    TrainingListText,
    getColorStatusBadge,
    popoverPositionText,
} from '../../../constants/calendar/calendar-text';
import { PostPutExerciseType } from '../../../constants/api/api-types';

import { CeilComponentType } from './cell-type';

import './ceil.scss';

export const CeilComponent: React.FC<CeilComponentType> = ({
    isOpen,
    closeModal,
    listData,
    selectedDate,
    ceilDate,
}) => {
    dayjs.extend(isSameOrBefore);
    dayjs.extend(isoWeek);

    const { userExercises } = useAppSelector((state) => state.userExercises);

    const [isOpenCeil, setIsOpenCeil] = useState(false);
    const [createTraining, setCreateTraining] = useState(false);
    const [addTraining, setAddTraining] = useState(true);
    const [isFuture, setIsFuture] = useState(false);
    const [activeSelectTraining, setActiveSelectTraining] = useState<TrainingListText>();
    const [activeExercises, setActiveExercises] = useState<PostPutExerciseType[]>();
    const [popoverPosition, setPopoverPosition] = useState(popoverPositionText.Left);

    useEffect(() => {
        if (selectedDate?.isSame(ceilDate)) {
            setIsFuture(dayjs().isSameOrBefore(selectedDate));
        }
    }, [selectedDate, ceilDate]);

    useEffect(() => {
        setIsOpenCeil(selectedDate?.format('DD-MM-YYYY') === ceilDate.format('DD-MM-YYYY'));
    }, [selectedDate, ceilDate]);

    useEffect(() => {
        const active = listData.map((elem) => {
            return userExercises.filter(
                (item: PostPutExerciseType) => item._id === elem.trainingId,
            )[0];
        });
        setActiveExercises(active);
    }, [userExercises, listData]);

    useEffect(() => {
        if (selectedDate?.day() === 0) {
            setPopoverPosition(popoverPositionText.Right);
        } else {
            setPopoverPosition(popoverPositionText.Left);
        }
    }, [selectedDate]);

    return (
        <div className='cell-wrapper'>
            {isOpen === isOpenCeil && (
                <Popover
                    overlayStyle={{
                        zIndex: 6,
                        minHeight: addTraining ? '240px' : '200px',
                        maxHeight: '349px',
                    }}
                    overlayInnerStyle={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '100%',
                        width: '100%',
                        position: 'relative',
                        left: popoverPosition === popoverPositionText.Right ? '50px' : '0',
                    }}
                    title={
                        <PopoverTitleComponent
                            title={ceilDate.format('DD.MM.YYYY')}
                            closePopover={closeModal}
                            hasSubTitle={!!listData.length}
                            createTrainingBtn={createTraining}
                            changeCreateTraining={setCreateTraining}
                            activeSelect={activeSelectTraining}
                            changeActiveSelect={setActiveSelectTraining}
                            addTraining={addTraining}
                            isFuture={isFuture}
                        />
                    }
                    trigger='click'
                    arrow={false}
                    placement={popoverPosition}
                    content={
                        <PopoverBodyComponent
                            selectDate={selectedDate?.format('DD.MM.YYYY')}
                            listData={listData}
                            createTrainingBtn={createTraining}
                            changeCreateTraining={setCreateTraining}
                            trainingListUser={activeExercises}
                            activeSelect={activeSelectTraining}
                            changeActiveSelect={setActiveSelectTraining}
                            closeModal={closeModal}
                            isFuture={isFuture}
                            addTraining={addTraining}
                            changeAddTraining={setAddTraining}
                        />
                    }
                    open={isOpen && isOpenCeil}
                ></Popover>
            )}
            <div className='cell'>
                <ul className='events'>
                    {activeExercises?.map((elem) => (
                        <li key={elem._id}>
                            <Badge
                                color={getColorStatusBadge(elem.name as TrainingListKeys).color}
                                text={getColorStatusBadge(elem.name as TrainingListKeys).content}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
