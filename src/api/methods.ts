import { instance } from ".";

export const getFiltersValue = {
    getVal() {
        return instance.get('/4985be39-cbea-4393-beef-2115868487ef', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}