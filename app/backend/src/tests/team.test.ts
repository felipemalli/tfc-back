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

  describe('When send existing inputs', () => {
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
