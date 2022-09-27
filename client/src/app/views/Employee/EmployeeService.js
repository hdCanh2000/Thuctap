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

const getItem = (data) => {
    return axios.post(API_PATH + 'search', data)
}

const saveItem = (item) => {
    return axios.post(API_PATH, item)
}

const updateItem = (item) => {
    return axios.put(API_PATH + item.id, item)
}

const deleteItem = (item) => {
    return axios.delete(API_PATH + item.id)
}

const exportExcel = () => {
    return axios.get(API_PATH + 'excel/export')
}

export { getItem, saveItem, updateItem, deleteItem, exportExcel }