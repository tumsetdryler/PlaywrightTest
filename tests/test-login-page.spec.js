const {test, expect} = require('./fixtures');

test('test login page positive functionality', async ({ page }) => {
  // Verify link is available and click
  await page.getByRole('link', { name: 'Test Login Page' }).click();

  // Establish locators constants
  const usernameLocator = page.getByRole('textbox', { name: 'Username' });
  const passwordLocator = page.getByRole('textbox', { name: 'Password' });
  const loginButtonLocator = page.getByRole('button', { name: 'Login' });
  const logoutButtonLocator = page.getByRole('link', { name: 'Logout' });

  // Verify the username and password input fields, as well as the login button, are visible
  await expect(usernameLocator).toBeVisible();
  await expect(passwordLocator).toBeVisible();
  await expect(loginButtonLocator).toBeVisible();

  // Input the username and password from the page into the correct fields and login
  await usernameLocator.click();
  await usernameLocator.fill('practice');
  await passwordLocator.click();
  await passwordLocator.fill('SuperSecretPassword!');
  await loginButtonLocator.click();

  // Verify we are logged in and can see the logout button, click logout
  await expect(logoutButtonLocator).toBeVisible();
  await logoutButtonLocator.click();

  // Verify we are back to the original login page
  await expect(usernameLocator).toBeVisible();
  await expect(passwordLocator).toBeVisible();
  await expect(loginButtonLocator).toBeVisible();
});

test('test login page negative functionality wrong password', async ({ page }) => {
  // Verify link is available and click
  await page.getByRole('link', { name: 'Test Login Page' }).click();

  // Establish locators constants
  const usernameLocator = page.getByRole('textbox', { name: 'Username' });
  const passwordLocator = page.getByRole('textbox', { name: 'Password' });
  const loginButtonLocator = page.getByRole('button', { name: 'Login' });
  const logoutButtonLocator = page.getByRole('link', { name: 'Logout' });

  // Verify the username and password input fields, as well as the login button, are visible
  await expect(usernameLocator).toBeVisible();
  await expect(passwordLocator).toBeVisible();
  await expect(loginButtonLocator).toBeVisible();

  // Input the username and password from the page into the correct fields and login
  await usernameLocator.click();
  await usernameLocator.fill('practice');
  await passwordLocator.click();
  await passwordLocator.fill('wrongpassword');
  await loginButtonLocator.click();

  // Verify that the 'Your password is invalid!' text shows up
  await expect(page.locator('#flash-message')).toBeVisible();
  await expect(page.locator('#flash')).toContainText('Your password is invalid!');
});

test('test login page negative functionality wrong username', async ({ page }) => {
  // Verify link is available and click
  await page.getByRole('link', { name: 'Test Login Page' }).click();

  // Establish locators constants
  const usernameLocator = page.getByRole('textbox', { name: 'Username' });
  const passwordLocator = page.getByRole('textbox', { name: 'Password' });
  const loginButtonLocator = page.getByRole('button', { name: 'Login' });
  const logoutButtonLocator = page.getByRole('link', { name: 'Logout' });

  // Verify the username and password input fields, as well as the login button, are visible
  await expect(usernameLocator).toBeVisible();
  await expect(passwordLocator).toBeVisible();
  await expect(loginButtonLocator).toBeVisible();

  // Input the username and password from the page into the correct fields and login
  await usernameLocator.click();
  await usernameLocator.fill('wrongusername');
  await passwordLocator.click();
  await passwordLocator.fill('SuperSecretPassword!');
  await loginButtonLocator.click();

  // Verify that the 'Your password is invalid!' text shows up
  await expect(page.locator('#flash-message')).toBeVisible();
  await expect(page.locator('#flash')).toContainText('Your username is invalid!');
});