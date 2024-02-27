"use client";
import { Navbar } from "flowbite-react";



const nav = () => {
 
  return (
    <>
      <Navbar
          fluid={true}
          rounded={true}
        >
          <Navbar.Brand href="/">
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Gaza
            </span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Navbar.Link
              href="/"
              active={true}
            >
              Home
            </Navbar.Link>
            <Navbar.Link href="/">
              About
            </Navbar.Link>

          </Navbar.Collapse>
        </Navbar>
    </>
  );
};

export default nav;
