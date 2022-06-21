import { Router } from 'express';
import LeaderBoardController from '../controllers/leaderboardController';

const leaderBoardRoutes = Router();
const leaderBoardInfos = new LeaderBoardController();

leaderBoardRoutes.get('/leaderboard/home', leaderBoardInfos.finishedMatches);

export default leaderBoardRoutes;
