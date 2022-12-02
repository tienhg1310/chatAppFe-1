import React, { useEffect, useState } from 'react'


export default function ListUser() {
    const [users , setUsers] = useState([])
    // const fetchUsers = () => {
    //     // Where we're fetching data from
    //     return fetch("http://localhost:8082/user/all")
    //         // We get the API response and receive data in JSON format
    //         .then((response) => response.json())
    //         .then((data) => console.log(data))
    //         .catch((error) => console.error(error));
    // }

    // async function fetchData() {
    //     try {
    //       const result = await axios.get("http://localhost:8082/user/all")
    //       console.log(result.data);
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   }
    useEffect(() =>{
        fetch('http://localhost:8080/user/all')
        .then((response) => response.json())
        .then((result) => {
            setUsers(result);
            console.log(result)
        })
    },[])
    
    return (
        <div>
            <div className="list-user">
                <ul>
                    {users.map(user => (
                    <li key={user.id}>
                        <div className="user-contain">
                            <div className="user-img">
                                <img src="../img/user-male.jpg" alt="Image of user" />
                                <div className="user-img-dot"></div>
                            </div>
                            <div className="user-info">
                                <span className="user-name">{user.name}</span>
                                <span className="user-last-message">Hello!</span>
                            </div>
                        </div>
                    </li>
                    ))}
                    {/* <li>
                        <div className="user-contain">
                            <div className="user-img">
                                <img src="../img/user-male.jpg" alt="Image of user" />
                                <div className="user-img-dot"></div>
                            </div>
                            <div className="user-info">
                                <span className="user-name">Tên Người chat</span>
                                <span className="user-last-message">Hello!</span>
                            </div>
                        </div>
                    </li> */}

                </ul>
            </div>
        </div>
    )
}
