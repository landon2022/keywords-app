import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";
import ProcesingButton from "./ProcesingButton";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


export default function Category(props) {
    const MySwal = withReactContent(Swal)
    const { register, handleSubmit } = useForm();
    const [button, setButton] = useState();
    const [keywords, setKeywords] = useState("")
    const [content, setContent] = useState()
    function copyAlert(event) {
        var el = document.createElement("div");
        // get the coordinates of the mouse
        var x = event.clientX; // get the horizontal coordinate
        var y = event.clientY + 25; // get the vertical coordinate
        // el.setAttribute("style", "position:absolute;);
        // position newthing using the coordinates
        el.style.position = "absolute"; // fixes el relative to page. Could use absolute.
        el.style.left = x + "px";
        el.style.top = y + "px";
        // el.setAttribute("style", "position:absolute;top:25%;left:46%;");
        el.innerHTML = "<button class='btn btn-secondary btn-sm'>Copied</button>";
        setTimeout(function () {
            el.parentNode.removeChild(el);
        }, 1000);
        document.body.appendChild(el);
    }

    async function onSubmit(data) {
        setButton(<ProcesingButton className="btn btn-secondary" text={"Adding"} />)
        const newKeywords = {
            category: props.name,
            keywords: data.newKeywords
        }
        let response = await fetch("http://localhost:5000/addkeywords", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newKeywords),
        })
        let result = await response.json()
        if (result === "Success") {
            setKeywords("");
            setButton(<Button className="btn btn-secondary" onClick={handleSubmit(onSubmit)} text={"Add"} buttonState={props.buttonState} />);
            MySwal.fire("Great!", "The new keywords have been successfully added. Thanks for your contribution!", "success").then(() => setContent(() => content + " " + newKeywords.keywords))

        }


    }

    function updateKeywords(event) {
        console.log("changed");
        setKeywords(event.target.value)
    }

    useEffect(() => {
        setButton(<Button className="btn btn-secondary" onClick={handleSubmit(onSubmit)} text={"Add"} buttonState={props.buttonState} />)
        setContent(props.content)
    }, [props.buttonState, props.content])
    return (

        <div className="col text-center col-lg-2 custom2">
            <div className="btn-group custom">
                <button className="btn btn-secondary btn-sm btn-category btn-L" data-clipboard-text={content}
                    type="button" onClick={(e) => copyAlert(e)}>
                    {props.name}
                </button>
                <button type="button" className="btn btn-secondary dropdown-toggle dropdown-toggle-split dropdown-btn btn-R" data-bs-toggle="dropdown" aria-expanded="false">
                    <span className="visually-hidden">Toggle Dropdown</span>
                </button>

                <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                    <form className="px-4 py-3" >
                        <h6>Exsisting Keywords</h6>
                        <hr className="dropdown-divider" />
                        <div className="keywords">
                            <p>
                                {content}
                            </p>
                        </div>

                        <hr className="dropdown-divider" />
                        <h6>Add New Keywords <br />Category: <b>{props.name}</b></h6>
                        <hr className="dropdown-divider" />
                        <div className="mb-3">
                            <input
                                type="text"
                                // onChange={updateKeywords}
                                className="form-control"
                                {...register("newKeywords", { required: true, onChange: (e) => updateKeywords(e) })}
                                value={keywords}
                                placeholder="Enter keywords saperated by space. (e.g. bar foo)"
                            />
                        </div>
                        {button}
                    </form>

                </div>


            </div>
        </div>


    );
}