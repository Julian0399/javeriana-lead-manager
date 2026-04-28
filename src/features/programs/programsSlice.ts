import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {ProgramCategory,Program,ProgramsState} from '../../types/index'

export const fetchPrograms = createAsyncThunk<Program[]>(
    'programs/fetchPrograms',
    async () => {
        const response = await fetch('https://my-json-server.typicode.com/Julian0399/javeriana-lead-manager/programs');
        if (!response.ok) {
            throw new Error('Failed to fetch programs');
        }
        return response.json() as Promise<Program[]>;
    }
)

const initialState: ProgramsState = {
    items: [],
    loading: false,
    error: null,
    searchQuery: '',
    selectedCategory: 'Todas',
};

const programsSlice = createSlice({
    name: 'programs',
    initialState,
    reducers: {
        setSearchQuery(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload;
        },
        setSelectedCategory(state, action: PayloadAction<ProgramCategory | "Todas">) {
            state.selectedCategory = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPrograms.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPrograms.fulfilled, (state, action: PayloadAction<Program[]>) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchPrograms.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Error al cargar los programas';
            });
    },
});

export const { setSearchQuery, setSelectedCategory } = programsSlice.actions;
export default programsSlice.reducer;