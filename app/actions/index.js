export const ADD_STATEMENT = 'ADD_STATEMENT';
export const CLEAR_STATEMENT = 'CLEAR_STATEMENT';
export const LANGUAGE_SELECTED = 'LANGUAGE_SELECTED';
export const AUTOSCROLL_TOGGLED = 'AUTOSCROLL_TOGGLED';

export function addStatement(statement) {
    return {
        type: ADD_STATEMENT,
        statement
    };
}

export function clearStatements() {
    return { type: CLEAR_STATEMENT };
}

export function languageSelected(language) {
    return {
        type: LANGUAGE_SELECTED,
        language
    };
}

export function toggleAutoScroll(bool) {
    return {
        type: AUTOSCROLL_TOGGLED,
        autoScroll: !bool
    };
}