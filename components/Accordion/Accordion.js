import { useState } from "react";
import {
  AccordionContent,
  AccordionItemContainer,
  AccordionTitle,
  Arrow,
} from "./Accordion.styled";

export default function Accordion({ title, children, className }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggle() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <>
      <AccordionItemContainer
        $isOpen={isOpen}
        onClick={handleToggle}
        className={className}
      >
        <AccordionTitle $isOpen={isOpen}>{title}</AccordionTitle>

        <Arrow $isOpen={isOpen} />
      </AccordionItemContainer>
      {isOpen && <AccordionContent>{children}</AccordionContent>}
    </>
  );
}
