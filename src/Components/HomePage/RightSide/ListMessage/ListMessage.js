import React from 'react'

export default function ListMessage() {
  return (
    <div>
        <div className="list-messages-contain">
                <ul className="list-messages">
                    <li>
                        <div className="message">
                            <div className="message-img">
                                <img src="../img/user-male.jpg" alt="" />
                            </div>
                            <div className="message-text">Hello, How are you?</div>
                        </div>
                    </li>
                    <li>
                        <div className="message right">
                            <div className="message-img">
                                <img src="../img/user-male.jpg" alt="" />
                            </div>
                            <div className="message-text">Hello, How are you?</div>
                        </div>
                    </li>
                    <li>
                        <div className="message right">
                            <div className="message-img">
                                <img src="../img/user-male.jpg" alt="" />
                            </div>
                            <div className="message-text">Hello, How are you?</div>
                        </div>
                    </li>
                    <li>
                        <div className="message">
                            <div className="message-img">
                                <img src="../img/user-male.jpg" alt="" />
                            </div>
                            <div className="message-text">Hello, How are you?</div>
                        </div>
                    </li>
                    <li>
                        <div className="message">
                            <div className="message-img">
                                <img src="../img/user-male.jpg" alt="" />
                            </div>
                            <div className="message-text">
                                <img src="../img/user-male.jpg" alt="" />
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="message">
                            <div className="message-img">
                                <img src="../img/user-male.jpg" alt="" />
                            </div>
                            <div className="message-text">
                                <video width="400" controls>
                                    <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                                </video>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="message">
                            <div className="message-img">
                                <img src="../img/user-male.jpg" alt="" />
                            </div>
                            <div className="message-text">
                                <audio controls>
                                    <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg" />
                                </audio>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
    </div>
  )
}
