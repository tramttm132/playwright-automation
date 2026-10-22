// helpers/adminAuth.ts
import { request } from '@playwright/test';
import dotenv from 'dotenv';
import { refreshToken } from './refreshToken';

dotenv.config();

export async function getAdminLoginLink(shopId?: string): Promise<string> {
    const access_token = await refreshToken();

    const apiContext = await request.newContext({
        baseURL: process.env.ADMIN_API_BASE_URL,
    });
    const shop_id = shopId || process.env.SHOP_ID!;

    const response = await apiContext.get('/adminapi/app_login_link', {
        params: {
            shop_id: shop_id,
            can_update: 'true',
        },
        headers: {
            authorization: `Bearer ${access_token}`,
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