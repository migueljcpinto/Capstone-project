import { useState } from "react";
import {
  AccordionContent,
  AccordionItemContainer,
  AccordionTitle,
  Arrow,
} from "./Accordion.styled";

export default function Accordion({
  title,
  children,
  className,
  isOpen,
  onToggle,
}) {
  return (
    <>
      <AccordionItemContainer
        $isOpen={isOpen}
        onClick={onToggle}
        className={className}
      >
        <AccordionTitle $isOpen={isOpen}>{title}</AccordionTitle>

        <Arrow $isOpen={isOpen} />
      </AccordionItemContainer>
      {isOpen && <AccordionContent>{children}</AccordionContent>}
    </>
  );
}
