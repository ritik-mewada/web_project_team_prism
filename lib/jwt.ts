import { jwtVerify, SignJWT } from "jose";

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || "supersecretkey"
);

import type { JWTPayload } from "jose";

export async function generateToken(payload: JWTPayload) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("7d")
        .sign(JWT_SECRET);
}

export async function verifyToken(token: string) {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
}
