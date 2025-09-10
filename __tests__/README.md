# Test Suite

Simple and minimal tests for AI Studio core functionalities.

## Setup

Install test dependencies:
```bash
npm install
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Test Coverage

- **API Tests** (`api/generate.test.ts`): Tests the generation API endpoint
- **Storage Tests** (`lib/storage.test.ts`): Tests localStorage utilities 
- **Hook Tests** (`hooks/useGeneration.test.ts`): Tests the useGeneration custom hook
- **Utils Tests** (`lib/imageUtils.test.ts`): Tests image processing utilities

## What's Tested

- ✅ API validation and responses
- ✅ LocalStorage operations (add, load, clear, limit)
- ✅ Generation hook state management and error handling
- ✅ Image file processing and validation

All tests are kept minimal and focused on core functionality without over-engineering. 