import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
  return currentUser ? <h1>Logado</h1> : <h1>Não logado</h1>;
};

LandingPage.getInitialProps = async (context) => {
  console.log('Landing Page');
  const { data } = await buildClient(context).get(
    '/api/users/currentuser'
  );
  return data;
};

export default LandingPage;
