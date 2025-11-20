// lib/better-auth/auth.ts

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { connectToDatabase } from "@/database/mongoose"; 
import { nextCookies } from "better-auth/next-js";
// 💡 IMPORTANT: Import the native MongoDB types for clean casting
import { MongoClient, Db } from 'mongodb'; 

// 1. Establish the connection upfront
const mongoose = await connectToDatabase();

// 2. Extract the native MongoDB Client and Database Name
// Casting to MongoClient resolves the dependency conflict
const client = mongoose.connection.getClient() as MongoClient; 
const dbName = mongoose.connection.name;

export const auth = betterAuth({
    // 3. FIX: Pass the native Db instance to the adapter using a type cast (Db)
    // This isolates the adapter from Mongoose hooks and resolves the complex type error.
    database: mongodbAdapter(client.db(dbName) as Db), 
    
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL,

    // 4. FIX: This resolves the "Email and password sign up is not enabled" error
    emailAndPassword: {
        enabled: true, // MUST be TRUE to allow sign up/in
        autoSignIn: true,
        minPasswordLength: 8,
        maxPasswordLength: 128,
    },
    
    // 5. ID FIX: We omit 'advanced' and 'generateId' to rely on the library's
    // default, working String ID generator (since the package is updated).
    
    plugins: [nextCookies()],
});