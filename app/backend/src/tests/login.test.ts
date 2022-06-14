import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore 
import chaiHttp = require('chai-http');

import { app } from '../app';

import UserModel from '../database/models/UserModel';
import userMock from './mocks/userMock';

import * as jsonwebtoken from 'jsonwebtoken';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login', () => {
  let chaiHttpResponse: Response;

  describe('POST /login', () => {
    describe('When send an existent input', () => {
      before(async () => {
        sinon
          .stub(UserModel, "findOne")
          .resolves(userMock.userResponse as UserModel);
      });
  
      after(()=>{
        (UserModel.findOne as sinon.SinonStub).restore();
      });
  
      it('should receive correct propertys', async () => {
        chaiHttpResponse = await chai.request(app).post('/login').send(userMock.userCorrectInput);
    
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.include.all.keys('user', 'token');
        expect(chaiHttpResponse.body.user).to.include.all.keys('id', 'username', 'role', 'email');
        expect(chaiHttpResponse.body.user).not.to.have.property('password');
      });
  
      it('should receive correct values', () => {
        (Object.keys(chaiHttpResponse.body.user)).forEach((key: any) => {
          expect(chaiHttpResponse.body.user[key]).equal(userMock.userResponse[key as keyof typeof userMock.userResponse])})
      });
    });
  
    describe('When send a non-existent input', () => {
      afterEach(()=>{
        (UserModel.findOne as sinon.SinonStub).restore();
      })
      
      it('should receive an Unauthorized error when sending incorrect email', async () => {
        sinon.stub(UserModel, "findOne").resolves(null);
  
        chaiHttpResponse = await chai.request(app).post('/login').send(
          { 
            email: userMock.userIncorrectInput.email, 
            password: userMock.userCorrectInput.password,
          }
        );
  
        expect(chaiHttpResponse.status).to.be.equal(401);
        expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
      });
  
      it('should receive an Unauthorized error when sending incorrect password', async () => {
        sinon.stub(UserModel, "findOne").resolves(userMock.userResponse as UserModel);
  
        chaiHttpResponse = await chai.request(app).post('/login').send(
          { 
            email: userMock.userCorrectInput.email, 
            password: userMock.userIncorrectInput.password,
          }
        );
  
        expect(chaiHttpResponse.status).to.be.equal(401);
        expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
      });
    });
  
    describe('When send invalid input', () => {
      it('should receive a Bad Request error when not sending email', async () => {
        chaiHttpResponse = await chai.request(app).post('/login').send(
          { 
            email: '', 
            password: userMock.userCorrectInput.password,
          }
        );
  
        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
      });
  
      it('should receive a Bad Request error when not sending password', async () => {
        chaiHttpResponse = await chai.request(app).post('/login').send(
          { 
            email: userMock.userCorrectInput.email,
            password: '',
          }
        );
  
        expect(chaiHttpResponse.status).to.be.equal(400);
        expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
      });
  
      it('should receive an Unauthorized error when sending email in incorrect format', async () => {
        chaiHttpResponse = await chai.request(app).post('/login').send(
          { 
            email: 'invalidEmail',
            password: userMock.userCorrectInput.password,
          }
        );
  
        expect(chaiHttpResponse.status).to.be.equal(401);
        expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
      });
  
      it('should receive an Unauthorized error when sending password with length less than 6', async () => {
        chaiHttpResponse = await chai.request(app).post('/login').send(
          { 
            email: userMock.userCorrectInput.email,
            password: '12345',
          }
        );
  
        expect(chaiHttpResponse.status).to.be.equal(401);
        expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
      });
    });
  });
  
  describe('GET /login/validate', () => {
    afterEach(()=>{
      sinon.restore();
    });
  
    describe('When send a valid token and existent input', () => {
      before(async () => {
        sinon.stub(jsonwebtoken, "verify")
          .resolves({ email: userMock.userResponse.email });
        sinon
          .stub(UserModel, "findOne")
          .resolves(userMock.userResponse as UserModel);
      });

      it('should receive the role when sending correct token and email', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .get('/login/validate')
          .set({authorization: userMock.userTokenResponse.token});
    
        expect(chaiHttpResponse).to.have.status(200);
        expect(chaiHttpResponse.body).to.equal('admin');
      });
    });

    describe('When send a valid token and non-existent input', () => {
      before(async () => {
        sinon.stub(jsonwebtoken, "verify")
          .resolves({ email: userMock.userIncorrectInput.email });
        sinon
          .stub(UserModel, "findOne")
          .resolves(null);
      });

      it('should receive an Unauthorized error when sending incorrect email', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .get('/login/validate')
          .set({authorization: userMock.userTokenResponse.token});

        expect(chaiHttpResponse.status).to.be.equal(401);
        expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email');
      });
    });
  
    describe('When send a invalid token', () => {
      before(async () => {
        sinon.stub(jsonwebtoken, "verify").throws();
      });
  
      it('should receive an Unauthorized error when sending wrong token', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .get('/login/validate')
          .set({authorization: userMock.userTokenResponse.token});
    
        expect(chaiHttpResponse.status).to.be.equal(401);
        expect(chaiHttpResponse.body.message).to.be.equal('Expired or invalid token');
      });
  
      it('should receive an Unauthorized error with empty token', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .get('/login/validate');
    
        expect(chaiHttpResponse.status).to.be.equal(401);
        expect(chaiHttpResponse.body.message).to.be.equal('Token not found');
      });
    });
  });
});