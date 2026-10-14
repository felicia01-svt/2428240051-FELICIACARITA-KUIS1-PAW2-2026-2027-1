import mongoose from "mongoose";
import AlatMusikModel from "../model/alatMusik.model.js";
import { StoreAlatMusikSchema, UpdateAlatMusikSchema } from "../schemas/alatMusik.schema.js";
import { apiResponse, apiResponseValidation } from "../utils/response.js";

class AlatMusikController {
  static async index(req, res) {
    const listAlatMusik = await AlatMusikModel.find();
    return apiResponse({
      res,
      status: 200,
      message: "Daftar alat musik",
      data: listAlatMusik,
    })
  }

 
  static async show(req, res) {
    const alatMusikId = req.params.id;

    if (!mongoose.isValidObjectId(alatMusikId)) {
      return apiResponse({
        res,
        status: 400,
        message: "ID alat musik tidak valid",
        data: null,
      });
    }

    const alatMusik = await AlatMusikModel.findById(alatMusikId);

    if (!alatMusik) {
      return apiResponse({
        res,
        status: 404,
        message: "Data alat musik tidak ditemukan",
        data: null,
      });
    }

    return apiResponse({ res, status: 200, message: "Detail alat musik", data: alatMusik });
  }


  static async store(req, res) {
    const result = StoreAlatMusikSchema.safeParse(req.body);

    if (!result.success) {
      return apiResponseValidation({
        res,
        errors: result.error,
      })
    }

    const { nama_alat, jenis_alat, harga } = req.body;

    const newAlatMusik = await AlatMusikModel.create({ nama_alat, jenis_alat, harga });
    return apiResponse({res, status: 201, message: "Data alat musik berhasil ditambahkan", data: newAlatMusik });
  }

  static async update(req, res) {
    const alatMusikId = req.params.id;
    if (!mongoose.isValidObjectId(alatMusikId)) {
        return apiResponse({res,status: 400,message: "ID alat musik tidak valid",data: null,});
    }

    const result = UpdateAlatMusikSchema.safeParse(req.body);

    if (!result.success) {
      return apiResponseValidation({
        res,
        errors: result.error,
      })
    }

    const { nama_alat, jenis_alat, harga } = req.body;

    const exists = await AlatMusikModel.exists({ _id: alatMusikId });
    if (!exists) {
      return apiResponse({ res, status: 404, message: "Data alat musik tidak ditemukan", data: null });
    }

    const updateAlatMusik = await AlatMusikModel.findOneAndUpdate(
      { _id: alatMusikId },
      { nama_alat, jenis_alat, harga },
      { new: true}
    );

    return apiResponse({ 
      res, 
      status: 200, 
      message: "Data alat musik berhasil diperbarui", 
      data: updateAlatMusik 
    });
  }

  static async delete(req, res) {
    const alatMusikId = req.params.id;
    if (!mongoose.isValidObjectId(alatMusikId)) {
        return apiResponse({res,status: 400,message: "ID alat musik tidak valid",data: null,});
    }

    const exists = await AlatMusikModel.exists({ _id: alatMusikId });
    if (!exists) {
      return apiResponse({ res, status: 404, message: "Data alat musik tidak ditemukan", data: null });
    }

    await AlatMusikModel.findOneAndDelete({ _id: alatMusikId });
    return apiResponse({ 
      res, 
      status: 200, 
      message: "Data alat musik berhasil dihapus", 
      data: null 
    });
  }
}

export default AlatMusikController;
