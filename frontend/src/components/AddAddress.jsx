import { IoClose } from "react-icons/io5"
import { useForm } from "react-hook-form";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../connection/SummaryApi";
import { toast } from "react-toastify";

function AddAddress({close}) {
    const { register, handleSubmit, reset} = useForm();
    const onSubmit = async(data)=>{
        try {
            const response = await Axios({
                ...SummaryApi.createAddress,
                data: {
                    addressline : data.addressline,
                    city : data.city,
                    state : data.state,
                    country : data.country,
                    pincode : data.pincode,
                    mobile : data.mobile,
                }
            })

            const { data: responseData } = response

            if(responseData.success){
                toast.success(responseData.message)
                reset()
            }
        } catch (error) {
            AxiosToastError(error)
        }
    };
  return (
    <section className="bg-neutral-900/70 fixed top-0 right-0 left-0 bottom-0 z-50 overflow-auto h-screen">
        <div className="bg-white max-w-lg p-4 w-full mt-8 rounded mx-auto">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Address</h2>
                <IoClose onClick={close} className="cursor-pointer"/>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
                <div className="grid gap-1">
                    <label htmlFor="address">Address Line:</label>
                    <input type="text" 
                        id="addressline"
                        className="bg-blue-50 border p-2 rounded outline-none focus-within:border-[#ffbf00]"
                        {...register("addressline",{required:true})}
                    />
                </div>
                    <div className="grid gap-1">
                        <label htmlFor="city">City:</label>
                        <input type="text" 
                            id="city"
                            className="bg-blue-50 border p-2 rounded outline-none focus-within:border-[#ffbf00]"
                            {...register("city",{required:true})}
                        />
                    </div>
                    <div className="grid gap-1">
                        <label htmlFor="state">State:</label>
                        <input type="text" 
                            id="state"
                            className="bg-blue-50 border p-2 rounded outline-none focus-within:border-[#ffbf00]"
                            {...register("state",{required:true})}
                        />
                    </div>
                    <div className="grid gap-1">
                        <label htmlFor="country">Country:</label>
                        <input type="text" 
                            id="country"
                            className="bg-blue-50 border p-2 rounded outline-none focus-within:border-[#ffbf00]"
                            {...register("country",{required:true})}
                        />
                    </div>
                    <div className="grid gap-1">
                        <label htmlFor="pincode">Pincode:</label>
                        <input type="text" 
                            id="pincode"
                            className="bg-blue-50 border p-2 rounded outline-none focus-within:border-[#ffbf00]"
                            {...register("pincode",{required:true})}
                        />
                    </div>
                    <div className="grid gap-1">
                        <label htmlFor="mobile">Mobile No.:</label>
                        <input type="text" 
                            id="mobile"
                            className="bg-blue-50 border p-2 rounded outline-none focus-within:border-[#ffbf00]"
                            {...register("mobile",{required:true})}
                        />
                    </div>
                <button type="submit" className="bg-[#ffbf00] px-3 py-2 w-full rounded">Submit</button>
            </form>
        </div>
    </section>
  )
}

export default AddAddress
