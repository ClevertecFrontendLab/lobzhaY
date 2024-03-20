import { ReactNode, useEffect } from 'react';

import { history } from '../../../redux';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { removeNavData } from '../../../redux/slices/nav-slice';
import { useLazyGetExerciseQuery } from '../../../redux/exercise-api';
import { addUserExercisesData } from '../../../redux/slices/exercise-slice';
import { addModal } from '../../../redux/slices/modal-slice';

import { MenuItemsTypes } from '../../../constants/main-page/menu-text';
import { ROUTE_PATHS } from '../../../constants/route-paths/paths';
import { ModalWindowTypes } from '../../../constants/feedbacks-page/feedbacks-page';
import { hideLoader, showLoader } from '../../../redux/actions/loading-action';

type NavButtonWrapperType = {
    children: ReactNode;
};

export const NavButtonWrapperComponent: React.FC<NavButtonWrapperType> = ({ children }) => {
    const [trigger, { data: allUserExercises }] = useLazyGetExerciseQuery();

    const dispatch = useAppDispatch();
    const { typeNav } = useAppSelector((state) => state.navigation);

    useEffect(() => {
        switch (typeNav) {
            case MenuItemsTypes.Calendar:
               dispatch(showLoader());
                trigger({})
                    .unwrap()
                    .then((data) => {
                        dispatch(addUserExercisesData({ userExercises: data }));
                        history.push(ROUTE_PATHS.calendar);
                    })
                    .catch(() => {
                        dispatch(addModal({ type: ModalWindowTypes.ServerErrorExercise }));
                    })
                   .finally(() => dispatch(hideLoader()));
                dispatch(removeNavData());
                break;
            default:
                break;
        }
    }, [typeNav, dispatch, trigger]);

    useEffect(() => {
        if (allUserExercises) {
            dispatch(addUserExercisesData({ userExercises: allUserExercises }));
        }
    }, [allUserExercises, dispatch]);

    return children;
};
