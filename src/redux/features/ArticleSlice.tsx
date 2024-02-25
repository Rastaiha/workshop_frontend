import { ProgramType } from 'types/models';
import { ManageContentServiceApi } from './ManageContentServiceApiSlice';
import { ArticleType } from 'types/redux/article';

type GetArticlesInputType = {
  partyUuid: string;
  pageNumber: number;
}

type GetArticlesOutputType = {
  count: number;
  articles: ArticleType[];
}

export const ArticleSlice = ManageContentServiceApi.injectEndpoints({
  endpoints: builder => ({
    getArticles: builder.query<GetArticlesOutputType, GetArticlesInputType>({
      query: ({ partyUuid, pageNumber }) => `fsm/article/?party=${partyUuid}&page=${pageNumber}&is_private=False`,
      transformResponse: (respons: any): GetArticlesOutputType => {
        return {
          count: respons.count,
          articles: respons.results,
        }
      },
    })
  })
});

export const { useGetArticlesQuery } = ArticleSlice;
