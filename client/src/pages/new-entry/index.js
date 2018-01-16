import React from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { getAccessToken } from './../../utils/AuthService';
import Joi from 'joi';
import history from './../../utils/history';

class NewEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            datetime: '',
            content: '',
            entries: [],
            contentError: null
        };

        this.handleChange = this.handleChange.bind(this);
    }

    getCurrentMysqlDatetime() {
        var date;
        date = new Date();
        date = date.getUTCFullYear() + '-' +
            ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
            ('00' + date.getUTCDate()).slice(-2) + ' ' + 
            ('00' + date.getUTCHours()).slice(-2) + ':' + 
            ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
            ('00' + date.getUTCSeconds()).slice(-2);
        return date;
    }

    componentDidMount() {
        if (sessionStorage.getItem("newEntryContent") !== null) {
            this.setState({ content: sessionStorage.getItem("newEntryContent") });
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () => {
            sessionStorage.setItem("newEntryContent", this.state.content);
        });
    }

    handleSubmit() {
        let datetime = this.getCurrentMysqlDatetime();
        this.setState({ datetime }, () => {
            const schema = Joi.object().keys({
                datetime: Joi.string().required(),
                content: Joi.string().required().error(new Error("Content cannot be empty"))
            }).with('datetime', 'content');

            Joi.validate({ datetime: this.state.datetime, content: this.state.content }, schema, (err, value) => {
                if (err !== null) {
                    //console.log(err);
                    this.setState({ contentError: err.message});
                } else {
                    fetch('/api/add-entry', {
                        method: 'POST',
                        body: JSON.stringify({
                            title: this.state.title,
                            datetime: this.state.datetime,
                            content: this.state.content
                        }),
                        headers: {"Content-Type": "application/json", Authorization: `Bearer ${getAccessToken()}`}
                    }) 
                    .then(function (res) {
                        //console.log(res.json());
                        sessionStorage.removeItem("newEntryContent");
                        history.push('/');
                    })
                    .catch(function (err) {
                        console.log(err)
                    });
                }
            });
        });
    }

    render() {
        return(
            <React.Fragment>
                <h2 className="new-entry-title">Add new entry</h2>
                <section className="new-entry-form">
                    <Form>
                        <FormGroup>
                            <Label for="titleInput">Title</Label>
                            <Input type="text" value={this.state.title} name="title" id="titleInput" placeholder="(optional)" onChange={this.handleChange} />
                        </FormGroup>
                        
                        <FormGroup>
                            {this.state.contentError !== null ?
                            <Alert color="danger">{this.state.contentError}</Alert>
                            : ''}
                            <Label for="contentInput">Content</Label>
                            <Input type="textarea" value={this.state.content} rows="18" name="content" id="contentInput" onChange={this.handleChange} />
                        </FormGroup>

                        <Button color="success" onClick={this.handleSubmit.bind(this)}>Submit</Button>
                    </Form>
                </section>
            </React.Fragment>
        );
    }
}

export default NewEntry;