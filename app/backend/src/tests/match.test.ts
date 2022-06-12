import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';
import matchMock from './mocks/matchMock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches', () => {
  let chaiHttpResponse: Response;

  describe('GET /matches', () => {
    describe('When not send a query string', () => {
      afterEach(()=>{
        (MatchModel.findAll as sinon.SinonStub).restore();
      });
  
      it('should receive all matches', async () => {
        sinon.stub(MatchModel, "findAll").resolves(matchMock.matchTeamResponse as MatchModel[]);

        chaiHttpResponse = await chai.request(app).get('/matches');
    
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.eql(matchMock.matchTeamResponse);
      });

      it('should receive a Not Found error if there are no matches', async () => {
        sinon.stub(MatchModel, "findAll").resolves([]);

        chaiHttpResponse = await chai.request(app).get('/matches');
    
        expect(chaiHttpResponse.status).to.be.equal(404);
        expect(chaiHttpResponse.body.message).to.be.equal('There is no matches!');
      });
    });

    describe('When send a existent query string value', () => {
      afterEach(()=>{
        (MatchModel.findAll as sinon.SinonStub).restore();
      });
  
      it('should receive all in progress matches when sending query string InProgress true', async () => {
        sinon.stub(MatchModel, "findAll").resolves(matchMock.matchTeamInProgressResponse as MatchModel[]);
  
        chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true');
    
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.eql(matchMock.matchTeamInProgressResponse);
      });

      it('should receive all matches that are not in progress when sending query string InProgress false', async () => {
        sinon.stub(MatchModel, "findAll").resolves(matchMock.matchTeamNotInProgressResponse as MatchModel[]);

        chaiHttpResponse = await chai.request(app).get('/matches?inProgress=false');
    
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.eql(matchMock.matchTeamNotInProgressResponse);
      });
    });

    describe('When send a non-existent query string value', () => {
      before(async () => {
        return sinon
          .stub(MatchModel, "findAll")
          .resolves(matchMock.matchTeamResponse as MatchModel[]);
      });
  
      after(()=>{
        (MatchModel.findAll as sinon.SinonStub).restore();
      });
  
      it('should receive all matches when sending any query string InProgress value', async () => {
        chaiHttpResponse = await chai.request(app).get('/matches?inProgress=randomMessage');
    
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.eql(matchMock.matchTeamResponse);
      });
    });

    describe('When send a invalid query string', () => {
      before(async () => {
        return sinon
          .stub(MatchModel, "findAll")
          .resolves(matchMock.matchTeamResponse as MatchModel[]);
      });
  
      after(()=>{
        (MatchModel.findAll as sinon.SinonStub).restore();
      });
  
      it('should receive all matches when sending a invalid query string', async () => {
        chaiHttpResponse = await chai.request(app).get('/matches?randomQueryString=randomMessage');
    
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.eql(matchMock.matchTeamResponse);
      });
    });
  });
  
  describe('POST /matches', () => {
    describe('When send an existent input', () => {
      before(async () => {
        return sinon
          .stub(MatchModel, "create")
          .resolves(matchMock.matchResponse as MatchModel);
      });
  
      after(()=>{
        (MatchModel.create as sinon.SinonStub).restore();
      });
  
      it('should receive correct match created', async () => {
        chaiHttpResponse = await chai.request(app).post('/matches').send(matchMock.matchCorrectInput);
    
        expect(chaiHttpResponse.status).to.be.equal(201);
        expect(chaiHttpResponse.body).to.be.eql(matchMock.matchResponse);
      });
    });
  
    describe('When send a non-existent input', () => {
      before(async () => {
        return sinon
          .stub(TeamModel, "findByPk")
          .resolves(null);
      });
  
      after(()=>{
        (TeamModel.findByPk as sinon.SinonStub).restore();
      });

      it('should receive a Not Found error when sending a non-existing homeTeam', async () => {
        chaiHttpResponse = await chai.request(app).post('/matches').send(
          { 
            homeTeam: '0',
            awayTeam: matchMock.matchCorrectInput.awayTeam,
            homeTeamGoals: matchMock.matchCorrectInput.homeTeamGoals,
            awayTeamGoals: matchMock.matchCorrectInput.awayTeamGoals,
          }
        );

        expect(chaiHttpResponse.status).to.be.equal(404);
        expect(chaiHttpResponse.body.message).to.be.equal('There is no team with such id!');
      });

      it('should receive a Not Found error when sending a non-existing awayTeam', async () => {
        chaiHttpResponse = await chai.request(app).post('/matches').send(
          { 
            homeTeam: matchMock.matchCorrectInput.homeTeam, 
            awayTeam: '0',
            homeTeamGoals: matchMock.matchCorrectInput.homeTeamGoals,
            awayTeamGoals: matchMock.matchCorrectInput.awayTeamGoals,
          }
        );
  
        expect(chaiHttpResponse.status).to.be.equal(404);
        expect(chaiHttpResponse.body.message).to.be.equal('There is no team with such id!');
      });
    });

    describe('When send invalid input', () => {
      it('should receive a Bad Request error when not sending homeTeam or awayTeam', async () => {
        chaiHttpResponse = await chai.request(app).post('/matches').send(
          { 
            homeTeam: '', 
            awayTeam: matchMock.matchCorrectInput.awayTeam,
            homeTeamGoals: matchMock.matchCorrectInput.homeTeamGoals,
            awayTeamGoals: matchMock.matchCorrectInput.awayTeamGoals,
          }
        );
  
        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');

        chaiHttpResponse = await chai.request(app).post('/matches').send(
          { 
            homeTeam: matchMock.matchCorrectInput.homeTeam, 
            awayTeam: '',
            homeTeamGoals: matchMock.matchCorrectInput.homeTeamGoals,
            awayTeamGoals: matchMock.matchCorrectInput.awayTeamGoals,
          }
        );
  
        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
      });

      it('should receive a Bad Request error when not sending homeTeamGoals or awayTeamGoals', async () => {
        chaiHttpResponse = await chai.request(app).post('/matches').send(
          { 
            homeTeam: matchMock.matchCorrectInput.homeTeam, 
            awayTeam: matchMock.matchCorrectInput.awayTeam,
            homeTeamGoals: '',
            awayTeamGoals: matchMock.matchCorrectInput.awayTeamGoals,
          }
        );
        
        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');

       chaiHttpResponse = await chai.request(app).post('/matches').send(
          { 
            homeTeam: matchMock.matchCorrectInput.homeTeam, 
            awayTeam: matchMock.matchCorrectInput.awayTeam,
            homeTeamGoals: matchMock.matchCorrectInput.homeTeamGoals,
            awayTeamGoals: '',
          }
        );
        
        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
      });

      it('should receive a Bad Request error when not sending a number for homeTeam or awayTeam', async () => {
        chaiHttpResponse = await chai.request(app).post('/matches').send(
          { 
            homeTeam: 'notNumber', 
            awayTeam: matchMock.matchCorrectInput.awayTeam,
            homeTeamGoals: matchMock.matchCorrectInput.homeTeamGoals,
            awayTeamGoals: matchMock.matchCorrectInput.awayTeamGoals,
          }
        );
  
        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(chaiHttpResponse.body.message).to.be.equal('There is at least one incorrect value');

        chaiHttpResponse = await chai.request(app).post('/matches').send(
          { 
            homeTeam: matchMock.matchCorrectInput.homeTeam, 
            awayTeam: 'notNumber',
            homeTeamGoals: matchMock.matchCorrectInput.homeTeamGoals,
            awayTeamGoals: matchMock.matchCorrectInput.awayTeamGoals,
          }
        );
  
        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(chaiHttpResponse.body.message).to.be.equal('There is at least one incorrect value');
      });

      it('should receive a Bad Request error when not sending a number for homeTeamGoals or awayTeamGoals', async () => {
        chaiHttpResponse = await chai.request(app).post('/matches').send(
          { 
            homeTeam: matchMock.matchCorrectInput.homeTeam, 
            awayTeam: matchMock.matchCorrectInput.awayTeam,
            homeTeamGoals: 'notNumber',
            awayTeamGoals: matchMock.matchCorrectInput.awayTeamGoals,
          }
        );
        
        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(chaiHttpResponse.body.message).to.be.equal('There is at least one incorrect value');

       chaiHttpResponse = await chai.request(app).post('/matches').send(
          { 
            homeTeam: matchMock.matchCorrectInput.homeTeam, 
            awayTeam: matchMock.matchCorrectInput.awayTeam,
            homeTeamGoals: matchMock.matchCorrectInput.homeTeamGoals,
            awayTeamGoals: 'notNumber',
          }
        );
        
        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(chaiHttpResponse.body.message).to.be.equal('There is at least one incorrect value');
      });

      it('should receive a UnauthorizedError error when sending homeTeam equal to awayTeam', async () => {
        chaiHttpResponse = await chai.request(app).post('/matches').send(
          { 
            homeTeam: '1', 
            awayTeam: '1',
            homeTeamGoals: matchMock.matchCorrectInput.homeTeamGoals,
            awayTeamGoals: matchMock.matchCorrectInput.awayTeamGoals,
          }
        );
  
        expect(chaiHttpResponse.status).to.be.equal(401);
        expect(chaiHttpResponse.body.message).to.be.equal('It is not possible to create a match with two equal teams');
      });
    });
  });

  describe('PATCH /matches/:id/finish', () => {
    describe('When send an existent input', () => {
      before(async () => {
        sinon
          .stub(MatchModel, "update")
          .resolves(true as any);
        sinon
          .stub(MatchModel, "findByPk")
          .resolves(matchMock.matchResponse as MatchModel);
      });
  
      after(()=>{
        (MatchModel.findByPk as sinon.SinonStub).restore();
        (MatchModel.update as sinon.SinonStub).restore();
      });
  
      it('should finish a match by id when sending an existing id by URL', async () => {
        chaiHttpResponse = await chai.request(app).patch('/matches/1/finish');
    
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body.message).to.be.equal('Finished');
      });
    });
  
    describe('When send a non-existent input', () => {
      before(async () => {
        sinon
          .stub(MatchModel, "findByPk")
          .resolves(null);
      });
  
      after(()=>{
        (MatchModel.findByPk as sinon.SinonStub).restore();
      });
  
      it('should receive Not Found error when sending a non-existing id by URL', async () => {
        chaiHttpResponse = await chai.request(app).patch('/matches/1/finish');
  
        expect(chaiHttpResponse.status).to.be.equal(404);
        expect(chaiHttpResponse.body.message).to.be.equal('There is no match with such id!');
      });
    });
  });

  describe('PATCH /matches/:id', () => {
    describe('When send an existent input', () => {
      before(async () => {
        sinon
          .stub(MatchModel, "update")
          .resolves(true as any);
        sinon
          .stub(MatchModel, "findByPk")
          .resolves(matchMock.matchResponse as MatchModel);
      });
  
      after(()=>{
        (MatchModel.findByPk as sinon.SinonStub).restore();
        (MatchModel.update as sinon.SinonStub).restore();
      });
  
      it('should finish a match by id when sending an existing id by URL', async () => {
        chaiHttpResponse = await chai.request(app).patch('/matches/1').send(
          { 
            homeTeamGoals: matchMock.matchCorrectInput.homeTeamGoals,
            awayTeamGoals: matchMock.matchCorrectInput.awayTeamGoals,
          }
        );
    
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body.message).to.be.equal('Updated');
      });
    });
  
    describe('When send a non-existent input', () => {
      before(async () => {
        sinon
          .stub(MatchModel, "findByPk")
          .resolves(null);
      });
  
      after(()=>{
        (MatchModel.findByPk as sinon.SinonStub).restore();
      });
  
      it('should receive Not Found error when sending a non-existing id by URL', async () => {
        chaiHttpResponse = await chai.request(app).patch('/matches/1').send(
          { 
            homeTeamGoals: matchMock.matchCorrectInput.homeTeamGoals,
            awayTeamGoals: matchMock.matchCorrectInput.awayTeamGoals,
          }
        );;
  
        expect(chaiHttpResponse.status).to.be.equal(404);
        expect(chaiHttpResponse.body.message).to.be.equal('There is no match with such id!');
      });
    });
  });
});