type BreadcrumbItemsType = {
    path: string;
    title: string;
    children?: BreadcrumbItemType[];
};

type BreadcrumbItemType = {
    path: string;
    title: string;
};

export const breadcrumbItems: BreadcrumbItemsType[] = [
    {
        path: '/main',
        title: 'Главная',
        children: [
            {
                path: '/feedbacks',
                title: 'Отзывы пользователей',
            },
            {
                path: '/calendar',
                title: 'Календарь',
            },
        ],
    },
];
