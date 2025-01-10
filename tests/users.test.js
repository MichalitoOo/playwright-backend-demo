const { test, expect } = require('@playwright/test');
const Ajv = require('ajv'); // Import Ajv for schema validation
const addFormats = require("ajv-formats");
const ajv = new Ajv();
addFormats(ajv); // Add formating check

const allTestData = require('../testData.json');
const schema = require('../responseSchemas.json'); // Load JSON schema from an external file


test('GET - Fetch users on page', async ({ request }) => {
  const testData = allTestData.fetchUsersOnPage;

  // Log the API request details
  console.log('--- API Request info ---');
  console.log(`Endpoint: ${testData.endpoint}`);
  console.log('Query Parameters:', JSON.stringify(testData.queryParams, null, 2)); // Pretty-printing JSON

  // Measure response time
  const startTime = Date.now();
  // API call
  const response = await request.get(testData.endpoint, {
    params: testData.queryParams,
  });
  const endTime = Date.now();

  // Calculate response time
  const responseTime = endTime - startTime;

  console.log('--- API Response ---');
  console.log(`Response Status: ${response.status()}`);
  console.log(`API Response Time: ${responseTime} ms`);

  // Assert status code
  expect(response.status()).toBe(200);

  // Parse the response body
  const responseBody = await response.json();

  // Log the response body
  console.log(`Response Body: ${JSON.stringify(responseBody, null, 2)}`); // Pretty-printing JSON
  
  // JSON schema validation
  const validate = ajv.compile(schema.fetchUsersOnPage); // Generate validate function with rules defined in schema
  const valid = validate(responseBody); // Use validate function against the responseBody

  // Assert response JSON matches the schema
  expect(valid).toBe(true);

  // Assert total number of users
  expect(responseBody.total).toBe(testData.validationData.total);

  // Assert users' last names dynamically
  for (const userValidation of testData.validationData.users) {
    const user = responseBody.data[userValidation.index];
    expect(user.last_name).toBe(userValidation.last_name);
  }

  // Assert number of users on the page is not greater than total
  expect(responseBody.data.length).toBeLessThanOrEqual(responseBody.total);
  
  // Assert response time
  expect(responseTime).toBeLessThan(testData.maxResponseTime);
});

test('GET - Fetch user by ID', async ({ request }) => {
  const testData = allTestData.fetchUserByID;

  // Log the API request details
  console.log('--- API Request ---');
  console.log(`Endpoint: ${testData.endpoint}`);
  console.log(`Query Params: ${JSON.stringify(testData.queryParams, null, 2)}`); // Pretty-printing JSON

  // Measure response time
  const startTime = Date.now();
  // API call
  const response = await request.get(testData.endpoint, {
    params: testData.queryParams,
  });
  const endTime = Date.now();

  // Calculate response time
  const responseTime = endTime - startTime;

  console.log('--- API Response ---');
  console.log(`Response Status: ${response.status()}`);
  console.log(`API Response Time: ${responseTime} ms`);

  // Assert status code
  expect(response.status()).toBe(200);
  
  // Parse the response body
  const responseBody = await response.json();
  
  // Log the response body
  console.log(`Response Body: ${JSON.stringify(responseBody, null, 2)}`); // Pretty-printing JSON
  
  // JSON schema validation
  const validate = ajv.compile(schema.fetchUserByID); // Generate validate function with rules defined in schema
  const valid = validate(responseBody); // Use validate function against the responseBody

  // Assert response JSON matches the schema
  expect(valid).toBe(true);

  // Assert the correct user was fetched
  expect(responseBody.data.id).toBe(testData.queryParams.id);
  
  // Assert response time
  expect(responseTime).toBeLessThan(testData.maxResponseTime);
});

test('POST - Create user', async ({ request }) => {
  const testData = allTestData.createUser;

  // Log the API request details
  console.log('--- API Request ---');
  console.log(`Endpoint: ${testData.endpoint}`);
  console.log('Request Body:', JSON.stringify(testData.body, null, 2)); // Pretty-printing JSON

  // Measure response time
  const startTime = Date.now();
  // API call
  const response = await request.post(testData.endpoint, {
      data: testData.body
  });
  const endTime = Date.now();

  // Calculate response time
  const responseTime = endTime - startTime;

  console.log('--- API Response ---');
  console.log(`Response Status: ${response.status()}`);
  console.log(`API Response Time: ${responseTime} ms`);

  // Assert status code
  expect(response.status()).toBe(201);

  // Parse the response body
  const responseBody = await response.json();
  
  // Log the response body
  console.log(`Response Body: ${JSON.stringify(responseBody, null, 2)}`); // Pretty-printing JSON

  // JSON schema validation
  const validate = ajv.compile(schema.createUser); // Generate validate function with rules defined in schema
  const valid = validate(responseBody); //use validate function against the responseBody

  // Assert response JSON matches the schema
  expect(valid).toBe(true);

  // Additional assertions on response data
  expect(responseBody.name).toBe(testData.body.name);
  expect(responseBody.email).toBe(testData.body.email);
  expect(responseBody.createdAt).toBeTruthy();
  expect(Number(responseBody.id)).toBeGreaterThan(0);

  // Log user creation success
  console.log(`User created with ID: ${responseBody.id}`);
  
  // Assert response time
  expect(responseTime).toBeLessThan(testData.maxResponseTime);
});