import { Student, ListResponse, ListParams } from 'models';
import axiosClient from './axiosClient';

const studentApi = {
    async getAll(params: ListParams): Promise<ListResponse<Student>> {
        const url = '/students';
        return await axiosClient.get(url, { params });
    },
    async get(id: string): Promise<Student> {
        const url = `/students/${id}`;
        return await axiosClient.get(url);
    },
    async add(data: Student): Promise<ListResponse<Student>> {
        const url = '/students';
        return await axiosClient.post(url, data);
    },
    async update(id: string, data: Student): Promise<Student> {
        const url = `/students/${id}`;
        return await axiosClient.patch(url, data);
    },
    async remove(id: string): Promise<any> {
        const url = `/students/${id}`;
        return await axiosClient.delete(url);
    },
};

export default studentApi;
