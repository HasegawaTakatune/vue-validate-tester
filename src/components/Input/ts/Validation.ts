export type Rule = 'required' | 'alpha' | 'hiragana' | 'katakana' | 'numeric' | 'password' | 'max' | 'min' | string;

export default class Validation {

    private operation: Array<string> = [];
    private max: number = 0;
    private min: number = 0;

    private message: string | null = null;

    constructor(operation: Rule | Array<Rule>) {
        let op: Array<string> = []
        if (typeof operation === 'string') {
            op = operation.trim().split('|');
        } else if (Array.isArray(operation)) {
            op = operation;
        }
        this.attach(op);
    }

    private attach(operation: Array<string>): void {
        operation.forEach(op => {
            if (/^required$/.test(op) && (-1 === this.operation.indexOf('required'))) this.operation.push('required');
            if (/^alpha$/.test(op) && (-1 === this.operation.indexOf('alpha'))) this.operation.push('alpha');
            if (/^hiragana$/.test(op) && (-1 === this.operation.indexOf('hiragana'))) this.operation.push('hiragana');
            if (/^katakana$/.test(op) && (-1 === this.operation.indexOf('katakana'))) this.operation.push('katakana');
            if (/^numeric$/.test(op) && (-1 === this.operation.indexOf('numeric'))) this.operation.push('numeric');
            if (/^password$/.test(op) && (-1 === this.operation.indexOf('password'))) this.operation.push('password');

            if (/^max:[0-9]{1,4}$/.test(op) && (-1 === this.operation.indexOf('max'))) {
                const li = op.split(':');
                const num = parseInt(li[1]);
                this.max = num;
                this.operation.push('max');
            }

            if (/^min:[0-9]{1,4}$/.test(op) && (-1 === this.operation.indexOf('min'))) {
                const li = op.split(':');
                const num = parseInt(li[1]);
                this.min = num;
                this.operation.push('min');
            }
        })
    }

    public check(target: string | number): boolean | string {
        this.message = null;
        const value = target?.toString() ?? target;
        this.operation.forEach(op => {
            switch (op) {
                case 'required':
                    if (!this.required(value)) {
                        this.message = '必須入力です';
                        return false;
                    }
                    break;

                case 'alpha':
                    if (!this.alpha(value)) {
                        this.message = 'アルファベットのみ入力して下さい';
                        return false;
                    }
                    break;

                case 'hiragana':
                    if (!this.hiragana(value)) {
                        this.message = 'ひらがなのみ入力して下さい';
                        return false;
                    }
                    break;

                case 'katakana':
                    if (!this.katakana(value)) {
                        this.message = 'カタカナのみ入力して下さい';
                        return false;
                    }
                    break;

                case 'numeric':
                    if (!this.numeric(value)) {
                        this.message = '数値のみ入力して下さい';
                        return false;
                    }
                    break;

                case 'password':
                    if (!this.password(value)) {
                        this.message = '英数字・記号を含めた8文字以上で入力してください';
                        return false;
                    }
                    break;

                case 'max':
                    if (!this.maxLength(value, this.max)) {
                        this.message = `${this.max}文字以内で入力してください`;
                        return false;
                    }
                    break;

                case 'min':
                    if (!this.minLength(value, this.min)) {
                        this.message = `${this.min}文字以上で入力してください`;
                        return false;
                    }
                    break;

                default: break;
            }
        });

        return this.message ?? true;
    }

    private required(target: string): boolean {
        return 0 < target.length;
    }

    private alpha(target: string): boolean {
        return /^[a-zA-Z\s]{1,}$/.test(target);
    }

    private hiragana(target: string): boolean {
        return /^[ぁ-ん\s]{1,}$/.test(target);
    }

    private katakana(target: string): boolean {
        return /^[ァ-ヴ\s]{1,}$/.test(target);
    }

    private numeric(target: string): boolean {
        return /^[0-9]{1,}$/.test(target);
    }

    private password(target: string): boolean {
        return /^(?=.*[A-Z])(?=.*[.?/-])[a-zA-Z0-9.?/-]{8,24}$/.test(target);
    }

    private maxLength(target: string, len: number): boolean {
        return target.length <= len;
    }

    private minLength(target: string, len: number): boolean {
        return len <= target.length;
    }

}

