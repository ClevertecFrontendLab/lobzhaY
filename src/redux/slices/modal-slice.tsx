import { createSlice } from '@reduxjs/toolkit';
import { ModalWindowTypes } from '../../constants/feedbacks-page/feedbacks-page';

const initialState = {
    isOpen: false,
    type: ModalWindowTypes.Feedback,
    repeatFeedback: {
        isRepeat: false,
        repeatVal: {
            rating: 0,
            message: '',
        },
    },
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        addModal: (state, action) => {
            state.isOpen = true;
            state.type = action.payload.type;

            if (
                action.payload.hasOwnProperty('isRepeat') &&
                action.payload.hasOwnProperty('repeatVal')
            ) {
                state.repeatFeedback.isRepeat = action.payload.isRepeat;
                state.repeatFeedback.repeatVal = action.payload.repeatVal;
            } else {
                state.repeatFeedback.isRepeat = false;
                state.repeatFeedback.repeatVal = {
                    rating: 0,
                    message: '',
                };
            }
        },
        removeModal: (state) => {
            state.isOpen = false;
        },
    },
});

export const { addModal, removeModal } = modalSlice.actions;

export default modalSlice.reducer;
