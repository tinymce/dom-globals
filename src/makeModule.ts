import * as ts from "typescript";

const LIBDOM = 'node_modules/typescript/lib/lib.dom.d.ts';

// TODO: This API can probably help us edit the libdom.d.ts file instead of using grep, cat and stdout redirect
const prog = ts.createProgram([LIBDOM], {});
const ast = prog.getSourceFile(LIBDOM);


// console.log("AST:" + util.inspect(ast));
// console.log("AST size:" + ast.statements.length);

// someone with typescript knowledge make this better please :)
type nameObject = { name: string, value: string };
const needExport: nameObject = {} as nameObject;

const declarationText = (node: ts.NamedDeclaration) => {
  switch (node.name.kind) {
    case ts.SyntaxKind.Identifier:
      const ident = (<ts.Identifier>node.name);
      return ident.escapedText as string;
    case ts.SyntaxKind.StringLiteral:
      const literal = (<ts.StringLiteral>node.name);
      return literal.text;
    case ts.SyntaxKind.NumericLiteral:
      const numliteral = (<ts.NumericLiteral>node.name);
      return literal.text;
  }
};

const iterateNodes = (node: ts.Node) => {
  switch (node.kind) {
    case ts.SyntaxKind.ClassDeclaration:
    case ts.SyntaxKind.InterfaceDeclaration:
    case ts.SyntaxKind.TypeAliasDeclaration:
    case ts.SyntaxKind.EnumDeclaration:
    case ts.SyntaxKind.ModuleDeclaration:
    case ts.SyntaxKind.NamespaceExportDeclaration:
    case ts.SyntaxKind.FunctionDeclaration:
    case ts.SyntaxKind.MethodDeclaration:
    case ts.SyntaxKind.PropertyDeclaration:
      let ident = declarationText(<ts.NamedDeclaration>node);
      needExport[ident] = ident;
      break;


    case ts.SyntaxKind.VariableStatement:
      // why doesn't forEachChild do this? I guess they do say the API may be unstable
      let statement = (<ts.VariableStatement>node);
      statement.declarationList.declarations.forEach((node: ts.VariableDeclaration) => {
        let ident = declarationText(<ts.NamedDeclaration>node);
        needExport[ident] = ident;
      });
      break;
  }
};

ts.forEachChild(ast, iterateNodes);

const exportList = Object.keys(needExport).join(',\n  ');
console.log(`export {
  ${exportList}
}`);