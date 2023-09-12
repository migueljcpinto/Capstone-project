import NavHomeIcon from "@/utilities/Icons/NavHomeIcon";
import NavProfileIcon from "@/utilities/Icons/NavProfileIcon";
import NavScheduleIcon from "@/utilities/Icons/NavScheduleIcon";
import NavTeamIcon from "@/utilities/Icons/NavTeamIcon";
import Link from "next/link";
import { useState } from "react";
import { NavContainer, NavItem, NavLinkText } from "./NavBar.styled";

export default function NavBar() {
  const [activeIndex, setActiveIndex] = useState(-1);

  function handleLinkClick(index) {
    setActiveIndex(index === activeIndex ? -1 : index);
  }

  return (
    <NavContainer>
      <Link href="/dashboard">
        <NavItem
          isActive={activeIndex === 0}
          onClick={() => handleLinkClick(0)}
        >
          {" "}
          <NavHomeIcon />
          <NavLinkText isActive={activeIndex === 0}>Dashboard</NavLinkText>
        </NavItem>
      </Link>
      <Link href="/schedule">
        <NavItem
          isActive={activeIndex === 1}
          onClick={() => handleLinkClick(1)}
        >
          {" "}
          <NavScheduleIcon />
          <NavLinkText isActive={activeIndex === 1}>Schedule</NavLinkText>
        </NavItem>
      </Link>
      <Link href="/nurseteam">
        <NavItem
          isActive={activeIndex === 2}
          onClick={() => handleLinkClick(2)}
        >
          {" "}
          <NavTeamIcon />
          <NavLinkText isActive={activeIndex === 2}>Team</NavLinkText>
        </NavItem>
      </Link>
      <Link href="/nurses/new-nurse">
        <NavItem
          isActive={activeIndex === 3}
          onClick={() => handleLinkClick(3)}
        >
          {" "}
          <NavProfileIcon />
          <NavLinkText isActive={activeIndex === 3}>Add Nurse</NavLinkText>
        </NavItem>
      </Link>
    </NavContainer>
  );
}
