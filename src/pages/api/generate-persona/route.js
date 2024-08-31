import { GroqClient } from 'groq';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { companyData } = req.body;

  if (!companyData) {
    return res.status(400).json({ error: 'Company data is required' });
  }

  try {
    const formattedData = JSON.stringify(companyData, null, 2);
    const persona = await generateCompanyPersona(formattedData);
    res.status(200).json({ persona });
  } catch (error) {
    console.error('Error generating company persona:', error);
    res.status(500).json({ error: 'Failed to generate company persona' });
  }
}

async function generateCompanyPersona(formattedData) {
  const groqClient = new GroqClient(process.env.GROQ_API_KEY);

  const prompt = `
    Based on the following company information, create a detailed persona for this company. Construct rich, informative profiles with a comprehensive overview of the Target Company or individual. Enhance profiles with additional insights and contextual information to provide a well-rounded view. Include aspects such as company culture, values, market position, and potential challenges or opportunities:
    ${formattedData}
  
    Company Persona:
  `;

  try {
    const response = await groqClient.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "mixtral-8x7b-32768",
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error generating company persona:', error);
    throw error;
  }
}