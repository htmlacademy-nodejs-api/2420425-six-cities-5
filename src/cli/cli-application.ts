import { Command } from './comands/command.interface.js';

type CommandCollection = Record<string, Command>;

export class CLIApplication {
  private commands: CommandCollection = {};

  public registerCommands(commandsList: Command[]): void {
    commandsList.forEach((command) => {
      const commandName = command.getName();
      const isCommandRegistered = Object.hasOwn(this.commands, commandName);

      if (isCommandRegistered) {
        throw new Error(`Command ${commandName} is already registered`);
      }

      this.commands[commandName] = command;
    });
  }
}
