import React, { useEffect, useState } from 'react';

import { HeaderComponent } from '../../components/header/header-component';
import { FooterComponent } from '../../components/footer/footer-component';

import './main-page.scss';
import { MenuComponent } from '../../components/menu/menu';
import { Breakpoint, Button, Flex, Grid, Layout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import {
    ICardsActionArr,
    cardsActionsArr,
    cardsActionsText,
    cardsLegacy,
} from '../../constants/main-page/main-page-text';
import { SmallCardComponent } from '../../components/main-page/small-card/small-card';
import { siderButtonTestId } from '../../constants/data-test/data-test-id';

const { useBreakpoint } = Grid;

export const MainPage: React.FC = () => {
    const [collapsed, setCollapsed] = useState(true);
    const [currentBreakpoint, setCurrentBreakpoint] = useState(siderButtonTestId.desktop);
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
        <>
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
                            width={
                                currentBreakpoint === siderButtonTestId.mobile ? '106px' : '208px'
                            }
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

                    <Layout className='main-container'>
                        <HeaderComponent></HeaderComponent>
                        <Content className='main-content-container'>
                            <div className='main-page__card-text'>
                                <div>
                                    {cardsActionsText.map((textItem: string, index) => (
                                        <p key={index}>{textItem}</p>
                                    ))}
                                </div>
                            </div>

                            <div className='main-page__card-text-wrapper'>
                                <div className='main-page__cards-legacy'>
                                    <h4>{cardsLegacy}</h4>
                                </div>
                                <div className='main-page__cards-action-wrapper'>
                                    {cardsActionsArr.map((cardsItem: ICardsActionArr, index) => (
                                        <SmallCardComponent
                                            key={`${cardsItem.textButton}-${index}`}
                                            itemSmallCard={cardsItem}
                                            itemType={cardsItem.type}
                                        />
                                    ))}
                                </div>
                            </div>
                        </Content>
                        <FooterComponent></FooterComponent>
                    </Layout>
                </Layout>
            </Flex>
        </>
    );
};
