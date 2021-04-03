"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpCommand = void 0;
const BaseCommand_1 = require("../BaseCommand");
class HelpCommand extends BaseCommand_1.BaseCommand {
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.kernel.printHelp();
        });
    }
}
exports.HelpCommand = HelpCommand;
HelpCommand.commandName = 'help';
HelpCommand.description = 'See help for all the commands';
