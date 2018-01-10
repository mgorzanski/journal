import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class NewEntry extends React.Component {
    render() {
        return(
            <React.Fragment>
                <h2 className="new-entry-title">Add new entry</h2>
                <section className="new-entry-form">
                    <Form>
                        <FormGroup>
                            <Label for="titleInput">Title</Label>
                            <Input type="text" name="title" id="titleInput" placeholder="(optional)" />
                        </FormGroup>
                        
                        <FormGroup>
                            <Label for="contentInput">Content</Label>
                            <Input type="textarea" rows="18" name="content" id="contentInput" />
                        </FormGroup>

                        <Button color="success">Submit</Button>
                    </Form>
                </section>
            </React.Fragment>
        );
    }
}

export default NewEntry;