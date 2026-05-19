const {test, expect} = require('./fixtures');

// Helper Functions

async function input_login_credentials(page = page, usernameLocator = usernameLocator, passwordLocator = passwordLocator, loginButtonLocator = loginButtonLocator, logoutButtonLocator = logoutButtonLocator, username, password)
{
  // Verify the username and password input fields, as well as the login button, are visible
  await expect(usernameLocator).toBeVisible();
  await expect(passwordLocator).toBeVisible();
  await expect(loginButtonLocator).toBeVisible();

  // Input the username and password from the page into the correct fields and login
  await usernameLocator.click();
  await usernameLocator.fill(username);
  await passwordLocator.click();
  await passwordLocator.fill(password);
  await loginButtonLocator.click();
}

// End Helper Functions

test('test login page positive functionality', async ({ page }) => {
  // Verify link is available and click
  await page.getByRole('link', { name: 'Test Login Page' }).click();

  // Establish locators constants
  const usernameLocator = page.getByRole('textbox', { name: 'Username' });
  const passwordLocator = page.getByRole('textbox', { name: 'Password' });
  const loginButtonLocator = page.getByRole('button', { name: 'Login' });
  const logoutButtonLocator = page.getByRole('link', { name: 'Logout' });

  input_login_credentials(page, usernameLocator, passwordLocator, loginButtonLocator, logoutButtonLocator, 'practice', 'SuperSecretPassword!');

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

  input_login_credentials(page, usernameLocator, passwordLocator, loginButtonLocator, logoutButtonLocator, 'practice', 'wrongpassword');

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

  input_login_credentials(page, usernameLocator, passwordLocator, loginButtonLocator, logoutButtonLocator, 'wrongusername', 'SuperSecretPassword!');

  // Verify that the 'Your username is invalid!' text shows up
  await expect(page.locator('#flash-message')).toBeVisible();
  await expect(page.locator('#flash')).toContainText('Your username is invalid!');
});

test('test login page negative functionality wrong username and password', async ({ page }) => {
  // Verify link is available and click
  await page.getByRole('link', { name: 'Test Login Page' }).click();

  // Establish locators constants
  const usernameLocator = page.getByRole('textbox', { name: 'Username' });
  const passwordLocator = page.getByRole('textbox', { name: 'Password' });
  const loginButtonLocator = page.getByRole('button', { name: 'Login' });
  const logoutButtonLocator = page.getByRole('link', { name: 'Logout' });

  input_login_credentials(page, usernameLocator, passwordLocator, loginButtonLocator, logoutButtonLocator, 'wrongusername', 'wrongpassword');

  // Verify that the 'Your username is invalid!' text shows up
  // NOTE: Despite both the username and password being incorrect, it checks the error first, so it should always show that error.
  await expect(page.locator('#flash-message')).toBeVisible();
  await expect(page.locator('#flash')).toContainText('Your username is invalid!');
});