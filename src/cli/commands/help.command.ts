import chalk from 'chalk';
import { Command } from './command.interface.js';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
        ${chalk.blue('Программа для подготовки данных для REST API сервера')}.
        ${chalk.bgGreen('Пример:')}
        ${chalk.bgBlueBright('cli.js --<command> [--arguments]')}
        Команды:
            ${chalk.magenta('--version:')}                   # выводит номер версии
            ${chalk.magenta('--help:')}                      # печатает этот текст
            ${chalk.magenta('--import <path>:')}             # импортирует данные из TSV
            ${chalk.magenta('--generate <n> <path> <url>')}  # генерирует произвольное количество тестовых данных
    `);
  }
}
