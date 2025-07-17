"use client";
import React from "react";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import Alluser from "../../components/Alluser";
import Gear from "../../components/Gear";
import { Report } from "../../components/Report";
import BioCheacker from "../../components/BioCheacker";
import Background from "../../components/Background";

const Dashboard = () => {
  return (
    <>
      <Head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-W4Z4F6JYR2"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-W4Z4F6JYR2');
            `,
          }}
        />
      </Head>

      <div className="">
        <Background />
        <Navbar />
        <BioCheacker />
        <div className="pt-10">
          <Alluser />
        </div>
        <div className="">
          <Gear />
        </div>
        <Report />
      </div>
    </>
  );
};

export default Dashboard;
