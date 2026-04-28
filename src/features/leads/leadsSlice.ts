import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Lead, LeadsState } from '../../types/index'


const loadLeadsFromLocalStorage = (): Lead[] => {
    try{
        const stored = localStorage.getItem('leads');
        return stored ? JSON.parse(stored) as Lead[] : [];
    } catch (error) {
        console.error('Error loading leads from localStorage', error);
        return [];
    }
}

const initialState: LeadsState = {
    items: loadLeadsFromLocalStorage(),
    loading: false,
    error: null,
};

const leadsSlice = createSlice({
    name: 'leads',
    initialState,
    reducers: {
        addLead(state, action: PayloadAction<Lead>) {
            state.items.push(action.payload);
            localStorage.setItem('leads', JSON.stringify(state.items));
        },
        clearLeads(state) {
            state.items = [];
            localStorage.removeItem('leads');
        },
    },
});

export const { addLead, clearLeads } = leadsSlice.actions;
export default leadsSlice.reducer;