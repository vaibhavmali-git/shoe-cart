import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Role = 'customer' | 'admin' | null;

interface AuthState {
  role: Role;
}

const initialState: AuthState = {
  role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<Role>) => {
      state.role = action.payload;
    },
    clearRole: (state) => {
      state.role = null;
    }
  },
});

export const { setRole, clearRole } = authSlice.actions;
export default authSlice.reducer;