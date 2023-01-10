import React, {useState, useEffect} from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { useMutation } from 'react-query';
import { API } from '../config/api'
import Delete from '../components/Delete';
import { useNavigate } from "react-router-dom"

function Monitoring() {
  const [idDelete, setIdDelete] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [dataId, setDataId] = useState();

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [result, setResult] = useState([]);

  const handleDelete = (id) => {
    setIdDelete(id)
    handleShow()
  }

  const [form, setForm] = useState({
    id_register: "",
    name: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate()
  
  const handleSearch = async (e) => {
    e.preventDefault();
    const request = form;
    const respone = await API.post("/filter", request);
    const data = respone.data.data
    setResult({...result, data})
  };
  

  let { data: motors, refetch } = useQuery("motorCaches",
    async() => {
      const response = await API.get("/motors")
      return response.data.data
    })

    const deleteById = useMutation(async (id) => {
      try {
        await API.delete(`/motor/${id}`)
        refetch()
      } catch (error) {
        console.log(error)
      }
    })

    useEffect(() => {
      if (confirmDelete) {
        handleClose()
        deleteById.mutate(idDelete)
        setConfirmDelete(null)
      }
    }, [confirmDelete])

  
  return (
    <>
    <form className="w-4/5 m-auto">
      <h2 className="mt-14 font-bold font-avanir text-2xl mb-8">Data Kendaraan</h2>
      <div className='bg-orange-200 border border-orange-400 rounded-sm p-8'>
        <div>
          <span className='font-bold font-avanir'>No. Registrasi</span>
          <div className="relative mt-1 rounded-md ">
            <input
              type="text"
              className="w-80 font-avanir shadow-sm outline-orange-400 rounded-sm border-orange-400 pl-2 py-2 font-sans mt-2 pr-5 focus:border-orange-400 focus:ring-orange-400 sm:text-sm"
              name="id_register"
              // value={id_register}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='mt-10'>
          <span className='font-bold font-avanir'>Nama Pemilik</span>
          <div className="relative mt-1 rounded-md ">
            <input
              type="text"
              className="w-80 shadow-sm font-avanir outline-orange-400 rounded-sm  pl-2 py-2 font-sans mt-2 pr-5 focus:border-orange-400 focus:ring-orange-400 sm:text-md"
              name="name"
              // value={name}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className=' float-right flex mt-6'>
          <button onClick={(e)=> handleSearch(e)} className='bg-blue-400 p-2 mx-8 px-6 text-white font-avanir rounded-md w-36 hover:bg-blue-500 text-center'
          >Search</button>
        <Link to="/add-data">
          <p className='bg-blue-400 py-[10px]  px-14 text-white font-avanir rounded-md  hover:bg-blue-500 text-center'>Add</p>
        </Link>
      </div>
    </form>
    
    {/* ------------------------------------------------Table------------------------------------------------ */}
    
    <div class="overflow-auto rounded-lg mb-32 mt-32 w-4/5 m-auto shadow hidden md:block">
      <table class="w-full">
        <thead class="bg-blue-400 border-b-2 border-gray-200 text-left">
        <tr>
          <th class="w-14 p-3 text-sm font-semibold tracking-wide ">No</th>
          <th class="w-32 p-3 text-sm font-semibold tracking-wide ">No Registrasi</th>
          <th class="w-30 p-3 text-sm font-semibold tracking-wide ">Nama Pemilik</th>
          <th class="w-40 p-3 text-sm font-semibold tracking-wide ">Merk Kendaraan</th>
          <th class="w-44 p-3 text-sm font-semibold tracking-wide ">Tahun Pembuatan</th>
          <th class="w-26 p-3 text-sm font-semibold tracking-wide ">Kapasitas</th>
          <th class="w-26 p-3 text-sm font-semibold tracking-wide ">Warna</th>
          <th class="w-32 p-3 text-sm font-semibold tracking-wide ">Bahan Bakar</th>
          <th class="w-40 p-3 text-sm font-semibold tracking-wide ">Action</th>
        </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 text-left">
         {
         result?.length === 0 ?
         motors?.map((e, index) => (
            <tr key={index} class="bg-white">
              <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                {e.id}
              </td>
              <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                {e.id_register}
              </td>
              <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                {e.name}
              </td>
              <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{e.brand}</td>
              <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{e.production_year}</td>
              <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{e.cylinder_capacity} CC</td>
              <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{e.color}</td>
              <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{e.fuel}</td>
              <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                <button className='mx-1 text-orange-500 font-bold hover:text-orange-600'
                  onClick={() => {navigate(`/detail-motor/${e.id}`)}}
                >Detail</button>
                <button className='mx-1 text-sky-500 font-bold hover:text-sky-600'
                  onClick={() => {navigate(`/update-motor/${e.id}`)}}
                >Edit</button>
                <button className='mx-1 text-red-600 font-bold hover:text-red-700'
                 onClick={() => {
                  handleDelete(e?.id)
                }}
                >Delete</button>
              </td>
            </tr>
          )
         ):result?.data.map((e, index)=>(
          <tr key={index} class="bg-white">
              <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                {e.id}
              </td>
              <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                {e.id_register}
              </td>
              <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                {e.name}
              </td>
              <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{e.brand}</td>
              <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{e.production_year}</td>
              <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{e.cylinder_capacity} CC</td>
              <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{e.color}</td>
              <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{e.fuel}</td>
              <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                <button className='mx-1 text-orange-500 font-bold hover:text-orange-600'
                  onClick={() => {navigate(`/detail-motor/${e.id}`)}}
                >Detail</button>
                <button className='mx-1 text-sky-500 font-bold hover:text-sky-600'
                  onClick={() => {navigate(`/update-motor/${e.id}`)}}
                >Edit</button>
                <button className='mx-1 text-red-600 font-bold hover:text-red-700'
                 onClick={() => {
                  handleDelete(e?.id)
                }}
                >Delete</button>
              </td>
            </tr>
         ))}
        </tbody>
      </table>
      
      <Delete
       setConfirmDelete={setConfirmDelete}
       show={show}
       handleClose={handleClose}
       data={dataId} 
      />
    </div>
    </>
  )
}

export default Monitoring