// helpers/adminAuth.ts
import { request } from '@playwright/test';
//import { getEnv } from './env';

export async function getAdminLoginLink() {
    const apiContext = await request.newContext({
        baseURL: process.env.ADMIN_API_BASE_URL,
    });

    const response = await apiContext.get('/adminapi/app_login_link', {
        params: {
            shop_id: process.env.SHOP_ID!,
            can_update: 'true',
        },
        headers: {
            authorization: `Bearer ${process.env.ADMIN_JWT_TOKEN}`,
            accept: '*/*',
        },
    }
    );

    if (!response.ok()) {
        throw new Error(`Failed to get login link: ${response.status()}`);
    }

    const body = await response.json();
    return body.link;
}