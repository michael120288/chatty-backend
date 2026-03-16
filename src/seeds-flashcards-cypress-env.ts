import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({});

const API_URL = process.env.API_URL || 'http://localhost:5000/api/v1';
const USERNAME = process.env.SEED_USERNAME || 'admin';
const PASSWORD = process.env.SEED_PASSWORD || 'qwerty';

const CATEGORY = 'Cypress';

interface Card {
  question: string;
  answer: string;
  difficulty: string;
  questionCodeSnippet?: string;
  answerCodeSnippet?: string;
}

const cards: Card[] = [
  {
    question: 'What is a Cypress environment variable and how is it different from an OS environment variable?',
    answer:
      'A Cypress environment variable is a value available to your tests via Cypress.env(). It lives inside the Cypress runtime, not on process.env. OS env vars become Cypress env vars only when they carry the CYPRESS_ prefix.',
    difficulty: 'beginner'
  },
  {
    question: 'How many ways can you set environment variables in Cypress, and what are they?',
    answer:
      '6 ways: (1) cypress.config.js env key, (2) cypress.env.json file, (3) OS env var with CYPRESS_ prefix, (4) --env CLI flag, (5) setupNodeEvents function, (6) Cypress.env() call inside a test.',
    difficulty: 'intermediate'
  },
  {
    question: 'How do you read a single environment variable inside a Cypress test?',
    answer: 'Use Cypress.env(\'name\') — it returns the value, or undefined if not set.',
    answerCodeSnippet: `// cypress.config.js
env: { apiUrl: 'http://localhost:3000' }

// inside a test
const url = Cypress.env('apiUrl') // 'http://localhost:3000'`,
    difficulty: 'beginner'
  },
  {
    question: 'How do you set or override a Cypress environment variable from within a test?',
    answer:
      'Call Cypress.env(\'name\', value) to set a single variable, or Cypress.env({ key: value }) to merge multiple. Changes only last for the current test run — they do not persist.',
    answerCodeSnippet: `Cypress.env('token', 'abc123')
Cypress.env({ host: 'localhost', port: 4000 })`,
    difficulty: 'intermediate'
  },
  {
    question: 'What is cypress.env.json and where should it live?',
    answer:
      'A JSON file placed in your project root. Cypress loads it automatically at startup. Because it typically holds secrets (API keys, tokens), it should be added to .gitignore.',
    answerCodeSnippet: `// cypress.env.json
{
  "host": "dev.local",
  "api_server": "http://localhost:8888/api/v1/"
}`,
    difficulty: 'beginner'
  },
  {
    question: 'How do you set environment variables in cypress.config.js?',
    answer: 'Add an env key to the config object. All properties inside it become available via Cypress.env().',
    answerCodeSnippet: `import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    env: {
      apiUrl: 'http://localhost:5000',
      role: 'admin'
    }
  }
})`,
    difficulty: 'beginner'
  },
  {
    question: 'How do you pass environment variables via the Cypress CLI?',
    answer:
      'Use the --env flag with comma-separated key=value pairs. Spaces around commas are not allowed.',
    questionCodeSnippet: `cypress run --env key=value,key2=value2`,
    answerCodeSnippet: `cypress run --env host=dev.local,api_server=http://localhost:8888
// access in test:
Cypress.env('host')       // 'dev.local'
Cypress.env('api_server') // 'http://localhost:8888'`,
    difficulty: 'beginner'
  },
  {
    question: 'What prefix must an OS environment variable have for Cypress to pick it up automatically?',
    answer:
      'CYPRESS_ or cypress_. Cypress strips the prefix when making the variable available, so CYPRESS_HOST becomes Cypress.env(\'HOST\').',
    answerCodeSnippet: `# In your shell
export CYPRESS_HOST=laura.dev.local
export CYPRESS_API_KEY=secret123

# In a test
Cypress.env('HOST')    // 'laura.dev.local'
Cypress.env('API_KEY') // 'secret123'`,
    difficulty: 'intermediate'
  },
  {
    question: 'What happens to the CYPRESS_ prefix when the variable is loaded into Cypress?',
    answer:
      'Cypress automatically strips the prefix. CYPRESS_FOO becomes accessible as Cypress.env(\'FOO\'), not Cypress.env(\'CYPRESS_FOO\').',
    difficulty: 'intermediate'
  },
  {
    question: 'What is the precedence (priority) order of the 6 ways to set Cypress environment variables?',
    answer:
      'From lowest to highest: (1) cypress.config.js → (2) OS CYPRESS_ vars → (3) cypress.env.json → (4) --env CLI flag. Values from higher-priority sources override lower-priority ones. Calling Cypress.env() in a test overrides everything for the current run.',
    difficulty: 'advanced'
  },
  {
    question: 'How do you set environment variables dynamically inside setupNodeEvents in cypress.config.js?',
    answer:
      'Assign values to config.env inside the setupNodeEvents function and return config. This runs at startup, before any tests.',
    answerCodeSnippet: `import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      config.env.apiKey = process.env.API_KEY
      config.env.buildId = process.env.CI_BUILD_ID
      return config  // must return config
    }
  }
})`,
    difficulty: 'intermediate'
  },
  {
    question: 'What does Cypress.env() return when called with no arguments?',
    answer: 'An object containing all current environment variables and their values.',
    answerCodeSnippet: `// cypress.config.js env: { host: 'localhost', port: 4000 }

Cypress.env()
// => { host: 'localhost', port: 4000 }`,
    difficulty: 'beginner'
  },
  {
    question: 'Why should cypress.env.json be added to .gitignore?',
    answer:
      'It often contains sensitive data like API keys, tokens, or passwords. Committing it would expose secrets in your repository history.',
    difficulty: 'beginner'
  },
  {
    question: 'Which Cypress environment variable is reserved and must not be set by users?',
    answer:
      'CYPRESS_INTERNAL_ENV. Cypress uses it internally to manage its own environment (e.g., "production", "development"). Setting it yourself can cause unexpected behaviour and Cypress will print a warning.',
    difficulty: 'advanced'
  },
  {
    question: 'Do changes made to Cypress.env() inside a test persist to the next test run?',
    answer:
      'No. Changes made by calling Cypress.env() inside a test only last for the duration of that test run. They are not written back to any config file.',
    difficulty: 'intermediate'
  }
];

async function signIn(): Promise<{ token: string; profilePicture: string; avatarColor: string }> {
  const res = await axios.post(`${API_URL}/signin`, { username: USERNAME, password: PASSWORD });
  return {
    token: res.data.token,
    profilePicture: res.data.user?.profilePicture || '',
    avatarColor: res.data.user?.avatarColor || '#2196f3'
  };
}

async function seedCards(): Promise<void> {
  console.log(`Signing in as "${USERNAME}"...`);
  const { token, profilePicture } = await signIn();
  console.log('Signed in. Seeding Cypress env-var flashcards...\n');

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const body = {
      question: card.question,
      answer: card.answer,
      category: CATEGORY,
      difficulty: card.difficulty,
      questionCodeSnippet: card.questionCodeSnippet || '',
      answerCodeSnippet: card.answerCodeSnippet || '',
      privacy: 'public',
      profilePicture
    };

    try {
      await axios.post(`${API_URL}/cards`, body, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(`[${i + 1}/${cards.length}] Created: "${card.question.slice(0, 60)}..."`);
    } catch (err: any) {
      console.error(`[${i + 1}/${cards.length}] FAILED: ${err?.response?.data?.message || err.message}`);
    }
  }

  console.log('\nDone.');
}

seedCards().catch((err) => {
  console.error(err?.response?.data || err.message);
  process.exit(1);
});
