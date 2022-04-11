module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  roots: ['./src'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
