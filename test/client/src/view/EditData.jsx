import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from "react-router"
import { useMutation, useQuery } from "react-query"
import { Link } from 'react-router-dom'
import { API } from "../config/api"

function EditData() {
  const navigate = useNavigate()
  const { id } = useParams()
  
 let { data: dataMotor,refetch } = useQuery('editCache', async () => {
    const response = await API.get('/motor/' + id);
    return response.data.data
  });

  const [edit, setEdit] = useState({})
  const [formEdit,setFormEdit] = useState({
    id_register: "",
    name: "",
    address: "",
    brand: "",
    production_year: "",
    cylinder_capacity: "",
    color: "",
    fuel: "",
  })

  useEffect(() => {
    setFormEdit({
      id_register: dataMotor?.id_register,
      name: dataMotor?.name,
      address: dataMotor?.address,
      brand: dataMotor?.brand,
      production_year: dataMotor?.production_year,
      cylinder_capacity: dataMotor?.cylinder_capacity,
      color: dataMotor?.color,
      fuel: dataMotor?.fuel,
    })
  }, [dataMotor])

   

  const handleChange = (e) => {
    setFormEdit({...formEdit, [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value});
  };


  const handleSubmit = useMutation(
    async (e) => {
      try{
        e.preventDefault()

        const formData = new FormData()
        formData.set("id_register", formEdit.id_register)
        formData.set("name", formEdit.name)
        formData.set("address", formEdit.address)
        formData.set("brand", formEdit.brand)
        formData.set("production_year", formEdit.production_year)
        formData.set("cylinder_capacity", formEdit.cylinder_capacity)
        formData.set("color", formEdit.color)
        formData.set("fuel", formEdit.fuel)

        const response = await API.patch(
          "/motor/" + id,
          formData
        )
        alert("Data Berhasil Diubah");
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
      <h2 className="mt-10 font-bold font-avanir text-2xl mb-8"> Edit Data Kendaraan</h2>
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
                value={formEdit.id_register}
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
                value={formEdit?.production_year}
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
                value={formEdit?.name}
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
                value={formEdit?.cylinder_capacity}
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
                value={formEdit?.brand}
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
                value={formEdit?.color}
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
                value={formEdit?.address}
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
                value={formEdit?.fuel}
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

export default EditData