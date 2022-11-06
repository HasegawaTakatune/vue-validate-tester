import Validation from "./Validation";

interface Operation {
    label: string;
    instance: Validation;
}

export interface ResultCase {
    inputed: string;
    result: boolean | string;
}

export interface Result {
    label: string;
    cases: Array<ResultCase>;
}

export default class Tester {

    private operations: Array<Operation> = [
        { label: "required", instance: new Validation("required") },
        { label: "alphabet", instance: new Validation("alpha") },
        { label: "ひらがな", instance: new Validation("hiragana") },
        { label: "カタカナ", instance: new Validation("katakana") },
        { label: "numeric", instance: new Validation("numeric") },
        { label: "password", instance: new Validation("password") },
        { label: "max:5", instance: new Validation("max:5") },
        { label: "min:4", instance: new Validation("min:4") },
    ];

    constructor() { }

    public async check(cases: Array<string>) {
        return await this._check(cases);
    }

    private _check(cases: Array<string>) {
        const results: Array<Result> = [];

        for (let i = 0; i < this.operations.length; i++) {
            const resultCases: Array<ResultCase> = [];

            for (let j = 0; j < cases.length; j++) {
                const instance: Validation = this.operations[i].instance;
                const result: boolean | string = instance.check(cases[j]);

                resultCases.push({ inputed: cases[j], result: result });
            }

            results.push({ label: this.operations[i].label, cases: resultCases });
        }

        return results;
    }
}