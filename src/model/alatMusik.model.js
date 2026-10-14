
import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    nama_alat: {
      type: String,
      required: true,
      trim: true,
    },
    jenis_alat: {
      type: String,
      required: true,
      trim: true,
    },
    harga: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const AlatMusikModel = mongoose.model("AlatMusik",schema,"alat_musik");

export default AlatMusikModel;
