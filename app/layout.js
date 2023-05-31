import '@/styles/globals.scss';

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <title>Tip your teacher</title>
      <link rel="icon" href={'../../../assets/images/brand/favicon.ico'} />
      <body>{children}</body>
    </html>
  );
}
