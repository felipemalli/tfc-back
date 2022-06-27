import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import TeamModel from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';
import teamMock from './mocks/teamMock';
import matchMock from './mocks/matchMock';
import leaderboardMock from './mocks/leaderboardMock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboard', () => {
  let chaiHttpResponse: Response;

  describe('GET /leaderboard', () => {
    describe('When searching', () => {
      before(async () => {
        sinon
          .stub(MatchModel, "findAll")
          .resolves(matchMock.matchResponse as MatchModel[]);
        sinon
          .stub(TeamModel, "findAll")
          .resolves(teamMock.teamResponse as TeamModel[]);
      });
      after(()=>{
        (MatchModel.findAll as sinon.SinonStub).restore();
        (TeamModel.findAll as sinon.SinonStub).restore();
      });
  
      it('should receive a leaderboard based on matches not in progress', async () => {
        chaiHttpResponse = await chai.request(app).get('/leaderboard');
    
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.eql(leaderboardMock.leaderboardResponse);
      });
    });
  });
  
  describe('GET /leaderboard/home', () => {
    describe('When send an existent input', () => {
      before(async () => {
        sinon
          .stub(MatchModel, "findAll")
          .resolves(matchMock.matchResponse as MatchModel[]);
        sinon
          .stub(TeamModel, "findAll")
          .resolves(teamMock.teamResponse as TeamModel[]);
      });
      after(()=>{
        (MatchModel.findAll as sinon.SinonStub).restore();
        (TeamModel.findAll as sinon.SinonStub).restore();
      });
  
      it('should receive a leaderboard based on matches at home and not in progress', async () => {
        chaiHttpResponse = await chai.request(app).get('/leaderboard/home');
    
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.eql(leaderboardMock.leaderboardHomeResponse);
      });
    });
  });
  describe('GET /leaderboard/away', () => {
    describe('When send an existent input', () => {
      before(async () => {
        sinon
          .stub(MatchModel, "findAll")
          .resolves(matchMock.matchResponse as MatchModel[]);
        sinon
          .stub(TeamModel, "findAll")
          .resolves(teamMock.teamResponse as TeamModel[]);
      });
      after(()=>{
        (MatchModel.findAll as sinon.SinonStub).restore();
        (TeamModel.findAll as sinon.SinonStub).restore();
      });
  
      it('should receive a leaderboard based on matches away from home and not in progress', async () => {
        chaiHttpResponse = await chai.request(app).get('/leaderboard/away');
    
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.eql(leaderboardMock.leaderboardAwayResponse);
      });
    });
  });
});