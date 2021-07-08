import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Fib = () => {

    const [seenIndexes, setSeenIndexes] = useState([]);
    const [values, setValues] = useState({});
    const [index, setIndex] = useState('');

    const fetchValues = async () => {
        const { data } = await axios.get('/api/values/current');
        setValues(data);
    }

    const fetchIndexes = async () => {
        const { data } = await axios.get('/api/values/current');
        setSeenIndexes(data);
    }

    useEffect(() => {
        fetchValues();
        fetchIndexes();
    }, [])

    const onSubmitHandler = async (evt) => {
        evt.preventDefault();

        await axios.post('/api/values', { index });

        setIndex('');
    }

    const renderIndexes = () => {
        if(!seenIndexes.length) {return;}

        return seenIndexes.map(_index => _index).join(', ')
    }

    const renderValues = () => {
        const entries = [];

        for (let key in values) {
            entries.push(
                <div key={key}>
                    For index {key} we calculated {values[key]}
                </div>
            )
        }
        return entries;
    }

    return (
        <div>
            <form onSubmit={onSubmitHandler}>
                <label>Enter Your Index: </label>
                <input value={index} onChange={(evt) => setIndex(evt.target.value)}/>
                <button>Submit</button>
            </form>

            <h3>Indices We have seen so far</h3>
            {renderIndexes()}
            
            <h3>Fetched Values</h3>
            {renderValues()}

        </div>
    )
}

export default Fib;