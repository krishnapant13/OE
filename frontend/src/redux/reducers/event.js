import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  events: null,
  error: null,
  allEvents: null,
};

export const eventReducer = createReducer(initialState, {
  eventCreateRequest: (state) => {
    state.isLoading = true;
  },
  eventCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.events = action.payload;
    state.success = true;
  },
  eventCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },
  // get all events of shop
  getAllEventsRequest: (state) => {
    state.isLoading = true;
  },
  getAllEventsSuccess: (state, action) => {
    state.isLoading = false;
    state.events = action.payload;
  },
  getAllEventsFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  //delete event of shop
  deleteEventRequest: (state) => {
    state.isLoading = true;
  },
  deleteEventSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  deleteEventFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // get all events
  getAlleventsRequest: (state) => {
    state.isLoading = true;
  },
  getAlleventsSuccess: (state, action) => {
    state.isLoading = false;
    state.allEvents = action.payload;
  },
  getAlleventsFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
  },
});
