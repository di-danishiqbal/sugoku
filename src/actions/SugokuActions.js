const generateUrl = 'https://vast-chamber-17969.herokuapp.com/generate';
const solveUrl = 'https://sugoku.herokuapp.com/solve';
const validateUrl = 'https://sugoku.herokuapp.com/validate';

export class SugouActions {

    static fetchGridData = async (options) => {
        let url = `${generateUrl}?${options}`;
        let res = await fetch(url);
        return res.json();
    }

    static solvePuzzle = async (payload) => {
        return await this.postGrid(solveUrl, payload);

    }

    static validateGrid = async (payload) => {
        return await this.postGrid(validateUrl, payload);

    }


    static fetchGridDataWithOptions = (options) => {
        let queryParams = '';
        for (const [key, value] of Object.entries(options)) {
            queryParams = !queryParams ? `${key}=${value}` : `${queryParams}&${key}=${value}`;
        }
        return this.fetchGridData(queryParams);
    }


    static async postGrid(url, payload) {
        const formData = new FormData();
        formData.append('board', JSON.stringify(payload))
        const res = await fetch(url, {
            method: 'post',
            body: formData
        });
        return await res.json();
    }


}