import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NovaPoshta, NovaPoshtaSchema, OpenstreetmapArray, OpenstreetmapArraySchema } from './utils';

export const orderAddressApi = createApi({
  reducerPath: 'orderAddress',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    fetchLocalities: builder.query<OpenstreetmapArray, string>({
      query: (city) => ({
        url: `https://nominatim.openstreetmap.org/search`,
        params: {
          format: 'json',
          q: city,
          addressdetails: 1,
          limit: 5,
          'accept-language': 'uk',
          countrycodes: 'UA'
        }
      }),
      transformResponse(response) {
        return OpenstreetmapArraySchema.parse(response);
      },
      providesTags: ['Localities']
    }),
    fetchPostOffices: builder.query<NovaPoshta, string>({
      query: (city) => ({
        url: 'https://api.novaposhta.ua/v2.0/json/',
        method: 'POST',
        body: {
          apiKey: import.meta.env.VITE_NOVA_POSHTA_API_KEY,
          modelName: 'AddressGeneral',
          calledMethod: 'getWarehouses',
          methodProperties: { CityName: city }
        }
      }),
      transformResponse(response) {
        return NovaPoshtaSchema.parse(response);
      },
      providesTags: ['PostOffices']
    })
  }),
  tagTypes: ['Localities', 'PostOffices']
});

export const { useFetchLocalitiesQuery, useFetchPostOfficesQuery } = orderAddressApi;
