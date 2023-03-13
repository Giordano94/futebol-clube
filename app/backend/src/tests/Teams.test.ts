import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/TeamModel';
import { allTeams } from './Mocks/TeamMocks';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test route /teams', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(TeamModel, "findAll")
      .resolves(allTeams as TeamModel[]);

    sinon.stub(TeamModel, "findOne")
      .resolves(allTeams[9] as TeamModel);
  });

  after(()=>{
    (TeamModel.findAll as sinon.SinonStub).restore();
    (TeamModel.findOne as sinon.SinonStub).restore();
  })

  it('Route /teams should return status 200 and all teams', async () => {

    chaiHttpResponse = await chai.request(app).get('/teams')

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.deep.equal(allTeams);
  });

  it('Route /teams/:id should return status 200 and one team', async () => {

    chaiHttpResponse = await chai.request(app).get('/teams/10')

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.deep.equal(allTeams[9]);
  });
});

/**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });
