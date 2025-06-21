import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config({path: ".env.test"});

const API_BASE_URL = process.env.VITE_API_URL || "http://localhost:3000/api";
const token = process.env.TOKEN;

describe("Notes API integration", () => {
    const client = axios.create({
        baseURL: API_BASE_URL,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
    });

    it("fetches notes successfully", async () => {
        const response = await client.get("/notes");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.data)).toBe(true);
    });

    it("fetches unique tags", async () => {
        const response = await client.get("/notes/tags");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.data)).toBe(true);
    });

    it("searches notes with query param", async () => {
        const response = await client.get("/notes/search", {
            params: {query: "example"},
        });
        expect(response.status).toBe(200);
        expect(Array.isArray(response.data)).toBe(true);
    });
});
