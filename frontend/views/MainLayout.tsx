import {AppLayout} from '@hilla/react-components/AppLayout.js';
import {DrawerToggle} from '@hilla/react-components/DrawerToggle.js';
import {Item} from '@hilla/react-components/Item.js';
import {Scroller} from '@hilla/react-components/Scroller.js';
import Placeholder from 'Frontend/components/placeholder/Placeholder.js';
import {routes, useViewMatches} from 'Frontend/routes.js';
import React, {Suspense, useContext} from 'react';
import {NavLink, Outlet} from 'react-router-dom';
import css from './MainLayout.module.css';
import "../styles.css";
import {AuthContext} from "Frontend/utils/useAuth.js";
import {Button} from "@hilla/react-components/Button.js";
import {logout} from "Frontend/utils/auth.js";
import {Avatar} from "@hilla/react-components/Avatar.js";
import { MenuProps, ViewRouteObject } from 'Frontend/types/core.types';

type MenuRoute = ViewRouteObject &
    Readonly<{
        path: string;
        handle: Required<MenuProps>;
    }>;

export default function MenuOnLeftLayout() {
    const {state, hasAccess, unauthenticate} = useContext(AuthContext);
    const matches = useViewMatches();

    const currentTitle = matches[matches.length - 1]?.handle?.title ?? 'Unknown';

    const menuRoutes = (routes[0]?.children || []).filter(
        (route) => route.path && route.handle && route.handle.icon && route.handle.title
    ) as readonly MenuRoute[];

    return (
        <AppLayout className="block h-full" primarySection="drawer">
            <header slot="drawer">
                <h1 className="text-l m-0">RecipeDB</h1>
            </header>
            <Scroller slot="drawer" scroll-direction="vertical">
                <nav>
                    {menuRoutes.map(({path, handle: {icon, title}}) => (
                        <NavLink
                            className={({isActive}) => `${css.navlink} ${isActive ? css.navlink_active : ''}`}
                            key={path}
                            to={path}
                        >
                            {({isActive}) => (
                                <Item key={path} selected={isActive}>
                                    <span className={`${icon} ${css.navicon}`} aria-hidden="true"></span>
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
                            <Avatar theme="xsmall" img={`https://ui-avatars.com/api/?name=${state.user.username}`}
                                    name={state.user.username}/>
                            {state.user.username}
                        </div>
                        <Button onClick={async () => logout(unauthenticate)}>Sign out</Button>
                    </>
                ) : (
                    <a href="/login">Sign in</a>
                )}
            </footer>

            <DrawerToggle slot="navbar" aria-label="Menu toggle"></DrawerToggle>
            <h2 slot="navbar" className="text-l m-0">
                {currentTitle}
            </h2>

            <Suspense fallback={<Placeholder/>}>
                <Outlet/>
            </Suspense>
        </AppLayout>
    );
}
