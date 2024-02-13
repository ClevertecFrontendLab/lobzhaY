import { HeartFilled, CalendarTwoTone, ProfileOutlined } from '@ant-design/icons';

export const cardsActionsText: string[] = [
    'С CleverFit ты сможешь:',
    '— планировать свои тренировки на календаре, выбирая тип и уровень нагрузки;',
    '— отслеживать свои достижения в разделе статистики, сравнивая свои результаты с нормами и рекордами;',
    '— создавать свой профиль, где ты можешь загружать свои фото, видео и отзывы о тренировках;',
    '— выполнять расписанные тренировки для разных частей тела, следуя подробным инструкциям и советам профессиональных тренеров.',
];
export const cardsLegacy: string =
    'CleverFit — это не просто приложение, а твой личный помощник в\n мире фитнеса. Не откладывай на завтра — начни тренироваться уже сегодня!';

export type ISmallCard = {
    main: string;
    footer: string;
};
export const smallCardType: ISmallCard = {
    main: 'main-page-card',
    footer: 'footer-small-card',
};

export type ICardsActionArr = {
    title: string;
    textButton: string;
    icon: React.ReactNode;
    type: string;
};
export const cardsActionsArr: ICardsActionArr[] = [
    {
        title: 'Расписать тренировки',
        textButton: 'Тренировки',
        icon: <HeartFilled className='button-action__icon-main' />,
        type: smallCardType.main,
    },
    {
        title: 'Назначить календарь',
        textButton: 'Календарь',
        icon: <CalendarTwoTone className='button-action__icon-main' />,
        type: smallCardType.main,
    },
    {
        title: 'Заполнить профиль',
        textButton: 'Профиль',
        icon: <ProfileOutlined className='button-action__icon-main' />,
        type: smallCardType.main,
    },
];

export const headerTitle = 'Приветствуем тебя в CleverFit — приложении, которое поможет тебе добиться своей мечты!';
