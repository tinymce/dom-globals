OUTPUT=lib/main/ts/ephox/dom-globals/api
LIBDOM=node_modules/typescript/lib/lib.dom.d.ts
GENMODULE=gen/Main.js

default: setup makeExport
	cat src/prefix.txt ${LIBDOM} ${GENMODULE} | grep -v '/// <reference' > ${OUTPUT}/Main.d.ts
	cp ${GENMODULE} ${OUTPUT}

setup:
	rm -rf lib
	mkdir -p ${OUTPUT}

makeExport:
	tsc
	node gen/makeModule.js > ${GENMODULE}