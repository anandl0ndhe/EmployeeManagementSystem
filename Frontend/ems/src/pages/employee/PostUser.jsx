import React, { useState } from 'react'
import './PostUser.css';
import  Form  from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const PostUser = () => {

const [formdata,setFormData]=useState({
    name:"",
    email:"",
    phone:"",
    department:""
})

const handleInputChange=(e)=>{
    const{name,value}=e.target;
    setFormData({
        ...formdata,
        [name]:value,
    })

}
const navigate=useNavigate()


const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log(formdata);

    try{
       const response = await fetch("http://localhost:8080/api/employee", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(formdata)
});
const data = await response.json();
console.log("Employee Created ",data);
navigate("/")
    }catch(error){
        console.log("error")
    }
}
  return (
    <>
    <div className='center-form'>
        <h1>ADD NEW EMPLOYEE</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicName"></Form.Group>
            <Form.Control  type="text" name="name" placeholder="Enter Name" value={formdata.name} onChange={handleInputChange} />

            <Form.Group controlId="formBasicName"></Form.Group>
            <Form.Control  type="email" name="email" placeholder="Enter email" value={formdata.email} onChange={handleInputChange} />

            <Form.Group controlId="formBasicName"></Form.Group>
            <Form.Control  type="text" name="phone" placeholder="Enter Phone" value={formdata.phone} onChange={handleInputChange} />

            <Form.Group controlId="formBasicName"></Form.Group>
            <Form.Control  type="text" name="department" placeholder="Enter department" value={formdata.department} onChange={handleInputChange} />

            <Button variant="primary" type="submit" className='w-100'>POST EMPLOYEE</Button>
        </Form>

    </div>
    </>
  )
}

export default PostUser