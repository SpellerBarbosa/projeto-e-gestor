'use client'

import { createSlice, current } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
    name:"menu",
    initialState:{
        componenteAtivo: 'cadastroEmpresas',
    },
    reducers:{
        setComponenteAtivo: (state, action) =>{
            state.componenteAtivo = action.payload;
        },
    },
});

export const { setComponenteAtivo } = menuSlice.actions;
export default menuSlice.reducer;