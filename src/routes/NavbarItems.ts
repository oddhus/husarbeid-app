import { NavItem } from "../types";

export const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Oppgaver",
    children: [
      {
        label: "Mine oppgaver",
        subLabel: "Oversikt over dine oppgaver",
        href: "tasks",
      },
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
      {
        label: "Historikk",
        subLabel: "Se tidligere oppgaver",
        href: "#",
      },
    ],
  },
  {
    label: "Innstillinger",
    children: [
      {
        label: "Familie",
        subLabel: "Oversikt over medlemmer og brukere",
        href: "#",
      },
      {
        label: "Min konto",
        subLabel: "Informasjon og innstillinger",
        href: "/my-account",
      },
    ],
  },

  {
    label: "Om siden",
    href: "#",
  },
];
