import { Badge, BadgeProps } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';

import { Dayjs } from 'dayjs';

import { useAppSelector } from '../../../hooks';

import { DrawerType } from '../../../constants/calendar/calendar-text';

type DrawerTitleComponentType = {
    selectedDate: Dayjs | undefined;
};

export const DrawerTitleComponent: React.FC<DrawerTitleComponentType> = ({ selectedDate }) => {
    const { activeTraining, typeDrawer } = useAppSelector((state) => state.userExercises.drawer);

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
                <span className='drawer-title-date'>{selectedDate?.format('DD.MM.YYYY')}</span>
            </div>
        </>
    );
};
