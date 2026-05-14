export type valueof<T extends object> = T[keyof T];

export type stringToType<T extends string> = T;

export type TConfigCreator<T extends object> = {
  [K in keyof T]: T[K] | ((data: T) => T[K]);
};

export type IfAny<T$1, Y, N> = 0 extends 1 & T$1 ? Y : N;

export type TypedMap<T extends string, S = T> = {
  [K in T]?: S;
};
