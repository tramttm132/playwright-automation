## 🧪 Playwright Automation Framework

Automation testing framework using Playwright + TypeScript, designed for scalable UI automation, suitable for complex products.

## 📌 Tech Stack
- Playwright
- TypeScript
- Node.js ≥ 18
- dotenv (environment management)

## 📁 Project Structure
```
playwright-automation/
│
├── tests/                # Test scenarios (WHAT to test)
│   ├── dashboard/
│   └── media-source/
├── pages/                # Page Object Model (HOW UI works)
│   ├── dashboard/
│   └── media-source/
├── fixtures/             # Test setup & reusable contexts
├── utils/                # Helper functions (API, wait, auth...)
├── test-data/            # Test data (JSON)
│
├── playwright.config.ts  # Playwright configuration
├── .env                  # Environment variables
├── package.json
└── README.md
```

## 🧠 Design Principles
Tests describe business scenarios
Pages handle UI logic & locators
No locator in test files
No hardcoded environment data
Readable like manual test cases
Easy to scale & maintain
## ▶️ Run Tests
### Run all tests
```npx playwright test```

### Run with UI mode
```npx playwright test --ui```

### Run specific folder
```npx playwright test tests/dashboard```

## 📊 Reporting & Debugging
### HTML report:
```npx playwright show-report```

### Debug mode:
```npx playwright test --debug```