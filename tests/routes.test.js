const request = require('supertest');
const app = require('../app');

describe('Test the root path', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});

describe('Employee API Routes', () => {
  let data;
  beforeAll(async () => {
    let res = await request(app).post('/employees').send({
      name: 'Employee Mock',
      status: 'active',
    });
    data = res.body.data;
  });

  it('It should create a new employee', async () => {
    const res = await request(app).post('/employees').send({
      name: 'Employee Tests Create',
      status: 'active',
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('data');
    expect(res.body).toHaveProperty('data.employeeId');
  });

  it('It should not create a new employee', async () => {
    const res = await request(app).post('/employees').send({
      name: '',
      status: '',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('errors');
    expect(res.body).toHaveProperty('errors.name');
    expect(res.body).toHaveProperty('errors.status');
  });

  it('It should get employee list', async () => {
    const res = await request(app).get('/employees');
    expect(res.statusCode).toEqual(200);
  });

  it('It should get employee detail', async () => {
    const res = await request(app).get(`/employees/${data.employeeId}`);
    expect(res.statusCode).toEqual(200);
  });

  it('It should not get employee detail', async () => {
    const res = await request(app).get(`/employees/10000`);
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('message');
  });

  it('It should update employee', async () => {
    const res = await request(app).put(`/employees/${data.employeeId}`).send({
      name: 'Employee Update',
      status: 'active',
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
  });

  it('It should not update employee', async () => {
    const res = await request(app).put(`/employees/100000`).send({
      name: 'Employee Update',
      status: 'active',
    });
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('message');
  });

  it('It should delete employee', async () => {
    const res = await request(app).delete(`/employees/${data.employeeId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
  });

  it('It should not delete employee', async () => {
    const res = await request(app).delete(`/employees/10000`);
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('message');
  });
});
