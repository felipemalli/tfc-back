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

describe('GET /teams', () => {
  let chaiHttpResponse: Response;

  describe('When searching', () => {
    before(async () => {
      return sinon
        .stub(TeamModel, "findAll")
        .resolves(teamMock as unknown as TeamModel[]);
    });

    after(()=>{
      (TeamModel.findAll as sinon.SinonStub).restore();
    });

    it('should receive all teams', async () => {
      chaiHttpResponse = await chai.request(app).get('/teams');
  
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.eql(teamMock);
    });
  });
});

describe('GET /teams/:id', () => {
  let chaiHttpResponse: Response;

  describe('When send a correct input', () => {
    before(async () => {
      return sinon
        .stub(TeamModel, "findByPk")
        .resolves(teamMock[0] as unknown as TeamModel);
    });

    after(()=>{
      (TeamModel.findByPk as sinon.SinonStub).restore();
    });

    it('should receive a team by id', async () => {
      chaiHttpResponse = await chai.request(app).get('/teams/1');
  
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.eql(teamMock[0]);
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

    it('should receive Not Found error when sending non-existing id', async () => {
      chaiHttpResponse = await chai.request(app).get('/teams/1');

      expect(chaiHttpResponse.status).to.be.equal(404);
      expect(chaiHttpResponse.body.message).to.be.equal('There is no team with such id!');
    });
  });
});