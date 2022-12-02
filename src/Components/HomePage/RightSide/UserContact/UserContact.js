import React from 'react'

export default function UserContact() {
    return (
        <div>
            <div className="user-contact">
                <div className="back">
                    <i className="fa fa-arrow-left"></i>
                </div>
                <div className="user-contain">
                    <div className="user-img">
                        <img src="../img/user-male.jpg" alt="Image of user" />
                        <div className="user-img-dot"></div>
                    </div>
                    <div className="user-info">
                        <span className="user-name">Tên bản thân</span>
                    </div>
                </div>
               
                <div className="setting">
                    <i className="fa fa-cog"></i>
                </div>
            </div>  
        </div>
    )
}
