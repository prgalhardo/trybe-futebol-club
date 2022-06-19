import { Router } from 'express';
import MatchesController from '../controllers/matchesController';
import validateEqualTeams, { validateTeam } from '../middlewares/matchesMiddlewares';

const matchesRoutes = Router();
const matchesInfos = new MatchesController();

matchesRoutes.get('/matches', matchesInfos.findAll);
matchesRoutes.post('/matches', validateTeam, validateEqualTeams, matchesInfos.create);

export default matchesRoutes;
