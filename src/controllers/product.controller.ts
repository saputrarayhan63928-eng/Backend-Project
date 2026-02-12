import { type Request, type Response } from "express";
import { ItemService } from "../services/product.service";
import { asyncHandler } from "../utils/async.handler";
import { successResponse } from "../utils/response";

export const getAllItems = asyncHandler(async (_req:Request,res:Response) =>{
    const Items = ItemService.getAll()
    return successResponse(res, 'Daftar Item', Items)
})

export const getItemById = asyncHandler(async(req:Request,res:Response) =>{
    const id = parseInt(req.params.id as string)
    const item = ItemService.getById(id)
    return successResponse(res, 'Item Ditemukan', item)
})

export const createItem = asyncHandler(async(req:Request,res:Response) =>{
    const item = ItemService.create(req.body)
    return successResponse(res, 'Item berhasil di tambahkan', item,null,201)
})

export const updateItem = asyncHandler(async(req:Request,res:Response) =>{
    const id = parseInt(req.params.id as string)
    const item = ItemService.update(id, req.body)
    return successResponse(res, 'Item Berhasil di Update', item)
})

export const deleteItem = asyncHandler(async(req:Request,res:Response) =>{
        const id = parseInt(req.params.id as string)
    const item = ItemService.delete(id)
    return successResponse(res, 'Item Berhasil di Hapus', item)
})

export const searchItem = asyncHandler(async(req:Request,res:Response) => {
    const {name, penulis} = req.query
    const items = ItemService.search(name as string, penulis as string)
    return successResponse(res, 'Hasil Pencarian', items) 
})