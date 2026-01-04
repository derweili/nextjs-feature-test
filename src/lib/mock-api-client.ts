/**
 * Shared API client for mock API endpoints
 * Base URL is controlled via MOCK_API_BASE_URL environment variable
 */

const getBaseUrl = (): string => {
  return process.env.MOCK_API_BASE_URL || 'http://localhost:3030';
};

interface MockApiClientOptions extends RequestInit {
  method?: 'GET' | 'POST';
}

/**
 * Makes a GET request to the mock API
 * @param endpoint - API endpoint path (e.g., '/api/time')
 * @param options - Additional fetch options
 * @returns Promise resolving to the JSON response
 */
export async function mockApiGet<T = unknown>(
  endpoint: string,
  options?: Omit<MockApiClientOptions, 'method'>
): Promise<T> {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}${endpoint}`;
  
  const response = await fetch(url, {
    method: 'GET',
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Mock API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Makes a POST request to the mock API
 * @param endpoint - API endpoint path (e.g., '/api/time')
 * @param body - Request body (will be JSON stringified)
 * @param options - Additional fetch options
 * @returns Promise resolving to the JSON response
 */
export async function mockApiPost<T = unknown>(
  endpoint: string,
  body?: unknown,
  options?: Omit<MockApiClientOptions, 'method' | 'body'>
): Promise<T> {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}${endpoint}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Mock API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

