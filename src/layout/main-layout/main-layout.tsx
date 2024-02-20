import { useEffect, useState } from 'react';

import { Outlet } from 'react-router-dom';

import { Breakpoint, Button, Flex, Grid, Layout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import { MenuComponent } from '../../components/menu/menu';

import { siderButtonTestId } from '../../constants/data-test/data-test-id';

import './main-layout.scss';

export const MainLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(true);
    const [currentBreakpoint, setCurrentBreakpoint] = useState(siderButtonTestId.desktop);
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();

    useEffect(() => {
        catchBreakpoints(screens);
    }, [screens]);

    const catchBreakpoints = (screens: Partial<Record<Breakpoint, boolean>>) => {
        if (screens.xs) {
            setCurrentBreakpoint(siderButtonTestId.mobile);
        }
    };
    return (
        <Flex gap='middle' wrap='wrap'>
            <Layout className='main-wrapper' style={{ height: 'auto' }}>
                <div className='sider-container'>
                    <Sider
                        className='sider'
                        trigger={null}
                        collapsible
                        collapsed={collapsed}
                        collapsedWidth={
                            currentBreakpoint !== siderButtonTestId.mobile ? '64px' : '0'
                        }
                        defaultCollapsed={true}
                        width={currentBreakpoint === siderButtonTestId.mobile ? '106px' : '208px'}
                    >
                        <MenuComponent isCollapsed={collapsed} />
                    </Sider>

                    <div className='button-sider-position'>
                        <Button
                            type='text'
                            className='button-trigger-menu'
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            data-test-id={currentBreakpoint}
                        />
                    </div>
                </div>
                <Outlet></Outlet>
            </Layout>
        </Flex>
    );
};
