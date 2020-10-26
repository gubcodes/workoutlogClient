import React, {useState, useEffect} from 'react';
import SiteBar from './home/Navbar';
import Auth from './auth/Auth';
import WorkoutIndex from './workouts/WorkoutIndex';



function App() {

  const [ sessionToken, setSessionToken ] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token')){
      setSessionToken(localStorage.getItem('token'));
    }
  },[])

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  }

  const clearToken = () => { //logout
    localStorage.clear();
    setSessionToken('');
  }

  const protectedViews = () => { //checking to make sure the user has a token before letting them access certain pages
    return (sessionToken === localStorage.getItem('token') ? <WorkoutIndex token={sessionToken} />
    : <Auth updateToken={updateToken} />)
  }

  return (
    <div className="App">
      {/* <SiteBar clickLogout={clearToken} /> */}
      {/* <Auth updateToken={updateToken}/> */}
      <SiteBar clickLogout={clearToken} />
      {protectedViews()}
    </div>
  );
}

export default App;
