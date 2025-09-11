import { test, expect } from '@playwright/test';

test.describe('Revalidate Path', () => {
  test('should display all revalidate path sections', async ({ page }) => {
    // Navigate to the revalidate path page
    await page.goto('/caching/revalidate-path');
    
    // Verify the main heading is present
    await expect(page.getByRole('heading', { name: 'Revalidate Path Test' })).toBeVisible();
    
    // Verify all sections are present
    await expect(page.getByText('Current Page Data')).toBeVisible();
    await expect(page.getByText('Revalidation Actions')).toBeVisible();
    await expect(page.getByText('Request Information')).toBeVisible();
    await expect(page.getByText('Test Instructions')).toBeVisible();
  });

  test('should show page data with timestamp and random value', async ({ page }) => {
    // Navigate to the revalidate path page
    await page.goto('/caching/revalidate-path');
    
    // Get the timestamp
    const timestampElement = page.locator('p.font-mono.text-blue-600').first();
    await expect(timestampElement).toBeVisible();
    
    const timestamp = await timestampElement.textContent();
    expect(timestamp).toBeTruthy();
    expect(parseInt(timestamp!)).toBeGreaterThan(0);
    
    // Get the random value
    const randomValueElement = page.locator('p.font-mono.text-blue-600').nth(1);
    await expect(randomValueElement).toBeVisible();
    
    const randomValue = await randomValueElement.textContent();
    expect(randomValue).toBeTruthy();
    expect(parseInt(randomValue!)).toBeGreaterThanOrEqual(0);
    expect(parseInt(randomValue!)).toBeLessThan(1000);
    
    console.log(`Timestamp: ${timestamp}`);
    console.log(`Random value: ${randomValue}`);
  });

  test('should have revalidation action buttons', async ({ page }) => {
    // Navigate to the revalidate path page
    await page.goto('/caching/revalidate-path');
    
    // Verify all revalidation buttons are present
    await expect(page.getByRole('button', { name: 'Revalidate This Path' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Revalidate Parent Path (/caching)' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Revalidate Root Path (/)' })).toBeVisible();
  });

  test('should show cached data remains consistent on reloads', async ({ page }) => {
    // Navigate to the revalidate path page
    await page.goto('/caching/revalidate-path');
    
    // Get the timestamp from the first load
    const firstTimestamp = await page.locator('p.font-mono.text-blue-600').first().textContent();
    expect(firstTimestamp).toBeTruthy();
    
    // Reload the page
    await page.reload();
    
    // Get the timestamp from the second load
    const secondTimestamp = await page.locator('p.font-mono.text-blue-600').first().textContent();
    expect(secondTimestamp).toBeTruthy();
    
    // The timestamps should be the same (cached) unless revalidated
    expect(firstTimestamp).toBe(secondTimestamp);
    
    console.log(`First timestamp: ${firstTimestamp}`);
    console.log(`Second timestamp: ${secondTimestamp}`);
  });

  test('should display request information', async ({ page }) => {
    // Navigate to the revalidate path page
    await page.goto('/caching/revalidate-path');
    
    // Verify request information section
    await expect(page.getByText('Request Information')).toBeVisible();
    await expect(page.getByText('Rendered at:')).toBeVisible();
    await expect(page.getByText('Timestamp:')).toBeVisible();
    await expect(page.getByText('User Agent:')).toBeVisible();
    
    // Verify timestamp is a valid number
    const timestampElement = page.locator('p.font-mono.text-blue-600').first();
    const timestamp = await timestampElement.textContent();
    expect(timestamp).toBeTruthy();
    expect(parseInt(timestamp!)).toBeGreaterThan(0);
  });

  test('should display test instructions', async ({ page }) => {
    // Navigate to the revalidate path page
    await page.goto('/caching/revalidate-path');
    
    // Verify test instructions section
    await expect(page.getByText('Test Instructions')).toBeVisible();
    
    // Verify key instruction points are present
    await expect(page.getByText('Reload this page multiple times to see the cached data')).toBeVisible();
    await expect(page.getByText('Click "Revalidate This Path" to invalidate the cache for this page')).toBeVisible();
    await expect(page.getByText('After revalidation, reload the page to see fresh data')).toBeVisible();
  });
}); 