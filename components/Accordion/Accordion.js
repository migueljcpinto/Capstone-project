import { useState } from "react";
import { AccordionContent, AccordionItemContainer } from "./Accordion.styled";

export default function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggle() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <>
      <AccordionItemContainer onClick={handleToggle}>
        <p>{title}</p>
        <p>{isOpen ? "-" : "+"}</p>
      </AccordionItemContainer>
      {isOpen && <AccordionContent>{children}</AccordionContent>}
    </>
  );
}
