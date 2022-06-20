import { Router } from 'express';
import MatchesController from '../controllers/matchesController';
import validateEqualTeams, { validateTeam } from '../middlewares/matchesMiddlewares';
import TokenAuthorization from '../middlewares/tokenMiddleware';

const matchesRoutes = Router();
const matchesInfos = new MatchesController();

matchesRoutes.get('/matches', matchesInfos.findAll);
matchesRoutes.post(
  '/matches',
  TokenAuthorization,
  validateTeam,
  validateEqualTeams,
  matchesInfos.create,
);
matchesRoutes.patch('/matches/:id/finish', matchesInfos.updateInProgress);
matchesRoutes.patch('/matches/:id', matchesInfos.updateMatches);

export default matchesRoutes;
