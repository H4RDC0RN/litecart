## Prerequisites

- Google Chrome (local runs use the installed Chrome; CI uses Chromium and Firefox)

## Environment variables

To run the tests locally, create a `.env` file in the project root with the following content and fill in your own values:

```dotenv
BASE_URL=
USER_EMAIL=
USER_PASSWORD=
```

The `.env` file is listed in `.gitignore` and must not be committed.
In CI the same variables are provided through GitHub repository secrets.
