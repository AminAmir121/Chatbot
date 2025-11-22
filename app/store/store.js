import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { GoogleGenerativeAI } from "@google/generative-ai";



const genAI = new GoogleGenerativeAI("AIzaSyDgVhirrOO004IBr63fjkua5T1b-bwBHRM")

export const Fetch = createAsyncThunk(
    'gemini, fetching',

    async ({ Inp, type }) => {
        console.log(Inp, type);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(Inp);
        const response = result.response.text().replace(/[*#\-_]/g, "");
        console.log(response);

        return { response, type }
    }

)

const GemSlice = createSlice({
    name: 'gemini',
    initialState: {
        loading: null,
        ApiText: [],
        ApiVoice: [],
        error: null,
        Prompt: null,
        hasSearched: false,
    },
    reducers: {
        setPrompt: (state, action) => {
            state.Prompt = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(Fetch.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(Fetch.fulfilled, (state, action) => {
                state.loading = null;
                state.error = null;

                const { response, type } = action.payload;

                const entry = {
                    prompt: state.Prompt,
                    response: response,
                };

                if (type === "text") {
                    state.ApiText.push(entry)
                }else if(type === "voice"){
                    state.ApiVoice.push(entry)
                }
                
            })
            .addCase(Fetch.rejected, (state) => {
                state.Api = null;
                state.loading = null;
                state.error = "Something Went Wrong!!";
            })
    }
})

const store = configureStore({
    reducer: {
        gemini: GemSlice.reducer
    }
})

export default store;
export const geminiAction = GemSlice.actions;
export const { setPrompt } = GemSlice.actions