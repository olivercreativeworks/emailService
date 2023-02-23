import { Maybe, UnwrapMaybe } from "../Monads/Maybe"

export type UnwrapProps<WrappedProp> = {
    [x in keyof WrappedProp] : WrappedProp[x] extends Maybe<unknown> ? UnwrapMaybe<WrappedProp[x]> : WrappedProp[x]
}
export type OptionalProps<TypeWithMaybeProps> = Partial<UnwrapProps<TypeWithMaybeProps>>