import { type item, items } from "../models/product.model";

export class ItemService {
    static  getAll(): item[] {
        return items
    }

    static getById(id: number): item {
        const item = items.find(i => i.id === id)
        if(!item) throw new Error('Buku dengan ID tersebut tidak ditemukan')
            return item
    }

    static create(data: {nama: string; penulis: string; rilis: string; stock: number}): item {
        const newItem = {
            id: items.length + 1,
            ...data
        }
        items.push(newItem)
        return newItem
    }
    static update(id: number, data: Partial<item>): item {
        const index = items.findIndex(i => i.id === id)
        if(index === -1) throw new Error('Buku Tidak Ditemukan!')
        items[index] = {...items[index], ...data} as item
        return items[index]
    }
    static delete(id:number): item {
        const index = items.findIndex(i => i.id === id)
        if(index === -1) throw new Error('Buku Tidak Ditemukan!')
        return items.splice(index, 1)[0]!
    }
    static search(name?:string, penulis?:string) : item[] {
        let result = items
        if(name) {
            result = result.filter(i => i.nama.toLowerCase().includes(name.toLowerCase()))
        }
        if(penulis){
            result = result.filter(i => i.penulis.toLowerCase().includes(penulis.toLowerCase()))
        }
        return result
    }
}