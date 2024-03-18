import { useCallback, useEffect, useRef, useState } from 'react';

import { Calendar, Drawer, ConfigProvider } from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';
import type { CalendarProps } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import 'dayjs/locale/ru';

import { store } from '../../redux';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { closeDrawer } from '../../redux/slices/exercise-slice';

import { CeilComponent } from './ceil/ceil';
import { DrawerTitleComponent } from './drawer-title/drawer-title';
import { DrawerBodyComponent } from './drawer-body/drawer-body';

import { calendarTestId } from '../../constants/data-test/data-test-id';

import { getListData, monthCellRender } from './calendar-utils';

import './calendar.scss';

export const CalendarComponent: React.FC = () => {
    const dispatch = useAppDispatch();

    const { userExercises, trainingList } = useAppSelector((state) => state.userExercises);

    const drawerRef = useRef<HTMLDivElement>(null);

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [trainingListError, setTrainingListError] = useState(false);

    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>();

    useEffect(() => {
        setTrainingListError(!!trainingList.length);
    }, [trainingList]);

    useEffect(() => {
        const unsubscribe = store.subscribe(() =>
            setIsOpenDrawer(store.getState().userExercises.drawer.isOpen),
        );

        return () => {
            unsubscribe();
        };
    }, []);

    const handleCloseDrawer = useCallback(() => {
        dispatch(closeDrawer());
    }, [dispatch]);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (drawerRef.current && event.target instanceof Node && !drawerRef.current.contains(event.target)) {
                handleCloseDrawer();
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [handleCloseDrawer]);

    const customDateCellRender = (value: Dayjs) => {
        const listData = getListData(value, userExercises);
        return (
            <CeilComponent
                isOpen={isOpen}
                closeModal={setIsOpen}
                listData={listData}
                selectedDate={selectedDate}
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

    return (
        <ConfigProvider locale={ruRU}>
            <div className='calendar-wrapper'>
                <Calendar cellRender={cellRender} onSelect={onDateChange} />
                <Drawer
                    title={<DrawerTitleComponent selectedDate={selectedDate} />}
                    placement='right'
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
