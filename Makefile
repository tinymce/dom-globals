OUTPUT=lib/main/ts/ephox/dom-globals/api
LIBDOM=node_modules/typescript/lib/lib.dom.d.ts
GENMODULE=gen/Main.js
GENMODULE_TYPES=gen/Main.d.ts
TSVERSION=$(shell npm view typescript version)

default: generateMain

setup:
	rm -rf lib gen
	mkdir -p ${OUTPUT}

makeExport:
	npx tsc
	node gen/makeModule.js > ${GENMODULE}
	node gen/makeTypeExports.js > ${GENMODULE_TYPES}

generateMain: setup makeExport
	cat src/prefix.txt ${LIBDOM} ${GENMODULE_TYPES} | grep -v '/// <reference' > ${OUTPUT}/Main.d.ts
	cp ${GENMODULE} ${OUTPUT}

injectVersion:
	sed -i -e "s/\$${TSVERSION}/${TSVERSION}/g" legal.txt

prePublish: generateMain injectVersion

postPublish:
	git checkout legal.txt