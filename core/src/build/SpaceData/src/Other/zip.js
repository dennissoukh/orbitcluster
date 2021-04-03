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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zip = void 0;
const adm_zip_1 = __importDefault(require("adm-zip"));
function zip(stream) {
    return __awaiter(this, void 0, void 0, function* () {
        const zip = new adm_zip_1.default(stream);
        const zipEntries = zip.getEntries();
        zipEntries.forEach((entry) => {
            console.log(zip.readAsText(entry));
        });
    });
}
exports.zip = zip;
