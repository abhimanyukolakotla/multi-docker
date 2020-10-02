import React from 'react';
import axios from 'axios';

export default class Fib extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seenIndexes: [],
            values: {},
            index: ''
        };
    }

    componentDidMount() {
       this.fetchData();
    }

    fetchData() {
        this.fetchIndexes();
        this.fetchValues();
    }

    async fetchValues() {
        const values = await axios.get('/api/values/current');
        this.setState({values: values.data});
    }

    async fetchIndexes() {
        const values = await axios.get('/api/values/all');
        this.setState({
            seenIndexes: values.data
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        if(this.state.index === '') {
            return;
        }
        axios.post('/api/values', {
            index: this.state.index
        });
        this.setState({index: ''});
        this.fetchData();
    }

    renderSeenIndexes() {
        return this.state.seenIndexes.map(({index}) => index).join(', ');
    }

    renderCalculatedValues() {
        const entries = [];
        for(let key in this.state.values) {
            entries.push(
                <div key={key}>
                    For index {key}, I calculated {this.state.values[key]}
                </div>
            )
        }
        return entries;
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter your index</label>
                    <input value={this.state.index} 
                           onChange={event => this.setState({index: event.target.value})}/>
                    <button>Submit</button>
                </form>
                <h3>Indexes I have seen:</h3>
                {this.renderSeenIndexes()}
                <h3>Calculated values:</h3>
                {this.renderCalculatedValues()}
            </div>
        );
    }
}