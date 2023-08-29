import '@/styles/globals.scss';
import {Providers} from '@/shared/redux/provider';
import AuthGaurd from './AuthGaurd';
export const metadata = {
  viewport: {
    width: 'device-width',
    height: 'device-height',
  },
};
export default function RootLayout({children}) {
  return (
    <html lang="en">
      <title>Tip your teacher</title>
      <link rel="icon" href={'../../../assets/images/brand/favicon.ico'} />
      {/* Font Awesome Kit */}
      <script
        src="https://kit.fontawesome.com/c1626a0811.js"
        crossorigin="anonymous"
        async
      ></script>
      <body>
        <Providers>
          <AuthGaurd>{children}</AuthGaurd>
        </Providers>
      </body>
    </html>
  );
}
