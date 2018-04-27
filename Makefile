OUTPUT=lib/main/ts/ephox/dom-globals/api

default:
	rm -rf lib
	mkdir -p ${OUTPUT}
	cat src/prefix.txt node_modules/typescript/lib/lib.dom.d.ts src/Main.js | grep -v '/// <reference' > ${OUTPUT}/Main.d.ts
	cp src/Main.js ${OUTPUT}

libdom:
	tsc
	node gen/makeModule.js