import { Badge, BadgeProps } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';

import dayjs from 'dayjs';

import { useAppSelector } from '../../../hooks';

import { DrawerType } from '../../../constants/calendar/calendar-text';

export const DrawerTitleComponent: React.FC = () => {
    const { activeTraining, typeDrawer } = useAppSelector((state) => state.userExercises.drawer);
    const { activeDate: selectedDate } = useAppSelector((state) => state.userExercises)

    return (
        <>
            {typeDrawer === DrawerType.UpdateFuture ? (
                <div className='drawer-title-content'>
                    <EditOutlined />
                    <h6>Редактирование</h6>
                </div>
            ) : (
                <div className='drawer-title-content'>
                    <PlusOutlined />
                    <h6>Добавление упражнений</h6>
                </div>
            )}

            <div className='drawer-title-badge'>
                <Badge
                    color={activeTraining.color as BadgeProps['color']}
                    text={activeTraining.content}
                />
                <span className='drawer-title-date'>{(selectedDate as unknown as dayjs.Dayjs)?.format('DD.MM.YYYY')}</span>
            </div>
        </>
    );
};
