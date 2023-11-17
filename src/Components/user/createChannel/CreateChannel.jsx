import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { createChannel } from '../../../redux/api/channelsAPI';

function CreateChannel({ closeModal }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState(""); // Thông báo lỗi

    const dispatch = useDispatch();
     const currentUser = useSelector((state) => state.auth.login?.currentUser);
     const navigate = useNavigate();

     const handleSubmit = async(event) => {
        event.preventDefault();
        const create = {
            name : name,
            description: description
        }
        createChannel(dispatch,create,currentUser.accessToken)
     }
  return (
    <div className="upload-container">
        {errorMessage && <div className="register-error-message">{errorMessage}</div>}

    <form onSubmit={handleSubmit} className='form-uploadVideo'>
      <div className="form-row">
        <label>
          Channel Name:
          <input type="text" onChange={(e) => setName(e.target.value) } />
        </label>
      </div>
      <div>
        <label className="form-row">
          Video Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value) } />
        </label>
      </div>
      <button type="submit">Create Channel</button>
    </form>
  </div>
  )
}

export default CreateChannel