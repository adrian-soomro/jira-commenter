import * as fs from "fs";
import del from "del";
import { params } from "../config";
import {
  getPathToTemporaryDirectory,
  runTest,
  shareInputParamsWithMockTestRunner,
} from "./testUtils";

describe("Jira Commenter", () => {
  const paramKeys = params.map((param) => param.key);
  const pathToTemporaryDirectory = getPathToTemporaryDirectory();

  // # TODO
  // [x] test inputs are parsed correctly
  // [x] test they are validated
  // [x] get inputs
  // [x] parse them
  // [ ] validate them
  // [ ] make the call

  beforeEach(() => {
    if (!fs.existsSync(pathToTemporaryDirectory)) {
      fs.mkdirSync(pathToTemporaryDirectory);
    }
  });

  afterEach(async () => {
    await del(pathToTemporaryDirectory, { force: true });
  });

  // test using this convoluted way of setting up mocks
  it("parses required inputs", () => {
    shareInputParamsWithMockTestRunner(params);

    const mockTestRunner = runTest();

    expect(mockTestRunner.succeeded).toBe(true);
    expect(mockTestRunner.warningIssues.length).toBe(0);
    expect(mockTestRunner.errorIssues.length).toBe(0);
  });

  // test using this convoluted way of setting up mocks
  it.each(paramKeys)("throws if %s is missing", (paramKey) => {
    const copyOfParams = [...params];

    const incompleteParams = copyOfParams.filter(
      (param) => param.key !== paramKey
    );

    shareInputParamsWithMockTestRunner(incompleteParams);

    const mockTestRunner = runTest();

    expect(mockTestRunner.succeeded).toBe(false);
    expect(mockTestRunner.errorIssues.length).toBe(1);
    expect(mockTestRunner.errorIssues).toContain(`Input required: ${paramKey}`);
  });

  it("throws when input is ''", () => {
    const copyOfParams = [...params];
    const paramKeyToRemove = "email";
    const incompleteParams = copyOfParams.filter(
      (param) => param.key !== paramKeyToRemove
    );
    const inputParams = [
      ...incompleteParams,
      { key: paramKeyToRemove, value: "" },
    ];

    shareInputParamsWithMockTestRunner(inputParams);

    const mockTestRunner = runTest();

    expect(mockTestRunner.succeeded).toBe(false);
    expect(mockTestRunner.errorIssues.length).toBe(1);
    expect(mockTestRunner.errorIssues).toContain(
      `Input required: ${paramKeyToRemove}`
    );
  });
});
