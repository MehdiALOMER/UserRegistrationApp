import { ApiConstant } from "@/constants/apiConstant";
import { NetworkManager } from "@/utils/network/networkManager";

export class GlobalService {

    static async getAllCountries() {
        try {
            let response = await NetworkManager.get(ApiConstant.getAllCountries);
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    }

}   