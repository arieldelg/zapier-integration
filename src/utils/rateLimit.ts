async function handleRateLimits<T>(
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
          : attempt * 2000; // Exponential backoff
        console.warn(`Rate limit hit. Retrying after ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        throw error; // Re-throw other errors
      }
    }
  }
  throw new Error("Rate limit retries exhausted.");
}

export default handleRateLimits;