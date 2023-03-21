import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/UserModel';
import {userMock, validLogin, invalidToken, invalidLogin, EmptyLogin} from './Mocks/LoginMock'

import { Response } from 'superagent';


chai.use(chaiHttp);

const { expect } = chai;

describe('Test route /login', () => {

  let chaiHttpResponse: Response;

  afterEach(()=>{
    sinon.restore();
  })


it('Should return error and status 401 if email or password  ', async () => {
    const invalidEmailOrPassword = { message: 'Invalid email or password' }
    
    chaiHttpResponse = await chai.request(app).post('/login').send(invalidLogin);

    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body).to.deep.equal(invalidEmailOrPassword);
  });

  it('Should return error message e status 400 if no fields filled in ', async () => {
      const fieldsFilled =  { message: 'All fields must be filled' }
    
      chaiHttpResponse = await chai.request(app).post('/login').send(EmptyLogin);
  
      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body).to.deep.equal(fieldsFilled);
    });

    it('Route /login should return a token ', async () => {
  
      sinon
      .stub(UserModel, 'findOne')
      .resolves(userMock as unknown as UserModel);
      
      sinon
      .stub(bcrypt, 'compareSync')
      .resolves(true);

      chaiHttpResponse = await chai.request(app).post('/login').send(validLogin);
      
      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.haveOwnProperty('token');
    });

    it('should return error message and status if invalid token', async () => {
      const TokenMustBeValid = { message: 'Token must be a valid token' }
    
      chaiHttpResponse = await chai.request(app).get('/login/role')
      .set('Authorization', invalidToken);
  
      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body).to.deep.equal(TokenMustBeValid);
    });

});
