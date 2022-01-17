import * as fs from "fs";
import { join } from "path";
import { TaskMockRunner } from "azure-pipelines-task-lib/mock-run";
import { MockTestRunner } from "azure-pipelines-task-lib/mock-test";
import { Parameter } from "../config";

export const setupTaskMockRunner = (
  ...inputs: { key: string; value: string }[]
) => {
  const taskPath = join(__dirname, "..", "index.js");
  const taskMockRunner = new TaskMockRunner(taskPath);
  inputs.forEach((input) => {
    taskMockRunner.setInput(input.key, input.value);
  });
  taskMockRunner.run();
  return taskMockRunner;
};

export const runTest = () => {
  const pathToMockRunner = join(__dirname, "../dist/test/mockRunner.js");
  const mockTestRunner = new MockTestRunner(pathToMockRunner);
  mockTestRunner.run();
  return mockTestRunner;
};

export const shareInputParamsWithMockTestRunner = (
  inputParams: Parameter[]
) => {
  fs.writeFileSync(
    `${getPathToTemporaryDirectory()}/testData.json`,
    JSON.stringify(inputParams)
  );
};

export const getPathToTemporaryDirectory = () => "../tmp";
