import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import ListRegister from '../componet/ListRegister';
import { createUsuarioThunk } from '../store/slices/register.slice';


const Register = () => {
    const { register, handleSubmit } = useForm();

    const dispatch = useDispatch();

    const submit = (data) => {
        dispatch(createUsuarioThunk(data));
    };

    return (
        <div className='header-register'>
            <div className='container-register'>
                <Form onSubmit={handleSubmit(submit)}>
                    <Form.Group className="mb-3" controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control {...register("firstName")} type="text" placeholder='Write your full name' />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control {...register("lastName")} type="text" placeholder='write your full last name' />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control {...register("email")} type="email" placeholder='write your e-mail' />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control {...register("password")} type="password" placeholder='write your password' />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="phone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control {...register("phone")} type="phone" placeholder='write phone' />
                    </Form.Group>
                    <Button variant="success" type="submit">
                        Success
                    </Button>
                </Form>
            </div>
            
        </div>
    );
};

export default Register;