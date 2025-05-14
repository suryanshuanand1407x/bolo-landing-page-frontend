// You can remove this if Supabase client is no longer directly used.
// import { createClient } from '@supabase/supabase-js';

// API Base URL (Set this to your backend domain or localhost during development)
const API_BASE_URL = "https://railway.com/project/ee3721fe-202a-4ae5-8f7f-61b2f1680f2f/service/515911a0-03cf-4174-ad71-08d2d9d3e19b/settings?environmentId=46a74795-6e83-43cb-bcd9-86e4de78978f"; // Update this when deploying

// ---------------------------
// Waitlist API Function
// ---------------------------
export async function addToWaitlist(email: string) {
  const response = await fetch(`${API_BASE_URL}/waitlist`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.detail || "Failed to join waitlist.");
  }

  return await response.json();
}

// ---------------------------
// Contact API Function
// ---------------------------
export async function submitContact(name: string, email: string, message: string) {
  const response = await fetch(`${API_BASE_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, message }),
  });

  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.detail || "Failed to submit contact form.");
  }

  return await response.json();
}