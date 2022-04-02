import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allMeetings: [],
  createMeetingflag: true,
};

export const HeadOneCommitteeAllMeeting = createSlice({
  name: "All Meetings",
  initialState,
  reducers: {
    setAllMeetings: (state, action) => {
      return {
        ...state,
        allMeetings: action.payload,
      };
    },
    createMeetingflagHandler: (state, action) => {
      return {
        ...state,
        createMeetingflag: ![state.createMeetingflag],
      };
    },
  },
});

export const { setAllMeetings, createMeetingflagHandler } =
  HeadOneCommitteeAllMeeting.actions;

export default HeadOneCommitteeAllMeeting.reducer;
