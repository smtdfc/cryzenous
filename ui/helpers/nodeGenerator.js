import { CryzenousNode } from "../models/CryzenousNode.js";
import { CryzenousNodeArgument } from "../models/CryzenousNodeArgument.js"; 

export class CryzenousNodeGenerator {
  static generateFromDeclaration(module, declaration) {
    if (!module || !declaration || !declaration.inputs) {
      throw new Error("Invalid module or declaration");
    }
    
    let args = declaration.inputs.map((input) => new CryzenousNodeArgument(input, ""));
    return new CryzenousNode(declaration.name, module, args);
  }
}