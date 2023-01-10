import React, {useState} from 'react'
import { useNavigate, Link } from "react-router-dom"
import { useMutation} from "react-query"
import { API } from '../config/api'

function AddData() {

  const [form,setForm] = useState({
    id_register: "",
    name: "",
    address: "",
    brand: "",
    production_year: "",
    cylinder_capacity: "",
    color: "",
    fuel: "",
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === 'file' ? e.target.files : e.target.value,
    });
  }

  const handleSubmit = useMutation(
    async (e) => {
      try{
        e.preventDefault()

        const formData = new FormData()
        formData.set("id_register", form.id_register)
        formData.set("name", form.name)
        formData.set("address", form.address)
        formData.set("brand", form.brand)
        formData.set("production_year", form.production_year)
        formData.set("cylinder_capacity", form.cylinder_capacity)
        formData.set("color", form.color)
        formData.set("fuel", form.fuel)

        const response = await API.post("/motor", formData)
        console.log("ini data",response.data.data)
        alert("Data Berhasil Ditambah");
        navigate("/")
      }catch(error){
        console.log(error)
        alert("Failed Add Category");
      }
    }
  )

  return (
    <>
    <div className="w-4/5 m-auto ">
      <h2 className="mt-10 font-bold font-avanir text-2xl mb-8"> Tambah Data Kendaraan</h2>
      <form className=' border border-2 border-slate-400 rounded-sm p-10 mb-40'
        onSubmit={(e) => handleSubmit.mutate(e)}
      >
        <div className="flex">
          <div className='mx-5'>
            <span className='font-bold font-avanir'>No. Registrasi Kendaraan</span>
            <div className="relative mt-1 rounded-xl ">
              <input
                type="text"
                className="w-80 font-avanir shadow-sm outline-slate-500 rounded-sm border border-slate-400 pl-2 py-1 font-sans mt-2 pr-5 focus:border-orange-400 focus:ring-orange-400 sm:text-sm"
                name='id_register'
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='mx-10'>
            <span className='font-bold font-avanir'>Tahun Pembuatan</span>
            <div className="relative mt-1 rounded-xl ">
              <input
                type="number"
                className="w-80 font-avanir shadow-sm outline-slate-500 rounded-sm border border-slate-400 pl-2 py-1 font-sans mt-2 pr-5 focus:border-orange-400 focus:ring-orange-400 sm:text-sm"
                onChange={handleChange}
                name="production_year"
              />
            </div>
          </div>
        </div>

        <div className="flex mt-8">
          <div className='mx-5'>
            <span className='font-bold font-avanir'>Nama Pemilik</span>
            <div className="relative mt-1 rounded-xl ">
              <input
                type="text"
                className="w-80 font-avanir shadow-sm outline-slate-500 rounded-sm border border-slate-400 pl-2 py-1 font-sans mt-2 pr-5 focus:border-orange-400 focus:ring-orange-400 sm:text-sm"
                onChange={handleChange}
                name="name"
             />
            </div>
          </div>
          <div className='mx-10'>
            <span className='font-bold font-avanir'>Kapasitas Silinder</span>
            <div className="relative mt-1 rounded-xl ">
              <input
                type="number"
                className="w-80 font-avanir shadow-sm outline-slate-500 rounded-sm border border-slate-400 pl-2 py-1 font-sans mt-2 pr-5 focus:border-orange-400 focus:ring-orange-400 sm:text-sm"
                onChange={handleChange}
                name="cylinder_capacity"
             />
            </div>
          </div>
        </div>

        <div className="flex mt-8">
          <div className='mx-5'>
            <span className='font-bold font-avanir'>Merk Kendaraan</span>
            <div className="relative mt-1 rounded-xl ">
              <input
                type="text"
                className="w-80 font-avanir shadow-sm outline-slate-500 rounded-sm border border-slate-400 pl-2 py-1 font-sans mt-2 pr-5 focus:border-orange-400 focus:ring-orange-400 sm:text-sm"
                onChange={handleChange}
                name="brand"
              />
            </div>
          </div>
          <div className='mx-10'>
            <span className='font-bold font-avanir'>Warna Kendaraan</span>
            <div className="relative mt-1 rounded-xl ">
            <select
                className="w-80 font-avanir shadow-sm outline-slate-500 rounded-sm border border-slate-400 pl-2 py-1 font-sans mt-2 pr-5  sm:text-sm"
                name="color"
                onChange={handleChange}
              >
                <option value="">Warna Kendaraan</option>
                <option value={"merah"}>Merah</option>
                <option value={"hitam"}>Hitam</option>
                <option value={"biru"}>Biru</option>
                <option value={"abu-abu"}>Abu-abu</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex mt-8 mb-10">
          <div className='mx-5'>
            <span className='font-bold font-avanir'>Alamat Pemilik Kendaraan</span>
            <div className="relative mt-1 rounded-xl ">
            <textarea class=" w-80 font-avanir shadow-sm outline-slate-500 rounded-sm border border-slate-400 pl-2 py-1 font-sans mt-2 pr-5 focus:border-orange-400 focus:ring-orange-400 sm:text-sm " id="exampleFormControlTextarea1" rows="3"
                placeholder="Alamat Lengkap"
                onChange={handleChange}
                name="address"
              >
              </textarea>
            </div>
          </div>
          <div className='mx-10'>
            <span className='font-bold font-avanir'>Bahan Bakar</span>
            <div className="relative mt-1 rounded-xl ">
              <input
                type="text"
                className="w-80 font-avanir shadow-sm outline-slate-500 rounded-sm border border-slate-400 pl-2 py-1 font-sans mt-2 pr-5 focus:border-orange-400 focus:ring-orange-400 sm:text-sm"
                onChange={handleChange}
                name="fuel"
              />
            </div>
          </div>
        </div>
        
        <div className=' float-left flex mt-[-10px] ml-[-10px]'>
          <button className='bg-blue-400 p-1 mt-[-5px] mx-8 text-white font-avanir rounded-md w-36 hover:bg-blue-500'
            type='submit'
          >Simpan</button>
          <Link to="/">
          <span className='bg-gray-400 px-10 mt-[3px] py-[7px] text-center text-white font-avanir rounded-md w-36 hover:bg-gray-500'>Kembali</span>
          </Link>
        </div>
      </form>
    </div>
    </>
  )
}

export default AddData