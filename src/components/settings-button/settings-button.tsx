import { Button } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

import './settings-button.scss';

export const SettingsButtonComponent: React.FC = () => {
    return (
        <Button type='text' shape='default' size='middle' className='button-wrapper'>
            <SettingOutlined className='extra__icon' />
            <p>Настройки</p>
        </Button>
    );
};
