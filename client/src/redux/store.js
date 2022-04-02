import { configureStore } from "@reduxjs/toolkit";
import HeadOneCommitteeAllMeeting from "./head/HeadOneCommitteeAllMeeting";

const store = configureStore({
  reducer: {
    head: HeadOneCommitteeAllMeeting
  },
});

export default store