import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";
import Footer from "../components/Layout/Footer";
import { IoMdArrowDropdown } from "react-icons/io";
import faqData from "./faqData.json";

const FAQ = () => {
  return (
    <div>
      <Header activeHeading={5} />
      <Faq />
      <Footer />
    </div>
  );
};
const Faq = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={`${styles.section} my-8`}>
      <h2 className="text-3xl font-bold mb-8">FAQ</h2>
      <div className="mx-auto space-y-4">
        {faqData.map((faq, index) => (
          <Accordion
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
            sx={{ boxShadow: "none" }}
          >
            <AccordionSummary
              expandIcon={<IoMdArrowDropdown />}
              aria-controls={`panel${index}d-content`}
              id={`panel${index}d-header`}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "normal", fontFamily: "Poppins" }}
              >
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ fontFamily: "Poppins" }}>
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
