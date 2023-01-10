import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery  } from 'react-query';
import { API } from '../config/api'

function DetailData() {

    const { id } = useParams()

    let { data: product } = useQuery("productsCache", async () => {
        const response = await API.get("/motor/" + id)
    
        return response.data.data
    })

  return (
    <div className="w-4/5 m-auto">
        <div className='flex mt-20 justify-between'>
            <h2 className="font-bold font-avanir text-2xl">Detail Data Kendaraan</h2>
            <div>
                <Link to="/add-data">
                    <span className='bg-sky-300 mx-5 rounded-md p-2 mt-2 font-bold font-avanir hover:bg-sky-400 text-md align-end'
                    >Tambah Data</span>
                </Link>
                <Link to="/">
                    <span className='bg-sky-300 rounded-md p-2 mt-2 font-bold hover:bg-sky-400  font-avanir text-md '
                    >Kembali</span>
                </Link>
            </div>
        </div>
        <div className=' border border-orange-400 rounded-sm p-8 mt-10'>
            <div className="flex">
                <div className='w-[30%]'>
                    <span className='font-bold font-avanir'>No. Registrasi Kendaraan : </span>
                    <div className="relative mt-1 rounded-xl ">
                        <span className='font-avanir'>{product?.id_register}</span>
                    </div>
                </div>
                <div >
                    <span className='font-bold font-avanir'>Tahun Pembuatan : </span>
                    <div className="relative mt-1 rounded-xl ">
                        <span className='font-avanir'>{product?.production_year}</span>
                    </div>
                </div>
            </div>

            <div className="flex mt-8">
                <div className='w-[30%]'>
                    <span className='font-bold font-avanir'>Nama Pemilik : </span>
                    <div className="relative mt-1 rounded-xl ">
                        <span className='font-avanir'>{product?.name}</span>
                    </div>
                </div>
                <div >
                 <span className='font-bold font-avanir'>Kapasitas Silinder :</span>
                    <div className="relative mt-1 rounded-xl ">
                        <span className='font-avanir'>{product?.cylinder_capacity} CC</span>
                    </div>
                </div>
            </div>
          

            <div className="flex mt-8">
            <div className='w-[30%]'>
                <span className='font-bold font-avanir'>Merk Kendaraan :</span>
                <div className="relative mt-1 rounded-xl ">
                    <span className='font-avanir'>{product?.brand}</span>
                </div>
            </div>
            <div >
                <span className='font-bold font-avanir'>Warna Kendaraan :</span>
                <div className="relative mt-1 rounded-xl ">
                    <span className='font-avanir'>{product?.color}</span>
                </div>
            </div>
            </div>

            <div className="flex mt-8 mb-10">
            <div className='w-[30%]'>
                <span className='font-bold font-avanir'>Alamat Pemilik Kendaraan :</span>
                <div className="relative mt-1 rounded-xl ">
                    <span className='font-avanir'>{product?.address}</span>
                </div>
            </div>
            <div >
                <span className='font-bold font-avanir'>Bahan Bakar :</span>
                <div className="relative mt-1 rounded-xl ">
                    <span className='font-avanir'>{product?.fuel}</span>
                </div>
            </div>
            </div>
            
        </div>
    </div>
  )
}

export default DetailData