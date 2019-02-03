import React from 'react';
import { Form, Button, FormGroup, Label, Input } from 'reactstrap';

class Login extends React.Component {
    componentWillMount() {
        const scriptIe8 = document.createElement("script");
        scriptIe8.src = "//cdnjs.cloudflare.com/ajax/libs/ie8/0.2.5/ie8.js";
        document.body.appendChild(scriptIe8);

        const scriptBase64 = document.createElement("script");
        scriptBase64.src = "https://cdn.auth0.com/js/polyfills/1.0/base64.min.js";
        document.body.appendChild(scriptBase64);

        const scriptES5Shim = document.createElement("script");
        scriptES5Shim.src = "https://cdn.auth0.com/js/polyfills/1.0/es5-shim.min.js";
        document.body.appendChild(scriptES5Shim);

        const scriptAuth0 = document.createElement("script");
        scriptAuth0.src = "https://cdn.auth0.com/js/auth0/8.7/auth0.min.js";
        document.body.appendChild(scriptAuth0);

        const scriptObjectAssign = document.createElement("script");
        scriptObjectAssign.src = "https://cdn.auth0.com/js/polyfills/1.0/object-assign.min.js";
        document.body.appendChild(scriptObjectAssign);

        const scriptAuth = document.createElement("script");
        scriptAuth.src = "/js/auth.js";
        document.body.appendChild(scriptAuth);
    }

    render() {
        return (
            <React.Fragment>
                <header className="header-login">
                    <section className="page-heading">
                        <h2 className="page-title">Journal</h2>
                    </section>
                </header>

                <main className="main-login">
                    <Form onSubmit="return false;" method="post">
                        <h1 className="login-title">Login</h1>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" id="email" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="password" />
                        </FormGroup>
                        <Button id="btn-login">Login</Button>
                    </Form>
                </main>
            </React.Fragment>
        );
    }
}

export default Login;