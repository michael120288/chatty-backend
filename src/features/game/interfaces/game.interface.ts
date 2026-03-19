export interface ISuccessCondition {
  type: 'stdout_contains' | 'screenshot_exists' | 'no_error';
  value?: string;
}

export interface ILevel {
  id: string;
  order: number;
  category: 'ui' | 'api' | 'cypress-ui' | 'jest';
  tool?: 'playwright' | 'cypress' | 'cypress-component' | 'jest';
  title: string;
  story: string;
  objective: string;
  targetUrl?: string;
  xpReward: number;
  starterCode: string;
  successCondition: ISuccessCondition;
  hints: string[];
  tags: string[];
}

export interface ISubmissionRequest {
  levelId: string;
  code: string;
}

export interface ISubmissionResult {
  levelId: string;
  passed: boolean;
  stdout: string;
  stderr: string;
  xpAwarded: number;
  exitCode: number;
  screenshotBase64?: string;
  message: string;
}

export interface IDockerRunResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  timedOut: boolean;
}
