import { Router } from 'express';
import TeamsController from '../controllers/teamsController';

const teamsRoutes = Router();
const teamsInfos = new TeamsController();

teamsRoutes.get('/teams', teamsInfos.findAll);

export default teamsRoutes;
