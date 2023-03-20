import Role from "Frontend/generated/cz/klecansky/recipedb/user/io/Role";
import User from "Frontend/generated/cz/klecansky/recipedb/user/io/User";
import {LOGIN_FAILURE, LOGIN_FETCH, LOGIN_SUCCESS, LOGOUT} from "Frontend/utils/security.utils";
import {AccessProps} from "Frontend/types/security.types";
import {IndexRouteObject, NonIndexRouteObject, useMatches} from "react-router-dom";

export type MenuProps = Readonly<{
    icon?: string;
    title?: string;
}>;

export type ViewMeta = Readonly<{ handle?: MenuProps & AccessProps }>;

export type Override<T, E> = Omit<T, keyof E> & E;

export type IndexViewRouteObject = Override<IndexRouteObject, ViewMeta>;
export type NonIndexViewRouteObject = Override<
    Override<NonIndexRouteObject, ViewMeta>,
    {
        children?: ViewRouteObject[];
    }
>;
export type ViewRouteObject = IndexViewRouteObject | NonIndexViewRouteObject;

export type RouteMatch = ReturnType<typeof useMatches> extends (infer T)[] ? T : never;

export type ViewRouteMatch = Readonly<Override<RouteMatch, ViewMeta>>;

export interface Option {
    readonly label: string;
    readonly value: string;
}