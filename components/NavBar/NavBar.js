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
          {activeIndex === 0 ? (
            <NavLinkText>Dashboard</NavLinkText>
          ) : (
            <NavHomeIcon />
          )}{" "}
        </NavItem>
      </Link>
      <Link href="/schedule">
        <NavItem
          isActive={activeIndex === 1}
          onClick={() => handleLinkClick(1)}
        >
          {activeIndex === 1 ? (
            <NavLinkText>Schedule</NavLinkText>
          ) : (
            <NavScheduleIcon />
          )}{" "}
        </NavItem>
      </Link>
      <Link href="/nurseteam">
        <NavItem
          isActive={activeIndex === 2}
          onClick={() => handleLinkClick(2)}
        >
          {activeIndex === 2 ? (
            <NavLinkText>Team</NavLinkText>
          ) : (
            <NavTeamIcon />
          )}{" "}
        </NavItem>
      </Link>
      <Link href="/nurses/new-nurse">
        <NavItem
          isActive={activeIndex === 3}
          onClick={() => handleLinkClick(3)}
        >
          {activeIndex === 3 ? (
            <NavLinkText>Add Nurse</NavLinkText>
          ) : (
            <NavProfileIcon />
          )}{" "}
        </NavItem>
      </Link>
    </NavContainer>
  );
}
