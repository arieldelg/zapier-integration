/**
 * Utility to handle rate limits for API requests.
 * Retries the request after a delay if a rate limit error is encountered.
 * @param fn Function that makes the API request
 * @param retries Number of retries before failing
 * @returns The result of the API request
 */
export async function handleRateLimits<T>(
  fn: () => Promise<T>,
  retries = 3
): Promise<T> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      if (error.status === 429) {
        const retryAfter = error.headers?.["Retry-After"];
        const delay = retryAfter
          ? parseInt(retryAfter, 10) * 1000
          : attempt * 2000; 
        console.warn(`Rate limit hit. Retrying after ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
  throw new Error("Rate limit retries exhausted.");
}
