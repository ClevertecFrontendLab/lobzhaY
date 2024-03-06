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

export type reviewsTestIdType = {
    mainPage: string,
    errorModal: string,
    newFeedbackModal: string,
    noReviews: string,
    reviewsPage: {
        writeReview: string,
        allReviewsButton: string,
    },
};

export type calendarTestIdType = {
    modalNoReview: string,
    modalErrorUserTraining: {
        title: string,
        subtitle: string,
        button: string,
        buttonClose: string,
    },
    buttonCalendar: string,
    modalActionTraining: {
        training: string,
        buttonClose: string,
        editButton: string,
    },
    modalActionCreate: {
        exercise: string,
        select: string,
        buttonClose: string,
    },
    modalActionDrawer: {
        drawer: string,
        buttonClose: string,
        inputExercise: string,
        checkboxExercise: string,
        inputApproach: string,
        inputWeight: string,
        inputQuantity: string,
    },
};
