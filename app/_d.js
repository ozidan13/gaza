
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import axios from "@app/lib/axios";

// import icons and images
import { MdEditLocationAlt } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { IoMdBusiness } from "react-icons/io";
import { MdManageSearch } from "react-icons/md";
import { BiShow } from "react-icons/bi";



export default function Signup() {
  const [phase, setPhase] = useState(1);
  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('');
  const [countryID, setCountryID] = useState('');
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState('');
  const [cityID, setCityID] = useState('');
  const [states, setStates] = useState([]);
  const [state, setState] = useState('');
  const [stateID, setStateID] = useState(null);
  const [businesses, setBusinesses] = useState([]);
  const [dropBusinesses, setDropBusinesses] = useState([]);
  const [businessName, setBusinessName] = useState('');
  const [businessWebsite, setBusinessWebsite] = useState('');
  const [businessAddress, setBusinessAddress] = useState(''); 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [emailConfirmation, setEmailConfirmation] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [postcode, setPostcode] = useState('');
  const [phone, setPhone] = useState('');
  const [mobile, setMobile] = useState('');
  const [category, setCategory] = useState();
  const [categoryID, setCategoryID] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState('Business Owner');
  const [showCountryList, setShowCountryList] = useState(true);
  const [showCityList, setShowCityList] = useState(false);
  const [showStateList, setShowStateList] = useState(false);
  const [showCategoryList, setShowCategoryList] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [responseStatus, setResponseStatus] = useState('');
  const [errorMessages, setErrorMessages] = useState('');
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    // Fetch countries
    const fetchCountries = async () => {
      try {
        const resCountries = await fetch(`${baseURL}/api/v1/countries`, {
        cache: "no-cache",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
      const dataCountries = await resCountries.json();
      console.log(dataCountries.data.countries);
      setCountries(dataCountries.data.countries);
    } catch (error) {
      console.log("not found countries");
    }
  };
  fetchCountries();

  // fetch categories
  const fetchCategories = async () => {
    try {
      const resCategories = await fetch(`${baseURL}/api/v1/categories`, {
      cache: "no-cache",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
    const dataCategories = await resCategories.json();
    console.log(dataCategories.data.categories);
    setCategories(dataCategories.data.categories);
  } catch (error) {
    console.log("not found categories");
  }
}
fetchCategories();

  }, []);


  useEffect(() => {

  // fetch states
  const fetchStates = async () => {
    try {
      const resStates = await fetch(`${baseURL}/api/v1/states?country_id=${countryID}`, {
      cache: "no-cache",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
    const dataStates = await resStates.json();
    console.log(dataStates.data.states);
    setStates(dataStates.data.states);
  } catch (error) {
    console.log("not found states");
  }}
  fetchStates();

  // fetch cities
  const fetchCities = async () => {
    try {
      const resCities = await fetch(`${baseURL}/api/v1/cities?country_id=${countryID}&state_id=${stateID}`, {
      cache: "no-cache",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
    const dataCities = await resCities.json();
    console.log(dataCities.data.cities);
    setCities(dataCities.data.cities);
  } catch (error) {
    console.log("not found cities");
  }
}
fetchCities();

  }, [ countryID, cityID, stateID]);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const resBusinesses = await fetch(`${baseURL}/api/v1/register-business/search?name=${businessName}${countryID && cityID ? `&country_id=${countryID}&city_id=${cityID}` : ""}`, {
        cache: "no-cache",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
      const dataBusinesses = await resBusinesses.json();
      console.log(dataBusinesses.data.businesses);
      setDropBusinesses(dataBusinesses.data.businesses);
      setBusinesses(dataBusinesses.data.businesses);
    } catch (error) {
      console.log("not found businesses");
    }}
    fetchBusinesses();
  }, [businessName, countryID, cityID]);
  

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const handleRegistration = async () => {
    try {
      await csrf(); // Fetch CSRF token

      const response = await fetch(`${baseURL}/api/v1/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": axios.defaults.headers.common["X-CSRF-TOKEN"], // Set CSRF token in the request 
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
          "Access-Control-Allow-Headers": "Content-Type",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          email_confirmation: emailConfirmation,
          password: password,
          password_confirmation: passwordConfirmation,
          user_type: userType,
          business_name: businessName,
          country_id: countryID,
          city_id: cityID,
          state_id: stateID.id,
          business_website: businessWebsite,
          postcode: postcode,
          phone: phone,
          mobile: mobile,
          category_id: categoryID,
          newsletter: newsletter,
        }),
      });

      const data = await response.json();
      const inputs = [firstName, lastName, email, emailConfirmation, password, passwordConfirmation, userType, businessName, countryID, cityID, stateID, businessWebsite, postcode, phone, mobile, categoryID, newsletter];
      console.log(inputs);
      console.log(data);
      setResponseStatus(data);
      setPhase(5);
    } catch (error) {
      console.log("Error:", error);
      setResponseStatus(data);
      setPhase(5);
    }
  };

  const validatePhase1 = () => { 
    if (country === "" || state === "" || city === "") {
      setErrorMessages("Please fill all fields from the list");
    } else if (country && state && city) {
      setPhase(2);
      setErrorMessages("");
    }
  }

  const validatePhase2 = () => {
    if (businessName === "") {
      setErrorMessages("Please Fill all fields from the list");
    } else if (businessName) {
      setPhase(3);
      setErrorMessages("");
    }
  }

  const validatePhase3 = () => {
    if (businessName === "" || category === "" || businessAddress === "" || country === "" || state === "" || city === "" || postcode === "" || phone === "" || mobile === "" || businessWebsite === "") {
      setErrorMessages("Please Fill all fields from the list");
    } else if (businessName) {
      setPhase(4);
      setErrorMessages("");
    }
  }

  const validatePhase4 = () => {
    if (firstName === "" || lastName === "" || email === "" || emailConfirmation === "" || password === "" || passwordConfirmation === "" || businessName === "" || country === "" || state === "" || city === "" || postcode === "" || phone === "" || mobile === "" || businessWebsite === "" || category === "") {
      setErrorMessages("Please Fill all fields from the list");
    } else if (firstName && lastName && email && emailConfirmation && password && passwordConfirmation && businessName && country && state && city && postcode && phone && mobile && businessWebsite && category ) {
      setErrorMessages("");
      handleRegistration();
    }
  }
  const validatePhase5 = () => {
    if (firstName === "" || lastName === "" || email === "" || emailConfirmation === "" || password === "" || passwordConfirmation === "" || userType === "" || businessName === "" || country === "" || state === "" || city === "" || postcode === "" || phone === "" || mobile === "" || businessWebsite === "" || category === "" || newsletter === "") {
      setErrorMessages("Please Fill all fields from the list");
    } else if (firstName && lastName && email && emailConfirmation && password && passwordConfirmation && userType && businessName && country && state && city && postcode && phone && mobile && businessWebsite && category && newsletter) {
      setErrorMessages("");
    }
  }
  



  return (
    <>
      <section className='glassmorphism mx-8  gap-6 flex justify-center items-center flex-col my-7 lg:mt-7 mb-9 '>

      <section className=' gap-6 flex justify-center items-start flex-col lg:w-full w-[90%] lg:px-20 lg:py-14  px-1 py-6'>
        <div className='flex justify-start items-start flex-col gap-3 text-white w-[90%]'>
          <h1 className='text-4xl font-bold  w-full text-left'><span className='text-primary-color'>Sign Up</span> Form</h1>
          <p className=' font-extralight normal-case text-gray-400  w-full text-left'>Welcome to Biteproof, the ultimate solution for businesses like yours to harness the full potential of customer reviews. If we have indexed your business, please sign up to claim your business page and confirm your details are correct.</p>
          <h1 className='text-4xl font-bold  mt-4  w-full text-left'>

            <span className='text-primary-color'>
              {
                phase === 1 || phase === 2 || phase === 3 ? "Business " : ""
              }
              {
                phase === 4 ? "Personal " : ""
              }
              {
                phase === 5 ? "" : " "
              }

            </span> 

              {
                phase === 1 ? "Location " : ""
              }
              {
                phase === 2 ? "Name " : ""
              }
              {
                phase === 3 ? "Details " : ""
              }
              {
                phase === 4 ? "Details " : ""
              }
              {
                phase === 5 ? "" : " "
              }

            </h1>
        </div>

        <div className='flex justify-center lg:items-start items-center lg:flex-row  flex-col  w-full  min-h-full gap-4'>
          
          <form className='w-full text-white'>
            <section className="flex justify-center items-center flex-row w-full relative mb-6">
                  <div className='flex justify-between items-center flex-row gap-8 '>
                    <div 
                      className={`bg-primary-color-hover text-white font-bold py-2 px-4   w-12 h-12 rounded-full text-center flex justify-center items-center `} 
                      onClick={() => setPhase(1)}>
                        1
                    </div>
                    <div 
                      className={`${phase === 2 || phase === 3 || phase === 4 || phase === 5 ? 'bg-primary-color-hover' : 'bg-gray-400 border hover:border-primary-color-hover'} text-white font-bold py-2 px-4 w-12 h-12 rounded-full text-center flex justify-center items-center transition ease-in-out duration-150`} 
                      onClick={validatePhase1}
                      >
                        2
                    </div>
                    <div 
                      className={`${phase === 3 || phase === 4 || phase === 5 ? 'bg-primary-color-hover' : 'bg-gray-400 border hover:border-primary-color-hover'} text-white font-bold py-2 px-4 w-12 h-12 rounded-full text-center flex justify-center items-center transition ease-in-out duration-150`} 
                      onClick={validatePhase2}
                      >
                        3
                    </div>
                    <div 
                      className={`${phase === 4 || phase === 5 || phase === 6 ? 'bg-primary-color-hover' : 'bg-gray-400 border hover:border-primary-color-hover'} text-white font-bold py-2 px-4 w-12 h-12 rounded-full text-center flex justify-center items-center transition ease-in-out duration-150`} 
                      onClick={validatePhase5}
                      >
                        4
                    </div>
                  </div>
                  <div className="lg:w-[16rem] block w-full h-1 bg-gray-500 absolute -z-10" />
            </section>

            {phase === 1 && (
              <div className="  rounded-lg text-white">

                {/* Country dropdown */}
                <div className="mb-4">
                  <label className="font-bold mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${country ? "border-2 border-primary-color" : "border-2 border-red-500"}`}
                    placeholder="Type your country"
                    value={country}
                    onChange={(e) => {
                      setCountry(e.target.value);
                      setShowCountryList(true);
                    }}
                  />
                  {/* List of matching countries from database */}
                  {countries.length > 0 && (
                    <ul 
                    className={` bg-dark-blue shadow-md cursor-pointer ring-1 ring-black ring-opacity-5 overflow-auto max-h-[10rem] min-w-full px-4
                    ${country && showCountryList ? "block" : "hidden"}
                    ` 
                    }>
                    {
                      // List of matching countries from database and start with the letter from country input field
                      countries.filter((countryname) => countryname.name.toLowerCase().startsWith(country.toLowerCase())).map((countryname) => (
                        <li className='text-primary-color cursor-pointer hover:text-white' key={countryname.id} onClick={ (e) => {
                          setCountryID(countryname.id);
                          setCountry(countryname.name);
                          setShowCountryList(false);
                          }} >
                          {countryname.name}
                        </li>
                      ))
                    }
                    </ul>
                  )}
                  
                  

                  {/* State dropdown */}
                  {
                    countryID ? (
                      <>
                      <label>State/County</label>
                      <input
                    type="text"
                    className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${state ? "border-2 border-primary-color" : "border-2 border-red-500"}`}
                    placeholder="Type your state"
                    value={state}
                    onChange={(e) => {
                      setState(e.target.value);
                      setShowStateList(true);
                      
                    }}
                  />
                  {/* List of matching countries from database */}
                  {states.length > 0 && (
                    <ul 
                    className={` bg-dark-blue shadow-md cursor-pointer  ring-1 ring-black ring-opacity-5 overflow-auto max-h-[10rem] min-w-full px-4
                    ${state && showStateList ? "block" : "hidden"}
                    ` 
                    }>
                    {
                      // List of matching countries from database and start with the letter from country input field
                      states.filter((statename) => statename.name.toLowerCase().startsWith(state.toLowerCase())).map((statename) => (
                        <li className='text-primary-color cursor-pointer hover:text-white' key={statename.id} onClick={ (e) => {
                          setStateID(statename.id);
                          setState(statename.name);
                          setShowStateList(false);
                          }} >
                          {statename.name}
                        </li>
                      ))
                    }
                    </ul>
                  )}
                      </>
                    ) : ""
                  }
                  {/* City dropdown */}
                  
                  {
                    stateID ? (
                      <>
                      <label>City/Town</label>
                      <input
                    type="text"
                    className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${city ? "border-2 border-primary-color" : "border-2 border-red-500"}`}
                    placeholder="Type your city"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                      setShowCityList(true);                      
                    }}
                  />
                  {/* List of matching countries from database */}
                  {cities.length > 0 && (
                    <ul 
                    className={` bg-dark-blue shadow-md cursor-pointer  ring-1 ring-black ring-opacity-5 overflow-auto max-h-[10rem] min-w-full px-4
                    ${city && showCityList ? "block" : "hidden"}
                    ` 
                    }>
                    {
                      // List of matching countries from database and start with the letter from country input field
                      cities.filter((cityname) => cityname.name.toLowerCase().startsWith(city.toLowerCase())).map((cityname) => (
                        <li className='text-primary-color cursor-pointer hover:text-white' key={cityname.id} onClick={ (e) => {
                          setCityID(cityname.id);
                          setCity(cityname.name);
                          setShowCityList(false);
                          }} >
                          {cityname.name}
                        </li>
                      ))
                    }
                    </ul>
                  )}
                      </>
                    ) : ""
                  }
                  
                </div>          
                <p className=' text-red-600 my-2 font-semibold'>{errorMessages}</p>
                <div className='signup-buttons flex justify-center items-center flex-col gap-2'>
                <div
                  className="bg-primary-color cursor-pointer hover:bg-primary-color-hover w-full text-center text-white font-bold py-3 px-4 rounded  transition ease-in-out duration-150"
                  onClick={validatePhase1}
                >
                  Next
                </div>
                <Link
                  className="bg-white  w-full text-primary-color  py-3 px-4 rounded text-center  hover:bg-primary-color-hover hover:text-white  transition ease-in-out duration-150"
                  href="/signin"
                >
                  You have an account, <span className='font-bold '> Sign In instead</span>
                </Link>
                </div>
              </div>
            )}


            {phase === 2 && (
              <div className=" ">
                <label className="text-2xl font-bold mb-8">Type Your Business Name</label>
                <div className="my-4">
                  <input
                    type="text"
                    className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${businessName ? "border-2 border-primary-color" : "border-2 border-red-500"}`}
                    placeholder="Start typing your business name"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                  />
                  {/* List of matching businesses from database */}
                  {businesses.length > 0 && (
                    <ul 
                    className={` bg-dark-blue shadow-md  ring-1 ring-black ring-opacity-5 overflow-auto max-h-[10rem] min-w-full px-4
                    ${businessName ? "block" : "hidden"}
                    ` 
                    }>
                      {dropBusinesses.map((dropbusiness) => (
                        <li className='text-primary-color cursor-pointer hover:text-white' key={dropbusiness.id} onClick={ (e) => {
                          setBusinessName(dropbusiness.name);
                          setBusinessAddress(dropbusiness.address);
                          setCountry(dropbusiness.country.name);
                          setState(dropbusiness.state.name);
                          setCity(dropbusiness.city.name);
                          setCityID(dropbusiness.city.id);
                          setStateID(dropbusiness.state);
                          setCountryID(dropbusiness.country.id);
                          setBusinessWebsite(dropbusiness.website);
                          setPostcode(dropbusiness.postcode);
                          // setPhone(dropbusiness.phone);
                          // setMobile(dropbusiness.mobile ? dropbusiness.mobile : null);
                          setDropBusinesses([]);
                          }}>
                          {dropbusiness.name}
                        </li>
                      ))}
                    </ul>
                  )}
                  
                </div>

                <p className=' text-red-600 my-2 font-semibold'>{errorMessages}</p>
                <div className='signup-buttons flex justify-center items-center flex-col gap-2'>
                <div
                  className="bg-primary-color cursor-pointer text-center hover:bg-primary-color-hover w-full text-white font-bold py-3 px-4 rounded  transition ease-in-out duration-150"
                  onClick={validatePhase2}
                >
                  Next
                </div>
                <Link
                  className="bg-white  w-full text-primary-color  py-3 px-4 rounded text-center  hover:bg-primary-color-hover hover:text-white  transition ease-in-out duration-150"
                  href="/signin"
                >
                  You have an account, <span className='font-bold '> Sign In instead</span>
                </Link>
                </div>
              </div>
            )}

            {phase === 3 && (
              <div className="   ">
                {/* Business name */
                <div className='flex justify-start items-start w-full flex-col gap-2'>
                <label className="block  font-bold  w-full">
                  Business Name
                </label>
                <input
                  type="text"
                  className={`w-full shadow appearance-none border rounded py-3 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline ${businessName ? "border-2 border-primary-color" : "border-2 border-red-500"}`}
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  required
                />
                </div>
                }

                {/* Business category */
                <div className='flex justify-start items-start w-full flex-col gap-2'>
                <label className="block  font-bold  w-full ">
                  Business Category
                </label>

                <div className='relative w-full'>
                  <input
                    type="text"
                    className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${category ? "border-2 border-primary-color" : "border-2 border-red-500"}`}
                    placeholder="Start typing your business name"
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      setShowCategoryList(true);                      
                    }}
                    required
                  />
                  {/* List of matching countries from database */}
                  {categories.length > 0 && (
                    <ul 
                    className={`absolute z-10 top-10 bg-dark-blue shadow-md cursor-pointer  ring-1 ring-black ring-opacity-5 overflow-auto max-h-[10rem] min-w-full px-4
                    ${category && showCategoryList ? "block" : "hidden"}
                    ` 
                    }>
                    {
                      // List of matching countries from database and start with the letter from country input field
                      categories.filter((categorynametwo) => categorynametwo.name.toLowerCase().startsWith(category) ).map((categorynametwo) => (
                        <li className='text-primary-color cursor-pointer hover:text-white' key={categorynametwo.id} onClick={ (e) => {
                          setCategoryID(categorynametwo.id);
                          setCategory(categorynametwo.name);
                          setShowCategoryList(false);
                          }} >
                          {categorynametwo.name}
                        </li>
                      ))
                    }
                    </ul>
                  )}
                </div>
                {
                  
                }

                </div>
                
                }

                {/* Business address */
                <div className='flex justify-start items-start flex-col w-full gap-2'>
                <label className="block w-full  font-bold ">
                    Business Address
                </label>
                <input
                  type="text"
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${businessAddress ? "border-2 border-primary-color" : "border-2 border-red-500"}`}
                  value={businessAddress}
                  onChange={(e) => setBusinessAddress(e.target.value)}
                  required
                />
                </div>
                }

                <div className='flex justify-between items-start w-full gap-2 '>
                  {/* Country*/
                  <div className='flex justify-start items-start flex-col w-full gap-2'>
                  <label className="block  font-bold w-full">
                    Country
                  </label>

                  <div className='relative w-full'>
                    <input
                      type="text"
                      className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${country ? "border-2 border-primary-color" : "border-2 border-red-500"}`}
                      placeholder="Type your country "
                      value={country}
                      onChange={(e) => {
                        setCountry(e.target.value);
                        setShowCountryList(true);
                      }}
                      required
                    />
                    {/* List of matching countries from database */}
                    {countries.length > 0 && (
                      <ul 
                      className={` absolute top-10 bg-dark-blue shadow-md cursor-pointer ring-1 ring-black ring-opacity-5 overflow-auto max-h-[10rem] min-w-full px-4
                      ${country && showCountryList ? "block" : "hidden"}
                      ` 
                      }>
                      {
                        // List of matching countries from database and start with the letter from country input field
                        countries.filter((countryname) => countryname.name.toLowerCase().startsWith(country.toLowerCase())).map((countryname) => (
                          <li className='text-primary-color cursor-pointer hover:text-white' key={countryname.id} onClick={ (e) => {
                            setCountryID(countryname.id);
                            setCountry(countryname.name);
                            setShowCountryList(false);
                            }} >
                            {countryname.name}
                          </li>
                        ))
                      }
                      </ul>
                    )}
                  </div>
                    
                  </div>
                  }
                  {/* State */
                  <div className='flex justify-start items-start flex-col w-full gap-2'>
                  <label className="block w-full  font-bold ">
                    State
                  </label>
                  <div className='relative w-full'>
                    <input
                      type="text"
                      className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${state ? "border-2 border-primary-color" : "border-2 border-red-500"}`}
                      placeholder="Type your state"
                      value={state}
                      onChange={(e) => {
                        setState(e.target.value);
                        setShowStateList(true);
                        
                      }}
                    />
                    {/* List of matching countries from database */}
                    {states.length > 0 && (
                      <ul 
                      className={`absolute top-10 bg-dark-blue shadow-md cursor-pointer  ring-1 ring-black ring-opacity-5 overflow-auto max-h-[10rem] min-w-full px-4
                      ${state && showStateList ? "block" : "hidden"}
                      ` 
                      }>
                      {
                        // List of matching countries from database and start with the letter from country input field
                        states.filter((statename) => statename.name.toLowerCase().startsWith(state.toLowerCase())).map((statename) => (
                          <li className='text-primary-color cursor-pointer hover:text-white' key={statename.id} onClick={ (e) => {
                            setStateID(statename.id);
                            setState(statename.name);
                            setShowStateList(false);
                            }} >
                            {statename.name}
                          </li>
                        ))
                      }
                      </ul>
                    )}
                  </div>
                  </div>
                  }
                  {/* Town/City */
                  <div className='flex justify-start items-start flex-col w-full gap-2'>
                  <label className="block w-full  font-bold ">
                      City
                  </label>
                  <div className='relative w-full'>
                    <input
                      type="text"
                      className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${city ? "border-2 border-primary-color" : "border-2 border-red-500"}`}
                      placeholder="Start typing your business name"
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                        setShowCityList(true);                      
                      }}
                    />
                    {/* List of matching countries from database */}
                    {cities.length > 0 && (
                      <ul 
                      className={`absolute top-10 bg-dark-blue shadow-md cursor-pointer  ring-1 ring-black ring-opacity-5 overflow-auto max-h-[10rem] min-w-full px-4
                      ${city && showCityList ? "block" : "hidden"}
                      ` 
                      }>
                      {
                        // List of matching countries from database and start with the letter from country input field
                        cities.filter((cityname) => cityname.name.toLowerCase().startsWith(city.toLowerCase())).map((cityname) => (
                          <li className='text-primary-color cursor-pointer hover:text-white' key={cityname.id} onClick={ (e) => {
                            setCityID(cityname.id);
                            setCity(cityname.name);
                            setShowCityList(false);
                            }} >
                            {cityname.name}
                          </li>
                        ))
                      }
                      </ul>
                    )}
                  </div>
                  </div>
                  }
                </div>
                
                <div className='flex justify-between items-center w-full gap-2 '>
                  {/* Zip Code/Post Code */

                  <div className='flex justify-start items-start flex-col w-full gap-2'>
                  <label className="block w-full font-bold ">
                      Zip Code/Post Code
                  </label>
                    <input
                    type="text"
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${postcode ? "border-2 border-primary-color" : "border-2 border-red-500"}`}
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    required
                  />
                  </div>
                  }
                  {/* Business landline number */
                  <div className='flex justify-start items-start flex-col w-full gap-2'>
                  <label className="block w-full font-bold ">
                      Business Phone
                  </label>
                  <input
                    type="number"
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${phone ? "border-2 border-primary-color" : "border-2 border-red-500"}`}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  </div>
                  
                  }
                  {/* Business mobile number */

                  <div className='flex justify-start items-start flex-col w-full gap-2'>
                  <label className="block w-full font-bold ">
                      Business Mobile
                  </label>
                    <input
                      type="number"
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${mobile ? "border-2 border-primary-color" : "border-2 border-red-500"}`}
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      required
                    />
                  </div>
              
                  }
                </div>
                
                {/* Business website */ 
                <>
                <label className="block  font-bold mb-2">
                    Business website
                </label>
                  <input
                  type="text"
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${businessWebsite ? "border-2 border-primary-color" : "border-2 border-red-500"}`}
                  value={businessWebsite}
                  required
                  onChange={(e) => setBusinessWebsite(e.target.value)}
                />
                </>
                }

                <p className=' text-red-600 my-2 font-semibold'>{errorMessages}</p>
                <div className='signup-buttons flex justify-center items-center flex-col gap-2 mt-3'>
                <button
                  className="bg-primary-color hover:bg-primary-color-hover w-full text-white font-bold py-3 px-4 rounded  transition ease-in-out duration-150"
                  onClick={validatePhase3}
                >
                  Next
                </button>
                <Link
                  className="bg-white  w-full text-primary-color  py-3 px-4 rounded text-center  hover:bg-primary-color-hover hover:text-white  transition ease-in-out duration-150"
                  href="/signin"
                >
                  You have an account, <span className='font-bold '> Sign In instead</span>
                </Link>
                </div>
              </div>
            )}

            {phase === 4 && (
              <div className="   ">
                
                <div className='flex justify-start items-start w-full gap-2'>
                  {/* First Name */
                    <div className='flex justify-start items-start gap-2 flex-col w-full'>
                    <label className="block  font-bold w-full ">
                        First Name
                    </label>
                    <input
                      type="text"
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${firstName ? "border-2 border-primary-color" : "border-2 border-red-500"}`}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                    </div>
                  }

                  {/* Last Name */
                  <div className='flex justify-start items-start gap-2 flex-col w-full'>
                  <label className="block  font-bold w-full">
                      Last Name
                  </label>
                  <input
                    type="text"
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline ${lastName ? "border-2 border-primary-color" : "border-2 border-red-500"}`}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                  </div>
                  }
                </div>
                
                {/* Email address */
                  <>
                  <label className="block  font-bold mb-2">
                      Email address
                  </label>
                  <input
                    type="email"
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${email ? "border-2 border-primary-color" : "border-2 border-red-500"}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  </>
                }
                {/* Email confirmation address */
                  <>
                  <label className="block  font-bold mb-2">
                      Confirm Email
                  </label>
                  <input
                    type="email"
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${email ? "border-2 border-primary-color" : "border-2 border-red-500"}`}
                    value={emailConfirmation}
                    onChange={(e) => setEmailConfirmation(e.target.value)}
                    required
                  />
                  </>
                }
                {/* Phone number */
                <>
                <label className="block  font-bold mb-2">
                    Phone number
                </label>
                <input
                  type="number"
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${phone ? "border-2 border-primary-color" : "border-2 border-red-500"}`}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                </>
                }
                {/* Password */
                <>
                <label className="block  font-bold mb-2">
                    Password
                </label>
                <div className='relative flex justify-center items-center'>
                <input
                  type={`${showPassword ? "text" : "password"}`}
                  className={ `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${password ? "border-2 border-primary-color" : "border-2 border-red-500"}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <BiShow 
                  className={`absolute right-2 top-2 text-gray-500 cursor-pointer text-2xl hover:text-primary-color transition ease-in-out duration-150`}
                  onClick={() => setShowPassword(!showPassword)} />
                </div>
                
                </>
                }
                {/* Confirm password */
                <>
                <label className="block  font-bold mb-2">
                    Confirm password
                </label>
                <div className='relative flex justify-center items-center'>
                <input
                  type={`${showPassword ? "text" : "password"}`}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${passwordConfirmation ? "border-2 border-primary-color" : "border-2 border-red-500"}`}
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  required
                />
                <BiShow
                  className={`absolute right-2 top-2 text-gray-500 cursor-pointer text-2xl hover:text-primary-color transition ease-in-out duration-150`}
                  onClick={() => setShowPassword(!showPassword)} />
                </div>
                </>
                }

                {
                  // checkbox for newsletter
                  <div className='flex justify-center items-center gap-2 flex-row w-full my-2'>
                    
                    <label className="block w-full font-inter font-semibold text-white hover:text-primary-color">
                      <input
                          type="checkbox"
                          className="mr-2"
                          value={newsletter}
                          onClick={() => setNewsletter(!newsletter)}
                        />
                        Subscribe to our newsletter
                        
                    </label>
                  </div>

                }
                
              <p className=' text-red-600 my-2 font-semibold'>{errorMessages}</p>
              <div className='signup-buttons flex justify-center items-center flex-col gap-2 mt-3'>
                <div
                  className="bg-primary-color cursor-pointer text-center hover:bg-primary-color-hover w-full text-white font-bold py-3 px-4 rounded  transition ease-in-out duration-150"
                  onClick={validatePhase4}
                >
                  Finish Registration
                </div>
                <Link
                  className="bg-white  w-full text-primary-color  py-3 px-4 rounded text-center  hover:bg-primary-color-hover hover:text-white  transition ease-in-out duration-150"
                  href="/signin"
                >
                  You have an account, <span className='font-bold '> Sign In instead</span>
                </Link>
                </div>
              </div>
            )}

            {phase === 5 && (
              <div className="flex justify-center items-center flex-col  bg-white rounded-lg pt-10">
                {/* Success message */}
                <div className='w-full'>
                  { responseStatus.errors ? (
                    <div className='flex justify-center items-center gap-3 flex-col p-3'>
                      <h1 className="text-2xl font-bold mb-8 text-red-600">
                        {responseStatus.errors.email[0]}
                        
                      </h1>
                      <div
                      className="bg-red-600 cursor-pointer text-center hover:bg-red-800 w-full text-white font-bold py-3 px-4 rounded  transition ease-in-out duration-150"
                      onClick={() => setPhase(4)}
                      >
                      Back to registration
                    </div>
                    </div>
                    ) : (
                    <div className='flex justify-center items-center gap-3 flex-col p-3'>
                      <h1 className="text-2xl font-bold mb-8 text-primary-color text-center">
                        Please  Confirm your account, Check your email
                      </h1>
                      <div
                      className='bg-primary-color text-center cursor-pointer hover:bg-primary-color-hover w-full text-white font-bold py-3 px-4 rounded  transition ease-in-out duration-150'
                      >
                      <a href="/">Continue</a>
                    </div>
                    </div>
                    )
                  
                  }
                  
                </div>

                
                
              </div>
            )}
            
          </form>

          <div className="flex justify-center items-center w-full flex-col gap-10 mx-2 my-20 lg:my-0 ">
              <section className="flex justify-center items-center w-full ">
                {
                  phase === 1 ? (
                    <MdEditLocationAlt className={`text-white text-[340px] animate-bounce transition duration-150 ease-in-out`} />
                  ) : ""
                } 
                {
                  phase === 2 ? (
                    <MdDriveFileRenameOutline   className='text-white text-[340px] animate-bounce transition duration-150 ease-in-out'/>
                  ) : ""
                } 
                {
                  phase === 3 ? (
                    <IoMdBusiness className='text-white text-[340px] animate-bounce transition duration-150 ease-in-out'/>
                  ) : ""
                } 
                {
                  phase === 4 ? (
                    <MdManageSearch className='text-white text-[340px] animate-bounce transition duration-150 ease-in-out'/>
                  ) : ""
                }
              </section>
          </div>
        </div>

        <p className=' font-extralight text-gray-400 normal-case  text-left '>
          If you have any questions or need assistance please email 
          <span className=' underline mx-1 cursor-pointer '><a href='mailto:support@biteproof.com' >support@biteproof.com</a></span> 
          and our dedicated support team are here to help you.
          Don't miss out on the chance to stand out from the competition.
        </p>
      </section>

      
      
      </section>
    </>
  );
}