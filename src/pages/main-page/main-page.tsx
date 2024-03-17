import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';

import { FooterComponent, HeaderComponent, SmallCardComponent } from '../../components';

import {
    ICardsActionArr,
    cardsActionsArr,
    cardsActionsText,
    cardsLegacy,
} from '../../constants/main-page/main-page-text';

import './main-page.scss';

const MainPage: React.FC = () => {
    return (
        <>
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
                                    testId={cardsItem.testId}
                                />
                            ))}
                        </div>
                    </div>
                </Content>

                <FooterComponent></FooterComponent>
            </Layout>
        </>
    );
};

export default MainPage;
