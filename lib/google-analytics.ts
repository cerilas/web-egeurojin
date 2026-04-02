import "server-only";

import { google } from "googleapis";

type GaOverview = {
  users: number;
  sessions: number;
  pageViews: number;
  periodLabel: string;
};

function getGaOAuthCredentials() {
  const clientId = process.env.GA_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GA_OAUTH_CLIENT_SECRET;
  const refreshToken = process.env.GA_OAUTH_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  return { clientId, clientSecret, refreshToken };
}

function getGaCredentials() {
  const clientEmail = process.env.GA_SERVICE_ACCOUNT_EMAIL;
  const privateKeyRaw = process.env.GA_SERVICE_ACCOUNT_PRIVATE_KEY;

  if (!clientEmail || !privateKeyRaw) {
    return null;
  }

  return {
    clientEmail,
    privateKey: privateKeyRaw.replace(/\\n/g, "\n"),
  };
}

function buildGaAuthClient() {
  const oauth = getGaOAuthCredentials();
  if (oauth) {
    const client = new google.auth.OAuth2(oauth.clientId, oauth.clientSecret);
    client.setCredentials({ refresh_token: oauth.refreshToken });
    return client;
  }

  const service = getGaCredentials();
  if (service) {
    return new google.auth.GoogleAuth({
      credentials: {
        client_email: service.clientEmail,
        private_key: service.privateKey,
      },
      scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
    });
  }

  return null;
}

export async function getGaOverview(): Promise<GaOverview | null> {
  const propertyId = process.env.GA4_PROPERTY_ID;
  if (!propertyId) {
    return null;
  }

  const auth = buildGaAuthClient();
  if (!auth) {
    return null;
  }

  try {
    const analyticsData = google.analyticsdata("v1beta");
    const report = await analyticsData.properties.runReport({
      auth,
      property: `properties/${propertyId}`,
      requestBody: {
        dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
        metrics: [
          { name: "totalUsers" },
          { name: "sessions" },
          { name: "screenPageViews" },
        ],
      },
    });

    const values = report.data.rows?.[0]?.metricValues ?? [];

    return {
      users: Number(values[0]?.value ?? 0),
      sessions: Number(values[1]?.value ?? 0),
      pageViews: Number(values[2]?.value ?? 0),
      periodLabel: "Son 30 gün",
    };
  } catch {
    return null;
  }
}