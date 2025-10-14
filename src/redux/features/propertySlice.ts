import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import properties from '@/data/inner-data/ListingData';
import { fetchProperties, fetchPropertyById, DirectusProperty } from '@/services/directusService';

interface Property {
   id: number;
}

interface PropertyState {
   properties: Property[] | any[];
   property: Property | {};
   loading: boolean;
   error: string | null;
   useDirectus: boolean;
}

const initialState: PropertyState = {
   properties: properties,
   property: {},
   loading: false,
   error: null,
   useDirectus: true, // Flag pour activer/désactiver Directus
};

// Async thunks
export const fetchPropertiesFromDirectus = createAsyncThunk(
   'properties/fetchFromDirectus',
   async () => {
      const properties = await fetchProperties();
      return properties;
   }
);

export const fetchPropertyFromDirectus = createAsyncThunk(
   'properties/fetchPropertyFromDirectus',
   async (id: number) => {
      const property = await fetchPropertyById(id);
      return property;
   }
);

export const propertySlice = createSlice({
   name: 'properties',
   initialState,
   reducers: {
      single_property: (state, action: PayloadAction<number>) => {
         state.property = state.properties.find((p) => Number(p.id) === Number(action.payload)) || {};
      },
      toggleDirectusUsage: (state) => {
         state.useDirectus = !state.useDirectus;
      },
   },
   extraReducers: (builder) => {
      builder
         // Fetch all properties
         .addCase(fetchPropertiesFromDirectus.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(fetchPropertiesFromDirectus.fulfilled, (state, action) => {
            state.loading = false;
            state.properties = action.payload;
         })
         .addCase(fetchPropertiesFromDirectus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch properties';
         })
         // Fetch single property
         .addCase(fetchPropertyFromDirectus.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(fetchPropertyFromDirectus.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload) {
               state.property = action.payload;
            }
         })
         .addCase(fetchPropertyFromDirectus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch property';
         });
   },
});

export const { single_property, toggleDirectusUsage } = propertySlice.actions;

// Selectors
export const selectProperties = (state: { properties: PropertyState }) => state?.properties?.properties;
export const selectProperty = (state: { properties: PropertyState }) => state?.properties?.property;
export const selectPropertiesLoading = (state: { properties: PropertyState }) => state?.properties?.loading;
export const selectPropertiesError = (state: { properties: PropertyState }) => state?.properties?.error;
export const selectUseDirectus = (state: { properties: PropertyState }) => state?.properties?.useDirectus;

export default propertySlice.reducer;