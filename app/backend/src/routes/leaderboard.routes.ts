import { Router } from 'express';
import LeaderBoardHomeController from '../controllers/leaderBoardHomeController';

const leaderBoardRoutes = Router();
const leaderBoardHomeInfos = new LeaderBoardHomeController();

leaderBoardRoutes.get('/leaderboard/home', leaderBoardHomeInfos.finishedMatches);

export default leaderBoardRoutes;
