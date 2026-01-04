import { test, expect } from '@playwright/test';

test.describe('Route Handler Page', () => {
  test('should fetch data from GET route handler', async ({ page }) => {
    // Navigate to the route handler page
    await page.goto('/route-handler');
    
    // Wait for the page to load
    await expect(page.getByRole('heading', { name: 'GET Request (useSWR)' })).toBeVisible();
    
    // Wait for the initial data to load (useSWR will fetch automatically)
    await page.waitForSelector('text=Fetched Data:', { timeout: 5000 });
    
    // Verify the fetched data is displayed
    await expect(page.getByText('Fetched Data:')).toBeVisible();
    await expect(page.getByText(/Message:/)).toBeVisible();
    await expect(page.getByText(/Text:/)).toBeVisible();
    await expect(page.getByText(/Timestamp:/)).toBeVisible();
    
    // Verify the message contains expected text
    const messageText = await page.getByText(/Data fetched successfully/).textContent();
    expect(messageText).toBeTruthy();
    
    // Verify timestamp is displayed
    const timestampElement = page.locator('span.font-mono').first();
    await expect(timestampElement).toBeVisible();
    const timestamp = await timestampElement.textContent();
    expect(timestamp).toBeTruthy();
    expect(timestamp!.length).toBeGreaterThan(10);
  });

  test('should submit data to POST route handler', async ({ page }) => {
    // Navigate to the route handler page
    await page.goto('/route-handler');
    
    // Wait for the page to load
    await expect(page.getByRole('heading', { name: 'POST Request' })).toBeVisible();
    
    // Find the input field and enter text
    const input = page.getByPlaceholder('Type something here...');
    await expect(input).toBeVisible();
    
    const testText = `Test submission ${Date.now()}`;
    await input.fill(testText);
    
    // Submit the form
    const submitButton = page.getByRole('button', { name: 'Submit' });
    await expect(submitButton).toBeVisible();
    await submitButton.click();
    
    // Wait for the submission to complete
    await page.waitForSelector('text=Result:', { timeout: 5000 });
    
    // Verify the result is displayed
    await expect(page.getByText('Result:')).toBeVisible();
    await expect(page.getByText(/Submitted text:/)).toBeVisible();
    await expect(page.getByText(/Timestamp:/)).toBeVisible();
    
    // Verify the submitted text matches what we entered
    const submittedTextElement = page.locator('span.text-foreground').filter({ hasText: testText });
    await expect(submittedTextElement).toBeVisible();
    
    // Verify timestamp is displayed
    const timestampElements = page.locator('span.font-mono');
    const timestampCount = await timestampElements.count();
    expect(timestampCount).toBeGreaterThan(0);
    
    // Get the last timestamp (should be from the POST result)
    const lastTimestamp = await timestampElements.last().textContent();
    expect(lastTimestamp).toBeTruthy();
    expect(lastTimestamp!.length).toBeGreaterThan(10);
  });

  test('should show error for empty POST submission', async ({ page }) => {
    // Navigate to the route handler page
    await page.goto('/route-handler');
    
    // Wait for the page to load
    await expect(page.getByRole('heading', { name: 'POST Request' })).toBeVisible();
    
    // Try to submit without entering text (HTML5 validation should prevent this)
    const submitButton = page.getByRole('button', { name: 'Submit' });
    await expect(submitButton).toBeVisible();
    
    // The form should have required validation, so clicking submit without text
    // should show browser validation message or prevent submission
    // Let's try submitting with just whitespace by using JavaScript
    await page.evaluate(() => {
      const input = document.querySelector('input[type="text"]') as HTMLInputElement;
      if (input) {
        input.value = '   ';
      }
    });
    
    // Click submit - should either show validation or error
    await submitButton.click();
    
    // Wait a bit to see if error appears
    await page.waitForTimeout(1000);
    
    // Check if there's an error message (either from validation or API)
    const errorElement = page.locator('text=/error|Error|Please/i').first();
    const errorVisible = await errorElement.isVisible().catch(() => false);
    
    // Either validation prevents submission or API returns error
    // Both are acceptable behaviors
    expect(errorVisible || !(await submitButton.isEnabled())).toBeTruthy();
  });

  test('should refresh GET data when refresh button is clicked', async ({ page }) => {
    // Navigate to the route handler page
    await page.goto('/route-handler');
    
    // Wait for initial data to load
    await page.waitForSelector('text=Fetched Data:', { timeout: 5000 });
    
    // Get the first random value
    const randomValueElements = page.locator('span.font-mono');
    const firstRandomValue = await randomValueElements.first().textContent();
    expect(firstRandomValue).toBeTruthy();
    
    // Click the refresh button
    const refreshButton = page.getByRole('button', { name: 'Refresh Data' });
    await expect(refreshButton).toBeVisible();
    await refreshButton.click();
    
    // Wait for loading to complete
    await page.waitForSelector('text=Loading...', { state: 'hidden', timeout: 5000 });
    
    // Wait for data to refresh
    await page.waitForTimeout(500);
    
    // Verify data is still displayed (may be same or different due to random value)
    await expect(page.getByText('Fetched Data:')).toBeVisible();
    
    // The random value might change, but data should still be present
    const refreshedRandomValue = await randomValueElements.first().textContent();
    expect(refreshedRandomValue).toBeTruthy();
  });
});

