import { createSlice } from '@reduxjs/toolkit';
import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  hintUrl,
  widgetHintUrl,
} from '../constants/urls';
import { InitialStateType } from 'types/redux/Paper';
import { getArticleAction } from './article';
import { getRegistrationFormAction } from './programs';

//////////////// HINT ////////////////

export const createHintAction = createAsyncThunkApi(
  'widget/hints/create',
  Apis.POST,
  hintUrl,
  {
    bodyCreator: ({ referenceId }) => ({ reference: referenceId, name: 'help' }),
  }
);

export const deleteHintAction = createAsyncThunkApi(
  'widget/hints/delete',
  Apis.DELETE,
  hintUrl,
);

//////////////// WIDGET HINT ////////////////
// TOFF

export const createWidgetHintAction = createAsyncThunkApi(
  'widget/widget-hints/create',
  Apis.POST,
  widgetHintUrl,
  {
    bodyCreator: ({ referenceId }) => ({ reference: referenceId, name: 'help' }),
  }
);

export const deleteWidgetHintAction = createAsyncThunkApi(
  'widget/widget-hints/delete',
  Apis.DELETE,
  widgetHintUrl,
);

//////////////// UTILITIES ////////////////

const initialState: InitialStateType = {
  papers: {},
  widget: null,
  isFetching: false,
}

const isFetching = (state) => {
  state.isFetching = true;
};

const isNotFetching = (state) => {
  state.isFetching = false;
};

const addNewPaperToList = (papers, newPaper) => {
  let newPapers = { ...papers };
  // put itself
  newPapers[newPaper.id] = newPaper;
  // put its hints
  newPaper.hints?.forEach((hint) => {
    newPapers[hint.id] = hint;
  })
  // put its widgets hints
  newPaper.widgets?.forEach((widget) => {
    widget.hints?.forEach((hint) => {
      newPapers = addNewPaperToList(newPapers, hint);
    })
  })
  return newPapers;
}

const PaperSlice = createSlice({
  name: 'PaperState',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [createHintAction.pending.toString()]: isFetching,
    [createHintAction.fulfilled.toString()]: (state, { payload: { response }, meta: { arg } }) => {
      state.papers[arg.referenceId] ||= {};
      state.papers[arg.referenceId].hints = [...(state.papers[arg.referenceId].hints || []), response];
      state.papers = addNewPaperToList(state.papers, response);
      state.isFetching = false;
    },
    [createHintAction.rejected.toString()]: isNotFetching,


    [createWidgetHintAction.pending.toString()]: isFetching,
    [createWidgetHintAction.fulfilled.toString()]: (state, { payload: { response }, meta: { arg } }) => {
      state.papers = addNewPaperToList(state.papers, response);
      state.isFetching = false;
    },
    [createWidgetHintAction.rejected.toString()]: isNotFetching,


    [deleteHintAction.pending.toString()]: isFetching,
    [deleteHintAction.fulfilled.toString()]: (state, { payload: { response }, meta: { arg } }) => {
      delete state.papers[arg.hintId];
      state.isFetching = false;
    },
    [deleteHintAction.rejected.toString()]: isNotFetching,


    [deleteWidgetHintAction.pending.toString()]: isFetching,
    [deleteWidgetHintAction.fulfilled.toString()]: (state, { payload: { response }, meta: { arg } }) => {
      delete state.papers[arg.hintId];
      state.isFetching = false;
    },
    [deleteWidgetHintAction.rejected.toString()]: isNotFetching,


    [getArticleAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.papers[response.id] = response;
      state.isFetching = false;
    },


    [getRegistrationFormAction.pending.toString()]: isFetching,
    [getRegistrationFormAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.papers[response.id] = response;
      state.isFetching = false;
    },
    [getRegistrationFormAction.rejected.toString()]: isNotFetching,
  },
});

export const { reducer: paperReducer } = PaperSlice;
