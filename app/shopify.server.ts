import "@shopify/shopify-app-remix/adapters/node";
import type { HeadersFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  AppDistribution,
  DeliveryMethod,
  shopifyApp,
  LATEST_API_VERSION,
} from "@shopify/shopify-app-remix/server";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
import { restResources } from "@shopify/shopify-api/rest/admin/2024-01";
import prisma from "./db.server";

const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  apiVersion: LATEST_API_VERSION,
  scopes: process.env.SCOPES?.split(","),
  appUrl: process.env.SHOPIFY_APP_URL || "",
  authPathPrefix: "/auth",
  sessionStorage: new PrismaSessionStorage(prisma),
  distribution: AppDistribution.AppStore,
  restResources,
  webhooks: {
    APP_UNINSTALLED: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks",
    },
  },
  hooks: {
    afterAuth: async ({ session }) => {
      const {shop, accessToken } = session;
      console.log('STARTTTT install')
      console.log('webhooks install',accessToken)

      shopify.registerWebhooks({ session });
      const response = await fetch(`https://transcript-combine-areas-miller.trycloudflare.com/djangoapp/shopify/install_from_front/`, {
      method: 'POST', // Method is correct for fetching data
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accessToken,'shop_name':shop }),
    })
    if (response.ok) {
      const data = await response.json();
      console.log('request is sending!'); // Handle success
    } else {
      console.error('Request failed');
    }
    },
  },
  future: {
    v3_webhookAdminContext: true,
    v3_authenticatePublic: true,
    unstable_newEmbeddedAuthStrategy: true,
  },
  ...(process.env.SHOP_CUSTOM_DOMAIN
    ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
    : {}),
});

export default shopify;
export const apiVersion = LATEST_API_VERSION;
export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
export const authenticate = shopify.authenticate;
export const unauthenticated = shopify.unauthenticated;
export const login = shopify.login;
export const registerWebhooks = shopify.registerWebhooks;
export const sessionStorage = shopify.sessionStorage;


// // export const loading = async ({ request }: LoaderFunctionArgs) => {
// //   await authenticate.admin(request);
// //   const { admin,session } = await authenticate.admin(request)
// //   const {shop, accessToken } = session;
// //   const response = await fetch(`https://dat-constitutes-subsection-blessed.trycloudflare.com/djangoapp/shopify/install_from_front/`, {
// //           method: 'POST', // Method is correct for fetching data
// //           headers: {
// //             'Content-Type': 'application/json',
// //           },
// //           body: JSON.stringify({ accessToken }),
// //         })
// //         if (response.ok) {
// //           const data = await response.json();
// //           console.log('request is sending!'); // Handle success
// //         } else {
// //           console.error('Request failed');
// //         }
// //
// //
// //   return null;
// };