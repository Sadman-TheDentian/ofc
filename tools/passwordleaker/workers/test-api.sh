#!/bin/bash

echo "Testing API endpoints..."

BASE_URL="https://password-leaker-api.darkdenti44.workers.dev"

echo "1. Testing root endpoint:"
curl -s "$BASE_URL/" | jq .

echo -e "\n2. Testing health endpoint:"
curl -s "$BASE_URL/api/health" | jq .

echo -e "\n3. Testing auth endpoint:"
curl -s -X POST "$BASE_URL/api/auth" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}' | jq .

echo -e "\n4. Testing status endpoint:"
curl -s "$BASE_URL/api/status?email=test@example.com" | jq .

echo -e "\nDone!"