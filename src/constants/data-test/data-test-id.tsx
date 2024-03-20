import {
    siderButtonTestIdType,
    loginTestIdType,
    registrationTestIdType,
    changePasswordTestIdType,
    resultsPagesTestIdType,
    reviewsTestIdType,
    calendarTestIdType,
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

export const reviewsTestId: reviewsTestIdType = {
    mainPage: 'see-reviews',
    errorModal: 'write-review-not-saved-modal',
    newFeedbackModal: 'new-review-submit-button',
    noReviews: 'write-review',
    reviewsPage: {
        writeReview: 'write-review',
        allReviewsButton: 'all-reviews-button',
    },
};

export const calendarTestId: calendarTestIdType = {
    modalNoReview: 'modal-no-review',
    modalErrorUserTraining: {
        title: 'modal-error-user-training-title',
        subtitle: 'modal-error-user-training-subtitle',
        button: 'modal-error-user-training-button',
        buttonClose: 'modal-error-user-training-button-close',
    },
    buttonCalendar: 'menu-button-calendar',
    modalActionTraining: {
        training: 'modal-create-training',
        buttonClose: 'modal-create-training-button-close',
        editButton: 'modal-update-training-edit-button',
    },
    modalActionCreate: {
        exercise: 'modal-create-exercise',
        select: 'modal-create-exercise-select',
        buttonClose: 'modal-exercise-training-button-close',
    },
    modalActionDrawer: {
        drawer: 'modal-drawer-right',
        buttonClose: 'modal-drawer-right-button-close',
        inputExercise: 'modal-drawer-right-input-exercise',
        checkboxExercise: 'modal-drawer-right-checkbox-exercise',
        inputApproach: 'modal-drawer-right-input-approach',
        inputWeight: 'modal-drawer-right-input-weight',
        inputQuantity: 'modal-drawer-right-input-quantity',
    },
}; 
