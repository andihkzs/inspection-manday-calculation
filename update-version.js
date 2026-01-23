#!/usr/bin/env node

/**
 * update-version.js - Syncs version from package.json to version.ts
 * Runs automatically during build process
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const packageJsonPath = join(__dirname, 'package.json');
const versionTsPath = join(__dirname, 'src', 'lib', 'version.ts');

const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
const version = packageJson.version;

const versionTsContent = `/**
 * version.ts - Application version information
 * Exports: VERSION constant
 * Side effects: Auto-generated from package.json during build
 */

export const VERSION = '${version}';
`;

writeFileSync(versionTsPath, versionTsContent, 'utf-8');
console.log(`✓ Version updated to ${version}`);
