export type siderButtonTestIdType = {
    mobile: string;
    desktop: string;
};

export type loginTestIdType = {
    inputLogin: string;
    inputPassword: string;
    checkBoxRemember: string;
    buttonForgot: string;
    buttonSubmit: string;
};

export type registrationTestIdType = {
    inputLogin: string;
    inputPassword: string;
    inputConfirmPassword: string;
    buttonSubmit: string;
};

export type changePasswordTestIdType = {
    inputPassword: string;
    inputConfirmPassword: string;
    buttonSubmit: string;
};

export type resultsPagesTestIdType = {
    resultSuccess: string;
    resultError: string;
    resultErrorUserExist: string;
    resultErrorLogin: string;
    resultErrorCheckEmailNoExist: string;
    resultErrorCheckEmail: string;
    resultErrorChangePassword: string;
    resultSuccessChangePassword: string;
};
