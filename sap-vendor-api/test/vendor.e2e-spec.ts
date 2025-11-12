import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Vendor API Endpoints (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/vendors (GET)', () => {
    return request(app.getHttpServer())
      .get('/vendors')
      .auth('username', 'password') // Replace with valid credentials
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
      });
  });

  it('/vendors (POST)', () => {
    return request(app.getHttpServer())
      .post('/vendors')
      .auth('username', 'password') // Replace with valid credentials
      .send({
        // Replace with valid input data structure
        name: 'New Vendor',
        items: [{ itemName: 'Item 1', quantity: 10 }],
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe('New Vendor');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});