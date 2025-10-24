# Changelog

All notable changes to the Nuestro Pulso project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- NOTICE.md file with security guidelines for API key management
- CHANGELOG.md to track all project changes
- Security notice section in README.md
- Comprehensive TypeScript implementation for news service
- Sanitized .env.example with placeholder values and API examples
- Enhanced error handling and fallback mechanisms for news feeds
- Demo data support for graceful degradation when APIs are unavailable

### Changed
- Updated .env.example to use placeholder values instead of real API keys
- Improved realNewsService.ts with robust TypeScript implementation
- Enhanced README.md with security best practices documentation

### Security
- Removed all real API keys from .env.example
- Added security warnings and best practices documentation
- Implemented secure environment variable handling guidelines
- Added instructions for proper secrets management in production

### Fixed
- API key exposure in example configuration files
- Missing security documentation
- Lack of changelog for tracking project history

## [Previous Releases]

### Note
This changelog was initiated as part of security improvements. Previous changes were not formally documented but can be found in the git commit history.

---

For a complete list of changes, see the [commit history](https://github.com/Colombia-cyber/nuestro-pulso-test/commits/main).
