import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/spinner';

const CompanyPersona = ({ companyData }) => {
  const [persona, setPersona] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPersona = async () => {
      if (!companyData) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/generate-persona', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ companyData }),
        });

        if (!response.ok) {
          throw new Error('Failed to generate persona');
        }

        const data = await response.json();
        setPersona(data.persona);
      } catch (err) {
        setError('Error generating company persona');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPersona();
  }, [companyData]);

  if (!companyData) {
    return null;
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Company Persona</CardTitle>
      </CardHeader>
      <CardContent>
        {loading && (
          <div className="flex justify-center items-center">
            <Spinner size="lg" />
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
        {persona && (
          <div className="prose max-w-none">
            <p>{persona}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CompanyPersona;