import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/users';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login do usuário', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves({
        id: 1,
        username: 'priscila',
        role: 'user',
        email: 'usuario@email.com',
        password: '$2a$12$oMjKpwgnpHbzB/jD4NHnYOF.Kn.A0P3ssNqJxfA3xpNmOjltqRTFm'
      } as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('É possível fazer o login com sucesso', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({
         email: 'usuario@email.com',
         password: '1234567',
       });

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.not.have.property('password');
    expect(chaiHttpResponse.body).to.have.property('user');
    expect(chaiHttpResponse.body).to.have.property('token');
  });

  it('Não é possível fazer o login com um e-mail incorreto', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({
         email: 'usuario@email.com',
         password: '123456',
       });

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
  });

  it('Não é possível fazer o login com uma senha incorreta', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({
         email: 'usua@emai.com',
         password: '1234567',
       });

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
  });
});
