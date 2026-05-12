import { test, expect } from '@playwright/test';

// Helper Functions

async function verify_web_inputs_fields(page) {
  // Verify all inputs are visible and empty
  console.log("Helper started");
  await expect(page.getByRole('spinbutton', { name: 'Input: Number' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Input: Text' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Input: Password' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Input: Date' })).toBeVisible();
  await expect(page.getByRole('spinbutton', { name: 'Input: Number' })).toBeEmpty();
  await expect(page.getByRole('textbox', { name: 'Input: Text' })).toBeEmpty();
  await expect(page.getByRole('textbox', { name: 'Input: Password' })).toBeEmpty();
  await expect(page.getByRole('textbox', { name: 'Input: Date' })).toBeEmpty();
  console.log("Helper finished");
}

// End Helper Functions

test.beforeEach(async ({ page }) => {
  // Set up network interception to block ads
  await page.route(/(ads|doubleclick|googlesyndication|tracker)/i, route => {
    route.abort();
  });

  // Go to landing page
  await page.goto('https://practice.expandtesting.com/');
});

test('landing page has title', async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Automation Testing Practice Website for QA and Developers | UI and API");
});

test('web inputs page positive functionality', async ({ page, browserName }) => {
  // Verify link is available and click
  await expect(page.getByRole('link', { name: 'Web inputs' })).toBeVisible();
  await page.getByRole('link', { name: 'Web inputs' }).click();

  await page.waitForTimeout(500);

  await expect(page.getByRole('spinbutton', { name: 'Input: Number' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Input: Text' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Input: Password' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Input: Date' })).toBeVisible();
  await expect(page.getByRole('spinbutton', { name: 'Input: Number' })).toBeEmpty();
  await expect(page.getByRole('textbox', { name: 'Input: Text' })).toBeEmpty();
  await expect(page.getByRole('textbox', { name: 'Input: Password' })).toBeEmpty();
  await expect(page.getByRole('textbox', { name: 'Input: Date' })).toBeEmpty();

  // Input values into each input field
  await page.getByRole('spinbutton', { name: 'Input: Number' }).click();
  await page.getByRole('spinbutton', { name: 'Input: Number' }).pressSequentially('32');
  await page.getByRole('textbox', { name: 'Input: Text' }).click();
  await page.getByRole('textbox', { name: 'Input: Text' }).pressSequentially('bazinga');
  await page.getByRole('textbox', { name: 'Input: Password' }).click();
  await page.getByRole('textbox', { name: 'Input: Password' }).pressSequentially('planet');
  await page.getByRole('textbox', { name: 'Input: Date' }).click();
  await page.getByRole('textbox', { name: 'Input: Date' }).pressSequentially('01162010');

  // Click Display Inputs button
  await page.getByRole('button', { name: 'Display Inputs' }).click();

  // Verify each of outputs match input values
  await expect(page.locator('#output-number')).toContainText('32');
  await expect(page.locator('#output-text')).toContainText('bazinga');
  await expect(page.locator('#output-password')).toContainText('planet');
  if(browserName === 'webkit')
  {
    await expect(page.locator('#output-date')).toContainText('01162010');
  }
  else
  {
    await expect(page.locator('#output-date')).toContainText('2010-01-16');
  }

  // Clear the page with the Clear Inputs button
  await page.getByRole('button', { name: 'Clear Inputs' }).click();

  await expect(page.getByRole('spinbutton', { name: 'Input: Number' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Input: Text' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Input: Password' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Input: Date' })).toBeVisible();
  await expect(page.getByRole('spinbutton', { name: 'Input: Number' })).toBeEmpty();
  await expect(page.getByRole('textbox', { name: 'Input: Text' })).toBeEmpty();
  await expect(page.getByRole('textbox', { name: 'Input: Password' })).toBeEmpty();
  await expect(page.getByRole('textbox', { name: 'Input: Date' })).toBeEmpty();
});
