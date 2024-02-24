import { LoginComponent, RegistrationComponent } from '../../components/auth';

export const confirmEmailTitle = `Введите код для восстановления аккауанта`;
export const confirmEmailTitleError = `Неверный код. Введите код для восстановления аккауанта`;

export const confirmEmailTextInfo = `Не пришло письмо? Проверьте папку Спам.`;

export const changePasswordTitle = `Восстановление аккауанта`;
export const changePasswordInputHelp = `Пароль не менее 8 символов, с заглавной буквой и цифрой`;
export const changePasswordInputPlaceholder = 'Новый пароль';
export const changePasswordInputPlaceholderRepeat = 'Повторите пароль';
export const changePasswordButton = 'Сохранить';
export const changePasswordInputError = 'Пароли не совпадают';

export const authTabs = {
    label: {
        login: 'Вход',
        registration: 'Регистрация',
    },
    children: {
        login: <LoginComponent />,
        registration: <RegistrationComponent />,
    },
};
