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
    confirmPassword: string;
};
