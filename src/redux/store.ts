import { configureStore } from '@reduxjs/toolkit'
import propertySlice from './features/propertySlice'

const store = configureStore({
   reducer: {
      properties: propertySlice,
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false
   }),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;