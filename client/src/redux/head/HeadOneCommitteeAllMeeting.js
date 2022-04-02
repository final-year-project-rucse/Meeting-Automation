import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allMeetings: [],
};

export const HeadOneCommitteeAllMeeting = createSlice({
  name: "All Meetings",
  initialState,
  reducers: {
    setAllMeetings: (state, action) => {
        return {
            ...state,
            allMeetings: action.payload
        }
    },
  },
});

export const { setAllMeetings } = HeadOneCommitteeAllMeeting.actions;

export default HeadOneCommitteeAllMeeting.reducer;