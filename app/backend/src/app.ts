import * as express from 'express';
import loginRoutes from './routes/login.routes';
import teamsRoutes from './routes/teams.routes';
import matchesRoutes from './routes/matches.routes';
import leaderBoardRoutes from './routes/leaderboard.routes';

class App {
  public app: express.Express;
  // ...

  constructor() {
    // ...
    this.app = express();
    this.config();
    // ...
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
    this.app.use(loginRoutes);
    this.app.use(teamsRoutes);
    this.app.use(matchesRoutes);
    this.app.use(leaderBoardRoutes);
  }

  // ...
  public start(PORT: string | number):void {
    // ...
    this.app.listen(PORT, () =>
      console.log(`Escutando na porta ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
