import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { entries: [] };
    }

    componentWillMount() {
        fetch('/api/entries')
            .then((res) => {
                return res.json();
            })
            .then((entries) => {
                this.setState({ entries });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    formatDate(date) {
        date = new Date(date);
        date = date.getUTCFullYear() + '-' +
            ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
            ('00' + date.getUTCDate()).slice(-2);
        return date;
    }

    render() {
        const entries = this.state.entries.map((entry) => 
            <article className="entry" key={entry.id}>
                <h3 className="entry-date"><Link to={"/entry/" + entry.id}>{this.formatDate(entry.datetime)}</Link></h3>
                <p className="entry-counter">Post #{entry.id}</p>
                <div className="entry-content">
                    {entry.content}
                </div>
            </article>
        );

        return (
            <React.Fragment>
                <h2 className="home-title">All entries</h2>
                {/* Add sorting later */}
                {entries}
            </React.Fragment>
        );
    }
}

export default Home;