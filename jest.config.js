module.exports = {
  preset: 'ts-jest',
  collectCoverage: true,
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsConfig: './test/tsconfig.json'
    }
  }
}
