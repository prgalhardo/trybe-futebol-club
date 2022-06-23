import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/teams';
import allTeams from './mocks/teamMocks';

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
  });

  it('Ao fazer o request os times retornam dentro de um array', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/teams')
       .send();

      expect(chaiHttpResponse.body).to.be.an('array');
  });

  it('Ao fazer o request retornam 16 times dentro do array', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/teams')
       .send();

      expect(chaiHttpResponse.body).to.be.lengthOf(16);
  });

  it('Ao fazer o request existam "id" e "teamName" em cada elemento do array', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/teams')
       .send();

      expect(chaiHttpResponse.body[1]).to.have.property('id');
      expect(chaiHttpResponse.body[1]).to.have.property('teamName');
  });
});

describe('Teste sobre o retorno de um time específico', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Team, "findByPk")
      .resolves(allTeams[1] as Team);
  });

  after(()=>{
    (Team.findByPk as sinon.SinonStub).restore();
  })

  it('Ao fazer o request com um id específico o time correspondente é retornado com sucesso', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/teams/1')
       .send();

    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('Ao fazer o request com um id específico tenha as propriedades "id" e "teamName"', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/teams/1')
       .send();

    expect(chaiHttpResponse.body).to.have.property('id');
    expect(chaiHttpResponse.body).to.have.property('teamName');
  });
});

