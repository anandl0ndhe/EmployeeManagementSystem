import React, { useEffect, useState } from 'react'
import './UpdateUser.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateUser = () => {
    const {id}=useParams();
    const navigate = useNavigate()

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
    useEffect(()=>{
        const fetchEmployee=async ()=>{
            try{
                const response = await fetch(`http://localhost:8080/api/employee/${id}`);
                const data = await response.json();
                setFormData(data);
            }catch(error){
                console.log(error.message);
            }
        }
        fetchEmployee();
    },[id])

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const response = await fetch(`http://localhost:8080/api/employee/${id}`,{
                method:'PATCH',
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(formdata),
            })
            const data = await response.json();
            console.log("User Updated ",data);
            navigate("/")
        }catch(error){
            console.error("Error Updating User ",error.message);
        }
    }

  return (
    <>
    <div className='center-form'>
        <h1>EDIT EMPLOYEE</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicName"></Form.Group>
            <Form.Control  type="text" name="name" placeholder="Enter Name" value={formdata.name} onChange={handleInputChange} />

            <Form.Group controlId="formBasicName"></Form.Group>
            <Form.Control  type="email" name="email" placeholder="Enter email" value={formdata.email} onChange={handleInputChange} />

            <Form.Group controlId="formBasicName"></Form.Group>
            <Form.Control  type="text" name="phone" placeholder="Enter Phone" value={formdata.phone} onChange={handleInputChange} />

            <Form.Group controlId="formBasicName"></Form.Group>
            <Form.Control  type="text" name="department" placeholder="Enter department" value={formdata.department} onChange={handleInputChange} />

            <Button variant="primary" type="submit" className='w-100'>EDIT EMPLOYEE</Button>
        </Form>

    </div>
    </>
  )
}

export default UpdateUser