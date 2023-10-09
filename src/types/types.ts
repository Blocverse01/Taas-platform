export interface MenuItem {
  title: string;
  isScrollLink: boolean;
  href?: string;
  target?: string;
}
export type NavbarProps = {
  menuItems: MenuItem[];
  isLoggedIn: boolean;
};
