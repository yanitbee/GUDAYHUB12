import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./profile.css";

export default function EmployerProfile({ prop }) {
  const [inputValue, setInputValue] = useState({
    fullname: '',
    email: '',
    phonenumber: '',
    gender: '',
    title: ''
  });
  const inputRef = useRef(null);
  const [employerData, setEmployerData] = useState({});
  const [popup, setPopup] = useState(false);

  const handleImage = () => {
    inputRef.current.click();
  };

  const uploadImg = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await editPic(file);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/employerapply/${prop}`);
        setEmployerData(response.data);
        setInputValue({
          fullname: response.data.fullname || '',
          email: response.data.email || '',
          phonenumber: response.data.phonenumber || '',
          gender: response.data.gender || '',
          title: response.data.title || ''
        });
      } catch (error) {
        console.error("Employer error", error);
      }
    };
    fetchData();
  }, [prop]);

  const editPic = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      await axios.put(`http://localhost:5000/employerpicedit/${prop}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } catch (error) {
      console.error("Error uploading picture", error);
    }
  };

  const editData = async () => {
    const formData = new FormData();
    formData.append('fullname', inputValue.fullname);
    formData.append('email', inputValue.email);
    formData.append('phonenumber', inputValue.phonenumber);
    formData.append('gender', inputValue.gender);
    formData.append('title', inputValue.title);
    try {
      await axios.put(`http://localhost:5000/employeredit/${prop}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  const togglePopup = () => {
    setPopup(!popup);
  };

  if (popup) {
    document.body.classList.add('active-popup');
  } else {
    document.body.classList.remove('active-popup');
  }

  return (
    <>
      <div className="holder end-0">
        <img
          onClick={togglePopup}
          className="profilepic"
          src={
            !employerData.profilepic
              ? `${process.env.PUBLIC_URL}/image/profile.jpg`
              : `${process.env.PUBLIC_URL}/${employerData.profilepic}`
          }
          alt="Profile"
        />
      </div>
      <div className="wrapper">
        {popup && (
          <div className="profilebox">
            <div className="profile-content">
              <div className="pholder" onClick={handleImage}>
                <img
                  className="ppic"
                  src={
                    !employerData.profilepic
                      ? `${process.env.PUBLIC_URL}/image/profile.jpg`
                      : `${process.env.PUBLIC_URL}/${employerData.profilepic}`
                  }
                  alt="Profile"
                />
                <input onChange={uploadImg} type="file" ref={inputRef} style={{ display: "none" }} />
              </div>
              <br />
              <input
                type="text"
                placeholder="Full Name"
                value={inputValue.fullname}
                onChange={(e) => setInputValue({ ...inputValue, fullname: e.target.value })}
              />
              <br />
              <input
                type="email"
                placeholder="Email"
                value={inputValue.email}
                onChange={(e) => setInputValue({ ...inputValue, email: e.target.value })}
              />
              <br />
              <input
                type="text"
                placeholder="Phone Number"
                value={inputValue.phonenumber}
                onChange={(e) => setInputValue({ ...inputValue, phonenumber: e.target.value })}
              />
              <br />
              <input
                className="radio"
                type="radio"
                name="gender"
                value="male"
                checked={inputValue.gender === 'male'}
                onChange={(e) => setInputValue({ ...inputValue, gender: e.target.value })}
              />
              Male
              <input
                className="radio"
                type="radio"
                name="gender"
                value="female"
                checked={inputValue.gender === 'female'}
                onChange={(e) => setInputValue({ ...inputValue, gender: e.target.value })}
              />
              Female
              <br /> <br />
              <input
                type="text"
                placeholder="Title"
                value={inputValue.title}
                onChange={(e) => setInputValue({ ...inputValue, title: e.target.value })}
              />
              <br /> <br />
              <button className="popup-btn" onClick={editData}>Submit</button>
              <button className="popup-btn" id="x" onClick={togglePopup}>X</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
