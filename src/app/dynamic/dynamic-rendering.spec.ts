import { test, expect } from '@playwright/test';

test.describe('Dynamic Rendering', () => {
  test('should show different content on each reload', async ({ page }) => {
    // Navigate to the dynamic page
    await page.goto('/dynamic');
    
    // Wait for the page to load
    await expect(page.getByRole('heading', { name: 'Dynamic Rendering Test' })).toBeVisible();
    
    // Get the timestamp from the first load
    const firstTimestamp = await page.locator('text=/\\d{13,}/').first().textContent();
    expect(firstTimestamp).toBeTruthy();
    
    // Reload the page
    await page.reload();
    
    // Wait for the page to load again
    await expect(page.getByRole('heading', { name: 'Dynamic Rendering Test' })).toBeVisible();
    
    // Get the timestamp from the second load
    const secondTimestamp = await page.locator('text=/\\d{13,}/').first().textContent();
    expect(secondTimestamp).toBeTruthy();
    
    // Verify that the timestamps are different (indicating dynamic rendering)
    expect(firstTimestamp).not.toBe(secondTimestamp);
    
    console.log(`First timestamp: ${firstTimestamp}`);
    console.log(`Second timestamp: ${secondTimestamp}`);
  });

  test('should show different random numbers on each reload', async ({ page }) => {
    // Navigate to the dynamic page
    await page.goto('/dynamic');
    
    // Wait for the page to load
    await expect(page.getByRole('heading', { name: 'Dynamic Rendering Test' })).toBeVisible();
    
    // Get the random number from the first load
    const firstRandomNumber = await page.locator('text=/\\d{1,3}/').nth(1).textContent();
    expect(firstRandomNumber).toBeTruthy();
    
    // Reload the page
    await page.reload();
    
    // Wait for the page to load again
    await expect(page.getByRole('heading', { name: 'Dynamic Rendering Test' })).toBeVisible();
    
    // Get the random number from the second load
    const secondRandomNumber = await page.locator('text=/\\d{1,3}/').nth(1).textContent();
    expect(secondRandomNumber).toBeTruthy();
    
    // Verify that the random numbers are different
    expect(firstRandomNumber).not.toBe(secondRandomNumber);
    
    console.log(`First random number: ${firstRandomNumber}`);
    console.log(`Second random number: ${secondRandomNumber}`);
  });

  test('should show different random strings on each reload', async ({ page }) => {
    // Navigate to the dynamic page
    await page.goto('/dynamic');
    
    // Wait for the page to load
    await expect(page.getByRole('heading', { name: 'Dynamic Rendering Test' })).toBeVisible();
    
    // Get the random string from the first load (it's in a monospace font)
    const firstRandomString = await page.locator('p.font-mono.text-purple-600').first().textContent();
    expect(firstRandomString).toBeTruthy();
    expect(firstRandomString!.length).toBeGreaterThan(5); // Should be a reasonable length
    
    // Reload the page
    await page.reload();
    
    // Wait for the page to load again
    await expect(page.getByRole('heading', { name: 'Dynamic Rendering Test' })).toBeVisible();
    
    // Get the random string from the second load
    const secondRandomString = await page.locator('p.font-mono.text-purple-600').first().textContent();
    expect(secondRandomString).toBeTruthy();
    expect(secondRandomString!.length).toBeGreaterThan(5);
    
    // Verify that the random strings are different
    expect(firstRandomString).not.toBe(secondRandomString);
    
    console.log(`First random string: ${firstRandomString}`);
    console.log(`Second random string: ${secondRandomString}`);
  });

  test('should display all dynamic content sections', async ({ page }) => {
    // Navigate to the dynamic page
    await page.goto('/dynamic');
    
    // Verify the main heading is present
    await expect(page.getByRole('heading', { name: 'Dynamic Rendering Test' })).toBeVisible();
    
    // Verify all dynamic content sections are present
    await expect(page.getByText('Dynamic Content (Changes on every reload)')).toBeVisible();
    await expect(page.getByText('Request Information')).toBeVisible();
    await expect(page.getByText('Test Instructions')).toBeVisible();
    
    // Verify all dynamic values are present
    await expect(page.getByRole('heading', { name: 'Timestamp' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Random Number' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Random String' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'User Agent Hash' })).toBeVisible();
    
    // Verify that we have actual dynamic values (not just labels)
    const timestampElement = page.locator('p.font-mono.text-blue-600').first();
    const randomNumberElement = page.locator('p.font-mono.text-green-600').first();
    const randomStringElement = page.locator('p.font-mono.text-purple-600').first();
    
    await expect(timestampElement).toBeVisible();
    await expect(randomNumberElement).toBeVisible();
    await expect(randomStringElement).toBeVisible();
    
    // Verify the values are not empty
    const timestamp = await timestampElement.textContent();
    const randomNumber = await randomNumberElement.textContent();
    const randomString = await randomStringElement.textContent();
    
    expect(timestamp).toBeTruthy();
    expect(randomNumber).toBeTruthy();
    expect(randomString).toBeTruthy();
  });
}); 