import { Router } from 'express';
import MatchesController from '../controllers/matchesController';

const matchesRoutes = Router();
const matchesInfos = new MatchesController();

matchesRoutes.get('/matches', matchesInfos.findAll);

export default matchesRoutes;
