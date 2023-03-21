import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import MatchesModel from '../database/models/MatchModel';
import {matches, token} from './Mocks/MatchesMock'


import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test route /matches', () => {
  let chaiHttpResponse: Response;

  afterEach(()=>{
    sinon.restore();
  })


  it('Route /matches should return status 200 and all matches', async () => {

    sinon.stub(MatchesModel, "findAll")
    .resolves(matches as unknown as MatchesModel[]);

    chaiHttpResponse = await chai.request(app).get('/matches')

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.deep.equal(matches);
  });
});
