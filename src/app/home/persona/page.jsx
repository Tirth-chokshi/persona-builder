"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { redirect } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";
import styles from "./persona.module.css";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

export default async function Persona() {
  const { data: session, status } = useSession();
  const [isVisible, setIsVisible] = useState(false);

  if (session) {
    // /////////////////////////

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
      setIsVisible(true);
      const options = {
        method: "GET",
        url: "https://linkedin-data-scraper.p.rapidapi.com/suggestion_company",
        params: { query: companyName },
        headers: {
          "x-rapidapi-key":
            "",
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

    const handleCompanyClick = (urn) => {
      setLoading(true);
      setError(null);
      setSelectedCompany(null);
      setIsVisible(false);

      const options = {
        method: "POST",
        url: "https://linkedin-data-scraper.p.rapidapi.com/company",
        headers: {
          "x-rapidapi-key":
            "",
          "x-rapidapi-host": "linkedin-data-scraper.p.rapidapi.com",
          "Content-Type": "application/json",
        },
        data: {
          link: `http://www.linkedin.com/company/${urn}`,
        },
      };

      try {
        const response =  axios.request(options);
        setSelectedCompany(response.data.data);
      } catch (error) {
        setError("An error occurred while fetching company details.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    // /////////////////////////////

    return (
      <div className="flex flex-col w-full h-full items-center justify-start">
        <>
          <Sheet>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value="Pedro Duarte"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    value="@peduarte"
                    className="col-span-3"
                  />
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Save changes</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
            {/* ///////////////////////////////////// */}
            <div className="flex flex-col w-full h-auto items-center justify-start">
              <h1 className="max-w-[900px] w-full text-3xl font-semibold m-[30px]">
                Create Persona
              </h1>

              {/* <form onSubmit={handleSearch} className="mb-4">
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
              </form> */}

              <form
                onSubmit={handleSearch}
                className="flex w-full h-auto items-center justify-center"
              >
                <Input
                  className="max-w-[600px] w-[90%] h-[40px]"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Search company or individual..."
                />
                <Button
                  className="ml-[10px] h-[40px] w-[100px]"
                  variant="outline"
                  type="submit"
                >
                  Search
                </Button>
                <SheetTrigger asChild>
                  <Button
                    className="ml-[10px] h-[40px] w-[100px]"
                    variant="secondary"
                    type="button"
                  >
                    Filter
                  </Button>
                </SheetTrigger>
              </form>
              {loading && <p>Loading...</p>}
              {error && <p className="text-red-500">{error}</p>}
              {/* <div className={styles.builder_cards_containder}>
                {results && (
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Results:</h2>
                    {results.success && results.suggestions.length > 0 ? (
                      <ul>
                        {results.suggestions.map((company, index) => (
                          <li>
                            <Card
                              className={styles.builder_cards}
                              key={index}
                              onClick={() => handleCompanyClick(company.urn)}
                            >
                              <Image
                                src={company.image}
                                alt="Image"
                                width="400"
                                height="400"
                                className="h-full object-cover rounded-[10px]"
                              />
                              <div className={styles.builder_card_details}>
                                <CardTitle className={styles.CardTitle}>
                                  {company.title}
                                </CardTitle>
                                <CardDescription>
                                  {company.subtitle}
                                </CardDescription>
                              </div>
                            </Card>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No results found.</p>
                    )} 
                  </div>
                )}
              </div>*/}

              {isVisible && (
                <div className={styles.builder_cards_containder}>
                  {results && (
                    <div className={styles.builder_cards_containder}>
                      {results.success && results.suggestions.length > 0 ? (
                        <ul className={styles.builder_cards_containder}>
                          {results.suggestions.map((company, index) => (
                            <li
                              key={index}
                              className={styles.builder_cards}
                              onClick={() => handleCompanyClick(company.urn)}
                            >
                              <Card className={styles.builder_cards}>
                                {company.image && (
                                  <img
                                    src={company.image}
                                    alt={company.title}
                                    className="h-full w-full object-cover rounded-[10px]"
                                  />
                                )}
                                <div className={styles.builder_card_details}>
                                  <CardTitle className={styles.CardTitle}>
                                    {company.title}
                                  </CardTitle>
                                  <CardDescription>
                                    {company.subtitle}
                                  </CardDescription>
                                </div>
                              </Card>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No results found.</p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
            {/* ////////////////////// */}
          </Sheet>
        </>

        {/* {selectedCompany && ( */}

        <div className="h-full w-full">
          <div className={styles.grid_container}>
            <div className={styles.grid_item}>
              <Card className={`${styles.linkedIn}`}>
                <div className={`${styles.banner}`}>
                  <img src="/images/linkedin_banner.jpeg" />
                </div>
                <div className={`${styles.logo}`}>
                  <img src="/images/msbcgroup_logo.jpeg" />
                </div>
                <CardHeader className={styles.company_linkedIn_details}>
                  <CardTitle>MSBC Group</CardTitle>
                  <CardDescription>
                    The Home of Accessible AI | IT Staffing | Custom Software
                    Development
                  </CardDescription>
                </CardHeader>
                <CardHeader className={styles.company_linkedIn_details}>
                  <div className={styles.labels}>
                    <Badge className="w-auto m-[3px]" variant="outline">
                      Followers: 999
                    </Badge>
                    <Badge className="w-auto m-[3px]" variant="outline">
                      Followers: 999
                    </Badge>
                    <Badge className="w-auto m-[3px]" variant="outline">
                      Followers: 999
                    </Badge>
                    <Badge className="w-auto m-[3px]" variant="outline">
                      Followers: 999
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent></CardContent>
              </Card>
            </div>

            <div className={styles.grid_item}>
              <Card>
                <CardHeader>
                  <CardTitle>Create project</CardTitle>
                  <CardDescription>
                    Deploy your new project in one-click.
                  </CardDescription>
                </CardHeader>
                <CardContent></CardContent>
              </Card>
            </div>
            <div className={styles.grid_item}>
              <Card>
                <CardHeader>
                  <CardTitle>Create project</CardTitle>
                  <CardDescription>
                    Deploy your new project in one-click.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
    return <></>;
  } else {
    useEffect(() => {
      if (status != "authenticated") {
        redirect("/login");
      }
    }, [status]);

    if (status === "loading") {
      return <p>Loading...</p>;
    }
  }
}
