import {configureStore} from '@reduxjs/toolkit';
import programsReducer from '../features/programs/programsSlice';
import leadsReducer from '../features/leads/leadsSlice';

export const store = configureStore({
    reducer: {
        programs: programsReducer,
        leads: leadsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;