import { AppLayout } from "@vaadin/react-components/AppLayout.js";
import { Avatar } from "@vaadin/react-components/Avatar.js";
import { Button } from "@vaadin/react-components/Button.js";
import { DrawerToggle } from "@vaadin/react-components/DrawerToggle.js";
import { Item } from "@vaadin/react-components/Item.js";
import { Scroller } from "@vaadin/react-components/Scroller.js";
import Placeholder from "Frontend/components/placeholder/Placeholder.js";
import { routes, useViewMatches } from "Frontend/routes.js";
import { MenuProps, ViewRouteObject } from "Frontend/types/core.types";
import { logout } from "Frontend/utils/auth.js";
import { AuthContext } from "Frontend/utils/useAuth.js";
import { Suspense, useContext } from "react";
import { NavLink, Outlet } from "react-router";
import "../styles.css";
import css from "./MainLayout.module.css";

type MenuRoute = ViewRouteObject &
  Readonly<{
    path: string;
    handle: Required<MenuProps>;
  }>;

export default function MenuOnLeftLayout() {
  const { state, hasAccess, unauthenticate } = useContext(AuthContext);
  const matches = useViewMatches();

  const currentTitle = matches[matches.length - 1]?.handle?.title ?? "Unknown";

  const menuRoutes = (routes[0]?.children || []).filter(
    (route) =>
      route.path && route.handle && route.handle.icon && route.handle.title,
  ) as readonly MenuRoute[];

  return (
    <AppLayout className="block h-full" primarySection="drawer">
      <header slot="drawer">
        <h1 className="text-l m-0">RecipeDB</h1>
      </header>
      <Scroller slot="drawer" scroll-direction="vertical">
        <nav>
          {menuRoutes.map(({ path, handle: { icon, title } }) => (
            <NavLink
              className={({ isActive }) =>
                `${css.navlink} ${isActive ? css.navlink_active : ""}`
              }
              key={path}
              to={path}
            >
              {({ isActive }) => (
                <Item key={path} selected={isActive}>
                  <span
                    className={`${icon} ${css.navicon}`}
                    aria-hidden="true"
                  ></span>
                  {title}
                </Item>
              )}
            </NavLink>
          ))}
        </nav>
      </Scroller>
      <footer slot="drawer">
        {state.user ? (
          <>
            <div className="flex items-center gap-m">
              <Avatar
                theme="xsmall"
                img={`https://ui-avatars.com/api/?name=${state.user.username}`}
                name={state.user.username}
              />
              {state.user.username}
            </div>
            <Button onClick={async () => logout(unauthenticate)}>
              Sign out
            </Button>
          </>
        ) : (
          <a href="/login">Sign in</a>
        )}
      </footer>

      <DrawerToggle slot="navbar" aria-label="Menu toggle"></DrawerToggle>
      <h2 slot="navbar" className="text-l m-0">
        {currentTitle}
      </h2>

      <Suspense fallback={<Placeholder />}>
        <Outlet />
      </Suspense>
    </AppLayout>
  );
}
