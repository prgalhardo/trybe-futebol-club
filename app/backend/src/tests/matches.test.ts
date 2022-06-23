import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/matches';
import Team from '../database/models/teams';
import allMatches from './mocks/matchesMocks';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste sobre o retorno de todas as partidas', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Match, "findAll")
      .resolves(allMatches as Match[]);
  });

  after(()=>{
    (Match.findAll as sinon.SinonStub).restore();
  })

  it('Ao fazer o request todas as partidas retornam com status 200', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/matches')
       .send();

      expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('Ao fazer o request todas as partidas retornam dentro de um array', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/matches')
       .send();

      expect(chaiHttpResponse.body).to.be.an('array');
  });

  it('Ao fazer o request retornam 48 partidas dentro do array', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/matches')
       .send();

      expect(chaiHttpResponse.body).to.be.lengthOf(48);
  });
});

