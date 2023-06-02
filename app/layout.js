import '@/styles/globals.scss';
import {Providers} from '@/shared/redux/provider';
export default function RootLayout({children}) {
  return (
    <html lang="en">
      <title>Tip your teacher</title>
      <link rel="icon" href={'../../../assets/images/brand/favicon.ico'} />
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
