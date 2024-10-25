export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Juan Gaitan",
  description: "Ccreador de contenido e inversionista",
  navItems: [
    {
      label: "Sobre mi",
      href: "/about",
    },
    {
      label: "Recursos gratuitos",
      href: "/resources",
    },
    {
      label: "Curso",
      href: "/course",
    },
    {
      label: "Invierte",
      href: "/invest",
    },
    {
      label: "Blog",
      href: "/blog",
    },
  ],
  links: {
    twitter: "https://twitter.com/juan",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
    contact: "https://twitter.com/jrgarciadev",
  },
};
