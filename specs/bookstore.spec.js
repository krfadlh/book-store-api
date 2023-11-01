import axios from 'axios';
import { use as chaiUse } from 'chai';
import chaiWebdriver from 'chai-webdriverio';
import { DATA } from '../utils/constant/data.js';

chaiUse(chaiWebdriver(browser));

describe('Bookstore API Automation', () => {

  console.log('test');

  it('Authenticate user', async () => {
    const request = {
      userName: DATA.USERNAME,
      password: DATA.PASSWORD
    };

    const response =  await axios.post(`${DATA.API_URL}/Account/v1/Authorized`, request);
  });


  it('Should create a new book', async () => {
    const request = {
      userId: DATA.USERID,
      collectionOfIsbns: [
        {
          isbn: '9781449325862'
        }
      ]
    };

    const response = await axios.post(`${DATA.API_URL}/swagger/BookStore/v1/Books`, request);

    // Perform assertions on the response using Chai
    chai.expect(response.status).to.equal(201);
    chai.expect(response.data).to.have.property('isbn');
  });

  it('Should delete a book', async () => {
    const UserId = DATA.USERID; 
    const response = await axios.delete(`${DATA.API_URL}/swagger/BookStore/v1/Books/UserId=${UserId}`);

    // Perform assertions on the response using Chai
    chai.expect(response.status).to.equal(204);
  });
});
