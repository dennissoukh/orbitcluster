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
exports.Neuron = void 0;
const App_1 = require("./App");
/**
 * Expose the API to execute Neuron commands
 */
class Neuron {
    constructor(fastify, appRoot) {
        this.fastify = fastify;
        this.appRoot = appRoot;
    }
    /**
     * Handle the provided Neuron command
     */
    handle(argv) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Proxy over to the Neuron package
             */
            yield new App_1.App(this.fastify, this.appRoot).handle(argv);
        });
    }
}
exports.Neuron = Neuron;
