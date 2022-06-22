import { Router } from 'express';
import LeaderBoardHomeController from '../controllers/leaderBoardHomeController';
import LeaderBoardAwayController from '../controllers/leaderBoardAwayController';

const leaderBoardRoutes = Router();
const leaderBoardHomeInfos = new LeaderBoardHomeController();
const leaderBoardAwayInfos = new LeaderBoardAwayController();

leaderBoardRoutes.get('/leaderboard/home', leaderBoardHomeInfos.finishedMatches);
leaderBoardRoutes.get('/leaderboard/away', leaderBoardAwayInfos.leaderBoardAway);

export default leaderBoardRoutes;
