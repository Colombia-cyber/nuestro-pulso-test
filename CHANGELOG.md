# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - 2025-10-24

### Added
- `NOTICE.md` - Security notice documenting API key handling best practices
- `CHANGELOG.md` - This changelog to track project changes
- Security notice section in README.md pointing to NOTICE.md
- Comprehensive security guidelines for API key management
- Documentation on how to handle accidentally committed secrets

### Changed
- Sanitized `.env.example` to use only placeholder values
- Replaced all real API keys in `.env.example` with safe placeholder examples
- Updated `.env.example` with detailed comments and API key examples

### Fixed
- Fixed syntax errors in `src/services/realNewsService.ts`
- Improved TypeScript implementation in `realNewsService.ts` with robust error handling
- Added proper type definitions for news service responses
- Implemented fallback mechanisms for API failures

### Security
- **CRITICAL**: Removed all real API keys from `.env.example`
- Added comprehensive security documentation in `NOTICE.md`
- Documented secret rotation procedures
- Added guidelines for using environment-specific secret managers
- Ensured no real credentials are committed to version control

### Documentation
- Enhanced README.md with security notice
- Added pointers to NOTICE.md for security best practices
- Documented environment variable configuration more clearly
- Added examples for different deployment platforms (Vercel, Netlify, GitHub Actions)
