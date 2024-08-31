"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Globe, Phone, Users, MapPin, Building, Briefcase, Star, TrendingUp } from 'lucide-react';

const MSBCGroupProfile = () => {
  const companyData = {
    "company_name": "MSBC Group",
    "tagline": "The Home of Accessible AI | IT Staffing | Custom Software Development",
    "logo_url": "https://media.licdn.com/dms/image/v2/C4D0BAQGLDFjJTsNoRA/company-logo_200_200/company-logo_200_200/0/1672808195532/msbcgroup_logo?e=1733356800&v=beta&t=AIvQU2p6zFQwcAJggrnHWZi5w4EqT6Qgbj4uvvWW7iY",  // Add the actual logo URL here
    "banner_url": "https://media.licdn.com/dms/image/v2/C561BAQEW8zrlGW984w/company-background_10000/company-background_10000/0/1635154324677/msbcgroup_cover?e=1725706800&v=beta&t=2aDoihOGDWrZHraYJQwxsRQOlz9xU_aoJPxwvE4tLGU", // Add the actual banner URL here
    "founded": "Approximately 2004 (based on 20+ years of experience mentioned)",
    "headquarters": {
      "city": "Ahmedabad",
      "state": "Gujarat",
      "country": "India",
      "full_address": "A 401,Baleshwar Square, S.G.Highway, Ahmedabad, Gujarat 380015, IN"
    },
    "contact": {
      "phone": "+1 415-358-1632",
      "website": "https://www.msbcgroup.com"
    },
    "size": {
      "employees": 162,
      "range": "51-200"
    },
    "social_presence": {
      "followers": 10799
    },
    "industry": "IT Services and IT Consulting",
    "specialties": [
      "Custom Enterprise Systems",
      "IT Consultation",
      "Bespoke Hybrid Systems",
      "Migrating Existing Legacy Systems",
      "Tracking Solutions",
      "On-Demand Professionals",
      "Back-Office Solutions",
      "Order Processing Services",
      "Manufacturing Process Solutions",
      "Construction Process Solutions",
      "Fine Art Logistics Solutions"
    ],
    "core_services": [
      "Custom software design, development, and management",
      "Technical resource augmentation for advanced product and technology roadmaps",
      "On and offshore business process operation and improvement"
    ],
    "key_offerings": {
      "accessible_ai": {
        "description": "Specializes in making AI accessible and cost-effective for businesses",
        "consultation_link": "https://msbcgroup.com/accessible-ai-agents/"
      },
      "custom_software": {
        "description": "Builds technology for competitive companies, focusing on solving complex problems"
      },
      "technical_resources": {
        "description": "Provides skilled professionals to support advanced product and technology initiatives"
      },
      "business_process_management": {
        "description": "Operates and improves on and offshore business processes"
      }
    },
    "client_focus": [
      "Glass and glazing industry",
      "Window and door manufacturing",
      "Fabricators and construction contractors",
      "FinTech (banks, brokers, hedge funds, asset managers, private equity)",
      "Global logistics brands"
    ],
    "unique_selling_points": [
      "20+ years of industry experience",
      "Expertise in accessible AI implementation",
      "Long-term client relationships (average 10+ years)",
      "Competitive pricing for high-skill services",
      "Tailored solutions using optimal technology",
      "Discrete and efficient service delivery"
    ],
    "company_culture": {
      "vision": "Uniting people and technology through process",
      "mission": "To make client companies more profitable",
      "values": [
        "Trusted partnerships",
        "Long-term relationships",
        "Client-centric approach",
        "Innovation and adaptability"
      ]
    },
    "growth_trajectory": {
      "milestones": [
        {
          "year": "2004 (approx.)",
          "event": "Company founded, focusing on glass, glazing, and construction industries"
        },
        {
          "year": "2009",
          "event": "Expanded into FinTech sector"
        },
        {
          "year": "2016",
          "event": "Entered global logistics market"
        }
      ]
    },
    "team_structure": "150+ technology leaders and engineering experts, each dedicated to a single client",
    "market_positioning": "Positioned as a versatile IT services provider, specializing in accessible AI and custom solutions for various industries, with a focus on long-term partnerships and proven ROI"
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      {/* Banner */}
      <div className="w-full h-48 mb-8 relative overflow-hidden rounded-lg">
        <img 
          src={companyData.banner_url || "/api/placeholder/1200/300"} 
          alt="MSBC Group Banner" 
          className="w-full h-full object-cover"
        />
      </div>

      <Card className="mb-8">
        <CardHeader className="flex flex-col sm:flex-row items-center sm:items-start">
          {/* Logo */}
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4 sm:mb-0 sm:mr-6">
            <img 
              src={companyData.logo_url || "/api/placeholder/96/96"} 
              alt="MSBC Group Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold text-blue-600 text-center sm:text-left">{companyData.company_name}</CardTitle>
            <p className="text-gray-600 italic text-center sm:text-left">{companyData.tagline}</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <Building className="mr-2" />
              <span>Founded: {companyData.founded}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2" />
              <span>{companyData.headquarters.full_address}</span>
            </div>
            <div className="flex items-center">
              <Phone className="mr-2" />
              <span>{companyData.contact.phone}</span>
            </div>
            <div className="flex items-center">
              <Globe className="mr-2" />
              <a href={companyData.contact.website} className="text-blue-500 hover:underline">
                {companyData.contact.website}
              </a>
            </div>
            <div className="flex items-center">
              <Users className="mr-2" />
              <span>{companyData.size.employees} employees ({companyData.size.range})</span>
            </div>
            <div className="flex items-center">
              <Briefcase className="mr-2" />
              <span>{companyData.industry}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="culture">Culture</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Company Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">Specialties</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {companyData.specialties.map((specialty, index) => (
                  <Badge key={index} variant="secondary">{specialty}</Badge>
                ))}
              </div>
              <h3 className="text-lg font-semibold mb-2">Unique Selling Points</h3>
              <ul className="list-disc pl-5 space-y-1">
                {companyData.unique_selling_points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>Services & Offerings</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">Core Services</h3>
              <ul className="list-disc pl-5 space-y-1 mb-4">
                {companyData.core_services.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
              <h3 className="text-lg font-semibold mb-2">Key Offerings</h3>
              {Object.entries(companyData.key_offerings).map(([key, value], index) => (
                <div key={index} className="mb-3">
                  <h4 className="font-semibold capitalize">{key.replace('_', ' ')}</h4>
                  <p>{value.description}</p>
                  {value.consultation_link && (
                    <a href={value.consultation_link} className="text-blue-500 hover:underline">
                      Learn more
                    </a>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clients">
          <Card>
            <CardHeader>
              <CardTitle>Client Focus</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1">
                {companyData.client_focus.map((client, index) => (
                  <li key={index}>{client}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="culture">
          <Card>
            <CardHeader>
              <CardTitle>Company Culture</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Vision</h3>
                  <p>{companyData.company_culture.vision}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Mission</h3>
                  <p>{companyData.company_culture.mission}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Values</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {companyData.company_culture.values.map((value, index) => (
                      <li key={index}>{value}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2" />
            Growth Trajectory
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px]">
            {companyData.growth_trajectory.milestones.map((milestone, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold">{milestone.year}</h3>
                <p>{milestone.event}</p>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default MSBCGroupProfile;