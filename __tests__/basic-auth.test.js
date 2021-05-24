'use strict';

require('dotenv').config();
const supergoose = require('@code-fellows/supergoose');
const { app } = require('../src/server.js');
const request = supergoose(app);

let user = {
  username: 'wafa',
  password: '1234',
};

// POST to /signup to create a new user
// POST to /signin to login as a user (use basic auth)

describe('Test basic authentication', () => {
  it('POST to /signup to create a new user', async () => {
    const response = await request.post('/signup').send(user);
    expect(response.status).toEqual(201);
    expect(response.body.username).toEqual('wafa');
  });

  it('POST to /signin to login as a user (use basic auth)', async () => {
    const response = await request
      .post('/signin')
      .set(
        'Authorization',
        'basic ' + new Buffer.from(`${user.username}:${user.password}`, 'utf8').toString('base64'),
      );
    expect(response.status).toEqual(200);
    expect(response.body.username).toEqual(user.username);
  });


  it('test username', async () => {
    const response = await request
      .post('/signin')
      .set(
        'Authorization',
        'basic ' + new Buffer.from(`zzz: ${user.password}`, 'utf8').toString('base64'),
      );
    expect(response.status).toEqual(403);
  });

  it('test password', async () => {
    const response = await request
      .post('/signin')
      .set(
        'Authorization',
        'basic ' + new Buffer.from(`${user.username}:${123}`, 'utf8').toString('base64'),
      );
    expect(response.status).toEqual(500);
  });

});


