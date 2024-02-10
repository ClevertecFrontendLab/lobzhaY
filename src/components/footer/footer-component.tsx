import React from 'react';

import { SmallCardComponent } from '../main-page/small-card/small-card';

import { Button } from 'antd';

import './footer-component.scss';

export const FooterComponent: React.FC = () => {
    return (
        <footer className='footer'>
            <div className='footer__extra'>
                <Button type='text' className='footer__button'>
                    <p>Смотреть отзывы</p>
                </Button>
            </div>
            <SmallCardComponent />
        </footer>
    );
};
