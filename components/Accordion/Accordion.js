import { useState } from "react";
import {
  AccordionContent,
  AccordionItemContainer,
  AccordionTitle,
} from "./Accordion.styled";

export default function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggle() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <>
      <AccordionItemContainer isOpen={isOpen} onClick={handleToggle}>
        <AccordionTitle isOpen={isOpen}>{title}</AccordionTitle>
        <p>{isOpen ? "-" : "+"}</p>
      </AccordionItemContainer>
      {isOpen && <AccordionContent>{children}</AccordionContent>}
    </>
  );
}
