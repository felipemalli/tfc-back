// import * as sinon from 'sinon';
// import * as chai from 'chai';
// // @ts-ignore
// import chaiHttp = require('chai-http');

// import { app } from '../app';
// import TeamModel from '../database/models/TeamModel';

// import { Response } from 'superagent';

// chai.use(chaiHttp);

// const { expect } = chai;

// describe('Seu teste', () => {

//   let chaiHttpResponse: Response;

//   before(async () => {
//     sinon
//       .stub(TeamModel, "findOne")
//       .resolves({
//         ...<Seu mock>
//       } as TeamModel);
//   });

//   after(()=>{
//     (Example.findOne as sinon.SinonStub).restore();
//   })

//   it('...', async () => {
//     chaiHttpResponse = await chai
//        .request(app)
//        ...

//     expect(...)
//   });

//   it('Seu sub-teste', () => {
//     expect(false).to.be.eq(true);
//   });
// });
