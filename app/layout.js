'use client';
import '@/styles/globals.scss';
import {Providers} from '@/shared/redux/provider';
import AuthGaurd from './AuthGaurd';
import {usePathname} from 'next/navigation';
import Footer from '@/shared/layout-components/footer/footer';
export const metadata = {
  viewport: {
    width: 'device-width',
    height: 'device-height',
  },
};
export default function RootLayout({children}) {
  const pathname = usePathname();
  const isDashboardPage = pathname.includes('/dashboard');

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
          <div
            style={{
              display: isDashboardPage && 'none',
              position: 'fixed',
              bottom: 0,
              background: '#4c6281',
              width: '100%',
              padding: '15px 0px',
              zIndex: 999,
            }}
          >
            <div className="container text-white">
              <Footer linkColor={'#FFFFCC'} />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
