import { CryzenousConditionNode } from '@helpers/flowEdit/nodes/conditions.js';
import { CryzenousFunctionNode } from '@helpers/flowEdit/nodes/function.js';

const generateArg = (argList) => Object.fromEntries(argList.map(arg => [arg, ""]));

const funcNodeDeclaration = function(name, module, args = []) {
  return {
    name,
    module,
    base: class extends CryzenousFunctionNode {
      constructor(editor, args = {}, pos = {}) {
        super(editor, name, modules, generateArg(declaration.arg), pos);
      }
    }
  };
}

function nodeDeclaration(name, module, constructor_) {
  return {
    name,
    module,
    base: constructor_
  }
}

export const Modules = {
  'Core': [
    nodeDeclaration("Condition", "Core.Flow", CryzenousConditionNode),
  ],
  'IO': [
    funcNodeDeclaration("print", "Core.IO", ["Message"])
  ]
};