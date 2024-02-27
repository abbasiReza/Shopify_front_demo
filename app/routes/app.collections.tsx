import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Card, Layout, List, Page, InlineGrid,ProgressBar,Badge } from "@shopify/polaris";
import { apiVersion, authenticate } from "~/shopify.server";
import { Shopify } from '@shopify/shopify-api';

// import {publicPath} from "@remix-run/dev/server-build";
// @ts-ignore
import step1 from "public/step1.webp";
// @ts-ignore
import step2 from "public/step2.webp";
// @ts-ignore
import step3 from "public/step3.webp";


export const query =`
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
`

// utils.js or within your component file
export function getCookie(name: string | any[]) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}


export const loader: LoaderFunction = async ({ request }) => {
    const { admin,session } = await authenticate.admin(request)
    const {shop, accessToken } = session;

    const resAll =   await admin.rest.resources.Shop.all({
  session: session,
});
      // Assuming the request is successful, extract headers
    const headers = resAll.headers;

    const shopifyStoreId =  headers['X-Shopid'][0] ; // This will embed the Shopify store ID
    const shopifyStoreUrl =  session.shop ;

    try{


        const response = await fetch(`https://${shop}/admin/api/${apiVersion}/graphql.json`, {
            method: "POST",
            headers: {
                "Content-Type": "application/graphql",
                "X-Shopify-Access-Token": accessToken
            },
            body: query

        });
        console.log('this is query=>',query)
        if(response.ok){
            const data = await response.json()

          const rest = await fetch(`https://transcript-combine-areas-miller.trycloudflare.com/djangoapp/shopify/status/?id=${shopifyStoreId}`, {
          method: 'GET', // Method is correct for fetching data
          headers: {
            // If specific headers are required, include them here
            // 'Authorization': 'Bearer YOUR_TOKEN_HERE', // Example for including an Authorization header
          },
          mode: 'no-cors', // Moved outside of headers, but consider the implications
        })
        const restdata = await rest.json();
            console.log(restdata.status)
            return restdata.status


        }


        return null

    } catch(err){

        console.log(err)
        console.log('this is catching !!!!!!')
        return null
    }


}


const Collections = () => {
    const status: any = useLoaderData()
  // Convert status to a number if it's not already
    const numericStatus = Number(status);
    let statusText;
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
    statusText = "Unknown"; // Default case if numericStatus doesn't match any case
}

    // A simple function to determine the status for each placeholder
    const determineStatus = (index: number) => {
        return index < numericStatus ? 1 : 0;
    };
    const progressVal =(status: number) => {
      return status * 33
    }


  return (
  <Page fullWidth>
    <Layout>
        <Layout.Section>
          <Card>
      <Badge
        tone="success"
        progress="complete"
        toneAndProgressLabelOverride="Status: Published. Your online store is visible."
      >
        {statusText}
      </Badge>
    </Card>



        <SpacingBackground>
          <InlineGrid gap="400" columns={3}>
            <Placeholder height="320px"
                         imageUrl={step1}
                         status={determineStatus(0)}/>

            <Placeholder height="320px"
                         imageUrl={step2}
                         status={determineStatus(1)}/>
            <Placeholder height="320px"
                         imageUrl={step3}
                         status={determineStatus(2)}/>
          </InlineGrid>
        </SpacingBackground>


        <div style={{width: '100%'}}>
          <ProgressBar progress={progressVal(status)}/>
        </div>

      </Layout.Section>
    </Layout>
  </Page>
  );
};

const SpacingBackground = ({
                             children,
                             width = '100%',
}: {
  children: React.ReactNode;
  width?: string;
}) => {
  return (
    <div
      style={{
        backgroundColor:"white",
        width,
        height: 'auto',
      }}
    >
      {children}
    </div>
  );
};

const Placeholder = ({height = 'auto', width = 'auto',imageUrl = '',status=0}) => {
  const opacity = status === 0 ? 0.5 : 1;
  return (
    <div
      style={{
        display: 'inherit',

        backgroundImage: `url(${imageUrl})`, // Set the image as background
        backgroundSize: 'cover', // Cover the entire div with the image; adjust as needed
        backgroundPosition: 'center', // Center the background image
        height: height ?? undefined,
        width: width ?? undefined,
        opacity: opacity,
      }}
    />
  );
};
export default Collections;
