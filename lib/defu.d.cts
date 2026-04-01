import type { Defu, DefuInstance, DefuFn } from "../dist/defu.mts";

declare const defuProxy: DefuInstance & {
	Defu: Defu<any, any>;
	default: DefuInstance;
	defu: DefuInstance;
	createDefu: typeof import("../dist/defu.mts").createDefu;
	defuFn: DefuFn;
	defuArrayFn: DefuFn;
};

export = defuProxy;
