import { NavItem } from "../types";

export const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Oppgaver",
    children: [
      {
        label: "Mine oppgaver",
        subLabel: "Oversikt over dine oppgaver",
        href: "#",
      },
      {
        label: "Nye oppgaver",
        subLabel: "Finn nye oppgaver",
        href: "#",
      },
    ],
  },
  {
    label: "Familie",
    children: [
      {
        label: "Job Board",
        subLabel: "Find your dream design job",
        href: "#",
      },
      {
        label: "Freelance Projects",
        subLabel: "An exclusive list for contract work",
        href: "#",
      },
    ],
  },
  {
    label: "Konto",
    href: "#",
  },
  {
    label: "Om siden",
    href: "#",
  },
];
