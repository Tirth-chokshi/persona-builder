"use client"
import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
    const [personName, setPersonName] = useState('');
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedPerson, setSelectedPerson] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResults(null);
        setSelectedPerson(null);

        const options = {
            method: 'GET',
            url: 'https://linkedin-data-scraper.p.rapidapi.com/suggestion_person',
            params: { query: personName },
            headers: {
                'x-rapidapi-key': 'e837f0cf28msh432abc25caf563bp1087fdjsn67483c4c9103',
                'x-rapidapi-host': 'linkedin-data-scraper.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            setResults(response.data);
        } catch (error) {
            setError('An error occurred while fetching data.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handlePersonClick = async (urn) => {
        setLoading(true);
        setError(null);
        setSelectedPerson(null);

        const options = {
            method: 'POST',
            url: 'https://linkedin-data-scraper.p.rapidapi.com/person_urn',
            headers: {
                'x-rapidapi-key': 'e837f0cf28msh432abc25caf563bp1087fdjsn67483c4c9103',
                'x-rapidapi-host': 'linkedin-data-scraper.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            data: {
                link: `http://www.linkedin.com/in/${urn}`
            }
        };

        try {
            const response = await axios.request(options);
            console.log('Person details:', response.data);
            setSelectedPerson(response.data.data);
        } catch (error) {
            setError('An error occurred while fetching person details.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    const renderRawData = (data) => {
        return (
            <pre className="whitespace-pre-wrap break-words">
                {JSON.stringify(data, null, 2)}
            </pre>
        );
    };

    return (
        <div className="container mx-auto p-4 flex flex-col items-center justify-center">
            <form onSubmit={handleSearch} className="mb-4">
                <input
                    type="text"
                    value={personName}
                    onChange={(e) => setPersonName(e.target.value)}
                    placeholder="Enter person name"
                    className="border p-2 mr-2 rounded"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300">
                    Search
                </button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="flex w-full">
                <div className="w-1/2 pr-4">
                    {results && (
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Results:</h2>
                            {results.success && results.suggestions && results.suggestions.length > 0 ? (
                                <ul>
                                    {results.suggestions.map((person, index) => (
                                        <li
                                            key={index}
                                            className="mb-4 border p-4 rounded cursor-pointer transition duration-300 ease-in-out transform hover:scale-102 hover:shadow-md"
                                            onClick={() => handlePersonClick(person.urn)}
                                        >
                                            <h3 className="font-bold">{person.title}</h3>
                                            <p>{person.subtitle}</p>
                                            {person.image && (
                                                <img src={person.image} alt={person.title} className="w-16 h-16 mt-2 rounded-full" />
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No results found.</p>
                            )}
                        </div>
                    )}
                </div>

                <div className="w-1/2 pl-4">
                    {selectedPerson && (
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Person Details (Raw Data):</h2>
                            <div className="border p-4 rounded shadow-md bg-100">
                                {renderRawData(selectedPerson)}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Search;
