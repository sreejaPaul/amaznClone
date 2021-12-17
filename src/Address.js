import React,{useState,useRef} from 'react';
import './Address.css';
import { useStateValue } from './StateProvider';
import {useNavigate} from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function Address() {
    const history = useNavigate();
    const[{address},dispatch] = useStateValue();
    const[add,setadd] = useState("");
    const[city,setCity] = useState("");
    const[state,setState] = useState("");
    const[code,setcode] = useState(0);
    const[number,setnumber] = useState(0);
    const[vis,setvis] = useState("none");
    const addip = useRef("");
    const cityip = useRef("");;
    const stateip = useRef("");
    const codeip = useRef(0);
    const numip = useRef(0);

    const addressSubmit = (e)=>{
        e.preventDefault();
        console.log(addip);
        if(addip.current.value !== "" && cityip.current.value !== "" && stateip.current.value !== "" && codeip.current.value !== "" && numip.current.value !== ""){
            dispatch({
                type: 'ADD_ADDRESS',
                address: {
                    Address: add,
                    City: city,
                    State: state,
                    Pin: code,
                    Number: number
                }
            });
            history("/payment", { replace: true })
        }else{
            setvis("block");
        }
    }
    const inputChange = (e)=>{
        console.log(addip);
        const id = e.target.id;
        switch(id){
            case "address":
                setadd(e.target.value);
                break;
            case "city":
                setCity(e.target.value);
                break;
            case "state":
                setState(e.target.value);
                break;
            case "code":
                setcode(e.target.value);
                break;
            case "phone":
                setnumber(e.target.value);
                break;
            default:
                console.log("NO match found!");
                break;
        }
        if(vis === "block"){
            setvis("none");
        }
    }
    return (
        <div>
           <div className="address">
            <div className="loginContainer">
                <h1>{"Shipping Address"}</h1>
                <div className="form">
                    <h5>{"Address"}</h5>
                    <input type="text" id="address" onChange={inputChange} ref={addip}/>

                    <h5>{"City"}</h5>
                    <input type="text" id="city" onChange={inputChange} ref={cityip}/>

                    <h5>{"State"}</h5>
                    <input type="text" id="state" onChange={inputChange} ref={stateip}/>

                    <h5>{"Zip/Postal Code"}</h5>
                    <input type="text" id="code" name="pin" pattern="[0-9]{6}" maxlength="6" onChange={inputChange} ref={codeip}/>

                    <h5>{"Phone No"}</h5>
                    <input type="text" id="phone" name="phone" pattern="[0-9]{10}" maxlength="10" onChange={inputChange} ref={numip} />

                    {(vis === "block")?
                        <Popup trigger={<button className="loginSignInButton">Proceed to payment</button>} modal>
                        {close => (
                            <div className="modal" position="right center">
                                <button className="close" onClick={close}>
                                    &times;
                                </button>
                                <div className="modaldiv"> Add all address information to proceed. </div>
                            </div>
                        )}
                    </Popup>
                    :
                    <button className="loginSignInButton" type="submit" onClick={addressSubmit}>{"Proceed to payment"}</button>}
                </div>
            </div>
            
        
        </div>
        </div>
    )
}

export default Address
