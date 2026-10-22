// utils/auth/refreshToken.ts
import { request } from '@playwright/test';
import dotenv from 'dotenv';

export async function refreshToken() {
    const apiContext = await request.newContext({
        baseURL: process.env.REFRESH_BASE_URL,
    });

    const response = await apiContext.post('/v1/token?key=' + process.env.REFRESH_API_KEY, {
        data: {
            grant_type: 'refresh_token',
            refresh_token: process.env.REFRESH_TOKEN,
        },
    });

    const body = await response.json();

    if (!body?.access_token) {
        throw new Error('Cannot get access_token');
    }

    return body.access_token;
}