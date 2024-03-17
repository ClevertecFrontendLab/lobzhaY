import './calendar.scss';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import type {  CalendarProps } from 'antd';
import { Calendar, Drawer } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';
import 'dayjs/locale/ru';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { PostPutExerciseType } from '../../constants/api/api-types';
import { CeilComponent } from './ceil/ceil';
import { TrainingListKeys, colorStatusBadge } from '../../constants/calendar/calendar-text';
import { store } from '../../redux';
import { DrawerTitleComponent } from './drawer-title/drawer-title';
import {
    closeDrawer,
} from '../../redux/slices/exercise-slice';
import { DrawerBodyComponent } from './drawer-body/drawer-body';
import { calendarTestId } from '../../constants/data-test/data-test-id';
import { CloseOutlined } from '@ant-design/icons';

const getListData = (value: Dayjs, userExercises: PostPutExerciseType[]) => {
    const filteredVal = userExercises.filter((elem) => {
        const newDate = new Date(elem.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
        return newDate === value.format('MM/DD/YYYY');
    });

    const listData = filteredVal.map((elem: PostPutExerciseType) => {
        return { trainingId: elem._id, badge: colorStatusBadge[elem.name as TrainingListKeys]}
    });

    return listData || [];
};

export const CalendarComponent: React.FC = () => {
    const { userExercises, trainingList } = useAppSelector((state) => state.userExercises);
    const [isOpen, setIsOpen] = useState(false);
    const [trainingListError, setTrainingListError] = useState(false);

    useEffect(() => {
        setTrainingListError(!!trainingList.length);
    }, [trainingList]);

    const monthCellRender = (value: Dayjs) => {
        //!отображение данных месяца в ячейке
        const num = getMonthData(value);
        return num ? (
            <div className='notes-month'>
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };

    const customDateCellRender = (value: Dayjs) => {
        const listData = getListData(value, userExercises);
        return (
            <CeilComponent
                isOpen={isOpen}
                closeModal={setIsOpen}
                listData={listData}
                selectedDate={selectedDate}
                changeSelectedDate={setSelectedDate}
                ceilDate={value}
            />
        );
    };

    const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
        if (trainingListError) {
            if (info.type === 'date') return customDateCellRender(current);
            if (info.type === 'month') return monthCellRender(current);
            return info.originNode;
        } else {
            return null;
        }
    };

    const onDateChange: CalendarProps<Dayjs>['onSelect'] = (value, selectInfo) => {
        if (selectInfo.source === 'date') {
            setSelectedDate(value);
            setIsOpen(true);
        }
    };

    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>();

    const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
    const drawerRef = useRef(null);

    const dispatch = useAppDispatch();

    const handleCloseDrawer = useCallback(() => {
        dispatch(closeDrawer());
    }, [dispatch]);

    useEffect(() => {
        const unsubscribe = store.subscribe(() =>
            setIsOpenDrawer(store.getState().userExercises.drawer.isOpen),
        );

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target)) {
                handleCloseDrawer();
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [handleCloseDrawer]);



    return (
        <ConfigProvider locale={ruRU}>
            <div className='calendar-wrapper'>
                <Calendar cellRender={cellRender} onSelect={onDateChange} />
                <Drawer
                    title={<DrawerTitleComponent selectedDate={selectedDate} />}
                    placement='right'
                    width={500}
                    mask={false}
                    maskClosable={true}
                    open={isOpenDrawer}
                    onClose={handleCloseDrawer}
                    data-test-id={calendarTestId.modalActionDrawer.drawer}
                    closeIcon={
                        <CloseOutlined
                            data-test-id={calendarTestId.modalActionDrawer.buttonClose}
                        />
                    }
                >
                    <div ref={drawerRef}>
                        <DrawerBodyComponent
                            selectedDate={selectedDate}
                            isOpenDrawer={isOpenDrawer}
                        />
                    </div>
                </Drawer>
            </div>
        </ConfigProvider>
    );
};
