import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Nav from './Navbar';
import Ownerthead from './tablefilecards/ownerthead';
import Ownertrowmain from './tablefilecards/ownertrowmain';
import Ownertrowbranch from './tablefilecards/ownertrowbranch';
import Colabtrow from "./tablefilecards/colabtrow";
import Colabthead from "./tablefilecards/colabthead";
import './style.css';

let email = localStorage.getItem('userEmail');
console.log(email);

const Versions = ({ Toggle }) => {
  const [sampleData, setSampleData] = useState([]);
  const [allusers, setAllUsers] = useState([]);
  const [mainFile, setMainFile] = useState({});
  const [isOwner, setIsOwner] = useState(false);
  const [songid, setSongId] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      console.log("fetchData returns")
      const songid1 = localStorage.getItem('songid');
      console.log(songid1);

      var response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/userinsong?email=${email}&songid=${songid1}`);
      setSampleData(response.data);
      setSongId(songid1);

      if (!response.data?.data?.[0]?.song) {
        // Loading state, you can show a loader or return null
        setLoading(false);
        return;
      }

      const fetchedMainFile = response.data.data[0].song.mainaudiofile[0];
      const fetchedIsOwner = response.data.data[0].isowner;

      setMainFile(fetchedMainFile);
      setIsOwner(fetchedIsOwner);

      // Populate allusers state
      if (response.data?.data?.[3]?.allusers) {
        setAllUsers(response.data.data[3].allusers);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data from the backend:', error.response || error.message || error);
      setLoading(false);
    }
  }, [email]);

  useEffect(() => {
    fetchData();
  }, []);

  // Moved these outside of the useEffect scope
  const findUsername = (id) => {
    for (let i = 0; i < allusers.length; i++) {
      if (allusers[i]._id === id) {
        return allusers[i].name;
      }
    }
  };

  const TheadMainComponent = isOwner ? Ownerthead : Colabthead;
  const TrowMainComponent = isOwner ? Ownertrowmain : Colabtrow;
  const TheadBranchComponent = isOwner ? Ownerthead : Colabthead;
  const TrowBranchComponent = isOwner ? Ownertrowbranch : Colabtrow;

  if (loading) {
    // Loading state, you can show a loader or return null
    return <div>Loading...</div>;
  }

  return (
    <div className='px-3'>
    
      <Nav Toggle={Toggle} />

      <table className="table caption-top bg-white rounded mt-2">
        <caption className='text-dark fs-4'>Main File</caption>
        <thead>
          <TheadMainComponent />
        </thead>
        <tbody>
        
          <TrowMainComponent
            date={mainFile.date}
            owner={findUsername(mainFile.owner)}
            description={mainFile.description}
            size={mainFile.size}
          />
        </tbody>
      </table>

      <table className="table caption-top bg-white rounded mt-2">
        <caption className='text-dark fs-4'>Branch Files</caption>
        <thead>
          <TheadBranchComponent />
        </thead>
        <tbody>
          {mainFile.branchaudiofiles && mainFile.branchaudiofiles.length > 0 ? (
            mainFile.branchaudiofiles.map((file, index) => (
              <TrowBranchComponent
                key={index}
                date={file.date}
                owner={findUsername(file.owner)}
                description={file.filedescription}
                size={file.size}
              />
            ))
          ) : (
            <tr>
              <td colSpan="4">No branch files available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Versions;
