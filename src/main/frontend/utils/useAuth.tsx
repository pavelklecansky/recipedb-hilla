import {createContext, useEffect, useReducer} from 'react';
import {AccessProps, Authentication, AuthState} from '../types/security.types';
import {createAuthenticateThunk, createUnauthenticateThunk, reducer} from './security.utils';

const initialState: AuthState = {
    initializing: true,
    loading: false,
};

export function useAuth(): Authentication {
    const [state, dispatch] = useReducer(reducer, initialState);
    const authenticate = createAuthenticateThunk(dispatch);
    const unauthenticate = createUnauthenticateThunk(dispatch);

    useEffect(() => {
        authenticate();
    }, []);

    return {
        state,
        authenticate,
        unauthenticate,
        hasAccess({handle}: { handle?: AccessProps }): boolean {
            const requiresAuth = handle?.requiresLogin || handle?.rolesAllowed;
            if (!requiresAuth) {
                return true;
            }

            if (!state.user) {
                return false;
            }

            if (handle.rolesAllowed) {
                return handle.rolesAllowed.some((allowedRole) => state.user!.roles.includes(allowedRole));
            }

            return true;
        },
    };
}

export const AuthContext = createContext<Authentication>({
    state: initialState,
    async authenticate() {
    },
    unauthenticate() {
    },
    hasAccess({handle}: { handle?: AccessProps }): boolean {
        return !handle?.requiresLogin && !handle?.rolesAllowed;
    },
});
