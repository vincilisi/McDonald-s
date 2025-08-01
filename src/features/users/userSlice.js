import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { saveUserProfileToFirestore } from '../../../firebase-service';

// thunk asincrono per aggiornare profilo sia in Redux che Firestore
export const updateProfile = createAsyncThunk(
    'user/updateProfile',
    async (profileData, thunkAPI) => {
        console.log('[Thunk] updateProfile: ricevuto profileData', profileData);
        const { uid, ...dataToSave } = profileData;
        if (!uid) {
            console.error('[Thunk] updateProfile: UID mancante!');
            return thunkAPI.rejectWithValue('UID mancante');
        }

        try {
            console.log('[Thunk] Prima di chiamare saveUserProfileToFirestore con:', uid, dataToSave);
            await saveUserProfileToFirestore(uid, dataToSave);
            console.log('[Thunk] Salvataggio completato, ritorno dati');
            return profileData;
        } catch (error) {
            console.error('[Thunk] Errore durante salvataggio:', error.message);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        email: '',
        uid: '',
        name: '',
        avatar: '',
        isProfileComplete: false,
        address: '',
        phone: '',
        diet: '',
        notes: '',
        status: 'idle',
        error: null,
    },
    reducers: {
        login: (state, action) => {
            const { email, uid, name, avatar, isProfileComplete, address, phone, diet, notes } = action.payload;
            state.email = email;
            state.uid = uid;
            state.name = name;
            state.avatar = avatar;
            state.isProfileComplete = isProfileComplete;
            state.address = address || '';
            state.phone = phone || '';
            state.diet = diet || '';
            state.notes = notes || '';
            state.status = 'idle';
            state.error = null;
        },
        logout: (state) => {
            state.email = '';
            state.uid = '';
            state.name = '';
            state.avatar = '';
            state.isProfileComplete = false;
            state.address = '';
            state.phone = '';
            state.diet = '';
            state.notes = '';
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateProfile.pending, (state) => {
                console.log('[Redux] updateProfile.pending');
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                console.log('[Redux] updateProfile.fulfilled', action.payload);
                const { name, avatar, isProfileComplete, address, phone, diet, notes } = action.payload;
                state.name = name;
                state.avatar = avatar;
                state.isProfileComplete = isProfileComplete;
                state.address = address || '';
                state.phone = phone || '';
                state.diet = diet || '';
                state.notes = notes || '';
                state.status = 'succeeded';
            })
            .addCase(updateProfile.rejected, (state, action) => {
                console.log('[Redux] updateProfile.rejected', action.payload);
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
