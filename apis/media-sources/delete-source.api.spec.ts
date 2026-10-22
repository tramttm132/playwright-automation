import { test, expect } from '@playwright/test';
import { request } from '@playwright/test';

test('DELETE API with body containing list_ids', async ({ request }) => {
    const response = await request.delete('https://api.example.com/media-sources', {
        data: {
            list_ids: [1, 2, 3]
        }
    });

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toBeDefined();
});