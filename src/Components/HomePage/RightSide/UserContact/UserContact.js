/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import { useRecoilValue } from 'recoil';
import { userLogin } from '../../../../recoil/socket.atom';

export default function UserContact() {
    const userLoged = useRecoilValue(userLogin);
    return (
        <div>
            <div className="user-contact">
                <div className="back">
                    <i className="fa fa-arrow-left"></i>
                </div>
                <div className="user-contain">
                    <div className="user-img">
                        <img src="../img/user-male.jpg" alt="Image of user" />
                        <div className="user-img-dot online"></div>
                    </div>
                    <div className="user-info">
                        <span className="user-name">{userLoged.username}</span>
                    </div>
                </div>
               
                <div className="setting">
                    <i className="fa fa-cog"></i>
                </div>
            </div>  
        </div>
    )
}
