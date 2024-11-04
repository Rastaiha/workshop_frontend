import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import handleError from './ErrorHandler';

const CustomBaseQuery = ({ baseUrl }) =>
  async (args, api, extraOptions) => {

    const result = await fetchBaseQuery({
      baseUrl,
      prepareHeaders: (headers, { getState, endpoint }) => {
        const state: any = getState();
        const accessToken = state.account?.accessToken;
        //todo: what should we do with refresh token?!
        const refreshToken = state.account?.refreshToken;
        if (accessToken) {
          headers.append('Authorization', `JWT ${accessToken}`);
        }
        const website = state.website?.website;
        if (website) {
          headers.append('Website', website.name);
        }
        const fsm = state.fsm?.fsm;
        if (fsm) {
          headers.append('FSM', fsm.id);
        }
        return headers
      },
    })(args, api, extraOptions);

    if (result.error) {
      args.body?.onFailure?.(result);
      handleError({ error: result.error, dispatch: api.dispatch })
    } else {
      args.body?.onSuccess?.(result);
    }
    return result;
  };

export default CustomBaseQuery;
