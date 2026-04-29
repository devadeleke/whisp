import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/node";
//import { isSpoofedBot } from "@arcjet/inspect";
import express from "express";
import { ENV } from "./env.js";

const aj = arcjet({
  // Get your site key from https://app.arcjet.com and set it as an environment
  // variable rather than hard coding.
  key: ENV.ARCJET_KEY,
  rules: [
    // Shield protects your app from common attacks e.g. SQL injection
    shield({ mode: "LIVE" }),
    // Create a bot detection rule
    detectBot({
      mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
      // Block all bots except the following
      
      // Use this in production to block all bots except major search engines and other allowed categories.
      //allow: [
        //"CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
        // Uncomment to allow these other common bot categories
        // See the full list at https://arcjet.com/bot-list
        //"CATEGORY:MONITOR", // Uptime monitoring services
        //"CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
      //],
      
      // Use this during development to allow all bots but still get detection signals in your dashboard. Don't forget to switch to "LIVE" mode and set appropriate allow rules before going to production.
      allow: [
        "CATEGORY:SEARCH_ENGINE",
        "CATEGORY:BROWSER",
        "CATEGORY:MONITOR",
        "CATEGORY:PREVIEW",
        "CATEGORY:TOOL",         // curl, Postman, etc. during dev
      ],
    }),
    // Create a sliding window rate limit. Other algorithms are supported.
    slidingWindow({
      mode: "LIVE",
      //max: 100, // Max 100 requests 
      //interval: 6, // Refill every 6 seconds

      // Apply stricter rate limiting for authentication endpoints to prevent brute-force attacks.
      max: 10, // Max 10 requests
      interval: 60, // Per 60 seconds (1 minute)
    }),
  ],
});

export default aj;

