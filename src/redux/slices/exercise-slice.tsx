import { createSlice } from '@reduxjs/toolkit';
import { DrawerType } from '../../constants/calendar/calendar-text';

const initialState = {
    userExercises: [],
    trainingList: [],
    drawer: {
      isOpen: false,
      typeDrawer: DrawerType.Create,
      activeTraining: {},
      isErrorResponse: false,
      drawerTraining:  {
        name: '',
        date: '',
        _id: '',
        exercises: []
      } 
    }
};

const userExercisesSlice = createSlice({
  name: 'userExercises',
  initialState,
  reducers: {
    addUserExercisesData: (state, action) => {
      state.userExercises = action.payload.userExercises;
    },
    addTrainingListData: (state, action) => {
      state.trainingList = action.payload.trainingList;
    },
    openDrawer: (state, action) => {
      state.drawer.isOpen = true;
      state.drawer.typeDrawer = action.payload.typeDrawer;
      state.drawer.activeTraining = action.payload.activeSelect
    },
    closeDrawer: (state) => {
      state.drawer.isOpen = false;
    },
    checkErrorResponse: (state, action) => {
      state.drawer.isErrorResponse = action.payload
    },
    savaDataFromDrawer: (state, action) => {
      state.drawer.drawerTraining.name = action.payload.trainingName,
      state.drawer.drawerTraining.date = action.payload.trainingDate,
      state.drawer.drawerTraining.exercises = action.payload.training,
      state.drawer.drawerTraining._id = action.payload.trainingId
    },
    removeDataFromDrawer: (state) => {
      state.drawer.drawerTraining.name = '',
      state.drawer.drawerTraining.date = '',
      state.drawer.drawerTraining._id = '',
      state.drawer.drawerTraining.exercises = []
    }
  },
});

export const { addUserExercisesData, addTrainingListData, openDrawer, closeDrawer, savaDataFromDrawer, removeDataFromDrawer, checkErrorResponse } = userExercisesSlice.actions;

export default userExercisesSlice.reducer ;