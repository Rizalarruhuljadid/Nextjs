import { useState, useEffect } from "react";
import axios from "axios";
import {stat} from 'fs';


const koneksiWarga = axios.create({
    // baseURL: "http://192.168.1.33:5000/api/mahasiswa"
  // baseURL: "https://jsonplaceholder.typicode.com/posts"
  baseURL: "http://127.0.0.1:5000/api/warga"
  
  });
  
export default function FormWarga() {
    const [warga, setWarga] = useState(null);
    const [stateno_rumah, setNo_Rumah] = useState("");
    const [statenama_kk, setNama_Kk] = useState("");
    const [statekelurahan, setKelurahan] = useState("");
    const [statekecamatan, setKecamatan] = useState("");
    const [statealamat, setAlamat] = useState("");
    const [statefoto, setFoto] = useState("");
    const [stateadd,setAdd]=useState("hide");
    const [statebutonadd,setbtnAdd]=useState("show")

    const [stateedit, setEdit]=useState("hide")
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   alert(`Nama: ${statenama} \n Nim: ${statenim}`)
  // }    



const handleSubmitAdd =  (event) => {
    
  event.preventDefault();
  const formData = new FormData(event.target);
  koneksiWarga
    .post("/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log(res);
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
   
}

const handleSubmitEdit =  (event) => {
    
  event.preventDefault();
  const address = "/"+event.target.no_rumah.value;
  // const formData = new FormData(event.target);
  const formData = {
    no_rumah: event.target.no_rumah.value,
    nama_kk: event.target.nama_kk.value,
    alamat: event.target.alamat.value,
    kelurahan: event.target.kelurahan.value,
    kecamatan: event.target.kecamatan.value
}
  koneksiWarga
    .put( address,formData)
    .then((res) => {
      console.log(res);
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });

  }
  const handleAdd = (event) => {
    setAdd("show");
    setbtnAdd("hide");
    setEdit("hide");
  }
    const handleCancelAdd = (event) => {
    
      setAdd("hide");
      setbtnAdd("show");
      setEdit("hide");
    }
    const handleCancelEdit = (event) => {
      setAdd("hide");
      setbtnAdd("show");    
      setEdit("hide");
          setNo_Rumah("");
          setNama_Kk("");
          setAlamat("");
          setKelurahan("");
          setKecamatan("");        
          setFoto("");     
  }


  const handleDelete = (event) => {
    event.preventDefault();
    var no_rumah = event.target.value;
    koneksiWarga.delete(`/${no_rumah}`)
      .then(response => {
        console.log('Data berhasil dihapus:', response.data);
        setWarga(
          warga.filter((warga) => {
             return warga.no_rumah !== no_rumah;
          }))
     
        // Lakukan langkah-langkah lain setelah penghapusan data
      })
      .catch(error => {
        console.error('Gagal menghapus data:', error);
      })
  }

  const handleEdit = (event) => {
    event.preventDefault();
    var no_rumah = event.target.value;
   
       const wrgEdit =  warga.filter((warga) => {
             return warga.no_rumah == no_rumah;
          });
          if(wrgEdit!=null){

            setNo_Rumah(wrgEdit[0].no_rumah);
            setNama_Kk(wrgEdit[0].nama_kk);
            setAlamat(wrgEdit[0].alamat);
            setKelurahan(wrgEdit[0].kelurahan);
            setKecamatan(wrgEdit[0].kecamatan);
            setFoto(wrgEdit[0].foto);
            setAdd("hide");
            setbtnAdd("hide");
            setEdit("show");
          }
  }

useEffect(() => {
  async function getWarga() {
    const response = await koneksiWarga.get("/").then(function (axiosResponse) {
        setWarga(axiosResponse.data.data);
     })
     .catch(function (error) {
     
      alert('error from warga in api warga: '+error);
     });;
      }
  getWarga();
}, []);


  // const [post, setPost] = useState(null);
  // useEffect(() => {
  //   async function getPost() {
  //     const response = await client.get("/1");
  //     setPost(response.data);
  //   }
  //   getPost();
  // }, []);

 
// if (!post) return "No post!"


if(warga==null){
  return(
    <div>
      waiting...
    </div>
  )
  }else{

    return (

<center> <br></br><h1>Form Input Warga</h1><br></br>
    <div>
    <button id="btnadd" onClick={handleAdd} className={statebutonadd}>add</button>
     
       <form id="formadd" className={stateadd} onSubmit={handleSubmitAdd} >
       <br></br><h3>Form Input  </h3><br></br>
        <table border={0}>
            <tbody>
            <tr>
            <td> <label> Nomor Rumah:</label></td>
            <td><input type="text" id="no_rumah" name="no_rumah"/>              
              </td>
        </tr>
        <tr>
            <td>  <label> Nama Kepala Keluarga:</label></td>
            <td><input type="text" id="nama_kk"   name="nama_kk" 
               /></td>
        </tr>
        <tr>
            <td>  <label> Alamat:</label></td>
            <td><textarea  id="address" style={{resize: "none"}}  name="alamat" ></textarea></td>
        </tr>
        <tr>
            <td>  <label> Kelurahan:</label></td>
            <td><input type="text" id="kelurahan"   name="kelurahan" 
               /></td>
        </tr>
        <tr>
            <td>  <label> Kecamatan:</label></td>
            <td><input type="text" id="kecamatan"   name="kecamatan" 
               /></td>
        </tr>
        <tr>
            <td>  <label> Foto Rumah:</label></td>
            <td>   <input
                    type="file" name="image"/>  </td>
        </tr>
            </tbody>
          </table>
          <input type="submit" />
          <input type="button" value="cancel" onClick={handleCancelAdd} />
          </form>

            {/* Buat Edit */}

      <form id="formedit" className={stateedit} onSubmit={handleSubmitEdit}>
      <br></br><h3>Form Edit </h3><br></br>

          <table border={0}>
            <tbody>
            <tr>
            <td> <label> Nomor Rumah:</label></td>
            <td><input type="text" id="no_rumah"  value={stateno_rumah} name="no_rumah"/>
              {/* onChange={handleOnchangeNim}  /> */}
              </td>
        </tr>
        <tr>
            <td>  <label> Nama Kepala Keluarga:</label></td>
            <td><input type="text" id="nama_kk"  value={statenama_kk} name="nama_kk"
               onChange={(e) => setNama_Kk(e.target.value)}
               /></td>
        </tr>
        <tr>
            <td>  <label> Alamat:</label></td>
            <td><textarea  id="address" style={{resize: "none"}} value={statealamat} name="alamat"  onChange={(e) => setAlamat(e.target.value)}></textarea></td>
        </tr>
        <tr>
            <td>  <label> Kelurahan:</label></td>
            <td><input type="text" id="kelurahan"  value={statekelurahan} name="kelurahan"
               onChange={(e) => setKelurahan(e.target.value)}
               /></td>
        </tr>
        <tr>
            <td>  <label> Kecamatan:</label></td>
            <td><input type="text" id="kecamatan"  value={statekecamatan} name="kecamatan"
               onChange={(e) => setKecamatan(e.target.value)}
               /></td>
        </tr>
        <tr>
            <td>  <label> Foto:</label></td>
            <td>  <img src={statefoto} width="80"/> </td>
        </tr>
            </tbody>
          </table>
          <input type="submit" />
          <input type="button" value="cancel" onClick={handleCancelEdit} />
          </form>  
        <br/>
        <br/>
      Tabel Warga Hasil Input Warga
      <table border={1}>
            <thead>
                <tr style={{textAlign:'center'}}>
                  <td><b>No.Rumah</b></td> 
                <td><b>Nama Kepala Keluarga</b></td>
                <td><b>Alamat</b></td>
                <td><b>Kelurahan</b></td>
                <td><b>Kecamatan</b></td>
                <td><b>Foto</b></td>
                <td colSpan={2}><b>Action</b></td>
                </tr>
            </thead>
            <tbody>
            {warga.map((wrg) => 
                <tr style={{textAlign:'center'}}>
                    <td>{wrg.no_rumah}</td>
                    <td>{wrg.nama_kk}</td>
                    <td>{wrg.alamat}</td>
                    <td>{wrg.kelurahan}</td>
                    <td>{wrg.kecamatan}</td>
                    <td><img src={wrg.foto} width="150"/></td>
                   <td><button onClick={handleEdit} value={wrg.no_rumah}>edit</button></td>
                   <td><button onClick={handleDelete} value={wrg.no_rumah}>delete</button></td>
                </tr>
           )}     
                   </tbody>
          </table>
           
           
          
           </div>

            
      

    
      </center>
    )
  }
}