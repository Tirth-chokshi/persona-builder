"use client"
import React, { useState } from 'react';
import { Search, Building2, Link } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const SearchC = () => {
  const [companyName, setCompanyName] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [socialLinks, setSocialLinks] = useState(null);
  
  const router = useRouter();
  const handleRedirect = () => {
    router.push('/persona');
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults(null);
    setSelectedCompany(null);

    // Simulating API call
    setTimeout(() => {
      if (companyName.toLowerCase() === 'msbc group') {
        setResults({
          "success": true,
          "status": 200,
          "suggestions": [
            {
              "urn": "229098",
              "title": "MSBC Group",
              "subtitle": "Company • IT Services and IT Consulting",
              "image": "https://media.licdn.com/dms/image/v2/C4D0BAQGLDFjJTsNoRA/company-logo_200_200/company-logo_200_200/0/1672808195532/msbcgroup_logo?e=1733356800&v=beta&t=AIvQU2p6zFQwcAJggrnHWZi5w4EqT6Qgbj4uvvWW7iY"
            },
            {
              "urn": "98185098",
              "title": "MSBC Group Inc.",
              "subtitle": "Company • Business Consulting and Services",
              "image": "https://media.licdn.com/dms/image/v2/D4E0BAQHEcjHcL0TYiQ/company-logo_200_200/company-logo_200_200/0/1688492342790?e=1733356800&v=beta&t=Xv4ox-jLgJI0pqNU7RVXOYj0C1TswoUFnP0JWpAYZu0"
            },
            {
              "urn": "65302922",
              "title": "Mena Smart Business Open Community (MSBC Group)",
              "subtitle": "Company • IT Services and IT Consulting",
              "image": "https://media.licdn.com/dms/image/v2/C4D0BAQESHZ-5r4yrmw/company-logo_200_200/company-logo_200_200/0/1630529548297/mena_smart_business_open_community_logo?e=1733356800&v=beta&t=ys8_o0KjoiWTQJGKF_1wdVlULOB0hWPpoWe2ZJRCcGI"
            }
          ]
        });
      } else {
        setResults({
          success: true,
          suggestions: [
            { urn: '1', title: 'Company A', subtitle: 'Tech Company', image: '/api/placeholder/50/50' },
            { urn: '2', title: 'Company B', subtitle: 'Finance Company', image: '/api/placeholder/50/50' },
          ]
        });
      }
      setLoading(false);
    }, 1000);
  };

  const handleCompanyClick = async (urn) => {
    setLoading(true);
    setError(null);
    setSelectedCompany(null);

    // Simulating API call
    setTimeout(() => {
      setSelectedCompany({
        name: 'Selected Company',
        description: 'This is a sample company description.',
        employees: '1000-5000',
        industry: 'Technology',
        website: 'https://example.com'
      });
      setLoading(false);
    }, 1000);
  };

  const fetchSocialLinks = async (website) => {
    // Simulating API call
    setTimeout(() => {
      setSocialLinks({
        facebook: 'https://facebook.com/company',
        twitter: 'https://twitter.com/company',
        linkedin: 'https://linkedin.com/company'
      });
    }, 500);
  };

  return (

    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Company Search</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex space-x-2">
            <Input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter company name"
              className="flex-grow"
            />
            <Button type="submit" disabled={loading}>
              {loading ? 'Searching...' : 'Search'}
              <Search className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Search Results</h2>
          {results && results.success && results.suggestions.length > 0 ? (
            <div className="space-y-4">
              {results.suggestions.map((company) => (
                <Card
                  key={company.urn}
                  className="cursor-pointer transition-shadow hover:shadow-md"
                  onClick={() => handleRedirect()}
                >
                  <CardContent className="flex items-center p-4">
                    <img src={company.image} alt={company.title} className="w-12 h-12 rounded-full mr-4" />
                    <div>
                      <h3 className="font-semibold">{company.title}</h3>
                      <p className="text-sm text-gray-600">{company.subtitle}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No results found.</p>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Company Details</h2>
          {selectedCompany ? (
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">{selectedCompany.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{selectedCompany.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Building2 className="mr-2 h-4 w-4" />
                    <span className="text-sm">{selectedCompany.employees} employees</span>
                  </div>
                  <div className="flex items-center">
                    <Link className="mr-2 h-4 w-4" />
                    <a href={selectedCompany.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline">
                      Website
                    </a>
                  </div>
                </div>
                {socialLinks && (
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Social Links</h4>
                    <div className="flex space-x-4">
                      {Object.entries(socialLinks).map(([platform, url]) => (
                        <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                          {platform}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <p className="text-gray-600">Select a company to view details.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchC