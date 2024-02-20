import React from 'react';
import { useDispatch } from 'react-redux';

import { MyVotes } from '@/screens';
import { pandaScoreApi } from '@/store/service';

const MyVotesScreen = () => {
  const dispatch = useDispatch();

  dispatch(pandaScoreApi.util.invalidateTags(['VotedMatches']));

  return <MyVotes />;
};

export default MyVotesScreen;
