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

export type GetExerciseType = {
    _id: string;
    name: string;
    date: string;
    isImplementation: boolean;
    userId: string;
    parameters: ExercisesParametersType;
    exercises: ExercisesType[];
};

export type PostPutExerciseType = {
    _id?: string;
    name: string;
    date: string;
    isImplementation?: boolean;
    parameters?: ExercisesParametersType;
    exercises: ExercisesType[];
};

export type ExercisesParametersType = {
    repeat: boolean;
    period: number;
    jointTraining: boolean;
    participants: string[];
};

export type ExercisesType = {
    _id?: string;
    name: string;
    replays: number;
    weight: number;
    approaches: number;
    isImplementation: boolean;
};

export type GetTrainingListType = TrainingListItemType[];

export type TrainingListItemType = {
    name: string;
    key: string;
};
