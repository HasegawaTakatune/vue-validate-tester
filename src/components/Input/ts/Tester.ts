import Validation from "./Validation";

// 実行対象の名前とインスタンス
interface Operation {
    label: string;
    instance: Validation;
}

// 実行結果の詳細
export interface ResultCase {
    inputed: string; // 入力内容
    result: boolean | string; // チェック結果
}

// 実行結果
export interface Result {
    label: string; // テスト対象のラベル
    cases: Array<ResultCase>; // テストケースリスト
}

export default class Tester {

    // テスト対象のリスト
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

    // バリデーションチェック
    public async check(cases: Array<string>) {
        return await this._check(cases);
    }

    // バリデーションチェック
    private _check(cases: Array<string>) {
        const results: Array<Result> = [];

        // テスト対象ループ
        for (let i = 0; i < this.operations.length; i++) {
            const resultCases: Array<ResultCase> = [];

            // テストルールインスタンス取得
            const instance: Validation = this.operations[i].instance;

            // テストケースループ
            for (let j = 0; j < cases.length; j++) {
                // テストチェック
                const result: boolean | string = instance.check(cases[j]);

                // テストケースを格納
                resultCases.push({ inputed: cases[j], result: result });
            }

            // 一連のテスト結果を格納
            results.push({ label: this.operations[i].label, cases: resultCases });
        }

        return results;
    }
}