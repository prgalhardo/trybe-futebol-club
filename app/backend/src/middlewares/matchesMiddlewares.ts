import { Request, Response, NextFunction } from 'express';
import Team from '../database/models/teams';

export default function validateEqualTeams(req: Request, res: Response, next: NextFunction) {
  const { homeTeam, awayTeam } = req.body;
  if (homeTeam === awayTeam) {
    return res.status(401).json({
      message: 'It is not possible to create a match with two equal teams' });
  }
  next();
}

export const validateTeam = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  const teamHome = await Team.findByPk(homeTeam);
  const teamAway = await Team.findByPk(awayTeam);

  if (!teamHome || !teamAway) {
    return res.status(401).json({ message: 'There is no team with such id!' });
  }
  next();
};
