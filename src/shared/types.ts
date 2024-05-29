type SetStateAction<S> = S | ((prevState: S) => S);
type Dispatch<A> = (value: A) => void;

// The type of a state setter function for a state of type S
export type SetState<S> = Dispatch<SetStateAction<S>>;