#!/usr/bin/env node

/**
 * update-version.js - Syncs version from package.json to version.ts and updates CHANGELOG.md
 * Runs automatically during build process
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const packageJsonPath = join(__dirname, 'package.json');
const versionTsPath = join(__dirname, 'src', 'lib', 'version.ts');
const changelogPath = join(__dirname, 'CHANGELOG.md');

const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
const version = packageJson.version;

// Update version.ts
const versionTsContent = `/**
 * version.ts - Application version information
 * Exports: VERSION constant
 * Side effects: Auto-generated from package.json during build
 */

export const VERSION = '${version}';
`;

writeFileSync(versionTsPath, versionTsContent, 'utf-8');
console.log(`✓ Version updated to ${version}`);

// Update CHANGELOG.md
const currentDate = new Date().toISOString().split('T')[0];
const changelogContent = readFileSync(changelogPath, 'utf-8');

// Check if this version already exists in the changelog
if (!changelogContent.includes(`## [${version}]`)) {
  // Find where to insert the new entry (after the header section)
  const headerEndIndex = changelogContent.indexOf('## [');

  if (headerEndIndex !== -1) {
    const newEntry = `## [${version}] - ${currentDate}

### Changed
- Version bump

`;

    const updatedChangelog =
      changelogContent.slice(0, headerEndIndex) +
      newEntry +
      changelogContent.slice(headerEndIndex);

    writeFileSync(changelogPath, updatedChangelog, 'utf-8');
    console.log(`✓ CHANGELOG.md updated with version ${version}`);
  }
} else {
  console.log(`✓ CHANGELOG.md already contains version ${version}`);
}
