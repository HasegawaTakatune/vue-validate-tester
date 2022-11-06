// バリデーションルール一覧
export type Rule = 'required' | 'alpha' | 'hiragana' | 'katakana' | 'numeric' | 'password' | 'max' | 'min' | string;

export default class Validation {

    // 処理リスト
    private operation: Array<string> = [];
    // 最大文字数
    private max: number = 0;
    // 最小文字数
    private min: number = 0;

    // 結果メッセージ
    private message: string | null = null;

    // 初期化
    constructor(operation: Rule | Array<Rule>) {
        let op: Array<string> = []
        if (typeof operation === 'string') {
            // 文字列なら区切りから切り分けて、処理リストを抽出
            op = operation.trim().split('|');
        } else if (Array.isArray(operation)) {
            // 配列ならそのまま処理リストに格納
            op = operation;
        }
        // 処理の整合性チェック
        this.attach(op);
    }

    // 処理リストの成形/格納
    private attach(operation: Array<string>): void {
        operation.forEach(op => {
            // 必須処理
            if (/^required$/.test(op) && (-1 === this.operation.indexOf('required'))) this.operation.push('required');
            // アルファベット処理
            if (/^alpha$/.test(op) && (-1 === this.operation.indexOf('alpha'))) this.operation.push('alpha');
            // ひらがな処理
            if (/^hiragana$/.test(op) && (-1 === this.operation.indexOf('hiragana'))) this.operation.push('hiragana');
            // カタカナ処理
            if (/^katakana$/.test(op) && (-1 === this.operation.indexOf('katakana'))) this.operation.push('katakana');
            // 数値処理
            if (/^numeric$/.test(op) && (-1 === this.operation.indexOf('numeric'))) this.operation.push('numeric');
            // パスワード処理
            if (/^password$/.test(op) && (-1 === this.operation.indexOf('password'))) this.operation.push('password');

            // 最大文字数処理
            if (/^max:[0-9]{1,4}$/.test(op) && (-1 === this.operation.indexOf('max'))) {
                // 文字数を別途抽出する
                const li = op.split(':');
                const num = parseInt(li[1]);
                this.max = num;
                this.operation.push('max');
            }

            // 師匠文字数処理
            if (/^min:[0-9]{1,4}$/.test(op) && (-1 === this.operation.indexOf('min'))) {
                // 文字数を別途抽出する
                const li = op.split(':');
                const num = parseInt(li[1]);
                this.min = num;
                this.operation.push('min');
            }
        })
    }

    // バリデーションチェック
    public check(target: string | number): string {
        this.message = null;
        const value = target?.toString() ?? target;

        // 処理リストループで順次実行する
        this.operation.forEach(op => {
            switch (op) {

                case 'required':// 必須チェック
                    if (!this.required(value)) {
                        this.message = '必須入力です';
                        return false;
                    }
                    break;

                case 'alpha':// アルファベットチェック
                    if (!this.alpha(value)) {
                        this.message = 'アルファベットのみ入力して下さい';
                        return false;
                    }
                    break;

                case 'hiragana':// ひらがなチェック
                    if (!this.hiragana(value)) {
                        this.message = 'ひらがなのみ入力して下さい';
                        return false;
                    }
                    break;

                case 'katakana':// カタカナチェック
                    if (!this.katakana(value)) {
                        this.message = 'カタカナのみ入力して下さい';
                        return false;
                    }
                    break;

                case 'numeric':// 数値チェック
                    if (!this.numeric(value)) {
                        this.message = '数値のみ入力して下さい';
                        return false;
                    }
                    break;

                case 'password':// パスワードチェック
                    if (!this.password(value)) {
                        this.message = '英数字・記号を含めた8文字以上で入力してください';
                        return false;
                    }
                    break;

                case 'max':// 最大文字数チェック
                    if (!this.maxLength(value, this.max)) {
                        this.message = `${this.max}文字以内で入力してください`;
                        return false;
                    }
                    break;

                case 'min':// 最小文字数チェック
                    if (!this.minLength(value, this.min)) {
                        this.message = `${this.min}文字以上で入力してください`;
                        return false;
                    }
                    break;

                default: break;
            }
        });

        return this.message ?? '';
    }

    // 必須チェック
    private required(target: string): boolean {
        return 0 < target.length;
    }
    // アルファベットチェック
    private alpha(target: string): boolean {
        return /^[a-zA-Z\s]{1,}$/.test(target);
    }
    // ひらがなチェック
    private hiragana(target: string): boolean {
        return /^[ぁ-ん\s]{1,}$/.test(target);
    }
    // カタカナチェック
    private katakana(target: string): boolean {
        return /^[ァ-ヴ\s]{1,}$/.test(target);
    }
    // 数値チェック
    private numeric(target: string): boolean {
        return /^[0-9]{1,}$/.test(target);
    }
    // パスワードチェック
    private password(target: string): boolean {
        return /^(?=.*[A-Z])(?=.*[.?/-])[a-zA-Z0-9.?/-]{8,24}$/.test(target);
    }
    // 最大文字数チェック
    private maxLength(target: string, len: number): boolean {
        return target.length <= len;
    }
    // 最小文字数チェック
    private minLength(target: string, len: number): boolean {
        return len <= target.length;
    }

}

