import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const Login = (props) => {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = (event) => { //may need to be 'let'
        event.preventDefault();
        fetch('http://localhost:3001/user/login',{ //THIS WAS 3000! edited 8:36PM 10/25
            method: 'POST',
            body: JSON.stringify({user:{username: username, password: password}}),
            headers: new Headers({
                'Content-Type': 'application/json' //this may need to be "" instead of ''
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            props.updateToken(data.sessionToken);
        })
    }

    return(
        <div>
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor='username'>Username</Label>
                    <Input onChange={(e) => setUsername(e.target.value)} name='username' value={username} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor='password'>Password</Label>
                    <Input type='password' onChange={(e) => setPassword(e.target.value)} name='password' value={password} />
                </FormGroup>
                <Button type='submit'>Login</Button>
            </Form>
        </div>
    )
}

export default Login;