# ConvayAssessment
This automation project for the Conway Meeting Platform uses Playwright (JavaScript) to validate host meeting creation, link sharing, participant joining from another browser, and essential audio checks such as mic mute/unmute and WebRTC-based microphone permission verification..

# Convay Meeting Automation

Automation Testing for the [Convay](https://www.convay.com/)  
This project validates core meeting flows using **Playwright**, **JavaScript**, and the **Page Object Model (POM)** pattern.

---

## Packages Used
- `@playwright/test` — Playwright automation framework  
- `allure-playwright` — For Allure reporting  
- `node` — v16 or later required  

---

## Author
- [@shohelranashaon](https://github.com/shohelranashaon)

---

## Documentation

This is a **Page Object Model (POM)** based **automation framework** developed for the Convay Meeting mic/sound test.Every page has its own class,  and all **locators** are managed centrally inside a single `locators.js` file.

- **Page Object Model (POM) Architecture**  
- **Centralized Locator Management**  
- **Allure Report Generation**  
- Modular folder structure with clear separation of concerns 
- Reusable utilities for WebRTC, mic checks, waits, and custom assertions  
- Cross-browser support: Chromium, Firefox, WebKit  
---

## Prerequisites

To run this project, make sure you have:
- **Node.js** version **16+**
- **Java** version **8+** (required for Allure commandline)


## Run Locally 
Clone The Project

```bash 
git clone https://github.com/shohelranashaon/ConvayAssessment.git

```
Change Project Directory

```bash 
cd ConvayAssessment
```
Install dependencies
```bash
npm install
```


## Run  test file
```bash
npx playwright test --headed
```
## Allure Report Setup 
**Step 1: Install Allure dependencies**
- For Allure playwright
```bash
npm i allure-playwright --save-dev
```
-For Allure Command Line
```bash
npm i allure-commandline --save-dev
```
**Step 2: Update playwright.config.js**
```bash
reporter: ['allure-playwright'],
```

**Step 3: Run tests and generate report**
```bash
npx playwright test --headed

```
**Step 4: Generate  Allure report**
```bash
allure generate allure-results --clean
```
**Step 5: Open Allure report**
```bash
allure open
```

