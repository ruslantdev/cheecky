import {Link} from 'react-router-dom';

const Home = () => {
  return (
    <div style={{background: '#9f9f9f', height: 2000}}>
      Home page
      <Link to="/about">TO about</Link>
    </div>
  );
};

export default Home;
