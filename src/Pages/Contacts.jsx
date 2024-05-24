
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Popup from "../Components/Popup"
import { removeContact } from "../Redux/action"
import video from '../graphics/animation.mp4'

const Contacts = () => {

    const [isOpen, setIsOpen] = useState(false)
    const [singleContact, setSingleContact] = useState({})
    let data = undefined
    const AllContacts = useSelector((store) => store.contacts)
    const dispatch = useDispatch()
   
    const togglePopup = (contact) => {

        setSingleContact(contact)
        setIsOpen(!isOpen)
    }
    useEffect(() => {
    }, [dispatch, AllContacts.length])


    return (
        //create new contact button which is link to the contact form 
        <div className="justify-center pt-16 text-slate-200   p-4  w-full ">
            <div className="m-4">
                <button className="rounded-lg bg-violet-600 p-2 text-2xl">
                    <Link to="/contact_form">
                        Create New Contact
                    </Link>
                </button>

            </div>
            {
            AllContacts.length == 0 && 
            <div className=" m-auto w-fit p-4 align-middle text-slate-200 justify-center">

                    <video src= {video} width={600}height={200}autoPlay loop muted> </video>

                <h1 className="text-3xl">No Contact Found </h1>
                <h2>Please add contact from Create New Contact button</h2>
            </div>
            }
            <div id="contact_list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                {
                    AllContacts.map((el) => {
                        return <div key={el.id} className="bg-violet-400 rounded-lg shadow-md m-4 p-4 text-black">
                            <div onClick={() => togglePopup(el)} className="w-3/4 m-auto  ">
                                { <img className="w-full rounded-full" src="https://tse2.mm.bing.net/th?id=OIP.Gf8pNK35OsHV2rIc2zIwiQHaE7&pid=Api&P=0&h=180" alt="" /> }
                                <div className="p-4">
                                    {isOpen &&
                                        <Popup close={() => togglePopup(data)} el={singleContact} />

                                    }
                                </div>    <div className="text-left">
                                    <p>First Name - {el.first_name}</p>
                                    <p>Last  Name - {el.last_name}</p>   
                                    <p>Status     - {el.status == "active" ? "Active" : "Inactive"}</p>
                                </div>

                            </div>
                            {/* Edit and Delete button  */}
                            <div className="flex justify-between my-2">
                                <Link to={`edit/${el.id}`}>
                                    <button className="rounded p-2 bg-violet-600 text-black">
                                        Edit
                                    </button>
                                </Link>
                                <button onClick={() => dispatch(removeContact(el.id))} className="rounded p-2 bg-violet-600 text-black">Delete</button>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Contacts
