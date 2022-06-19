import { Router } from 'express';
import TeamsController from '../controllers/teamsController';

const teamsRoutes = Router();
const teamsInfos = new TeamsController();

teamsRoutes.get('/teams', teamsInfos.findAll);
teamsRoutes.get('/teams/:id', teamsInfos.findById);

export default teamsRoutes;
