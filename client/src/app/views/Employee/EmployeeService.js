import axios from "axios";
import ConstantList from "../../appConfig";

const API_PATH = ConstantList.API_ENPOINT + "/employees/";

export const getProvinces = (data) => {
    return axios.post(ConstantList.API_ENPOINT + '/provinces/' + 'search', data)
}

export const getDistricts = (data) => {
    return axios.post(ConstantList.API_ENPOINT + '/districts/' + 'search', data)
}

export const getCommunes = (data) => {
    return axios.post(ConstantList.API_ENPOINT + '/communes/' + 'search', data)
}

export const getItem = (data) => {
    return axios.post(API_PATH + 'search', data)
}

export const saveItem = (item) => {
    return axios.post(API_PATH, item)
}

export const updateItem = (item) => {
    return axios.put(API_PATH + item.id, item)
}

export const deleteItem = (item) => {
    return axios.delete(API_PATH + item.id)
}

export const exportExcel = () => {
    return axios.get(API_PATH + 'excel/export')
}
