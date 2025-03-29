import { CryzenousNodeDeclaration } from '../models/CryzenousNodeDeclaration.js';

export const Modules = {
  'Core.std': {
    'Print': new CryzenousNodeDeclaration(
      'Print',
      ['messages']
    ),
    'Alert': new CryzenousNodeDeclaration(
      'Alert',
      ['messages']
    ),

  }
};