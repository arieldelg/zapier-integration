# Wistia Zapier Integration

This project is a Zapier integration for the [Wistia API](https://wistia.com/support/developers/data-api), enabling users to automate workflows involving Wistia projects. The integration was bootstrapped with the `zapier init` CLI and extended to support core project management use cases.

---

## a. High-Level Description & Supported Use Cases

**API Integrated:**  
[Wistia Data API v1](https://wistia.com/support/developers/data-api)

**Supported Use Cases:**
- **Trigger:** Detect when a new Wistia project is created (polling trigger).
- **Action:** Create a new Wistia project with a specified name and admin email.

These features allow users to automate tasks such as syncing new Wistia projects to other systems or programmatically creating projects from other apps.

---

## b. Tradeoffs Made

- **Polling Triggers:** The integration uses polling to detect new projects, which may introduce a delay compared to webhooks but is simpler and more reliable for the Wistia API.
- **Minimal Field Exposure:** Only essential fields for project creation and retrieval are exposed to keep the integration simple and focused.
- **Custom Auth:** Chose custom authentication to support API token and base URL flexibility, rather than hardcoding for a single Wistia instance.

---

## c. Assumptions

- **API Token Auth:** Assumes users have a valid Wistia API token and that their account has permissions to create and list projects.
- **Stable API:** Assumes the Wistia API endpoints and response formats are stable and follow the documented structure.
- **Base URL:** Assumes all users will use the standard Wistia API base URL (`https://api.wistia.com/v1`), but allows for custom domains if needed.
- **Email Validity:** Assumes the provided admin email for project creation is valid and accepted by Wistia.

---

## d. AI Tools Used

- **GitHub Copilot:** Used for code review, and error explanation.
- **OpenAI GPT-4:** Used for code review, and error explanation.

---

## Getting Started

```bash
# Install dependencies
npm install

# Run tests
zapier test
```

## Useful Links

- [Wistia API Docs](https://wistia.com/support/developers/data-api)
- [Zapier Platform Docs](https://platform.zapier.com/docs)