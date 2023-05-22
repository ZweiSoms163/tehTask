import './App.css';
import 'remixicon/fonts/remixicon.css';
import Layout from './components/Layout/Layout';
import { useSelector } from 'react-redux';

function App() {
  const darkTheme = useSelector((state) => state.theme.darkTheme);

  return (
    <div className={`App ${darkTheme ? 'dark' : 'light'}`}>
      <Layout />
    </div>
  );
}

export default App;
