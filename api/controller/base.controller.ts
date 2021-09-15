export class BaseController {

    respond(data: any, code?: number) {

        const newData = Object.assign({}, data);
        newData.response = {
            status: code || 200
        }

        return newData;
    }

}