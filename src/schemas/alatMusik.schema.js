
import z from 'zod';

export const StoreAlatMusikSchema = z.object({
  nama_alat: z.string().trim().min(1, "Nama alat wajib diisi"),
  jenis_alat: z.string().trim().min(1, "Jenis alat wajib diisi"),
  harga: z.number().nonnegative("Harga tidak boleh negatif")
})

export const UpdateAlatMusikSchema = z.object({
  nama_alat: z.string().trim().min(1, "Nama alat wajib diisi"),
  jenis_alat: z.string().trim().min(1, "Jenis alat wajib diisi"),
  harga: z.number().nonnegative("Harga tidak boleh negatif")
})

