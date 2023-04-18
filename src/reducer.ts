interface State {
    value: string
}
interface Action {
    payload: string
}
export const reducer = (state: State, action: Action): State => {
    return state;
}