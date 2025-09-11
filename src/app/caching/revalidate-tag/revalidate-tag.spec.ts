import { test, expect } from '@playwright/test';

test.describe('Revalidate Tag', () => {
  test('should display all revalidate tag sections', async ({ page }) => {
    // Navigate to the revalidate tag page
    await page.goto('/caching/revalidate-tag');
    
    // Verify the main heading is present
    await expect(page.getByRole('heading', { name: 'Revalidate Tag Test' })).toBeVisible();
    
    // Verify all sections are present
    await expect(page.getByText('Posts (tag: \'posts\')')).toBeVisible();
    await expect(page.getByText('Users (tag: \'users\')')).toBeVisible();
    await expect(page.getByText('Comments (tag: \'comments\')')).toBeVisible();
    await expect(page.getByText('Cached Data (tag: \'cached-data\')')).toBeVisible();
    await expect(page.getByText('Revalidation Actions')).toBeVisible();
    await expect(page.getByText('Request Information')).toBeVisible();
    await expect(page.getByText('Test Instructions')).toBeVisible();
  });

  test('should show posts data with proper structure', async ({ page }) => {
    // Navigate to the revalidate tag page
    await page.goto('/caching/revalidate-tag');
    
    // Verify posts section
    await expect(page.getByText('Posts (tag: \'posts\')')).toBeVisible();
    
    // Check that we have post titles
    const postTitles = page.locator('h3.font-medium.text-gray-700');
    await expect(postTitles).toHaveCount(3); // Should have 3 posts
    
    // Verify first post has valid data
    const firstPostTitle = await postTitles.first().textContent();
    expect(firstPostTitle).toBeTruthy();
    expect(firstPostTitle!.length).toBeGreaterThan(5);
    
    console.log(`First post title: ${firstPostTitle}`);
  });

  test('should show users data with proper structure', async ({ page }) => {
    // Navigate to the revalidate tag page
    await page.goto('/caching/revalidate-tag');
    
    // Verify users section
    await expect(page.getByText('Users (tag: \'users\')')).toBeVisible();
    
    // Check that we have user names
    const userNames = page.locator('h3.font-medium.text-gray-700');
    await expect(userNames).toHaveCount(6); // 3 posts + 3 users
    
    // Verify first user has valid data
    const firstUserName = await userNames.nth(3).textContent(); // 4th element (first user)
    expect(firstUserName).toBeTruthy();
    expect(firstUserName!.length).toBeGreaterThan(5);
    
    console.log(`First user name: ${firstUserName}`);
  });

  test('should show comments data with proper structure', async ({ page }) => {
    // Navigate to the revalidate tag page
    await page.goto('/caching/revalidate-tag');
    
    // Verify comments section
    await expect(page.getByText('Comments (tag: \'comments\')')).toBeVisible();
    
    // Check that we have comment names
    const commentNames = page.locator('h3.font-medium.text-gray-700');
    await expect(commentNames).toHaveCount(9); // 3 posts + 3 users + 3 comments
    
    // Verify first comment has valid data
    const firstCommentName = await commentNames.nth(6).textContent(); // 7th element (first comment)
    expect(firstCommentName).toBeTruthy();
    expect(firstCommentName!.length).toBeGreaterThan(5);
    
    console.log(`First comment name: ${firstCommentName}`);
  });

  test('should show cached data with timestamp and random value', async ({ page }) => {
    // Navigate to the revalidate tag page
    await page.goto('/caching/revalidate-tag');
    
    // Verify cached data section
    await expect(page.getByText('Cached Data (tag: \'cached-data\')')).toBeVisible();
    
    // Get the timestamp
    const timestampElement = page.locator('p.font-mono.text-yellow-600').first();
    await expect(timestampElement).toBeVisible();
    
    const timestamp = await timestampElement.textContent();
    expect(timestamp).toBeTruthy();
    expect(parseInt(timestamp!)).toBeGreaterThan(0);
    
    // Get the random value
    const randomValueElement = page.locator('p.font-mono.text-yellow-600').nth(1);
    await expect(randomValueElement).toBeVisible();
    
    const randomValue = await randomValueElement.textContent();
    expect(randomValue).toBeTruthy();
    expect(parseInt(randomValue!)).toBeGreaterThanOrEqual(0);
    expect(parseInt(randomValue!)).toBeLessThan(1000);
    
    console.log(`Cached timestamp: ${timestamp}`);
    console.log(`Cached random value: ${randomValue}`);
  });

  test('should have all revalidation action buttons', async ({ page }) => {
    // Navigate to the revalidate tag page
    await page.goto('/caching/revalidate-tag');
    
    // Verify all revalidation buttons are present
    await expect(page.getByRole('button', { name: 'Revalidate Posts' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Revalidate Users' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Revalidate Comments' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Revalidate Cached Data' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Revalidate All Tags' })).toBeVisible();
  });

  test('should show cached data remains consistent on reloads', async ({ page }) => {
    // Navigate to the revalidate tag page
    await page.goto('/caching/revalidate-tag');
    
    // Get the cached timestamp from the first load
    const firstTimestamp = await page.locator('p.font-mono.text-yellow-600').first().textContent();
    expect(firstTimestamp).toBeTruthy();
    
    // Reload the page
    await page.reload();
    
    // Get the cached timestamp from the second load
    const secondTimestamp = await page.locator('p.font-mono.text-yellow-600').first().textContent();
    expect(secondTimestamp).toBeTruthy();
    
    // The timestamps should be the same (cached) unless revalidated
    expect(firstTimestamp).toBe(secondTimestamp);
    
    console.log(`First cached timestamp: ${firstTimestamp}`);
    console.log(`Second cached timestamp: ${secondTimestamp}`);
  });

  test('should display request information', async ({ page }) => {
    // Navigate to the revalidate tag page
    await page.goto('/caching/revalidate-tag');
    
    // Verify request information section
    await expect(page.getByText('Request Information')).toBeVisible();
    await expect(page.getByText('Rendered at:')).toBeVisible();
    await expect(page.getByText('Timestamp:')).toBeVisible();
    await expect(page.getByText('User Agent:')).toBeVisible();
    
    // Verify timestamp is a valid number
    const timestampElement = page.locator('p.font-mono.text-indigo-600').first();
    const timestamp = await timestampElement.textContent();
    expect(timestamp).toBeTruthy();
    expect(parseInt(timestamp!)).toBeGreaterThan(0);
  });

  test('should display test instructions', async ({ page }) => {
    // Navigate to the revalidate tag page
    await page.goto('/caching/revalidate-tag');
    
    // Verify test instructions section
    await expect(page.getByText('Test Instructions')).toBeVisible();
    
    // Verify key instruction points are present
    await expect(page.getByText('Reload this page multiple times to see the cached data')).toBeVisible();
    await expect(page.getByText('Click individual tag revalidation buttons to invalidate specific data')).toBeVisible();
    await expect(page.getByText('Click "Revalidate All Tags" to invalidate all tagged data')).toBeVisible();
    await expect(page.getByText('Notice how only the revalidated tags show new data')).toBeVisible();
  });
}); 