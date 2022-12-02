import React from 'react'

export default function FormSendMessage() {
    return (
        <div>
            <form className='form-send-message'>
                <ul className="list-file">
                </ul>
                <input type="text" className="txt-input" placeholder="Type message..." />
                <label className="btn btn-image" htmlFor="attach"><i className="fa fa-file"></i></label>
                <input type="file" multiple id="attach" />
                <label className="btn btn-image" htmlFor="image"><i className="fa fa-file-image-o"></i></label>
                <input type="file" accept="image/*" multiple id="image" />
                <button type="submit" className="btn btn-send"><i className="fa fa-paper-plane"></i></button>
            </form>
        </div>
    )
}
