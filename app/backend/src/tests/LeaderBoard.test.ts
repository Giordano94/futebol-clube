import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import {home, away, allLeaderBard} from './Mocks/LeaderBoardMock';
import LeaderBoardService from '../Services/LeaderBoardService';
import ILeaderBoard from '../Interfaces/ILeaderBoard';
const leaderBoard = new LeaderBoardService();

chai.use(chaiHttp);

const { expect } = chai;


describe('Tests leaderboard', () => {

  describe('Test route leaderboard/home', () => {

    beforeEach(() => {
      sinon.stub(leaderBoard, 'createHomeTeamLeaderBoard')
        .resolves(home as ILeaderBoard[]);
    });

    
    afterEach(() => {
      (leaderBoard.createHomeTeamLeaderBoard as sinon.SinonStub).restore();
    });
    
    it('Route /leaderBoardHome should return status 200 and homeTeam infos',  async () => {
      
      const  chaiHttpResponse = await chai.request(app).get('/leaderboard/home')
      
      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(home);
    });
    
  });


  describe('Test route leaderboard/away', () => {

    beforeEach(() => {
      sinon.stub(leaderBoard, 'createAwayTeamLeaderBoard')
        .resolves(away as ILeaderBoard[]);
    });

    afterEach(() => {
      (leaderBoard.createAwayTeamLeaderBoard as sinon.SinonStub).restore();
    });
    
    it('Route /leaderBoardAway should return status 200 and awayTeam infos',  async () => {
    
        const chaiHttpResponse = await chai.request(app).get('/leaderboard/away')
    
        expect(chaiHttpResponse).to.have.status(200);
        expect(chaiHttpResponse.body).to.be.deep.equal(away);
    });

  });
  
  describe('Test route leaderboard', () => {
    
    beforeEach(() => {
      sinon.stub(leaderBoard, 'createAllTeamsLeaderBoard')
      .resolves(allLeaderBard as ILeaderBoard[]);
    });
    
    afterEach(() => {
      (leaderBoard.createAllTeamsLeaderBoard as sinon.SinonStub).restore();
    });
    
    it('Route /leaderBoard should return status 200 and all Team infos',  async () => {
    
      const chaiHttpResponse = await chai.request(app).get('/leaderboard')
      
      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(allLeaderBard);
    });
  });
  
});


