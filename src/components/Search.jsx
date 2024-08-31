"use client";
import React, { useState } from "react";
import axios from "axios";

const Search = () => {
  const [companyName, setCompanyName] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults(null);
    setSelectedCompany(null);

    const options = {
      method: "GET",
      url: "https://linkedin-data-scraper.p.rapidapi.com/suggestion_company",
      params: { query: companyName },
      headers: {
        "x-rapidapi-key": "9b5002932dmsh059c867ada41c65p14a53bjsnef4c60050ee0",
        "x-rapidapi-host": "linkedin-data-scraper.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setResults(response.data);
    } catch (error) {
      setError("An error occurred while fetching data.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompanyClick = async (urn) => {
    setLoading(true);
    setError(null);
    setSelectedCompany(null);

    const options = {
      method: "POST",
      url: "https://linkedin-data-scraper.p.rapidapi.com/company",
      headers: {
        "x-rapidapi-key": "9b5002932dmsh059c867ada41c65p14a53bjsnef4c60050ee0",
        "x-rapidapi-host": "linkedin-data-scraper.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: {
        link: `http://www.linkedin.com/company/${urn}`,
      },
    };

    try {
      const response = await axios.request(options);
      setSelectedCompany(response.data.data);
    } catch (error) {
      setError("An error occurred while fetching company details.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center">
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Enter company name"
          className="border p-2 mr-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex">
        <div className="w-1/2 pr-4">
          {results && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Results:</h2>
              {results.success && results.suggestions.length > 0 ? (
                <ul>
                  {results.suggestions.map((company, index) => (
                    <li
                      key={index}
                      className="mb-4 border p-4 rounded cursor-pointer transition duration-300 ease-in-out transform hover:scale-102 hover:shadow-md"
                      onClick={() => handleCompanyClick(company.urn)}
                    >
                      <h3 className="font-bold">{company.title}</h3>
                      <p>{company.subtitle}</p>
                      {company.image && (
                        <img
                          src={company.image}
                          alt={company.title}
                          className="w-16 h-16 mt-2 rounded-full"
                        />
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
          {selectedCompany && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Company Details:</h2>
              <div className="border p-4 rounded shadow-md">
                <h3 className="font-bold text-lg">
                  {selectedCompany.company_name}
                </h3>
                <p>
                  <strong>Website:</strong> {selectedCompany.website || "N/A"}
                </p>
                <p>
                  <strong>Industry:</strong>{" "}
                  {selectedCompany.industries || "N/A"}
                </p>
                <p>
                  <strong>Company Size:</strong>{" "}
                  {selectedCompany.employees_on_li || "N/A"}
                </p>
                <p>
                  <strong>Headquarters:</strong>{" "}
                  {selectedCompany.headquarters?.fullAddress || "N/A"}
                </p>
                <p>
                  <strong>Founded:</strong>{" "}
                  {selectedCompany.founded_in || "N/A"}
                </p>
                <p>
                  <strong>Specialties:</strong>{" "}
                  {selectedCompany.specialties
                    ? selectedCompany.specialties.join(", ")
                    : "N/A"}
                </p>
                <p>
                  <strong>Followers:</strong>{" "}
                  {selectedCompany.followers || "N/A"}
                </p>
                <h4 className="font-semibold mt-2">About:</h4>
                <p>
                  {selectedCompany.description || "No description available."}
                </p>
                {selectedCompany.logo && (
                  <img
                    src={selectedCompany.logo}
                    alt={`${selectedCompany.company_name} logo`}
                    className="w-24 h-24 mt-4 rounded-full"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
