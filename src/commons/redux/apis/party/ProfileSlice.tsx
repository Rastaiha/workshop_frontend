import { SchoolStudentshipType, UserInfoType } from 'commons/types/profile';
import { WebsiteType } from 'commons/types/global';
import { WMS_URL } from 'commons/constants/Constants';
import { ContentManagementServiceApi } from 'apps/website-display/redux/features/ManageContentServiceApiSlice';
import { UserPublicInfoType } from 'commons/types/models';

type GetUserProfileInputType = {
  userId: string;
}

type UpdateUserProfileInputType = {
  userId: string;
} & Partial<UserInfoType>;

type GetUserProfileOutputType = UserInfoType;

type GetUserProfileSummaryOutputType = UserPublicInfoType;

type UpdateSchoolStudentshipInputType = Partial<SchoolStudentshipType>;

type GetSchoolStudentshipOutputType = SchoolStudentshipType;

type GetWebsiteProfileInputType = {}

type GetWebsiteProfileOutputType = Partial<WebsiteType>;

export const ProfileSlice = ContentManagementServiceApi.injectEndpoints({
  endpoints: builder => ({
    getUserProfile: builder.query<GetUserProfileOutputType, GetUserProfileInputType>({
      providesTags: [{ type: 'Profile', id: 'MY' }],
      query: ({ userId }) => ({
        url: `auth/profile/${userId}/`,
        method: 'GET',
      }),
    }),

    updateUserProfile: builder.mutation<GetUserProfileOutputType, UpdateUserProfileInputType>({
      invalidatesTags: [{ type: 'Profile', id: 'MY' }],
      query: ({ userId, ...body }) => ({
        url: `auth/profile/${userId}/`,
        method: 'PATCH',
        body,
      }),
    }),

    updateSchoolStudentship: builder.mutation<GetSchoolStudentshipOutputType, UpdateSchoolStudentshipInputType>({
      invalidatesTags: [{ type: 'Profile', id: 'MY' }],
      query: ({ id, ...body }) => ({
        url: `auth/studentship/${id}/`,
        method: 'PATCH',
        body,
      }),
    }),

    getUserProfileSummary: builder.query<GetUserProfileSummaryOutputType, GetUserProfileInputType>({
      providesTags: [{ type: 'Profile', id: 'MY' }],
      query: ({ userId: partyId }) => ({
        url: `auth/profile/${partyId}/profile_summary/`,
        method: 'GET',
      }),
    }),

    getWebsiteProfileSummary: builder.query<GetWebsiteProfileOutputType, GetWebsiteProfileInputType>({
      providesTags: ['website-profile'],
      query: ({ }) => {
        return ({
          // todo: get website profile summary
          url: `${WMS_URL}api/website/get-website/`,
          method: 'GET',
        })
      },
    }),
  })
});

export const {
  useGetUserProfileQuery,
  useGetUserProfileSummaryQuery,
  useGetWebsiteProfileSummaryQuery,
  useUpdateUserProfileMutation,
  useUpdateSchoolStudentshipMutation,
} = ProfileSlice;
