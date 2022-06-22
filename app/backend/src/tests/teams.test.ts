import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/teams';
import { allTeams, specificTeam } from './mocks/teamMocks';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste sobre o retorno de todos os times', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Team, "findAll")
      .resolves(allTeams as Team[]);
  });

  after(()=>{
    (Team.findAll as sinon.SinonStub).restore();
  })

  it('Ao fazer o request todos os times retornam com sucesso', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/teams')
       .send();

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.an('array');
  });
});

describe('Teste sobre o retorno de um time específico', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Team, "findByPk")
      .resolves(specificTeam as Team);
  });

  after(()=>{
    (Team.findByPk as sinon.SinonStub).restore();
  })

  it('Ao fazer o request com um id específico o time correspondente é retornado com sucesso', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/teams/:id')
       .send();

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.property('id');
    expect(chaiHttpResponse.body).to.have.property('teamName');
  });
});

