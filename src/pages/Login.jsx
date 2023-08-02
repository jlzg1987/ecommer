import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const{register, handleSubmit}=useForm()

    const navigate=useNavigate()
    const submit = (data) => {
        
        axios
        .post('https://e-commerce-api-v2.academlo.tech/api/v1/users/login',data)
        .then(res =>{
            localStorage.setItem("token",res.data.token )
            navigate("/purchases")
        } )
        .catch(error=>{
            if(error.response.status===401){
                alert("email/password incorrecto")
            }
            console.log(error)})
      };
      const usercreate =()=>{
        navigate("/register")
      }
    return (
        <div className='user-login'>
            <Form  onSubmit={handleSubmit(submit)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>User</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" 
                    {...register("email")}
                    />
                    <Form.Text className="text-muted">
                        We'll never share your user with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" 
                    {...register("password")}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <br />
                <br />
                <div className='register' >
                 Register User <i onClick={usercreate} className="fa-solid fa-address-card"></i>   
                </div>
                
            </Form>
          
        </div>
    );
};

export default Login;