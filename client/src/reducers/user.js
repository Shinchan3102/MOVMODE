const initialisation = {
    user: null,
    listFavorites: [],
    isLoading: false,
    isRegister: false,
    isDark: true,
};

const reducerAuth = (state = initialisation, action) => {
    switch (action.type) {
        case 'DARK':
            return {...state, isDark: true};
        case 'LIGHT':
            return {...state,isDark: false};
        case 'REG':
            return { ...state, isRegister: true };
        case 'REM_REG':
            return { ...state, isRegister: false };
        case 'START_LOADING':
            return { ...state, isLoading: true };
        case 'END_LOADING':
            return { ...state, isLoading: false };
        case 'AUTH':
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, user: action?.data };
        case 'FAV_ADD':
            return { ...state, listFavorites: [...state.listFavorites, action?.data] };
        case 'FAV_REMOVE':
            const { mediaId } = action?.data;
            return { ...state, listFavorites: state.listFavorites.filter(e => e.mediaId !== mediaId) };
        case 'FAV_SETLIST':
            return { ...state, listFavorites: action?.data };
        case 'LOGOUT':
            localStorage.clear();
            return { ...state, user: null };
        default:
            // localStorage.clear();
            return state;
    }
}

export default reducerAuth;