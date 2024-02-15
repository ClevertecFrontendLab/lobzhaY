import {
    siderButtonTestIdType,
    loginTestIdType,
    registrationTestIdType,
    changePasswordTestIdType,
    resultsPagesTestIdType,
} from './data-test-id-types';

export const siderButtonTestId: siderButtonTestIdType = {
    mobile: 'sider-switch-mobile',
    desktop: 'sider-switch',
};

export const loaderTestId = 'loader';

export const loginTestId: loginTestIdType = {
    inputLogin: 'login-email',
    inputPassword: 'login-password',
    checkBoxRemember: 'login-remember',
    buttonForgot: 'login-forgot-button',
    buttonSubmit: 'login-submit-button',
};

export const registrationTestId: registrationTestIdType = {
    inputLogin: 'registration-email',
    inputPassword: 'registration-password',
    inputConfirmPassword: 'registration-confirm-password',
    buttonSubmit: 'registration-submit-button',
};

export const changePasswordTestId: changePasswordTestIdType = {
    inputPassword: 'change-password',
    inputConfirmPassword: 'change-confirm-password',
    buttonSubmit: 'change-submit-button',
};

export const confirmEmailTestId = 'verification-input';

export const resultsPagesTestId: resultsPagesTestIdType = {
    resultSuccess: 'registration-enter-button',
    resultError: 'registration-retry-button',
    resultErrorUserExist: 'registration-back-button',
    resultErrorLogin: 'login-retry-button',
    resultErrorCheckEmailNoExist: 'check-retry-button',
    resultErrorCheckEmail: 'check-back-button',
    resultErrorChangePassword: 'change-retry-button',
    resultSuccessChangePassword: 'change-entry-button',
};
