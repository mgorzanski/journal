import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class NewEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            datetime: '',
            content: '',
            entries: []
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

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit() {
        let datetime = this.getCurrentMysqlDatetime();
        this.setState({ datetime }, () => {
            fetch('/api/add-entry', {
                method: 'POST',
                body: JSON.stringify({
                    title: this.state.title,
                    datetime: this.state.datetime,
                    content: this.state.content
                }),
                headers: {"Content-Type": "application/json"}
                }) 
                .then(function (res) {
                    console.log(res.json());
                })
                .catch(function (err) {
                    console.log(err)
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