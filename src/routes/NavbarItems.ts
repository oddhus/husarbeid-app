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
        label: "Historikk",
        subLabel: "Se tidligere oppgaver",
        href: "#",
      },
    ],
  },
  {
    label: "Familie",
    children: [
      {
        label: "Tilgjenglige oppgaver",
        subLabel: "Se hvilke oppgaver som skal gjøres",
        href: "#",
      },
      {
        label: "Opprett en oppgave",
        subLabel: "Hva må gjøres?",
        href: "#",
      },
    ],
  },
  {
    label: "Min Profil",
    href: "/my-account",
  },
  {
    label: "Om siden",
    href: "#",
  },
];
