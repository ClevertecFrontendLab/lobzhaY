export type AuthBodyType = {
    email: string;
    password: string;
};

export type ConfirmEmailBodyType = {
    email: string;
    code: string;
};

export type ChangePasswordBodyType = {
    password: string;
    confirmPassword?: string;
    ['password-repeat']?: string;
};

export type FeedbackType = {
    id: string;
    fullName: null | string;
    imageSrc: null | string;
    message: null | string;
    rating: number;
    createdAt: string;
};

export type PostFeedbackType = {
    message: string;
    rating: number;
};
