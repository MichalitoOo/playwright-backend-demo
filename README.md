# Back-End API Test Automation Project

## Overview

This project is designed to automate the testing of backend APIs using [Playwright](https://playwright.dev/). It validates the functionality, performance, and structure of API responses to ensure reliability and correctness.

## Features
- **Dynamic Test Data**: Centralized JSON file (`testData.json`) for test configurations.
- **Schema Validation**: Validates API response structures against predefined JSON schema (`responseSchemas.json`).
- **Performance Testing**: Measures and asserts API response times.
- **Logging**: Logs key request and response details for debugging and reporting.
- **Scalability**: Modular and maintainable structure for easy addition of new tests.



## Project Structure
```plaintext
backend-test-automation/
├── tests
│   └── users.test.js    # Tests for user-related data API
├── responseSchema.json  # JSON schema for response validation
├── testData.json        # Test data for API requests
├── .env                 # Environment variables file.
├── README.md            # Project documentation
└── package.json         # Project dependencies
```

## Prerequisites

Before running the tests, ensure you have the following installed:

- **Node.js**: Runtime environment.
- **Playwright**: Framework for API and web testing.
- **Ajv**: JSON schema validation library.

## Setup

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd backend-test-automation
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. (Optional) Add any additional test data or schemas as needed.


## How to Run Tests

Run all tests using the following command:

```bash
npx playwright test
```

To run a specific test file:

```bash
npx playwright test tests/<file_name>
```