var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  future: () => future,
  mode: () => mode,
  publicPath: () => publicPath,
  routes: () => routes
});
module.exports = __toCommonJS(stdin_exports);

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_stream = require("stream"), import_server2 = require("react-dom/server"), import_react = require("@remix-run/react"), import_node2 = require("@remix-run/node"), import_isbot = require("isbot");

// app/shopify.server.ts
var import_node = require("@shopify/shopify-app-remix/adapters/node"), import_server = require("@shopify/shopify-app-remix/server"), import_shopify_app_session_storage_prisma = require("@shopify/shopify-app-session-storage-prisma"), import__ = require("@shopify/shopify-api/rest/admin/2024-01");

// app/db.server.ts
var import_client = require("@prisma/client"), prisma = global.prisma || new import_client.PrismaClient();
global.prisma || (global.prisma = new import_client.PrismaClient());
var db_server_default = prisma;

// app/shopify.server.ts
var shopify2 = (0, import_server.shopifyApp)({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  apiVersion: import_server.LATEST_API_VERSION,
  scopes: process.env.SCOPES?.split(","),
  appUrl: process.env.SHOPIFY_APP_URL || "",
  authPathPrefix: "/auth",
  sessionStorage: new import_shopify_app_session_storage_prisma.PrismaSessionStorage(db_server_default),
  distribution: import_server.AppDistribution.AppStore,
  restResources: import__.restResources,
  webhooks: {
    APP_UNINSTALLED: {
      deliveryMethod: import_server.DeliveryMethod.Http,
      callbackUrl: "/webhooks"
    }
  },
  hooks: {
    afterAuth: async ({ session }) => {
      let { shop, accessToken } = session;
      console.log("STARTTTT install"), console.log("webhooks install", accessToken), shopify2.registerWebhooks({ session });
      let response = await fetch("https://transcript-combine-areas-miller.trycloudflare.com/djangoapp/shopify/install_from_front/", {
        method: "POST",
        // Method is correct for fetching data
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ accessToken, shop_name: shop })
      });
      if (response.ok) {
        let data = await response.json();
        console.log("request is sending!");
      } else
        console.error("Request failed");
    }
  },
  future: {
    v3_webhookAdminContext: !0,
    v3_authenticatePublic: !0,
    unstable_newEmbeddedAuthStrategy: !0
  },
  ...process.env.SHOP_CUSTOM_DOMAIN ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] } : {}
});
var apiVersion = import_server.LATEST_API_VERSION, addDocumentResponseHeaders = shopify2.addDocumentResponseHeaders, authenticate = shopify2.authenticate, unauthenticated = shopify2.unauthenticated, login = shopify2.login, registerWebhooks = shopify2.registerWebhooks, sessionStorage = shopify2.sessionStorage;

// app/entry.server.tsx
var import_jsx_dev_runtime = require("react/jsx-dev-runtime"), ABORT_DELAY = 5e3;
async function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  addDocumentResponseHeaders(request, responseHeaders);
  let userAgent = request.headers.get("user-agent"), callbackName = (0, import_isbot.isbot)(userAgent ?? "") ? "onAllReady" : "onShellReady";
  return new Promise((resolve, reject) => {
    let { pipe, abort } = (0, import_server2.renderToPipeableStream)(
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        import_react.RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.tsx",
          lineNumber: 27,
          columnNumber: 7
        },
        this
      ),
      {
        [callbackName]: () => {
          let body = new import_stream.PassThrough(), stream = (0, import_node2.createReadableStreamFromReadable)(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App
});
var import_react2 = require("@remix-run/react"), import_jsx_dev_runtime2 = require("react/jsx-dev-runtime");
function App() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("html", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 14,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 15,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("link", { rel: "preconnect", href: "https://cdn.shopify.com/" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 16,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
        "link",
        {
          rel: "stylesheet",
          href: "https://cdn.shopify.com/static/fonts/inter/v4/styles.css"
        },
        void 0,
        !1,
        {
          fileName: "app/root.tsx",
          lineNumber: 17,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 21,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 22,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 13,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("body", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Outlet, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 25,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 26,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 27,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 28,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 24,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 12,
    columnNumber: 5
  }, this);
}

// app/routes/app.collections.tsx
var app_collections_exports = {};
__export(app_collections_exports, {
  default: () => app_collections_default,
  getCookie: () => getCookie,
  loader: () => loader,
  query: () => query
});
var import_react3 = require("@remix-run/react"), import_polaris = require("@shopify/polaris");

// public/step1.webp
var step1_default = "/build/_assets/step1-6RQ6T7MT.webp";

// public/step2.webp
var step2_default = "/build/_assets/step2-6LIRSGPX.webp";

// public/step3.webp
var step3_default = "/build/_assets/step3-YKWAMPO4.webp";

// app/routes/app.collections.tsx
var import_jsx_dev_runtime3 = require("react/jsx-dev-runtime"), query = `
{
    collections(first: 10){
        edges{
            node{
                id
                handle
                title
                description
            }
        }
        pageInfo {
            hasNextPage
        }
    }
}
`;
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    let cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
var loader = async ({ request }) => {
  let { admin, session } = await authenticate.admin(request), { shop, accessToken } = session, shopifyStoreId = (await admin.rest.resources.Shop.all({
    session
  })).headers["X-Shopid"][0], shopifyStoreUrl = session.shop;
  try {
    let response = await fetch(`https://${shop}/admin/api/${apiVersion}/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/graphql",
        "X-Shopify-Access-Token": accessToken
      },
      body: query
    });
    if (console.log("this is query=>", query), response.ok) {
      let data = await response.json(), restdata = await (await fetch(`https://transcript-combine-areas-miller.trycloudflare.com/djangoapp/shopify/status/?id=${shopifyStoreId}`, {
        method: "GET",
        // Method is correct for fetching data
        headers: {
          // If specific headers are required, include them here
          // 'Authorization': 'Bearer YOUR_TOKEN_HERE', // Example for including an Authorization header
        },
        mode: "no-cors"
        // Moved outside of headers, but consider the implications
      })).json();
      return console.log(restdata.status), restdata.status;
    }
    return null;
  } catch (err) {
    return console.log(err), console.log("this is catching !!!!!!"), null;
  }
}, Collections = () => {
  let status = (0, import_react3.useLoaderData)(), numericStatus = Number(status), statusText;
  switch (numericStatus) {
    case 1:
      statusText = "Downloading";
      break;
    case 2:
      statusText = "Indexing";
      break;
    case 3:
      statusText = "Published";
      break;
    default:
      statusText = "Unknown";
  }
  let determineStatus = (index) => index < numericStatus ? 1 : 0, progressVal = (status2) => status2 * 33;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_polaris.Page, { fullWidth: !0, children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_polaris.Layout, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_polaris.Layout.Section, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_polaris.Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
      import_polaris.Badge,
      {
        tone: "success",
        progress: "complete",
        toneAndProgressLabelOverride: "Status: Published. Your online store is visible.",
        children: statusText
      },
      void 0,
      !1,
      {
        fileName: "app/routes/app.collections.tsx",
        lineNumber: 142,
        columnNumber: 7
      },
      this
    ) }, void 0, !1, {
      fileName: "app/routes/app.collections.tsx",
      lineNumber: 141,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(SpacingBackground, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_polaris.InlineGrid, { gap: "400", columns: 3, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
        Placeholder,
        {
          height: "320px",
          imageUrl: step1_default,
          status: determineStatus(0)
        },
        void 0,
        !1,
        {
          fileName: "app/routes/app.collections.tsx",
          lineNumber: 155,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
        Placeholder,
        {
          height: "320px",
          imageUrl: step2_default,
          status: determineStatus(1)
        },
        void 0,
        !1,
        {
          fileName: "app/routes/app.collections.tsx",
          lineNumber: 159,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
        Placeholder,
        {
          height: "320px",
          imageUrl: step3_default,
          status: determineStatus(2)
        },
        void 0,
        !1,
        {
          fileName: "app/routes/app.collections.tsx",
          lineNumber: 162,
          columnNumber: 13
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/app.collections.tsx",
      lineNumber: 154,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/app.collections.tsx",
      lineNumber: 153,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { style: { width: "100%" }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_polaris.ProgressBar, { progress: progressVal(status) }, void 0, !1, {
      fileName: "app/routes/app.collections.tsx",
      lineNumber: 170,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/app.collections.tsx",
      lineNumber: 169,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/app.collections.tsx",
    lineNumber: 140,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/app.collections.tsx",
    lineNumber: 139,
    columnNumber: 5
  }, this) }, void 0, !1, {
    fileName: "app/routes/app.collections.tsx",
    lineNumber: 138,
    columnNumber: 3
  }, this);
}, SpacingBackground = ({
  children,
  width = "100%"
}) => /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
  "div",
  {
    style: {
      backgroundColor: "white",
      width,
      height: "auto"
    },
    children
  },
  void 0,
  !1,
  {
    fileName: "app/routes/app.collections.tsx",
    lineNumber: 187,
    columnNumber: 5
  },
  this
), Placeholder = ({ height = "auto", width = "auto", imageUrl = "", status = 0 }) => {
  let opacity = status === 0 ? 0.5 : 1;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
    "div",
    {
      style: {
        display: "inherit",
        backgroundImage: `url(${imageUrl})`,
        // Set the image as background
        backgroundSize: "cover",
        // Cover the entire div with the image; adjust as needed
        backgroundPosition: "center",
        // Center the background image
        height: height ?? void 0,
        width: width ?? void 0,
        opacity
      }
    },
    void 0,
    !1,
    {
      fileName: "app/routes/app.collections.tsx",
      lineNumber: 202,
      columnNumber: 5
    },
    this
  );
}, app_collections_default = Collections;

// app/routes/app.additional.tsx
var app_additional_exports = {};
__export(app_additional_exports, {
  default: () => AdditionalPage
});
var import_polaris2 = require("@shopify/polaris"), import_jsx_dev_runtime4 = require("react/jsx-dev-runtime");
function AdditionalPage() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(import_polaris2.Page, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("ui-title-bar", { title: "Additional page" }, void 0, !1, {
      fileName: "app/routes/app.additional.tsx",
      lineNumber: 15,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(import_polaris2.Layout, { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(import_polaris2.Layout.Section, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(import_polaris2.Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(import_polaris2.BlockStack, { gap: "300", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(import_polaris2.Text, { as: "p", variant: "bodyMd", children: [
          "The app template comes with an additional page which demonstrates how to create multiple pages within app navigation using",
          " ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
            import_polaris2.Link,
            {
              url: "https://shopify.dev/docs/apps/tools/app-bridge",
              target: "_blank",
              removeUnderline: !0,
              children: "App Bridge"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/app.additional.tsx",
              lineNumber: 24,
              columnNumber: 17
            },
            this
          ),
          "."
        ] }, void 0, !0, {
          fileName: "app/routes/app.additional.tsx",
          lineNumber: 20,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(import_polaris2.Text, { as: "p", variant: "bodyMd", children: [
          "To create your own page and have it show up in the app navigation, add a page inside ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(Code, { children: "app/routes" }, void 0, !1, {
            fileName: "app/routes/app.additional.tsx",
            lineNumber: 35,
            columnNumber: 47
          }, this),
          ", and a link to it in the ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(Code, { children: "<ui-nav-menu>" }, void 0, !1, {
            fileName: "app/routes/app.additional.tsx",
            lineNumber: 36,
            columnNumber: 35
          }, this),
          " component found in ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(Code, { children: "app/routes/app.jsx" }, void 0, !1, {
            fileName: "app/routes/app.additional.tsx",
            lineNumber: 37,
            columnNumber: 26
          }, this),
          "."
        ] }, void 0, !0, {
          fileName: "app/routes/app.additional.tsx",
          lineNumber: 33,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/app.additional.tsx",
        lineNumber: 19,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/app.additional.tsx",
        lineNumber: 18,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/app.additional.tsx",
        lineNumber: 17,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(import_polaris2.Layout.Section, { variant: "oneThird", children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(import_polaris2.Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(import_polaris2.BlockStack, { gap: "200", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(import_polaris2.Text, { as: "h2", variant: "headingMd", children: "Resources" }, void 0, !1, {
          fileName: "app/routes/app.additional.tsx",
          lineNumber: 45,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(import_polaris2.List, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(import_polaris2.List.Item, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
          import_polaris2.Link,
          {
            url: "https://shopify.dev/docs/apps/design-guidelines/navigation#app-nav",
            target: "_blank",
            removeUnderline: !0,
            children: "App nav best practices"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/app.additional.tsx",
            lineNumber: 50,
            columnNumber: 19
          },
          this
        ) }, void 0, !1, {
          fileName: "app/routes/app.additional.tsx",
          lineNumber: 49,
          columnNumber: 17
        }, this) }, void 0, !1, {
          fileName: "app/routes/app.additional.tsx",
          lineNumber: 48,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/app.additional.tsx",
        lineNumber: 44,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/app.additional.tsx",
        lineNumber: 43,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/app.additional.tsx",
        lineNumber: 42,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/app.additional.tsx",
      lineNumber: 16,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/app.additional.tsx",
    lineNumber: 14,
    columnNumber: 5
  }, this);
}
function Code({ children }) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
    import_polaris2.Box,
    {
      as: "span",
      padding: "025",
      paddingInlineStart: "100",
      paddingInlineEnd: "100",
      background: "bg-surface-active",
      borderWidth: "025",
      borderColor: "border",
      borderRadius: "100",
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("code", { children }, void 0, !1, {
        fileName: "app/routes/app.additional.tsx",
        lineNumber: 79,
        columnNumber: 7
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "app/routes/app.additional.tsx",
      lineNumber: 69,
      columnNumber: 5
    },
    this
  );
}

// app/routes/app._index.tsx
var app_index_exports = {};
__export(app_index_exports, {
  action: () => action,
  default: () => Index,
  loader: () => loader2
});
var import_react4 = require("react"), import_node3 = require("@remix-run/node"), import_react5 = require("@remix-run/react"), import_polaris3 = require("@shopify/polaris");
var import_jsx_dev_runtime5 = require("react/jsx-dev-runtime"), loader2 = async ({ request }) => (await authenticate.admin(request), null), action = async ({ request }) => {
  let { admin } = await authenticate.admin(request), color = ["Red", "Orange", "Yellow", "Green"][Math.floor(Math.random() * 4)], responseJson = await (await admin.graphql(
    `#graphql
      mutation populateProduct($input: ProductInput!) {
        productCreate(input: $input) {
          product {
            id
            title
            handle
            status
            variants(first: 10) {
              edges {
                node {
                  id
                  price
                  barcode
                  createdAt
                }
              }
            }
          }
        }
      }`,
    {
      variables: {
        input: {
          title: `${color} Snowboard`,
          variants: [{ price: Math.random() * 100 }]
        }
      }
    }
  )).json();
  return (0, import_node3.json)({
    product: responseJson.data?.productCreate?.product
  });
};
function Index() {
  let nav = (0, import_react5.useNavigation)(), actionData = (0, import_react5.useActionData)(), submit = (0, import_react5.useSubmit)(), isLoading = ["loading", "submitting"].includes(nav.state) && nav.formMethod === "POST", productId = actionData?.product?.id.replace(
    "gid://shopify/Product/",
    ""
  );
  (0, import_react4.useEffect)(() => {
    productId && shopify.toast.show("Product created");
  }, [productId]);
  let generateProduct = () => submit({}, { replace: !0, method: "POST" });
  return /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_polaris3.Page, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("ui-title-bar", { title: "Remix app template", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("button", { variant: "primary", onClick: generateProduct, children: "Generate a product" }, void 0, !1, {
      fileName: "app/routes/app._index.tsx",
      lineNumber: 105,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/app._index.tsx",
      lineNumber: 104,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_polaris3.BlockStack, { gap: "500", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_polaris3.Layout, { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_polaris3.Layout.Section, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_polaris3.Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_polaris3.BlockStack, { gap: "500", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_polaris3.BlockStack, { gap: "200", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_polaris3.Text, { as: "h2", variant: "headingMd", children: "Congrats on creating a new Shopify app \u{1F389}" }, void 0, !1, {
            fileName: "app/routes/app._index.tsx",
            lineNumber: 115,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_polaris3.Text, { variant: "bodyMd", as: "p", children: [
            "This embedded app template uses",
            " ",
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
              import_polaris3.Link,
              {
                url: "https://shopify.dev/docs/apps/tools/app-bridge",
                target: "_blank",
                removeUnderline: !0,
                children: "App Bridge"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/app._index.tsx",
                lineNumber: 120,
                columnNumber: 21
              },
              this
            ),
            " ",
            "interface examples like an",
            " ",
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_polaris3.Link, { url: "/app/additional", removeUnderline: !0, children: "additional page in the app nav" }, void 0, !1, {
              fileName: "app/routes/app._index.tsx",
              lineNumber: 128,
              columnNumber: 21
            }, this),
            ", as well as an",
            " ",
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
              import_polaris3.Link,
              {
                url: "https://shopify.dev/docs/api/admin-graphql",
                target: "_blank",
                removeUnderline: !0,
                children: "Admin GraphQL"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/app._index.tsx",
                lineNumber: 132,
                columnNumber: 21
              },
              this
            ),
            " ",
            "mutation demo, to provide a starting point for app development."
          ] }, void 0, !0, {
            fileName: "app/routes/app._index.tsx",
            lineNumber: 118,
            columnNumber: 19
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/app._index.tsx",
          lineNumber: 114,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_polaris3.BlockStack, { gap: "200", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_polaris3.Text, { as: "h3", variant: "headingMd", children: "Get started with products" }, void 0, !1, {
            fileName: "app/routes/app._index.tsx",
            lineNumber: 144,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_polaris3.Text, { as: "p", variant: "bodyMd", children: [
            "Generate a product with GraphQL and get the JSON output for that product. Learn more about the",
            " ",
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
              import_polaris3.Link,
              {
                url: "https://shopify.dev/docs/api/admin-graphql/latest/mutations/productCreate",
                target: "_blank",
                removeUnderline: !0,
                children: "productCreate"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/app._index.tsx",
                lineNumber: 150,
                columnNumber: 21
              },
              this
            ),
            " ",
            "mutation in our API references."
          ] }, void 0, !0, {
            fileName: "app/routes/app._index.tsx",
            lineNumber: 147,
            columnNumber: 19
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/app._index.tsx",
          lineNumber: 143,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_polaris3.InlineStack, { gap: "300", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_polaris3.Button, { loading: isLoading, onClick: generateProduct, children: "Generate a product" }, void 0, !1, {
            fileName: "app/routes/app._index.tsx",
            lineNumber: 161,
            columnNumber: 19
          }, this),
          actionData?.product && /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
            import_polaris3.Button,
            {
              url: `shopify:admin/products/${productId}`,
              target: "_blank",
              variant: "plain",
              children: "View product"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/app._index.tsx",
              lineNumber: 165,
              columnNumber: 21
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/app._index.tsx",
          lineNumber: 160,
          columnNumber: 17
        }, this),
        actionData?.product && /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
          import_polaris3.Box,
          {
            padding: "400",
            background: "bg-surface-active",
            borderWidth: "025",
            borderRadius: "200",
            borderColor: "border",
            overflowX: "scroll",
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("pre", { style: { margin: 0 }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("code", { children: JSON.stringify(actionData.product, null, 2) }, void 0, !1, {
              fileName: "app/routes/app._index.tsx",
              lineNumber: 184,
              columnNumber: 23
            }, this) }, void 0, !1, {
              fileName: "app/routes/app._index.tsx",
              lineNumber: 183,
              columnNumber: 21
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "app/routes/app._index.tsx",
            lineNumber: 175,
            columnNumber: 19
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/app._index.tsx",
        lineNumber: 113,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/routes/app._index.tsx",
        lineNumber: 112,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/app._index.tsx",
        lineNumber: 111,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_polaris3.Layout.Section, { variant: "oneThird", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_polaris3.BlockStack, { gap: "500", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_polaris3.Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_polaris3.BlockStack, { gap: "200", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_polaris3.Text, { as: "h2", variant: "headingMd", children: "App template specs" }, void 0, !1, {
            fileName: "app/routes/app._index.tsx",
            lineNumber: 195,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_polaris3.BlockStack, { gap: "200", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_polaris3.InlineStack, { align: "space-between", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_polaris3.Text, { as: "span", variant: "bodyMd", children: "Framework" }, void 0, !1, {
                fileName: "app/routes/app._index.tsx",
                lineNumber: 200,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
                import_polaris3.Link,
                {
                  url: "https://remix.run",
                  target: "_blank",
                  removeUnderline: !0,
                  children: "Remix"
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/app._index.tsx",
                  lineNumber: 203,
                  columnNumber: 23
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "app/routes/app._index.tsx",
              lineNumber: 199,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_polaris3.InlineStack, { align: "space-between", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_polaris3.Text, { as: "span", variant: "bodyMd", children: "Database" }, void 0, !1, {
                fileName: "app/routes/app._index.tsx",
                lineNumber: 212,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
                import_polaris3.Link,
                {
                  url: "https://www.prisma.io/",
                  target: "_blank",
                  removeUnderline: !0,
                  children: "Prisma"
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/app._index.tsx",
                  lineNumber: 215,
                  columnNumber: 23
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "app/routes/app._index.tsx",
              lineNumber: 211,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_polaris3.InlineStack, { align: "space-between", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_polaris3.Text, { as: "span", variant: "bodyMd", children: "Interface" }, void 0, !1, {
                fileName: "app/routes/app._index.tsx",
                lineNumber: 224,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
                  import_polaris3.Link,
                  {
                    url: "https://polaris.shopify.com",
                    target: "_blank",
                    removeUnderline: !0,
                    children: "Polaris"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/app._index.tsx",
                    lineNumber: 228,
                    columnNumber: 25
                  },
                  this
                ),
                ", ",
                /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
                  import_polaris3.Link,
                  {
                    url: "https://shopify.dev/docs/apps/tools/app-bridge",
                    target: "_blank",
                    removeUnderline: !0,
                    children: "App Bridge"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/app._index.tsx",
                    lineNumber: 236,
                    columnNumber: 25
                  },
                  this
                )
              ] }, void 0, !0, {
                fileName: "app/routes/app._index.tsx",
                lineNumber: 227,
                columnNumber: 23
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/app._index.tsx",
              lineNumber: 223,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_polaris3.InlineStack, { align: "space-between", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_polaris3.Text, { as: "span", variant: "bodyMd", children: "API" }, void 0, !1, {
                fileName: "app/routes/app._index.tsx",
                lineNumber: 246,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
                import_polaris3.Link,
                {
                  url: "https://shopify.dev/docs/api/admin-graphql",
                  target: "_blank",
                  removeUnderline: !0,
                  children: "GraphQL API"
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/app._index.tsx",
                  lineNumber: 249,
                  columnNumber: 23
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "app/routes/app._index.tsx",
              lineNumber: 245,
              columnNumber: 21
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/app._index.tsx",
            lineNumber: 198,
            columnNumber: 19
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/app._index.tsx",
          lineNumber: 194,
          columnNumber: 17
        }, this) }, void 0, !1, {
          fileName: "app/routes/app._index.tsx",
          lineNumber: 193,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_polaris3.Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_polaris3.BlockStack, { gap: "200", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_polaris3.Text, { as: "h2", variant: "headingMd", children: "Next steps" }, void 0, !1, {
            fileName: "app/routes/app._index.tsx",
            lineNumber: 262,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_polaris3.List, { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_polaris3.List.Item, { children: [
              "Build an",
              " ",
              /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
                import_polaris3.Link,
                {
                  url: "https://shopify.dev/docs/apps/getting-started/build-app-example",
                  target: "_blank",
                  removeUnderline: !0,
                  children: [
                    " ",
                    "example app"
                  ]
                },
                void 0,
                !0,
                {
                  fileName: "app/routes/app._index.tsx",
                  lineNumber: 268,
                  columnNumber: 23
                },
                this
              ),
              " ",
              "to get started"
            ] }, void 0, !0, {
              fileName: "app/routes/app._index.tsx",
              lineNumber: 266,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_polaris3.List.Item, { children: [
              "Explore Shopify\u2019s API with",
              " ",
              /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
                import_polaris3.Link,
                {
                  url: "https://shopify.dev/docs/apps/tools/graphiql-admin-api",
                  target: "_blank",
                  removeUnderline: !0,
                  children: "GraphiQL"
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/app._index.tsx",
                  lineNumber: 280,
                  columnNumber: 23
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "app/routes/app._index.tsx",
              lineNumber: 278,
              columnNumber: 21
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/app._index.tsx",
            lineNumber: 265,
            columnNumber: 19
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/app._index.tsx",
          lineNumber: 261,
          columnNumber: 17
        }, this) }, void 0, !1, {
          fileName: "app/routes/app._index.tsx",
          lineNumber: 260,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/app._index.tsx",
        lineNumber: 192,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/routes/app._index.tsx",
        lineNumber: 191,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/app._index.tsx",
      lineNumber: 110,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/app._index.tsx",
      lineNumber: 109,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/app._index.tsx",
    lineNumber: 103,
    columnNumber: 5
  }, this);
}

// app/routes/auth.login/route.tsx
var route_exports = {};
__export(route_exports, {
  action: () => action2,
  default: () => Auth,
  links: () => links,
  loader: () => loader3
});
var import_react6 = require("react"), import_node4 = require("@remix-run/node"), import_polaris4 = require("@shopify/polaris"), import_react7 = require("@remix-run/react");

// node_modules/@shopify/polaris/build/esm/styles.css
var styles_default = "/build/_assets/styles-WREBB75B.css";

// app/routes/auth.login/error.server.tsx
var import_server3 = require("@shopify/shopify-app-remix/server");
function loginErrorMessage(loginErrors) {
  return loginErrors?.shop === import_server3.LoginErrorType.MissingShop ? { shop: "Please enter your shop domain to log in" } : loginErrors?.shop === import_server3.LoginErrorType.InvalidShop ? { shop: "Please enter a valid shop domain to log in" } : {};
}

// app/routes/auth.login/route.tsx
var import_jsx_dev_runtime6 = require("react/jsx-dev-runtime"), links = () => [{ rel: "stylesheet", href: styles_default }], loader3 = async ({ request }) => {
  let errors = loginErrorMessage(await login(request));
  return (0, import_node4.json)({
    errors,
    polarisTranslations: require("@shopify/polaris/locales/en.json")
  });
}, action2 = async ({ request }) => {
  let errors = loginErrorMessage(await login(request));
  return (0, import_node4.json)({
    errors
  });
};
function Auth() {
  let loaderData = (0, import_react7.useLoaderData)(), actionData = (0, import_react7.useActionData)(), [shop, setShop] = (0, import_react6.useState)(""), { errors } = actionData || loaderData;
  return console.log("start installing"), /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_polaris4.AppProvider, { i18n: loaderData.polarisTranslations, children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_polaris4.Page, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_polaris4.Card, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_react7.Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_polaris4.FormLayout, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_polaris4.Text, { variant: "headingMd", as: "h2", children: "Log in" }, void 0, !1, {
      fileName: "app/routes/auth.login/route.tsx",
      lineNumber: 50,
      columnNumber: 15
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(
      import_polaris4.TextField,
      {
        type: "text",
        name: "shop",
        label: "Shop domain",
        helpText: "example.myshopify.com",
        value: shop,
        onChange: setShop,
        autoComplete: "on",
        error: errors.shop
      },
      void 0,
      !1,
      {
        fileName: "app/routes/auth.login/route.tsx",
        lineNumber: 53,
        columnNumber: 15
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_polaris4.Button, { submit: !0, children: "Log in" }, void 0, !1, {
      fileName: "app/routes/auth.login/route.tsx",
      lineNumber: 63,
      columnNumber: 15
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/auth.login/route.tsx",
    lineNumber: 49,
    columnNumber: 13
  }, this) }, void 0, !1, {
    fileName: "app/routes/auth.login/route.tsx",
    lineNumber: 48,
    columnNumber: 11
  }, this) }, void 0, !1, {
    fileName: "app/routes/auth.login/route.tsx",
    lineNumber: 47,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/auth.login/route.tsx",
    lineNumber: 46,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/auth.login/route.tsx",
    lineNumber: 45,
    columnNumber: 5
  }, this);
}

// app/routes/webhooks.tsx
var webhooks_exports = {};
__export(webhooks_exports, {
  action: () => action3
});
var action3 = async ({ request }) => {
  let { topic, shop, session, admin, payload } = await authenticate.webhook(
    request
  );
  if (!admin)
    throw new Response();
  switch (topic) {
    case "APP_UNINSTALLED":
      session && await db_server_default.session.deleteMany({ where: { shop } });
      break;
    case "CUSTOMERS_DATA_REQUEST":
    case "CUSTOMERS_REDACT":
    case "SHOP_REDACT":
    default:
      throw new Response("Unhandled webhook topic", { status: 404 });
  }
  throw new Response();
};

// app/routes/_index/route.tsx
var route_exports2 = {};
__export(route_exports2, {
  default: () => App2,
  links: () => links2,
  loader: () => loader4
});
var import_node5 = require("@remix-run/node"), import_react8 = require("@remix-run/react");

// app/routes/_index/style.css
var style_default = "/build/_assets/style-M2E3MJNO.css";

// app/routes/_index/route.tsx
var import_jsx_dev_runtime7 = require("react/jsx-dev-runtime"), links2 = () => [{ rel: "stylesheet", href: style_default }], loader4 = async ({ request }) => {
  let url = new URL(request.url);
  if (url.searchParams.get("shop"))
    throw (0, import_node5.redirect)(`/app?${url.searchParams.toString()}`);
  return (0, import_node5.json)({ showForm: Boolean(login) });
};
function App2() {
  let { showForm } = (0, import_react8.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "index", children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "content", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("h1", { children: "A short heading about [your app]" }, void 0, !1, {
      fileName: "app/routes/_index/route.tsx",
      lineNumber: 25,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("p", { children: "A tagline about [your app] that describes your value proposition." }, void 0, !1, {
      fileName: "app/routes/_index/route.tsx",
      lineNumber: 26,
      columnNumber: 9
    }, this),
    showForm && /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(import_react8.Form, { method: "post", action: "/auth/login", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("label", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("span", { children: "Shop domain" }, void 0, !1, {
          fileName: "app/routes/_index/route.tsx",
          lineNumber: 30,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("input", { type: "text", name: "shop" }, void 0, !1, {
          fileName: "app/routes/_index/route.tsx",
          lineNumber: 31,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("span", { children: "e.g: my-shop-domain.myshopify.com" }, void 0, !1, {
          fileName: "app/routes/_index/route.tsx",
          lineNumber: 32,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_index/route.tsx",
        lineNumber: 29,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("button", { type: "submit", children: "Log in" }, void 0, !1, {
        fileName: "app/routes/_index/route.tsx",
        lineNumber: 34,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index/route.tsx",
      lineNumber: 28,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("ul", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("li", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("strong", { children: "Product feature" }, void 0, !1, {
          fileName: "app/routes/_index/route.tsx",
          lineNumber: 39,
          columnNumber: 13
        }, this),
        ". Some detail about your feature and its benefit to your customer."
      ] }, void 0, !0, {
        fileName: "app/routes/_index/route.tsx",
        lineNumber: 38,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("li", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("strong", { children: "Product feature" }, void 0, !1, {
          fileName: "app/routes/_index/route.tsx",
          lineNumber: 43,
          columnNumber: 13
        }, this),
        ". Some detail about your feature and its benefit to your customer."
      ] }, void 0, !0, {
        fileName: "app/routes/_index/route.tsx",
        lineNumber: 42,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("li", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("strong", { children: "Product feature" }, void 0, !1, {
          fileName: "app/routes/_index/route.tsx",
          lineNumber: 47,
          columnNumber: 13
        }, this),
        ". Some detail about your feature and its benefit to your customer."
      ] }, void 0, !0, {
        fileName: "app/routes/_index/route.tsx",
        lineNumber: 46,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_index/route.tsx",
      lineNumber: 37,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_index/route.tsx",
    lineNumber: 24,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/_index/route.tsx",
    lineNumber: 23,
    columnNumber: 5
  }, this);
}

// app/routes/auth.$.tsx
var auth_exports = {};
__export(auth_exports, {
  loader: () => loader5
});
var loader5 = async ({ request }) => (await authenticate.admin(request), null);

// app/routes/app.tsx
var app_exports = {};
__export(app_exports, {
  ErrorBoundary: () => ErrorBoundary,
  default: () => App3,
  headers: () => headers,
  links: () => links3,
  loader: () => loader6
});
var import_node6 = require("@remix-run/node"), import_react9 = require("@remix-run/react");
var import_server4 = require("@shopify/shopify-app-remix/server"), import_react10 = require("@shopify/shopify-app-remix/react");
var import_jsx_dev_runtime8 = require("react/jsx-dev-runtime"), links3 = () => [{ rel: "stylesheet", href: styles_default }], loader6 = async ({ request }) => (await authenticate.admin(request), (0, import_node6.json)({ apiKey: process.env.SHOPIFY_API_KEY || "" }));
function App3() {
  let { apiKey } = (0, import_react9.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(import_react10.AppProvider, { isEmbeddedApp: !0, apiKey, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("ui-nav-menu", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(import_react9.Link, { to: "/app/collections", rel: "home", children: "Dash Board" }, void 0, !1, {
      fileName: "app/routes/app.tsx",
      lineNumber: 26,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/app.tsx",
      lineNumber: 22,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(import_react9.Outlet, {}, void 0, !1, {
      fileName: "app/routes/app.tsx",
      lineNumber: 29,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/app.tsx",
    lineNumber: 21,
    columnNumber: 5
  }, this);
}
function ErrorBoundary() {
  return import_server4.boundary.error((0, import_react9.useRouteError)());
}
var headers = (headersArgs) => import_server4.boundary.headers(headersArgs);

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-K37LBJXN.js", imports: ["/build/_shared/chunk-ZWGWGGVF.js", "/build/_shared/chunk-W3AFTBJI.js", "/build/_shared/chunk-XU7DNSPJ.js", "/build/_shared/chunk-GIAAE3CH.js", "/build/_shared/chunk-BOXFZXVX.js", "/build/_shared/chunk-ENXZ3XX7.js", "/build/_shared/chunk-UWV35TSL.js", "/build/_shared/chunk-PNG5AS42.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-C346KYFW.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-DM6JBHQX.js", imports: ["/build/_shared/chunk-3GJP5LZF.js", "/build/_shared/chunk-G7CHZRZX.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/app": { id: "routes/app", parentId: "root", path: "app", index: void 0, caseSensitive: void 0, module: "/build/routes/app-PEXMO5JC.js", imports: ["/build/_shared/chunk-NMZL6IDN.js", "/build/_shared/chunk-SU66BP3D.js", "/build/_shared/chunk-HS53WPB4.js", "/build/_shared/chunk-OUZDRSGY.js", "/build/_shared/chunk-G7CHZRZX.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !0 }, "routes/app._index": { id: "routes/app._index", parentId: "routes/app", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/app._index-KGETSOG6.js", imports: void 0, hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/app.additional": { id: "routes/app.additional", parentId: "routes/app", path: "additional", index: void 0, caseSensitive: void 0, module: "/build/routes/app.additional-JSROMYE3.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/app.collections": { id: "routes/app.collections", parentId: "routes/app", path: "collections", index: void 0, caseSensitive: void 0, module: "/build/routes/app.collections-GLOSY7UP.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/auth.$": { id: "routes/auth.$", parentId: "root", path: "auth/*", index: void 0, caseSensitive: void 0, module: "/build/routes/auth.$-Z6LPBAD4.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/auth.login": { id: "routes/auth.login", parentId: "root", path: "auth/login", index: void 0, caseSensitive: void 0, module: "/build/routes/auth.login-BPYUACBD.js", imports: ["/build/_shared/chunk-HS53WPB4.js", "/build/_shared/chunk-OUZDRSGY.js", "/build/_shared/chunk-3GJP5LZF.js", "/build/_shared/chunk-G7CHZRZX.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/webhooks": { id: "routes/webhooks", parentId: "root", path: "webhooks", index: void 0, caseSensitive: void 0, module: "/build/routes/webhooks-YCEDH7MD.js", imports: void 0, hasAction: !0, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "4ade5be0", hmr: { runtime: "/build/_shared/chunk-ENXZ3XX7.js", timestamp: 1709029282886 }, url: "/build/manifest-4ADE5BE0.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "development", assetsBuildDirectory = "public/build", future = { v3_fetcherPersist: !1, v3_relativeSplatPath: !1, v3_throwAbortReason: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/app.collections": {
    id: "routes/app.collections",
    parentId: "routes/app",
    path: "collections",
    index: void 0,
    caseSensitive: void 0,
    module: app_collections_exports
  },
  "routes/app.additional": {
    id: "routes/app.additional",
    parentId: "routes/app",
    path: "additional",
    index: void 0,
    caseSensitive: void 0,
    module: app_additional_exports
  },
  "routes/app._index": {
    id: "routes/app._index",
    parentId: "routes/app",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: app_index_exports
  },
  "routes/auth.login": {
    id: "routes/auth.login",
    parentId: "root",
    path: "auth/login",
    index: void 0,
    caseSensitive: void 0,
    module: route_exports
  },
  "routes/webhooks": {
    id: "routes/webhooks",
    parentId: "root",
    path: "webhooks",
    index: void 0,
    caseSensitive: void 0,
    module: webhooks_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: route_exports2
  },
  "routes/auth.$": {
    id: "routes/auth.$",
    parentId: "root",
    path: "auth/*",
    index: void 0,
    caseSensitive: void 0,
    module: auth_exports
  },
  "routes/app": {
    id: "routes/app",
    parentId: "root",
    path: "app",
    index: void 0,
    caseSensitive: void 0,
    module: app_exports
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
});
//# sourceMappingURL=index.js.map
