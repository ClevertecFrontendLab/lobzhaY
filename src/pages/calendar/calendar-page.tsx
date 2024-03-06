import { Layout } from 'antd';
import { BreadcrumbComponent, ModalWindowComponent } from '../../components';
import { Content } from 'antd/es/layout/layout';

import './calendar-page.scss';

const CalendarPage: React.FC = () => {
    return (
        <Layout className='main-container'>
            <BreadcrumbComponent />
            <ModalWindowComponent />
            <Content className='calendar-content-container'></Content>
        </Layout>
    );
};

export default CalendarPage;
