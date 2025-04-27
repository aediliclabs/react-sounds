#!/usr/bin/env node

/**
 * This script uploads sound files to DigitalOcean Spaces
 * using the manifest to determine filenames.
 *
 * Environment variables:
 * - DO_SPACES_KEY: DigitalOcean Spaces access key
 * - DO_SPACES_SECRET: DigitalOcean Spaces secret key
 * - DO_SPACES_ENDPOINT: DigitalOcean Spaces endpoint (e.g., nyc3.digitaloceanspaces.com)
 * - DO_SPACES_NAME: DigitalOcean Space name
 * - CDN_PATH: Optional path prefix (defaults to "v1")
 */

require("dotenv").config();

const fs = require("fs");
const path = require("path");
const { S3Client, PutObjectCommand, ListObjectsV2Command, DeleteObjectCommand } = require("@aws-sdk/client-s3");

// Configuration
const SOUNDS_DIR = path.resolve(__dirname, "../sounds");
const MANIFEST_FILE = path.resolve(__dirname, "../src/manifest.json");
const CDN_PATH = process.env.CDN_PATH || "v1";

// Check if manifest exists
if (!fs.existsSync(MANIFEST_FILE)) {
  console.error(`Manifest file not found: ${MANIFEST_FILE}`);
  console.error(`Please run 'npm run generate-manifest' first.`);
  process.exit(1);
}

// Check if required environment variables are set
const requiredEnvVars = ["DO_SPACES_KEY", "DO_SPACES_SECRET", "DO_SPACES_ENDPOINT", "DO_SPACES_NAME"];
const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error(`Missing required environment variables: ${missingEnvVars.join(", ")}`);
  process.exit(1);
}

// Create an S3 client for DigitalOcean Spaces
const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.DO_SPACES_KEY,
    secretAccessKey: process.env.DO_SPACES_SECRET,
  },
  endpoint: `https://${process.env.DO_SPACES_ENDPOINT}`,
  region: "us-east-1", // This is required but not used for DO Spaces
  forcePathStyle: false,
});

// Main function
async function uploadToSpaces() {
  const spaceName = process.env.DO_SPACES_NAME;
  const endpoint = process.env.DO_SPACES_ENDPOINT;

  console.log(`Uploading sound files to DigitalOcean Spaces (${spaceName})...`);

  // Clear existing files in the CDN directory
  console.log(`Clearing existing files in ${CDN_PATH}...`);
  await clearDirectory(spaceName, CDN_PATH);

  // Load manifest
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_FILE, "utf8"));

  // Count for statistics
  let uploadCount = 0;
  let errorCount = 0;

  // Process each sound in the manifest
  for (const [soundId, soundInfo] of Object.entries(manifest.sounds)) {
    const [category, name] = soundId.split("/");
    const sourceFile = path.join(SOUNDS_DIR, category, `${name}.mp3`);
    const cdnFilename = soundInfo.src;

    // Check if source file exists
    if (!fs.existsSync(sourceFile)) {
      console.error(`Source file not found: ${sourceFile}`);
      errorCount++;
      continue;
    }

    // Upload to DigitalOcean Spaces
    try {
      const spaceKey = `${CDN_PATH}/${cdnFilename}`;
      const fileContent = fs.readFileSync(sourceFile);

      const uploadParams = {
        Bucket: spaceName,
        Key: spaceKey,
        Body: fileContent,
        ContentType: "audio/mpeg",
        ACL: "public-read", // Make the file publicly accessible
      };

      await s3Client.send(new PutObjectCommand(uploadParams));

      console.log(`✅ Uploaded: ${soundId} -> ${cdnFilename}`);
      uploadCount++;
    } catch (error) {
      console.error(`❌ Failed to upload ${soundId}: ${error.message}`);
      errorCount++;
    }
  }

  console.log("\n📊 Upload Summary:");
  console.log(`✅ ${uploadCount} sounds uploaded successfully`);

  if (errorCount > 0) {
    console.log(`❌ ${errorCount} sounds failed to upload`);
    process.exit(1);
  }
}

// Function to clear all objects in a directory
async function clearDirectory(bucketName, directoryPath) {
  try {
    // List all objects in the directory
    const listParams = {
      Bucket: bucketName,
      Prefix: directoryPath,
    };

    const listCommand = new ListObjectsV2Command(listParams);
    const listedObjects = await s3Client.send(listCommand);

    if (!listedObjects.Contents || listedObjects.Contents.length === 0) {
      console.log(`No existing objects found in ${directoryPath}`);
      return;
    }

    console.log(`Found ${listedObjects.Contents.length} objects to delete...`);

    // Delete each object
    let deletedCount = 0;
    for (const object of listedObjects.Contents) {
      const deleteParams = {
        Bucket: bucketName,
        Key: object.Key,
      };

      await s3Client.send(new DeleteObjectCommand(deleteParams));
      deletedCount++;

      if (deletedCount % 10 === 0 || deletedCount === listedObjects.Contents.length) {
        console.log(`Deleted ${deletedCount}/${listedObjects.Contents.length} objects...`);
      }
    }

    console.log(`Successfully cleared ${deletedCount} objects from ${directoryPath}`);
  } catch (error) {
    console.error(`Error clearing directory ${directoryPath}:`, error);
    throw error;
  }
}

// Run the script
uploadToSpaces().catch((err) => {
  console.error("Error uploading to DigitalOcean Spaces:", err);
  process.exit(1);
});
