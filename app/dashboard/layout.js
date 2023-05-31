import '@/styles/globals.scss';

const RootLayout = ({children}) => {
  return (
    <html lang="en">
      <title>Tip your teacher - Dashboard</title>
      <link rel="icon" href={'../../../assets/images/brand/favicon.ico'} />
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
