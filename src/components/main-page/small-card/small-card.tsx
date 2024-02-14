import React from 'react';

import { Button } from 'antd';
import { AndroidFilled, AppleFilled } from '@ant-design/icons';

import './small-card.scss';
import { ICardsActionArr, smallCardType } from '../../../constants/main-page/main-page-text';

interface ISmallCardProps {
    itemType: string;
    itemSmallCard?: ICardsActionArr;
}

export const SmallCardComponent: React.FC<ISmallCardProps> = ({ itemType, itemSmallCard }) => {
    return (
        <>
            {itemType === smallCardType.footer ? (
                <>
                    <div className='footer-card small-card'>
                        <div className='small-card__header'>
                            <a href='#' className='footer-card__link'>
                                Скачать на телефон
                            </a>
                            <p>Доступно в PRO-тарифе</p>
                        </div>
                        <div className='footer-card__actions-wrapper'>
                            <div className='footer-card__action'>
                                <Button
                                    type='text'
                                    shape='default'
                                    size='middle'
                                    className='button-action-wrapper'
                                >
                                    <AndroidFilled className='button-action__icon' />
                                    <p>Android OS</p>
                                </Button>
                            </div>
                            <div className='footer-card__action'>
                                <Button
                                    type='text'
                                    shape='default'
                                    size='middle'
                                    className='button-action-wrapper'
                                >
                                    <AppleFilled className='button-action__icon' />
                                    <p>Apple iOS</p>
                                </Button>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className='footer-card small-card small-card__adaptive'>
                        <div className='small-card__header-main'>
                            <p>{itemSmallCard?.title}</p>
                        </div>
                        <div className='small-card__main-actions-wrapper'>
                            <Button
                                type='link'
                                shape='default'
                                size='middle'
                                className='button-action-wrapper-small'
                            >
                                {itemSmallCard?.icon}
                                <p>{itemSmallCard?.textButton}</p>
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};
