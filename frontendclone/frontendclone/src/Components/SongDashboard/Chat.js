import React, { useState } from 'react';
import Nav from './Navbar';
import './style.css';
import Othercard from './chatcards/othercard';
import Yourcard from './chatcards/youcard';


let email=localStorage.getItem('userEmail')
console.log(email);
const sampleData = [
    {
      "message": "true",
      "data": [
          {
              "isowner": true,
              "user": {
                  "_id": "65bc92ae26eda21cf1fe90b8",
                  "roles": [],
                  "genres": [],
                  "languages": [],
                  "followers": [],
                  "following": [],
                  "isComplete": true,
                  "songs": [
                      {
                          "name": "Sanam Re",
                          "mainaudiofile": [
                              {
                                  "name": "Sanam Re",
                                  "path": "example",
                                  "owner": "65bc92b826eda21cf1fe90bb",
                                  "date": "2024-02-02T06:58:21.874Z",
                                  "size": 0,
                                  "isMerged": true,
                                  "previouslymain": false,
                                  "initialmain": true,
                                  "_id": "65bc933b26eda21cf1fe90ca"
                              }
                          ],
                          "branchaudiofiles": [
                              {
                                  "name": "Sanam Re",
                                  "filedescription": "2nd_owner_commit",
                                  "path": "example2",
                                  "owner": "65bc92b826eda21cf1fe90bb",
                                  "date": "2024-02-02T06:58:21.874Z",
                                  "size": 0,
                                  "isMerged": false,
                                  "previouslymain": false,
                                  "initialmain": false,
                                  "_id": "65bc937526eda21cf1fe90e5"
                              },
                              {
                                  "name": "Sanam Re",
                                  "filedescription": "3rd_owner_commit",
                                  "path": "example2",
                                  "owner": "65bc92b826eda21cf1fe90bb",
                                  "date": "2024-02-02T06:58:21.874Z",
                                  "size": 0,
                                  "isMerged": false,
                                  "previouslymain": false,
                                  "initialmain": false,
                                  "_id": "65bc938326eda21cf1fe9105"
                              }
                          ],
                          "image": "image.jpg",
                          "description": "example",
                          "lyrics": "example",
                          "genres": [],
                          "languages": [],
                          "colaborationrequests": [
                              "65bc943826eda21cf1fe9172"
                          ],
                          "colaborations": [
                              {
                                  "userid": "65bc92ae26eda21cf1fe90b8",
                                  "roles": [],
                                  "_id": "65bc93fd26eda21cf1fe914b"
                              }
                          ],
                          "date": "2024-02-02T06:58:21.874Z",
                          "owner": "65bc92b826eda21cf1fe90bb",
                          "ownerroles": [
                              "Singer"
                          ],
                          "instruments": [],
                          "likes": 0,
                          "published": false,
                          "chats": [
                              {
                                  "sender": "65bc92b826eda21cf1fe90bb",
                                  "message": "Hello",
                                  "date": "2024-02-02T06:58:21.875Z",
                                  "_id": "65bc94ad26eda21cf1fe91a6"
                              },
                              {
                                  "sender": "65bc92ae26eda21cf1fe90b8",
                                  "message": "Hi",
                                  "date": "2024-02-02T06:58:21.875Z",
                                  "_id": "65bc94c126eda21cf1fe91c8"
                              }
                          ],
                          "_id": "65bc933b26eda21cf1fe90cc"
                      }
                  ],
                  "colaborations": [
                      {
                          "songid": "65bc933b26eda21cf1fe90cc",
                          "roles": [],
                          "_id": "65bc93fd26eda21cf1fe9149"
                      }
                  ],
                  "audiofiles": [],
                  "name": "Anushka",
                  "email": "anushka@gmail.com",
                  "password": "$2b$10$plVtwjR1/Q0PHL9/2nnY7.7VHfaq6xjxnjdPJ0USh4Kbry0f5qbt.",
                  "__v": 0,
                  "bio": "example",
                  "image": "example.png",
                  "location": "example"
              },
              "song": {
                  "_id": "65bc933b26eda21cf1fe90cc",
                  "name": "Sanam Re",
                  "image": "image.jpg",
                  "description": "example",
                  "lyrics": "example",
                  "genres": [],
                  "languages": [],
                  "colaborationrequests": [
                      "65bc943826eda21cf1fe9172"
                  ],
                  "date": "2024-02-02T06:58:21.874Z",
                  "owner": "65bc92b826eda21cf1fe90bb",
                  "ownerroles": [
                      "Singer"
                  ],
                  "instruments": [],
                  "likes": 0,
                  "published": false,
                  "mainaudiofile": [
                      {
                          "name": "Sanam Re",
                          "path": "example",
                          "owner": "65bc92b826eda21cf1fe90bb",
                          "date": "2024-02-02T06:58:21.874Z",
                          "size": 0,
                          "isMerged": true,
                          "previouslymain": false,
                          "initialmain": true,
                          "_id": "65bc933b26eda21cf1fe90ca"
                      }
                  ],
                  "branchaudiofiles": [
                      {
                          "name": "Sanam Re",
                          "filedescription": "2nd_owner_commit",
                          "path": "example2",
                          "owner": "65bc92b826eda21cf1fe90bb",
                          "date": "2024-02-02T06:58:21.874Z",
                          "size": 0,
                          "isMerged": false,
                          "previouslymain": false,
                          "initialmain": false,
                          "_id": "65bc937526eda21cf1fe90e5"
                      },
                      {
                          "name": "Sanam Re",
                          "filedescription": "3rd_owner_commit",
                          "path": "example2",
                          "owner": "65bc92b826eda21cf1fe90bb",
                          "date": "2024-02-02T06:58:21.874Z",
                          "size": 0,
                          "isMerged": false,
                          "previouslymain": false,
                          "initialmain": false,
                          "_id": "65bc938326eda21cf1fe9105"
                      }
                  ],
                  "colaborations": [
                      {
                          "userid": "65bc92ae26eda21cf1fe90b8",
                          "roles": [],
                          "_id": "65bc93fd26eda21cf1fe914b"
                      }
                  ],
                  "chats": [
                      {
                          "sender": "65bc92b826eda21cf1fe90bb",
                          "message": "Hello",
                          "date": "2024-02-02T06:58:21.875Z",
                          "_id": "65bc94ad26eda21cf1fe91a6"
                      },
                      {
                          "sender": "65bc92ae26eda21cf1fe90b8",
                          "message": "Hi",
                          "date": "2024-02-02T06:58:21.875Z",
                          "_id": "65bc94c126eda21cf1fe91c8"
                      }
                  ],
                  "__v": 0
              }
          },
          {
              "colaborators": [
                  {
                      "colaborator": {
                          "_id": "65bc92ae26eda21cf1fe90b8",
                          "roles": [],
                          "genres": [],
                          "languages": [],
                          "followers": [],
                          "following": [],
                          "isComplete": true,
                          "songs": [
                              {
                                  "name": "Sanam Re",
                                  "mainaudiofile": [
                                      {
                                          "name": "Sanam Re",
                                          "path": "example",
                                          "owner": "65bc92b826eda21cf1fe90bb",
                                          "date": "2024-02-02T06:58:21.874Z",
                                          "size": 0,
                                          "isMerged": true,
                                          "previouslymain": false,
                                          "initialmain": true,
                                          "_id": "65bc933b26eda21cf1fe90ca"
                                      }
                                  ],
                                  "branchaudiofiles": [
                                      {
                                          "name": "Sanam Re",
                                          "filedescription": "2nd_owner_commit",
                                          "path": "example2",
                                          "owner": "65bc92b826eda21cf1fe90bb",
                                          "date": "2024-02-02T06:58:21.874Z",
                                          "size": 0,
                                          "isMerged": false,
                                          "previouslymain": false,
                                          "initialmain": false,
                                          "_id": "65bc937526eda21cf1fe90e5"
                                      },
                                      {
                                          "name": "Sanam Re",
                                          "filedescription": "3rd_owner_commit",
                                          "path": "example2",
                                          "owner": "65bc92b826eda21cf1fe90bb",
                                          "date": "2024-02-02T06:58:21.874Z",
                                          "size": 0,
                                          "isMerged": false,
                                          "previouslymain": false,
                                          "initialmain": false,
                                          "_id": "65bc938326eda21cf1fe9105"
                                      }
                                  ],
                                  "image": "image.jpg",
                                  "description": "example",
                                  "lyrics": "example",
                                  "genres": [],
                                  "languages": [],
                                  "colaborationrequests": [
                                      "65bc943826eda21cf1fe9172"
                                  ],
                                  "colaborations": [
                                      {
                                          "userid": "65bc92ae26eda21cf1fe90b8",
                                          "roles": [],
                                          "_id": "65bc93fd26eda21cf1fe914b"
                                      }
                                  ],
                                  "date": "2024-02-02T06:58:21.874Z",
                                  "owner": "65bc92b826eda21cf1fe90bb",
                                  "ownerroles": [
                                      "Singer"
                                  ],
                                  "instruments": [],
                                  "likes": 0,
                                  "published": false,
                                  "chats": [
                                      {
                                          "sender": "65bc92b826eda21cf1fe90bb",
                                          "message": "Hello",
                                          "date": "2024-02-02T06:58:21.875Z",
                                          "_id": "65bc94ad26eda21cf1fe91a6"
                                      },
                                      {
                                          "sender": "65bc92ae26eda21cf1fe90b8",
                                          "message": "Hi",
                                          "date": "2024-02-02T06:58:21.875Z",
                                          "_id": "65bc94c126eda21cf1fe91c8"
                                      }
                                  ],
                                  "_id": "65bc933b26eda21cf1fe90cc"
                              }
                          ],
                          "colaborations": [
                              {
                                  "songid": "65bc933b26eda21cf1fe90cc",
                                  "roles": [],
                                  "_id": "65bc93fd26eda21cf1fe9149"
                              }
                          ],
                          "audiofiles": [],
                          "name": "Anushka",
                          "email": "anushka@gmail.com",
                          "password": "$2b$10$plVtwjR1/Q0PHL9/2nnY7.7VHfaq6xjxnjdPJ0USh4Kbry0f5qbt.",
                          "__v": 0,
                          "bio": "example",
                          "image": "example.png",
                          "location": "example"
                      }
                  }
              ]
          },
          {
              "colaborationrequests": [
                  {
                      "_id": "65bc943826eda21cf1fe9172",
                      "song": "65bc933b26eda21cf1fe90cc",
                      "owner": "65bc92b826eda21cf1fe90bb",
                      "description": "good piano player",
                      "roleneeded": [],
                      "date": "2024-02-02T06:58:21.874Z",
                      "requests": [
                          {
                              "userid": "65bc92e126eda21cf1fe90be",
                              "message": "I want to collaborate here",
                              "pending": true,
                              "accepted": false,
                              "rejected": false,
                              "date": "2024-02-02T06:58:21.874Z",
                              "_id": "65bc945e26eda21cf1fe918c"
                          },
                          {
                              "userid": "65bc92e126eda21cf1fe90be",
                              "message": "I want to collaborate then",
                              "pending": true,
                              "accepted": false,
                              "rejected": false,
                              "date": "2024-02-02T06:58:21.874Z",
                              "_id": "65bc946c26eda21cf1fe9193"
                          }
                      ],
                      "__v": 0
                  }
              ]
          },
          {
              "allusers": [
                  {
                      "_id": "65bc92ae26eda21cf1fe90b8",
                      "roles": [],
                      "genres": [],
                      "languages": [],
                      "followers": [],
                      "following": [],
                      "isComplete": true,
                      "songs": [  ],
                      "colaborations": [
                          {
                              "songid": "65bc933b26eda21cf1fe90cc",
                              "roles": [],
                              "_id": "65bc93fd26eda21cf1fe9149"
                          }
                      ],
                      "audiofiles": [],
                      "name": "Anushka",
                      "email": "anushka@gmail.com",
                      "password": "$2b$10$plVtwjR1/Q0PHL9/2nnY7.7VHfaq6xjxnjdPJ0USh4Kbry0f5qbt.",
                      "__v": 0,
                      "bio": "example",
                      "image": "example.png",
                      "location": "example"
                  },
                  {
                      "_id": "65bc92b826eda21cf1fe90bb",
                      "roles": [],
                      "genres": [],
                      "languages": [],
                      "followers": [],
                      "following": [],
                      "isComplete": true,
                      "songs": [
                          {
                              "name": "Sanam Re",
                              "mainaudiofile": [
                                  {
                                      "name": "Sanam Re",
                                      "path": "example",
                                      "owner": "65bc92b826eda21cf1fe90bb",
                                      "date": "2024-02-02T06:58:21.874Z",
                                      "size": 0,
                                      "isMerged": true,
                                      "previouslymain": false,
                                      "initialmain": true,
                                      "_id": "65bc933b26eda21cf1fe90ca"
                                  }
                              ],
                              "branchaudiofiles": [
                                  {
                                      "name": "Sanam Re",
                                      "filedescription": "2nd_owner_commit",
                                      "path": "example2",
                                      "owner": "65bc92b826eda21cf1fe90bb",
                                      "date": "2024-02-02T06:58:21.874Z",
                                      "size": 0,
                                      "isMerged": false,
                                      "previouslymain": false,
                                      "initialmain": false,
                                      "_id": "65bc937526eda21cf1fe90e5"
                                  },
                                  {
                                      "name": "Sanam Re",
                                      "filedescription": "3rd_owner_commit",
                                      "path": "example2",
                                      "owner": "65bc92b826eda21cf1fe90bb",
                                      "date": "2024-02-02T06:58:21.874Z",
                                      "size": 0,
                                      "isMerged": false,
                                      "previouslymain": false,
                                      "initialmain": false,
                                      "_id": "65bc938326eda21cf1fe9105"
                                  }
                              ],
                              "image": "image.jpg",
                              "description": "example",
                              "lyrics": "example",
                              "genres": [],
                              "languages": [],
                              "colaborationrequests": [
                                  "65bc943826eda21cf1fe9172"
                              ],
                              "colaborations": [
                                  {
                                      "userid": "65bc92ae26eda21cf1fe90b8",
                                      "roles": [],
                                      "_id": "65bc93fd26eda21cf1fe914b"
                                  }
                              ],
                              "date": "2024-02-02T06:58:21.874Z",
                              "owner": "65bc92b826eda21cf1fe90bb",
                              "ownerroles": [
                                  "Singer"
                              ],
                              "instruments": [],
                              "likes": 0,
                              "published": false,
                              "chats": [
                                  {
                                      "sender": "65bc92b826eda21cf1fe90bb",
                                      "message": "Hello",
                                      "date": "2024-02-02T06:58:21.875Z",
                                      "_id": "65bc94ad26eda21cf1fe91a6"
                                  },
                                  {
                                      "sender": "65bc92ae26eda21cf1fe90b8",
                                      "message": "Hi",
                                      "date": "2024-02-02T06:58:21.875Z",
                                      "_id": "65bc94c126eda21cf1fe91c8"
                                  }
                              ],
                              "_id": "65bc933b26eda21cf1fe90cc"
                          }
                      ],
                      "colaborations": [],
                      "audiofiles": [
                          {
                              "name": "Sanam Re",
                              "path": "example",
                              "owner": "65bc92b826eda21cf1fe90bb",
                              "date": "2024-02-02T06:58:21.874Z",
                              "size": 0,
                              "isMerged": true,
                              "previouslymain": false,
                              "initialmain": true,
                              "_id": "65bc933b26eda21cf1fe90ca"
                          },
                          {
                              "name": "Sanam Re",
                              "filedescription": "2nd_owner_commit",
                              "path": "example2",
                              "owner": "65bc92b826eda21cf1fe90bb",
                              "date": "2024-02-02T06:58:21.874Z",
                              "size": 0,
                              "isMerged": false,
                              "previouslymain": false,
                              "initialmain": false,
                              "_id": "65bc937526eda21cf1fe90e5"
                          },
                          {
                              "name": "Sanam Re",
                              "filedescription": "3rd_owner_commit",
                              "path": "example2",
                              "owner": "65bc92b826eda21cf1fe90bb",
                              "date": "2024-02-02T06:58:21.874Z",
                              "size": 0,
                              "isMerged": false,
                              "previouslymain": false,
                              "initialmain": false,
                              "_id": "65bc938326eda21cf1fe9105"
                          }
                      ],
                      "name": "Rimo",
                      "email": "biswasankit0004@gmail.com",
                      "password": "$2b$10$sJMLdblPS/8LNk60zt/vROAojsEXHA3ywCDm/9z/qh0DunRo98CyK",
                      "__v": 0,
                      "bio": "example",
                      "image": "example.png",
                      "location": "example"
                  },
                  {
                      "_id": "65bc92e126eda21cf1fe90be",
                      "roles": [],
                      "genres": [],
                      "languages": [],
                      "followers": [],
                      "following": [],
                      "isComplete": true,
                      "songs": [],
                      "colaborations": [],
                      "audiofiles": [],
                      "name": "Rajdeep",
                      "email": "raj@gmail.com",
                      "password": "$2b$10$sJp1erKrS4RaXfoXKwaGeeXfQBLq7yGnKm7en5.tvpLiF5XmjdDue",
                      "__v": 0,
                      "bio": "example",
                      "image": "example.png",
                      "location": "example"
                  }
              ]
          }
      ]
  }
  
  ];

  const allusers = sampleData[0].data[3].allusers;
function Chat({ Toggle }) {
   const [inputValue, setInputValue] = useState('');

   function finduser(id){
    for(let i = 0; i < allusers.length; i++){
        if(allusers[i]._id === id){
            return allusers[i].name;
        }
    }
}

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement your form submission logic here
        console.log(`Form submitted with value: ${inputValue}`);

    };
    const chats = sampleData[0].data[0].song.chats;
    const your_id = sampleData[0].data[0].user._id;
   
    return (
        <div className='px-3'>
          <Nav Toggle={Toggle} />
          {chats.map(chat => {
            if (your_id === chat.sender) {
              return (
                <Yourcard
                  key={chat._id}
                  sender="You" // finduser(chat.you)
                  message={chat.message}
                  time={chat.date}
                />
              );
            }
            else{
              return (
                <Othercard
                  key={chat._id}
                  sender={finduser(chat.sender)}
                  message={chat.message}
                  time={chat.date}
                />
              );
            }
           // return null; // or handle other conditions
          })}
          {/* <Othercard sender="Ankit Biswas" message="Hello" time="10:00 AM" />
          <Yourcard sender="Ankit Biswas" message="Hello" time="10:00 AM" /> */}
          <table className="table table-success caption-top bg-white rounded mt-2">
            <thead>
              <tr>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                </td>
                <td>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="btn btn-primary d-flex justify-content-center"
                  >
                    Submit
                    <i className="bi bi-send fs-6"></i>
                  </button>
                </td>
              </tr>
            </thead>
          </table>
        </div>
      );
      
        };
export default Chat;
