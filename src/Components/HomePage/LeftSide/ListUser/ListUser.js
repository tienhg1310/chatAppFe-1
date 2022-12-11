import React, { useEffect, useState } from 'react'


export default function ListUser() {
    const [users , setUsers] = useState([])

    useEffect(() =>{
        fetch('http://localhost:8081/user/all', )
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
