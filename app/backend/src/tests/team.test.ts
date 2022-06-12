import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/TeamModel';
import teamMock from './mocks/teamMock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams', () => {
  let chaiHttpResponse: Response;

  describe('GET /teams', () => {
    describe('When searching', () => {
      afterEach(()=>{
        (TeamModel.findAll as sinon.SinonStub).restore();
      });
  
      it('should receive all teams', async () => {
        sinon.stub(TeamModel, "findAll").resolves(teamMock.teamResponse as TeamModel[]);

        chaiHttpResponse = await chai.request(app).get('/teams');
    
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.eql(teamMock.teamResponse);
      });

      it('should receive a Not Found error if there are no teams', async () => {
        sinon.stub(TeamModel, "findAll").resolves([]);

        chaiHttpResponse = await chai.request(app).get('/teams');
    
        expect(chaiHttpResponse.status).to.be.equal(404);
        expect(chaiHttpResponse.body.message).to.be.equal('There is no teams!');
      });
    });
  });
  
  describe('GET /teams/:id', () => {
    describe('When send an existent input', () => {
      before(async () => {
        return sinon
          .stub(TeamModel, "findByPk")
          .resolves(teamMock.teamResponse[0] as TeamModel);
      });
  
      after(()=>{
        (TeamModel.findByPk as sinon.SinonStub).restore();
      });
  
      it('should receive a team by id when sending an existing id by URL', async () => {
        chaiHttpResponse = await chai.request(app).get('/teams/1');
    
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.eql(teamMock.teamResponse[0]);
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
  
      it('should receive a Not Found error when sending a non-existing id by URL', async () => {
        chaiHttpResponse = await chai.request(app).get('/teams/1');
  
        expect(chaiHttpResponse.status).to.be.equal(404);
        expect(chaiHttpResponse.body.message).to.be.equal('There is no team with such id!');
      });
    });
  });
});