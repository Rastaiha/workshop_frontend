import { MerchandiseType } from 'types/models';
import { ManageContentServiceApi } from '../ManageContentServiceApiSlice';

type GetProgramMerchandisesInputType = {
  programId: string;
}

type GetProgramMerchandisesOutputType = MerchandiseType[];

type GetMerchandiseInputType = {
  merchandiseId: string;
}

type GetMerchandiseOutputType = MerchandiseType;

type AddMerchandiseToProgramInputType = {
  programId: string;
} & Partial<MerchandiseType>

type AddMerchandiseToProgramOutputType = MerchandiseType;

type UpdateMerchandiseInputType = Partial<MerchandiseType>

type UpdateMerchandiseOutputType = MerchandiseType;

type SoftDeleteInputType = {
  merchandiseId: string;
}

type SoftDeleteOutputType = void;


export const MerchandiseSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: builder => ({
    getProgramMerchandises: builder.query<GetProgramMerchandisesOutputType, GetProgramMerchandisesInputType>({
      providesTags: ['merchandises'],
      query: ({ programId }) => `sales/merchandise/program_merchandises/?program_id=${programId}`,
      transformResponse: (response: any): GetProgramMerchandisesOutputType => {
        return response;
      },
    }),

    getMerchandise: builder.query<GetMerchandiseOutputType, GetMerchandiseInputType>({
      providesTags: ['merchandise'],
      query: ({ merchandiseId }) => `sales/merchandise/${merchandiseId}/`,
      transformResponse: (response: any): GetMerchandiseOutputType => {
        return response;
      },
    }),

    createMerchandise: builder.mutation<AddMerchandiseToProgramOutputType, AddMerchandiseToProgramInputType>({
      invalidatesTags: ['merchandises', 'programs'],
      query: ({ programId, ...body }) => ({
        url: `sales/merchandise/`,
        method: 'POST',
        body: {
          program: programId,
          ...body,
        }
      }),
    }),

    updateMerchandise: builder.mutation<UpdateMerchandiseOutputType, UpdateMerchandiseInputType>({
      invalidatesTags: ['merchandises', 'merchandise', 'programs'],
      query: ({ id, ...body }) => ({
        url: `sales/merchandise/${id}/`,
        method: 'PATCH',
        body,
      }),
    }),

    softDeleteMerchandise: builder.mutation<SoftDeleteOutputType, SoftDeleteInputType>({
      invalidatesTags: ['merchandises', 'merchandise', 'programs'],
      query: ({ merchandiseId }) => `sales/merchandise/${merchandiseId}/soft_delete/`,
    }),

  })
});

export const {
  useGetProgramMerchandisesQuery,
  useGetMerchandiseQuery,
  useCreateMerchandiseMutation,
  useUpdateMerchandiseMutation,
  useSoftDeleteMerchandiseMutation,
} = MerchandiseSlice;
