import { CryzenousConditionNode } from '@helpers/flowEditor/nodes/conditions.js';
import { CryzenousForLoopNode } from '@helpers/flowEditor/nodes/forLoop.js';
import { CryzenousFunctionNode } from '@helpers/flowEditor/nodes/function.js';
import { CryzenousForEachNode } from '@helpers/flowEditor/nodes/forEach.js';
import { CryzenousStartNode } from '@helpers/flowEditor/nodes/start.js';
import { CryzenousExitNode } from '@helpers/flowEditor/nodes/exit.js';
import { CryzenousEventNode } from '@helpers/flowEditor/nodes/event.js';


const generateArg = (argList) => Object.fromEntries(argList.map(arg => [arg, '']));

const funcNodeDeclaration = function(name, module, args_ = []) {
  return {
    name,
    module,
    base: class extends CryzenousFunctionNode {
      // eslint-disable-next-line no-unused-vars
      constructor(editor, args = {}, pos = {}) {
        super(editor, name, module, generateArg(args_), pos);
      }
    }
  };
};

function nodeDeclaration(name, module, constructor_) {
  return {
    name,
    module,
    base: constructor_
  };
}

export const Modules = {
  'Core': [
    nodeDeclaration('Condition', 'Core.Flow', CryzenousConditionNode),
    nodeDeclaration('ForLoop', 'Core.Flow', CryzenousForLoopNode),
    nodeDeclaration('ForEach', 'Core.Flow', CryzenousForEachNode),
    nodeDeclaration('Start', 'Core.Flow', CryzenousStartNode),
    nodeDeclaration('Exit', 'Core.Flow', CryzenousExitNode),
    nodeDeclaration('Event', 'Core.Flow', CryzenousEventNode),

  ],
  'IO': [
    funcNodeDeclaration('print', 'Core.IO', ['Message'])
  ]
};