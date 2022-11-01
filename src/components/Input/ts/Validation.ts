export default class Validation {

    options: Array<'alpha' | 'hiragana' | 'katakana'> = ['alpha']

    alpha = (target: string) => {
        const regexp = /^[a-zA-Z\s]{1,}$/;
    }

    hiragana = (target: string) => {
        const regexp = /^[ぁ-ん\s]{1,}$/;
    }

    katakana = (target: string) => {
        const regexp = /^[ァ-ヴ\s]{1,}$/;
    }

    numvers = (target: string) => {
        const regexp = /^[0-9]{1,}$/;
    }

    password = (target: string) => {
        const regexp = /^(?=.*[A-Z])(?=.*[.?/-])[a-zA-Z0-9.?/-]{8,24}$/;
    }

    maxLength = (target: string) => {

    }

    minLength = (target: string) => {

    }

}

