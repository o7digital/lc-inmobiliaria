'use client'
import "../styles/index.scss";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { OrganizationSchema } from "@/components/common/JsonLdSchema";
import SEO_CONFIG, { getSocialMediaUrls } from "@/config/seo.config";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const isDev = process.env.NODE_ENV === 'development'

  return (
    <html lang="es" suppressHydrationWarning={isDev}>
      <head>
        {/* Schema.org JSON-LD pour l'organisation */}
        <OrganizationSchema
          name={SEO_CONFIG.organization.name}
          url={SEO_CONFIG.siteUrl}
          logo={`${SEO_CONFIG.siteUrl}${SEO_CONFIG.organization.logo}`}
          description={SEO_CONFIG.organization.description}
          address={SEO_CONFIG.organization.address}
          contactPoint={SEO_CONFIG.organization.contact}
          sameAs={getSocialMediaUrls()}
        />
        <meta name="keywords" content={SEO_CONFIG.defaultMetadata.keywords.join(', ')} />
        <meta name="description" content={SEO_CONFIG.defaultMetadata.description} />
        <meta property="og:site_name" content={SEO_CONFIG.siteName} />
        <meta property="og:url" content={SEO_CONFIG.siteUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={SEO_CONFIG.defaultMetadata.title} />
        <meta property="og:description" content={SEO_CONFIG.defaultMetadata.description} />
        <meta name='og:image' content={`${SEO_CONFIG.siteUrl}${SEO_CONFIG.defaultMetadata.ogImage}`} />
        {/* For IE  */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        {/* For Resposive Device */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* For Window Tab Color */}
        {/* Chrome, Firefox OS and Opera */}
        <meta name="theme-color" content="#0D1A1C" />
        {/* Windows Phone */}
        <meta name="msapplication-navbutton-color" content="#0D1A1C" />
        {/* iOS Safari */}
        <meta name="apple-mobile-web-app-status-bar-style" content="#0D1A1C" />

        {/* 👇 Aquí el cambio */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />

        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,500&display=swap" />
      </head>
      <body suppressHydrationWarning={true}>
        <div className="main-page-wrapper">
          <Provider store={store}>
            {children}
          </Provider>
        </div>
      </body>
    </html>
  )
}
