import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function GET(request) {
    try {
        const authToken = request.cookies.get("jwt_token")?.value;

        // If token is missing, return 401 Unauthorized
        if (!authToken) {
            return NextResponse.json({ error: "Unauthorized: No token provided" }, { status: 401 });
        }

        // Verify and decode the token
        const secret = process.env.JWT_SECRET || "shhwwhs"; // Use env variable or fallback
        const data = jwt.verify(authToken, secret);
        console.log("Decoded JWT data:", data);

        // Return decoded user data
        return NextResponse.json({ data });
    } catch (error) {
        console.error("Error verifying token:", error);

        // Handle specific errors (e.g., token expired, invalid token)
        if (error.name === "TokenExpiredError") {
            return NextResponse.json({ error: "Unauthorized: Token expired" }, { status: 401 });
        }

        return NextResponse.json({ error: "Unauthorized: Invalid token" }, { status: 401 });
    }
}
