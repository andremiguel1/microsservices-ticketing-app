import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div className='container-xl'>
      <Header currentUser={currentUser} />
      <div className='panel-body'>
        <Component {...pageProps} />
      </div>
      <div className='panel-footer'>Footer</div>
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx
    );
  }
  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
