import React from 'react';

import { HeaderComponent } from '../../components/header/header-component';
import { FooterComponent } from '../../components/footer/footer-component';

import './main-page.scss';

export const MainPage: React.FC = () => {

    return (
        <>
           <HeaderComponent></HeaderComponent>
           <FooterComponent></FooterComponent>
        </>
    );
};
